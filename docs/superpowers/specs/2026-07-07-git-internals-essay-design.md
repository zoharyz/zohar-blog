# Git Internals Essay Design

**Date:** 2026-07-07  
**Type:** Essay (no POC)  
**Status:** Design approved

---

## Project Overview

**Title:** "Git Internals: How Content Addressing and Three-Way Merge Power Your Workflow"

An essay exploring Git's internal design and its practical implications for merging strategies and developer/team velocity. Aimed at intermediate developers who use Git daily but want to understand what's actually happening under the hood.

**Core Promise:** Understand Git objects and three-way merge algorithms → apply to smarter merging strategies → improve team velocity and code review cycles.

---

## Scope & Constraints

**In Scope:**
- Git objects (blobs, trees, commits, tags) and content addressing (SHA-1 hashing)
- Three-way merge algorithm and how conflicts are resolved
- Merging strategies (merge commits, rebase, squash) and their trade-offs
- How understanding internals informs strategy choice for different team structures
- Practical velocity implications (cleaner history, fewer conflicts, faster reviews)

**Out of Scope:**
- Git plumbing commands (git cat-file, git hash-object, etc.) — may reference but not deep dive
- Advanced git internals (pack files, garbage collection, shallow clones)
- Distributed merge algorithms or advanced conflict resolution
- Building a Git clone or implementation

**No Companion POC** — this is a pure essay with code snippets and examples.

---

## Audience

**Primary:** Intermediate developers
- Use Git daily for work
- Understand branches, commits, merging at surface level
- Want to understand why Git works the way it does
- Interested in improving team workflows

**Knowledge Assumed:**
- Basic Git operations (commit, push, pull, merge, rebase)
- Familiarity with merge conflicts and rebasing
- Understanding of what a commit is (high level)

**Knowledge NOT Assumed:**
- How Git actually stores commits
- How three-way merge algorithm works
- Deep familiarity with rebase/merge strategy tradeoffs

---

## Essay Structure (Theory → Practice → Velocity)

### Part 1: Git Objects & Content Addressing (~800 words)

**Purpose:** Build the foundation. Explain how Git's immutable, content-addressed design enables everything that follows.

**Key Concepts:**
- Everything in Git is an object: blobs (files), trees (directories), commits (snapshots), tags
- Each object is identified by SHA-1 hash of its content
- Commits are immutable snapshots pointing to a tree and parent commits
- The commit DAG (directed acyclic graph) is deterministic — same content always produces same hash

**Narrative Arc:**
1. Start with: "When you commit, Git doesn't store diffs. It stores snapshots."
2. Explain objects: blobs are file content, trees are directory structure
3. Show how commits reference parent commits, forming a DAG
4. Explain why this matters: determinism, reproducibility, enables safe merging

**Code Snippets:**
- Show what a commit object looks like (hash, tree pointer, parent pointer, message, author)
- Pseudocode or simple example showing how Git constructs SHA-1 hashes
- Example: "Commit ABC123... = hash(tree:XYZ, parent:DEF456, message:'Fix bug')"
- Maybe show git cat-file output to make it concrete

**Aha Moments:**
1. Commits are just content hashes — the entire history is deterministic
2. You can't silently corrupt Git history (hash validation catches it)
3. This design is why merging is possible — Git has a complete, immutable record

**Ending:** "Now that you understand commits are immutable, content-addressed objects, let's see how Git uses this to merge branches."

---

### Part 2: Three-Way Merge Algorithm (~1200 words)

**Purpose:** Deep dive into how Git resolves merges. This is the "quirk" section — show what's actually happening when conflicts occur.

**Key Concepts:**
- Two-way merge (comparing only before/after) is insufficient
- Three-way merge (base + ours + theirs) is Git's approach
- Git diffs each side from the common ancestor, then combines
- Conflict markers show the three versions Git is trying to reconcile
- Recursive merge for multiple branches

