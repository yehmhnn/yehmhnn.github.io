---
title: Q-Learning
created: 2026-05-28 12:25
tags file:
  - "[[Reinforcement Learning]]"
---
Q-learning eliminates the dependency on the next _actual_ action taken ($A_{t+1}$). It learns the value of an ideal, completely greedy target policy, regardless of what exploratory path the behavior policy takes.

- **Mathematical Update:**
$$
Q(S_{t},A_{t}) \leftarrow Q(S_{t},A_{t}) + \alpha \left[ R_{t+1} + \gamma \max_{a} Q(S_{t+1},a) - Q(S_{t},A_{t}) \right]
$$
    
- **Convergence:** 
	- Converges to the absolute optimal action-value function $q^*$ with probability 1, provided all state-action pairs are visited infinitely often.