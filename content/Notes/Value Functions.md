---
title: "Value Functions"
created: "2026-05-11 14:24"
tags file:
  - "[[Reinforcement Learning]]"
---
## Core Definition

Value functions are functions of states (or state-action pairs) that estimate how "good" it is for the agent to be in a given situation. This "goodness" is strictly defined in terms of the **expected return**—the total accumulated future reward an agent can expect to receive starting from that moment.

## The Two Flavors of Value Functions (Different Usages)

Because an agent needs to both evaluate its current strategy and decide how to change its behavior, value functions are split into two distinct types tailored for different operational roles:

### 1. State-Value Function ($v_\pi$) — _The Evaluator_

- **Core Question:** "How good is my current situation overall?"
    
- **Mathematical Definition:** The value of a state $s$ under a policy $\pi$, denoted as $v_\pi(s)$, is the expected return when starting in $s$ and following $\pi$ thereafter:
    
    $$v_\pi(s) \doteq \mathbb{E}_\pi [G_t \mid S_t = s] = \mathbb{E}_\pi \left[ \sum_{k=0}^{\infty} \gamma^k R_{t+k+1} \mid S_t = s \right]$$
    
- **Key Insight:** It averages over all possible future trajectories allowed by the policy $\pi$ and the environment's random dynamics.
    
- **Primary Usages:** 
	
	* **Policy Evaluation:** Used to score the overall success or safety of a specific policy without focusing on individual immediate actions.
    
    - **Model-Based RL:** If you possess a transition model of the environment, knowing $v(s)$ for future states allows you to look ahead and calculate the best path.
        
    - **Value Iteration:** Algorithms track just $v(s)$ across iterations to drastically save memory and computing power, skipping the need to track values for every single action profile.
        

### 2. Action-Value Function ($q_\pi$) — _The Decision Maker_

- **Core Question:** "What is the exact value of making this specific move right now?"
    
- **Mathematical Definition:** The value of taking action $a$ in state $s$ under a policy $\pi$, denoted as $q_\pi(s, a)$, is the expected return starting from $s$, forcing action $a$ at the current step, and following policy $\pi$ exclusively thereafter:
    
    $$q_\pi(s, a) \doteq \mathbb{E}_\pi [G_t \mid S_t = s, A_t = a] = \mathbb{E}_\pi \left[ \sum_{k=0}^{\infty} \gamma^k R_{t+k+1} \mid S_t = s, A_t = a \right]$$
    
- **Primary Usages:**
    
    - **Policy Improvement:** To upgrade a policy, you compute $q(s, a)$ for all available actions and greedily switch to the highest-rated action.
        
    - **Model-Free Learning (No Environment Map):** If the agent does not know the environment's transition probabilities (e.g., Q-learning or SARSA), it _must_ use $q(s, a)$. Without a model, knowing $v(s')$ of a future state is useless because the agent doesn't know which action actually leads there. Storing $q(s, a)$ informs the agent exactly which action to execute directly from its current position.
        

> **Notation Breakdown:** Capital letters ($S_t, A_t, R_{t+1}$) represent abstract random variables (the placeholders for whatever state, action, and reward happen at time $t$). Lowercase letters ($s, a$) represent the specific, concrete values you plug into the function. The condition reads: _"The expected return given that the random state variable happens to equal the specific state $s$."_

## Technical Insight: When Does the Expectation Symbol ($\mathbb{E}$) Disappear?

In textbooks, the expectation symbol ($\mathbb{E}$) is mandatory because environments and policies are generally stochastic (probabilistic). However, the expectation mathematically collapses into a direct calculation when you have total certainty:

1. **Deterministic Policy:** The policy chooses a specific action with 100% certainty (e.g., $\pi_0(a \mid s_1) = 1$).
    
2. **Deterministic Dynamics:** The environment guarantees exactly one next state $s'$ and one specific reward $r$ for that action.
    

When there are no random branching paths, the probability of that single outcome is $1$. Because the expected value of a guaranteed constant is just the constant itself, the complex Bellman expectation equation simplifies from a weighted average into a single linear calculation:

$$v_\pi(s) = R(s, \pi(s)) + \gamma v_\pi(s')$$

## Optimal Value Functions

The ultimate goal of Reinforcement Learning is to locate a policy that achieves the maximum possible reward over time, yielding the optimal value functions:

- **Optimal State-Value Function:** The maximum state-value achievable by any policy:
    
    $$v_*(s) \doteq \max_\pi v_\pi(s) \quad \forall s \in \mathcal{S}$$
    
- **Optimal Action-Value Function:** The maximum action-value achievable by any policy:
    
    $$q_*(s, a) \doteq \max_\pi q_\pi(s, a) \quad \forall s \in \mathcal{S}, a \in \mathcal{A}(s)$$
    

If you successfully solve or estimate $q_*(s, a)$, finding the optimal policy $\pi_*$ is trivial—you simply extract it greedily by choosing the action that maximizes the function:

$$\pi_*(s) = \arg\max_a q_*(s, a)$$

## The Symbiotic Interplay: Policy Iteration

Value functions are updated recursively via Bellman equations. In **Policy Iteration**, the state-value function and action-value function work together in a continuous, converging feedback loop:

1. **Policy Evaluation:** You solve the Bellman expectation equations to calculate $v_\pi(s)$ for your current policy $\pi$.
    
2. **Policy Improvement:** You use those $v_\pi(s)$ values to look ahead and calculate the action-values $q_\pi(s, a)$ for all alternative moves. You then update your policy to choose the action that maximizes $q_\pi(s, a)$.
    

This loop is mathematically protected by the **[[Policy Improvement Theorem]]**, which guarantees that if you can find an action where $q_\pi(s, a) \ge v_\pi(s)$, updating the policy to choose that action ensures the overall value function will strictly improve or remain optimal. When policy improvement no longer changes the choices ($\pi' = \pi$), the system satisfies the Bellman optimality equation, confirming that $v_\pi = v^*$.