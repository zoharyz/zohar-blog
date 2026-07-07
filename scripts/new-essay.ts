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
  console.error('Usage: npm run new:essay "Your Essay Title"');
  process.exit(1);
}

const slug = slugify(title);
const today = new Date().toISOString().split('T')[0];
const filePath = `${__dirname}/../src/content/essays/${slug}.mdx`;

const frontmatter = `---
title: "${title}"
description: "Write a compelling description here."
date: "${today}"
tags: []
status: "draft"
---

Write your essay content here.
`;

writeFileSync(filePath, frontmatter);
console.log(`Created ${filePath}`);
