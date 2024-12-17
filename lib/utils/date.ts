import { format, formatDistanceToNow } from 'date-fns';

export function formatDate(date: Date): string {
  return format(date, 'PPpp');
}

export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

export function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}