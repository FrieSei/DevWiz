import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { StorageService } from '@/lib/upload/storage';
import { uploadRequestSchema } from '@/lib/upload/validators';
import { handleApiError, ApiError } from '@/lib/api/errors';
import { nanoid } from 'nanoid';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new ApiError(401, 'Unauthorized');
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      throw new ApiError(400, 'No file provided');
    }

    // Validate file
    await uploadRequestSchema.parseAsync({ file });

    // Generate a unique file name
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${userId}/${nanoid()}.${fileExtension}`;

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Azure Blob Storage
    const storageService = new StorageService();
    const { url, metadata } = await storageService.uploadFile(
      buffer,
      uniqueFileName,
      file.type,
      {
        originalName: file.name,
        userId,
      }
    );

    return NextResponse.json({
      url,
      metadata: {
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: metadata.uploadedAt,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}