2026-04-07 08:36
Tags: [[GPU]]
***

In GPU architecture, Shared Memory is not one big solid block of RAM; it is divided into 32 equal-sized modules called Banks.
    
- The Rule: These 32 banks can be accessed simultaneously. If 32 threads in a warp each ask for data from 32 different banks, the request is completed in one cycle.
    
- The Conflict: A Bank Conflict occurs when two or more threads in the same warp try to access different addresses that happen to live in the same bank.
    
- The Penalty: The hardware cannot read two different things from the same bank at once, so it must "serialize" the requests (make them wait in line), which slows down your program.

- The Classic Solution: [[Padding]]
	- The most common way to fix a bank conflict is Memory Padding. This is usually done when you have a 2D array in shared memory where the width is a multiple of the number of banks (32).

---

## 1. How Addresses Map to Banks (The "Striping")

Think of Shared Memory as a long shelf of books. The GPU doesn't put all the books on one shelf; it uses **32 separate vertical stacks (Banks)**.

If you have an array `__shared__ int data[64]`, here is how the GPU distributes those integers across the 32 banks:

| **Bank 0** | **Bank 1** | **...** | **Bank 31** |
| ---------- | ---------- | ------- | ----------- |
| `data[0]`  | `data[1]`  | ...     | `data[31]`  |
| `data[32]` | `data[33]` | ...     | `data[63]`  |

### The Math

Each `int` or `float` is 4 bytes. The hardware uses the **Word Index** to decide the bank:

$$\text{Bank Index} = (\text{Address} / 4 \text{ bytes}) \pmod{32}$$

- **Address 0:** $0/4 = 0$. $0 \pmod{32} = \mathbf{Bank 0}$
    
- **Address 4:** $4/4 = 1$. $1 \pmod{32} = \mathbf{Bank 1}$
    
- **Address 128:** $128/4 = 32$. $32 \pmod{32} = \mathbf{Bank 0}$ (It wraps around!)
    

**The Rule:** A bank can only give out **one** word per clock cycle. If Thread 0 asks for `data[0]` and Thread 1 asks for `data[32]`, they are both shouting at Bank 0. Bank 0 can't do both at once, so it services them one after the other. That is the **Bank Conflict**.

---

## 2. Why Column Access is the Enemy

Bank conflicts usually happen when you work with 2D matrices. Imagine a $32 \times 32$ matrix in shared memory:

`__shared__ float matrix[32][32];`

In memory, this 2D array is actually a flat line of 1024 elements.

- **Row 0** occupies indices 0 to 31. (Banks 0 through 31).
    
- **Row 1** occupies indices 32 to 63. (Banks 0 through 31).
    

If your threads read **Row 0** (Thread 0 reads `matrix[0][0]`, Thread 1 reads `matrix[0][1]`, etc.), there is **no conflict** because every thread is hitting a different bank.

**However**, if your threads read **Column 0**:

- Thread 0 reads `matrix[0][0]` (Index 0 $\rightarrow$ **Bank 0**)
    
- Thread 1 reads `matrix[1][0]` (Index 32 $\rightarrow$ **Bank 0**)
    
- Thread 2 reads `matrix[2][0]` (Index 64 $\rightarrow$ **Bank 0**)

| **Row**   | **Bank 0**            | **Bank 1**        | **Bank 2**        | **...** | **Bank 31**        |
| --------- | --------------------- | ----------------- | ----------------- | ------- | ------------------ |
| **Row 0** | `[0][0]` (idx 0)      | `[0][1]` (idx 1)  | `[0][2]` (idx 2)  | ...     | `[0][31]` (idx 31) |
| **Row 1** | **`[1][0]` (idx 32)** | `[1][1]` (idx 33) | `[1][2]` (idx 34) | ...     | `[1][31]` (idx 63) |
| **Row 2** | **`[2][0]` (idx 64)** | `[2][1]` (idx 65) | `[2][2]` (idx 66) | ...     | `[2][31]` (idx 95) |

All 32 threads are hitting **Bank 0**. The GPU has to wait 32 cycles to finish that one "simultaneous" read.

---

## 3. The "Padding" Trick

Padding is a clever way to "shift" the rows so the columns don't align in the same bank anymore. We simply declare the matrix with one extra column that we **never use**.

Instead of: `__shared__ float matrix[32][32];`

We use: `__shared__ float matrix[32][33];`

### How the Mapping Changes:

Now, each row is 33 elements long. We just leave that 33rd element empty.
Let’s look at the bank assignments for the start of each row:

- **Row 0, Col 0:** Index 0. $0 \pmod{32} = \mathbf{Bank 0}$
    
- **Row 1, Col 0:** Index 33. $33 \pmod{32} = \mathbf{Bank 1}$
    
- **Row 2, Col 0:** Index 66. $66 \pmod{32} = \mathbf{Bank 2}$
    
- **Row 3, Col 0:** Index 99. $99 \pmod{32} = \mathbf{Bank 3}$

| **Bank 0**          | **Bank 1**          | **Bank 2**          | **Bank 3**      | **...** | **Bank 31** |
| ------------------- | ------------------- | ------------------- | --------------- | ------- | ----------- |
| `[0][0]`(idx 0)     | `[0][1]`            | `[0][2]`            | `[0][3]`        | ...     | `[0][31]`   |
| **`[0][32]` (PAD)** | `[1][0]`(idx 33)    | `[1][1]`            | `[1][2]`        | ...     | `[1][30]`   |
| `[1][31]`           | **`[1][32]` (PAD)** | `[2][0]`(idx 66)    | `[2][1]`        | ...     | `[2][29]`   |
| `[2][30]`           | `[2][31]`           | **`[2][32]` (PAD)** | `[3][0]`(idx99) | ...     | `[3][28]`   |

By adding that one "garbage" element at the end of each row, we’ve tilted the entire data structure. Now, when your threads try to read **Column 0** vertically, Thread 0 hits Bank 0, Thread 1 hits Bank 1, Thread 2 hits Bank 2, and so on.

**The result:** You get all 32 values in **1 cycle** instead of 32 cycles.


---
# Reference
