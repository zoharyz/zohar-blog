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
[TO WRITE]

## Part 3: Merging Strategies & When to Use Them
[TO WRITE]

## Part 4: Team Velocity Impact
[TO WRITE]

## Conclusion
[TO WRITE]
