export function getReadingTime(content: string): number | null {
  if (!content) return null;

  const words = content.trim().split(/\s+/).length;
  const wordsPerMinute = 200;

  return Math.ceil(words / wordsPerMinute);
}
