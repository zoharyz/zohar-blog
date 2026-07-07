---
title: "Git Internals: How Content Addressing and Three-Way Merge Power Your Workflow"
description: "Understand Git objects, commit hashing, three-way merge algorithms, and how this knowledge helps you choose better merging strategies and improve team velocity."
pubDate: 2026-07-07
tags: ["git", "internals", "merge-strategies", "developer-velocity"]
category: "engineering"
---

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

You use Git every day, but there's something important happening beneath the surface that most developers never think about. When you run `git commit`, Git doesn't store what changed. It doesn't store deltas or diffs. Instead, it takes a complete snapshot of your entire project—every file, every byte—and stores it as a single immutable blob. Then it identifies that snapshot by calculating the SHA-1 hash of its content.

This one design choice cascades through everything Git does well. It's why your history is safe from tampering. It's why you can move branches around without losing work. It's why merging isn't as catastrophic as it could be.

Most developers treat Git as a black box. You commit, you push, you pull, you merge. When conflicts happen, you resolve them and move on. But if you understand how Git actually works—how it represents history, how it decides what to merge, why certain conflicts appear—you make better decisions about how your team works together.

In this essay, we'll build that understanding from the ground up. We'll explore Git objects and content addressing, see how three-way merge works, look at different merge strategies and when to use them, and finally, understand how all of this affects your team's velocity.

Let's start with the foundation: Git objects.

## Part 1: Git Objects & Content Addressing

### Git Objects: Blobs, Trees, and Commits

Everything Git stores is an object. Git tracks four types: blobs, trees, commits, and tags. For this essay, we focus on the first three—they're the backbone of how Git represents your project and its history.

A **blob** is just file content. When you commit `app.js`, Git doesn't store the filename or timestamp. It stores only the bytes and hashes them. The blob has no name, path, or metadata—just content. Identical files always produce the same blob hash.

A **tree** is a directory snapshot. It's a list of entries where each points to a blob (file) or another tree (subdirectory). For this structure:

```
project/
├── src/app.js
└── README.md
```

The root tree says: "`src` → tree abc123, `README.md` → blob def456." The `src` tree says: "`app.js` → blob ghi789." Trees snapshot your directory structure at a moment in time.

A **commit** ties it all together. It points to:
- A **tree** (the complete directory structure at this moment)
- One or more **parent commits** (the commits that came before)
- **Metadata**: author name and email, timestamp, and commit message

Here's what a commit object looks like conceptually:

```
commit abc123...
tree 789ghi...
parent def456...
author Zohar <zohar@example.com>
date Wed Jul 07 2026 10:30:00 -0700

Fix bug in merge conflict detection
```

That's it. No diffs. No deltas. Just: this is the complete state of the repo, here's who made it, when they made it, and what commit came before.

The key insight: **this structure is deterministic**. Same tree, same parent, same timestamp, same message—same hash. Commit `abc123` today is identical to commit `abc123` next year on a different computer.

### Content Addressing: Commits as Hashes

Git doesn't number commits. It doesn't say "this is commit #47." Instead, it hashes them.

When you make a commit, Git takes the tree ID, the parent hash(es), the author, the timestamp, and the message, concatenates them all together, and feeds the result into SHA-1. The output is a 40-character hexadecimal string. Git uses the first 7–12 characters to identify it in commands and interfaces. You've seen this thousands of times:

```
$ git log --oneline
abc1234 Fix bug in merge conflict detection
def5678 Add new feature
ghi9012 Refactor merge logic
```

Those short hashes? They're the first 7 characters of the full 40-character SHA-1.

Git hashes: tree ID, parent ID(s), author name and email, commit timestamp, and message. Change any one detail, and the hash changes completely.

This has three critical implications:

**Immutability**: You can't change a commit. Modify the message, and the hash changes—it's now a different commit. This is why Git history feels permanent.

**Tamper-evident**: Given commit hash `abc123`, you can verify it independently. If anyone modified the commit, the hash wouldn't match. This ensures integrity across networks.

