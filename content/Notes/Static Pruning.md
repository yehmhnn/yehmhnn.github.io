---
title: Static Pruning
created: 2026-06-13 13:05
tags file:
  - "[[ML System]]"
---
### 1. Definition & System Timing

* **When:** Off-line, **Pre-training phase** (before the data ever touches the training loop).
* **Where:** Executed on distributed CPU clusters or storage infrastructure.

### 2. Core Mechanism

Static pruning applies fixed, heuristic rules or lightweight classifiers to filter out low-quality text, formatting boilerplate, and duplicates from raw web crawls.

* *Examples:* Deduplication (MinHash/LSH), stripping JavaScript code, removing pages with fewer than five sentences, or filtering out non-English content (as seen in the C4 dataset).

### 3. Impact
* **High ROI:** Running text-filtering algorithms on CPUs consumes a negligible fraction of the energy required to run a GPU cluster. 
* **The Payoff:** It physically shrinks the dataset size ($D$) by deleting billions of redundant tokens *before* they can consume expensive, high-wattage GPU forward/backward passes.