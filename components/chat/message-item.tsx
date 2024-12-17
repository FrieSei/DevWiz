import { Message } from '@/lib/chat/types';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';
  
  return (
    <Card className="p-4">
      <div className="flex items-start space-x-4">
        <Avatar>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            {isUser ? 'U' : 'AI'}
          </div>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isUser ? 'You' : 'DevWiz AI'}
            </p>
            <time className="text-xs text-muted-foreground">
              {formatDistanceToNow(message.timestamp, { addSuffix: true })}
            </time>
          </div>
          <p className="mt-1">{message.content}</p>
        </div>
      </div>
    </Card>
  );
}