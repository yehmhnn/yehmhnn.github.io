---
title: "Temperature Scaling"
create: "2026-06-03 19:47"
tags file:
---
**Temperature Scaling** is a post-processing technique that modifies the sharpness or flatness of a probability distribution without altering the underlying choices or predictions.

It draws its name and intuition from thermodynamics and statistical mechanics. 
- In physics, when temperature ($T$) rises, particles gain energy and scatter randomly (increasing disorder/entropy). 
- In machine learning, a high temperature scatters your model's probability scores evenly across all options, while a low temperature solidifies the distribution around a single, highly dominant option.

Mathematically, it modifies the standard [[Softmax]] function by dividing every raw input [[Logit]] ($z_i$) by a positive scalar value $T$ before executing the exponential step:

$$\sigma_{i}(\mathbf{z}, T) = \frac{e^{z_i/T}}{\sum_{j=1}^{K} e^{z_j/T}}$$

#### How Varying $T$ Distorts the [[Softmax]] Surface:

- **When $T = 1$:** The equation maps identically to the baseline vanilla softmax function.
    
- **When $T > 1$ (High Temperature):** 
	- The raw numbers scale closer to zero ($z_i/T \to 0$). Because $e^0 = 1$, the exponentiated values contract toward uniformity. 
	- The resulting probability vector becomes a "softer," highly uniform distribution with significantly increased [[Shannon Entropy]].
    
- **When $T \to 0^+$ (Low Temperature):** 
	- The numeric delta between the largest logit and all alternative values is heavily magnified. 
	- The single maximum logit completely dominates the denominator sum, driving its final output probability strictly up toward $1.0$, while collapsing lower scores directly down to $0.0$. This hardens the function into a sharp, deterministic "hard-max" operator.
    
