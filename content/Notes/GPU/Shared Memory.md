2026-04-09 07:32
Tags: [[GPU]]
***
Shared memory is not one big block of memory; it is divided into **32 equally sized memory modules called "banks."** These banks are designed so they can be accessed simultaneously. In a perfect scenario, each of the 32 threads in a warp can access one bank each, allowing the GPU to process all 32 memory requests in a single clock cycle.

L1 Cache vs Shared Memory:

|**Feature**|**Shared Memory**|**L1 Cache**|
|---|---|---|
|**Management**|**Programmer-managed.** You decide exactly what goes in and when it leaves.|**Hardware-managed.** The GPU uses heuristics (like Least Recently Used) to manage data automatically.|
|**Deterministic?**|**Yes.** Access time is guaranteed (barring bank conflicts).|**No.** It depends on whether the data happens to be there (a "hit") or not (a "miss").|
|**Scope**|Visible to all threads within a single **Thread Block**.|Local to the SM; used to cache global memory for the threads running there.|
|**Syntax**|Requires the `__shared__` keyword in your CUDA code.|No code required; the hardware handles it for all global memory reads.|
|**Primary Use**|Inter-thread communication and data reuse (Tiling).|Reducing latency for "unpredictable" global memory accesses.|



---
# Reference
