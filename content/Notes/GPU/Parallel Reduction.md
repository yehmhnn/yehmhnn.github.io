---
title: "Parallel Reduction"
created: "2026-04-14 17:30"
tags file:
  - [[GPU]]
---
***

## 1. The Goal

To take an array of $N$ elements and "reduce" them to a single value (e.g., a Sum) using the GPU's massive parallelism. This is done using a **Binary Tree** approach in $O(\log N)$ steps.

Within each **[[CTA (Cooperative Thread Array)]] (Thread Block)**, we use a tree-based approach. Large arrays require multiple CTAs to achieve high GPU utilization.

---

## 2. The 6 Stages of Optimization

### **Stage 1: Interleaved Addressing (The "Naïve" Version)**

- **The Approach:** Threads use a `stride` that doubles every iteration.
    
- **The Problem:** [[Branch Divergence]].
    
    - `if (tid % (2 * stride) == 0)` means that in the first iteration, half the threads are idle. By the 5th iteration, most warps are doing almost no work but still "paying" for the divergent branch.
        
- **The Metric:** Low **Warp Execution Efficiency**.

![[Pasted image 20260414202023.png|377]]

### **Stage 2: Interleaved Addressing (Non-Divergent)**

- **The Fix:** Change the indexing so active threads are contiguous.
    
    - `int index = 2 * stride * tid;` becomes a mapping where `tid` 0, 1, 2... do the work.
        
- **The Problem:** Shared Memory [[Bank Conflicts]]
    
    - Because the threads are still jumping over indices in shared memory, multiple threads in the same warp hit the same memory banks simultaneously.
        
![[Pasted image 20260414202241.png|424]]


### **Stage 3: Sequential Addressing**

- **The Fix:** Replace strided indexing with thread-ID based block access. Threads add elements at `tid` and `tid + s`.
    
- **The Result:** No [[Branch Divergence]] + No [[Bank Conflicts]].
    
- **The New Bottleneck:** **Idle Threads**. Half the threads in the block do nothing from the very first line of the kernel.
    
![[Pasted image 20260414202157.png|362]]


### **Stage 4: First Add During Load**

- **The Fix:** Instead of each thread loading one element from Global Memory to Shared Memory, each thread loads **two** elements and add them _before_ storing the result in Shared Memory.
    
- **The Result:** You cut the number of blocks in half and double the work per thread. This increases **Arithmetic Intensity ($x$)**.
    

### **Stage 5: Unroll the Last Warp**

- **The Logic:** When the `stride` reaches 32, you are down to a single **Warp**.
    
- **The Fix:** Since threads in a warp move in SIMD lock-step (the [[SIMT (Single Instruction, Multiple Threads)]] model), you don't need `__syncthreads()` anymore. You can manually unroll the last 6 additions.
    
- **The Result:** Drastic reduction in [[Instruction Overhead]] and synchronization stalls.
    

### **Stage 6: Completely Unrolled (The "Template" Final)**

- **The Fix:** Use **[[Templating]]** to pass the `blockSize` as a compile-time constant.
    
- **The Result:** The compiler removes the `while` loop entirely and performs **Dead Code Elimination**. This is the fastest possible version of the kernel.
    

---

## 3. Summary Table

| **Stage**             | **Main Fix**         | **Bottleneck Removed**     |
| --------------------- | -------------------- | -------------------------- |
| **1 $\rightarrow$ 2** | Contiguous Indexing  | [[Branch Divergence]]      |
| **2 $\rightarrow$ 3** | Sequential Access    | [[Bank Conflicts]]         |
| **3 $\rightarrow$ 4** | 2 Loads per Thread   | **Global Memory Latency**  |
| **4 $\rightarrow$ 5** | No Sync in last warp | **Synchronization Stalls** |
| **5 $\rightarrow$ 6** | [[Templating]]       | [[Instruction Overhead]]   |

Stride (s):

| **Feature**          | **Interleaved (Ver. 1-2)** | **Sequential (Ver. 3-6)**   |
| -------------------- | -------------------------- | --------------------------- |
| **Stride Direction** | **Increasing** ($s *= 2$)  | **Decreasing** ($s >>= 1$)  |
| **Worker Indexing**  | Sparse (tid 0, 2, 4...)    | Contiguous (tid 0, 1, 2...) |


---
# Reference
