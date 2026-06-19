---
title: "Reinforcement Learning"
created: "2026-04-16 11:34"
tags file:
---
***

## Foundations

- [[The RL Problem]]: Agent-Environment Interaction
    
- [[Goals and Rewards]]: The Reward Hypothesis
    
- [[Returns and Episodes]]: Discounting and Task Types
    
- [[Markov Decision Processes (MDPs)]]
    
- [[Value Functions]]: State-Value ($v$) and Action-Value ($q$)
    
- [[Bellman Equations]]: The recursive soul of RL
    

---

## Part I: Tabular Solution Methods

_Small state spaces where we can store values in a table._

### 1. Fundamentals

- [[Multi-arm Bandits]]: Exploration vs. Exploitation
    
- [[Dynamic Programming]]: Policy Iteration & Value Iteration
    

### 2. Learning from Experience

- [[Monte Carlo in RL]]: Learning from complete episodes
    
- [[Temporal-Difference Learning]]: The magic of "Bootstrapping"
    
    - [[SARSA]]: [[on-policy]] TD control
	    - [[Expected SARSA]]
        
    - [[Q-Learning]]: [[off-policy]] TD control
	    - [[Double Q-Learning]]
        
- [[n-step Bootstrapping]]: Bridging TD and Monte Carlo
    
| **Method**     | **Target Type**    | **Policy** | **Sensitivity**                |
| -------------- | ------------------ | ---------- | ------------------------------ |
| **SARSA**      | Sample next action | On-policy  | Safer; learns its own mistakes |
| **Exp. SARSA** | Expected value     | On-policy  | Lower variance than SARSA      |
| **Q-Learning** | Max next action    | Off-policy | Optimal; aggressive; biased    |
| **n-Step**     | n-step reward sum  | Varies     | Tunable Bias/Variance          |

| **Feature**            | **On-Policy (e.g., SARSA)**       | **Off-Policy (e.g., Q-Learning)**  |
| ---------------------- | --------------------------------- | ---------------------------------- |
| **What is evaluated?** | The policy being used             | The optimal greedy policy          |
| **Exploration**        | Included in evaluation            | Separate from evaluation           |
| **Primary Advantage**  | Safer; accounts for real behavior | Learns the optimal target directly |
### 3. Planning & Unified View

- [[Dyna-Q]]: Integrating learning, planning, and reacting
    
- [[Prioritized Sweeping]]
    

---

## Part II: Approximate Solution Methods

_Scaling to large/continuous state spaces using Function Approximation._

- [[On-policy Prediction with Approximation]]
    
- [[Linear Function Approximation]]: Tile Coding and Radial Basis Functions
    
- [[Deep Q-Networks (DQN)]]: Neural networks as function approximators
    
- [[Eligibility Traces]]: The $TD(\lambda)$ mechanism
    
- [[Policy Gradient Methods]]:
    
    - [[REINFORCE]]: The Policy Gradient Theorem
        
    - [[Actor-Critic Methods]]: Combining value and policy gradients
        

---

## Part III: Looking Deeper

- [[Psychology & Neuroscience of RL]]: Dopamine as TD-error
    
- [[AlphaGo Case Study]]
    
- [[Exploration Frontiers]]: Curiosity and Intrinsic Motivation
    

---
# Reference
