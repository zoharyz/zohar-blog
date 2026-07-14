import type { CollectionEntry } from 'astro:content';

export interface TagCount {
  tag: string;
  count: number;
}

export function extractTags(
  essays: CollectionEntry<'essays'>[],
  snippets: CollectionEntry<'snippets'>[]
): string[] {
  const allTags = new Set<string>();

  essays.forEach(essay => {
    if (essay.data.tags) {
      essay.data.tags.forEach(tag => allTags.add(tag));
    }
  });

  snippets.forEach(snippet => {
    if (snippet.data.tags) {
      snippet.data.tags.forEach(tag => allTags.add(tag));
    }
  });

  return Array.from(allTags).sort();
}

export function countTags(
  essays: CollectionEntry<'essays'>[],
  snippets: CollectionEntry<'snippets'>[]
): TagCount[] {
  const tagMap = new Map<string, number>();

  essays.forEach(essay => {
    if (essay.data.tags) {
      essay.data.tags.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    }
  });

  snippets.forEach(snippet => {
    if (snippet.data.tags) {
      snippet.data.tags.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    }
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function filterByTag(
  essays: CollectionEntry<'essays'>[],
  snippets: CollectionEntry<'snippets'>[],
  tag: string
): { essays: CollectionEntry<'essays'>[]; snippets: CollectionEntry<'snippets'>[] } {
  return {
    essays: essays.filter(essay => essay.data.tags?.includes(tag)),
    snippets: snippets.filter(snippet => snippet.data.tags?.includes(tag))
  };
}
