---
title: Uncertainty Decomposition for Classification
create: 2026-06-04 09:07
tags file:
  - "[[Scalable & Robust ML]]"
---
When evaluating a Bayesian model over $N$ forward passes or weight samples ($w_n$), total uncertainty can be split into distinct components using information theory properties:

### 1. Total Predictive Uncertainty ([[Shannon Entropy]])

Measures the overall system uncertainty by calculating the entropy of the _average_ prediction across all sampled forward passes:

$$\mathbb{H}(y|x,D)=-\sum_{c=1}^{C}\left[\frac{1}{N}\sum_{n=1}^{N}p(y=c|x,w_{n})\cdot \log\left(\frac{1}{N}\sum_{n=1}^{N}p(y=c|x,w_{n})\right)\right]$$

### 2. [[Aleatoric Uncertainty]] ([[Softmax Entropy]])

Calculates the _average of the individual entropies_ across your classes, capturing the data noise independent of model weight variations:

$$\mathbb{E}_{p(w|D)}(\mathbb{H}(y|x,w))=-\frac{1}{N}\sum_{n=1}^{N}\sum_{c=1}^{C}p(y=c|x,w_{n})\cdot \log(p(y=c|x,w_{n}))$$

### 3. [[Epistemic Uncertainty]] ([[Mutual Information]])

Isolated by subtracting the aleatoric uncertainty from the total predictive uncertainty:

$$\mathbb{I}(y,w|x,D)=\mathbb{H}(y|x,D)-\mathbb{E}_{p(w|D)}(\mathbb{H}(y|x,w))$$

![[Pasted image 20260604123220.png|479]]