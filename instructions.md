# Technical Design Doc: Personal Engineering Blog

## 1. Goal

Build a minimal, elegant, fast personal blog for publishing essays, notes, snippets, and technical ideas.

The site should feel inspired by Paul Graham’s essay archive: simple, text-first, timeless. However, it should have better UX: cleaner typography, tags, search, responsive layout, code highlighting, and easy content authoring.

## 2. Tech Stack

Use:

* Astro
* TypeScript
* MDX
* Astro Content Collections
* Tailwind CSS
* Pagefind
* Shiki
* pnpm

Reasoning:

Astro is optimized for content-heavy static sites. Content Collections provide typed Markdown/MDX content using TypeScript and Zod validation. MDX allows articles to include reusable components. Pagefind provides static search without needing a backend. Astro’s MDX integration supports Markdown-style frontmatter inside `.mdx` files.

## 3. Product Principles

The blog should be:

* Reading-first
* Minimal
* Fast
* Easy to publish to
* Personal but public
* Searchable
* Long-term maintainable
* Pleasant on desktop and mobile

Avoid:

* Heavy CMS
* Auth
* Database
* Comments
* Ads
* Popups
* Complex dashboards
* Over-designed UI

## 4. Core User Experience

Homepage:

* Name
* Short personal description
* Main writing themes
* Latest essays
* Latest snippets
* “Currently thinking about” section
* Footer with links

Article page:

* Title
* Description
* Date
* Reading time
* Tags
* Main article content
* Connections section
* Back link

Archive page:

* List of all essays
* Sorted newest first
* Filterable by tag later

Snippet page:

* Shorter notes or half-formed ideas
* Simple chronological list

Search page:

* Static full-text search using Pagefind

## 5. Information Architecture

Routes:

```txt
/
 /essays
 /essays/[slug]
 /snippets
 /snippets/[slug]
 /ideas
 /ideas/[slug]
 /tags/[tag]
 /search
 /about
```

## 6. Content Model

Create three content collections:

```txt
essays
snippets
ideas
```

Essays are polished long-form posts.

Snippets are short ideas, observations, or small technical thoughts.

Ideas are rougher evergreen notes that may later become essays.

## 7. Frontmatter Schema

Each content item should support:

```ts
title: string
description: string
date: Date
updated?: Date
tags: string[]
status: "draft" | "published"
featured?: boolean
connections?: string[]
```

Example MDX file:

```mdx
---
title: "Retries Are Not Free"
description: "Why retry logic creates hidden bugs in distributed systems."
date: "2026-07-06"
tags: ["distributed-systems", "reliability"]
status: "published"
featured: true
connections:
  - "idempotency"
  - "observability"
---

I used to think retries were harmless.

Then I learned they are one of the easiest ways to accidentally create duplicate side effects.
```

## 8. Suggested File Structure

```txt
src/
  content/
    essays/
    snippets/
    ideas/

  components/
    ArticleHeader.astro
    ArticleLayout.astro
    EssayList.astro
    Footer.astro
    Header.astro
    Prose.astro
    SearchBox.astro
    Tag.astro
    Connections.astro

  layouts/
    BaseLayout.astro
    ContentLayout.astro

  pages/
    index.astro
    about.astro
    search.astro

    essays/
      index.astro
      [slug].astro

    snippets/
      index.astro
      [slug].astro

    ideas/
      index.astro
      [slug].astro

    tags/
      [tag].astro

  lib/
    content.ts
    readingTime.ts
    slug.ts

  styles/
    global.css

scripts/
  new-essay.ts
  new-snippet.ts
  new-idea.ts
```

## 9. Content Creation Flow

The site must make publishing extremely easy.

Add scripts:

```bash
pnpm new:essay "Retries Are Not Free"
pnpm new:snippet "Logs Are Not Observability"
pnpm new:idea "Context Engineering"
```

Each script should:

1. Slugify the title.
2. Create a new `.mdx` file.
3. Insert default frontmatter.
4. Set status to `draft`.
5. Print the created file path.

Example output:

```txt
Created src/content/essays/retries-are-not-free.mdx
```

## 10. Styling Direction

The visual design should be minimal and text-first.

Use:

* Max content width: 680–760px
* Large readable font size
* Comfortable line height
* Strong link styling
* Subtle hover states
* Minimal borders
* No heavy cards
* No aggressive animations

Preferred visual feel:

```txt
Paul Graham simplicity
+ modern typography
+ better spacing
+ better navigation
+ code highlighting
```

## 11. Typography

Use a simple font pairing:

* Sans-serif for UI
* Serif or clean sans-serif for essays

