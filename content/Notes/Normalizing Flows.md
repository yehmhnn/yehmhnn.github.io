---
title: "Normalizing Flows"
created: "2026-03-31 15:07"
tags file:
  - [[GNNs]]
---
***
## Concepts & Math
1. Core Idea
	- Normalizing Flows (NFs) are a "workhorse method" for generative modeling.
	- Goal: Generalize inverse transform sampling from 1-D to arbitrary $D$ dimensions.
	- Recall 1-D Sampling:
		- Start with a simple distribution   $z \sim q(z)$ (e.g., Uniform or Gaussian).
		- Apply a transformation  $x = g(z)$
		- The probability density changes according to the change-of-variables formula:  
    $$p(x) = q(z=f(x)) \cdot |f'(x)|$$
    
	- In 1-D, if $q(z)$ is uniform, the optimal $f(x)$ is simply the [[Cumulative Distribution Function (CDF)]] of the target distribution.
    

2. Generalization to D-Dimensions
	For data $x \in \mathbb{R}^D$, we define an invertible mapping $f: \mathbb{R}^D \to \mathbb{R}^D$:
	We assume $x$ is given (from the training set) and we want to calculate its probability $p$.

	- **Forward (Encoder):** $z = f(x)$
	    
	- **Inverse (Decoder/Generator):** $x = f^{-1}(z) = g(z)$
    
	- Change-of-Variables Formula (D-dim):  $$p(x) = q(z=f(x)) \cdot |\det f'(x)|$$
		- $f'(x)$ is the Jacobian Matrix of partial derivatives:  $J_{ij} = \frac{\partial z_i}{\partial x_j}$.
	    - $\det f'(x)$ is the Jacobian Determinant (measures how the volume changes).
    

3. Inverse Flow Formula

	- If we view it from the generator side ($z \to x$): $$\hat{p}(x=g(z)) = q(z) \cdot |\det g'(z)|^{-1}$$
	- Note:  $\det g'(z) = (\det f'(x))^{-1}$.
    
4. Requirements for Learning $f(x)$
	To successfully learn a normalizing flow, the network architecture for $f(x)$ must satisfy 3 conditions:

	1. Invertible: The inverse $f^{-1}(z) = g(z)$ must be guaranteed to exist.
    
	2. Tractable Inverse: Calculating  $x = g(z)$ must be easy/cheap (for generation).
    
	3. Tractable Jacobian: Calculating  $\det f'(x)$ must be cheap (for the maximum likelihood loss).
    
5. The Computational Bottleneck & Solution
	- Naive calculation of a determinant for a $D \times D$ matrix costs $O(D^3)$ (e.g., via SVD or LU decomposition). As $D$ grows (e.g., for images), this becomes exponentially expensive and too slow for neural network training.
    
	- Solution: Use Triangular Matrices.
		- The determinant of a triangular matrix is the product of its diagonal: $\det A = \prod A_{jj}$, reducing cost to $O(D)$.
	- Triangular Maps (Knothe-Rosenblatt)
		- **Autoregressive Architecture:** By making $f_i(x)$ depend only on $x_{1:i}$, we force a triangular Jacobian.

## Implementation
[[Coupling Layer]]

## Variants & Summary
