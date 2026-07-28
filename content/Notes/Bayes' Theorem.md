---
title: Bayes' Theorem
created: 2026-05-08 15:37
tags file:
  - "[[Machine Learning Essentials]]"
  - "[[Probability & Statistics]]"
---
## Definition

**Bayes' Theorem** is a fundamental mathematical identity in probability theory that describes the exact conditional probability of an event based on prior conditions related to the event.

## The Formula
$$
P(\theta \mid x) = \frac{P(x \mid \theta) P(\theta)}{P(x)}
$$

## Component Breakdown

- $x$ (Data):
	- The actual observations you have collected 
	- (e.g., sensor readings, image pixels, coin flip results).

- $\theta$ (Parameters):
	- The hidden constants that govern how that data is generated.

- **$P(\theta \mid x)$ (Posterior):** 
	- What we know about the parameters after observing data.
	- The probability of the parameters being true _after_ seeing the data.
    
- **$P(x \mid \theta)$ (Likelihood):** 
	- The probability of the data $x$ occurring given parameters $\theta$.
	- How well the parameters explain the observed data.
    
- **$P(\theta)$ (Prior):** 
	- Your belief about the parameters before seeing any data.
    
- **$P(x)$ (Evidence):** 
	- The total probability of the data under all possible parameters (a normalizing constant).
	- The marginal likelihood of the data, calculated by integrating the numerator over all possible $\theta$:
$$
P(x) = \int P(x \mid \theta) P(\theta) \, d\theta
$$

## Key Properties

* **Proportionality:** Because $P(x)$ is constant for a given dataset, the formula simplifies to:
$$
\text{Posterior} \propto \text{Likelihood} \times \text{Prior}
$$
* Acts as the core mathematical foundation for [[Bayesian Inference]].


related note: [[Likelihood vs. Probability]]
