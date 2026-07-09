---
title: REINFORCE
created: 2026-07-03 19:42
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

REINFORCE is a reinforcement learning algorithm that directly updates an agent's decision-making strategy—making successful actions more likely and unsuccessful actions less likely—by waiting until a full sequence of events or a complete game ends to see the final score before adjusting its rules.

## Why It Is Important (Why)

It completely bypasses the need to guess or keep a giant table of how much every individual situation is worth. By optimizing the strategy (policy) directly rather than estimating state values, REINFORCE excels at handling tasks with continuous action spaces (like smoothly steering a vehicle or modulating a robotic valve) and can naturally learn to intentionally randomize its actions when uncertainty demands it (like bluffing in rock-paper-scissors or poker), which classic value-based methods like [[Q-learning]] struggle to achieve.

## How It Works (How)

REINFORCE operates through a cyclical process of trial, evaluation, and adjustment over entire game sessions or "episodes."

### Phase 1: Running the Trial (Trajectory Generation)

The AI agent uses its current brain—represented by a neural network with parameters or weights denoted as $\theta$—to navigate the environment. At each step, it looks at the state $s$ and selects an action $a$ based on its policy probability $\pi_\theta(a|s)$. The agent plays through the entire session from start to finish, recording every state it saw, action it took, and reward it received.

### Phase 2: Scoring the Performance (Calculating Return)
    
Once the episode ends, the agent looks back at every step $t$ it took and calculates its long-term reward, known as the return $G_t$. This is done using the following formula:

$$
G_t = \sum_{k=0}^{T-t-1} \gamma^k r_{t+k+1}
$$

In this equation, $r$ represents the immediate reward received at a specific step, and $T$ is the final time step of the episode. The variable $\gamma$ (gamma) is a discount factor between 0 and 1; it acts like economic inflation, ensuring that immediate rewards are weighted more heavily than rewards that happen far off in the future. The resulting $G_t$ tells the agent exactly how fruitful its choices were from that specific moment onward.
    
### Phase 3: Shifting the Mindset (The Policy Gradient Update)
    
With the scores calculated, the agent updates its internal weights $\theta$ to adjust its future behavior. It uses gradient ascent to make successful choices more likely to happen again, governed by the core REINFORCE formula:

$$
\theta \leftarrow \theta + \alpha \sum_{t=0}^{T} \nabla_\theta \log \pi_\theta(a_t|s_t) G_t
$$

Here is exactly what each mathematical component is doing to change the agent's mind:

- **$\theta \leftarrow \theta + \dots$**: This means "assign the new, updated weights to the AI's brain."
	
- **$\alpha$ (alpha)**: The learning rate, a small multiplier that controls how visionaries adjust their strategy based on this single trial. A small alpha prevents the AI from overreacting to one lucky run.
	
- **$\nabla_\theta \log \pi_\theta(a_t|s_t)$**: This is the gradient of the log probability. Conceptually, it acts as a steering wheel, determining the exact directional tweak needed in the weights $\theta$ to increase the likelihood of picking action $a_t$ when facing state $s_t$.
	
- **$G_t$**: This acts as the throttle. If the return $G_t$ is highly positive, it multiplies the gradient, aggressively forcing the network to make that action much more probable in the future. If the return is low or negative, the adjustment is small or reversed, discouraging the action.

## Additional Insights

### A Direct Comparison: Q-Learning vs. REINFORCE

| **Evaluation Metric**      | **[[Q-Learning]] (Value-Based)**                                                  | **REINFORCE (Policy-Based)**                                                          |
| -------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **What is learned?**       | An estimation of the maximum future reward for each state-action pair ($Q(s,a)$). | The direct action probability distribution ($\pi(a \mid s)$) for a given state.       |
| **How actions are chosen** | Picks the action with the absolute highest number in the table (greedy).          | Samples an action out of a probability distribution (like spinning a roulette wheel). |
| **Update timing**          | **Step-by-step:** Updates instantly after every single transition using a guess.  | **Episodic:** Must wait for the absolute end of the run to use factual returns.       |

### A Major Limitation: High Variance (The Noise Trap)

The most significant weakness of vanilla REINFORCE is its **high variance**, which makes its learning process incredibly slow and unstable. Because the algorithm calculates the return $G_t$ based on a full episode, a single lucky fluke or random mistake at the very end of a trial can wildly distort the scores for all the great actions taken at the beginning. As a result, the AI requires millions of trials to average out this random noise.

Solutions: [[REINFORCE with Baseline]], [[Actor-Critic Methods]]