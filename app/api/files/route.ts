import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { BlobStorageService } from '@/lib/azure/blob-storage';

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const blobService = new BlobStorageService();
    const files = await blobService.listFiles(`${userId}/`);

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Files error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to list files' }),
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
      return new NextResponse(
        JSON.stringify({ error: 'File name is required' }),
        { status: 400 }
      );
    }

    // Ensure users can only delete their own files
    if (!fileName.startsWith(`${userId}/`)) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 403 }
      );
    }

    const blobService = new BlobStorageService();
    await blobService.deleteFile(fileName);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to delete file' }),
      { status: 500 }
    );
  }
}