import { Message } from '@/lib/chat/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageItem } from './message-item';
import { WelcomeMessage } from './welcome-message';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        <WelcomeMessage />
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
}