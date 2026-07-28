---
title: "Sigmoid Derivative"
created: "2026-07-25 10:49"
tags file:
---
## Core Concept

The derivative of the [[Sigmoid]] activation function ($\sigma(x) = \frac{1}{1 + e^{-x}}$) can be calculated directly from its output:

$$
\sigma'(x) = \sigma(x)\big(1 - \sigma(x)\big)
$$

Because $\sigma(x)$ outputs values strictly between $0$ and $1$, its derivative is always bounded ($\le 0.25$) and rapidly approaches $0$ as $x$ moves away from the origin in either direction.


---

## Mathematical Properties

1. **Self-Referential Derivative:**
$$
\sigma'(x) = \frac{d}{dx}\left(\frac{1}{1 + e^{-x}}\right) = \sigma(x)\big(1 - \sigma(x)\big)
$$

2. **Symmetry & Peak:**
   * Reaches its maximum slope when $x = 0$ ($\sigma(0) = 0.5$).
   * Symmetric around the origin: $\sigma'(-x) = \sigma'(x)$.

3. **Saturation Tails:**
   * As $x \to +\infty$, $\sigma(x) \to 1 \implies \sigma'(x) \to 0$
   * As $x \to -\infty$, $\sigma(x) \to 0 \implies \sigma'(x) \to 0$

---

## Impact on Neural Network Training

* **Gradient Shrinkage:** Because $\sigma'(x)$ is always less than $1.0$, multiplying these derivatives together across multiple layers during [[Backpropagation]] exponentially reduces the gradient signal reaching early layers.
* **Saturation / Freezing:** If a neuron receives very large or small inputs ($|x| \gg 0$), the derivative collapses near $0$, causing the neuron's weight updates to stall entirely.
* **Driven Migration:** These derivative limitations led modern architectures to replace Sigmoid with non-saturating activations like [[ReLU]] and dynamic gating mechanisms like [[Gated Linear Unit (GLU)|GLU]].