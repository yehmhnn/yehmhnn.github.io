---
title: "CUDA Optimization MOCs"
created: "2026-04-07 19:30"
tags file:
  - [[GPU]]
---
***

### Data & Memory (The "Warehouse")

_Focus: Moving bits efficiently through the hierarchy._

- **PCIe Bottleneck:** [[Host-to-Device Latency]] (Slow bus speed).
    
- **VRAM Bottleneck:** [[DRAM Bandwidth Saturation]] (HBM limits).
    
- **Global Access:** [[Memory Coalescing]] (Strided/Unaligned access).
    
- **Shared Access:** [[Bank Conflicts]] (Multi-thread collisions in 32 banks).
    
- **Strategy:** [[SoA vs AoS]], [[Memory Coalescing]], [[Padding]].
    

### Compute & Execution (The "Factory")

_Focus: Keeping ALUs busy and instructions lean._

- **Flow Control:** [[Branch Divergence]] (Serialization via `if/else`).
    
- **Resource Limit:** [[Register Pressure]] (Spilling to slow Local Memory).
    
- **Scheduling:** [[Low Occupancy]] (Not enough warps to hide latency).
	- **Mechanism:** **Fine-Grained Multi-threading (TLP)** (Zero-overhead warp switching).
	- **Requirement:** [[Parallel Slackness]]
    
- **Speed:** [[Instruction Latency]] vs. [[Instruction Overhead]] (Math vs. Setup).
    
- **Strategy:** [[Loop Unrolling]], [[Templating]], [[Branch Flattening]].
    

### System & Overhead (The "Manager")

_Focus: Reducing the cost of coordination._

- **Execution Model:** [[Bulk-Synchronous Parallel (BSP)]]]
    
- **Stalls:** [[Synchronization Stalls]] (Waiting at `__syncthreads()`, the cost of a BSP barrier).
    
- **Strategy:** [[CUDA Streams]], [[CUDA Graphs]], [[Cooperative Groups]].


| **Pillar**        | **Bottleneck**             | **The Optimization Fix**                               |
| ----------------- | -------------------------- | ------------------------------------------------------ |
| **Global Memory** | **Memory Bound**           | [[Shared Memory Tiling]], **Coalescing**, **SoA**      |
| **Global Memory** | **PCIe Bottleneck**        | **CUDA Streams**, **Unified Memory**                   |
| **Shared Memory** | **Bank Conflicts**         | [[Padding]] (`[Size][Size + 1]`)                       |
| **Compute**       | **Compute Bound**          | **Loop Unrolling**, **Tensor Cores**                   |
| **Compute**       | **Instruction Overhead**   | **Templating**, **Loop Unrolling**                     |
| **Execution**     | **Branch Divergence**      | **Avoid `if/else`**, **Data Sorting**, Predication     |
| **Execution**     | **Register Pressure**      | **Templating**, **Move data to Shared**, Simplify math |
| **Scheduling**    | **Latency (Wait time)**    | [[Parallel Slackness]] (via **BSP Model**)             |
| **Scheduling**    | **Synchronization Stalls** | **BSP Phase Tuning**, **Cooperative Groups**           |

[[Bulk-Synchronous Parallel (BSP)]]


---
# Reference
