---
title: "Dynamic Programming"
created: "2026-05-07 12:45"
tags file:
  - "[[Reinforcement Learning]]"
---
In Reinforcement Learning (RL), **Policy Iteration** and **Value Iteration** are the two fundamental Dynamic Programming algorithms used to solve Markov Decision Processes (MDPs) when the model of the environment is fully known.

The primary difference lies in how they reach the optimal policy: 
- Policy Iteration manipulates the policy directly and evaluates it
- Value Iteration focuses on finding the optimal value function first and derives the policy only at the end.

---

## 1. Policy Iteration

Policy Iteration is an iterative process that alternates between two distinct phases: **Policy Evaluation** and **Policy Improvement**.

### The Two-Step Cycle

1. **Policy Evaluation:** Given a policy $\pi$, calculate the state-value function $V^\pi$ by solving the Bellman equation until convergence:
    
    $$V^\pi(s) = \sum_{a} \pi(a|s) \sum_{s', r} p(s', r | s, a) [r + \gamma V^\pi(s')] \quad \forall s \in \mathcal{S}$$
    
2. **Policy Improvement:** Update the policy by being "greedy" with respect to the current value function:
    
    $$\pi'(s) = \arg\max_{a} \sum_{s', r} p(s', r | s, a) [r + \gamma V^\pi(s')]$$
    

This cycle repeats until the policy $\pi$ no longer changes, signaling that the optimal policy $\pi^*$ has been found.

---

## 2. Value Iteration

Value Iteration simplifies the process by combining the evaluation and improvement steps into a single update rule based on the **Bellman Optimality Equation**. It does not keep track of a specific policy during the iterations.

### The Single-Step Update

Instead of waiting for the value function to converge for a specific policy, Value Iteration updates the value of each state by taking the maximum possible value over all actions in every iteration:

$$V_{k+1}(s) = \max_{a} \sum_{s', r} p(s', r | s, a) [r + \gamma V_k(s')] \quad \forall s \in \mathcal{S}$$

Once the value function $V$ converges to the optimal $V^*$, the optimal policy $\pi^*$ is extracted in a final, single step using the same "greedy" logic used in policy improvement.

---

## 3. Key Differences at a Glance

|**Feature**|**Policy Iteration**|**Value Iteration**|
|---|---|---|
|**Core Mechanism**|Evaluates a specific policy, then improves it.|Directly seeks the optimal value function.|
|**Computational Cost**|High per iteration (requires solving a system of equations or inner loops).|Low per iteration (simple max over actions).|
|**Convergence Rate**|Usually converges in fewer **iterations**.|Usually requires more **iterations** to converge.|
|**Policy Visibility**|You have a valid (improving) policy at every step.|You only get a stable policy at the very end.|
|**Termination**|Stops when the policy is stable (stops changing).|Stops when the value function change is below a threshold $\epsilon$.|

---

## Which one should you use?

- **Use Policy Iteration** if the action space is small or if you want to find the optimal policy in as few "outer" steps as possible. It is often faster when the state space is small enough that solving the linear system for evaluation is feasible.
    
- **Use Value Iteration** if the state space is large. Since it avoids the full evaluation step, it is generally more computationally efficient per iteration. In many practical scenarios, Value Iteration is the preferred choice because the "max" operator naturally drives the values toward the optimum faster than full policy evaluation.