**Narrative Arc:**
1. Start with a merge conflict scenario
2. Ask: "What does Git actually see when you merge?"
3. Explain two-way merge limitation (can't tell who changed what)
4. Introduce three-way merge (looks at common ancestor)
5. Walk through algorithm: diff(base→ours) and diff(base→theirs), then combine
6. Show what conflict markers represent (base, ours, theirs)
7. Explain recursive merge (merging multiple commits)

**Code Snippets:**
- Pseudocode of three-way merge algorithm
- Example merge scenario with actual file content showing base/ours/theirs
- Show what conflict markers mean (<<<, ===, >>>)
- Example of a conflict Git resolves automatically vs. one that requires manual intervention

**Examples:**
- Simple case: both sides add different lines → auto-merge
- Conflict case: both sides modify same line differently → conflict markers
- Tricky case: one side modifies, other side deletes → why this creates conflict

**Aha Moments:**
1. Git doesn't just compare before/after — it looks at what each side changed from the common ancestor
2. This is why some conflicts look "weird" but are actually correct (both sides modified same line)
3. Understanding this helps you predict when conflicts will happen
4. Conflict markers show you the three versions Git couldn't automatically reconcile

**Ending:** "Now that you understand how Git merges at the algorithm level, let's talk about strategies that work with this, not against it."

---

### Part 3: Merging Strategies & When to Use Them (~1000 words)

**Purpose:** Apply theory to practice. Show how understanding objects + three-way merge informs strategy choice.

**Key Concepts:**
- **Merge commits**: Preserves the full DAG, shows integration points, but history can branch
- **Rebase**: Linear history, replays your commits on top of main, cleaner log
- **Squash**: Collapses multiple commits into one, useful for feature branches but loses granularity

**Narrative Arc:**
1. Recap: commits are immutable objects in a DAG, three-way merge works on content changes
2. Explain merge commits: creates new commit combining both branches, preserves full history
3. Explain rebase: replays your commits on top of main (using three-way merge internally)
4. Explain squash: combines multiple commits into one (loses intermediate history)
5. Trade-offs of each through lens of what we learned:
   - Merge commits: preserve the full picture of what happened, but harder to read history
   - Rebase: linear history is easier to follow, but you can't see "integration points"
   - Squash: very clean feature branches, but loses context of intermediate steps

**Code Snippets:**
- Show commit graph before/after merge commit
- Show commit graph before/after rebase
- Show commit graph before/after squash
- Example: "When you rebase, Git replays each of your commits on top of main using three-way merge"

**Examples:**
- Small feature branch (1-2 commits) → squash makes sense
- Medium feature branch (5-10 commits) → rebase or merge commit?
- Large integration (multiple teams) → merge commits preserve integration story

**Aha Moment:**
Understanding the DAG and three-way merge helps you choose: Do you want to preserve the full history (merge), keep a linear story (rebase), or simplify the feature (squash)?

---

### Part 4: Team Velocity Impact (~600 words)

**Purpose:** Connect internals to real developer/team outcomes.

**Key Concepts:**
- Clear history → faster code reviews (reviewers understand "what changed and why")
- Consistent strategy → predictable workflows, easier onboarding
- Conflict reduction → less merge time (good branching strategies reduce thrashing)
- Different strategies for different team structures

**Narrative Arc:**
1. Recap: we now understand how Git works internally
2. How this enables better merging strategies
3. Real-world velocity implications:
   - Code review velocity (reviewers can quickly see what changed and why)
   - Merge velocity (fewer conflicts, faster conflict resolution)
   - Onboarding velocity (consistent strategy, easy to learn)
   - Debugging velocity (clear history helps `git log` and `git blame`)
4. Strategies by team structure:
   - Small team (3-5 developers) → rebase-heavy for simplicity
   - Medium team (10-20) → merge commits for feature branches, rebase on main
   - Large team (50+) → merge commits everywhere for integration traceability
5. Measuring impact: commit graph cleanliness, merge frequency, conflict rate

**Examples:**
- Before/after: switching from chaotic merges to consistent rebase strategy
- Real scenario: debugging a production issue, clean history helps trace the root cause
- Onboarding: new developer understands team's commit history vs. spaghetti graph

**Aha Moment:**
Your merging strategy isn't just about aesthetics — it's about team communication. Clear history is fast history.

---

## Tone & Writing Style

**Follow established guidelines:**
- **tone.md**: Conversational but substantive, clarity over cleverness, practical perspective
- **style-guide.md**: Specific examples not vague claims, explain jargon first time, 3-5 sentence paragraphs
- **content-guidelines.md**: Clear intro, structured body, actionable conclusion

**Key voice elements for this essay:**
- Honesty about trade-offs (no strategy is universally best)
- Practical focus (why intermediate developers should care)
- Concrete examples (not abstract algorithm descriptions)
- Avoid: "elegant," "robust," "scalable" (use specific descriptions instead)
- Explain before jargon (define DAG, three-way merge, etc. before assuming readers know)

---

## Code & Examples

**Code Snippet Guidelines:**
- Use shell/git commands and/or simple pseudocode
- Keep snippets under 20 lines
- Show actual Git output when illustrative
- Include strategic comments for non-obvious parts

**Example Types:**
- Real Git output (git log, git merge output, conflict markers)
- Pseudocode of three-way merge algorithm
- Commit graph ASCII diagrams (showing DAG structure)
- File content showing what Git sees (base, ours, theirs)

**Balance:**
- Enough code to make concepts concrete
- Not so much that it overwhelms explanation
- Each code snippet should illustrate one specific idea

---

## Success Criteria

**Essay Goals:**
- [ ] Intermediate developers understand how Git objects work and why it matters
- [ ] Readers can explain three-way merge algorithm to a colleague
- [ ] Readers understand trade-offs of merge/rebase/squash strategies
- [ ] Readers see concrete connection between internals and team velocity
- [ ] Essay feels practical, not academic

**Writing Goals:**
- [ ] Follows tone.md (conversational but substantive)
- [ ] Follows style-guide.md (specific, clear, no unnecessary jargon)
- [ ] Approximately 3600 words (solid essay, not overwhelming)
- [ ] Includes real examples and code snippets
- [ ] Each section has an "aha moment" that lands

---

## Open Questions for Writing Phase

1. Should we include git commands (git rebase, git merge) or stick to conceptual explanation?
2. How much ASCII diagram vs. prose explanation for commit graphs?
3. For Part 4 (velocity), should we include metrics/data or keep it qualitative?
4. Any specific merging strategy pain points from previous blog post we should reference?

---

## Next Steps

1. ✅ Design approved
2. → Write implementation plan (writing-plans skill)
3. → Write essay following plan
4. → Review against tone/style/content guidelines
5. → Publish

