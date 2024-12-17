import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/lib/upload/validators';

export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export function isValidFileType(type: string): boolean {
  return ALLOWED_FILE_TYPES.includes(type as any);
}

export function isValidFileSize(size: number): boolean {
  return size > 0 && size <= MAX_FILE_SIZE;
}