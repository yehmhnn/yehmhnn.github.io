---
title: Crucial Deep Learning Theorems
created: 2026-05-28 15:02
tags file:
  - "[[Machine Learning]]"
---
### Theorem 1: Linear Collapse

- Without non-linear activation functions, an $L$-layer network collapses completely and is mathematically equivalent to a simple 1-layer network.

### Theorem 2: Universal Approximation Theorem (Hornik et al., 1989)

- A 2-layer neural network with a non-linear activation function and **sufficiently many hidden neurons** ($D_1$) can approximate any continuous function to any desired degree of accuracy.

- **The Catch:** This is an _existence proof_. It mathematically guarantees a valid network configuration exists, but it provides no instructions or algorithms on **how to find it**.
    

### Theorem 3: Optimization Hardness & Reality

- **The Mathematical Reality:** 
	- Finding the globally optimal weights for a given network architecture to minimize training error is an **NP-hard problem**. It demands exponential complexity once the hidden dimension exceeds a minor threshold ($D_1 > 40$).
    
- **The Practical Observation:** 
	- Despite being NP-hard in theory, empirical research shows that **local optimization (such as Gradient Descent)** is perfectly "good enough" in practice.
    
- **The Deep Learning Conjecture:** 
	- When a network is built sufficiently deep ($L$ is large enough), almost all encountered local optima are of a highly similar, high-performing quality.