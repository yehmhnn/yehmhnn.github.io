---
title: "Streaming Multiprocessors (SMs)"
created: "2026-04-14 21:18"
tags file:
  - [[GPU]]
---
***

## 1. Overview

The **Streaming Multiprocessor (SM)** is the core hardware unit of a GPU where the actual execution of threads occurs. 

Think of it as a "mini-CPU" that is highly optimized for **throughput** rather than single-thread speed.

## 2. The Hardware-Software Mapping

The relationship between your code and the SM is strictly defined by the thread hierarchy:

- **CTA Mapping:** Each [[CTA (Cooperative Thread Array)]] (or Thread Block) is mapped to exactly **one SM**.
    
- **SM Capacity:** One SM can handle multiple CTAs concurrently (e.g., up to 4 CTAs on older architectures like Kepler), though this is implementation-dependent.
    
- **Scheduling Unit:** While you define the CTA, the hardware schedules work in **Warps of 32 threads**.
    

---

## 3. Internal Components of an SM

- **Execution Cores:** The physical ALUs that perform the integer and floating-point math.
    
- **Register File (RF):** A massive, high-speed storage area where thread variables are kept.
    
- **Shared Memory:** On-chip memory that allows threads within a CTA to communicate and cooperate.
    
- **L1 Cache:** Hardware-managed cache to speed up memory accesses.

**Related Note:** [[GPU Memory Hierarchy]]

---

## 4. How the SM Manages Work: [[Parallel Slackness]]

The SM's primary goal is to keep its execution cores busy at all times. It achieves this through [[Parallel Slackness]].

1. **Over-subscription:** The system starts many more threads and CTAs than there are physical resources available.
    
2. [[Latency Hiding]]: In essence, the SM uses this "slackness" to hide memory access latencies.
    
3. **Warp Swapping:** If one warp is stalled waiting for **Global Memory** , the SM instantly switches to another warp that is ready to compute.
    
    

> [!KEY_CONCEPT]
> 
> The **SM** is a throughput machine. It doesn't try to make one thread fast; it uses a massive **Register File** and **[[FGMT (Fine-Grained Multi-Threading)]]** to ensure that some thread, somewhere, is always doing math while others wait for data.



---
# Reference
