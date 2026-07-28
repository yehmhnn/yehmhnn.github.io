---
title: Markov Chain Monte Carlo
created: 2026-06-16 11:09
tags file:
  - "[[Scalable & Robust ML]]"
aliases:
  - MCMC
---
## The Definition (What)

Markov Chain Monte Carlo (MCMC) is a class of computer algorithms that estimates complex probability distributions by taking a long sequence of smart, semi-random steps where each new position depends only on the current one.

## Why It Is Important (Why)

Calculating exact probabilities in high-dimensional Bayesian models requires computing an "intractable integral"—a calculation over every possible configuration that is mathematically impossible to solve analytically. 

MCMC solves this by bypassing the need to integrate altogether; instead of evaluating the entire probability space at once, it draws representative samples directly from the unnormalized target distribution, offering asymptotic guarantees of exact correctness given enough runtime.

## How It Works (How)

MCMC combines two foundational ideas: **[[Monte Carlo]]** (estimating properties of a system using random sampling) and **[[Markov Chain]]s** (a sequence of states where the next state depends solely on the current state, $P(\theta^{(t+1)} \mid \theta^{(t)}, \dots, \theta^{(0)}) = P(\theta^{(t+1)} \mid \theta^{(t)})$).

Regardless of the specific MCMC variant used, every MCMC algorithm follows the same 3-phase high-level loop:

```
[Current State θ_t] ──(1. Propose)──> [Candidate θ*] ──(2. Decide)──> [Accept/Reject] ──(3. Update Chain)
```

1. **Candidate Proposal:** Suggest a new state $\theta^*$ in parameter space using a proposal mechanism.
    
2. **Transition Decision:** Evaluate whether to move to $\theta^*$ or stay put based on target probability values.
    
3. **Chain Update & Convergence:** Update the state ($\theta^{(t+1)}$), discard early steps (Burn-in), and record samples until they converge to the target distribution.

---
## Additional Insights

### Taxonomy of MCMC Algorithms

MCMC algorithms differ primarily in **how they propose candidate steps (Phase 1)** and **how they decide to accept them (Phase 2)**:

#### 1. Classical / Random-Walk Samplers

- [[Metropolis-Hastings]]: Uses a proposal distribution $q$ and an acceptance ratio $\alpha$ to allow probabilistic steps uphill and downhill.
    
- [[Random-Walk Metropolis]]: A simplified special case of Metropolis-Hastings using symmetric proposal distributions.
    
- [[Gibbs Sampling]]: Eliminates rejection steps entirely by updating one parameter at a time, drawing directly from full conditional distributions.
    

#### 2. Gradient-Based / Physics-Informed Samplers

- [[Hamiltonian Monte Carlo]]: Treats probabilities as physical terrain and simulates a rolling puck using gradients to make long, high-acceptance moves in high dimensions.
    
    - [[Leapfrog Integration]]: The numerical integrator used inside [[Hamiltonian Monte Carlo|HMC]] to simulate physical trajectories.
        
- [[No-U-Turn Sampler]]: An advanced extension of HMC that automatically tunes step size and trajectory length on the fly to prevent U-turns.

### Concrete Example: The Blind Island Surveyor

Imagine a politician visiting an archipelago of islands to campaign, where each island's population is unknown:

1. **The Goal:** Spend time on each island proportional to its population without knowing the total national population.
    
2. **The Step:** Every day, the politician flips a coin to propose moving to a neighboring island.
    
3. **The Decision:**
    
    - If the neighbor island has a **larger population**, they move immediately.
        
    - If the neighbor island has a **smaller population**, they move only with a probability proportional to the ratio of the small population to the current population (e.g., if it has half the people, there is a 50% chance of moving).
        
4. **The Outcome:** Over weeks of moving, the fraction of days the politician spends on each island will match the population distribution of the nation.
    

### Direct Comparison: MCMC vs. Variational Inference (VI)

| **Feature**               | **Markov Chain Monte Carlo (MCMC)**                                               | **[[Variational Inference]] (VI)**                                                   |
| ------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Foundational Paradigm** | **Sampling:** Generates a sequence of stochastic state samples.                   | **Optimization:** Fits an approximate parameterized curve ($q_\phi$) using calculus. |
| **Accuracy Guarantee**    | Asymptotically exact (converges to true distribution as iterations $\to \infty$). | Approximate (permanently bounded by the expressiveness of $q_\phi$).                 |
| **Computational Speed**   | **Slow:** Computationally expensive; struggles on large datasets.                 | **Fast:** Highly efficient; scales to massive datasets via mini-batches.             |

### A Major Limitation: High Computational Cost & Slow "Mixing"

- **Autocorrelation:** Because each sample depends on the sample before it, adjacent samples in an MCMC chain are highly correlated, requiring millions of iterations (or heavy thinning) to draw meaningful independent samples.
    
- **Curse of Dimensionality:** In high-dimensional spaces (e.g., deep neural networks with millions of parameters), standard random-walk proposals get stuck in tiny regions or spend nearly all their time rejecting proposals (a issue addressed in part by advanced variants like [[Hamiltonian Monte Carlo]]).