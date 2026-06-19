---
title: "Bayesian Networks"
created: "2026-06-16 11:19"
tags file:
---
### Core Definitions

- **Structure:** Formulated as [[Directed Acyclic Graphs]] (DAGs).
    
- **Nodes:** Represent individual random variables or model parameters.
    
- **Edges:** Explicitly define the **conditional dependencies** directly connecting parent variables to child nodes.

![[Pasted image 20260616114847.png|467]]

### Conditional Probability Tables (CPTs)

Every discrete node in a Bayesian network contains a Conditional Probability Table (CPT). This table tracks the exact probability profiles of a variable given every possible state combination of its parent nodes.

### Causal Integration & CPT Inference

Using the classic structural layout tracking _Rain ($R$)_, _Sprinkler ($S$)_, and _Wet Grass ($G$)_, the joint probability distribution can be factored as:

$$
P(G,S,R) = P(G|S,R)P(S|R)P(R)
$$

#### Inverse Probability Causal Calculation

To calculate an unobserved upstream cause from an observed downstream effect (such as calculating the probability that it rained given that the grass is wet), the network uses fractional marginal integration:

$$
P(R=T|G=T) = \frac{P(G=T, R=T)}{P(G=T)} = \frac{\sum_{x\in\{T,F\}} P(G=T, S=x, R=T)}{\sum_{x,y\in\{T,F\}} P(G=T, S=x, R=y)} \approx 35.7\%
$$

# Reference
https://en.wikipedia.org/wiki/Bayesian_network