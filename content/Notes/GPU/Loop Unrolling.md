---
title: "Loop Unrolling"
created: "2026-04-14 14:17"
tags file:
  - [[GPU]]
---
***

## 1. Overview

**Loop Unrolling** is an optimization technique where you reduce the number of iterations in a loop by "unfolding" the loop body. Instead of jumping back to the start of the loop after every single operation, the code performs multiple operations in a single pass.

In CUDA, this is primarily used to eliminate the [[Instruction Overhead]] of the loop control logic (the counter increment, the comparison, and the branch).

---

## 2. The Logic: Before vs. After

### **The "Rolled" Version (Slow)**

C++

```
for (int i = 0; i < 4; i++) {
    sum += data[i];
}
```

**GPU Overhead:** The GPU has to do 4 increments (`i++`) and 4 comparisons (`i < 4`). That is 8 "managerial" instructions for only 4 "math" instructions.

### **The "Unrolled" Version (Fast)**

C++

```
sum += data[0];
sum += data[1];
sum += data[2];
sum += data[3];
```

**GPU Overhead:** Zero. The GPU just performs 4 additions in a row. The loop itself has been deleted.


---

## 3. Why it Improves Performance

### **A. Reduces [[Instruction Overhead]]**

As shown above, it removes the "compare and branch" instructions. This is a direct fix for kernels that are **Compute Bound** due to high overhead rather than high math complexity.

### **B. Exposes Instruction-Level Parallelism (ILP)**

When the loop is unrolled, the compiler can see multiple independent instructions at once. It can then schedule these instructions to run "back-to-back" in the pipeline, filling up the latency gaps between math operations.

### **C. Better [[Memory Coalescing]]**

If you are loading data in a loop, unrolling allows the compiler to see multiple memory accesses at once. It can often group these into a single, wider memory transaction (e.g., using `LDG.E.128` instead of four `LDG.E.32` instructions).

---

## 4. How to do it in CUDA: `#pragma unroll`

You don't have to rewrite your code manually. You can just give a hint to the compiler.

C++

```
#pragma unroll
for (int i = 0; i < 4; i++) {
    // The compiler will turn this into straight-line code
}

#pragma unroll 8
for (int i = 0; i < 32; i++) {
    // The compiler will "unfold" this 8 times per iteration
}
```

> [!CAUTION] **The Requirement**
> 
> For the compiler to unroll a loop automatically, the **loop bounds must be known at compile-time**. This is why **[[Templating]]** is so often used alongside loop unrolling!

---

## 5. The Trade-offs

| **Benefit**                    | **Penalty**                                                                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Lower Instruction Overhead** | **Increased [[Register Pressure]]:** The compiler needs more registers to keep all those unrolled variables "live" at the same time.       |
| **Increased ILP**              | **Instruction Cache Pressure:** If you unroll a massive loop, the binary size grows, which can lead to misses in the L1 instruction cache. |

---

## 6. Connection to the [[Roofline Model]]

- **The Movement:** Loop unrolling helps you move **UP** when you are **Compute Bound** (the flat roof).
    
- **The Reason:** By removing the "useless" branch instructions, you are spending more of your "Instruction Budget" on actual GFLOPS.
    

---
# Reference
