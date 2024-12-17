import { BlobServiceClient } from '@azure/storage-blob';
import { config } from './config';

export class BlobStorageService {
  private blobServiceClient: BlobServiceClient;
  private containerClient;

  constructor() {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      config.AZURE_STORAGE_CONNECTION_STRING
    );
    this.containerClient = this.blobServiceClient.getContainerClient(
      config.AZURE_STORAGE_CONTAINER_NAME
    );
  }

  async uploadFile(file: Buffer, fileName: string, contentType: string) {
    const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.upload(file, file.length, {
      blobHTTPHeaders: { blobContentType: contentType }
    });
    return blockBlobClient.url;
  }

  async deleteFile(fileName: string) {
    const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.delete();
  }

  async listFiles(prefix?: string) {
    const files = [];
    for await (const blob of this.containerClient.listBlobsFlat({ prefix })) {
      files.push({
        name: blob.name,
        contentLength: blob.properties.contentLength,
        lastModified: blob.properties.lastModified,
        url: `${this.containerClient.url}/${blob.name}`,
      });
    }
    return files;
  }
}