# Content Guidelines

## Content Types

### Essays
- **Length**: 1,500–3,500 words
- **Purpose**: Deep exploration of a topic, idea, or decision
- **Structure**: Problem → Context → Analysis → Implications → Takeaway
- **Time to read**: 8–15 minutes
- **Frequency**: As ideas fully develop, not forced schedule
- **Examples**: "Why retry logic creates hidden bugs", architectural decisions, lessons learned

### Write-ups
- **Length**: 300–800 words
- **Purpose**: Quick observation, principle, or hard-won lesson
- **Structure**: Observation → Why it matters → One key insight
- **Time to read**: 2–4 minutes
- **Frequency**: Can publish more frequently as ideas emerge
- **Examples**: "Good APIs feel obvious", "Logs are not observability", design principles

## What We Write About

### Core Topics
- **AI Engineering**: Building systems that integrate AI, designing for LLM capabilities and limitations
- **Distributed Systems**: Reliability, consistency, trade-offs, failure modes
- **Backend Architecture**: Scaling, performance, maintainability, operational concerns
- **Infrastructure**: Design decisions, deployment patterns, observability
- **Engineering Culture**: How to make decisions, lead without authority, build effective teams

### Angles & Perspectives
- Systems thinking (how components interact, cascading effects)
- Trade-offs (not "best practices" but understanding costs)
- Lessons from scale (what works with 100K users vs 1M)
- Operational reality (budget constraints, team skills, legacy code)
- Long-term maintainability (what survives, what rots)

### What We Don't Write About
- Beginner tutorials ("How to use Docker")
- Product reviews or comparisons
- Trends for trend's sake
- Technology you haven't actually used
- Abstract theory without practical grounding
- "10 tips" or listicles designed for clicks

## Structure & Organization

### Essay Structure Template

1. **Opening**: State the problem or question clearly
   - One or two sentences that make readers want to keep reading
   - Hint at why this matters without stating it yet

2. **Context**: Why this problem exists or how you encountered it
   - Real example, situation, or mistake you made
   - What assumptions led to the problem

3. **Analysis**: The deeper thinking
   - Break down the problem into parts
   - Show your reasoning step by step
   - Use examples to illustrate

4. **Implications**: What this means
   - How does this change your thinking?
   - What becomes possible or impossible?
   - What should you do differently?

5. **Closing**: One clear takeaway
   - Not a summary—a single insight or decision
   - Leave readers with something to think about or act on

### Write-up Structure Template

1. **Observation**: The insight in one sentence
2. **Why it matters**: One paragraph on consequences or context
3. **The key insight**: One additional thought that makes it land

## Frontmatter Rules

```yaml
---
title: "Clear, specific title (not 'Thoughts on X')"
description: "One sentence: what will readers learn or think about?"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]  # 2-4 tags, lowercase, hyphenated
status: "published"      # or "draft"
readTime: "X min read"   # Estimated reading time (e.g., "8 min read", "12 min read")
featured: true/false     # Optional, for important essays
connections: []          # Optional, related essay ideas
---
```

### Title Guidelines
- Specific, not generic ("Retries Are Not Free" not "On Retries")
- Clear what the reader will learn
- Avoid clickbait or vague promises
- Can be a statement, question, or assertion

### Description Guidelines
- One sentence that explains what the reader gets from this piece
- Not a teaser—actually describe the content
- Avoid marketing language

### Read Time Guidelines
- **Formula**: ~200 words per minute for technical content
- **Calculate**: Total word count ÷ 200 = minutes
- **Format**: "8 min read" (use "min" abbreviation)
- **Examples**:
  - 1,500 words ÷ 200 = 7.5 → "8 min read"
  - 2,000 words ÷ 200 = 10 → "10 min read"
  - 3,500 words ÷ 200 = 17.5 → "17 min read"
- **Note**: Technical content reads slower than news/blog posts, so use 200 wpm not 300 wpm
- **Why it matters**: Readers make decisions about engagement based on time. Be honest about the commitment.

