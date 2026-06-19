---
title: "GPU Memory Hierarchy"
created: "2026-04-07 19:25"
tags file:
  - [[GPU]]
---
***
### On-SM Memory (Extremely Fast)

- **Registers:** 
	- Each **Thread** has its own private registers. They have zero latency. 
	- If you run out of registers, the GPU "spills" data to slower memory, killing performance.
    
- **L1 Cache / [[Shared Memory]]:** Both are located on the Streaming Multiprocessor (SM).
    
    - **Shared Memory** is a "programmable cache." It is shared by all threads within a **Block**. It is used for inter-thread communication and to avoid redundant trips to global memory.
        
    - **L1 Cache** is hardware-managed and caches frequently used data for the threads.

### On-Chip but Off-SM (The "Hallway")

- **L2 Cache:** 
	- A larger cache shared by all blocks  / SMs across the entire GPU.
	- Acts as a high-speed buffer for everything going to/from the VRAM.

### Off-Chip Memory (Slower, Larger)

- **Local Memory:** * **Physical Location:** DRAM / VRAM (Off-chip).

	- **Scope:** Private to one **Thread**.

	- **Usage:** Only used for [[Register Spilling]] or large local arrays.
	    
	- **Warning:** It is as slow as Global Memory!
	
- **Global Memory (DRAM/VRAM):** 
	- This is the "Video RAM" (e.g., 24GB on an RTX 3090). It is accessible by every thread in the **Grid**. While it has huge capacity, it is much slower than Shared Memory or Registers.
	- Accessible by the entire **Grid**.
	- Requires [[Memory Coalescing]] for efficiency.
    
- **Host Memory (System RAM):** 
	- This is the memory on your motherboard (CPU side). The GPU cannot operate directly on this memory at full speed; data must be copied from Host Memory to Global Memory via the **PCIe bus** before the GPU can work on it.
	- [[Pinned & Unpinned Host Memory]]
***
## Summary of the "Data Path"

1.  **H2D Transfer:** CPU copies data to **Global Memory** via PCIe.
    
2. **Allocation:** Threads are assigned **Registers** on the SM.
    
3. [[Shared Memory Tiling]]: Blocks collaboratively load data from **Global Memory** $\rightarrow$ **L2 Cache** $\rightarrow$ **Shared Memory**.
    
4. **Compute:** Warps perform math using **Registers**.
    
    - _Exception:_ If registers overflow, data "spills" to **Local Memory** (VRAM).
        
5. **Write-back:** Results move from **Registers** $\rightarrow$ **Shared/L2** $\rightarrow$ **Global Memory**.
    
6. **D2H Transfer:** CPU copies results back to **Host Memory**.

***
### CPU vs GPU Memory
[[CPU Memory Hierarchy]]

| **Feature**      | **CPU Memory**                                                           | **GPU Memory**                                                                          |
| ---------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| **Primary Goal** | Minimize **Latency** (Get one result fast).                              | Maximize **Throughput** (Get 10,000 results at once).                                   |
| **Registers**    | Very few (dozens); extremely fast.                                       | Massive amount (thousands); used to keep threads "warm."                                |
| **L1 Cache**     | Large; focused on reducing latency for a single thread.                  | Small; often shared with "Shared Memory" hardware.                                      |
| **L2 Cache**     | Medium/Large; usually private to a core or a small cluster.              | Large; shared by the entire GPU device.                                                 |
| **L3 Cache**     | Critical for communication between cores.                                | Not usually present; GPUs use a large L2 cache instead.                                 |
| **Main Memory**  | **System RAM** (DDR4/DDR5). Optimized for random access and low latency. | **VRAM** (GDDR6/HBM). Optimized for massive bandwidth (streaming huge amounts of data). |
| **Control**      | Mostly hardware-managed (automatic).                                     | Heavily software-managed (you decide what goes where).                                  |
| Data Movement    | Uses "Branch Prediction" to guess what to cache next.                    | Uses "Coalescing" to grab massive chunks of data at once.                               |


---
# Reference
