# Git Internals Essay Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write a ~3600-word essay on Git internals covering objects/hashing, three-way merge algorithms, merging strategies, and team velocity impact for intermediate developers.

**Architecture:** Four-part progressive structure: build mental model (objects + hashing), explain the algorithm (three-way merge), apply to practice (strategies), show impact (velocity). Each part builds on prior knowledge. Balanced code snippets and prose. Following established tone and style guidelines.

**Tech Stack:** Markdown essay for Astro blog. Code snippets in bash/pseudocode. Git content examples.

## Global Constraints

- Approximate length: 3600 words (not a hard limit, but aim for this)
- Audience: Intermediate developers (daily Git users wanting deeper understanding)
- Tone: Conversational but substantive (follow tone.md)
- Style: Clear, specific, no jargon without context (follow style-guide.md)
- Code snippets: Balanced with explanation, under 20 lines each, illustrative not exhaustive
- No POC — essay only
- Follow content-guidelines.md essay structure (intro, body, conclusion)

---

## File Structure

**Essay file:** `src/content/blog/git-internals-objects-merge-velocity.md`
- Front matter with metadata (title, date, description, tags)
- Four-part essay content (~3600 words total)
- Code snippets embedded in markdown
- No external image dependencies

---

## Task Breakdown

### Task 1: Essay Outline & Introduction

**Files:**
- Create: `src/content/blog/git-internals-objects-merge-velocity.md` (skeleton with outline)

**Interfaces:**
- Produces: Essay file with front matter + section outlines + introduction paragraph

- [ ] **Step 1: Create essay file with front matter**

Create `src/content/blog/git-internals-objects-merge-velocity.md` with this front matter:

```markdown
---
title: "Git Internals: How Content Addressing and Three-Way Merge Power Your Workflow"
description: "Understand Git objects, commit hashing, three-way merge algorithms, and how this knowledge helps you choose better merging strategies and improve team velocity."
pubDate: 2026-07-07
tags: ["git", "internals", "merge-strategies", "developer-velocity"]
category: "engineering"
---
```

- [ ] **Step 2: Add section outline**

Below front matter, add this comment structure (for reference during writing):

```markdown
<!-- 
OUTLINE:
- Introduction (~200 words)
- Part 1: Git Objects & Content Addressing (~800 words)
- Part 2: Three-Way Merge Algorithm (~1200 words)
- Part 3: Merging Strategies (~1000 words)
- Part 4: Team Velocity Impact (~600 words)
- Conclusion (~100 words)
Total: ~3900 words
-->

## Introduction
[TO WRITE]

## Part 1: Git Objects & Content Addressing
[TO WRITE]

## Part 2: Three-Way Merge Algorithm
[TO WRITE]

## Part 3: Merging Strategies & When to Use Them
[TO WRITE]

## Part 4: Team Velocity Impact
[TO WRITE]

## Conclusion
[TO WRITE]
```

- [ ] **Step 3: Write introduction**

Replace `[TO WRITE]` in Introduction section with prose that:
- Hooks reader: "When you commit, Git doesn't store diffs. It stores snapshots."
- Previews what they'll learn
- Explains why it matters (better merging strategies → team velocity)
- ~200 words

Example opening:
```markdown
## Introduction

When you run `git commit`, something interesting happens. Git doesn't store the differences between files. Instead, it stores a complete snapshot of your project at that moment—and it references that snapshot by the SHA-1 hash of its content.

This seemingly small design decision cascades into everything Git does well: immutability, reproducibility, and powerful merging. In this essay, we'll explore how Git's internal design actually works, then use that understanding to make better decisions about merging strategies.

By the end, you'll understand:
- How Git uses content addressing to make history immutable and safe
- Why three-way merge works the way it does (and why some conflicts look weird)
- How to choose merge vs. rebase vs. squash based on what you're trying to achieve
- How better merging strategies improve developer and team velocity

Let's start at the foundation: Git objects.
```

- [ ] **Step 4: Commit outline**

```bash
git add src/content/blog/git-internals-objects-merge-velocity.md
git commit -m "chore: create essay skeleton with outline and introduction

- Add front matter with metadata
- Add section outline comments
- Write introduction (~200 words)
- Previews Git objects, merge algorithms, strategies, and velocity impact"
```

