2026-04-13 20:40
Tags: [[GPU]]
***

## 1. Unpinned (Pageable) Memory

This is the standard memory you get when you use a regular `malloc()` in C or `new` in C++.

- **How it works:** The Operating System is allowed to move this data around. If it needs more space for other apps, it might even "page" this data out of your RAM and onto your hard drive (virtual memory).
    
- **The GPU Problem:** The GPU cannot access this memory directly because the GPU's DMA (Direct Memory Access) engine needs a **fixed physical address**. Since the OS might move pageable memory at any time, the GPU doesn't trust it.
    
- **The "Hidden Copy":** When you try to transfer unpinned memory to a GPU (`cudaMemcpy`), the CUDA driver actually performs a hidden extra step: it copies your data into a temporary "pinned" buffer first, and _then_ sends it to the GPU. This makes transfers slower.
    

---

## 2. Pinned (Page-Locked) Memory

This is memory allocated using `cudaMallocHost()`.

- **How it works:** You are telling the Operating System: "Lock this down. Do not move it, and do not swap it to the disk." It is "pinned" to a specific physical location in your RAM.
    
- **The GPU Benefit:** Because the address is guaranteed not to change, the GPU can bypass the CPU and use DMA (Direct Memory Access) to pull data directly from your RAM.
    
- **Performance:** This is significantly faster and allows for **asynchronous transfers** (where the GPU can copy data while the CPU continues doing other work).


|**Feature**|**Unpinned (Pageable)**|**Pinned (Page-Locked)**|
|---|---|---|
|**Allocation**|`malloc()` / `new`|`cudaMallocHost()`|
|**OS Behavior**|Can be moved/swapped to disk|Locked in physical RAM|
|**Transfer Speed**|Slower (extra hidden copy)|**Faster** (Direct DMA)|
|**System Impact**|Safe and flexible|**Scarce resource**|

---
# Reference
