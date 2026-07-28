---
title: No-U-Turn Sampler (NUTS)
created: 2026-07-26 11:59
tags file:
aliases:
  - NUTS
---
## The Definition (What)

The No-U-Turn Sampler (NUTS) is an automated extension of [[Hamiltonian Monte Carlo]] that dynamically calculates the optimal distance a simulated particle should travel so it explores probability space efficiently without wasting compute by looping backward.

## Why It Is Important (Why)

Standard Hamiltonian Monte Carlo (HMC) requires users to manually guess and tune two critical parameters: the leapfrog step size ($\epsilon$) and the number of trajectory steps ($L$). If $L$ is set too small, HMC degenerates into slow random-walk behavior; if $L$ is set too large, the simulated particle doubles back on itself in a circular path—wasting significant computing power to end up near where it started. 

NUTS solves this manual tuning bottleneck by automatically stopping the physics simulation the exact moment the particle begins to turn around.

## How It Works (How)

NUTS eliminates the need to specify a fixed trajectory length $L$ by recursively building a tree of leapfrog steps forward and backward in time, evaluating a mathematical stopping criterion at each expansion depth.

### Phase 1: Doubling Tree Trajectories

Instead of stepping sequentially for a fixed length $L$, NUTS generates candidate trajectories by building a balanced binary tree of depth $j$. The trajectory length is doubled at every expansion step, and the direction of that doubling is chosen randomly:

$$L_{\text{total}} = 2^j$$

- $j$: The tree depth level ($j = 0, 1, 2, \dots$).

#### 1. Why Doubling ($2^j$)?

Every time you stop to check whether a trajectory is making a U-turn, you have to compute mathematical dot products between vectors.

- **Linear Strategy (+1 step at a time):** To check a 1,024-step path, you would have to calculate U-turn tests **1,024 times**.
    
- **Doubling Strategy ($2^j$):** You only evaluate the U-turn check **at the boundaries of each new subtree** ($j = 0, 1, 2, \dots, 10$). You perform the check only **10 times** instead of 1,024 times!

#### 2. Why Random Direction (Forward vs. Backward)?

To maintain the mathematical validity of Markov Chain Monte Carlo, the transition proposal **must be time-reversible**. That means the probability of moving from state A to state B must be equal to the probability of moving from B back to A.

If NUTS only expanded the trajectory _forward_ in time:

- The current state $\boldsymbol{\theta}^{(t)}$ would always sit at the very beginning of the trajectory tree.
    
- This asymmetry breaks time-reversibility, biasing the sampler.


![[Pasted image 20260727071401.png|536]]
- Example of building a binary tree via repeated doubling
- Each doubling proceeds by choosing a direction (forwards or backwards in time) uniformly at random


### Phase 2: The No-U-Turn Criterion

To check whether the path is beginning to loop back on itself, NUTS monitors the leftmost (earliest) state $\boldsymbol{\theta}_{\text{left}}$ and rightmost (latest) state $\boldsymbol{\theta}_{\text{right}}$ in the current trajectory tree. Growth stops immediately if the inner product between the total displacement vector and the end momentum vectors becomes negative:

$$\langle (\boldsymbol{\theta}_{\text{right}} - \boldsymbol{\theta}_{\text{left}}), \mathbf{p}_{\text{left}} \rangle < 0 \quad \text{or} \quad \langle (\boldsymbol{\theta}_{\text{right}} - \boldsymbol{\theta}_{\text{left}}), \mathbf{p}_{\text{right}} \rangle < 0$$

- $(\boldsymbol{\theta}_{\text{right}} - \boldsymbol{\theta}_{\text{left}})$: The straight-line displacement vector connecting the two extreme ends of the trajectory.
    
- $\mathbf{p}_{\text{left}}, \mathbf{p}_{\text{right}}$: The physical momentum vectors at the left and right boundaries of the tree.
    
- **Intuitive Meaning:** If the momentum vector points back toward the opposite end of the trajectory, the particle has stopped moving away from its origin and is starting to double back (a U-turn). Growth terminates at once.