---

### Task 2: Part 1 - Git Objects & Content Addressing

**Files:**
- Modify: `src/content/blog/git-internals-objects-merge-velocity.md`

**Interfaces:**
- Consumes: Introduction from Task 1
- Produces: Part 1 content (~800 words) with code snippets showing git objects, hashing, DAG structure

- [ ] **Step 1: Write "Git Objects: Blobs, Trees, and Commits" section**

Replace `[TO WRITE]` in Part 1 with section explaining objects. ~250 words. Include:

```markdown
### Git Objects: Blobs, Trees, and Commits

Everything Git stores is an object. Git tracks only four types: blobs, trees, commits, and tags. Understanding these is the foundation.

A **blob** is simple: it's just file content. When you create a file and commit it, Git stores the file's content as a blob. The blob itself has no name or metadata—just content.

A **tree** is a directory snapshot. It's a list of entries, each saying "this name points to this blob" or "this name points to this tree." Trees are how Git represents your directory structure at a given moment.

A **commit** ties it all together. It points to:
- A tree (the directory structure at this moment)
- One or more parent commits (the commits before this one)
- Metadata (author, timestamp, commit message)

Here's what a commit object looks like conceptually:

```
commit abc123def456...
tree 789ghi012jkl...
parent def456ghi789...
author Zohar <zohar@example.com>
date Wed Jul 7 2026 10:30:00 -0700

Fix bug in merge conflict detection
```

The key insight: this structure is always the same. If you commit the same content with the same parent at the same time, you get the same hash. Git's hashing is deterministic.
```

- [ ] **Step 2: Write "Content Addressing: Commits as Hashes" section**

~300 words explaining SHA-1 hashing and why it matters:

```markdown
### Content Addressing: Commits as Hashes

Here's what makes Git's design remarkable: Git doesn't number commits (0, 1, 2...). Instead, Git computes a SHA-1 hash of the commit object and uses that as the commit's identity.

In practice, you see this as: `abc123def456...` (usually shortened to 7-12 characters).

The hash is computed from the commit's content: its tree, parents, author, timestamp, and message. If any of these change, the hash changes. This means:

**1. Commits are immutable.** If someone tries to change a commit's message, the hash changes. Git knows it's a different commit. The old commit still exists (unless explicitly deleted), and anything that pointed to it still works.

**2. History is tamper-evident.** If someone tries to silently corrupt a commit deep in history, the hash no longer matches. Git can detect this. Compare this to other version control systems that use sequential numbering—you could change a commit and no one would know unless they manually checked.

**3. Merging is safe.** Because commits are immutable and reproducible, Git can confidently merge branches. If you merge the same two commits today as yesterday, Git knows it's the same merge (same result).

This is why Git is fundamentally different from many other VCS tools. You're not just storing history—you're storing tamper-proof history.

An example: if you run `git log --oneline`, you see something like:

```
abc1234 Fix bug in merge conflict detection
def5678 Refactor merge strategy logic
ghi9012 Add three-way merge test
```

Each hash is the fingerprint of that commit's content. Same content = same hash, always. Different computer, different time, same commit = same hash.
```

- [ ] **Step 3: Write "The Commit DAG" section**

~250 words explaining how commits form a directed acyclic graph:

```markdown
### The Commit DAG

Commits don't exist in isolation. Each commit points to its parent (or parents, in a merge). This creates a directed acyclic graph (DAG)—a structure where commits are nodes and "points to parent" edges form the graph.

On a single branch, this looks linear:

```
commit1 -> commit2 -> commit3 -> HEAD (main)
```

When you create a branch and merge, it looks like:

```
                 feature-branch
                      |
         commit2 -----+--> commit4 (merge commit)
         /                   /
commit1                      /
         \                   /
          commit3 -----------
                  |
                 main
```

Here, commit4 is a merge commit. It has two parents: commit3 (from main) and commit2 (from feature-branch, shown as commit2 in the feature history).

Why does this matter? Because Git can traverse this graph. When you merge branches, Git looks at the graph and finds the common ancestor (commit1 in this example). This common ancestor is crucial for three-way merge—which we'll explore next.

The DAG is deterministic. If you have the same commits in the same order with the same parents, the DAG looks the same. Git doesn't have to ask "where is this branch?" or "what's the current state?"—it's all in the hashes and the DAG.
```

