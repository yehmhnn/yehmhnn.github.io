---
title: on-policy
created: 2026-06-17 17:45
tags file:
  - "[[Reinforcement Learning]]"
---
###  The Core Concept

While [[off-policy]] learning splits acting and learning into two separate paths, **on-policy learning** keeps them perfectly aligned.

- **Behavior Policy ($\pi_{\text{behavior}}$):** The policy the agent uses to interact with the environment and gather data.
    
- **Target Policy ($\pi_{\text{target}}$):** The policy the agent is trying to evaluate and improve.
    

> **The Golden Rule of On-Policy:**
> $$\pi_{\text{target}} = \pi_{\text{behavior}}$$
> The agent evaluates and improves the exact same policy it is actively using to make decisions. It learns entirely from its own current, live experience.

### The On-Policy Approach: "Learning by Doing"

On-policy methods evaluate the reality of the agent's current strategy, quirks, mistakes, and all:

- **How it works:** If the agent is using an $\epsilon$-greedy policy to explore the world, it doesn't pretend it's perfect. It calculates the value of that _specific_ exploratory policy. Every time the agent takes a random, clumsy action to explore, the learning process factors that exact action into its value updates.
    
- **Typical Example:** **[[SARSA]]** (State-Action-Reward-State-Action). SARSA updates its action-value function based on the actual next action chosen by its current exploratory policy, rather than assuming it will always make the perfect choice.
    

**Key Trade-off:** On-policy methods are inherently **safer** during the training phase. Because they account for the agent's real, exploratory behavior, they steer the agent away from danger zones where a single random exploration step could cause a catastrophe.

> _Example ([[Cliff Walking]]):_ Unlike Q-learning (which walks the risky edge assuming perfect future play), an on-policy agent like SARSA realizes, _"Hey, I occasionally take random actions. If I walk right along the edge, a random step will throw me off the cliff."_ As a result, it learns a safer, more conservative path further away from the edge.

### 📊 Feature Breakdown

|**Feature**|**On-Policy (e.g., SARSA)**|**Off-Policy (e.g., Q-Learning)**|
|---|---|---|
|**What is evaluated?**|The policy currently being used ($\pi_{\text{behavior}}$)|The optimal greedy policy ($\pi_{\text{target}}$)|
|**Exploration Factor**|Included directly in the evaluation|Separated completely from the evaluation|
|**Primary Advantage**|**Safer.** Accounts for realistic, imperfect behavior.|**Optimizing.** Learns the absolute optimal target directly.|

### 📉 Mathematical Breakdown

#### 1. SARSA (On-Policy Update)

$$Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha \left[ R_{t+1} + \gamma Q(S_{t+1}, A_{t+1}) - Q(S_t, A_t) \right]$$

- **Why it's On-Policy:** Notice the term $Q(S_{t+1}, A_{t+1})$. The action $A_{t+1}$ is not a hypothetical best action; it is the **actual action** chosen by the agent's exploratory behavior policy for the next state. The target expectation perfectly matches the behavior policy:
    
    $$\mathbb{E}_{a \sim \pi_{\text{behavior}}} [Q(S_{t+1}, a)] = Q(S_{t+1}, A_{t+1})$$
    

#### 2. Q-Learning (Off-Policy Contrast)

$$Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha \left[ R_{t+1} + \gamma \max_{a} Q(S_{t+1}, a) - Q(S_t, A_t) \right]$$

- **Why it contrasts:** Q-learning swaps out the actual next action $A_{t+1}$ for a $\max_{a}$ operator. By doing so, it drops the behavior policy entirely during the update step and instead evaluates a hypothetical, 100% optimal target policy.