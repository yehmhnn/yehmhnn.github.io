---
title: Hamiltonian Monte Carlo
created: 2026-07-26 11:57
tags file:
aliases:
  - HMC
---
## The Definition (What)

Hamiltonian Monte Carlo (HMC) is an advanced sampling algorithm that uses the principles of physical motion—treating probabilities as landscapes and parameter estimates as rolling objects—to efficiently explore complex, high-dimensional probability distributions.

## Why It Is Important (Why)

Both [[Metropolis-Hastings]] (which proposes all parameters at once in a random step) and [[Gibbs Sampling]] (which updates one parameter at a time) struggle in high-dimensional spaces with complex correlations, often taking tiny "zig-zag" steps or suffering from extremely high rejection rates. 

HMC solves this "curse of dimensionality" by leveraging gradient vector fields to simulate smooth physical trajectories, allowing it to propose long, sweeping jumps across dozens or hundreds of parameters simultaneously while maintaining high acceptance rates.

## How It Works (How)

HMC expands the parameter space by introducing auxiliary "momentum" variables and simulates physical motion across a potential surface defined by the target probability distribution.

### Phase 1: State Expansion & Total Energy (The Hamiltonian)

To turn probabilistic sampling into a physical simulation, HMC pairs the target parameter vector $\boldsymbol{\theta}$—treated as physical position—with an auxiliary momentum vector $\mathbf{p}$ of equal length ($D$ dimensions). The system is governed by total energy, known as the **Hamiltonian** $H(\boldsymbol{\theta}, \mathbf{p})$:

$$
H(\boldsymbol{\theta}, \mathbf{p}) = U(\boldsymbol{\theta}) + K(\mathbf{p})
$$

- $\boldsymbol{\theta} = (\theta_1, \theta_2, \dots, \theta_D)$: The position vector containing **all parameters at once**.
    
- $\mathbf{p} = (p_1, p_2, \dots, p_D)$: The momentum vector, drawn fresh at the start of each step from a Gaussian distribution $\mathbf{p} \sim \mathcal{N}(0, \mathbf{M})$.
    
- $U(\boldsymbol{\theta}) = -\log p^*(\boldsymbol{\theta})$: The **Potential Energy**, set to the negative log-probability of the unnormalized target distribution. High-probability regions act as deep valleys, while low-probability regions act as steep hills.
    
- $K(\mathbf{p}) = \frac{1}{2} \mathbf{p}^T \mathbf{M}^{-1} \mathbf{p}$: The **Kinetic Energy**, dictated by momentum $\mathbf{p}$ and a mass matrix $\mathbf{M}$.
    

### Phase 2: Simulating Trajectories ([[Leapfrog Integration]])

To propose a new sample, HMC simulates how a physical puck would slide across the potential energy surface for a duration of $L$ time steps using **Hamilton's equations**:

$$
\frac{dq}{dt} = \frac{\partial H}{\partial p} = M^{-1} p \quad \text{and} \quad \frac{dp}{dt} = -\frac{\partial H}{\partial q} = -\nabla U(q)
$$

Because continuous differential equations cannot be solved exactly on a computer, HMC uses a numerical integrator called the **[[Leapfrog Integration]]** with a small step size $\epsilon$:

1. Half-step momentum update:
$$
p\left(t + \frac{\epsilon}{2}\right) = p(t) - \frac{\epsilon}{2} \nabla U(q(t))
$$
    
2. Full-step position update:
$$
q(t + \epsilon) = q(t) + \epsilon M^{-1} p\left(t + \frac{\epsilon}{2}\right)
$$
    
3. Final half-step momentum update:
$$
p(t + \epsilon) = p\left(t + \frac{\epsilon}{2}\right) - \frac{\epsilon}{2} \nabla U(q(t + \epsilon))
$$
    

- $\nabla U(q)$: The gradient vector of the potential energy (the slope of the surface). This gradient pushes the momentum away from steep slopes and guides the position along continuous probability contours.

> **Connecting Physics to [[Markov Chain Monte Carlo|MCMC]] Variables:**
> 	- Physical **Position $q$** corresponds to your **Model Parameters $\boldsymbol{\theta}$**.
> 	- Physical **Momentum $p$** is a temporary auxiliary variable generated fresh at each step and discarded at the end of the iteration.