- [ ] **Step 4: Review Part 1 for tone/style consistency**

Read through Part 1 (~800 words total) and check:
- Is it conversational but substantive? (Check against tone.md)
- Are technical terms explained? (Check against style-guide.md)
- Are there concrete examples? (No vague claims)
- Do code snippets illustrate the concept?

If needed, refine wording. Focus on clarity.

- [ ] **Step 5: Commit Part 1**

```bash
git add src/content/blog/git-internals-objects-merge-velocity.md
git commit -m "feat: write Part 1 - Git Objects & Content Addressing

- Explain blobs, trees, commits
- Show commit object structure
- Explain SHA-1 hashing and immutability
- Introduce commit DAG concept
- Include code/diagram examples (~800 words)"
```

---

### Task 3: Part 2 - Three-Way Merge Algorithm

**Files:**
- Modify: `src/content/blog/git-internals-objects-merge-velocity.md`

**Interfaces:**
- Consumes: Part 1 (objects, hashing, DAG)
- Produces: Part 2 content (~1200 words) with three-way merge algorithm explanation and examples

- [ ] **Step 1: Write "The Problem: Two-Way Merge" section**

~250 words explaining why naive merging doesn't work:

```markdown
### The Problem: Two-Way Merge

Imagine you're merging two branches. The naive approach: compare file contents before (main) and after (feature). If both changed the same line, conflict. If only one changed, auto-merge.

This is a two-way merge. It doesn't work well.

Example:
```
Main branch, file.txt:          Feature branch, file.txt:
line 1                          line 1
line 2                          line 2 MODIFIED
line 3                          line 3
```

Two-way merge sees:
- Line 1: same in both → auto-merge
- Line 2: different → CONFLICT
- Line 3: same in both → auto-merge

But here's the problem: you can't tell what changed. Did main delete line 2? Did feature add a new line 2? You don't know without looking at history.

This is why Git uses three-way merge instead.
```

- [ ] **Step 2: Write "Three-Way Merge: The Solution" section**

~350 words explaining the algorithm:

```markdown
### Three-Way Merge: The Solution

Three-way merge looks at three versions: the common ancestor (base), the main branch version (ours), and the feature branch version (theirs).

Algorithm:
1. Find the common ancestor of both branches (using the DAG)
2. Diff the base to ours: what did we change?
3. Diff the base to theirs: what did they change?
4. For each line:
   - If both changed it the same way: keep the change
   - If only one side changed it: auto-merge (take that change)
   - If both changed it differently: CONFLICT (let developer decide)

Example:

```
BASE (common ancestor):          OURS (main):                    THEIRS (feature):
line 1                           line 1                          line 1
line 2                           line 2 MODIFIED                 line 2 (unchanged from base)
line 3                           line 3                          line 3 MODIFIED
```

Three-way merge analysis:
- Line 1: base=ours=theirs → no change → keep as is
- Line 2: base != ours, base == theirs → only we changed → auto-merge (take our change)
- Line 3: base != theirs, base == ours → only they changed → auto-merge (take their change)

Result: auto-merge succeeds. No conflict.

This is more intelligent than two-way because Git understands intent: "we modified line 2" vs. "they modified line 3" → different changes → safe to combine.

If both sides modified the same line differently:
```
BASE:                OURS:                   THEIRS:
line 1               line 1 MODIFIED A       line 1 MODIFIED B
```

Git can't auto-merge. It produces conflict markers:

```
<<<<<<< HEAD
line 1 MODIFIED A
=======
line 1 MODIFIED B
>>>>>>> feature-branch
```

This shows all three versions (implicitly: base is not shown, but marked by the conflict markers).
```

- [ ] **Step 3: Write "Conflict Markers Explained" section**

~250 words showing what conflict markers mean:

