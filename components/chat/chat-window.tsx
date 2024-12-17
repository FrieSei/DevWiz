'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MessageInput } from './message-input';
import { useChat } from '@/lib/chat/hooks/use-chat';
import { Bot, User } from 'lucide-react';

export function ChatWindow() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage } = useChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.role === 'assistant' ? 'bg-muted/50' : ''
              } p-4 rounded-lg`}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                {message.role === 'assistant' ? (
                  <Bot className="h-5 w-5" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {message.role === 'assistant' ? 'DevWiz AI' : 'You'}
                </p>
                <p className="text-sm mt-1 whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-4">
        <MessageInput onSend={sendMessage} isLoading={isLoading} />
      </div>
    </Card>
  );
}