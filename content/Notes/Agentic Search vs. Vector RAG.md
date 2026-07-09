---
title: "Agentic Search vs. Vector RAG"
created: "2026-06-09 16:12"
tags file:
---
## The Backstory: From [[Vector Database]] to Grep

When Anthropic was building Claude Code, the initial engineering instinct was to follow the industry standard: chunk the repository, generate embeddings, throw them into a local vector database, and use semantic search to fetch relevant code blocks.

However, it didn't work well. Boris Cherny, an engineer at Anthropic working on Claude Code, went public on the _Latent Space_ podcast and social media to explain that they scrapped the vector DB entirely. He noted:

> _"We tried RAG… we tried a few different kinds of search tools. And eventually, we landed on just agentic search. One is it outperformed everything. By a lot."_

Instead of a passive, one-shot retrieval system, they built an autonomous loop. The model looks at a codebase, figures out what it needs, writes a `grep` or `glob` command, reads the exact results, and course-corrects based on what it finds—acting exactly like a human developer.

## Why Grep Beats Vector RAG for Code

The engineering community widely analyzed this shift, highlighting several fundamental flaws that surface when you try to force codebases into traditional vector RAG models:

### 1. Code Demands Precision, Vector Search Offers Approximation

Vector search is semantic and approximate by design. If you search for `getUserById`, a vector DB might return `getUserByEmail` because they are conceptually adjacent. But in programming, an approximate match is a broken build. `grep` provides exact substring and regular expression matching, which is exactly what a compiler or developer cares about.

### 2. "Index Drift" and Real-Time Code Staleness

In active development, files change every few seconds. Keeping a vector database index perfectly synchronized locally requires immense engineering overhead. If the index falls out of sync by even a few minutes, the AI is looking at outdated code definitions. `grep` runs directly on the live file system, meaning zero setup and 100% freshness guaranteed.

### 3. Chunking Destroys Code Hierarchy

Standard RAG requires splitting documents into arbitrary text chunks (e.g., every 500 tokens). Doing this to code tears apart the syntax. A chunk boundary might clip the middle of a vital function or separate an interface declaration from its implementation, blinding the LLM to the code's actual structure.

### 4. Non-Code Context is Frequently Lost

Traditional code-RAG often targets core source files (`.ts`, `.py`, `.go`). However, fixing a software bug often requires reading `.env` files, `package.json`, Dockerfiles, shell scripts, or documentation markdown files. `grep` treats everything in the directory as plain text, ensuring no hidden configuration file is left out of the loop.

### 5. Trusting Model Intelligence Over Retrieval Infrastructure

Traditional RAG outsources the "thinking" to a math equation (cosine similarity on embeddings) because developers assume the model can't handle large files or shouldn't be trusted to search. Anthropic flipped the philosophy: as context windows grow larger and models get smarter, it is more effective to let the LLM use its own reasoning to formulate a search strategy, follow imports, and iteratively dig into a codebase.

## The Engineering Trade-off

While `grep` paired with an LLM loop is vastly more accurate and robust for local development, it does come with a catch: **token costs and latency**.

Using an agent to run multiple `grep` loops and read raw code blocks burns significantly more input tokens than pre-filtering down to three perfect snippets via a vector database. But for Anthropic, the math was simple—the engineering cost of maintaining a local vector database and fixing its inaccurate retrieval side-effects was far higher than the cost of letting Claude "think" its way through a codebase using old-school command line utilities.