**Safe merging**: Two developers can make identical commits and Git will know they're the same—same hash. Git doesn't compare messages or timestamps; it just compares hashes.

### The Commit DAG

Commits form a directed acyclic graph, or **DAG**. "Directed" means relationships have direction: each commit points to its parent(s). "Acyclic" means no loops—you can't have a commit that eventually points back to itself. This structure is fundamental to how Git works.

The simplest DAG is linear history:

```
commit1 → commit2 → commit3 → commit4 (HEAD)
```

Each commit points to one parent. This is the happy path—developers committing sequentially on main.

But Git branches, and when you merge, things get more complex:

```
            feature
               ↓
commit1 → commit2 → commit3 (merge commit)
           ↑
           main
```

When you merge `feature` into `main`, Git creates a **merge commit**. This commit has *two* parents: one from main, one from the feature branch. That merge commit ties the two lines together, and both branches are now ancestors of this single commit.

The DAG can have multiple branches and merges:

```
commit1 → commit2 → commit5 → commit6 (main)
           ↓
           commit3 → commit4 → merge
```

Why does this matter? When Git merges two branches, it needs their **common ancestor**—the last commit both branches share. Git traverses the DAG backward from both tips until it finds it. That's the "merge base." Git then performs a **three-way merge** using the merge base, main's tip, and feature's tip—which we'll explore next.

The DAG structure makes Git fast. Queries like "What commits are on main but not on feature?" or "What's the common ancestor?" are cheap to answer. Your commit history's shape directly affects performance.

## Part 2: Three-Way Merge Algorithm

### The Problem: Two-Way Merge Doesn't Work

Imagine you're merging two branches and you look at the same file on each side. The naive approach is simple: compare the content on main against the content on feature. If both changed the same line, conflict. If only one changed, auto-merge. Done.

This is a **two-way merge**, and it has a fatal flaw: you can't tell what actually changed.

Let's say you have a file with three lines. Main's version has:

```
function greet(name) {
  console.log("Hello, " + name)
}
```

Feature's version has:

```
function greet(name) {
  return "Hello, " + name
}
```

Different? Yes. But what happened? Did feature *remove* the console.log line, or did main *add* it? Did feature *add* the return statement, or did main *remove* it? A two-way merge can't tell. It just sees two different versions and declares a conflict.

But you know what *didn't* change. You know the original content. You know what each side did intentionally. That knowledge is crucial. If you had the original version—the common ancestor—you could compare both changes *against that baseline*. Then you'd understand: "feature added a return statement and removed the console.log. Main kept both. These don't conflict—they're complementary changes."

This is why Git uses **three-way merge** instead.

### Three-Way Merge: The Solution

Three-way merge is the algorithm that makes Git's merging actually work. Instead of comparing two versions, it compares three: the **base** (common ancestor), the **ours** (your side), and the **theirs** (their side).

Here's the algorithm, step by step:

**1. Find the merge base.** Traverse the commit DAG backward from both branch tips until you find the most recent commit that's an ancestor of both. This is the "merge base" or "common ancestor."

**2. Diff base → ours.** Compare the base version of each file against the ours version. What changed on your side?

**3. Diff base → theirs.** Compare the base version against the theirs version. What changed on their side?

