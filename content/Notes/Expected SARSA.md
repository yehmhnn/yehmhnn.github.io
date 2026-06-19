---
title: Expected SARSA
created: 2026-06-17 18:23
tags file:
  - "[[Reinforcement Learning]]"
---
**Definition:** A hybrid TD control algorithm that uses the _expected value_ of all possible next actions under the current policy, rather than sampling just one specific next action.

- **Mechanism:** 
	- Instead of using $Q(S_{t+1}, A_{t+1})$, it uses $\sum_a \pi(a|S_{t+1}) Q(S_{t+1}, a)$.
    
- **Why it's useful:** 
	- By averaging over the next actions, it reduces the variance associated with the random choice of the next action ($A_{t+1}$), leading to more stable learning compared to standard [[SARSA]].