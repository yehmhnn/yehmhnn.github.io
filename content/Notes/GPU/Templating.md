2026-04-13 10:31
Tags: [[GPU]]
***

## 1. Overview

In CUDA, **Templating** isn't just about code reuse; it is a powerful **performance optimization**. It allows you to move logic from "Runtime" (when the GPU is running) to "Compile-time" (when `nvcc` is building the code).

## 2. Why it Improves Performance

- **Constant Folding:** If a loop limit or a tile size is a template parameter (e.g., `template <int TILE_SIZE>`), the compiler treats it as a constant. It can then unroll loops and pre-calculate addresses.
    
- **Reducing [[Register Pressure]] and [[Register Spilling]]:** By hard-coding sizes at compile-time, the compiler can better manage the "life" of variables, often resulting in fewer registers used per thread.
    
- **Removing Branching:** 
	- You can use templates to generate different versions of a kernel (e.g., one for a specific boundary condition) without using `if/else` inside the kernel, avoiding [[Warp Divergence]].

- Templating is the primary cure for [[Instruction Overhead]]. It replaces "Calculate address" instructions with "Load from constant" instructions.

## 3. The Timeline: "Build-Time" vs. "Run-Time"

### **Phase 1: Compilation (On your CPU)**

When you run `nvcc`, the compiler looks at your code. If it sees that you might call `my_kernel<true>` and `my_kernel<false>`, it says: _"Okay, I'll bake two different versions of this kernel into the final executable file."_

- **The "Wait":** Your compilation might take a few milliseconds longer because the compiler is writing two sets of instructions instead of one.
    

### **Phase 2: Execution (On your CPU)**

Your program starts. On the **CPU side** (the "Host"), you have a simple `if` statement to decide which version to launch.

C++

```
if (user_wants_math) {
    my_kernel<true><<<...>>>(data);  // CPU says: "GPU, run Version A!"
} else {
    my_kernel<false><<<...>>>(data); // CPU says: "GPU, run Version B!"
}
```

### **Phase 3: Performance (On your GPU)**

The GPU receives **only one version**. It doesn't see an `if` statement. It doesn't "wait" to decide. It just starts running the instructions it was given.


---
# Reference
