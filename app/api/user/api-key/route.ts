import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { ApiKeyService } from '@/lib/api-keys/service';
import { handleApiError } from '@/lib/api/errors';

const apiKeyService = new ApiKeyService(process.env.ENCRYPTION_KEY!);

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { apiKey } = await request.json();
    const encryptedKey = await apiKeyService.validateAndEncryptKey(apiKey);

    // Store in your database here
    // For demo, we'll store in memory
    const stored = {
      id: crypto.randomUUID(),
      encryptedKey,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastUsed: null,
    };

    return NextResponse.json({
      id: stored.id,
      createdAt: stored.createdAt,
      updatedAt: stored.updatedAt,
      lastUsed: stored.lastUsed,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Delete from your database here
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}