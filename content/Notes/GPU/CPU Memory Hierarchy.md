---
title: "CPU Memory Hierarchy"
created: "2026-04-08 10:23"
tags file:
  - "[[GPU Memory Hierarchy]]"
---
***
### **The Internal "Work Desk"**

- **Registers:** These are at the very top. They are located inside the CPU's execution units.
    
    - **Speed:** Instant (0–1 clock cycles).
        
    - **Size:** Extremely small (a few hundred bytes total).
        
    - **Note:** If the data isn't in a register, the CPU cannot perform math on it. Every instruction involves moving data into or out of registers.
        

### **The On-Chip Caches (SRAM)**

Unlike RAM, these are built directly onto the CPU silicon using Static RAM (SRAM), which is much faster but more expensive and physically larger than the DRAM used in your system memory.

- **L1 Cache (Level 1):** The fastest and smallest cache. It is usually split into **L1i** (instructions) and **L1d** (data). Each CPU core has its own private L1 cache.
    
- **L2 Cache (Level 2):** Slightly larger and slightly slower. In modern chips, each core usually has its own dedicated L2 cache to prevent cores from fighting over data.
    
- **L3 Cache (Level 3):** This is the "Last Level Cache" (LLC). It is much larger and is **shared** across all cores. If Core 1 has data that Core 2 needs, they can exchange it here without going all the way to the RAM.
    

### **The System & Storage (DRAM/Flash)**

- **Main Memory (RAM):** This is your DDR4 or DDR5 memory. It is physically located away from the CPU on the motherboard.
    
    - **The Problem:** Accessing RAM takes roughly **100–200 times longer** than accessing the L1 cache.
        
- **Secondary Storage (SSD/HDD):** This is where your files live. The CPU cannot talk to your SSD directly; the data must first be copied into the RAM by the Operating System.


---
# Reference
