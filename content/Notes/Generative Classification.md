---
title: "Generative Classification"
created: "2026-05-08 16:08"
tags file:
  - "[[Machine Learning]]"
---
***

**The Philosophy:** "To tell a cat from a dog, I must first learn what a cat looks like and what a dog looks like individually."

A generative model learns the **joint probability** $P(x, y)$. In practice, it models how the data was "generated" for each class using the class-conditional density $P(x \mid y)$ and the prior $P(y)$.

### How it uses [[Bayes' Theorem]]:

To classify a new point $x$, the model uses Bayes' rule to find the posterior:

$$P(y=k \mid x) = \frac{P(x \mid y=k)P(y=k)}{\sum_{j} P(x \mid y=j)P(y=j)}$$

### Key Example: [[Linear Discriminant Analysis (LDA)]]

LDA assumes that each class $k$ follows a **Multivariate Gaussian Distribution** with its own mean $\mu_k$ but a **shared [[Covariance Matrix]]** $\Sigma$.

- Because they share $\Sigma$, the quadratic terms in the Gaussian PDF cancel out when comparing two classes, leaving a **linear decision boundary**.


---
# Reference
