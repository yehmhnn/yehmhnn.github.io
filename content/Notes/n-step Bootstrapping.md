---
title: n-step Bootstrapping
created: 2026-06-17 18:31
tags file:
  - "[[Reinforcement Learning]]"
---
**Definition:** A generalization that bridges the gap between one-step [[Temporal-Difference Learning]] (which bootstraps) and [[Monte Carlo in RL]] (which does not) by looking $n$ steps into the future.

- **The Spectrum:**
	- If $n=1$, it is **TD(0)**.
    - If $n \to \infty$, it is **Monte Carlo**.
        
- **Mechanism:** The target return becomes 
$$
G_{t:t+n} \doteq R_{t+1} + \gamma R_{t+2} + \dots + \gamma^{n-1} R_{t+n} + \gamma^n V(S_{t+n})
$$
    
- **Why it's useful:** 
	- It provides a tunable trade-off; larger $n$ reduces bias (like Monte Carlo) but increases variance, while smaller $n$ reduces variance but may introduce bias from the initial value estimates.