---
title: "Metropolis-Hastings"
created: "2026-07-26 10:01"
tags file:
---
## The Definition (What)

The Metropolis-Hastings algorithm is a specific sampling method that draws random samples from a complex probability distribution by using a proposal mechanism and an acceptance test to decide whether to move to a new state or stay at the current state.

## Why It Is Important (Why)

Many probability distributions in Bayesian statistics and statistical physics are known only up to an unnormalized constant, making direct sampling or exact integration computationally impossible. Metropolis-Hastings solves this by evaluating ratios of probabilities rather than absolute probabilities, completely canceling out the unknown normalizing constant (the intractable denominator) and enabling efficient sampling from high-dimensional, complex distributions.

## How It Works (How)

The Metropolis-Hastings algorithm generates a sequence of samples (a [[Markov Chain]]) through a continuous loop of proposing candidate moves and accepting or rejecting them based on a calculated probability.

### Phase 1: Candidate Proposal (The Random Step)

Starting at a current state $\theta^{(t)}$, the algorithm proposes a potential new candidate position $\theta^*$ by drawing from a proposal distribution $q$:

$$\theta^* \sim q(\theta^* \mid \theta^{(t)})$$

- $\theta^{(t)}$: The current position in parameter space.
    
- $\theta^*$: The proposed new candidate position.
    
- $q(\theta^* \mid \theta^{(t)})$: Proposal Distribution 
	- A simple probability distribution (e.g. a Gaussian centered at the current state $\theta^{(t)}$) used to explore nearby candidate steps.
	- It does **NOT** reflect your data or prior beliefs—it is picked purely for exploration. 

### Phase 2: Acceptance Ratio Evaluation

To determine whether to move to $\theta^*$ or stay put, the model calculates an acceptance probability $\alpha$ using the **[[Metropolis-Hastings]]** criterion:

$$
\alpha(\theta^{(t)}, \theta^*) = \min\left(1, \; \frac{p^*(\theta^*) \, q(\theta^{(t)} \mid \theta^*)}{p^*(\theta^{(t)}) \, q(\theta^* \mid \theta^{(t)})}\right)
$$
$$
p^*(\theta) = P(X \mid \theta) P(\theta)
$$

- $P(\theta)$: Prior Distribution
	- Your belief about parameters $\theta$ *before* observing any data $X$.
	- Acts as a regularizer/baseline weight inside $p^*(\theta) = P(X \mid \theta) P(\theta)$.

