---
title: Goals and Rewards
created: 2026-05-26 14:53
tags file:
  - "[[Reinforcement Learning]]"
---
## Core Concept

In reinforcement learning, the target or objective of the agent is formalized using a scalar signal called the **reward**, passed from the environment to the agent at each time step $t$ as $R_t \in \mathbb{R}$. The agent's singular goal is to maximize the total amount of reward it receives over the long run.

> ### The Reward Hypothesis
> 
> "That all of what we mean by goals and purposes can be well symbolized as the maximization of the expected value of the cumulative sum of a received scalar signal (called reward)."
> 
> — _Sutton & Barto_

## Key Principles

### 1. The "What" vs. "How" Rule

The reward signal is a communication channel used to tell the agent **what** you want it to achieve, not **how** you want it achieved.

- If you reward the agent for sub-goals (e.g., holding a chess piece), it may learn to optimize for that sub-goal without ever achieving the real objective (e.g., winning the game).
    
- **Rule of Thumb:** Design rewards based on the ultimate objective, allowing the agent the freedom to discover creative pathways to reach it.
    

### 2. Origin of the Signal

The reward function is situated entirely **outside the agent**. While the agent may have internal interpretations of performance, the definitive evaluation metric is dictated by the environment's dynamics to prevent the agent from cheating by simply altering its own internal reward definitions.

## 🔗 Connections

- **[[Returns and Episodes]]:** Translates individual scalar rewards into long-term cumulative targets.
    
- **[[Value Functions]]:** Used by the agent to predict future expected reward streams from specific states.
