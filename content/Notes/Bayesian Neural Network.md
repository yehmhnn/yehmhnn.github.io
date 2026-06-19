---
title: "Bayesian Neural Networks (BNNs)"
created: "2026-06-04 07:56"
tags file:
---
A **Bayesian Neural Network (BNN)** is an extension of classical deep learning architectures that introduces probabilistic uncertainty into its weights and biases.

### The Core Difference: Fixed Weights vs. Weight Distributions

![[Pasted image 20260604081252.png|519]]

In a standard, classical neural network, each weight is represented by a single, fixed numerical value (a point estimate) learned during training. If you train the model twice on the same data with the same configuration, it tries to converge on these exact points.

Conversely, a BNN treats every single weight and parameter as a **probability distribution**. Instead of learning _one_ exact value for a weight, the network learns the parameters of a distribution (such as a mean $\mu$ and a variance $\sigma^2$), capturing how certain or uncertain the network is about that specific connection.

### Why Use Bayesian Neural Networks?

Classical neural networks are naturally overconfident and lack the inherent ability to say **"I don't know"** when given corrupted, ambiguous, or Out-of-Domain ([[OOD]]) data.

BNNs solve this by providing rigorous **Uncertainty Quantification**. BNNs allow you to isolate and measure two distinct types of uncertainty:
1. [[Aleatoric Uncertainty]]
2. [[Epistemic Uncertainty]]
    

Because they calculate true predictive distributions, BNNs significantly outperform [[Post-hoc OOD Scores]] (like Maximum Softmax Probability, MaxLogit, or Energy-based OOD scores) at flagging anomalies and edge cases safely.

### The Probabilistic Framework

The BNN workflow operates using standard Bayesian statistics:

- **The Prior ($p(\theta)$):** An initial assumption or belief about what the weight distributions look like before seeing any data.
    
- **The Likelihood ($p(y|x,\theta)$):** The probability of observing the training labels given the inputs and a specific sample of weights.
    
- **The Posterior ($p(\theta|D)$):** The target distribution that tells us how our weight beliefs should be updated after processing the training data $D$.

![[Pasted image 20260604081416.png]]
    

### Training Challenges (Inference)

Calculating the exact true posterior distribution mathematically is impossible (intractable) for deep neural networks. Therefore, BNNs rely on complex training approximation methods:

- **Markov Chain Monte Carlo (MCMC):** 
	- Sampling algorithms like Hamiltonian Monte Carlo (HMC) or Gibbs Sampling that explore the weight landscape to build a collection of realistic weight combinations. These are incredibly accurate but highly computation-heavy.
    
- **Variational Inference (VI):** 
	- An optimization approach (e.g., Stochastic Variational Inference or _Bayes by Backprop_) that fits a simple, known distribution (like a Gaussian curve) to approximate the complex true posterior.
    
- **Downscaled Approximations:** 
	- Highly scalable alternatives used in production, such as [[Monte Carlo Dropout]] (keeping dropout active at test time to simulate weight variations) or [[Deep Ensemble]]s.
    

### Making Predictions

To get a prediction from a trained BNN, you cannot do a single calculation pass. Instead, you must perform **multiple forward passes**:

1. For every pass, you randomly **sample a set of weights** from the learned probability distributions.
    
2. You pass the input data through these sampled weights to get an output prediction.
    
3. You repeat this process $N$ times and **analyze the resulting distribution of predictions**. The average of these outputs becomes your final prediction, and the spread (variance) tells you exactly how confident the network is.
