---
title: "Gibbs Sampling"
created: "2026-07-26 19:05"
tags file:
---
## The Definition (What)

Gibbs Sampling is a [[Markov Chain Monte Carlo]] algorithm that samples from a multi-variable probability distribution by sequentially updating one variable at a time using its exact probability conditional on the current values of all other variables.

## Why It Is Important (Why)

Finding joint proposals that are accepted in high-dimensional spaces is extremely difficult, often leading to low acceptance rates and stalled samplers in algorithms like [[Metropolis-Hastings]].

Gibbs Sampling solves this bottleneck by turning a complex, multi-dimensional sampling task into a sequence of simpler, one-dimensional draws—completely eliminating the need for a proposal distribution $q$ and guaranteeing an **acceptance rate of 100%**.

## How It Works (How)

Gibbs Sampling works by cycling through each parameter individually, holding all other parameters fixed at their most recent values, and drawing new values directly from each full conditional distribution.

### Phase 1: Deriving Full Conditionals

For a model with $D$ parameters $\boldsymbol{\theta} = (\theta_1, \theta_2, \dots, \theta_D)$, Gibbs Sampling requires knowing the **full conditional distribution** for each individual parameter $\theta_j$ given current estimates of all other parameters $\boldsymbol{\theta}_{-j}$ and data $X$:

$$p(\theta_j \mid \boldsymbol{\theta}_{-j}, X) \propto p(\theta_1, \theta_2, \dots, \theta_D, X)$$

- $\theta_j$: The single parameter being updated.
    
- $\boldsymbol{\theta}_{-j}$: All other parameters besides $\theta_j$, held constant at their most recent values: $(\theta_1^{(t+1)}, \dots, \theta_{j-1}^{(t+1)}, \theta_{j+1}^{(t)}, \dots, \theta_D^{(t)})$.
    
- **Core Mechanism:** Because only $\theta_j$ varies, all other parameters act as fixed constants, drastically simplifying the mathematical form of the distribution.
    

### Phase 2: Systematic One-at-a-Time Updates

At step $t+1$, the algorithm updates each component of the parameter vector sequentially in a full round-robin sweep:

1. Draw $\theta_1^{(t+1)} \sim p(\theta_1 \mid \theta_2^{(t)}, \theta_3^{(t)}, \dots, \theta_D^{(t)}, X)$
    
2. Draw $\theta_2^{(t+1)} \sim p(\theta_2 \mid \theta_1^{(t+1)}, \theta_3^{(t)}, \dots, \theta_D^{(t)}, X)$
    
3. $\dots$
    
4. Draw $\theta_D^{(t+1)} \sim p(\theta_D \mid \theta_1^{(t+1)}, \theta_2^{(t+1)}, \dots, \theta_{D-1}^{(t+1)}, X)$
    

- Notice that as soon as a parameter is updated (e.g., $\theta_1^{(t+1)}$), its new value is immediately used to condition the subsequent parameter draws in the same iteration.
    

### Phase 3: Implicit Acceptance (100% Acceptance Rate)

Unlike [[Metropolis-Hastings]], Gibbs Sampling has no step rejection phase. If you plug a conditional sample into the Metropolis-Hastings acceptance ratio $\alpha$, the candidate proposal terms cancel out the target distribution terms exactly:

$$\alpha = \min\left(1, \; \frac{p(\theta_j^* \mid \boldsymbol{\theta}_{-j}) \, p(\theta_j^{(t)} \mid \boldsymbol{\theta}_{-j})}{p(\theta_j^{(t)} \mid \boldsymbol{\theta}_{-j}) \, p(\theta_j^* \mid \boldsymbol{\theta}_{-j})}\right) = 1$$

- **Result:** Every single proposed state $\boldsymbol{\theta}^*$ is accepted ($\alpha = 1.0$), ensuring zero wasted computation from rejected proposals.

	
---
## Additional Insights

### Direct Comparison: Gibbs Sampling vs. Metropolis-Hastings

#### 1. Metropolis-Hastings: Block Update (All-at-Once)

- **What happens:** At step $t$, it proposes a brand-new value for **every single parameter simultaneously** in one giant step:
    
    $$\boldsymbol{\theta}^* = (\theta_1^*, \theta_2^*, \theta_3^*, \dots, \theta_D^*)$$
    
- **The Catch:** It evaluates the entire block at once. If $99$ out of $100$ parameter values in $\boldsymbol{\theta}^*$ are great, but $1$ is terrible, the entire proposed vector gets rejected, and the chain stays put at $\boldsymbol{\theta}^{(t)}$.
    

#### 2. Gibbs Sampling: Coordinate Update (One-by-One)

- **What happens:** Instead of proposing a jump for the whole vector at once, it breaks the vector down and updates **one single parameter $\theta_j$ at a time** while holding all other parameters fixed.
    
- **The Cycle:**
    
    - Step 1: Update **$\theta_1$** (holding $\theta_2, \theta_3, \dots, \theta_D$ constant).
        
    - Step 2: Update **$\theta_2$** (holding $\theta_1, \theta_3, \dots, \theta_D$ constant).
        
    - Step 3: Update **$\theta_3$** (holding $\theta_1, \theta_2, \dots, \theta_D$ constant)... and so on.
        
- **The Benefit:** Because each 1D update uses its exact conditional distribution, every single mini-step is accepted ($100\%$ acceptance rate).

| **Feature**            | **Metropolis-Hastings**                                                                       | **Gibbs Sampling**                                                                  |
| ---------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Proposal Mechanism** | Proposes changes to all (or subsets of) variables simultaneously using $q$.                   | Samples individual variables one-by-one from exact full conditionals.               |
| **Acceptance Rate**    | Variable (often low if proposal step size is tuned poorly).                                   | **Always 100%** (no samples are ever rejected).                                     |
| **Prerequisites**      | Only requires evaluating unnormalized joint probability densities $p^*(\boldsymbol{\theta})$. | Requires analytically deriving or knowing how to sample from **full conditionals**. |
| **Tuning Required**    | Requires tuning proposal variances/step sizes.                                                | **Parameter-free:** No proposal parameters to tune.                                 |

### Concrete Example: Coordinating Room Temperatures

Imagine adjusting the thermostats in a 3-room building ($T_1, T_2, T_3$) to reach a comfortable overall thermal equilibrium:

- **Metropolis-Hastings Approach:** Guess new temperatures for all 3 rooms simultaneously. If room 1 is good but room 3 becomes freezing, reject the whole guess and try again.
    
- **Gibbs Sampling Approach:** 1. Hold rooms 2 and 3 constant, look at their current readings, and set room 1 to its ideal temperature given those neighboring rooms.
    
    2. Hold rooms 1 and 3 constant, and set room 2 to its ideal temperature given rooms 1 and 3.
    
    3. Hold rooms 1 and 2 constant, and adjust room 3.
    
    4. Repeat this loop until the whole house settles into thermal equilibrium.
    

### A Major Limitation: Highly Correlated Parameters Cause "Zig-Zag" Stagnation

- **The Correlation Trap:** If two parameters $\theta_1$ and $\theta_2$ are strongly correlated (e.g., forming a narrow diagonal ridge in parameter space), updating one variable while holding the other fixed allows only tiny perpendicular steps.
    
- **Slow Exploration:** The sampler gets trapped taking microscopic "zig-zag" steps along the correlation ridge, leading to extremely high autocorrelation and requiring millions of iterations to explore the space.
    
- **Fix:** Group strongly correlated variables together into a single joint block and update them simultaneously (known as **Block Gibbs Sampling**) or switch to [[Hamiltonian Monte Carlo]].