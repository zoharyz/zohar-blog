import { writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const title = process.argv[2];

if (!title) {
  console.error('Usage: npm run new:snippet "Your Snippet Title"');
  process.exit(1);
}

const slug = slugify(title);
const today = new Date().toISOString().split('T')[0];
const filePath = `${__dirname}/../src/content/snippets/${slug}.mdx`;

const frontmatter = `---
title: "${title}"
description: "A brief description."
date: "${today}"
tags: []
status: "draft"
---

Write your snippet here.
`;

writeFileSync(filePath, frontmatter);
console.log(`Created ${filePath}`);
