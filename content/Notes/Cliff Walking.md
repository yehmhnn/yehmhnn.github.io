---
title: "Cliff Walking"
created: "2026-06-17 17:58"
tags file:
---
The **Cliff Walking** task is a classic gridworld environment used to illustrate the critical difference between [[on-policy]] and [[off-policy]] learning.

### The Setup

- **Environment:** 
	- A grid where the agent starts at `S` (bottom-left) and must reach `G` (bottom-right).
    
- **The Cliff:** 
	- The bottom row between `S` and `G` is a "cliff". Stepping into the cliff results in a massive penalty of **-100** and immediately resets the agent back to `S`.
    
- **Standard Reward:** 
	- Every other move in the grid incurs a small penalty of **-1**.
    
![[Pasted image 20260617175906.png|529]]

### The Behavioral Difference

Even though both [[SARSA]] and [[Q-learning]] are tasked with the same goal, they behave very differently because of their underlying policies.

#### 1. SARSA (On-Policy): The "Cautious" Path

- **Evaluation:** 
	- SARSA learns the value of the policy it is _actually executing_, including its exploratory moves (the random $\epsilon$-greedy actions).
    
- **Behavior:** 
	- Because SARSA knows that it occasionally makes random moves, it recognizes that walking right along the edge of the cliff is dangerous—one bad "random" move and it falls.
    
- **Result:** 
	- It learns to take a **safer detour** further away from the cliff, sacrificing efficiency for a lower risk of hitting the -100 penalty.
    

#### 2. Q-Learning (Off-Policy): The "Optimal" Path

- **Evaluation:** 
	- Q-learning learns the value of the _optimal greedy policy_, assuming it will never make a random move in the future, regardless of how it is currently behaving.
    
- **Behavior:** 
	- It correctly identifies that the path right along the edge of the cliff is the mathematically shortest and most efficient route.
    
- **Result:** 
	- It learns to walk right along the edge. However, because the agent is still using an exploratory ($\epsilon$-greedy) policy during training, it frequently falls off the cliff while practicing, resulting in poor online performance during the learning process.
    

![[Pasted image 20260617180005.png|560]]

> [!QUOTE] Why is Q-learning lower?
> 
> this plot measures online performance during training, not the final quality of the learned policy after training is finished.
> 
> - **Q-learning is "Optimistic but Reckless":** 
> 	- Learns the optimal path along the cliff edge but remains "reckless".
> 	- Because it still uses $\epsilon$-greedy exploration during training, those random moves frequently cause it to fall off, incurring the -100 penalty and lowering its average reward.
> 	
> - **SARSA is "Cautious and Aware":** 
> 	- Learns the value of its _actual_ exploratory behavior. 
> 	- It "knows" it makes random moves, so it learns a safer detour away from the cliff to avoid penalties.


### Key Lesson

This example highlights the **on-policy/off-policy distinction**:

- **On-policy methods** evaluate what they _actually do_, leading to safer behavior that accounts for exploration risks.
    
- **Off-policy methods** evaluate what they _would do_ if they were perfectly greedy, leading to mathematically optimal paths that might be dangerous to attempt during the learning phase.
    