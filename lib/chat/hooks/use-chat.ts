import { useState } from 'react';
import { useChat as useVercelChat } from 'ai/react';
import { Message } from '../types';
import { useToast } from '@/hooks/use-toast';

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    messages,
    append,
    reload,
    stop,
    isLoading: isChatLoading,
    input,
    setInput,
  } = useVercelChat({
    api: '/api/chat',
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      await append({
        content,
        role: 'user',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages: messages as Message[],
    isLoading: isLoading || isChatLoading,
    sendMessage,
    reload,
    stop,
    input,
    setInput,
  };
}