2026-04-13 09:51
Tags: [[GPU]]
***

## Defining the Terms

### Register Pressure (The Demand)

**Register Pressure** is the number of registers required by each thread in your kernel to store its local variables, temporary calculations, and state.

- It is decided by the **Compiler** based on your code complexity.
    
- **The Conflict:** There is a fixed number of registers per SM (Streaming Multiprocessor). If one thread uses 64 registers, you can fit more threads than if each thread uses 128 registers.
    

### [[Register Spilling]] (The Overflow)

**Register Spilling** occurs when the compiler determines that a thread needs more registers than are available (or more than the hardware limit, usually 255).

- **The "Solution":** The compiler "spills" those extra variables into **Local Memory**.
    
- **The "Trap":** Don't let the name fool you. **Local Memory is physically located in Global Memory (VRAM).** It is thousands of times slower than a register.



---
# Reference
