---
title: Gaussian Processes (GPs) scale cubically
created: 2026-05-27 12:14
tags file:
---
A [[Gaussian Process]] (GP) models a distribution over functions by defining a mean function and a kernel (covariance) function. When you use a GP prior for a time series of length $N$, you must construct an $N \times N$ covariance matrix, $K_{NN}$, which represents the pairwise relationships between every single time step.

### Why it scales cubically ($O(N^3)$)

To train a GP (by maximizing log-marginal likelihood) or to draw samples from it, you must perform two core linear algebra operations on $K_{NN}$:

1. **Invert the matrix** ($K_{NN}^{-1}$) to calculate the conditional mean and variance.
    
2. **Compute its determinant** ($\det(K_{NN})$) for the likelihood function.
    

In practice, this is done via **Cholesky decomposition** ($K_{NN} = L L^T$). For an $N \times N$ matrix, Cholesky decomposition requires roughly $\frac{1}{3}N^3$ floating-point operations.

- **The CWRU Reality:** A standard 12 kHz CWRU signal yields 12,000 data points per second. If you try to model a tiny 5-second window, $N = 60,000$.
    
- **The Math:** $60,000^3 = 2.16 \times 10^{14}$ operations. Attempting this inside an iterative training loop for a deep neural network will instantly trigger out-of-memory (OOM) errors or grind your GPU to a halt.
    

### Why Sparse GPs Fail on 12 kHz Data

Sparse GP approximations (such as FITC or VFE) attempt to bypass this by introducing $M$ "inducing points" (where $M \ll N$), reducing the training complexity to $O(N M^2)$. You can think of inducing points as a small set of structural pseudo-inputs that act as anchors to summarize the overall curve.

However, high-frequency physical vibrations violate the core assumption of sparse GPs. According to the **Nyquist-Shannon sampling theorem**, to capture a wave oscillating at high frequencies without aliasing, your sampling density must be exceptionally high.

If you set $M=100$ to keep the math fast, the sparse GP acts like a drastic **low-pass filter**. It smooths out all the micro-peaks and valleys of the bearing vibration, treating them as irrelevant white noise. To actually capture the true 12 kHz structural dynamics, you would need the number of inducing points to approach the number of raw data points ($M \approx N$), completely defeating the computational purpose of the sparse approximation.