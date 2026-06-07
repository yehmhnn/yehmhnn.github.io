---
title: "Probability of Improvement"
created: "2026-05-17 21:14"
tags file:
---
When comparing a new experimental model (Algorithm $X$) against an established baseline (Algorithm $Y$), researchers usually check if $\text{Mean}(X) > \text{Mean}(Y)$. This does not tell you how reliable the improvement is on a day-to-day basis.

The **Probability of Improvement** evaluates the models head-to-head, treating their scores as overlapping distributions. It calculates the exact probability that a single random run of your new model will outperform a single random run of the baseline on a randomly selected task.

#### The Mechanics:

Mathematically, it is formulated as:

$$P(X > Y) = \frac{1}{M} \sum_{m=1}^{M} \int F_Y(\tau) \, dF_X(\tau)$$

In an empirical setting, this is directly equivalent to running a Mann-Whitney U statistic calculation across the task matrices.

#### The Edge:

- If $P(X > Y) = 0.5$, the algorithms are identical.
    
- If $P(X > Y) = 0.75$, it means that if an engineer deploys your new algorithm to production, it will deliver a superior result than the legacy baseline in **75% of deployments**, making it a highly reliable upgrade path.
