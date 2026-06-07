---
title: "Multivariate Gaussian Distribution"
created: "2026-05-08 15:48"
tags file:
  - "[[Probability & Statistics]]"
  - "[[Machine Learning]]"
---
***

## 1. Definition

The Multivariate Gaussian (MVN) is the generalization of the one-dimensional normal distribution to higher dimensions. For a $d$-dimensional vector $\mathbf{x} \in \mathbb{R}^d$, the [[Probability Density Function (PDF)]] is:

$$f(\mathbf{x}) = \frac{1}{(2\pi)^{d/2} |\boldsymbol{\Sigma}|^{1/2}} \exp\left(-\frac{1}{2}(\mathbf{x} - \boldsymbol{\mu})^T \boldsymbol{\Sigma}^{-1} (\mathbf{x} - \boldsymbol{\mu})\right)$$

## 2. Key Parameters

- **Mean Vector $\boldsymbol{\mu} \in \mathbb{R}^d$:** The center of the distribution.
    
- **[[Covariance Matrix]] $\boldsymbol{\Sigma} \in \mathbb{R}^{d \times d}$:**
    
    - Must be **Symmetric** and **Positive Definite**.
        
    - Diagonal elements $\Sigma_{ii}$ are variances.
        
    - Off-diagonal elements $\Sigma_{ij}$ are covariances between dimensions.
        
- **Precision Matrix $\mathbf{\Lambda} = \boldsymbol{\Sigma}^{-1}$:** Often used in computational contexts for efficiency.
    

## 3. Geometric Interpretation

The term in the exponent, $(\mathbf{x} - \boldsymbol{\mu})^T \boldsymbol{\Sigma}^{-1} (\mathbf{x} - \boldsymbol{\mu})$, is the **Squared Mahalanobis Distance**.

- If $\boldsymbol{\Sigma} = \mathbf{I}$ (Identity), the contours of the distribution are spheres.
    
- If $\boldsymbol{\Sigma}$ is diagonal, the contours are axis-aligned ellipsoids.
    
- If $\boldsymbol{\Sigma}$ has non-zero off-diagonal elements, the ellipsoids are rotated, indicating correlation between variables.
    

## 4. Properties

1. **Marginals:** If $\mathbf{x}$ is Gaussian, any subset of its components is also Gaussian.
    
2. **Conditionals:** The conditional distribution $P(x_1 \mid x_2)$ of a Gaussian is also Gaussian.
    
3. **Linear Transformations:** If $\mathbf{x} \sim \mathcal{N}(\boldsymbol{\mu}, \boldsymbol{\Sigma})$, then $\mathbf{Ax} + \mathbf{b} \sim \mathcal{N}(\mathbf{A}\boldsymbol{\mu} + \mathbf{b}, \mathbf{A}\boldsymbol{\Sigma}\mathbf{A}^T)$.

---
# Reference
