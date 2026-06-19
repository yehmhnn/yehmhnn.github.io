---
title: Q-Learning
created: 2026-05-28 12:25
tags file:
  - "[[Reinforcement Learning]]"
---
**Definition:** An [[off-policy]] TD control algorithm that learns the value of the optimal greedy policy regardless of the exploratory actions taken by the behavior policy.

- **Mechanism:** 
	- The target policy is always greedy ($max_a Q(S_{t+1}, a)$), even if the behavior policy is stochastic (e.g., $\epsilon$-greedy).
    
- **Update Rule:** 
$$
Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha [R_{t+1} + \gamma \max_a Q(S_{t+1}, a) - Q(S_t, A_t)]
$$
    
- **Key Trait:** 
	- It learns the optimal path directly, but because it evaluates the greedy target, it may suffer from "maximization bias" and can show poor online performance if the behavior policy falls into dangerous regions.

- **Convergence:** 
	- Converges to the absolute optimal action-value function $q^*$ with probability 1, provided all state-action pairs are visited infinitely often.