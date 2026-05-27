2026-04-08 09:13
Tags: [[GPU]]
***
This refers to the "extra" instructions the GPU has to run that don't actually contribute to your final math result—things like loop counters, pointer arithmetic, and index calculations.

### The Bottleneck

- **Integer Arithmetic:** Calculating `(blockIdx.x * blockDim.x + threadIdx.x)` consumes cycles on the Integer ALU. If your kernel is short, you might spend more time calculating _where_ the data is than actually processing it.
    
- **Loop Control:** Every time a loop checks `i < N`, that is a comparison and a branch instruction.
    

### Optimizations

- [[Loop Unrolling]]: Use `#pragma unroll`. This tells the compiler to literally copy-paste the loop body multiple times. It removes the "compare and jump" overhead and can expose more **Instruction Level Parallelism (ILP)**.

- **[[Templating]] & Compile-time Constants:**

	- **The Goal:** Replace "Variable-based logic" with "Type-based specialization."
	    
	- **Why it works:** It allows the compiler to perform **Constant Folding**. If a value (like a tile size or a feature flag) is known at compile-time, the compiler can pre-calculate memory addresses and index offsets on your PC instead of making the GPU do it at runtime.
	    
	- **Benefit:** Removes `if/else` branches and replaces complex index math (multiplications) with constant offsets.

-  **Intrinsics (Fast Math):** Use "intrinsic" functions like `__sinf(x)` or `__fdividef(x, y)`. These map directly to hardware instructions that are much faster than the standard library versions, though they sacrifice a tiny bit of precision.
    
- **Strength Reduction:** Avoid the modulo operator (`%`) and integer division (`/`) inside kernels. They are extremely expensive on GPUs. Use bitwise shifts (`>>` or `<<`) or bitwise ANDs (`&`) where possible.


---
# Reference
