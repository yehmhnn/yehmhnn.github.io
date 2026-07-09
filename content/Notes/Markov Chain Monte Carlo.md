---
title: Markov Chain Monte Carlo
created: 2026-06-16 11:09
tags file:
  - "[[Scalable & Robust ML]]"
---
- **Core Concept:** Approximates complex, arbitrary posterior distributions by drawing a sequential chain of discrete numeric samples.
    
- **Mathematical Properties:** Uses a **first-order [[Markov Chain]]**, meaning the choice of the next parameter sample depends strictly on the current position rather than its historical path.
    
- **Asymptotic Guarantee:** In the asymptotic limit of infinite sampling passes ($N \rightarrow \infty$), MCMC is mathematically guaranteed to converge on and represent the true, exact posterior distribution.
    
- **Common Algorithms:** Random Walk Metropolis, Metropolis-Hastings, Gibbs Sampling, and gradient-guided approaches like **Hamiltonian Monte Carlo (HMC)** or the No-U-Turn Sampler (NUTS).