---
title: Repulsive Ensemble
create: 2026-06-04 12:39
tags file:
  - "[[Scalable & Robust ML]]"
---
- In standard [[Deep Ensemble]]s, the diversity between model predictions relies entirely on the randomness of weight initializations and batch shuffling during training. 
- If two models happen to converge into very similar parameter configurations, the ensemble loses its capability to generate diverse predictions, causing its uncertainty estimation to collapse.

**Repulsive Ensembles** solve this by explicitly forcing the individual networks to stay distinct from one another. They achieve this by adding an explicit **repulsion penalty kernel ($k$)** to the loss function during optimization:

$$\theta_{t+1}^{(i)}\leftarrow\theta_{t}^{(i)}+\epsilon_{t}\phi(\theta_{t}^{(i)})$$

Where the update direction $\phi$ balances the standard task-based attraction (learning the data) with a mathematical repulsion term against all other ensemble members.

There are two primary ways to calculate this similarity penalty:

1. **Weight-Space Similarity ($W$-SVGD):** Penalizing the networks if their raw numerical weight matrices look too similar to one another.
    
2. **Function-Space Similarity ($f$-SVGD):** Penalizing the networks if they generate identical output predictions, even if their underlying weights are different.