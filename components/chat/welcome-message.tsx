import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

export function WelcomeMessage() {
  return (
    <Card className="p-4">
      <div className="flex items-start space-x-4">
        <Avatar>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            AI
          </div>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">DevWiz AI</p>
          <p className="mt-1">
            Hello! I'm DevWiz, your AI documentation assistant. How can I help you today?
          </p>
        </div>
      </div>
    </Card>
  );
}