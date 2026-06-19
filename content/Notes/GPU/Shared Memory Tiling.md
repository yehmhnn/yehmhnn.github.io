---
title: "Shared Memory Tiling"
created: "2026-04-07 08:30"
tags file:
  - [[GPU]]
---
***
Tiling is a technique where a thread block cooperatively loads a sub-section of data into Shared Memory. 
Its main benefit is reducing Global Memory traffic and increasing Arithmetic Intensity.

4 Steps
1. Collaborative Load (global to shared). 
2. Sync (__syncthreads). 
3. Compute (using shared data). 
4. Repeat for next tile.

#### The Process (The "Tile" Life Cycle):

1. **Cooperative Load:** All threads in a thread block work together to grab a small "tile" (a chunk) of the dataset from Global Memory.
    
2. **The Move:** They copy this chunk into the block's **Shared Memory** (which is inside the SM/Streaming Multiprocessor).
    
3. **Barrier Synchronization:** The threads call `__syncthreads()` to make sure the entire tile has finished loading before anyone starts using it.
    
4. **The Math:** Threads perform multiple calculations using that tile. Since the data is now on-chip in Shared Memory, they can read it hundreds of times without ever touching Global Memory again.
    
5. **The Repeat:** Once done, they move to the next tile in Global Memory and repeat.


---
#### [[Shared Memory Tiling]] vs [[Memory Coalescing]]

|**Feature**|**Coalescing**|**Tiling**|
|---|---|---|
|**Optimization Level**|Hardware / Low-level|Software / Algorithmic|
|**Primary Target**|Global Memory (GDDR)|Shared Memory|
|**Solves...**|High latency of single requests|Redundant reads of the same data|
|**Key Keyword**|**Contiguous** access|**Data Reuse**|
|**Programmer Effort**|Just write "good" indices|Manually manage `__shared__`|


---
# Reference
