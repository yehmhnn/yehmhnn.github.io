---
title: RBF Kernel
created: 2026-05-06 18:59
tags file:
  - "[[Machine Learning Essentials]]"
---
The RBF (Radial Basis Function) Kernel, also known as the Gaussian Kernel, is a mathematical function used to measure how "similar" two points are. 

Commonly used in [[Support Vector Machines (SVM)]]

### 1. The Formula

The most common form of the RBF kernel between two points $x$ and $x'$ is:

$$K(x, x') = \exp\left( -\frac{\|x - x'\|^2}{2\ell^2} \right)$$

- **$\|x - x'\|^2$**: This is the squared Euclidean distance between two points. In your time-series case, this is the distance between two time-steps (e.g., $t=10$ and $t=12$).
    
- **$\ell$ (Length-scale)**: This is the "knob" you turn to control smoothness.
    
- **$\exp$**: The exponential function turns distance into a similarity score between 0 and 1.
    

### 2. The Intuition: "Similarity as Distance"

Think of the RBF kernel as a **diminishing friendship**:

- **Distance = 0**: If two points are at the exact same location, the kernel output is **1.0** (Perfect similarity).
    
- **Distance is Small**: If points are close, the output is near 1.0. They "move together."
    
- **Distance is Large**: As points move further apart, the output drops toward **0.0**. They become "strangers" and their values no longer correlate.
    

### 3. The Power of the Length-scale ($\ell$)

This is the most important part for your TSFlow project. It dictates the "wiggliness" of your starting noise ($x_0$).

- **Short Length-scale (Small $\ell$):** The "friendship" drops off very quickly. Points only influence their immediate neighbors. Result: **Wiggly, high-frequency noise.**
    
- **Long Length-scale (Large $\ell$):** The "friendship" lasts a long time. A point at $t=10$ still influences a point at $t=100$. Result: **Very smooth, slow-moving waves.**

