---
title: L1 L2 Loss Functions
created: 2026-05-06 12:36
tags file:
  - "[[Machine Learning Essentials]]"
---
***
- **L1 Loss (MAE - Mean Absolute Error):**
    $$L_1 = \sum_{i=1}^{n} |y_i - f(x_i)|$$
    
- **L2 Loss (MSE - Mean Squared Error):**    
    $$L_2 = \sum_{i=1}^{n} (y_i - f(x_i))^2$$

#### Geometric Intuition (The "Why")

- **Sparsity (L1):** 
	- The "diamond" shape of the L1 ball often hits the axes at the corners, which forces some weights to zero. This is why LASSO is used for **feature selection**.
    
- **Smoothness (L2):** 
	- The "circular" shape of the L2 ball is differentiable everywhere, leading to more stable gradients and shrinking weights evenly.

| **Property**      | **L1 Loss / LASSO**         | **L2 Loss / Ridge**           |
| ----------------- | --------------------------- | ----------------------------- |
| **Outliers**      | Robust (ignores them)       | Sensitive (squares the error) |
| **Solution**      | Multiple possible solutions | Unique analytical solution    |
| **Gradients**     | Constant (except at 0)      | Proportional to the error     |
| **Computational** | Sparse (faster inference)   | Dense                         |

---
# Reference
