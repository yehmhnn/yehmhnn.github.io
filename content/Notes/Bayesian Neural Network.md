---
title: "Bayesian Neural Networks (BNNs)"
created: "2026-06-04 07:56"
tags file:
---
## The Definition (What)

A Bayesian Neural Network (BNN) is a type of neural network that uses probability distributions instead of single fixed numbers for its weights, allowing it to quantify how uncertain it is about its predictions.

![[Pasted image 20260604081252.png|519]]

## Why It Is Important (Why)

Classical neural networks are naturally overconfident and lack the inherent ability to say **"I don't know"** when given corrupted, ambiguous, or Out-of-Domain ([[Out-of-Domain]]) data.

BNNs solve this by providing rigorous **Uncertainty Quantification**. BNNs allow you to isolate and measure two distinct types of uncertainty:
1. [[Aleatoric Uncertainty]]
2. [[Epistemic Uncertainty]]
    
Because they calculate true predictive distributions, BNNs significantly outperform [[Post-hoc OOD Scores]] (like Maximum Softmax Probability, MaxLogit, or Energy-based OOD scores) at flagging anomalies and edge cases safely.


## How It Works (How)

![[Pasted image 20260604081416.png]]

### 1. From Fixed Weights to Prior Distributions

Instead of initializing weights as single points, we treat every weight $w$ in the network as a random variable described by a **prior probability distribution**, $P(w)$. This represents our initial belief about what the weights should be before seeing any training data (often a standard normal distribution, $w \sim \mathcal{N}(0, I)$).

### 2. Updating Beliefs with Data (The Posterior)

When presented with training data $D = \{(x_1, y_1), \dots, (x_N, y_N)\}$, we update our beliefs about the weights using **Bayes' Rule**:

$$
P(w \vert{} D) = \frac{P(D \vert{} w) P(w)}{P(D)}
$$

- $P(w \vert{} D)$ is the **posterior distribution**—our updated belief about the weights after observing the data.
    
- $P(D \vert{} w)$ is the **likelihood**—how well a specific set of weights explains the observed data.
    
- $P(D)$ is the **evidence** (or marginal likelihood)—the probability of observing the data averaged over all possible weight configurations, calculated as $\int P(D \vert{} w) P(w) \, dw$.
    

### 3. Overcoming the Intractability Dilemma

Calculating the exact true posterior distribution mathematically is impossible (intractable) for deep neural networks. Therefore, BNNs rely on complex training approximation methods:

- **[[Markov Chain Monte Carlo]] (MCMC):** 
	- Sampling algorithms like [[Hamiltonian Monte Carlo]] or [[Gibbs Sampling]] that explore the weight landscape to build a collection of realistic weight combinations. These are incredibly accurate but highly computation-heavy.
    
- **[[Variational Inference]] (VI):** 
	- An optimization approach (e.g., [[Stochastic Variational Inference (SVI)]] or _Bayes by Backprop_) that fits a simple, known distribution (like a Gaussian curve) to approximate the complex true posterior.
    
- **Downscaled Approximations:** 
	- Highly scalable alternatives used in production, such as [[Monte Carlo Dropout]] (keeping dropout active at test time to simulate weight variations) or [[Deep Ensemble]]s.
    

### 4. Making Predictions

To get a prediction from a trained BNN, you cannot do a single calculation pass. Instead, you must perform **multiple forward passes**:

1. For every pass, you randomly **sample a set of weights** from the learned probability distributions.
    
2. You pass the input data through these sampled weights to get an output prediction.
    
3. You repeat this process $N$ times and **analyze the resulting distribution of predictions**. The average of these outputs becomes your final prediction, and the spread (variance) tells you exactly how confident the network is.

## Additional Insights

### Direct Comparison: Standard NN vs. Bayesian NN

|**Feature**|**Standard Neural Network**|**Bayesian Neural Network**|
|---|---|---|
|**Weight Representation**|Single scalar values (e.g., $w = 0.72$)|Probability distributions (e.g., $w \sim \mathcal{N}(0.72, 0.1)$)|
|**Prediction Output**|Single point estimate or confidence score|Distribution of outputs yielding a mean and uncertainty range|
|**Out-of-Distribution Data**|Produces high confidence even on bad data|Shows high variance/uncertainty, flagging unfamiliar data|
|**Computational Cost**|Fast training and instant inference|High computational overhead due to sampling and inference|

### A Major Limitation

- **Computational Expense:** Training a BNN and making predictions takes significantly more time and memory than standard networks. Because you must sample the weights multiple times (e.g., 10 to 100 forward passes per single input) to get a reliable uncertainty estimate, BNNs can be too slow for real-time applications with strict latency constraints without heavy optimization or approximations like [[Monte Carlo Dropout]].