---
title: "Vanishing Gradient Problem"
created: "2026-07-24 13:06"
tags file:
---
## What It Is

The **vanishing gradient problem** occurs during [[Backpropagation]] in deep neural networks when gradients shrink exponentially as they travel backward from the output layer to the input layer. This leaves early layers unable to update their weights, effectively freezing their training.

## Root Cause

When a model uses nested non-linear activation functions $y = f(xW + b)$, calculating gradients via the calculus chain rule requires multiplying by the activation function's derivative $f'$ at every layer:

$$\frac{\partial L}{\partial W_1} = \frac{\partial L}{\partial y} \cdot f'(z_n) \cdot W_n \cdot \dots \cdot f'(z_1) \cdot x$$

If activation derivatives like sigmoid $\sigma'(z)$ or $\tanh'(z)$ are less than $1.0$ (especially when saturated), multiplying dozens of them together causes the gradient to collapse toward zero.

### 1. Sigmoid & Tanh Functions

These functions squash input values into a tight range (Sigmoid: $[0, 1]$, Tanh: $[-1, 1]$).

- **Sigmoid ($\sigma$):** The maximum derivative of Sigmoid is only $0.25$ (occurring at $x = 0$) (see: [[Sigmoid Derivative]]). As values get very large or very small, the derivative approaches $0$. When you chain 10 layers together:
    
    $$0.25 \times 0.25 \times 0.25 \times \dots \approx 0.00000095$$
    
    The gradient practically vanishes before reaching the early layers.
    
- **Tanh:** Slightly better than Sigmoid because its max derivative is $1.0$ (at $x = 0$), but as soon as $x$ moves away from $0$, the slope drops toward $0$ rapidly.
    

### 2. Deep Architectures Using Saturating Functions

- **Vanilla Recurrent Neural Networks (RNNs):** Unrolling an RNN across long time steps compounds the multiplication of Tanh derivatives, causing the model to forget distant past inputs.
    
- **Deep Multi-Layer Perceptrons (MLPs / FFNs):** Stacking many layers without skip connections or modern activations causes early layers to stop updating.
## Architectural Solutions

* [[Gating Prevents Vanishing Gradients]] — Un-nests activation derivatives using parallel multiplicative pathways.

* [[ResNet Skip Connections]] — Adds additive shortcuts ($y = x + F(x)$) to bypass non-linear layers entirely.

## Modern Activation Cheat Sheet

| **Activation Function**      | **Vanishing Gradient?** | **Primary Issue**                    | **Common Use / Status**                               |
| ---------------------------- | ----------------------- | ------------------------------------ | ----------------------------------------------------- |
| **Sigmoid**                  | **Severe**              | Saturated gradients near 0 & 1       | Mostly obsolete (except output binary classification) |
| **Tanh**                     | **Moderate / High**     | Saturates on extreme values          | Used in gated models like LSTMs                       |
| **ReLU**                     | **Fixed**               | "[[Dying ReLU]]" (zeros out $x < 0$) | standard baseline for CNNs / deep MLPs                |
| **LeakyReLU / GELU / Swish** | **Fixed**               | Slight extra compute                 | Standard choice in modern LLMs & Transformers         |