### Phase 3: Metropolis-Hastings Correction Step

In an ideal, continuous system, energy $H(q, p)$ is perfectly conserved. However, numerical discretization error from the leapfrog steps can introduce slight energy shifts. To ensure exact sampling from the target distribution, HMC applies a final Metropolis-Hastings acceptance test on the proposed state $(q^*, p^*)$:

After $L$ leapfrog sub-steps, the simulation lands at a proposed candidate position $q^*$ and momentum $p^*$:

1. **Calculate Acceptance ($\alpha$):**
$$
\alpha = \min\left(1, \; \exp\left(-H(q^*, p^*) + H(\boldsymbol{\theta}^{(t)}, \mathbf{p}^{(t)})\right)\right)
$$
    
2. **Update Chain State ($\boldsymbol{\theta}^{(t+1)}$):**
    
    Roll $u \sim \text{Uniform}(0, 1)$ to update the parameter chain:
    
$$
\boldsymbol{\theta}^{(t+1)} = \begin{cases} q^* & \text{if } u \le \alpha \quad \text{(Accept: proposed state becomes } \boldsymbol{\theta}^{(t+1)}\text{)} \\ \boldsymbol{\theta}^{(t)} & \text{if } u > \alpha \quad \text{(Reject: stay put, so } \boldsymbol{\theta}^{(t+1)} = \boldsymbol{\theta}^{(t)}\text{)} \end{cases}
$$
    
3. **Discard Momentum:** Throw away $p^*$ and record $\boldsymbol{\theta}^{(t+1)}$ into your MCMC sample history.
    
4. **Convergence:** Early iterations are discarded as warm-up/burn-in. As the chain continues, the collected samples converge to match the **True Posterior Distribution $P(\boldsymbol{\theta} \mid X)$**.
    

## Additional Insights

### Concrete Example: A Frictionless Puck in a Bowl

Imagine trying to map out a valley obscured by fog:

- **Random Walk:** You take a step in a completely random direction. Most steps land on steep cliff walls or go off balance, so you reject the move and stand still.
    
- **Hamiltonian Monte Carlo:** You place a heavy marble at your current location and flick it with a random speed and direction (momentum $p$). The marble smoothly rolls down into the valley floor, builds up speed, glides up the opposite slope, and settles at a distant point. You record where the marble lands as your next sample and flick it again in a new direction.
    

### Direct Comparison: Random-Walk Metropolis-Hastings vs. HMC

|**Feature**|**Random-Walk Metropolis-Hastings**|**Hamiltonian Monte Carlo (HMC)**|
|---|---|---|
|**Proposal Mechanism**|Random isotropic jumps ($q^* \sim \mathcal{N}(q_t, \sigma^2 I)$).|Guided physical trajectory using gradients ($\nabla U(q)$).|
|**Scaling in High Dimensions**|**Poor:** Distance per step scales as $\mathcal{O}(D^{-1/2})$, causing severe random-walk behavior.|**Excellent:** Distance per step scales as $\mathcal{O}(D^{-1/4})$, traversing long distances effectively.|
|**Requirement**|Only requires evaluating point likelihoods $p^*(q)$.|Requires evaluating point likelihoods **and gradients** $\nabla U(q)$.|

### Major Limitations

1. **Requires Differentiable Parameter Spaces:** HMC relies entirely on gradients ($\nabla U(q)$) to simulate physical forces. It **cannot be used on discrete parameters** (such as integer choices, categorical flags, or binary indicators) without marginalizing them out first.
    
2. **Sensitivity to Hyperparameters ($\epsilon$ and $L$):** If the step size $\epsilon$ is too large, the leapfrog integration becomes unstable and proposals explode. If the trajectory length $L$ is too long, the trajectory can loop back on itself (U-turn), wasting compute.
    
    > **Modern Solution:** Modern probabilistic programming frameworks (like Stan or PyMC) use the **[[No-U-Turn Sampler]]**, an extension of HMC that automatically tunes $\epsilon$ and $L$ on the fly during training.