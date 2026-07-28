---
title: n-step SARSA
created: 2026-07-16 18:05
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

n-step SARSA is a reinforcement learning method where an AI agent learns to make better decisions by looking ahead a specific number of steps ($n$) into the future, combining actual experienced rewards with an estimate of future rewards to update its choices.

## Why It Is Important (Why)

It solves the trade-off between the speed and accuracy of learning by bridging the gap between single-step learning (which updates slowly and can be short-sighted) and learning only at the very end of an episode (which is slow and highly inconsistent), allowing the agent to learn faster and more stably.

## How It Works (How)

To understand how n-step SARSA works, we can break it down into its core progression from taking actions to updating memory.

### Step 1: Gathering Experience (The Look-Ahead Phase)

Instead of updating its knowledge immediately after one action, the agent interacts with the environment for $n$ steps. At each step $t$, it observes a state $S_t$, chooses an action $A_t$ using its current policy, receives a reward $R_{t+1}$, and transitions to a new state $S_{t+1}$.

### Step 2: Calculating the $n$-Step Return

Once the agent reaches step $t+n$, it calculates the **$n$-step return**, which is the target value it wants its previous estimate to match. This return, denoted as $G_{t:t+n}$, is the sum of the actual discounted rewards received over those $n$ steps, plus an estimate of the remaining rewards from that point forward.

The mathematical formula for this target is:

$$G_{t:t+n} = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \dots + \gamma^{n-1} R_{t+n} + \gamma^n Q(S_{t+n}, A_{t+n})$$

Here is what each component does conceptually:

- **$G_{t:t+n}$**: The target estimate for the state-action pair at time $t$, calculated using information up to time $t+n$.
    
- **$R_{t+1} + \gamma R_{t+2} + \dots + \gamma^{n-1} R_{t+n}$**: The actual, real-world rewards observed over the next $n$ steps.
    
- **$\gamma$ (Gamma)**: The discount factor (a number between 0 and 1) that makes immediate rewards more valuable than distant future rewards.
    
- **$Q(S_{t+n}, A_{t+n})$**: The agent’s current estimate of the total reward it expects to get from the state and action it landed on at step $t+n$. This "bootstraps" the rest of the infinite future so the agent doesn't have to wait until the absolute end of the task.
    

### Step 3: Updating the Value Function (The Learning Phase)

Now that the agent has a more accurate target ($G_{t:t+n}$), it adjusts its original estimate of the value of taking action $A_t$ in state $S_t$, written as $Q(S_t, A_t)$.

The update formula is:

$$Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha \left[ G_{t:t+n} - Q(S_t, A_t) \right]$$

Here is how the update works conceptually:

- **$Q(S_t, A_t)$**: The current estimated value of taking action $A_t$ in state $S_t$.
    
- **$\alpha$ (Alpha)**: The learning rate (usually a small fraction like 0.1), which controls how much the agent changes its mind based on the new experience.
    
- **$\left[ G_{t:t+n} - Q(S_t, A_t) \right]$**: The **prediction error**. It is the difference between the actual $n$-step return the agent just calculated and its old estimate. If the error is positive (things went better than expected), the agent increases its estimate; if negative, it decreases it.
    

## Additional Insights

### A Direct Comparison: 1-Step SARSA vs. $n$-Step SARSA vs. Monte Carlo

- **1-Step SARSA ($n=1$):** Updates its beliefs instantly after every single action. While this has very low variance (it is highly stable), it is slow to propagate information because a reward found at the end of a long maze has to be slowly passed backward, one step per trial.
    
- **Monte Carlo ($n = \infty$):** Waits until the absolute end of the entire episode before updating anything. While this is unbiased because it uses 100% real rewards, it suffers from high variance (the sequence of events can be highly random, making learning erratic).
    
- **$n$-Step SARSA:** The sweet spot. By choosing a moderate $n$ (e.g., $n=4$), the agent propagates rewards backward much faster than 1-step SARSA, while avoiding the extreme randomness and slow learning of Monte Carlo.
    

### A Major Limitation: The Update Delay

Because the update for state $S_t$ requires knowing what happens at step $t+n$, the agent cannot update its memory for step $t$ until $n$ steps later. In environments where quick, real-time adjustments are necessary, or when the agent interacts in highly dynamic scenarios, this delay can slow down immediate behavioral adaptations.