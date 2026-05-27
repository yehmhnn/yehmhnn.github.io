2026-05-08 16:17
Tags: [[Machine Learning]]
***

**The Philosophy:** "I don't care what a cat or dog looks like in isolation; I only care about the boundary that separates them."

A discriminative model skips the step of modeling how the data was generated. Instead, it learns the **conditional probability** $P(y \mid x)$ directly, or learns a direct mapping (a decision function) from inputs to labels.

### Key Example: Logistic Regression

Despite the name, this is a classifier. It models the probability of a class as a function of a linear combination of features:

$$P(y=1 \mid x) = \sigma(w^T x + b)$$

Where $\sigma$ is the [[Sigmoid]]. It doesn't care about the underlying PDF of the features; it only optimizes the weights $w$ to separate the classes.


---
# Reference
