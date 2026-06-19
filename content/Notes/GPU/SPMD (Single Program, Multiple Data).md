---
title: "SPMD (Single Program, Multiple Data)"
created: "2026-04-11 11:18"
tags file:
  - [[GPU]]
---
***

In CUDA, **SPMD** is the programming model. It is the software-level view of how you write code.

- **The Concept:** You write **one** single function (the kernel). This is the "Single Program."
    
- **The Execution:** When you launch that kernel, thousands of threads execute that exact same code, but each thread uses its own unique ID (`threadIdx.x`) to point to a different piece of data. This is the "Multiple Data."

- While "data parallelism" describes the problem (breaking data into pieces), **thread parallelism** describes the execution (using many threads to process those pieces).


---
# Reference

