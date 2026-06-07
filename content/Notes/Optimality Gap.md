---
title: "Optimality Gap"
create: "2026-05-17 21:14"
tags file:
---
When algorithms achieve "superhuman" performance, standard averages become completely warped. An algorithm that scores a $10.0$ (1000% of human capability) on an easy game can mathematically drag up its average, hiding zero-scores elsewhere.

The **Optimality Gap** fixes this by shifting the focus from _"How high can the score go?"_ to _"How far away is the model from our desired target?"_

#### The Mechanics:

Researchers establish a target benchmark $\gamma$ (Gamma)—for example, average human performance ($\gamma = 1.0$). The Optimality Gap measures the expected amount by which an algorithm fails to meet that target:

$$\text{Optimality Gap} = \frac{1}{M} \sum_{m=1}^{M} \mathbb{E}\left[ \max(0, \gamma - X_m) \right]$$

#### The Edge:

If the target is $\gamma = 1.0$, and an algorithm scores a $5.0$, the term $\max(0, 1.0 - 5.0)$ outputs $0$. The algorithm receives **zero extra credit** for overperforming on that specific environment.

This metric penalizes inconsistency. It forces the aggregate score to reflect whether the model is universally proficient across all tasks, rather than rewarding opportunistic hyper-specialization on a subset of easy environments.