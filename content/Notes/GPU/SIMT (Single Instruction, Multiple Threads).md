2026-04-11 12:21
Tags: [[GPU]]
***
This is the "Secret Sauce" invented by NVIDIA. It is the **Execution Model**.

- **Why it exists:** Hardware is [[SIMD (Single Instruction, Multiple Data)]] (fast but rigid), but software is [[SPMD (Single Program, Multiple Data)]] (flexible).
    
- **The Magic:** SIMT takes your individual threads and groups them into batches of 32 called **Warps**. It tells the hardware: _"Treat these 32 threads as one vector, but let me pretend they are independent in my code."_


---
# Reference
[[Data Parallelism]]