- $p^*(\theta)$: The **unnormalized** target probability density 
	- The numerator of [[Bayes' Theorem]] ($P(X \mid \theta) P(\theta)$) ($\text{Likelihood} \times \text{Prior}$)
	- Measures relative probability between states without needing the true normalizing evidence $P(X)$.
	- Because the intractable normalizing denominator $P(X)$ appears in both the numerator and denominator of the ratio $\frac{p^*(\theta^*)}{p^*(\theta^{(t)})}$, **it cancels out completely**, eliminating the impossible integral.
    
- $\frac{q(\theta^{(t)} \mid \theta^*)}{q(\theta^* \mid \theta^{(t)})}$: Proposal Correction Factor
	- A correction factor that accounts for any asymmetry in the proposal distribution. 
	- If $q$ is symmetric (e.g., a standard Gaussian where $q(\theta^* \mid \theta^{(t)}) = q(\theta^{(t)} \mid \theta^*)$), this term cancels to $1$, reducing to the classic **Metropolis Algorithm**. ([[Random-Walk Metropolis]])


### Phase 3: Transition & Long-Term Convergence (Updating the Chain)

Phase 3 is where the algorithm takes action based on the acceptance decision made in Phase 2, moving the system forward in time to build up a collection of samples.

#### Step 3A: The Decision Rule (Moving or Staying)

The algorithm rolls a uniform random die $u \sim \text{Uniform}(0, 1)$ to decide if it will accept the proposed candidate state $\theta^*$:

$$\theta^{(t+1)} = \begin{cases} \theta^* & \text{if } u \le \alpha(\theta^{(t)}, \theta^*) \quad \text{(Accept proposal: step to the new state)} \\ \theta^{(t)} & \text{if } u > \alpha(\theta^{(t)}, \theta^*) \quad \text{(Reject proposal: stay put and record current state again)} \end{cases}$$

- **If Accepted:** The chain steps forward to the candidate state ($\theta^{(t+1)} = \theta^*$).
    
- **If Rejected:** The chain stays at its current spot ($\theta^{(t+1)} = \theta^{(t)}$) and appends that current position to the list of samples again.
    

#### Step 3B: Discarding the Start (The Burn-in / Warm-up Phase)

Because you have to start the algorithm somewhere (e.g., setting $\theta^{(0)} = 0$), the first few hundred or thousand steps are heavily influenced by your initial guess rather than the actual target distribution.

- **Burn-in Period:** The initial portion of the chain (e.g., the first 1,000 steps) is thrown away.
    
- **Why do this?** It gives the algorithm time to "walk" from its arbitrary starting point into high-probability regions of the distribution before you start counting its positions as valid data.
    

#### Step 3C: Collecting the Target Samples (Stationary Distribution)

Once the burn-in period ends, every subsequent accepted/retained state is recorded as a valid sample.

- As you run this loop for thousands of iterations, the sequence of recorded states settles into a steady state (the **stationary distribution**).
    
- A histogram built from these collected samples converges to match the exact shape of the **True Posterior Distribution** $P(\theta \mid X)$.


---
## Additional Insights

### Summary of Distributions Involved

| Distribution | Name | Mathematical Form | Purpose in MCMC |
| :--- | :--- | :--- | :--- |
| **Proposal** | $q(\theta^* \mid \theta^{(t)})$ | User-chosen (e.g., $\mathcal{N}(\theta^{(t)}, \sigma^2)$) | Proposes the next potential step. |
| **Prior** | $P(\theta)$ | Domain-defined (e.g., $\mathcal{N}(0, 1)$) | Baseline belief before seeing data. |
| **Unnormalized Target**| $p^*(\theta)$ | $P(X \mid \theta) P(\theta)$ | Evaluates candidate steps in the ratio. |
| **True Posterior** | $P(\theta \mid X)$ | $\frac{P(X \mid \theta) P(\theta)}{P(X)}$ | The final distribution MCMC samples from. |

### Direct Comparison: Metropolis Algorithm vs. Metropolis-Hastings Algorithm

|**Feature**|**Original Metropolis Algorithm (1953)**|**Metropolis-Hastings Algorithm (1970)**|
|---|---|---|
|**Proposal Distribution ($q$)**|Must be **symmetric** ($q(x^* \mid x_t) = q(x_t \mid x^*)$).|Can be **asymmetric** ($q(x^* \mid x_t) \neq q(x_t \mid x^*)$).|
|**Acceptance Ratio Formula**|$\alpha = \min\left(1, \frac{P^*(x^*)}{P^*(x_t)}\right)$|$\alpha = \min\left(1, \frac{P^*(x^*) q(x_t \mid x^*)}{P^*(x_t) q(x^* \mid x_t)}\right)$|
|**Flexibility**|Restricted to random-walk style symmetric proposals (e.g., standard Gaussian).|Enables directional, adaptive, or biased proposals, vastly expanding MCMC efficiency.|

### Concrete Example: Mountain Climber in the Fog

Imagine a climber exploring a mountain range in deep fog to map out the highest peaks:

- **Current Position ($x_t$):** The elevation where the climber is standing.
    
- **Proposal ($x^*$):** The climber takes a step in a random direction.
    
- **Uphill Moves:** If the step goes uphill ($P^*(x^*) > P^*(x_t)$), the climber always takes it.
    
- **Downhill Moves:** If the step goes downhill, the climber doesn't automatically refuse it. They roll a die; if the drop is small, they will likely take it anyway to see if it leads to a higher neighboring peak across the valley.
    

### A Major Limitation: The Random Walk Bottleneck in High Dimensions

- **Curse of Dimensionality:** In high-dimensional spaces (e.g., thousands of parameters), simple random-walk proposals $q(x^* \mid x_t)$ become extremely inefficient.
    
- **The Trade-off Dilemma:** 
	* If the proposal step size is **too large**, almost all proposals land in low-probability regions and get rejected ($\alpha \approx 0$), leaving the chain stuck in place.
    
    - If the proposal step size is **too small**, almost every proposal is accepted, but the chain takes tiny, highly correlated steps and takes an infeasibly long time to explore the space.
        
- **Modern Fix:** Modern Bayesian inference often swaps standard Metropolis-Hastings for **[[Hamiltonian Monte Carlo]]** or **[[No-U-Turn Sampler|NUTS]]**, which use gradient vector fields to propose intelligent, high-dimensional trajectories rather than random jumps.