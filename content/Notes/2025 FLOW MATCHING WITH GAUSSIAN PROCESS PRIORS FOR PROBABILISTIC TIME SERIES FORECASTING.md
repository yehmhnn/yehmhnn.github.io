---
title: 2025 FLOW MATCHING WITH GAUSSIAN PROCESS PRIORS FOR PROBABILISTIC TIME SERIES FORECASTING
create: 2026-03-31 13:43
tags file:
  - "[[Flow Matching]]"
---
# Abstract & Key Takeaways

Generative models—especially diffusion models—have become a leading paradigm for probabilistic time series forecasting. However, converting complex temporal data into a simple isotropic Gaussian prior forces the model to learn long, tortuous paths. This paper introduces **TSFlow**, a generative framework that replaces standard isotropic priors with **Conditional [[Gaussian Process]]es (GPs)** integrated into a **Conditional [[Flow Matching]] (CFM)** layout.

- **Informed Priors:** By utilizing GPs as priors, the model retains structural temporal dynamics natively within the base distribution instead of starting from pure white noise.
    
- **Trajectory Simplification:** Merging GP priors with Optimal Transport (OT) paths allows the model to learn straighter, shorter probability paths, drastically accelerating training.
    
- **Sampling Versatility:** Introduces a novel **conditional prior sampling** strategy alongside classifier-free guidance, enabling an unconditionally trained model to perform conditional probabilistic forecasting effectively without specialized retargeting.
    
- **Efficiency Boost:** Achieving equivalent sample quality (measured via Wasserstein distance) requires **~50% fewer training iterations** than standard isotropic Gaussian flow matching.

# Motivation
What problem does the paper address and why is it important?

- **The Problem:** 
	- Traditional diffusion and flow-matching architectures mapping temporal data to a standard, independent and identically distributed (i.i.d.) Gaussian prior distribution $q_0 = \mathcal{N}(0, \mathbf{I})$ create massive distribution shifts. Because the initial noise completely ignores the historical and temporal structure of time series data, the learned generative trajectories become overly complex and computationally expensive.
    
- **Why it Matters:** 
	- Real-world time series exhibit non-stationary, autocorrelated behaviors. Forcing a neural network to completely reconstruct these dynamics from scratch out of unmitigated chaos slows down convergence and scales poorly when applied across multi-horizon probabilistic tasks.

# Related Work


# Method

The authors build **TSFlow** by redesigning the boundary distribution of Conditional Flow Matching. Instead of regressing paths from white noise, they establish functional priors mapped directly via stochastic processes.

```
Isotropic Prior (Standard):  
[White Noise N(0,I)] ---(Complex Path)---> [Real Time Series Data]

TSFlow Prior (Proposed):     
[Gaussian Process Prior] ---(Straight OT Path)---> [Real Time Series Data]
```

### 1. Mathematical Objective

The model aims to optimize a vector field $u_\theta$ that matches the true conditional velocity vectors of the probability path transforming prior samples $x_0 \sim q_0$ into real data samples $x_1 \sim q_1$:

$$\min_\theta \mathbb{E}_{t, q(x_0, x_1)} \left[ \| u_\theta(x_t, t) - u_t(x_t | x_0, x_1) \|^2 \right]$$

Where $q(x_0, x_1)$ is bound using Optimal Transport (OT) displacement couplings to enforce structural alignment between the source and target.

### 2. Incorporating Gaussian Process Priors

- **Unconditional Setting:** 
	- The prior $q_0$ is drawn from a standard Gaussian Process $\mathcal{GP}(m(t), k(t, t'))$ configured to capture general periodicities or trends using classic rbf or periodic kernels.
    
- **Conditional Setting (Forecasting):** 
	- When historical context $y_p$ is known, the model modifies the boundary into a **conditional Gaussian Process** prior $q_0(x_0 | y_p)$, aligning the starting point closely with the expected continuous trajectories of the true future data.
    

### 3. Probabilistic Forecasting Variations

The paper maps out two distinct execution workflows:

1. **Conditionally Trained:** 
	- The network receives past context directly as an input token/conditioning matrix during training.
    
2. **Unconditionally Trained with Conditional Prior Sampling:** 
	- The model learns global dynamics without context tokens. During inference, it uses historical conditioning strictly to parameterize the GP prior $q_0(x_0 | y_p)$, utilizing guidance techniques to steer the unconstrained vector field seamlessly.
    

### Experimental Protocol

The architecture was comprehensively stress-tested using:

- **Datasets:** 
	- Evaluated across **eight real-world benchmarks** frequently leveraged in forecasting tasks (e.g. Solar, Electricity, Exchange Rate, Weather, ETT).
    
- [[Evaluation Metrics]]:
	- [[2-Wasserstein Distance (W2)]]: for unconditional generation
	- [[Linear Predictive Score (LPS)]]: for "Synthetic-for-Real" utility.
	- [[Continuous Ranked Probability Score (CRPS)]]: for Probabilistic Forecasting

# Conclusion
Strengths/weaknesses, how it compares to other work, and relevance to your own research.

# Future Work
What questions remain unanswered?
