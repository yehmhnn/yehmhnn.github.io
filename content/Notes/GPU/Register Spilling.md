---
title: "Register Spilling"
created: "2026-04-13 10:15"
tags file:
  - [[GPU]]
---
***

## 1. Defining the Terms

**Register Spilling** occurs when the compiler determines that a thread needs more registers than are available (or more than the hardware limit, usually 255).

- **The "Solution":** The compiler "spills" those extra variables into **Local Memory**.
    
- **The "Trap":** Don't let the name fool you. **Local Memory is physically located in Global Memory (VRAM).** It is thousands of times slower than a register.

## 2. The Relationship: Pressure vs. Spilling

Think of it like a **bucket of water**:

1. **Register File:** The bucket (Fixed physical size).
    
2. **Register Pressure:** How much water (Variables) you are trying to pour in.
    
3. **Register Spilling:** The water overflowing onto the floor (Local Memory).
    

The relationship is an **inverse trade-off** with Occupancy:

- **Higher Pressure $\rightarrow$ Lower Occupancy:** To avoid spilling, the GPU runs fewer threads so each thread can have enough registers.
    
- **Extreme Pressure $\rightarrow$ Spilling:** If a single thread’s needs exceed the max limit, it spills regardless of occupancy.
    

---

## 3. The Symptoms (How to detect it)

If your kernel is suffering from register spilling, you will see these "red flags" in your profiling:

1. **Nsight Compute:** Look for high **"Local Memory Overhead"** or **"Local Load/Store"** traffic.
    
2. **Performance Drop:** Sudden, massive increase in memory latency. Since Local Memory is in VRAM but isn't cached as efficiently as Global Memory, it creates a huge bottleneck.
    
3. **The "Spill" Warning:** When compiling with `nvcc -Xptxas -v`, the compiler will explicitly print: `Used X registers, spill Y bytes stores, Z bytes loads`.
    

---

## 4. How to Fix It (Reducing Pressure)

If you have a spilling problem, you need to "drain the bucket":

- **Use [[Templating]]:** Hard-coding constants at compile-time allows the compiler to optimize out variables.
    
- **Break up the Kernel:** Split one massive "Uber-kernel" into two smaller ones.
    
- **Manual Scope Control:** Use `{}` brackets inside your C++ code to limit the "lifetime" of variables so the compiler can reuse the same register for different things.
    
- **Use [[Shared Memory]]:** Manually move some local variables into `__shared__` memory to act as a "spill buffer" that you control.
---
# Reference
