2026-05-12 14:58
Tags: [[Machine Learning]]
***

## Overview

**Cross Entropy Loss** (or Log Loss) measures the performance of a classification model whose output is a probability value between 0 and 1. It quantifies the difference between two probability distributions: the "true" distribution (ground truth labels) and the "predicted" distribution.

---

## Mathematical Definition

For a [[Multiclass classification]] problem with $C$ classes, the loss is calculated as:

$$L = -\sum_{c=1}^{C} y_{o,c} \log(p_{o,c})$$

Where:

- $y_{o,c}$ is a binary indicator ($0$ or $1$) if class label $c$ is the correct classification for observation $o$.
    
- $p_{o,c}$ is the predicted probability that observation $o$ is of class $c$.
    

### Binary Cross Entropy (BCE)

For a binary case ($C=2$), the formula simplifies to:

$$L = -(y \log(p) + (1 - y) \log(1 - p))$$

---

## Relationship with [[Softmax]]

In deep learning architectures, Cross Entropy Loss is almost always paired with a **Softmax** activation function in the final layer.

1. **Softmax:** Squashes the raw logits ($z$) into a probability distribution where the sum of all elements equals 1.
    
    $$\text{Softmax}(z_i) = \frac{e^{z_i}}{\sum_{j} e^{z_j}}$$
    
2. **Cross Entropy:** Compares that distribution to the one-hot encoded ground truth.
    

---

## Information Theory Context

Cross Entropy is derived from the concept of [[Kullback-Leibler (KL) Divergence]] ($D_{KL}$), which measures the "extra" bits needed to represent data from distribution $p$ using distribution $q$:

$$H(p, q) = H(p) + D_{KL}(p || q)$$

Where $H(p)$ is the entropy of the true distribution. In most ML tasks, the true distribution is fixed (one-hot encoded), so minimizing Cross Entropy is equivalent to minimizing KL Divergence.


---
# Reference
