2026-03-31 14:02
Tags: [[GNNs]]

Def: a simulation-free approach for training CNFs based on regressing vector fields of fixed conditional probability paths. -- ([Flow Matching for Generative Modeling (2022)](https://arxiv.org/abs/2210.02747))
- Rewrite: a simulation-free approach for training [[Continuous Normalizing Flows (CNFs)]] based on regressing vector fields of fixed conditional probability paths.

| Idea                            | Year      | What Changed                                   |
| ------------------------------- | --------- | ---------------------------------------------- |
| Normalizing Flows               | ~2015     | Learn invertible transformations from noise    |
| CNFs (Neural ODEs)<br>different | 2018      | Make flows continuous using ODEs               |
| Diffusion / Score Models        | 2015–2021 | Stochastic training, easier optimization       |
| Flow Matching                   | 2023      | Deterministic flows + diffusion-style training |
## 1. Core Idea

Flow Matching trains a model to learn a velocity field that moves samples from noise to data along a chosen path.

Instead of simulating a process (like in [[Diffusion Models]] or solving ODEs in [[Continuous Normalizing Flows (CNFs)]]), it:

- Defines a probability path between noise and data
- Computes the true velocity along that path
- Trains a neural network to match this velocity using simple regression

## 2. The Probability Path ($p_t$)

We define a path that connects our simple noise $p_0$ to our data distribution $p_1$.

- **The Goal:** Find a time-dependent vector field $v_t(x)$ that generates this path.
    
- **The ODE:** The movement of a sample $x$ is governed by:
    
    $$\frac{dx_t}{dt} = v_t(x_t)$$
    

## 3. The Flow Matching Objective

In standard CNFs, you have to solve the ODE (simulate the path) during training to compute gradients, which is incredibly slow. Flow Matching bypasses this.

- **Conditional Flow Matching (CFM):** We break the problem down. For a specific data point $x_1$, we can easily define a **ground-truth conditional vector field** $u_t(x|x_1)$ that moves noise $x_0$ toward $x_1$ in a straight line.
    
- **Loss Function:** We train a neural network $v_\theta(x, t)$ to regress this target field: $$\mathcal{L}_{CFM}(\theta) = \mathbb{E}_{t, q_t(x|x_1), p_1(x_1)} \| v_\theta(x, t) - u_t(x|x_1) \|^2$$
**Implementation:**  
	The vector field $v_\theta$ is conditioned on the current time step using a **[[Time Embedding]]**, allowing the model to adapt its velocity predictions as $t$ moves from noise to data.

## 4. Why this is better for Stabilization

- **Optimal Transport (Straight Paths):** FM allows us to pick the "straightest" path between noise and data.
    
- **Bounded Variance:** Because the paths are deterministic and "straight," the gradients during training are much more stable (lower variance) compared to the erratic, noisy paths of Diffusion Models.






# Reference
[Flow Matching for Generative Modeling (2022)](https://arxiv.org/abs/2210.02747)
[[Continuous Normalizing Flows (CNFs)]]