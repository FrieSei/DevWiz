import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { config } from './config';

export class OpenAIService {
  private client: OpenAIClient;

  constructor() {
    this.client = new OpenAIClient(
      config.AZURE_OPENAI_ENDPOINT,
      new AzureKeyCredential(config.AZURE_OPENAI_API_KEY)
    );
  }

  async *generateStreamingResponse(messages: Array<{ role: string; content: string }>) {
    try {
      const events = await this.client.streamChatCompletions(
        config.AZURE_OPENAI_DEPLOYMENT_NAME,
        messages,
        { maxTokens: 800 }
      );

      for await (const event of events) {
        if (event.choices[0]?.delta?.content) {
          yield event.choices[0].delta.content;
        }
      }
    } catch (error) {
      console.error('OpenAI streaming error:', error);
      throw error;
    }
  }
}