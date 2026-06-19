---
title: "Latency Hiding"
created: "2026-04-10 18:08"
tags file:
  - [[GPU]]
---
***

- While one warp is stalled waiting for its data from global memory, the hardware scheduler instantly switches to a different warp that is ready to perform math.
    
- [[Parallel Slackness]]:

	- Definition: It is the ratio of the number of parallel threads you could run to the number of processing units actually available.
	    
	- To hide latency effectively, you need a high number of warps "in flight". If you don't launch enough threads, the GPU will run out of ready work and stall.

### Latency Hiding Framework

- **Mechanism:** Fine-Grained Multi-threading (FGMT).
    
- **Prerequisite:** [[Parallel Slackness]] (launching way more threads than cores).
    
- **Logic:** Swaps warps in the **BSP Computation** phase to cover for warps in the **BSP Communication** phase.
    
- **Unit of DLP:** The Warp (32 threads).
    
- **Unit of TLP:** Multiple warps/blocks per SM.

### Compare with CPU

- A CPU uses huge caches to avoid latency; a GPU uses massive multithreading to hide it.

- In short: A CPU tries to make sure the worker never has to go to the warehouse. A GPU hires 1,000 workers so that while 900 are walking to the warehouse, there are always 100 on-site doing work.
    
- For a CPU, switching from one thread to another is a "heavy" operation. It involves saving a lot of state information (registers, program counters, etc.) and often leads to "cache misses" because the new thread needs different data.
    
- Unlike a CPU, a GPU has enough physical hardware (registers) to keep the state of all those threads live at the same time.



---
# Reference
