---
title: "Exploring Starts"
created: "2026-05-26 19:59"
tags file:
---
### How It Works

Under the **Monte Carlo Exploring Starts (ES)** framework, the environment is artificially forced to start each episode at a randomly selected state-action pair, where every possible pair $(s, a) \in \mathcal{S} \times \mathcal{A}$ has a probability greater than zero of being chosen as the absolute first step.

1. **Step 0:** Select a starting state $S_0$ and a starting action $A_0$ completely at random.
    
2. **Steps $1$ to $T$:** For all subsequent steps in the episode, the agent follows its current deterministic, greedy policy: $A_t = \arg\max_a q(S_t, a)$.
    
3. **End of Episode:** Update the action-value function using the collected return.
    

### When to Use It

- **Pure Simulations:** Only usable when you have a perfect simulator where you can instantly teleport or initialize the agent into any arbitrary state and force it to take a specific first action (e.g., starting a chess game mid-board with a specific move).
    

### Limitations

- **Physically Impossible Online:** You cannot use Exploring Starts in the real world. You cannot ask a self-driving car to "start an episode" already moving at 70 mph mid-crash to see what happens.
