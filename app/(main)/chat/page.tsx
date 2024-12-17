import { ChatInterface } from '@/components/chat-interface';
import { checkAuth } from '@/lib/auth';

export default function ChatPage() {
  checkAuth();

  return (
    <main className="container mx-auto px-4 py-8 h-[calc(100vh-5rem)]">
      <ChatInterface />
    </main>
  );
}