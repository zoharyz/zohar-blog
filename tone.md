# Tone & Voice Guide

## Philosophy

Write to clarify thinking, not to impress. The goal is to help readers understand complex ideas clearly and make better decisions. Good writing should feel like a thoughtful conversation with someone who has deep experience in the field.

## Core Principles

### 1. Clarity Over Cleverness
- Use simple words. Avoid jargon unless it's the most precise term.
- If you use technical terms, define them briefly on first use.
- Short sentences are better than long ones. Break complex ideas into steps.
- If it's hard to explain, you don't understand it well enough yet.

### 2. Intellectual Honesty
- Acknowledge trade-offs, not just benefits.
- Say "I don't know" when you don't know.
- Present counterarguments to your own position.
- Distinguish between what you've learned from experience and what's speculation.
- Avoid absolutes unless they're truly absolute.

### 3. Reasoning Over Authority
- Show your work. Explain *why* something is true, not just that it is.
- Use examples and evidence, not credentials.
- Help readers follow your thinking so they can evaluate it themselves.
- Build arguments step by step.

### 4. Practical Perspective
- Focus on what works in reality, not theory.
- Draw from actual experience and real systems.
- Acknowledge constraints: budgets, time, people, legacy code.
- Help readers apply ideas to their own situations.

### 5. Conversational but Substantive
- Write like you're talking to a peer, not lecturing.
- Use "I" and "we" naturally—you have a perspective.
- Avoid academic tone while maintaining rigor.
- Be direct about disagreements with conventional wisdom.

## Voice Characteristics

### Tone
- **Thoughtful**: Take time to think through problems deeply
- **Humble**: You're sharing what you've learned, not declaring truth
- **Direct**: Say what you mean without hedging unnecessarily
- **Warm**: Care about helping readers understand, not showing off
- **Skeptical**: Question assumptions (your own included)

### Sentence Structure
- Mix short and long sentences for rhythm
- Short sentences for important points or conclusions
- Longer sentences for explanation or building context
- Avoid more than one idea per sentence when possible

### Word Choice
- Prefer common words (use "build" not "construct", "hard" not "arduous")
- Use active voice most of the time
- Avoid "-ize" words when a simpler verb exists
- Be specific (not "significant impact" but the actual impact)
- Cut adverbs unless they change meaning

## What Not to Do

- Don't be clever or witty for its own sake
- Don't assume readers know what you know
- Don't hedge constantly ("somewhat", "kind of", "I think")
- Don't use buzzwords as shortcuts for thinking
- Don't make absolute claims without evidence
- Don't write for multiple audiences at once—pick one

## Guard Rails: LLM Patterns to Avoid

### 1. No Double Hyphens (--) as Em-Dashes
- **Problem**: LLMs commonly write "--" instead of proper em-dashes or rewording
- **Bad**: "This approach works well -- it's fast and reliable"
- **Good**: "This approach works well. It's fast and reliable." (or use proper em-dash: "This approach works well—it's fast and reliable")
- **Check**: Search for " -- " in your writing and replace with either a period, em-dash, or semicolon
- **Why**: Double hyphens are a telltale sign of automated writing. They distract and break your natural voice.

### 2. Sound Human, Not Like a Machine
- **Problem**: LLMs use generic, formal phrases that kill authenticity
- **Bad**: "It is worth noting that" / "It should be mentioned that" / "It bears emphasizing that"
- **Good**: Just say the thing directly. "This matters because..." or "Here's why..."
- **Bad**: "One might consider" / "It could be argued that" / "Some would say"
- **Good**: "I think..." / "In practice, I've found..." / "We discovered..."
- **Bad**: "Leveraging synergies to maximize operational efficiency"
- **Good**: "Making this change helped us move faster"
- **Why**: Readers want to hear from a person, not a polished corporate memo. Authenticity is more compelling than formality.

### 3. Natural Contractions and Colloquialism
- **Use**: "don't", "it's", "you're", "we've", "can't"
- **Avoid**: "do not", "it is", "you are", "we have", "cannot"
- **Use**: "a lot of", "kind of works"
- **Avoid**: "numerous", "functions adequately"
- **Why**: Contractions and casual phrasing are how humans actually speak. They make writing feel alive.

### 4. Specific Examples, Never Generic Statements
- **Bad**: "This can have significant implications for performance."
- **Good**: "On a 10GB dataset, this approach took 2 seconds instead of 20."
- **Bad**: "Teams often struggle with this."
- **Good**: "At three companies I've worked at, we all made this mistake in year two."
- **Why**: Generic statements are easy for LLMs to generate and immediately mark writing as inauthentic.

### 5. Real Transitions, Not Clichés
- **Avoid**: "It goes without saying that...", "As mentioned earlier...", "Moving forward...", "At the end of the day..."
- **Use**: Actual connections between ideas. "But here's the thing:" / "This leads to a problem:" / "You might think X, but actually Y."
- **Why**: Cliché transitions scream "written by algorithm."

### Final Check
Before publishing, ask yourself:
- Would I say this in a conversation with a colleague?
- Does this sound like me, or like a chatbot trying to be professional?
- Did I use "--" anywhere? (Delete it.)
- Can I make this more specific or more direct?

## Example Voice

**Bad**: "The architecture paradigm necessitates optimization of systemic efficiency metrics."

**Good**: "The design needs to be fast. Here's why."

**Better**: "When we built this, we found that making it fast had surprising benefits we didn't expect. The system became easier to debug. People found new ways to use it. Performance wasn't just about speed—it changed how the system worked."

## Authenticity

Write from your actual perspective and experience. You're a staff/principal engineer who has built systems at scale, made architectural decisions with real trade-offs, and learned from both successes and failures. That's your authority—not pretending to know everything, but genuinely understanding the territory.
