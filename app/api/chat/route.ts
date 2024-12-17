import { auth } from '@clerk/nextjs';
import { OpenAIService } from '@/lib/azure/openai';
import { chatMessageSchema } from '@/lib/api/validators';
import { StreamingTextResponse, LangChainStream } from 'ai';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { content } = chatMessageSchema.parse(body);

    const openai = new OpenAIService();
    const stream = openai.generateStreamingResponse([
      { 
        role: 'system', 
        content: 'You are DevWiz, an AI assistant specialized in helping developers understand technical documentation.' 
      },
      { role: 'user', content }
    ]);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process message' }), 
      { status: 500 }
    );
  }
}