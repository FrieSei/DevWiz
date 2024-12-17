import { Encryption } from '../encryption/crypto';
import { ApiError } from '../api/errors';
import { apiKeySchema } from './validators';

export class ApiKeyService {
  private encryption: Encryption;

  constructor(masterKey: string) {
    this.encryption = new Encryption(masterKey);
  }

  async validateAndEncryptKey(apiKey: string): Promise<string> {
    try {
      const { key } = apiKeySchema.parse({ key: apiKey });
      return this.encryption.encrypt(key);
    } catch (error) {
      throw new ApiError(400, 'Invalid API key format');
    }
  }

  async decryptKey(encryptedKey: string): Promise<string> {
    try {
      return this.encryption.decrypt(encryptedKey);
    } catch (error) {
      throw new ApiError(500, 'Failed to decrypt API key');
    }
  }
}