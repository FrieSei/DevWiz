'use client';

import { MessageList } from '@/components/chat/message-list';
import { MessageInput } from '@/components/chat/message-input';
import { Separator } from '@/components/ui/separator';
import { useChat } from '@/lib/chat/hooks/use-chat';

export function ChatInterface() {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-full">
      <MessageList messages={messages} />
      <Separator />
      <MessageInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
}