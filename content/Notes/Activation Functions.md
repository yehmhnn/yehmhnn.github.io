---
title: Activation Functions
created: 2026-05-28 15:01
tags file:
  - "[[Machine Learning]]"
---
Activation functions can be categorized based on their position in the network architecture:

### A. Last Layer (Output Layer) Functions

The activation function in the final layer is chosen purely based on the machine learning task:

- **Regression:** Identity function $\varphi(t) = t$.
    
- **Classification:** **Softmax** (for multi-class tasks) or **Sigmoid** (if binary classification).
    

### B. Interior Layers (Hidden Layers) Functions

Hidden layers use non-linear activations to allow feature extraction:

| **Era**                | **Activation Function**     | **Mathematical Definition**                                                              | **Key Characteristics**                                    |
| ---------------------- | --------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Classical**          | **Sigmoid**                 | $\sigma(t) = \frac{1}{1 + \exp(-t)}$                                                     | Squeezes outputs between $0$ and $1$.                      |
|                        | **Tanh**                    | $\tanh(t) = 2\sigma(2t) - 1$                                                             | Squeezes outputs between $-1$ and $1$.                     |
|                        | **Gaussian CDF**            | $\Phi(t) = \frac{1}{\sqrt{2\pi}}\int_{-\infty}^{t} \exp\left(-\frac{t'^2}{2}\right) dt'$ | Classic probabilistic activation function.                 |
| **Popular / Standard** | **ReLU**                    | $\text{ReLU}(t) = \begin{cases} t & \text{if } t > 0 \\ 0 & \text{else} \end{cases}$     | Most popular hidden activation; computationally efficient. |
|                        | **Leaky ReLU**              | Allows a tiny gradient when $t \le 0$.                                                   | Prevents neurons from completely dying.                    |
|                        | **Parametric ReLU (PReLU)** | Learnable parameter $\alpha$ handles negative inputs.                                    | Adaptive negative scaling.                                 |
|                        | **ELU**                     | $\alpha(\exp(t) - 1)$ if $t \le 0$, else $t$                                             | Exponential linear unit.                                   |
| **Modern**             | **SiLU / Swish**            | $\text{SiLU}(t) = t \cdot \sigma(t)$                                                     | Smooth, non-monotonic variant.                             |
|                        | **GELU**                    | $\text{GELU}(t) = t \cdot \text{Gaussian CDF}(t)$                                        | Standard choice in modern deep architectures.              |