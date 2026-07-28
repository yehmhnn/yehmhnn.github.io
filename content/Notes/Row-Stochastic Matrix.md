---
title: "Row-Stochastic Matrix"
created: "2026-07-22 13:14"
tags file:
---
# The Definition (What)

- A row-stochastic matrix is a square grid of numbers where every entry represents a valid non-negative probability and the numbers across any single row sum to exactly 1.
    

# Why It Is Important (Why)

- It provides a mathematically sound framework for modeling multi-state random processes (such as Markov chains and Reinforcement Learning transition dynamics) by guaranteeing that the total probability of transitioning from any given state to all possible next states is strictly conserved at 100%.
    

# How It Works (How)

A row-stochastic matrix $P \in \mathbb{R}^{n \times n}$ operates through a structured set of mathematical rules that map probabilities across states over discrete time steps:

### Phase 1: Individual Transition Validity (Non-Negativity Constraint)

Each element $P_{i,j}$ represents the conditional probability of moving from a current state $i$ to a next state $j$ in a single step:

$$P_{i,j} = P(S_{t+1} = j \mid S_t = i)$$

Because probabilities cannot be negative or exceed $100\%$, every entry in the matrix must satisfy:

$$0 \le P_{i,j} \le 1 \quad \forall i, j \in \{1, \dots, n\}$$

### Phase 2: Total Probability Conservation (Row Sum Condition)

Starting at state $i$, the system _must_ transition to one of the possible states in the state space. Summing the probabilities across any row $i$ yields a complete probability distribution:

$$\sum_{j=1}^{n} P_{i,j} = 1 \quad \forall i \in \{1, \dots, n\}$$

In matrix notation, this condition is expressed by multiplying $P$ by a column vector of all ones $\mathbf{1} = [1, 1, \dots, 1]^T$:

$$P \mathbf{1} = \mathbf{1}$$

This highlights that $\mathbf{1}$ is always an eigenvector of $P$ with an eigenvalue of $\lambda = 1$.

### Phase 3: Multi-Step Probability Propagation

To calculate transition probabilities over $k$ steps, you multiply the matrix by itself $k$ times to get $P^k$. Due to the properties of matrix multiplication, if $P$ is row-stochastic, $P^k$ remains row-stochastic for any integer $k \ge 1$:

$$\sum_{j=1}^{n} (P^k)_{i,j} = 1$$

This ensures long-term probabilistic predictions never inflate or decay unnaturally.

### Phase 4: Bounded Eigenvalues and Stability

Because row sums are bounded by $1$, the spectral radius (the maximum absolute magnitude of any eigenvalue) satisfies:

$$\vert{}\lambda\vert{} \le 1$$

This property guarantees numerical stability in iterative systems. For instance, in discounted reinforcement learning problems, the matrix $(I - \gamma P)$ is guaranteed to be non-singular and strictly invertible for any discount factor $\gamma \in [0, 1)$.

# Additional Insights

### A Concrete Example

Consider a simple weather model with two states: **Sunny ($S$)** and **Rainy ($R$)**.

If a sunny day has an $80\%$ chance of remaining sunny tomorrow and a $20\%$ chance of rain, while a rainy day has a $40\%$ chance of turning sunny and a $60\%$ chance of staying rainy, the transition matrix $P$ is:

$$P = \begin{bmatrix} 0.8 & 0.2 \\ 0.4 & 0.6 \end{bmatrix}$$

- **Row 1 (Sunny):** $0.8 + 0.2 = 1.0$
    
- **Row 2 (Rainy):** $0.4 + 0.6 = 1.0$
    

Since all values are non-negative and each row sums to $1.0$, $P$ is a valid row-stochastic matrix.

### A Direct Comparison: Row-Stochastic vs. Column-Stochastic vs. Doubly-Stochastic

|**Matrix Type**|**Mathematical Condition**|**Vector Convention Used**|
|---|---|---|
|**Row-Stochastic**|Each **row** sums to $1$: $\sum_j P_{i,j} = 1$|Left-multiplication with row vectors: $\mathbf{x}_{t+1} = \mathbf{x}_t P$|
|**Column-Stochastic**|Each **column** sums to $1$: $\sum_i P_{i,j} = 1$|Right-multiplication with column vectors: $\mathbf{x}_{t+1} = P \mathbf{x}_t$|
|**Doubly-Stochastic**|Both **rows and columns** sum to $1$|Conserves uniform probability distributions in both directions|

### A Major Limitation

- **Absorbing States & Non-Ergodicity:** A row-stochastic matrix guarantees that probabilities remain valid, but it does **not** guarantee convergence to a single, unique steady-state distribution. If the matrix contains absorbing states (a row where $P_{i,i} = 1$) or disconnected sub-graphs, the long-term state distribution will depend entirely on the initial starting state rather than settling into a unique equilibrium.