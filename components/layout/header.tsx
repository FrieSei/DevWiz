import { Bot } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserButton } from '@/components/auth/user-button';
import { auth } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { APP_NAME, ROUTES } from '@/lib/constants';

export async function Header() {
  const { userId } = auth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={userId ? ROUTES.CHAT : ROUTES.HOME} className="flex items-center space-x-2">
          <Bot className="h-6 w-6" />
          <h1 className="text-2xl font-bold">{APP_NAME}</h1>
        </Link>
        <div className="flex items-center space-x-4">
          {!userId ? (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href={ROUTES.SIGN_IN}>Sign In</Link>
              </Button>
              <Button asChild>
                <Link href={ROUTES.SIGN_UP}>Sign Up</Link>
              </Button>
            </div>
          ) : (
            <UserButton />
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}