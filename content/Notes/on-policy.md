---
title: on-policy
created: 2026-06-17 17:45
tags file:
  - "[[Reinforcement Learning]]"
---
In reinforcement learning, the distinction between **on-policy** and **[[off-policy]]** methods comes down to **which policy the agent is evaluating and improving** versus **which policy it is actually using to move through the environment**.

### On-Policy Learning: "Learning from my own experience"

In on-policy methods, the agent learns the value of the policy it is currently using to make decisions.

- **The Concept:** 
	- The "behavior policy" (the one used to pick actions) is the same as the "target policy" (the one being learned/evaluated).
    
- **How it works:** 
	- If the agent is using an $\epsilon$-greedy policy to explore the world, it calculates the value of that specific $\epsilon$-greedy policy. 
	- Every time the agent takes a random exploratory action, the learning process treats that action as part of the policy being evaluated.
    
- **Typical Example:** **[[SARSA]]**
	- SARSA updates its action-value function based on the next action actually taken by the current exploratory policy.
    
- **Key Trade-off:** 
	- On-policy methods are generally "safer" during training because they account for the agent's exploratory mistakes. 
	- If the agent is prone to taking random actions that lead to disaster, the on-policy evaluation will account for that risk.
    


| **Feature**            | **On-Policy (e.g., [[SARSA]])**   | **Off-Policy (e.g., [[Q-Learning]])** |
| ---------------------- | --------------------------------- | ------------------------------------- |
| **What is evaluated?** | The policy being used             | The optimal greedy policy             |
| **Exploration**        | Included in evaluation            | Separate from evaluation              |
| **Primary Advantage**  | Safer; accounts for real behavior | Learns the optimal target directly    |
