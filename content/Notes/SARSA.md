---
title: SARSA
created: 2026-05-28 12:19
tags file:
  - "[[Reinforcement Learning]]"
---
**Definition:** An [[on-policy]] TD control algorithm that updates the action-value function based on the current policy being followed, including its exploratory moves.

- **Mechanism:** 
	- It uses the quintuple $(S_t, A_t, R_{t+1}, S_{t+1}, A_{t+1})$, where $A_{t+1}$ is the next action actually chosen by the agent's current $\epsilon$-greedy policy.
    
- **Update Rule:** 
	- $Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha [R_{t+1} + \gamma Q(S_{t+1}, A_{t+1}) - Q(S_t, A_t)]$.
    
- **Key Trait:** 
	- Because it evaluates the policy _as it is actually performed_, it learns to avoid high-risk states if the exploratory policy occasionally causes accidents (e.g., the [[Cliff Walking]] safe-path behavior).

- **Convergence:** 
	- Guaranteed to reach the optimal policy and action-value functions if the policy qualifies as **GLIE** (Greedy in the Limit with Infinite Exploration—such as [[epsilon-Greedy]] where $\epsilon_t = \frac{1}{t}$)