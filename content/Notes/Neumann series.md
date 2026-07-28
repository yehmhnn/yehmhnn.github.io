---
title: "Neumann series"
created: "2026-07-21 12:51"
tags file:
---
## The Definition (What)

A Neumann series is an infinite sum that acts as the matrix equivalent of a geometric series, allowing you to evaluate the inverse of a linear operator or matrix by summing successive powers of that matrix.

## Why It Is Important (Why)

Inverting large matrices directly using exact methods (like Gaussian elimination or LU decomposition) is computationally expensive and memory-heavy; the Neumann series replaces a single, difficult inversion with a sequence of simple matrix-vector multiplications, enabling efficient iterative approximations and revealing deep theoretical connections in dynamic programming, differential equations, and [[reinforcement learning]].

## How It Works (How)

### Phase 1: The Scalar Blueprint

The Neumann series is built directly on the familiar geometric series formula for real numbers:

$$\frac{1}{1 - x} = \sum_{t=0}^\infty x^t = 1 + x + x^2 + x^3 + \dots \quad \text{for } \vert{}x\vert{} < 1$$

- **$\frac{1}{1 - x}$:** The inverse of the expression $(1 - x)$.
    
- **$x^t$:** The $t$-th power of the scalar $x$.
    
- **$\vert{}x\vert{} < 1$:** The stability constraint that keeps the sum from exploding to infinity.
    

### Phase 2: Promoting Scalars to Matrices

By replacing the scalar number $x$ with a square matrix $A$, and the number $1$ with the Identity Matrix $I$, we obtain the matrix form of the inverse:

$$(I - A)^{-1} = \sum_{t=0}^\infty A^t = I + A + A^2 + A^3 + \dots$$

- **$(I - A)^{-1}$:** The target inverse matrix we want to evaluate without performing explicit matrix inversion.
    
- **$I$:** The identity matrix representing zero steps of application ($A^0 = I$).
    
- **$A^t$:** Applying the matrix transformation $A$ repeatedly $t$ times. In physical and probabilistic systems, $A^t$ models the total impact of events occurring exactly $t$ steps into the future.
    

### Phase 3: The Convergence Condition

To ensure the infinite sum settles on a finite, well-defined matrix rather than diverging to infinity, matrix $A$ must be strictly "shrinking" in magnitude over time:

$$\rho(A) < 1$$

- **$\rho(A)$:** The **spectral radius** of $A$, defined as the absolute value of its largest eigenvalue ($\max_i \vert{}\lambda_i\vert{}$).
    
- **Conceptual meaning:** If all eigenvalues of $A$ are strictly smaller than $1$ in magnitude, higher powers vanish over time ($\lim_{t \to \infty} A^t = \mathbf{0}$). This guarantees that each additional term adds progressively smaller corrections to the infinite sum.
    

### Phase 4: Application Variant (Discounted Markov Chains in RL)

In reinforcement learning and Markov decision processes, Neumann series appear when computing multi-step state visitations or solving Bellman equations. Here, the operator matrix is scaled by a discount factor $\gamma \in [0, 1)$, yielding $A = \gamma P_\pi$:

$$(I - \gamma P_\pi)^{-1} = \sum_{t=0}^\infty \gamma^t P_\pi^t = I + \gamma P_\pi + \gamma^2 P_\pi^2 + \gamma^3 P_\pi^3 + \dots$$

- **$P_\pi^t$:** The $t$-step transition matrix, where entry $(i, j)$ gives the probability of moving from state $i$ to state $j$ in $t$ steps.
    
- **$\gamma^t$:** The discount factor at step $t$. Because $P_\pi$ is a probability matrix (spectral radius $\le 1$) and $\gamma < 1$, the product $\gamma P_\pi$ strictly satisfies $\rho(\gamma P_\pi) < 1$. This guarantees convergence to the total discounted expected visitation counts.
    

## Additional Insights

### A Concrete Example

Consider a $2 \times 2$ matrix $A = \begin{pmatrix} 0.5 & 0 \\ 0 & 0.2 \end{pmatrix}$.

We want to find $(I - A)^{-1}$ where $I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$:

1. **Exact Direct Inversion:**
    
    $$I - A = \begin{pmatrix} 0.5 & 0 \\ 0 & 0.8 \end{pmatrix} \implies (I - A)^{-1} = \begin{pmatrix} 2 & 0 \\ 0 & 1.25 \end{pmatrix}$$
    
2. **Neumann Series Expansion:**
    
    $$\sum_{t=0}^\infty A^t = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} + \begin{pmatrix} 0.5 & 0 \\ 0 & 0.2 \end{pmatrix} + \begin{pmatrix} 0.25 & 0 \\ 0 & 0.04 \end{pmatrix} + \begin{pmatrix} 0.125 & 0 \\ 0 & 0.008 \end{pmatrix} + \dots$$
    
    Summing the first 4 terms gives $\begin{pmatrix} 1.875 & 0 \\ 0 & 1.248 \end{pmatrix}$, rapidly approaching the exact answer $\begin{pmatrix} 2 & 0 \\ 0 & 1.25 \end{pmatrix}$.
    

### A Direct Comparison: Direct Inversion vs. Neumann Series

|**Property**|**Direct Inversion (e.g., LU Decomposition)**|**Neumann Series Expansion**|
|---|---|---|
|**Primary Method**|Exact algebraic elimination|Infinite series accumulation / iteration|
|**Computational Cost**|$O(N^3)$ operation cost for an $N \times N$ matrix|$O(k \cdot N^2)$ when truncating at $k$ steps|
|**Suitability**|Best for dense, moderate-sized matrices|Best for extremely large, sparse matrices or streaming updates|
|**Exactness**|Exact (up to floating-point precision)|Approximate when truncated at finite step $k$|

### A Major Limitation: Spectral Radius Proximity to 1

The primary failure mode of a Neumann series is **slow convergence rate**. The speed at which terms vanish depends entirely on the spectral radius $\rho(A)$:

- If $\rho(A) = 0.1$, terms $A^t$ decay almost instantly, making a few terms highly accurate.
    
- If $\rho(A) = 0.999$, $A^t$ decays extremely slowly, requiring thousands of matrix multiplications to get an accurate approximation.
    
- If $\rho(A) \ge 1$, the series **diverges** completely, yielding infinite or meaningless values.