### Phase 3: Sample Selection & Chain Update ($\boldsymbol{\theta}^{(t)} \to \boldsymbol{\theta}^{(t+1)}$)

Once tree growth halts due to a U-turn condition, NUTS completes the MCMC step using a multi-stage update process:

#### Step 3A: Slice Sampling Selection (Replaces Metropolis Acceptance)

Instead of evaluating a single Metropolis-Hastings acceptance ratio at the end of a fixed trajectory, NUTS selects the next state $\boldsymbol{\theta}^{(t+1)}$ from the pool of valid states generated throughout the tree using **slice sampling**:

$$u \sim \text{Uniform}\left(0, \; \exp\left(-H(\boldsymbol{\theta}^{(t)}, \mathbf{p}^{(t)})\right)\right)$$

- **$H(\boldsymbol{\theta}, \mathbf{p})$:** The total energy (Hamiltonian) at state $(\boldsymbol{\theta}, \mathbf{p})$.
    
- **$u$:** A random threshold drawn at the start of the step. 
	- Any candidate node $(\boldsymbol{\theta}^*, \mathbf{p}^*)$ in the tree satisfying $u \le \exp(-H(\boldsymbol{\theta}^*, \mathbf{p}^*))$ enters the candidate pool. 
	- The algorithm then selects $\boldsymbol{\theta}^{(t+1)}$ from this pool, heavily favoring states that preserve total energy.
    

#### Step 3B: Discarding Auxiliary Variables

Once the new position $\boldsymbol{\theta}^{(t+1)}$ is chosen, the momentum vector $\mathbf{p}^*$ is discarded. Only $\boldsymbol{\theta}^{(t+1)}$ is recorded into the saved MCMC sample history. A fresh momentum vector is drawn at the start of the next iteration.

#### Step 3C: Warm-up & Long-Term Convergence

- **Warm-up Phase (Adaptive Tuning):** Early iterations are discarded as burn-in. In addition to moving away from initial starting guesses, NUTS uses warm-up steps to automatically tune the step size $\epsilon$ (via _dual averaging_) to hit a target acceptance rate (typically $80\%$).
    
- **Stationary Convergence:** As the chain continues post-warm-up, the collection of recorded states converges to match the exact shape of the **True Posterior Distribution** $P(\boldsymbol{\theta} \mid X)$.
    

## Additional Insights

### Direct Comparison: Standard HMC vs. NUTS

|**Feature**|**Standard Hamiltonian Monte Carlo (HMC)**|**No-U-Turn Sampler (NUTS)**|
|---|---|---|
|**Trajectory Length ($L$)**|Fixed constant; must be manually hand-tuned.|**Adaptive:** Determined dynamically at every iteration.|
|**U-Turn Behavior**|Wastes compute loops if $L$ is set too large.|**Eliminated:** Stops automatically as soon as a U-turn begins.|
|**Usability**|High failure rate if $L$ is misconfigured.|**Gold standard default** in probabilistic programming frameworks (e.g., Stan, PyMC).|
|**Step-Size ($\epsilon$) Tuning**|Requires manual trial-and-error.|Automatically tuned during warm-up via dual averaging.|

### Concrete Example: The Smart Drone Exploration

Imagine deploying an automated search drone to map out a valley:

- **Standard HMC:** You program the drone to fly straight for exactly 10 kilometers. If the valley ends after 3 kilometers, the drone flies 3 kilometers up a steep cliff, turns around, and flies 4 kilometers back toward where it started, wasting battery for no gain.
    
- **NUTS:** The drone flies forward while monitoring its relative velocity. The moment it senses its momentum vector bending back toward its starting location, it lands, records its position as a sample, and re-launches in a new random direction.
    

### A Major Limitation: High Computational Overhead Per Step

- **Sub-step Cost:** Building dynamic recursive binary trees requires taking $2^j$ gradient evaluations ($\nabla U(\boldsymbol{\theta})$) per iteration. For difficult, multi-modal, or highly non-linear posterior surfaces, tree expansion can occasionally hit high depth levels ($j = 10 \implies 1,024$ leapfrog steps per single sample), causing individual iterations to feel significantly slower than standard random-walk methods despite superior overall sample quality.