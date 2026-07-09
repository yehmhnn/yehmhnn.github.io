---
title: REINFORCE with Baseline
created: 2026-07-07 21:10
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

REINFORCE with Baseline is a reinforcement learning method that improves an AI's learning efficiency by comparing the actual reward received from an action against a predicted average benchmark, helping the AI more clearly understand whether its choice was genuinely good or bad.

## Why It Is Important (Why)

- The biggest benefit of using a baseline is **variance reduction**. 
- In standard policy learning ([[REINFORCE]]), the rewards from different trials can swing wildly from one extreme to another, causing the AI's learning process to be slow, unstable, and highly inconsistent; adding a baseline stabilizes this by smoothing out those extreme fluctuations so the AI learns the optimal strategy much faster and with fewer samples.

## How It Works (How)

REINFORCE with Baseline operates through a logical sequence of interacting with the environment, calculating outcomes, and adjusting the AI's decision-making strategy.

### 1. Generating a Trajectory

The AI uses its current strategy, or **policy** ($\pi_\theta$), to select actions in an environment, generating a sequence of states, actions, and rewards known as a trajectory. The policy is parameterized by weights $\theta$ (such as the weights of a neural network).

### 2. Calculating the Return

At each time step $t$ within the trajectory, we calculate the total cumulative reward from that point onward, known as the **return** ($G_t$):

$$G_t = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}$$

- $G_t$: The total discounted reward the agent receives from step $t$ until the end of the episode.
    
- $R_{t+k+1}$: The immediate reward received at a specific future step.
    
- $\gamma$ (gamma): A discount factor between 0 and 1 that determines how much the agent cares about immediate rewards versus future rewards (closer to 0 values immediate rewards; closer to 1 values long-term rewards).
    

### 3. Establishing the Baseline Benchmark

To determine if the calculated return $G_t$ is exceptionally good or bad, we subtract a **baseline** ($b(s_t)$). The baseline is a learned estimate of the average return the agent expects to get from state $s_t$, regardless of which action is chosen. The difference between the actual return and this benchmark is the relative advantage:

$$
(G_t - b(s_t))
$$

- If this value is **positive**, the chosen action performed better than the historical average for that state.

- If this value is **negative**, the action performed worse than average.

- **Note:** We can mathematically subtract any action-independent baseline here because of the [[Baseline Identity (Policy Gradient)]], which guarantees this alteration won't introduce bias into our gradient direction.

### 4. Updating the Policy Parameters

We adjust the weights $\theta$ of our policy using gradient ascent to make good actions more likely and bad actions less likely. The core mathematical framework for this update rule is:

$$
\theta \leftarrow \theta + \alpha \nabla_\theta \log \pi_\theta(a_t|s_t) (G_t - b(s_t))
$$

- $\theta \leftarrow \theta + \alpha \dots$: This updates the policy parameters by moving them in the direction of the calculated gradient, scaled by a learning rate ($\alpha$).
    
- $\nabla_\theta \log \pi_\theta(a_t|s_t)$: This is the gradient of the log-probability of taking action $a_t$ given state $s_t$. It acts as a directional pointer, indicating how to tweak the weights to increase the probability of choosing this action again.
    
- $(G_t - b(s_t))$: This acts as a scalar multiplier. If the action was better than average (positive), the weights are pushed to make the action significantly more likely. If it was worse than average (negative), the direction flips, making the action less likely.
    

### 5. Updating the Baseline

Simultaneously, the baseline function $b(s_t)$—which is typically modeled as a secondary neural network—is updated to minimize the mean squared error between its prediction and the actual return $G_t$. This ensures that as the AI gets better at the task, its baseline benchmark adapts and stays accurate.

## Additional Insights

### A Direct Comparison: REINFORCE vs. REINFORCE with Baseline

Imagine you are a student taking a series of exams:

- **Standard REINFORCE:** If you score an 85% on a test, standard REINFORCE treats this as a purely positive reinforcement and pushes you to study exactly the same way next time. However, it lacks context—if the class average was a 95%, your 85% was actually a poor performance.
    
- **REINFORCE with Baseline:** The baseline acts as the class average (95%). When you subtract the baseline from your score ($85\% - 95\% = -10\%$), the result is negative. The algorithm realizes your strategy underperformed relative to expectations and corrects it, despite the raw score being high.
    

### A Major Limitation

While adding a baseline drastically reduces variance, the algorithm is still an **on-policy, Monte Carlo method**, which introduces two severe constraints:

1. **Data Inefficiency ([[On-Policy]]):** It can only learn from data collected by its _current_ policy. If the policy changes even slightly, all previous training data becomes obsolete and must be discarded.
    
2. **Delayed Updates (Monte Carlo):** It requires waiting until the very end of an episode to calculate $G_t$ before it can make a single adjustment to the weights. If an episode is extremely long, or if the environment is continuous without a clear ending, learning becomes agonizingly slow.