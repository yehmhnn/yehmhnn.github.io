---
title: Q-Learning
created: 2026-05-28 12:25
tags file:
  - "[[Reinforcement Learning]]"
---
# Definition

An [[off-policy]] [[Temporal-Difference Learning]] control algorithm that finds the optimal action-selection policy regardless of the exploratory actions taken by the agent.

> **What does "Q" mean?** 
> "Q" stands for **Quality**. It represents the long-term utility or expected cumulative reward of taking a specific action in a given state.

The **Q-function**, $Q(s, a)$, maps a state-action pair to a numerical value:

- **$s$ (State):** The current situation or position of the agent.
    
- **$a$ (Action):** The specific move the agent is evaluating.
    
- _Note: A higher Q-value indicates a better, higher-quality choice._
    

# Core Mechanism

Q-learning separates the policy used to _act_ from the policy used to _learn_:

- **Behavior Policy:** Used to interact with the environment and explore (typically stochastic, such as an $\epsilon$-greedy policy).
    
- **Target Policy:** The policy being learned and evaluated, which is always strictly **greedy** ($\max_{a} Q(S_{t+1}, a)$).
    

# The Q-Learning Update Rule

At each time step, the agent updates its estimation of the Q-value using the following formulation:

$$Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha \left[ R_{t+1} + \gamma \max_{a} Q(S_{t+1}, a) - Q(S_t, A_t) \right]$$

**Where:**

- $\alpha$ (Alpha) is the **learning rate**, determining how much new information overrides old information.
    
- $\gamma$ (Gamma) is the **discount factor**, balancing immediate rewards versus long-term rewards.
    
- $R_{t+1}$ is the **immediate reward** received after executing action $A_t$ in state $S_t$.
    
- $\max_{a} Q(S_{t+1}, a)$ is the maximum predicted reward possible for the next state.
    

# Key Traits & Limitations

- **Direct Optimization:** It learns the optimal path directly by evaluating the best possible future moves, rather than the moves the behavior policy actually takes.
    
- **Maximization Bias:** Because the update rule relies on a maximum ($\max_a$), the algorithm can significantly overestimate action values in noisy or stochastic environments.
    
- **Online Performance Risk:** Since it assumes a greedy target policy during updates, it can show poor online performance if an aggressive exploratory behavior policy accidentally steers the agent into dangerous regions of the state space.
    

### Convergence Properties

Q-learning is mathematically proven to converge to the absolute optimal action-value function ($q^*$) with a probability of 1, provided that:

1. All state-action pairs continue to be visited infinitely often (ensuring sufficient exploration).
    
2. The learning rate $\alpha$ decays appropriately over time according to standard stochastic approximation conditions.