---
title: Shannon entropy
created: 2026-06-04 08:41
tags file:
  - "[[Machine Learning]]"
  - "[[Scalable & Robust ML]]"
---
**Shannon Entropy**, originally introduced by Claude E. Shannon in 1948, is a foundational concept in information theory used to quantify the average amount of uncertainty, surprise, or information contained within a random variable.

### Mathematical Definition

For a discrete random variable $X$ taking values in a set $\chi$ with a probability distribution $p(x)$, the Shannon Entropy $\mathbb{H}(X)$ is mathematically defined as:

$$\mathbb{H}(X)=-\sum_{x\in\chi}p(x)\cdot \log_{b}p(x)$$

- **The Logarithmic Base ($b$):** The base of the logarithm determines the unit of measurement. If $b=2$, the entropy is measured in **bits** (or shannons); if the natural logarithm (base $e$) is used, it is measured in **nats**.
    

### Core Intuition

Shannon Entropy acts as a direct mathematical proxy for unpredictability:

- **Maximum Entropy:** 
	- Occurs when all possible outcomes are equally likely (a uniform distribution). For example, a perfectly fair coin toss ($50\%$ heads, $50\%$ tails) represents the maximum possible entropy for a two-outcome system because you have zero certainty about the result.
    
- **Minimum Entropy ($0$):** 
	- Occurs when an outcome is completely guaranteed. If a coin is heavily rigged to land on heads $100\%$ of the time, there is zero surprise and zero uncertainty, yielding an entropy value of $0$.
    

### Application in Machine Learning Classification

In deep learning and robust artificial intelligence, Shannon Entropy is widely used to measure the **Total Predictive Uncertainty** of a network's outputs. For a deterministic classification model evaluating an input $x$ over $C$ target classes given a training dataset $D$, the predictive entropy is calculated as:

$$\mathbb{H}(y|x,D)=-\sum_{c=1}^{C}p(y=c|x,D)\cdot \log p(y=c|x,D)$$

### Shannon Entropy in Probabilistic Models (BNNs & Ensembles)

When dealing with probabilistic frameworks—such as [[Bayesian Neural Network]]s (BNNs) or [[Deep Ensemble]]—predictions are gathered across $N$ unique parameter samples or distinct network members ($w_n$).

To calculate the total predictive uncertainty in these architectures, you must average the predicted probabilities across all $N$ passes _before_ computing the outer entropy loop:

$$\mathbb{H}(y|x,D)=-\sum_{c=1}^{C}\left[\frac{1}{N}\sum_{n=1}^{N}p(y=c|x,w_{n})\cdot \log\left(\frac{1}{N}\sum_{n=1}^{N}p(y=c|x,w_{n})\right)\right]$$

> 📊 **Role in Uncertainty Decomposition:** In advanced robust machine learning, this total Shannon Entropy serves as the starting baseline. By subtracting the internal data noise ([[Aleatoric Uncertainty]]/ Softmax Entropy), researchers isolate the system's structural lack of knowledge ([[Epistemic Uncertainty]] / Mutual Information) to determine if a model is processing out-of-domain data.
