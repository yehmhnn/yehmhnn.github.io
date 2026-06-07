---
title: "Monte Carlo"
created: "2026-06-03 11:38"
tags file:
---
- **Definition:** Algorithms that rely on repeated random sampling to obtain numerical results.
    
- **When to use:** When the underlying system is too complex, high-dimensional, or unknown to solve analytically.
    
- **Core Mechanism:** 
	
	1. Define a domain of possible inputs.
    
    2. Generate inputs randomly from a probability distribution.
    
    3. Perform a deterministic computation on the inputs.
    
    4. Aggregate the results (usually via the mean).
    
- **Famous Applications:**

	- _Mathematics:_ 
		- Approximating $\pi$ or solving complex integrals by throwing random data points at a mathematical space.
    
	- _Deep Learning (Uncertainty):_ 
		- [[Monte Carlo Dropout]] (sampling random network architectures at test-time to get a distribution of predictions).
	    
	- _Reinforcement Learning (Value Estimation):_ 
		- [[Monte Carlo in RL]] (sampling entire environmental trajectories to estimate state values without a model).
	    
	- _Artificial Intelligence (Decision Making):_ 
		- [[Monte Carlo Tree Search (MCTS)]] (sampling random game playouts to navigate massive decision trees, famously used by AlphaGo).
    
