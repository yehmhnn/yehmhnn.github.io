---
title: "Branch Divergence"
created: "2026-04-14 17:36"
tags file:
  - [[GPU]]
---
***

**Branch Divergence** is a hardware-level performance penalty that occurs when threads within a single **warp** (the fundamental scheduling unit of 32 threads) are forced to follow different execution paths due to a conditional branch, such as an `if-else` or `switch` statement.

---

### 1. The Relationship with [[SIMT (Single Instruction, Multiple Threads)]]

The core of the problem lies in the [[SIMT (Single Instruction, Multiple Threads)]] execution model.

- **Instruction Broadcasting:** The hardware scheduler broadcasts one instruction to all 32 threads in a warp at the same time.
    
- **The Conflict:** If the **control flow** dictates that Thread 0 should execute one block of code while Thread 1 executes another, the hardware cannot run both in parallel because it only has one instruction stream per warp.
    
- **The Serialization:** To handle this, the GPU **serializes** the paths. It executes the first branch path while the threads on the second path are "nullified" (disabled), and then it switches to execute the second path while the first group is disabled.
    
- **Performance Hit:** The time taken for the warp to complete is the **sum** of all divergent paths, which effectively turns parallel hardware into serial hardware.
    

---

### 2. Case Study: [[Parallel Reduction]]

#### **The Divergent Version (Reduction #1)**

- **Code:** `if (tid % (2 * s) == 0)`.
    
- **Why it diverges:** This selects every $n$-th thread. Because active threads (e.g., 0, 2, 4...) and idle threads (1, 3, 5...) coexist within the same 32-thread warp, the warp must diverge every time the math is performed. 

#### **The Non-Divergent Version (Reduction #2)**

- **The Fix:** Re-sort the operations so that **consecutive thread IDs** are active.
    
- **Code:** `int index = 2 * s * tid; if (index < blockDim.x)`.
    
- **Why it works:** Active threads are now "packed" into the same warps. Most warps are either **100% active** (no divergence) or **100% idle** (the scheduler skips them entirely).


---

### 3. Key Summary for the Exam

|**Term**|**Detail**|
|---|---|
|**Scope**|Only happens **within** a warp (32 threads).|
|**Independence**|Different warps can follow different paths with **no penalty**.|
|**Detection**|Low "Warp Execution Efficiency" in profilers.|
|**Best Practice**|Use contiguous indexing to keep active threads together.|

> [!NOTE] Remember for Feb 05: Warps are **transparent** to the user (defined by the JIT compiler), whereas CTAs/Blocks are **opaque** (defined by you). Divergence only matters at that "transparent" warp level.

Does the difference between how the hardware handles "interleaved" vs "contiguous" threads make the SIMT bottleneck clearer for your notes?


---
# Reference
