import { checkAuth } from '@/lib/auth';
import { ApiKeyForm } from '@/components/settings/api-key-form';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  checkAuth();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <ApiKeyForm />
      </div>
    </main>
  );
}