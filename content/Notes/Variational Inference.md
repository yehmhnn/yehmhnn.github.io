---
title: Variational Inference
created: 2026-06-16 11:10
tags file:
aliases:
  - VI
---
## The Definition (What)

Variational Inference (VI) is a statistical technique that estimates complex, unknown probability distributions by reframing difficult integration problems into fast, optimization-based curve-fitting problems.

## Why It Is Important (Why)

Calculating exact probabilities in complex Bayesian models requires solving an "intractable integral"—a calculation over every possible hidden state that is mathematically impossible or computationally prohibitive for high-dimensional data. 

Variational Inference solves this by substituting exact integration with standard optimization, drastically speeding up statistical inference and enabling Bayesian models to scale to modern machine learning tasks like training Variational Autoencoders (VAEs).

## How It Works (How)

Variational Inference works by picking a family of manageable candidate distributions, measuring how far off they are from the true distribution, and tweaking their parameters until the error is as small as possible.

### Phase 1: Choosing a Variational Family

To approximate the true but impossible-to-calculate posterior distribution $p(z \mid x)$, VI introduces a simpler, parameterized distribution family $q_\phi(z)$:

$$q_\phi(z) \approx p(z \mid x)$$

- $x$: The observed data.
    
- $z$: The hidden (latent) variables.
    
- $q_\phi(z)$: The candidate distribution family (e.g., a simple Gaussian distribution).
    
- $\phi$: The trainable parameters (like mean $\mu$ and variance $\sigma^2$) that dictate the exact shape of $q$.
    

### Phase 2: Measuring the Distance (KL Divergence)

To bring $q_\phi(z)$ as close as possible to $p(z \mid x)$, VI uses **[[Kullback-Leibler (KL) Divergence]]** to measure the informational difference between the two distributions:

$$\text{KL}\big(q_\phi(z) \parallel p(z \mid x)\big) = \int q_\phi(z) \log \frac{q_\phi(z)}{p(z \mid x)} \, dz$$

- **The Catch:** You cannot compute this KL divergence directly because $p(z \mid x)$ is the exact intractable term you are trying to find in the first place!
    

### Phase 3: Optimizing the Proxy (Maximizing the [[Evidence Lower Bound|ELBO]])

Because direct KL minimization is blocked, VI uses a clever mathematical identity: minimizing the KL divergence is equivalent to **maximizing** a computable proxy called the **[[Evidence Lower Bound|Evidence Lower Bound (ELBO)]]**:

$$\text{ELBO}(\phi) = \mathbb{E}_{q_\phi(z)}[\log p(x, z)] - \mathbb{E}_{q_\phi(z)}[\log q_\phi(z)]$$

$$\arg\max_\phi \text{ELBO}(\phi) \implies \arg\min_\phi \text{KL}\big(q_\phi(z) \parallel p(z \mid x)\big)$$

- $\mathbb{E}_{q_\phi(z)}[\log p(x, z)]$: Encourages $q_\phi(z)$ to place high probability on latent variables that explain the data well.
    
- $-\mathbb{E}_{q_\phi(z)}[\log q_\phi(z)]$: Represents the entropy of $q_\phi(z)$, preventing the distribution from collapsing onto a single point.
    
- **Result:** By running gradient ascent on the ELBO using numerical optimizers, $q_\phi(z)$ dynamically shifts until it matches the true distribution as closely as its family allows.
    

## Additional Insights

### Concrete Example: The Sculpting Clay Analogy

- **True Posterior ($p(z \mid x)$):** A complex, highly detailed marble statue hidden inside a dark room that you cannot directly see or measure.
    
- **Variational Inference:** You take a workable block of soft clay ($q_\phi(z)$) into the room. Instead of trying to precisely trace every microscopic detail of the original statue, you reshape your clay ($\phi$) using numerical feedback until its overall shape matches the statue as closely as possible.
    

### Direct Comparison: Variational Inference (VI) vs. Markov Chain Monte Carlo (MCMC)

|**Feature**|**Markov Chain Monte Carlo (MCMC)**|**Variational Inference (VI)**|
|---|---|---|
|**Core Method**|**Sampling:** Generates millions of random samples to map the distribution.|**Optimization:** Uses calculus/gradient ascent to fit a curve.|
|**Execution Speed**|Extremely slow; takes hours or days on large datasets.|Very fast; converges in minutes using standard optimization.|
|**Accuracy**|Asymptotically exact (given infinite compute time).|Approximated (constrained by the chosen $q_\phi$ distribution family).|
|**Best Used For**|Small datasets where exact precision is required.|High-dimensional data and big-data ML models (e.g., [[Stochastic Variational Inference (SVI)|

### A Major Limitation: Underestimating Posterior Variance

- **The Mean-Field Assumption:** To make calculations fast, practitioners often assume that all latent variables in $q_\phi(z)$ are completely independent of one another (the _mean-field approximation_).
    
- **Mode-Seeking Behavior:** Because of how the directional KL divergence $\text{KL}(q \parallel p)$ penalizes errors, VI heavily prioritizes fitting the central peak (mode) of the true distribution. If the real distribution is complex or multi-peaked, VI will fit tightly around a single peak while completely ignoring the surrounding spread—leading to a systematic **underestimation of model uncertainty**.