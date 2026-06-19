---
title: "Inverted Residual Block"
created: "2026-06-07 20:28"
tags file:
---
## Concept

A structural design introduced in **[[MobileNet]]V2** to make deep networks highly memory-efficient. It flips the traditional "Residual Block" design used in heavy models like ResNet.

### The Contrast:

- **Traditional Residual Block (ResNet):** 
	- Goes from **Wide** (many channels) $\rightarrow$ **Narrow** (few channels) $\rightarrow$ **Wide** (many channels). The shortcut (skip-connection) connects the *wide* layers.

* **Inverted Residual Block (MobileNetV2):** 
	* Goes from **Narrow** $\rightarrow$ **Wide** $\rightarrow$ **Narrow**. The shortcut connects the *narrow* layers.
	  1. **Expansion:** A $1 \times 1$ conv expands the low-channel input to a higher dimension.
	  2. **Depthwise Conv:** Processes the data efficiently in this high-dimensional space.
	  3. **Projection:** Compresses the data back down to a low-channel bottleneck.

---

## Why It Saves Memory (The Counter-Intuitive Truth)

While a "wide" layer sounds like it would demand more memory, this design actually slashes memory bandwidth strain via two mechanisms:

### 1. The Skip Connection Trick

In a residual network, the input tensor must be held in the device's cache memory during the entire time the internal layers are computing so it can be added to the output at the very end. 
* By making the skip connection link the **narrow** layers, the device only holds a tiny fraction of data in its cache. 

### 2. Operator Fusion (Hiding the "Wide" Layer)

The wide middle layer never actually gets fully written to the device's main RAM. Because it utilizes an efficient [[Depthwise Separable Convolution]], mobile compilers use **Operator Fusion** to run the math:
* A tiny slice of the **narrow** input is loaded.
* It is expanded to **wide** entirely inside the processor's ultra-fast internal registers.
* It is immediately projected back down to **narrow** before being written back to main memory.

> **Summary:** The "wide" state is a temporary illusion that only exists inside the CPU/NPU registers. The data moving between the processor and the main memory chip is kept strictly **narrow**.
