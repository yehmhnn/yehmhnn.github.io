---
title: XOR problem
created: 2026-05-28 15:11
tags file:
  - "[[Machine Learning Essentials]]"
---
Historically, it was proven that a single-layer linear classifier **cannot solve the non-linear XOR problem**. A neural network requires at least **2 layers** to map this non-linear decision boundary.

### Example Configuration:

- Inputs: $x_1, x_2 \in \{-1, 1\}$.
    
- Target Output: $y \in \{-1, 1\}$ ($1$ if $x_1 \neq x_2$, else $-1$).
    
- **Layer 1 (Hidden):** Computes hidden activations using a step function ($\text{sign}$) and manual weight matrix $B_1 \in \mathbb{R}^{3 \times 2}$:
    
$$
z_1 = \text{sign}([1, x_1, x_2] \cdot B_1)
$$
    
- **Layer 2 (Output):** Generates final prediction via $B_2 \in \mathbb{R}^{3 \times 1}$:
    
$$
\hat{y} = \text{sign}([1, z_{11}, z_{12}] \cdot B_2)
$$