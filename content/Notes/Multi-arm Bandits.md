---
title: "Multi-arm Bandits"
created: "2026-04-27 17:21"
tags file:
  - "[[Reinforcement Learning]]"
---
Here is the updated note with the explicit mathematical proof and unrolling derivation seamlessly integrated into **Phase 2 of "How It Works"**.

## The Definition (What)

A multi-armed bandit is a simplified reinforcement learning framework where an agent chooses actions that yield immediate rewards without altering future states or future choices.

## Why It Is Important (Why)

It isolates the **exploration-exploitation dilemma** from the added complexity of multi-step environment state changes, allowing researchers and engineers to mathematically optimize value estimation and decision-making under uncertainty.

## How It Works (How)

### Phase 1: Action-Value Estimation (Sample Mean)

To decide which action $a$ to take, an agent maintains an estimated value $Q_n(a)$ for each action based on the rewards $R_i$ received across past pulls. In a stationary environment, the true value is estimated as the simple arithmetic average of all $n$ observed rewards:

$$Q_{n+1} = \frac{1}{n} \sum_{i=1}^{n} R_i$$

### Phase 2: Incremental Recursive Update Rule & Proof of Equivalence

Instead of storing all historical rewards and re-summing them from scratch, the sample mean is computed incrementally by taking the previous estimate $Q_n$ and adjusting it by a dynamic step size $\alpha_n = \frac{1}{n}$:

$$Q_{n+1} = Q_n + \frac{1}{n} \left[ R_n - Q_n \right]$$

- $Q_n$ is the previous estimate.
    
- $\left[ R_n - Q_n \right]$ is the **error term** (the difference between the actual observed reward $R_n$ and expected reward $Q_n$).
    
- $\frac{1}{n}$ is the dynamic step size, ensuring every past reward carries an identical weight of exactly $\frac{1}{n}$.
    

#### Proof of Equivalence (Derivation & Unrolling)

The sample mean formula and the recursive update rule are **100% mathematically identical**. We can prove this in two ways:

1. **Forward Derivation (Algebraic Expansion):**
    
    $$Q_{n+1} = \frac{1}{n} \sum_{i=1}^{n} R_i = \frac{1}{n} \left( \sum_{i=1}^{n-1} R_i + R_n \right)$$
    
    Since $\sum_{i=1}^{n-1} R_i = (n-1)Q_n$, substitute it back into the equation:
    
    $$Q_{n+1} = \frac{(n-1)Q_n + R_n}{n} = \frac{n Q_n - Q_n + R_n}{n} = Q_n + \frac{1}{n} \left[ R_n - Q_n \right]$$
    
2. **Backward Unrolling:**
    
    Rewriting the recursive rule gives $Q_{n+1} = \left(\frac{n-1}{n}\right)Q_n + \frac{1}{n}R_n$. Substituting $Q_n = \left(\frac{n-2}{n-1}\right)Q_{n-1} + \frac{1}{n-1}R_{n-1}$ causes all intermediate numerators and denominators to cancel out iteratively down to $Q_1$, leaving:
    
    $$Q_{n+1} = \left(\frac{0}{n}\right)Q_1 + \frac{1}{n}R_1 + \frac{1}{n}R_2 + \dots + \frac{1}{n}R_n = \frac{1}{n}\sum_{i=1}^{n} R_i$$
    

> **Initial Value Wipeout:** At $n=1$, the step size $\frac{1}{1} = 1$, making the retention factor $(1 - \alpha_1) = 0$. This completely eliminates the arbitrary initial guess $Q_1$ after the very first observation.

### Phase 3: Non-Stationary Environments (Constant Step Size $\alpha$)

In environments where true rewards drift over time, an unweighted sample average fails because a step size of $\frac{1}{n}$ eventually shrinks to zero, causing the agent to freeze and stop learning. To track changing targets, we replace $\frac{1}{n}$ with a constant step size $\alpha \in (0, 1]$:

$$Q_{n+1} = Q_n + \alpha \left[ R_n - Q_n \right]$$

Unrolling this constant-$\alpha$ update yields an exponential recency-weighted average:

$$
Q_{n+1} = \underbrace{(1-\alpha)^{n}Q_{1}}_{\text{Initial Bias}} + \underbrace{\sum_{i=1}^{n}\alpha(1-\alpha)^{n-i}R_{i}}_{\text{Weighted Rewards}}
$$

- $(1-\alpha)^n Q_1$: Represents the initial bias, which exponentially decays as $n$ grows.
    
- $\alpha (1-\alpha)^{n-i} R_i$: Assigns higher weight to recent rewards ($i \approx n$) while exponentially discounting older rewards, allowing the agent to "forget" outdated data.
    

### Phase 4: Action Selection Algorithms

Given the estimated action values $Q(a)$, the agent selects actions using one of several policies:

- **$\epsilon$-Greedy:** Explores uniformly at random across all arms with probability $\epsilon$, and exploits the current best arm with probability $1 - \epsilon$.
    
- **Optimistic Initial Values:** Sets $Q_1(a)$ to an artificially high starting value, forcing early exploration as actual rewards disappoint its initial optimism.
    
- **Upper Confidence Bound (UCB):** Directs exploration by adding an uncertainty bonus based on how rarely an action has been tested:
    
    $$a_t = \arg\max_{a} \left[ Q_t(a) + c \sqrt{\frac{\ln t}{N_t(a)}} \right]$$
    
- **Gradient Bandit:** Learns numerical action preferences $H_t(a)$ rather than reward values directly, selecting actions via a softmax probability distribution.
    

## Additional Insights

### A Direct Comparison: Bandit View vs. Full Reinforcement Learning (The Restaurant Analogy)

|**Scenario**|**Bandit View (Stateless)**|**Full RL View (Stateful / Sequential)**|
|---|---|---|
|**Concept**|Actions yield immediate rewards but do **not** change the state of the environment for future steps.|Actions yield immediate rewards **and** transition the environment into new future states.|
|**Analogy**|You select 1 of 10 restaurants, eat, and rate it. Tomorrow, the same 10 restaurants are available with identical menus regardless of what you picked today.|You choose a heavy 5-course dinner (**Action**). This makes you too full to eat tomorrow (**Future State**) or earns you loyalty points for a discount next week (**Future Reward**).|

### A Direct Comparison: Sample-Mean ($\alpha_n = \frac{1}{n}$) vs. Constant Step Size ($\alpha$)

|**Property**|**Sample-Mean Rule (αn​=n1​)**|**Constant-α Rule (α∈(0,1])**|
|---|---|---|
|**Ideal Environment**|**Stationary:** A slot machine programmed to pay out a fixed 5% average forever.|**Non-Stationary:** A slot machine whose payout odds are slowly adjusted by the casino every hour.|
|**Weighting Scheme**|Equal weighting ($\frac{1}{n}$) across all past rewards.|Exponential decay; heavily weights recent data over ancient data.|
|**Initial Bias ($Q_1$)**|Completely wiped out on the very first step ($n=1$).|Lingers as $(1-\alpha)^n Q_1$, slowly vanishing as $n \to \infty$.|
|**Production Use**|Rarely used in deep RL because shrinking step sizes cause learning stagnation.|Standard choice in production RL; ensures the agent remains awake and responsive to moving targets.|