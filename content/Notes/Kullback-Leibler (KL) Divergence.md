---
title: "Kullback-Leibler (KL) Divergence"
created: "2026-05-12 15:13"
tags file:
  - "[[Machine Learning]]"
---
***

### Definition

**KL Divergence** (also called Relative Entropy) measures how one probability distribution $Q$ diverges from a second, expected probability distribution $P$. It quantifies the "information loss" when $Q$ is used to approximate $P$.

For discrete distributions:

$$D_{KL}(P \parallel Q) = \sum_{x \in \mathcal{X}} P(x) \log \left( \frac{P(x)}{Q(x)} \right)$$

### Interpretations

1. **Bayesian:** The gain in information about $X$ when our beliefs are updated from $Q$ to $P$.
    
2. **Coding Theory:** The extra bits required to encode samples from $P$ using a code optimized for $Q$.
    

### Critical Properties

> [!warning] Non-Symmetry
> 
> KL Divergence is **not a distance metric** because it is asymmetric:
> 
> $$D_{KL}(P \parallel Q) \neq D_{KL}(Q \parallel P)$$

- **Gibbs' Inequality:** $D_{KL}(P \parallel Q) \geq 0$, with equality if and only if $P = Q$.
    
- **Forward vs. Reverse KL:** * **Forward ($P \parallel Q$):** Often "mean-seeking." $Q$ tries to cover all regions where $P$ has high probability.
    
    - **Reverse ($Q \parallel P$):** Often "mode-seeking." $Q$ settles on one of the peaks of $P$.
        

### Machine Learning Applications

- **Variational Autoencoders (VAEs):** Used to force the latent distribution toward a prior (usually a Standard Gaussian).
    
- **Loss Functions:** Maximizing Likelihood is equivalent to minimizing the KL divergence between the empirical distribution of the data and the model distribution.
    
- **Generative Flows:** Used as a training objective to ensure the transformed distribution matches the target distribution.


---
# Reference
