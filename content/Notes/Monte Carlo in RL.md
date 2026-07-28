---
title: Monte Carlo Methods
created: 2026-05-21 11:37
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

Monte Carlo (MC) methods in reinforcement learning learn the value of states and actions by averaging the actual, real-world returns observed across multiple completed random trials, rather than computing exact mathematical probabilities.

## Why It Is Important (Why)

It provides a **model-free** (see: [[Model-Free vs. Model-Based RL]]) way to learn optimal behavior purely from experience or simulation, meaning the agent doesn't need to know the complex physics or rules of the environment beforehand—solving the core limitation of methods like [[Dynamic Programming]] that require a perfect environment model.

## How It Works (How)

### Phase 1: Collecting Trajectories (Model-Free Learning)

As Sutton and Barto note, _"here we do not assume complete knowledge of the environment."_ Instead of relying on the environment's transition probabilities and rewards—mathematically represented as $p(s', r \mid s, a)$—the agent simply interacts with the environment to collect real sequences of states, actions, and rewards.

### Phase 2: Processing Complete Episodes (No Bootstrapping)

Unlike methods that update guesses based on other guesses, Monte Carlo methods do not bootstrap. The agent waits until the absolute end of an episode to collect the factual, final target return $G_t$. This makes the estimates completely unbiased, though highly subject to variance due to the randomness of long sequences. The target return is calculated as:

$$G_t = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}$$

- $G_t$: The actual total accumulated return from time step $t$ until the end of the episode.
    
- $R_{t+k+1}$: The individual reward received at each subsequent future step.
    
- $\gamma$: The discount factor ($0 \le \gamma \le 1$) that determines how much future rewards are worth to the agent right now.
    

### Phase 3: Tracking Visits (First-Visit vs. Every-Visit Prediction)

To estimate the value of a specific state $s$, the agent logs all episodes passing through it and averages the resulting returns. This tracking happens in one of two operational variations:

- **First-Visit MC:** The agent only counts the return $G_{t_1}$ following the absolute first time the state $s$ was encountered during that episode.
    
- **Every-Visit MC:** The agent averages the returns $G_{t_1}, G_{t_2}, \dots, G_{t_m}$ from _every single time_ the state $s$ was visited throughout the episode.

First-visit and every-visit MC estimates coincide if and only if every state is visited at most once per episode.

**Unbiasedness vs. Consistency**

- **First-Visit MC** yields returns that are independent and identically distributed (i.i.d.) across successive episodes due to the Markov property. By applying the **[[Strong Law of Large Numbers]] (SLLN)**, the sample average is guaranteed to converge almost surely to the true value function ($V_n(s) \xrightarrow{a.s.} v_\pi(s)$ as $n \to \infty$), proving it is an **unbiased estimator**.
    
- **Every-Visit MC** is **biased** for finite samples because multiple returns within the _same_ episode share the same trajectory tail, making them highly correlated. However, it remains **consistent** because cross-episode independence dominates as the number of episodes grows, eventually converging asymptotically to $v_\pi(s)$.
    

### Phase 4: The Incremental Update Rule

Rather than storing a massive list of every return ever observed, the value function $V(S_t)$ is updated incrementally after each episode ends using this rule:

$$V(S_t) \leftarrow V(S_t) + \alpha [G_t - V(S_t)]$$

- $V(S_t)$: The current estimated value of the state.
    
- $[G_t - V(S_t)]$: The error or difference between the actual return achieved ($G_t$) and what the agent expected to get ($V(S_t)$).
    
- $\alpha$: A constant step-size parameter that determines how much weight the agent gives to this new experience compared to its past memory.
    

### Phase 5: Action-Value Estimation and Policy Control

To find the optimal policy without a model, the agent must estimate action-values ($q$) rather than state-values ($v$). If it only knows state-values, it won't know which action actually leads to the best state. To keep learning effectively from experience, the agent must solve **The Exploration Problem** (avoiding the trap of repeatedly picking the same greedy actions) using one of two strategies:

- **[[Exploring Starts]]:** An idealized assumption where every single state-action pair has a non-zero probability of being selected as the absolute beginning step of an episode.
    
- **[[epsilon-Greedy]]:** A realistic approach where the agent chooses its best-known action most of the time (with a probability of $1-\epsilon$) but reserves a small probability ($\epsilon$) to select a completely random action instead.
    

## Additional Insights

### A Direct Comparison: Monte Carlo vs. [[Dynamic Programming]] (DP)

- **Dynamic Programming:** Requires a perfect model of the environment ($p(s', r \mid s, a)$) and calculates value functions by _bootstrapping_ (updating its estimates based on other, pre-existing estimates).
    
- **Monte Carlo:** Completely model-free, requiring zero prior knowledge of the environment's physics. It bypasses bootstrapping entirely by updating its value functions strictly based on _factual experience_ collected at the end of an episode.
    

### A Major Limitation: The Bias/Variance Trade-off

While Monte Carlo estimates are entirely **unbiased** because they rely on actual, realized returns rather than guesses, they suffer from **high variance**. Because a single episode can involve long sequences of random choices and environmental hazards, the final return $G_t$ can vary wildly from one trial to the next. Consequently, MC requires a massive amount of data to average out this noise and converge on accurate value estimates. Furthermore, because it requires an episode to terminate to get $G_t$, it cannot be used for continuous, unending tasks.