---
title: "FGMT (Fine-Grained Multi-Threading)"
created: "2026-04-11 12:31"
tags file:
  - [[GPU]]
---
***
This is the **Latency Hider**.

- **The Problem:** [[SIMD (Single Instruction, Multiple Data)]] hardware often has to wait for data (Latency).
    
- **The Solution:** The GPU stores the state of _many_ warps at once. If Warp 0 is waiting for a memory fetch, the scheduler uses [[FGMT (Fine-Grained Multi-Threading)]] to instantly swap in Warp 1.

### Why is it called "Fine-Grained"?

In computer science, "granularity" refers to the size of the chunks.

- **CPU (Coarse-Grained):** 
	- If a CPU switches from one thread to another, it's a "big deal." It takes thousands of clock cycles to save the state, swap the context, and start the new thread.
    
- **GPU (Fine-Grained):** 
	- The GPU can switch from Warp A to Warp B **every single clock cycle** with **zero time penalty**.
	- It happens at the **instruction level** (cycle-by-cycle), not the "task level."

---
# Reference
