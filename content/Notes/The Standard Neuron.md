---
title: The Standard Neuron
created: 2026-05-28 15:09
tags file:
  - "[[Machine Learning Essentials]]"
---
A neural network consists of many simple processing units (neurons) collaborating in parallel (within a layer) and in series (between layers).

- **Inputs & Outputs:** A standard neuron takes an input row vector $z_{in} \in \mathbb{R}^D$ and maps it to a scalar output $z_{out} \in \mathbb{R}$.
    
- **The Forward Equation:** $
z_{out} = \psi(z_{in} \cdot \beta + b)
$
    - $\beta \in \mathbb{R}^D$ is the column vector of learnable **weights**.
        
    - $b \in \mathbb{R}$ is the intercept or **bias**.
        
    - $\psi$ is a non-linear **activation function**.
        
- **Terminology:** The linear combination $z_{in} \cdot \beta + b$ is termed the **"pre-activation"**, while the final output $z_{out}$ is the neuron's **"activation"**.