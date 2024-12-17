import { BlobServiceClient } from '@azure/storage-blob';
import { config } from '@/lib/azure/config';
import { ApiError } from '@/lib/api/errors';

export class StorageService {
  private blobServiceClient: BlobServiceClient;
  private containerClient;

  constructor() {
    try {
      this.blobServiceClient = BlobServiceClient.fromConnectionString(
        config.AZURE_STORAGE_CONNECTION_STRING
      );
      this.containerClient = this.blobServiceClient.getContainerClient(
        config.AZURE_STORAGE_CONTAINER_NAME
      );
    } catch (error) {
      throw new ApiError(500, 'Failed to initialize storage service');
    }
  }

  async uploadFile(
    file: Buffer,
    fileName: string,
    contentType: string,
    metadata: Record<string, string>
  ) {
    try {
      const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
      
      await blockBlobClient.upload(file, file.length, {
        blobHTTPHeaders: { 
          blobContentType: contentType,
          blobContentLanguage: 'en-US',
        },
        metadata: {
          ...metadata,
          uploadedAt: new Date().toISOString(),
        },
      });

      return {
        url: blockBlobClient.url,
        metadata: await this.getBlobMetadata(fileName),
      };
    } catch (error) {
      throw new ApiError(500, 'Failed to upload file to storage');
    }
  }

  private async getBlobMetadata(fileName: string) {
    const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
    const properties = await blockBlobClient.getProperties();
    
    return {
      ...properties.metadata,
      contentType: properties.contentType,
      size: properties.contentLength,
    };
  }
}