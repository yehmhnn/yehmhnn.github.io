---
title: Expected SARSA
created: 2026-06-17 18:23
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

Expected SARSA is a reinforcement learning algorithm that helps an artificial intelligence agent learn the best actions to take by calculating the mathematical average of all possible future outcomes rather than relying on a single, randomly chosen action.

## Why It Is Important (Why)

By averaging over all possible future actions weighted by how likely the agent is to choose them, Expected SARSA dramatically reduces random "noise" (variance) in the learning process. This allows the agent to learn much more stably and quickly than alternative methods—especially in highly unpredictable environments where the agent frequently explores random choices.

## How It Works (How)

To understand how Expected SARSA updates its memory, we can break its core update cycle down into three logical phases.

### Phase 1: Observing the Step

The agent starts in its current state ($S_t$), executes an action ($A_t$), and interacts with the environment. From this interaction, it receives an immediate reward ($R_{t+1}$) and transitions into a new state ($S_{t+1}$).

### Phase 2: Calculating Expected Future Value

Instead of looking at the single random action it actually decides to take next, Expected SARSA calculates a weighted average of the value of _all_ possible actions it could take in this new state. It weights each action's value by the probability of choosing it under its current strategy (policy):

$$\text{Expected Next Value} = \sum_{a} \pi(a\vert{}S_{t+1}) Q(S_{t+1}, a)$$

- **$a$**: Represents each possible action the agent can take from the next state.
    
- **$\pi(a\vert{}S_{t+1})$**: The probability (under the agent's current strategy, or policy $\pi$) of selecting action $a$ when in state $S_{t+1}$.
    
- **$Q(S_{t+1}, a)$**: The agent's current estimate of the total long-term reward it will get if it is in state $S_{t+1}$ and takes action $a$.
    
- **$\sum_{a}$**: The summation symbol, which instructs the algorithm to calculate this probability-weighted value for every single action and add them all together to get a clean, averaged expectation.
    

### Phase 3: Determining the Target and Updating Beliefs

With the expected future value calculated, the agent creates a target value (representing what the current state-action pair _should_ be worth) and adjusts its old estimate ($Q(S_t, A_t)$) toward that target using a learning rate ($\alpha$):

$$Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha \left[ R_{t+1} + \gamma \sum_{a} \pi(a\vert{}S_{t+1}) Q(S_{t+1}, a) - Q(S_t, A_t) \right]$$

- **$R_{t+1}$**: The immediate, concrete reward obtained from taking the action.
    
- **$\gamma$ (gamma)**: The discount factor (between $0$ and $1$) which determines how much the agent cares about future expected rewards relative to immediate ones.
    
- **$\alpha$ (alpha)**: The learning rate (between $0$ and $1$), which dictates how heavily the agent updates its beliefs based on this new experience versus what it already knew.
    
- **The bracketed term $\left[ \dots \right]$**: This represents the **Temporal Difference (TD) error**—the difference between the new target estimate ($R_{t+1} + \gamma \times \text{Expected Next Value}$) and the old estimate ($Q(S_t, A_t)$).
    

## Additional Insights

### A Direct Comparison: [[SARSA]] vs. [[Q-Learning]] vs. Expected SARSA

Expected SARSA acts as a powerful hybrid that bridges the gap between classic SARSA and Q-Learning.

| **Feature**                   | **SARSA**                                                                     | **Q-Learning**                                                                                | **Expected SARSA**                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Next Action Evaluation**    | Uses the value of the _actual_ next action chosen by the policy.              | Uses the value of the _absolute best_ possible action.                                        | Uses the _mathematically weighted average_ of all possible actions.                        |
| **Variance (Learning Noise)** | **High** (a single bad random choice can heavily distort the update).         | **Moderate** (ignores exploratory mistakes entirely).                                         | **Very Low** (smooths out random actions by averaging them).                               |
| **Policy Type**               | Strictly **[[On-policy]]** (evaluates the strategy it is actively executing). | Strictly **[[Off-policy]]** (evaluates a greedy strategy while executing an exploratory one). | **Flexible** (can run on-policy or off-policy depending on how you set the probabilities). |

### A Major Limitation

> **The Computational Bottleneck in Large Action Spaces:** > While standard [[SARSA]] only needs to read one future action-value and [[Q-learning]] only needs to find the maximum value, Expected SARSA must calculate a probability-weighted sum across _every single possible action_ at every step. If an agent operates in an environment with hundreds or thousands of potential actions (such as complex robotics or game engines), this summation becomes incredibly expensive and slows down training speeds significantly.