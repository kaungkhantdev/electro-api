import { randomUUID } from 'crypto';
import { extname, basename } from 'path';

export function buildKey(originalname: string, folder?: string): string {
  const trimmed = originalname.trim();
  const ext = extname(trimmed).toLowerCase();
  const base = basename(trimmed, extname(trimmed));
  const sanitized = base
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  const name = `${randomUUID()}-${sanitized}${ext}`;
  return folder ? `${folder}/${name}` : name;
}
