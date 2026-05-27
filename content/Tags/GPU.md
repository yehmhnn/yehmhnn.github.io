2026-04-07 08:28
Tags: 
***

### **Pillar 1: Architecture & Hardware**

- `[[CPU vs GPU Die Shots]]`: Latency vs. Throughput design.
    
- `[[GPU Evolution]]`: From G80 Unified Shaders to Hopper Transformer Engines.
    
- [[SIMT (Single Instruction, Multiple Threads)]]: How the hardware virtualizes threads.
    

### **Pillar 2: The Programming Model**

- `[[CUDA Execution Model]]`: Host vs. Device, Kernels, and [[SPMD (Single Program, Multiple Data)]].
    
- [[GPU Execution Hierarchy]]: Grids, Blocks, and Warps.
    
- `[[Compilation Workflow]]`: nvcc, PTX, and SASS.
    

### **Pillar 3: Memory Subsystem**

- [[GPU Memory Hierarchy]]: Registers, L1/L2, Shared, and Global.
    
- [[Memory Coalescing]]: Alignment, Strides, and Bandwidth.
    
- `[[Unified Memory]]`: UVA vs. UM and Page Migration.
    

### **Pillar 4: Performance & Optimizations**

- [[Latency Hiding]]: Parallel Slackness and Zero-Overhead Switching.
    
- [[Shared Memory Tiling]]: Improving FLOP/Byte ratios.
    
- [[Parallel Reduction]]: The 6 stages of optimization.
    
- [[Roofline Model]]: Arithmetic Intensity and Machine Limits.
    

### **Pillar 5: Advanced & Specialty Computing**

- `[[Coherence and Consistency]]`: Relaxed models and Atomics.
    
- `[[Tensor Cores]]`: Mixed precision and WMMA API.
    
- `[[CUDA Streams]]`: Task-level parallelism and PCIe bottlenecks.