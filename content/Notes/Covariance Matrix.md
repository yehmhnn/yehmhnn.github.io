---
title: Covariance Matrix
created: 2026-05-06 19:03
tags file:
  - "[[Machine Learning Essentials]]"
---
***

If you have a vector $X = [X_1, X_2, \dots, X_n]$, the covariance matrix is an $n \times n$ square matrix where every entry $(i, j)$ represents the covariance between $X_i$ and $X_j$.

#### The Structure:

1. **The Diagonal:** The entries where $i = j$ (e.g., $X_1$ and $X_1$). The covariance of a variable with itself is just its **Variance**.
    
2. **The Off-Diagonal:** These entries represent the "interaction" between different time-steps.
    
3. **Symmetry:** The matrix is always a mirror image across the diagonal because $Cov(X_i, X_j)$ is the same as $Cov(X_j, X_i)$.

related note: [[Covariance]]

---
# Reference
