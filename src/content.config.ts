import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const contentSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published']).default('draft'),
  featured: z.boolean().optional(),
  connections: z.array(z.string()).optional(),
});

const essays = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/essays' }),
  schema: contentSchema,
});

const snippets = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/snippets' }),
  schema: contentSchema,
});

export const collections = { essays, snippets };
