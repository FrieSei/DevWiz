import { FileUploadSection } from '@/components/file/file-upload-section';
import { DocumentList } from '@/components/file/document-list';
import { checkAuth } from '@/lib/auth';

export default function DocsPage() {
  checkAuth();

  return (
    <div className="space-y-8">
      <FileUploadSection />
      <DocumentList />
    </div>
  );
}