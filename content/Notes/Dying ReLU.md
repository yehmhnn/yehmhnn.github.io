---
title: "Dying ReLU"
created: "2026-07-24 13:17"
tags file:
---
## What It Is

The **Dying ReLU Problem** occurs when neurons using the [[ReLU]] activation function become permanently inactive during training, outputting $0$ for all inputs and receiving no gradient updates.

## Root Cause

The derivative of the ReLU function $\text{ReLU}(x) = \max(0, x)$ is:

$$
\frac{d}{dx}\text{ReLU}(x) = \begin{cases} 1 & \text{if } x > 0 \\ 0 & \text{if } x < 0 \end{cases}
$$

If a large gradient update pushes a neuron's weights such that its input $x$ is negative across the entire dataset:
1. The output becomes $0$.
2. During [[Backpropagation]], the local gradient is $0$.
3. The weight update rule ($\mathbf{W} \leftarrow \mathbf{W} - \eta \cdot 0$) results in no change.

The neuron gets trapped in a permanent "dead" state, effectively shrinking the model's capacity.

---

## Solutions & Alternatives
* **Leaky ReLU / PReLU:** Introduces a small positive slope for negative inputs ($f(x) = \max(0.01x, x)$), ensuring gradients are never zero.
* **GELU / Swish:** Smooth, non-saturating curves that allow small negative values to flow.
* **[[Gating Prevents Vanishing Gradients|GLU / SwiGLU]]:** Uses parallel gating streams to dynamically modulate signal flow without relying on hard zero-thresholding.