**4. Reconcile.** For each line:
- If both sides made the same change, take it.
- If only one side changed that line, take that change (they didn't object).
- If both sides changed it *differently*, conflict.

Let's walk through a real example. Imagine a `config.json` file:

**Base (common ancestor):**
```
{
  "port": 3000,
  "host": "localhost",
  "debug": false
}
```

**Ours (main branch):**
```
{
  "port": 3000,
  "host": "localhost",
  "debug": false,
  "timeout": 5000
}
```

**Theirs (feature branch):**
```
{
  "port": 8080,
  "host": "localhost",
  "debug": true
}
```

Three-way merge sees:
- Base → ours: Added `"timeout": 5000`
- Base → theirs: Changed port from 3000 to 8080, and debug from false to true

These are independent changes. Merge result:

```
{
  "port": 8080,
  "host": "localhost",
  "debug": true,
  "timeout": 5000
}
```

No conflict. Git auto-merged successfully because it understood the *intent* of each side.

Now consider a conflict. Same files, but feature changed the timeout value:

**Ours:** `"timeout": 5000`
**Theirs:** `"timeout": 10000`

Both sides modified the same line differently. Git can't know which one is right, so it creates conflict markers:

```
{
  "port": 8080,
  "host": "localhost",
  "debug": true,
  <<<<<<< HEAD
  "timeout": 5000
  =======
  "timeout": 10000
  >>>>>>> feature
}
```

Git is saying: "I see two different values for timeout. Your version has 5000. Their version has 10000. You decide."

This is the power of three-way merge: it auto-resolves non-conflicting changes and flags only true conflicts. Two-way merge would flag far more conflicts unnecessarily.

### Conflict Markers Explained

When Git can't auto-merge, it leaves conflict markers in the file. They look like this:

```
<<<<<<< HEAD
your version of the code
=======
their version of the code
>>>>>>> branch-name
```

Let's break down what each part means:

- `<<<<<<< HEAD` marks the start of **ours** (your version, the current branch)
- `=======` is the separator
- `>>>>>>> branch-name` marks the end of **theirs** (the incoming branch)

Git doesn't show the base version by default because the *diff* between base and ours, and between base and theirs, tells you everything you need to know.

But if you want to see all three versions explicitly, Git can show them:

```bash
git show :1:config.json  # base
git show :2:config.json  # ours (HEAD)
git show :3:config.json  # theirs
```

These are the "stages" of a merge. During a merge conflict, Git keeps all three versions in its index. That's why `:1:`, `:2:`, `:3:` work.

Some teams use verbose conflict markers that include the base:

```
<<<<<<< HEAD
my change
||||||| base
original
=======
their change
>>>>>>> branch
```

This is more readable when you need to understand what changed and why. You can enable it with:

```bash
git config merge.conflictstyle diff3
```

Understanding these markers helps you resolve conflicts faster and more accurately. You're not just staring at two versions—you're seeing the intentional changes on each side relative to the common ancestor.

### Recursive Merge: When Merges Have Merges

Here's a wrinkle: what if the branch you're merging is itself a merge? What if feature-b branched off feature-a, which branched off main? Now when you merge feature-b into main, the merge base isn't main—it's the tip of feature-a. But feature-a is a merge commit.

This is where **recursive merge** comes in.

Git's algorithm (at a high level):
1. Find all common ancestors between the two branches.
2. If there's exactly one, use it as the merge base.
3. If there are multiple, recursively merge them first, use the result as the merge base.

Here's a scenario:

```
main ──→ commit1 (base of feature-a)
         ↓
         feature-a ──→ merge commit M1
                       ↑
                       feature-b ──→ HEAD
```

When merging feature-b into main:
- Common ancestors: feature-a's merge commit (M1), and anything before commit1
- Git would recursively merge those ancestors to create a virtual merge base
- Then use that virtual base for the three-way merge of main and feature-b

This happens automatically. You don't need to do anything. Git figures out the right base automatically, even in deeply nested branch structures.

This is powerful for complex histories where multiple integration points exist. Git doesn't just flatten the history; it understands the relationships and merges correctly.

### Key Takeaways

Three-way merge is elegant because it mirrors how humans think about changes. You don't ask "are these two files different?" You ask "what did each side change relative to what they started with?" That understanding unlocks automatic conflict resolution for independent changes and precise conflict reporting for true conflicts.

The conflict markers aren't obstacles—they're information. They show you exactly what Git couldn't reconcile, and why. And the base version is always recoverable with git show, so you're never without context.

Recursive merge ensures that even complex branching histories merge correctly, finding the right base automatically. This makes Git reliable even as team workflows grow more intricate.

## Part 3: Merging Strategies & When to Use Them
[TO WRITE]

## Part 4: Team Velocity Impact
[TO WRITE]

## Conclusion
[TO WRITE]
