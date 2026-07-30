---
title: Pyro Guide
created: 2026-07-28 21:14
tags file:
---
## The Definition (What)

A Pyro Guide is a parameterized Python function in the [[Pyro]] probabilistic programming framework that represents a candidate probability distribution used to approximate the unknown target posterior distribution of a Bayesian model.

## Why It Is Important (Why)

Calculating exact posterior distributions in complex probabilistic models requires computing intractable multi-dimensional integrals over all latent variables. 

Pyro Guides turn this intractable integration problem into an optimization problem via [[Stochastic Variational Inference (SVI)]], allowing scalable Bayesian inference on large datasets using PyTorch's gradient-descent engine.

## How It Works (How)

A Pyro Guide operates by proposing a tractable distribution $q_\phi(z)$ over latent variables $z$, controlled by trainable parameters $\phi$, and adjusting those parameters so $q_\phi(z)$ matches the true posterior $p_\theta(z \mid x)$ given observed data $x$.

### Phase 1: Structural Alignment between Model and Guide

The guide function must mirror every unobserved (latent) variable declared in the model using matching unique variable names. If a model samples a latent variable $z \sim p_\theta(z)$, the guide must specify a corresponding sampling statement:

$$
z \sim q_\phi(z)
$$

Here, $q_\phi(z)$ defines the family of distributions (e.g., Gaussian, Beta) used to approximate $z$, while $\phi$ represents learnable variational parameters (such as mean $\mu$ and scale $\sigma$) registered with `pyro.param`.

### Phase 2: Formulating the Optimization Objective (The ELBO)

To measure how closely the guide $q_\phi(z)$ matches the true posterior $p_\theta(z \mid x)$, Pyro optimizes the **Evidence Lower Bound (ELBO)**:

$$
\text{ELBO}(\theta, \phi) = \mathbb{E}_{q_\phi(z)} \left[ \log p_\theta(x, z) - \log q_\phi(z) \right]
$$

- $\mathbb{E}_{q_\phi(z)}$: The expected value evaluated over latent variable samples drawn from the guide.
    
- $\log p_\theta(x, z)$: The joint log-likelihood of observed data $x$ and latent variables $z$ under the generative model.
    
- $\log q_\phi(z)$: The log-density of those latent variable samples under the guide.
    

Maximizing the ELBO directly minimizes the Kullback-Leibler (KL) divergence between the guide distribution $q_\phi(z)$ and the exact target posterior $p_\theta(z \mid x)$:

$$
\text{KL}\left(q_\phi(z) \parallel p_\theta(z \mid x)\right) = \log p_\theta(x) - \text{ELBO}(\theta, \phi)
$$

### Phase 3: Stochastic Gradient Updates

During training, Pyro computes Monte Carlo estimates of the ELBO gradient using automatic differentiation in PyTorch. Variational parameters $\phi$ and model parameters $\theta$ are updated simultaneously via gradient ascent:

$$
\phi \leftarrow \phi + \eta \nabla_\phi \text{ELBO}(\theta, \phi)
$$

Where $\eta$ is the learning rate set by an optimizer like Adam.

## Additional Insights

### Direct Comparison: Guides (Variational Inference) vs. MCMC Sampling

- **MCMC (e.g., NUTS / HMC):** Generates exact samples from the true posterior without assuming a predefined shape. However, it scales poorly to large datasets and high-dimensional spaces because it requires iterating through the full dataset per sample step.
    
- **Pyro Guides (SVI):** Fits an explicit, parameterized distribution $q_\phi(z)$ to approximate the posterior. It scales easily to millions of data points using mini-batch gradient descent and GPUs, though its accuracy is limited by the expressiveness of the chosen distribution family.
    

### A Major Limitation

A guide can only approximate the true posterior as well as its chosen family of distributions allows (the _representation gap_). For example, if the model's posterior is multi-modal (has multiple peaks) but the guide is configured as a single Gaussian (`AutoNormal`), variational optimization will collapse onto a single mode or average across them, failing to represent the true multi-peak distribution.