```markdown
### Conflict Markers Explained

When Git can't auto-merge, it creates conflict markers in the file. Understanding what they mean is crucial.

```
<<<<<<< HEAD
their code
=======
our code
>>>>>>> feature-branch
```

Breaking this down:
- `<<<<<<< HEAD` marks the start of our version (HEAD = current branch)
- `=======` marks the divider
- `>>>>>>> feature-branch` marks the end of their version (the branch we're merging in)

The conflict marker shows ours/theirs, but remember: Git used three-way merge. It looked at the base. The conflict happened because both sides changed the same line differently. The base version isn't shown (it's implied by the difference between ours and theirs).

If you want to see the base version, use `git show :1:<filename>` (the base), `:2:<filename>` (ours), `:3:<filename>` (theirs).

Example with more context:

```
<<<<<<< HEAD (main branch)
const result = merge(base, ours, theirs)
||||||| merged common ancestors
const result = merge(base)
=======
function mergeThreeWay(base, ours, theirs) {
  // merge logic
>>>>>>> feature-branch
```

The `||||||| merged common ancestors` section shows the base if you have verbose conflict markers enabled. This makes it easier to understand what both sides changed.
```

- [ ] **Step 4: Write "Recursive Merge: Merging Multiple Branches" section**

~300 words explaining Git's recursive merge strategy:

```markdown
### Recursive Merge: Merging Multiple Branches

What if you're merging a branch that itself is a merge of other branches? Git handles this with recursive merge.

Git finds all common ancestors and recursively merges them first. Here's the algorithm (simplified):

1. If one branch is an ancestor of the other, fast-forward
2. If not, find all common ancestors
3. If there's one common ancestor, do three-way merge (as described above)
4. If there are multiple common ancestors, recursively merge those ancestors, then use the result as the base for three-way merge

Example: you have main, feature-a, and feature-b. feature-b branched off feature-a, which branched off main.

```
main
  |
  +-- feature-a
        |
        +-- feature-b
```

If you merge feature-b into main, Git:
1. Finds common ancestors: feature-a and main (both are common)
2. Recursively merges the common ancestors
3. Uses that result as the base for three-way merge with feature-b

This is powerful because it handles complex history gracefully. You don't have to worry about "what's the right base?"—Git figures it out.
```

- [ ] **Step 5: Add "Aha Moments" callout**

After Part 2, add a brief summary of key insights:

```markdown
### Key Takeaways from Three-Way Merge

- Git doesn't just compare before/after—it looks at what each side changed from the common ancestor
- Conflict markers show ours/theirs (the base is implied by the difference)
- Understanding this helps you predict when conflicts will occur and how to resolve them
- Recursive merge handles complex history by merging common ancestors first
```

- [ ] **Step 6: Review Part 2 for tone/style**

Read through Part 2 (~1200 words). Check:
- Are code snippets and examples clear?
- Is the explanation progressive (starts simple, gets deeper)?
- Does it flow logically from two-way → three-way → conflict markers → recursive?
- Is tone conversational?

Refine if needed.

- [ ] **Step 7: Commit Part 2**

```bash
git add src/content/blog/git-internals-objects-merge-velocity.md
git commit -m "feat: write Part 2 - Three-Way Merge Algorithm

- Explain limitations of two-way merge
- Deep dive into three-way merge algorithm
- Show conflict marker meanings
- Explain recursive merge for complex history
- Include examples and pseudocode (~1200 words)"
```

---

### Task 4: Part 3 - Merging Strategies & When to Use Them

**Files:**
- Modify: `src/content/blog/git-internals-objects-merge-velocity.md`

**Interfaces:**
- Consumes: Part 2 (three-way merge algorithm understanding)
- Produces: Part 3 content (~1000 words) explaining merge, rebase, squash strategies with trade-offs

- [ ] **Step 1: Write "Understanding Merging Strategies" intro**

~150 words setting up the section:

```markdown
### Understanding Merging Strategies

Now that you understand three-way merge, we can talk about strategy. The way you merge branches affects your commit history and how your team reads it.

Git offers three main strategies:
1. **Merge commits** — combine branches, preserve full history
2. **Rebase** — replay your commits on top of main, linear history
3. **Squash** — combine multiple commits into one, clean feature branches

Each works with three-way merge. They just organize the result differently. Let's explore each.
```

- [ ] **Step 2: Write "Merge Commits: Preserving History" section**

~300 words explaining merge commits:

```markdown
### Merge Commits: Preserving History

A merge commit is a commit with two parents. It says: "At this point, we integrated these two branches."

Example history:

```
main:    A --- B --- M (merge commit)
              /     /
feature:    C --- D
```

The merge commit M has two parents: B (from main) and D (from feature). Git used three-way merge with base=A to combine B and D.

**Advantages:**
- Preserves the full history: you can see "when did we integrate feature-x?"
- Safe: merge commits are immutable (like all commits)
- Good for traceability: reviewers can see which commits came from which branch

**Disadvantages:**
- History can become complex (especially with many branches)
- Reading commit history is harder: you have to follow branch points

**When to use:**
- Feature branches that need traceability (team of 10+)
- Large integrations (merging multiple teams' work)
- When you want to preserve "this feature happened here"

**Git command:**
```bash
git merge feature-branch
# Creates a merge commit with two parents
```

**Note:** If you want to see the "full" merge story, use `git log --graph --oneline --all`.
```

- [ ] **Step 3: Write "Rebase: Linear History" section**

~300 words explaining rebase:

```markdown
### Rebase: Linear History

Rebase replays your commits on top of the target branch. Instead of merging, you move your commits.

Example:

```
Before rebase:
main:    A --- B
              
feature:      C --- D

After rebase:
main:    A --- B
              |
              C' --- D'
```

Git replayed C and D on top of B using three-way merge for each replay. The commits C' and D' have the same content as C and D but different parent references (and thus different hashes).

**Why does this matter?**
- Linear history: no branch points, just a straight line
- Easier to read: `git log` shows commits in order
- Cleaner blame: `git blame` isn't confused by merge points

**Advantages:**
- Clean history: linear, easy to follow
- Great for feature branches: your 5 commits appear as a straight line on main
- Easier debugging: `git bisect` works better on linear history

**Disadvantages:**
- Rewrites history: commits get new hashes
- Can't see "integration points" (when was feature-x merged?)
- Risky if commits are already shared (others might be based on them)

**When to use:**
- Small teams (3-5 developers)
- Short-lived feature branches
- When you want a clean main branch history

**Git command:**
```bash
git rebase main
# Replays current branch on top of main
```

**Important:** Only rebase commits you haven't pushed to shared branches. Once pushed, rebasing rewrites history others might be using.
```

- [ ] **Step 4: Write "Squash: Clean Features" section**

~250 words explaining squash:

```markdown
### Squash: Clean Features

Squash combines multiple commits into one. You keep the feature's result but lose intermediate steps.

Example:

```
Before squash:
main:    A --- B
              
feature:      C --- D --- E (3 commits)

After squash:
main:    A --- B --- F (1 commit, content = A+C+D+E)
```

Commit F is a single commit with all changes from C, D, E. The intermediate commits are gone (though technically Git keeps them until garbage collection).

**Advantages:**
- Very clean: one feature = one commit on main
- No intermediate mess: your feature branch's debugging commits don't clutter main
- Good for code review: "I added feature X" appears as one commit

**Disadvantages:**
- Lose granularity: reviewers can't see intermediate steps
- Harder to bisect: if feature has multiple logical changes, they're combined
- Can hide complexity: a large feature in one commit might seem simpler than it is

**When to use:**
- Small features (1-3 logical changes)
- When intermediate commits are debugging/cleanup (not meaningful)
- Teams that want very clean main branches

**Git command:**
```bash
git rebase -i main
# Mark commits as "squash" to combine them

# Or use merge --squash:
git merge --squash feature-branch
# Combines all commits, doesn't create merge commit
```
```

- [ ] **Step 5: Write "Choosing a Strategy" section**

~200 words helping teams decide:

```markdown
### Choosing a Strategy: A Decision Tree

For small teams (3-5 developers):
- Use **rebase** for simplicity. Your history stays linear.

For medium teams (5-20 developers):
- Use **merge commits** for feature branches (preserve integration points)
- Use **rebase** on main (keep main's history linear)
- Pattern: feature branch with merge commit → main, then rebase on main

For large teams (20+):
- Use **merge commits** everywhere for traceability
- You need to see "which branch did this come from?"
- Complexity is worth the clarity

For any team:
- Use **squash** for internal/debugging commits
- Don't squash meaningful intermediate changes (loses context)

The key insight: these strategies work because Git uses three-way merge under the hood. The merge algorithm is the same; the strategy just controls how commits are organized afterward.
```

- [ ] **Step 6: Review Part 3 for clarity and examples**

Read through Part 3 (~1000 words). Check:
- Are the strategies clearly explained?
- Are ASCII diagrams clear?
- Do code snippets show actual Git commands?
- Is the decision tree practical?

Refine if needed.

- [ ] **Step 7: Commit Part 3**

```bash
git add src/content/blog/git-internals-objects-merge-velocity.md
git commit -m "feat: write Part 3 - Merging Strategies

- Explain merge commits and when to use them
- Explain rebase and linear history
- Explain squash and clean features
- Provide decision tree for choosing strategy
- Include Git commands and ASCII diagrams (~1000 words)"
```

---

### Task 5: Part 4 - Team Velocity Impact

**Files:**
- Modify: `src/content/blog/git-internals-objects-merge-velocity.md`

**Interfaces:**
- Consumes: Part 3 (strategies explained)
- Produces: Part 4 content (~600 words) connecting internals to real team outcomes

- [ ] **Step 1: Write "Clear History = Fast Code Reviews" section**

~200 words explaining how strategy affects review speed:

```markdown
### Clear History = Fast Code Reviews

Understanding Git internals helps you choose strategies that make code reviews faster.

Consider two scenarios:

**Scenario 1: Rebase strategy (linear history)**
```
main: A --- B --- C --- D --- E (feature)
```

Reviewer runs `git log main.. --oneline` and sees 5 commits. Each commit is reviewable on its own. If commit D has a typo, the reviewer knows exactly which commit to request changes for.

**Scenario 2: Merge strategy (with intermediate debugging)**
```
main: A --- B --- M (merge commit)
               \ /
             C, D (debugging), E (actual feature)
```

Reviewer sees a merge commit M that contains debugging commit D. The review is harder: which changes are the feature, which are debugging?

With a clean history (rebase, no intermediate fluff), reviewers see intent immediately. They know what to expect.

**Velocity implication:** Code review time correlates with history clarity. Cleaner history → faster reviews.
```

- [ ] **Step 2: Write "Fewer Conflicts = Faster Merges" section**

~200 words on reducing conflicts:

```markdown
### Fewer Conflicts = Faster Merges

Merge conflicts are expensive. They stop your workflow, require manual resolution, and risk introducing bugs.

Understanding three-way merge helps you reduce conflicts.

**Conflict reduction strategies:**
1. **Short-lived branches** — fewer commits between branch and main → fewer conflicts
2. **Focused branches** — one feature per branch → less overlap with other work
3. **Rebase strategy** — replay your commits on top of main regularly → catch conflicts early

When you rebase frequently, conflicts appear in your local commits, not in a giant merge conflict later. You resolve them as you go.

**Velocity implication:** Merge conflicts are bottlenecks. Fewer conflicts = faster feature velocity.

Example:
- Team rebasing daily: small conflicts caught immediately
- Team merging once per week: huge conflict during the merge
- Time spent: similar, but distribution matters (early = easier)
```

- [ ] **Step 3: Write "Onboarding & Consistency" section**

~100 words on team consistency:

```markdown
### Onboarding & Consistency

A consistent merge strategy means onboarding is faster. New developers:
- Learn one strategy (rebase or merge or squash)
- Understand why (clear history, fast reviews, fewer conflicts)
- Follow the pattern immediately

Inconsistency creates friction: "Should I rebase or merge?" requires a decision each time. Consistency removes that tax.

**Velocity implication:** Reduced cognitive overhead → faster decision-making → more time coding.
```

- [ ] **Step 4: Write conclusion section**

~200 words wrapping up:

```markdown
## Conclusion

Git's internal design—content addressing and three-way merge—isn't abstract theory. It directly impacts how your team works.

When you understand how commits are hashed and how merging actually works, you can choose strategies that reduce friction:
- Merge commits when you need traceability
- Rebase when you want clean history
- Squash when you want simple features
- Mix and match depending on your team size

The payoff is concrete: cleaner histories enable faster reviews, smarter rebasing reduces conflicts, and consistency speeds up decision-making. Together, these improve developer and team velocity.

Next time you're debating merge strategy, remember: you're not just choosing a workflow. You're optimizing for how your team reads and reviews code.

Understand the internals. Choose the strategy that fits your team. Watch your velocity improve.
```

- [ ] **Step 5: Review entire essay for tone/style consistency**

Read the full essay end-to-end. Check:
- Does it follow tone.md (conversational, substantive, practical)?
- Does it follow style-guide.md (clear, specific, no vague jargon)?
- Do the four parts build logically?
- Are code snippets helpful and not overwhelming?
- Is the intro compelling?
- Does the conclusion tie it together?

Make light edits for consistency. Focus on flow and clarity.

- [ ] **Step 6: Commit Part 4 & Conclusion**

```bash
git add src/content/blog/git-internals-objects-merge-velocity.md
git commit -m "feat: write Part 4 - Team Velocity Impact & Conclusion

- Connect internals to practical velocity improvements
- Explain code review speed, merge conflict reduction, onboarding
- Write compelling conclusion tying strategy to business outcomes
- Full essay complete: ~3600 words
- Reviewed against tone/style guidelines (~600 words)"
```

---

### Task 6: Final Polish & Publish

**Files:**
- Modify: `src/content/blog/git-internals-objects-merge-velocity.md`

**Interfaces:**
- Consumes: Complete essay from Task 5
- Produces: Polished, publishable essay ready for blog

- [ ] **Step 1: Remove outline comments**

Delete the outline comment section at the top (the `<!-- OUTLINE: -->` block). It's not needed in final version.

- [ ] **Step 2: Run through checklist**

Go through style-guide.md revision checklist:
- [ ] Every sentence adds value (no filler)
- [ ] No vague words (good, bad, important, complex)
- [ ] Technical terms defined or linked
- [ ] Examples are specific
- [ ] Argument flows logically
- [ ] Code examples are correct and runnable
- [ ] No jargon as shortcut

Fix any issues found.

- [ ] **Step 3: Check front matter metadata**

Ensure front matter is complete:

```markdown
---
title: "Git Internals: How Content Addressing and Three-Way Merge Power Your Workflow"
description: "Understand Git objects, commit hashing, three-way merge algorithms, and how this knowledge helps you choose better merging strategies and improve team velocity."
pubDate: 2026-07-07
tags: ["git", "internals", "merge-strategies", "developer-velocity"]
category: "engineering"
---
```

Verify:
- Title is clear and compelling
- Description is one sentence and summarizes essay
- Date is correct (2026-07-07)
- Tags are relevant
- Category exists in your blog

- [ ] **Step 4: Verify essay is ~3600 words**

Count total words. Should be approximately 3600 (±200). If significantly different, review for balance:
- Part 1: ~800 words (objects + hashing + DAG)
- Part 2: ~1200 words (algorithm + examples + recursive merge)
- Part 3: ~1000 words (strategies + decision tree)
- Part 4: ~600 words (velocity impact + conclusion)

Rebalance if needed.

- [ ] **Step 5: Create git commit with final essay**

```bash
git add src/content/blog/git-internals-objects-merge-velocity.md
git commit -m "refactor: polish Git internals essay for publication

- Remove outline comments
- Verify all sections follow tone/style guidelines
- Check front matter metadata
- Confirm word count ~3600 words
- Ready for publication"
```

---

## Self-Review Checklist

**Spec Coverage:** Does the plan cover all spec requirements?
- ✅ Part 1: Git objects & content addressing
- ✅ Part 2: Three-way merge algorithm
- ✅ Part 3: Merging strategies & trade-offs
- ✅ Part 4: Team velocity impact
- ✅ Tone follows tone.md
- ✅ Style follows style-guide.md
- ✅ Intermediate audience
- ✅ Balanced code/explanation
- ✅ ~3600 words

**Placeholder Scan:** Any TBD, TODO, vague steps?
- No placeholders found. All steps include specific content, code examples, or exact Git commands.

**Type/Name Consistency:** Do references match across tasks?
- File path consistent: `src/content/blog/git-internals-objects-merge-velocity.md`
- All commits reference the same file
- No conflicting terminology

**Task Granularity:** Are tasks appropriately sized (2-5 minute steps)?
- Each task broken into bite-sized steps
- Each step is one action (write section, review, commit)
- Steps build on previous tasks

---

Plan complete and saved to `docs/superpowers/plans/2026-07-07-git-internals-essay.md`. 

**Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?