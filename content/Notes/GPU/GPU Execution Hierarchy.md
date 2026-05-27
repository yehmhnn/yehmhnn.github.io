2026-04-08 09:39
Tags: [[GPU]]
***
- **Thread:** 
	- The smallest unit of execution. A thread runs your kernel (code) on a single piece of data.
	- Threads are executed on Streaming Multiprocessors (SMs)
    
- **Warp:** 
	- A group of **32 threads**. 
	- This is the actual hardware unit of execution. 
	- All threads in a warp execute the same instruction at the same time ([[SIMT (Single Instruction, Multiple Threads)]]).
    
- **Block (Thread Block):** 
	- A logical group of threads (often 128 to 1024) that execute together
	- Can share data via shared memory, and synchronize.
    
- **Grid:** 
	- The entire kernel launch, containing all thread blocks.
	- A grid represents the entire task you've sent to the GPU.


---
## Relationship with [[GPU Memory Hierarchy]]

![[Pasted image 20260414180955.png|250]]

---
# Reference