### Tags
- Use consistently across posts
- Examples: "distributed-systems", "api-design", "reliability", "scaling"
- Don't over-tag (2-4 is ideal)
- Create new tags only when truly different

## Writing Process

### Before You Write
1. **Understand your insight**: Write three sentences describing what you've learned
2. **Identify the reader**: Who needs to hear this? What problem does it solve?
3. **Outline**: Bullet points of your main arguments
4. **Find examples**: What real situation illustrates this?

### While Writing
1. Write a rough draft without editing
2. Read it aloud—you'll catch awkward phrasing
3. Cut ruthlessly—every sentence should earn its place
4. Explain one thing at a time
5. Use examples before abstractions

### After Writing
1. Remove buzzwords and jargon
2. Ensure each paragraph has one main idea
3. Check that you've answered "why" not just "what"
4. Read the first and last paragraphs—do they align?
5. Ask: would I still publish this in a year?

## Guard Rails: Authenticity & Human Voice

**Every piece must pass these checks:**

### 1. No Double Hyphens (--) 
Search your text for " -- " and replace with:
- A period (.) for a hard break
- An em-dash (—) if you want flow
- A semicolon (;) if ideas are closely related
- Reword entirely if you're forcing the connection

**Bad**: "This works well -- it's both fast and reliable"
**Good**: "This works well. It's both fast and reliable." or "This works well—it's both fast and reliable."

### 2. Sound Like Yourself, Not a Bot
These phrases are AI dead-giveaways. Delete them:
- "It is worth noting that..."
- "It should be mentioned that..."  
- "One might consider..."
- "Some would say..."
- "In conclusion, it is clear that..."
- "Moving forward..."
- "At the end of the day..."

Replace with direct language:
- "Here's what I learned..."
- "This matters because..."
- "In practice, I've found..."
- "We discovered..."

### 3. Use Natural Contractions
- Write: "don't", "it's", "we've", "can't", "we're"
- Don't write: "do not", "it is", "we have", "cannot", "we are"
- Exception: Avoid contractions only when emphasizing negation for impact ("We will not tolerate this.")

### 4. Specific > Generic
Every claim needs an example or number:
- **Bad**: "This can have significant implications for performance."
- **Good**: "On our 10GB dataset, this change reduced query time from 45s to 2s."
- **Bad**: "Teams struggle with this."
- **Good**: "At three companies I worked at, we all made this mistake by year two."

### 5. Show Your Thinking
Don't just state conclusions:
- **Bad**: "Retries are important for reliability."
- **Good**: "We added retries for transient failures. At first, we thought they'd slow things down. Instead, we found they reduced our p99 latency because we stopped timing out on network hiccups."

### Final Authenticity Check
Before publishing, read one paragraph aloud. If it sounds like a corporate memo or a ChatGPT output, rewrite it. Your readers know the difference between human writing and automated writing. They prefer human.

## Code Examples

- Keep them short (5–15 lines usually)
- Show the pattern, not production code
- Include comments for non-obvious parts
- Pick real languages you've used (TypeScript, Python, Go)
- Avoid pseudocode—use real, runnable code

## Linking & References

- Link to other essays when relevant (no force-linking)
- Use full URLs for external sites (not shortened)
- Link to your own work only if it adds real context
- Avoid "see also" sections—integrate connections naturally

## Publishing Standards

- ✓ Proofread for typos and grammar
- ✓ Check that code examples actually work
- ✓ Ensure links are not broken
- ✓ Read once more before publishing
- ✓ Change status to "published" when ready

- ✗ Don't publish if you're not confident in the idea
- ✗ Don't publish to meet a schedule
- ✗ Don't publish if you can't defend the position
- ✗ Don't update published posts unless fixing errors (new insights → new post)

## Connecting Ideas

- Reference other essays in "connections" field
- But only if they genuinely build on each other
- Each essay should stand alone
- Use cross-references sparingly—they should feel natural
