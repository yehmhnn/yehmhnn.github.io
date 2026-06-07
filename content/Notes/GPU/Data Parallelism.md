---
title: "Data Parallelism"
created: "2026-04-11 11:05"
tags file:
  - [[GPU]]
---
***
### The Relationship Hierarchy

1. **Data Parallelism** (The Goal): 
	- The high-level concept of doing the same work on many pieces of data.
	- e.g. Add 5 to every pixel in an image
    
2. [[SPMD (Single Program, Multiple Data)]] (The Strategy) (The Software View): 
	- The programmer's way of writing code to achieve that goal.
	- Every thread runs the **same code** (Single Program) but uses its **ID** to find **different data** (Multiple Data).
	- e.g. Instead of writing "Loop through 1 million pixels," you write: _"If you are a thread, look at your ID and add 5 to that pixel."_
    
3. [[SIMT (Single Instruction, Multiple Threads)]] (The Bridge) (The Hybrid Abstraction): 
	- The "interpreter" that translates your code into hardware actions.
    
4. [[SIMD (Single Instruction, Multiple Data)]] (The Tool) (The Hardware View): 
	- The actual physical math units that do the work.
    
5. [[FGMT (Fine-Grained Multi-Threading)]] (The Engine) (The Scheduling View): 
	- The scheduler that keeps the math units busy.

|**Term**|**What it is**|**Perspective**|**Key Insight**|
|---|---|---|---|
|**Data Parallelism**|Problem Type|Mathematical|"I have a lot of independent data."|
|**SPMD**|Programming Model|Software|"I write code for 1 thread and launch $N$ of them."|
|**SIMT**|Execution Model|The "Glue"|"Groups threads into warps to fit the hardware."|
|**SIMD**|Hardware Architecture|Physical|"32 ALUs following 1 instruction controller."|
|**FGMT**|Scheduling Policy|Temporal|"Swaps warps every cycle to hide memory stalls."|


---
# Reference
