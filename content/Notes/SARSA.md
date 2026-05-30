---
title: SARSA
created: 2026-05-28 12:19
tags file:
  - "[[Reinforcement Learning]]"
---
Sarsa maps trajectories by tracking alternating sequences of state-action pairs: $S_t, A_t, R_{t+1}, S_{t+1}, A_{t+1}$. It evaluates the value of the active behavioral policy it is currently executing.

- **Mathematical Update:**
$$
Q(S_{t},A_{t}) \leftarrow Q(S_{t},A_{t}) + \alpha \left[ R_{t+1} + \gamma Q(S_{t+1},A_{t+1}) - Q(S_{t},A_{t}) \right]
$$
    
- **Convergence:** 
	- Guaranteed to reach the optimal policy and action-value functions if the policy qualifies as **GLIE** (Greedy in the Limit with Infinite Exploration—such as [[epsilon-Greedy]] where $\epsilon_t = \frac{1}{t}$)