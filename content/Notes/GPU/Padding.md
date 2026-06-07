2026-04-09 09:27
Tags: [[GPU]]
***

The hardware only follows one single, hard-coded rule for every memory request:

$$\text{Bank} = (\text{Memory Address} / 4 \text{ bytes}) \pmod{32}$$

The "padding" isn't a hardware setting; it is a **software trick** that changes the math the CPU/Compiler uses to find an address.

---

When you write `matrix[i][j]`, the compiler turns that into a specific memory address.

- **Without Padding (`[32][32]`):**
    
    The compiler calculates the index as: $\text{Index} = (\text{row} \times \mathbf{32}) + \text{col}$
    
- **With Padding (`[32][33]`):**
    
    The compiler calculates the index as: $\text{Index} = (\text{row} \times \mathbf{33}) + \text{col}$

| **Case**         | **Compiler Calculation** | **Resulting Flat Index** | **GPU Hardware Math (Index(mod32))** |
| ---------------- | ------------------------ | ------------------------ | ------------------------------------ |
| **No Padding**   | $(1 \times 32) + 0$      | **32**                   | $32 \pmod{32} = \mathbf{Bank 0}$     |
| **With Padding** | $(1 \times 33) + 0$      | **33**                   | $33 \pmod{32} = \mathbf{Bank 1}$     |

---

#### 1. Without Padding (`[32][32]`)

Every row is 32 elements long.

- **Row 0** starts at Index 0: $0 \pmod{32} = \mathbf{Bank 0}$
    
- **Row 1** starts at Index 32: $32 \pmod{32} = \mathbf{Bank 0}$
    
- **Row 2** starts at Index 64: $64 \pmod{32} = \mathbf{Bank 0}$

| **Row**   | **Bank 0**            | **Bank 1**        | **Bank 2**        | **...** | **Bank 31**        |
| --------- | --------------------- | ----------------- | ----------------- | ------- | ------------------ |
| **Row 0** | `[0][0]` (idx 0)      | `[0][1]` (idx 1)  | `[0][2]` (idx 2)  | ...     | `[0][31]` (idx 31) |
| **Row 1** | **`[1][0]` (idx 32)** | `[1][1]` (idx 33) | `[1][2]` (idx 34) | ...     | `[1][31]` (idx 63) |
| **Row 2** | **`[2][0]` (idx 64)** | `[2][1]` (idx 65) | `[2][2]` (idx 66) | ...     | `[2][31]` (idx 95) |

When your threads read the first column (`[0][0], [1][0], [2][0]...`), they are all hitting **Bank 0**.

---

#### 2. With Padding (`[32][33]`)

Every row is now 33 elements long. We just leave that 33rd element empty.

- **Row 0** starts at Index 0: $0 \pmod{32} = \mathbf{Bank 0}$
    
- **Row 1** starts at Index 33: $33 \pmod{32} = \mathbf{Bank 1}$
    
- **Row 2** starts at Index 66: $66 \pmod{32} = \mathbf{Bank 2}$
    
- **Row 3** starts at Index 99: $99 \pmod{32} = \mathbf{Bank 3}$

| **Bank 0**          | **Bank 1**          | **Bank 2**          | **Bank 3**      | **...** | **Bank 31** |
| ------------------- | ------------------- | ------------------- | --------------- | ------- | ----------- |
| `[0][0]`(idx 0)     | `[0][1]`            | `[0][2]`            | `[0][3]`        | ...     | `[0][31]`   |
| **`[0][32]` (PAD)** | `[1][0]`(idx 33)    | `[1][1]`            | `[1][2]`        | ...     | `[1][30]`   |
| `[1][31]`           | **`[1][32]` (PAD)** | `[2][0]`(idx 66)    | `[2][1]`        | ...     | `[2][29]`   |
| `[2][30]`           | `[2][31]`           | **`[2][32]` (PAD)** | `[3][0]`(idx99) | ...     | `[3][28]`   |

Look at the locations of the **first element of each row** (the `[row][0]` elements):

- `[0][0]` is in **Bank 0**
    
- `[1][0]` is in **Bank 1**
    
