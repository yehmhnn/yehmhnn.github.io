---
title: "Roofline Model"
created: "2026-04-10 13:24"
tags file:
  - [[GPU]]
---
***

## 1. Overview

Answer the question: **"Am I limited by how fast I can do math, or how fast I can move data?"**

---

## 2. The Graph Components

The model is a log-log plot with two distinct "roof" sections:

- **X-Axis:** Arithmetic Intensity (FLOP/Byte).
- **Y-Axis:** Performance (GFLOP/s).

|**Component**|**Decided By**|**Mental Model**|
|---|---|---|
|**$x$ (Arithmetic Intensity)**|**The Algorithm**|**The "Recipe":** How many math operations ($FLOPs$) you choose to perform for every byte of data you fetch.|
|**The "Roof" (Limits)**|**The Hardware**|**The "Physical Laws":** The maximum speed the GPU can move data (slant) and the maximum speed it can do math (flat top).|
|**$y$ (Performance)**|**The Interaction**|**The "Output":** How many $GFLOPs$ you actually achieve when you run that specific "Recipe" on that specific "Hardware."|

### A. The Slanted Roof (Memory Bound)

- **What it represents:** 
	- The peak **Memory Bandwidth** of the GPU (GB/s).
	- If you Upgrade the Hardware (Higher Bandwidth), the slanted part of the roofline gets **steeper** (the Ridge Point shifts left)
	- If you Optimize the Software (Better Memory Access), the dots move to the right
    
- **The Logic:** 
	- If your kernel falls on or under this slope, the ALUs are sitting idle waiting for data from VRAM.
    

### B. The Flat Roof (Compute Bound)

- **What it represents:** 
	- The peak **Arithmetic Throughput** of the GPU (GFLOPS).
	- The flat line represents the **Maximum GFLOPS** of the GPU cores. Once you are doing enough math to keep every core 100% busy, performance stops increasing. It hits a hard "ceiling" and stays flat.
    
- **The Logic:** If your kernel is here, your data is moving fast enough, but your cores are maxed out doing calculations.
    

### C. The Ridge Point

- The intersection where the memory limit meets the compute limit.
    
- **Hardware Intensity:** Defined as $\frac{\text{Peak GFLOPS}}{\text{Peak GB/s}}$.
    

---

## 3. The Math

To place a kernel on the roofline, you must calculate its **Arithmetic Intensity ($I$)**:

$$I = \frac{\text{Floating Point Operations (FLOPs)}}{\text{Total Bytes Transferred (Bytes)}}$$

The **Attainable Performance ($P$)** is then defined as:

$$P = \min(\text{Peak GFLOPS}, \text{Peak Bandwidth} \times I)$$

---

## 4. Optimization Strategy

| **Zone**            | **Problem**       | **The Goal**                        | **Optimization Fix**                                            |
| ------------------- | ----------------- | ----------------------------------- | --------------------------------------------------------------- |
| **Below the Slant** | **Memory Bound**  | Move the point **RIGHT** or **UP**. | [[Shared Memory Tiling]], [[Memory Coalescing]], [[SoA vs AoS]] |
| **Below the Flat**  | **Compute Bound** | Move the point **UP**.              | [[Loop Unrolling]], [[Tensor Cores]], [[Intrinsics]]            |

> [!TIP] **How to Move the Dot**
> 
> - **Moving UP:** Use more of the available hardware capacity (e.g., improve occupancy or use specialized cores).
>     
> - **Moving RIGHT:** Change the algorithm to do more work per byte of data loaded (e.g., increase data reuse via Tiling).
>     


---
# Reference
