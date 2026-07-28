---
title: "Random-Walk Metropolis"
created: "2026-07-26 18:56"
tags file:
---
## The Definition (What)

Random-Walk Metropolis is a simplified version of the [[Metropolis-Hastings]] algorithm that explores a target probability distribution by taking symmetric, unguided random steps in every direction around its current position.

## Why It Is Important (Why)

When sampling from an unknown or intractable probability distribution, designing an explicit proposal mechanism that knows where to step can be extremely difficult. 

Random-Walk Metropolis solves this by requiring only a simple, symmetric step generator (like a standard bell curve), completely eliminating the need to compute asymmetric proposal correction factors while still guaranteeing accurate long-term sampling from the target distribution.

## How It Works (How)

Random-Walk Metropolis simplifies the general [[Metropolis-Hastings]] framework by relying on a symmetric proposal distribution, causing the proposal correction factor in the acceptance ratio to cancel out completely.

### Phase 1: Symmetric Candidate Proposal (The Random Step)

Starting at current position $\theta^{(t)}$, the algorithm proposes a candidate state $\theta^*$ by drawing a random offset from a symmetric distribution $q$ (typically a Gaussian $\mathcal{N}(0, \sigma^2 I)$) centered directly on the current state:

$$
\theta^* = \theta^{(t)} + \epsilon, \quad \text{where } \epsilon \sim \mathcal{N}(0, \sigma^2 I)
$$

- $\theta^{(t)}$: The current position in parameter space.
    
- $\theta^*$: The proposed candidate position.
    
- $\epsilon$: A random step distance and direction drawn from a symmetric distribution.
    
- **Symmetry Property:** Because $q$ is symmetric, the likelihood of proposing $\theta^*$ from $\theta^{(t)}$ is identical to proposing $\theta^{(t)}$ from $\theta^*$:
$$
q(\theta^* \mid \theta^{(t)}) = q(\theta^{(t)} \mid \theta^*)
$$
    

### Phase 2: Simplified Acceptance Ratio Evaluation

Because the proposal probabilities are equal in both directions, the general Metropolis-Hastings acceptance ratio simplifies directly to the ratio of the target probabilities:

$$
\alpha(\theta^{(t)}, \theta^*) = \min\left(1, \; \frac{p^*(\theta^*)}{p^*(\theta^{(t)})}\right)
$$

- $p^*(\theta) = P(X \mid \theta) P(\theta)$: The unnormalized target density ($\text{Likelihood} \times \text{Prior}$).
    
- $\frac{p^*(\theta^*)}{p^*(\theta^{(t)})}$: The target density ratio. The proposal correction term $\frac{q(\theta^{(t)} \mid \theta^*)}{q(\theta^* \mid \theta^{(t)})}$ equals $1$ and drops out entirely.
    

### Phase 3: Transition & Update Rule

The algorithm draws a random number $u \sim \text{Uniform}(0, 1)$ to determine whether the chain moves or stays put:

$$
\theta^{(t+1)} = \begin{cases} \theta^* & \text{if } u \le \alpha(\theta^{(t)}, \theta^*) \quad \text{(Accept step)} \\ \theta^{(t)} & \text{if } u > \alpha(\theta^{(t)}, \theta^*) \quad \text{(Reject and repeat current position)} \end{cases}
$$

- If $\theta^*$ has a higher target density ($p^*(\theta^*) > p^*(\theta^{(t)})$), $\alpha = 1$ and the step is **always accepted**.
    
- If $\theta^*$ has a lower target density, the step is **accepted probabilistically**, allowing the chain to explore around valleys without getting stuck.
    

## Additional Insights

### Direct Comparison: Random-Walk Metropolis vs. Metropolis-Hastings

|**Feature**|**Random-Walk Metropolis**|**General Metropolis-Hastings**|
|---|---|---|
|**Proposal Distribution ($q$)**|Strictly **symmetric** (e.g., Gaussian centered at $\theta^{(t)}$).|Can be **asymmetric** (e.g., directional or skewed).|
|**Proposal Ratio Term**|$\frac{q(\theta^{(t)} \mid \theta^*)}{q(\theta^* \mid \theta^{(t)})} = 1$ (cancels out).|Explicitly computed in the ratio.|
|**Implementation Complexity**|Minimal; no need to track proposal density math.|Higher; requires tracking forward and backward proposal probabilities.|
|**Efficiency**|Slower exploration due to undirected random walking.|Can be significantly faster if asymmetric proposals guide steps well.|

### Concrete Example: The Blind Fog Walker

Imagine walking along a hilly landscape shrouded in thick fog to create an elevation map:

1. **The Step:** You pick a direction at complete random (50/50 chance left or right, forward or back) and take a equal-length step ($\epsilon$).
    
2. **Uphill Steps:** If your foot lands higher than where you were standing, you take the step immediately.
    
3. **Downhill Steps:** If your foot lands lower, you roll a die. If the slope drop is small, you'll likely take it anyway; if it drops into a deep ravine, you reject it, step back to your previous spot, and try again.
    

### A Major Limitation: The Step-Size Paradox in High Dimensions

- **The Variance Dilemma ($\sigma^2$):** * If the proposal step size $\sigma$ is **too small**, the acceptance rate is nearly $100\%$, but the algorithm takes tiny, shuffling steps and takes ages to explore the space.
    
    - If the proposal step size $\sigma$ is **too large**, almost every step lands in a low-density region far away, resulting in nearly $0\%$ acceptance and leaving the chain stuck in place for thousands of iterations.
        
- **Diffusion Rate Bottleneck:** Because moves are undirected, the distance traveled scales with the square root of time ($\mathcal{O}(\sqrt{T})$), making pure Random-Walk Metropolis unfeasibly slow for models with dozens or hundreds of parameters.