---
title: Gaussian Process
created: 2026-05-06 13:49
tags file:
  - "[[Machine Learning]]"
---
"Gaussian process is a stochastic process (a collection of random variables indexed by time or space), such that every finite collection of those random variables has a multivariate normal distribution." -- Wiki

## Core Definition

A **Gaussian Process (GP)** is a collection of infinitely many random variables, any finite subset of which follows a joint [[Multivariate Gaussian Distribution]].

While a standard Gaussian distribution defines a distribution over a vector of numbers (scalars), a Gaussian Process defines a **distribution over continuous functions**:

$$f(x) \sim \mathcal{GP}\left(m(x), k(x, x')\right)$$

A GP is completely defined by two functions:

1. **Mean Function:** $m(x) = \mathbb{E}[f(x)]$ (Often assumed to be zero, $m(x) = 0$, for convenience before seeing data).
    
2. **Covariance / Kernel Function:** $k(x, x') = \text{Cov}(f(x), f(x'))$ (Defines the smoothness, periodicity, and structural assumptions of the function space).
    

## Visual Intuition: Prior vs. Posterior

The best way to conceptualize a GP is moving from a prior function space to a data-conditioned posterior space:

[A Visual Exploration of Gaussian Processes](https://distill.pub/2019/visual-exploration-gaussian-processes/)

- **The Prior:** 
	- Before seeing any data points, samples drawn from the GP fluctuate freely within the boundaries of the kernel definition.
    
- **The Posterior:** 
	- When data points are observed (the crosses), the process is **conditioned** on these values. The functions are forced to pass precisely through (or near, if noisy) these coordinates.

## Why Use It? (Key Characteristics)

- **Non-[[Parametric]]:** 
	- Unlike linear regression (where you learn fixed weights $w$), a GP grows with the data. The training data itself _becomes_ the parameters of the model during inference via the kernel matrix.
    
- **Built-in Uncertainty Quantification:** 
	- Instead of just outputting a point prediction $\hat{y}$, it provides a full Gaussian distribution $\mathcal{N}(\mu, \sigma^2)$ for every query point $x^*$. This is what makes it incredibly powerful as a structured prior in generative models like `[[Flow Matching]]`.
    
- **Kernel Flexibility:** By changing $k(x, x')$, you can inject strong domain assumptions natively into the system:
    
    - [[RBF Kernel]]: Assumes smooth, infinitely differentiable behavior.
        
    - **Periodic Kernel:** Forces the generated functions to replicate cyclical or seasonal patterns over time.
        

## Mathematical Inference (Conditioning)

Given observed training data $\mathcal{D} = (X, y)$ and new test points $X_*$, the joint distribution of training and testing outputs is given by a blocked covariance matrix:

$$\begin{bmatrix} y \\ f_* \end{bmatrix} \sim \mathcal{N} \left( \mathbf{0}, \begin{bmatrix} K(X, X) + \sigma_n^2\mathbf{I} & K(X, X_*) \\ K(X_*, X) & K(X_*, X_*) \end{bmatrix} \right)$$

Using standard Gaussian conditioning rules, the posterior predictive distribution $p(f_* \mid X, y, X_*)$ yields closed-form solutions for both the mean matrix ($\mu_*$) and the uncertainty covariance matrix ($\Sigma_*$):

$$\mu_* = K(X_*, X) \left[ K(X, X) + \sigma_n^2\mathbf{I} \right]^{-1} y$$

$$\Sigma_* = K(X_*, X_*) - K(X_*, X) \left[ K(X, X) + \sigma_n^2\mathbf{I} \right]^{-1} K(X, X_*)$$

> ⚠️ **The Matrix Inversion Bottleneck:** Computing $\left[ K(X, X) + \sigma_n^2\mathbf{I} \right]^{-1}$ requires an $\mathcal{O}(N^3)$ computational complexity due to the matrix inversion, making vanilla GPs expensive for massive datasets with many observation points $N$.

---
# Reference
https://en.wikipedia.org/wiki/Gaussian_process
