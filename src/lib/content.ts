import type { CollectionEntry } from 'astro:content';

type ContentType = 'essays' | 'snippets';

export function getPublishedContent<T extends ContentType>(
  entries: CollectionEntry<T>[],
): CollectionEntry<T>[] {
  return entries.filter((entry) => entry.data.status === 'published');
}

export function sortContentByDate<T extends ContentType>(
  entries: CollectionEntry<T>[],
): CollectionEntry<T>[] {
  return [...entries].sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });
}

export function getFeaturedContent<T extends ContentType>(
  entries: CollectionEntry<T>[],
): CollectionEntry<T>[] {
  return entries.filter((entry) => entry.data.featured === true);
}

export function getContentByTag<T extends ContentType>(
  entries: CollectionEntry<T>[],
  tag: string,
): CollectionEntry<T>[] {
  return entries.filter((entry) => entry.data.tags?.includes(tag) ?? false);
}

export function getAllTags<T extends ContentType>(entries: CollectionEntry<T>[]): string[] {
  const tags = new Set<string>();
  entries.forEach((entry) => {
    entry.data.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}
