---
title: "Bayesian Inference"
created: "2026-07-25 17:45"
tags file:
---
## Definition

**Bayesian Inference** is a statistical framework that uses [[Bayes' Theorem]] to dynamically update probabilities and quantify uncertainty as new data arrives.

## How It Differs From Frequentist Statistics

* **Uncertainty Quantification:** Treats parameters $\theta$ as random variables with probability distributions, rather than fixed static numbers.
* **Prior Knowledge:** Formally incorporates historical data or expert domain knowledge via prior distributions $P(\theta)$.
* **Continuous Learning:** The calculated posterior $P(\theta \mid x_1)$ from today becomes tomorrow's prior $P(\theta)$ when new data $x_2$ arrives.

## Optimization & Estimation Methods

1. **Maximum Likelihood Estimation (MLE):** Selects $\theta$ that maximizes $P(x \mid \theta)$ (ignores prior beliefs entirely).
2. **Maximum A Posteriori (MAP):** Selects $\theta$ that maximizes $P(\theta \mid x)$ (uses prior $P(\theta)$ as a regularizer).
3. **Full Posterior Approximation:** Approximates the entire distribution when $P(x)$ is intractable using methods like [[Stochastic Variational Inference (SVI)]] or Markov Chain Monte Carlo (MCMC).