- `[2][0]` is in **Bank 2**
    
- `[3][0]` is in **Bank 3**
---

# Exteneded Q&A

## 1. What if the matrix is $5 \times 5$?

If your row width (the "stride") is 5, you actually **do not** have a bank conflict.

This is because 5 and 32 are **coprime** (their only common factor is 1). When the stride is coprime to the number of banks, the addresses "wrap around" the banks in a way that hits every single bank exactly once before repeating.

### The Math for a Stride of 5:

If 32 threads in a warp read the first column of a very tall matrix with a width of 5:

- **Thread 0:** Index 0 $\rightarrow$ **Bank 0**
    
- **Thread 1:** Index 5 $\rightarrow$ **Bank 5**
    
- **Thread 2:** Index 10 $\rightarrow$ **Bank 10**
    
- ...
    
- **Thread 6:** Index 30 $\rightarrow$ **Bank 30**
    
- **Thread 7:** Index 35 $\rightarrow$ $35 \pmod{32} = \mathbf{Bank 3}$
    
- **Thread 8:** Index 40 $\rightarrow$ $40 \pmod{32} = \mathbf{Bank 8}$
    

Because 5 doesn't go into 32 evenly, the "starting bank" for each thread shifts in a way that prevents them from landing on the same bank within a single warp. In this specific case, 32 threads will hit 32 **unique** banks.

---

## 2. The "GCD Rule" for Bank Conflicts

There is a mathematical formula to predict how many "ways" a bank conflict will be (i.e., how many cycles it will take):

$$\text{Conflict Degree} = \text{GCD}(\text{Stride}, 32)$$

- **$16 \times 16$ Matrix:** $\text{GCD}(16, 32) = 16$. This is a **16-way conflict**. (The 32-thread warp is split into 2 sets of 16, and each set hits the same 16 banks).
    
- **$32 \times 32$ Matrix:** $\text{GCD}(32, 32) = 32$. This is a **32-way conflict** (Worst case).
    
- **$5 \times 5$ Matrix:** $\text{GCD}(5, 32) = 1$. This is a **1-way conflict**, which means **no conflict at all**.
    

---

## 3. Is Padding always `[size][size + 1]`?

Not necessarily, but **yes**, that is the most common industry standard.

The goal of padding is simply to make the **Stride** (the total width of one row in memory) **coprime to 32**.

### Why we usually do `+1`:

Most GPU algorithms use power-of-two sizes ($16, 32, 64, 128$) because they map perfectly to thread blocks and hardware alignment.

- If your size is **Even** (especially a power of two), adding **1** makes it **Odd**.
    
- Any **Odd number** is automatically coprime to **32** (since 32's only prime factor is 2).
    

### The General Rule:

> **`__shared__ float matrix[HEIGHT][STRIDE]`**
> 
> To avoid conflicts, ensure $\text{GCD}(\text{STRIDE}, 32) = 1$.

---

## Summary Table

|**Matrix Size**|**Row Stride**|**GCD with 32**|**Bank Conflict?**|
|---|---|---|---|
|**$32 \times 32$**|32|32|**Yes** (32-way)|
|**$32 \times 33$**|33|1|**No** (Padded)|
|**$16 \times 16$**|16|16|**Yes** (16-way)|
|**$16 \times 17$**|17|1|**No** (Padded)|
|**$5 \times 5$**|5|1|**No** (Naturally safe)|
|**$5 \times 6$**|6|2|**Yes** (2-way - Padding actually _makes_ it worse here!)|

### One Final Catch

You might wonder: _"Why don't we just always use 5x5 then?"_ In your Computer Science study, you'll find that GPUs love **alignment**. If your data starts at an address that is a multiple of 128 bytes, the hardware can fetch it much faster from Global Memory. $5 \times 5$ matrices often break this alignment, which can slow down your _Global_ memory access even if it makes your _Shared_ memory faster.

That's why we stick to $32 \times 32$ and just add that one "dummy" column—it gives us the best of both worlds: perfect alignment and zero bank conflicts.

Does the relationship between the "stride" and the "Greatest Common Divisor" clear up why the $5 \times 5$ matrix behaves differently?

# Reference