Acceptable options:

```txt
Inter + Source Serif
Inter + Literata
IBM Plex Sans + IBM Plex Serif
```

The final implementation can use system fonts first to keep the site fast.

## 12. Homepage Layout

Homepage should look approximately like:

```txt
Zohar Yzgaev

Software engineer.

I write about AI engineering, distributed systems,
software architecture, programming, and ideas worth keeping.

Essays

- Context Engineering is the New API Design
- Systems Fail Exactly as Designed
- Building an AI Incident Investigator
- The Cost of Clever Code

Snippets

- Logs are not observability
- Retrying is a product decision
- Good APIs feel obvious

Currently thinking about

AI agents
Observability
Knowledge systems
Developer tools
```

## 13. Article Layout

Article page should look approximately like:

```txt
Retries Are Not Free

Why retry logic creates hidden bugs in distributed systems.

July 6, 2026 · 8 min read

distributed-systems reliability

---

Article body...

---

Connections

→ Related: Idempotency
→ Related: Observability
→ Expands on: Systems Fail Exactly as Designed

← Back to essays
```

## 14. Search

Use Pagefind for static search.

Requirements:

* Search should work after production build.
* Search should index essays, snippets, ideas, and about page.
* Search page should be simple and fast.
* Do not add a backend.

Pagefind is intended for static sites and works without hosting search infrastructure.

## 15. Markdown / MDX Features

Support:

* headings
* links
* blockquotes
* code blocks
* inline code
* lists
* tables
* footnotes if easy
* custom callout component
* simple diagrams later

Initial custom MDX components:

```txt
<Callout />
<Aside />
<Diagram />
```

Do not overbuild the component system in v1.

## 16. Code Highlighting

Use Shiki or Astro’s default syntax highlighting.

Code blocks should be readable, minimal, and consistent with the site design.

Nice-to-have:

* copy code button
* filename labels
* line highlighting

## 17. Performance Requirements

The site should be static-first.

Targets:

* Excellent Lighthouse score
* No unnecessary JavaScript on article pages
* Fast mobile rendering
* Minimal dependencies
* Search JavaScript only on search page if possible

## 18. Deployment

Deploy to:

* Vercel, or
* Cloudflare Pages

Build command:

```bash
pnpm build
```

Output:

```txt
dist/
```

## 19. Package Scripts

Add:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "new:essay": "tsx scripts/new-essay.ts",
    "new:snippet": "tsx scripts/new-snippet.ts",
    "new:idea": "tsx scripts/new-idea.ts"
  }
}
```

## 20. Acceptance Criteria

The implementation is complete when:

* The site builds successfully.
* Homepage displays latest essays and snippets.
* Essays render from MDX content collection.
* Snippets render from MDX content collection.
* Individual article pages work.
* Tag pages work.
* Draft posts are excluded from production pages.
* Search page works after build.
* New content scripts create valid MDX files.
* Site is responsive on mobile and desktop.
* Styling is minimal, neat, and readable.
* No database or CMS is required.

## 21. Non-Goals for V1

Do not implement:

* Admin dashboard
* Database
* Auth
* Newsletter
* Comments
* Analytics
* User accounts
* Complex graph visualization
* AI writing assistant
* Dynamic backend

## 22. Future Ideas

Later versions may add:

* `/now` page
* `/books` page
* visual idea graph
* newsletter export
* RSS feed
* OpenGraph image generation
* article series
* backlinks between posts
* command palette search
* private drafts preview
* GitHub-based publishing workflow

## 23. Implementation Plan

Phase 1: Project setup

* Create Astro project with TypeScript.
* Add MDX.
* Add Tailwind.
* Configure global styles.
* Create base layout.

Phase 2: Content system

* Add content collections.
* Add schemas.
* Add sample essays, snippets, and ideas.
* Add helper functions for sorting and filtering.

Phase 3: Pages

* Build homepage.
* Build essays archive.
* Build essay detail page.
* Build snippets archive.
* Build snippet detail page.
* Build tag pages.
* Build about page.

Phase 4: Writing UX

* Add new content scripts.
* Add draft filtering.
* Add reading time.
* Add connections rendering.

Phase 5: Search and polish

* Add Pagefind.
* Add search page.
* Polish responsive styles.
* Improve code block styling.
* Run build and check.

## 24. LLM Agent Instruction

Build this as a small, high-quality Astro project. Prefer simple code over clever abstractions. Keep the design minimal and typography-focused. Optimize for reading and easy publishing. Do not introduce a database, CMS, backend, auth, or unnecessary client-side JavaScript.

When uncertain, choose the simpler implementation.

