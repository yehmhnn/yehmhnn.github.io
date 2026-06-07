---
title: "Multi-arm Bandits"
created: "2026-04-27 17:21"
tags file:
  - "[[Reinforcement Learning]]"
---
***
### Definition

A bandit problem is a simplified RL setting where actions do not affect future states or rewards. It isolates the **Exploration-Exploitation dilemma**.

```
The "Restaurant Problem" Analogy:

- Bandit View: You choose a restaurant, eat, and rate it. Tomorrow, the same 10 restaurants are available with the same menus. Your choice today didn't make a restaurant close down or change its chef for tomorrow.
    
- Full RL View: If you choose to eat a massive 5-course meal now (Action), you might be too full to eat anything tomorrow (Future State), or you might become a "regular" and get a discount next week (Future Reward).
```


### Action-Value Estimation

Estimates of action values $Q_t(a)$ are often computed using **sample averages**:

$$Q_{t}(a) = \frac{1}{N_{t}(a)}\sum_{i<t:A_{i}=a}R_{i}$$
### Algorithms

| **Method**                    | **Core Idea**                                                | **Strength**                |
| ----------------------------- | ------------------------------------------------------------ | --------------------------- |
| **$\epsilon$-greedy**         | Explore uniformly with probability $\epsilon$.               | Simple and robust.          |
| **Optimistic Initial Values** | Set $Q_1(a)$ high to force early exploration.                | Good for stationary tasks.  |
| **UCB**                       | Add an uncertainty bonus: $c\sqrt{\frac{\ln t}{N_{t}(a)}}$.  | Directed exploration.       |
| **Gradient Bandit**           | Learn action preferences $H_t(a)$ and use a softmax policy . | Direct policy optimization. |

### Non-stationarity

In problems where true values drift over time, **constant step sizes** ($\alpha$) are preferred over sample averages to give more weight to recent rewards.

$$Q_{n+1} = Q_{n} + \alpha(R_{n} - Q_{n})$$
```
Imagine you are playing a slot machine.

- Stationary: The machine is programmed to return 5% profit forever.
    
- Non-Stationary: The casino owner slowly tightens or loosens the machine's gears every hour. What was a "good" machine at 9:00 AM might be a "bad" one by noon.
```

---
# Reference
