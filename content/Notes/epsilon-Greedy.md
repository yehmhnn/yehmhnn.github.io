---
title: epsilon-Greedy
created: 2026-05-26 19:57
tags file:
  - "[[Reinforcement Learning]]"
---
### How It Works

Instead of altering how the episode _starts_, $\epsilon$-greedy modifies how the agent behaves _throughout_ the entire episode. It is an **on-policy** method where the policy is forced to remain stochastic ($\epsilon$-soft), meaning there is always a small probability of trying every action.

Given a parameter $\epsilon \in (0, 1]$:

- **With probability $1 - \epsilon$:** The agent exploits its knowledge and selects the greedy action.
    
- **With probability $\epsilon$:** The agent explores by selecting an action uniformly at random from _all_ available actions (including the greedy one).
    

Mathematically, the probability of selecting any action $a$ in state $s$ is:

$$\pi(a \mid s) = \begin{cases}

1 - \epsilon + \frac{\epsilon}{|\mathcal{A}(s)|} & \text{if } a \text{ is the greedy action} \

\frac{\epsilon}{|\mathcal{A}(s)|} & \text{if } a \text{ is a non-greedy action}

\end{cases}$$

Where $|\mathcal{A}(s)|$ is the total number of actions available in state $s$.

### When to Use It

- **Online/Real-World Learning:** When the agent must learn from natural trajectories without anyone overriding its initialization state.
    
- **Complex Simulations:** When the state space is too vast to realistically pick and track every single starting pair.
