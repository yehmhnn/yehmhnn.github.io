2026-04-13 10:41
Tags: [[GPU]]
***

## 1. The Definition

**Memory Coalescing** is a hardware feature where the GPU combines multiple memory requests from threads in a single **Warp** (32 threads) into a minimum number of memory transactions (128-byte bus "shipments").

- **The Goal:** Minimize the number of "trips" to Global Memory.
    
- **The Mechanism:** When a warp (32 threads) requests data, the hardware tries to combine those 32 requests into a single 128-byte transaction.

## 2. The "Bus" Analogy

Imagine a bus with 32 seats.

- **Coalesced:** All 32 threads want data that is sitting right next to each other. They all get on one bus. **1 Transaction.**
    
- **Uncoalesced:** Thread 0 wants data from address 100, Thread 1 wants address 5000, etc. The GPU has to send 32 separate buses. **32 Transactions.**
    

## 3. Requirements for Coalescing

To achieve 100% efficiency, your access must be:

1. **Contiguous:** Thread $k$ should access `data[base_index + k]`.
    
2. **Warp-Alignment:** To be efficient, thread access should match multiples of L1/L2 cache line sizes.
    

## 4. The Impact of Data Layout: [[SoA vs AoS]]

- **AoS (Array of Structures):** `struct {float x, y, z;} point[N];`
    
    - Accessing all `x` values causes **Strided Access** (Thread 0 reads `x0`, but `x1` is 12 bytes away). This is **Bad**.
        
- **SoA (Structure of Arrays):** `struct {float x[N], y[N], z[N];} points;`
    
    - All `x` values are contiguous. This is **Ideal** for coalescing.
        

## 5. Relationship to [[GPU Memory Hierarchy]]
### 1. L1 Cache: The "Coalescing Manager"

- **Where:** On-chip, right next to the threads.
    
- **The Role:** When your Warp (32 threads) makes a request, the hardware checks the L1 first.
    
- **Warp-Aligned & Spatially Coherent:** Because a Warp of 32 threads each asking for a 4-byte float equals exactly **128 bytes** ($32 \times 4 = 128$), the L1 cache line is exactly **128 bytes**.
    
- **The Magic:** If your threads are "contiguous" (Thread 0 asks for index 0, Thread 1 for index 1...), the L1 says: _"Perfect! All 32 of you fit into exactly one of my 128B boxes."_ This is a **Coalesced Access**.
    

### 2. L2 Cache: The "Bandwidth Filter"

- **Where:** Between the L1 and the GDDR (Global Memory).
    
- **The Role:** If the L1 doesn't have the data (a "miss"), it asks the L2.
    
- **Fine-Grained (32B):** The L2 doesn't like moving huge 128B blocks if it doesn't have to. It breaks that 128B block into four **32B "Sectors."** 

* **The Magic:** If your threads are "scattered" (Uncoalesced), you might only need data from Sector 1 and Sector 4. The L2 is smart enough to only fetch those two 32B sectors from the GDDR instead of the whole 128B. This saves **bandwidth**, which is why it is called "Bandwidth-optimized."


---
# Reference
