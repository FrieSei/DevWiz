'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MessageSquare, FileText, Settings } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

const navigation = [
  {
    name: 'Chat',
    href: ROUTES.CHAT,
    icon: MessageSquare,
  },
  {
    name: 'Documents',
    href: ROUTES.DOCS,
    icon: FileText,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-background h-[calc(100vh-4rem)] p-4">
      <nav className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.name}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start',
                pathname === item.href && 'bg-secondary'
              )}
              asChild
            >
              <Link href={item.href}>
                <Icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}