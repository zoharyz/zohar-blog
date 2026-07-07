# Style Guide

## Formatting & Syntax

### Headings
- Use `#` for main title (h1)—one per article
- Use `##` for sections (h2)
- Use `###` for subsections (h3)
- Avoid more than three levels of nesting
- Make headings descriptive, not clever

### Emphasis
- **Bold** for important concepts or terms on first mention
- *Italic* for emphasis, foreign words, or edge cases
- Don't overuse emphasis—it dilutes impact

### Lists
- Use bullet points for unordered ideas
- Use numbered lists only when order matters
- Keep items parallel in structure
- 3–7 items per list (more = consider restructuring)

### Line Breaks
- One blank line between paragraphs
- One blank line before headings
- No extra spacing for emphasis

## Technical Writing

### Code Blocks

**Good**: Shows the pattern and concept
```typescript
async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      await sleep(1000 * attempt);
    }
  }
}
```

**Avoid**: Production code with many details
```typescript
// 50 lines of error handling, logging, metrics...
// Makes the point hard to see
```

### Code Example Guidelines
- Prefer TypeScript (statically typed, clear intent)
- Python for algorithms or data-focused examples
- Go for systems/concurrency examples
- Use real syntax, not pseudocode
- Keep functions/examples under 20 lines
- Include comments only for non-obvious parts
- Show error handling if it's the point of the example
- Use meaningful variable names

### Terminology & Terms

#### Jargon to Avoid (Use Clearer Alternatives)
- "leverage" → use
- "utilize" → use
- "paradigm" → approach or model
- "solution" → (be specific: system, approach, design)
- "scalable" → (be specific: handles 10x more requests, grows with data size)
- "robust" → (be specific: handles failures, remains consistent)
- "elegant" → (be specific: simple, efficient, maintainable)

#### Technical Terms (Define First Time)
- **Idempotency**: An operation is idempotent if calling it multiple times has the same effect as calling it once
- **Consistency**: All copies of data are the same at any point in time
- **Trade-off**: A situation where improving one aspect worsens another

#### Ways to Define Terms
1. **Inline definition**: "Idempotency—the property that applying an operation multiple times has the same effect as applying it once—is critical for retries."
2. **Footnote/callout**: Important but not central to the flow
3. **Brief explanation**: "You need what's called eventual consistency (where all copies eventually match, but might differ temporarily)."

### Numbers & Metrics
- Write out small numbers (one, five, twenty)
- Use numerals for large numbers or measurements (100, 1000, 1.5GB)
- Include units (seconds, milliseconds, percentage)
- Be specific ("50% slower" not "much slower")
- Round to meaningful precision (not 1.2394ms, use 1.24ms or 1.2ms)

### Examples & Analogies

#### Strong Analogy
- "Think of a distributed system like a group of friends planning a trip. They start with different plans, gradually align as they talk more, but temporarily they disagree. That's eventual consistency."

#### Weak Analogy
- "It's like a web"
- "Think of it like a cloud"
- (These explain nothing)

#### How to Use Analogies
1. Use when the concept is unfamiliar
2. Pick analogies from everyday experience
3. Acknowledge where analogies break down
4. Use sparingly (one per essay)

### Real-World Examples

**Good**: Specific, shows the principle in context
"When we increased timeout from 5 to 30 seconds, p99 latency went from 50ms to 800ms. Customers thought the service was broken. A shorter timeout was better—it failed fast instead of hanging."

**Bad**: Vague, doesn't illustrate the point
"Timeouts are important because they affect latency."

#### Framework for Examples
1. Situation: What were you building?
2. Problem: What went wrong?
3. Discovery: What did you learn?
4. Implication: Why does this matter?

## Structure & Flow

### Paragraph Length
- 3–5 sentences is ideal
- One idea per paragraph
- Vary length for rhythm (short for impact, longer for explanation)

### Transitions
- "This leads to..." for natural progression
- "But here's the key..." for important insight
- "In practice, this means..." for application
- "You might think..." to address objections
- Avoid: "Another point is..."

### Building Arguments

#### Good Argument Flow
1. State observation or problem
2. Explain why it matters
3. Show how it happens
4. Give implications
5. Suggest what to do differently

#### Bad Argument Flow
- Jumping between topics
- Assuming reader knows context
- Making claims without evidence
- Listing facts without connection

## Words & Phrases

### Preferred Phrasing

| Instead of | Use |
|-----------|-----|
| "It is important to note that" | (Just say it) |
| "In order to" | "To" |
| "At the end of the day" | (Remove, or be specific) |
| "Basically" | (Remove) |
| "Obviously" | (Remove—if it's obvious, don't say it) |
| "It goes without saying" | (Then don't say it) |
| "Needless to say" | (Then don't say it) |
| "Some people say" | (Be specific or cite) |
| "In my opinion" | (Just state it—you're the author) |
| "It seems like" | (Be confident or admit uncertainty) |
| "It's interesting that" | (Explain why it's interesting) |

### Confidence & Uncertainty

**State clearly when uncertain**:
- "I'm not certain, but..."
- "Based on my experience, not research..."
- "This is speculation, but..."

**Don't hedge needlessly**:
- ✗ "I kind of think this might be somewhat important"
- ✓ "This is important"

## Common Errors

### Vagueness
- ✗ "Distributed systems are complex"
- ✓ "When you add multiple servers, you have to handle the case where they disagree about the current state"

### False Authority
- ✗ "Everyone knows that..."
- ✓ "In my experience..." or "Research shows..."

### Unexplained References
- ✗ "Unlike microservices, monoliths..."
- ✓ "If you're using many small services (microservices), you avoid this problem, but if you're using one large system (a monolith), you have to manage it carefully"

### Jargon Without Context
- ✗ "This requires eventual consistency"
- ✓ "The copies won't always match immediately—they'll eventually agree. This is called eventual consistency."

### Missing Connective Tissue
- ✗ Paragraph about timeouts. Then paragraph about load balancing. No connection.
- ✓ "This timeout issue is related to another problem: load balancing. Here's how..."

## Formatting Examples

### Before and After

**Before**:
"Retries are important. They help with reliability. You should use them carefully. They can cause issues."

**After**:
"Retries seem simple: if something fails, try again. But there's a hidden danger. If the first attempt succeeds but the response is lost, you'll make the request twice. Your system thinks it failed when it actually worked."

### How to Spot & Fix Vagueness

1. **Read aloud**: Does every sentence make sense on its own?
2. **Ask "why?"**: Can you explain why to someone unfamiliar?
3. **Be specific**: Replace adjectives (good, important, complex) with descriptions
4. **Show, don't tell**: Use examples instead of assertions

## Accessibility

### For Different Readers

**Readers unfamiliar with the topic**: Explain fundamental concepts without assuming knowledge

**Readers who know this well**: Give them something new or a different perspective

**Both**: Layer information—simple explanation first, then deepen

### Code Formatting
- Use syntax highlighting (languages: typescript, python, go, bash)
- Keep code readable for both experts and newcomers
- Avoid super-short variable names (use `timeout` not `t`)

## Revision Checklist

- [ ] Every sentence adds value
- [ ] No vague words (good, bad, important, complex)
- [ ] Technical terms are defined or linked
- [ ] Examples are specific and illustrative
- [ ] Argument flows logically
- [ ] Analogies illuminate rather than confuse
- [ ] Code examples are runnable
- [ ] No jargon as shortcut for thinking
- [ ] Confident where confident, uncertain where uncertain
- [ ] Could be understood by an engineer new to the topic
- [ ] Could be respected by an expert in the topic
