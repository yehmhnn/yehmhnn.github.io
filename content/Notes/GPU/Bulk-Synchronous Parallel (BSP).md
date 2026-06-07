---
title: "Bulk-Synchronous Parallel (BSP)"
created: "2026-04-07 08:33"
tags file:
  - [[GPU]]
---
***

This is the "rhythm" of GPU execution. It consists of three repeating phases:
1. Concurrent Computation: 
	- Thousands of threads do their work independently.
2. Communication: 
	- Threads share data (usually via global memory or shared memory).
3. Barrier Synchronization: 
	- Everyone waits at a checkpoint (like a kernel end or __syncthreads()) before moving to the next step.

### The Relation: [[Latency Hiding]]

[[Parallel Slackness]] is the **fuel** that makes the BSP model efficient.

- Because the GPU uses **Fine-Grained Multi-threading (FGMT)**, it can switch between warps with **zero overhead**.
    
- While one warp is stuck in the "Communication" phase of the BSP cycle (waiting for VRAM), the hardware uses its "Slackness" to find another warp that is ready for the "Computation" phase.
    

> [!KEY_CONCEPT] **BSP** creates the latency; **Parallel Slackness** provides the extra work needed to **hide** that latency. Without slackness, the BSP model would make the GPU feel as slow as a single-core CPU.
---
# Reference
