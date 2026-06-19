---
title: Monte Carlo Methods
created: 2026-05-21 11:37
tags file:
  - "[[Reinforcement Learning]]"
---
## Core Concept

- "Unlike the previous chapter, here we do not assume complete knowledge of the environment." -- S&B

- Instead of computing exact probabilities (like [[Dynamic Programming]]), MC methods estimate values by averaging the actual returns observed across multiple random trials.

## Key Characteristics

### 1. Model-Free Learning

MC methods require no prior knowledge of the environment's physics or probability distributions ($p(s', r \mid s, a)$). They only require simulated or real trajectories of states, actions, and rewards.

### 2. No Bootstrapping

Unlike [[Dynamic Programming]] or [[Temporal-Difference Learning]], Monte Carlo methods do **not** update their value estimates based on other value estimates. They wait until the very end of an episode to collect the actual terminal return $G_t$, meaning updates are purely driven by factual experience.

- **Bias/Variance Trade-off:** 
	- MC estimates are completely **unbiased** (because they don't rely on guesses), but they suffer from **high variance** (because a single episode can be highly subject to random chance and long sequences of choices).
    

## MC Prediction (Estimating $v_\pi$)

To estimate the value of a state $s$, the agent logs all episodes passing through $s$ and averages their resulting returns. There are two primary ways to count visits:

- **First-Visit MC:** 
	- use only the return after the first occurrence of s.
	- $G_{t_1}$
    
- **Every-Visit MC:** 
	- use returns after all occurrences of s.
	- the average of $G_{t_1}$, $G_{t_2}$, ..., $G_{t_m}$
    

### The Incremental Update Rule

Instead of keeping a massive list of all returns, the value function is updated incrementally after each episode:

$$V(S_t) \leftarrow V(S_t) + \alpha [G_t - V(S_t)]$$

Where
- $\alpha$ is a constant step-size parameter
- $G_t$ is the actual target return from time step $t$.
	- $G_t = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}$

## MC Control (Finding Optimal Policies)

To find the optimal policy without a model, we must estimate **action-values ($q$)** rather than state-values ($v$). If an agent only knows $v$, it cannot choose an action because it doesn't know which state each action leads to.

### The Exploration Problem

Because MC learns from experience, it faces a major hurdle: if the current policy is greedy, the agent will select the same actions repeatedly and may never visit alternative states to discover if they are better. S&B propose two solutions:

1. **[[Exploring Starts]]:** 
	- An idealized assumption where every single state-action pair has a non-zero probability of being selected as the absolute beginning step of an episode.
    
2. **[[epsilon-Greedy]]:** 
	- A realistic approach where the agent chooses the best action most of the time (with probability $1-\epsilon$) but reserves a small probability ($\epsilon$) to select a completely random action.
    
