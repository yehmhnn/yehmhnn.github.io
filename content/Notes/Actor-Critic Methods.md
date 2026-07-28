---
title: Actor-Critic Methods
created: 2026-07-07 19:27
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

Actor-Critic is a reinforcement learning framework where two separate components work together to learn a task: 
- an **Actor** that tries out different actions to find the best policy
- a **Critic** that evaluates those actions to provide feedback on how to improve.

## Why It Is Important (Why)

Actor-Critic is a milestone in artificial intelligence because it elegantly solves a massive, historical dilemma: the trade-off between **Value-Based** and **Policy-Based** learning.

Before Actor-Critic, training an AI forced developers to choose between two deeply flawed approaches:

- **Value-Based Methods (The "Too Rigid" Approach):**
	- like **[[Q-Learning]]**, **[[SARSA]]**, and later **Deep Q-Networks (DQN)** 
	- try to calculate and memorize the exact mathematical value of every single scenario. 
	- While highly stable and data-efficient, they completely break down in complex, real-world environments where the choices are infinite—like deciding the exact millimeter to turn a steering wheel or tilt a robotic joint.
    
- **Policy-Based Methods (The "Too Random" Approach):**
	- like the **[[REINFORCE]] algorithm** (or Monte Carlo Policy Gradient) 
	- skip memorizing values entirely and learn through raw trial-and-error, optimizing the action strategy directly. 
	- While great for fluid, continuous actions, they suffer from extreme randomness (**high variance**). Because the AI only receives feedback at the very end of a task (like winning or losing a full game of chess), it takes a frustratingly long time to figure out _which_ specific moves along the way were actually good or bad.

### The Actor-Critic Solution

By merging these two rival philosophies, the Actor-Critic framework shatters this trade-off.

The **Critic** brings the immediate feedback of value-based methods, grading the AI's choices after every single step rather than waiting until the end of the game. Meanwhile, the **Actor** brings the flexibility of policy-based methods, allowing the AI to smoothly navigate complex, continuous environments.

This unique pairing eliminates the slow, erratic randomness of pure trial-and-error, allowing AIs to master sophisticated tasks—like fluid robotics and video games—with unprecedented speed and stability.

## How It Works (How)

The Actor-Critic method functions as a loop where the two internal networks continuously update one another. Here is the step-by-step breakdown of how this blueprint functions mathematically and conceptually.

### Phase 1: Action Selection (The Actor)

The process begins with the environment presenting a state to the Actor. The Actor determines the next action based on its current strategy, known as a **policy**.

$$
\pi_\theta(a|s)
$$

- **$\pi$ (Policy):** The strategy function that outputs the probability of taking action $a$ given the current state $s$.
    
- **$\theta$ (Theta):** The weights/parameters of the Actor's neural network that determine its behavior. The AI's ultimate goal is to optimize these weights.
    

### Phase 2: Evaluation (The Critic)

As the Actor performs the action, the environment transitions to a new state and gives a reward. The Critic observes this outcome and estimates the overall expected long-term value of the original state.

$$
V_\phi(s)
$$

- **$V$ (Value Function):** The Critic's prediction of the total future rewards the AI will gather starting from state $s$.
    
- **$\phi$ (Phi):** The weights/parameters of the Critic's neural network.
    

### Phase 3: Measuring the Surprise (The TD Error)

To judge if the Actor's choice was actually good, the Critic calculates the **Temporal Difference (TD) Error**, represented as $\delta_t$. This measures the gap between what actually happened and what the Critic originally expected to happen.

$$\delta_t = r_{t+1} + \gamma V_\phi(s_{t+1}) - V_\phi(s_t)$$

- **$\delta_t$ (Delta):** The TD Error (or Advantage). A positive number means the action went better than expected; a negative number means it went worse.
    
- **$r_{t+1}$:** The immediate reward received from the environment after taking the action.
    
- **$\gamma$ (Gamma):** The discount factor (a number between 0 and 1) that determines how much the AI cares about long-term future rewards versus immediate rewards.
    
- **$V_\phi(s_{t+1})$:** The Critic's estimate of the value of the _new_ state the AI landed in.
    
- **$V_\phi(s_t)$:** The Critic's _original_ estimate of the value of the state the AI just left.

(see [[Temporal-Difference Learning]])

### Phase 4: Updating the Networks

Finally, the TD Error ($\delta_t$) is used to update both networks simultaneously so they can perform better in the next round.

**Updating the Critic:** The Critic tweaks its weights to make its future predictions more accurate by minimizing its prediction error.

$$\phi \leftarrow \phi + \beta \delta_t \nabla_\phi V_\phi(s_t)$$

- **$\beta$ (Beta):** The learning rate of the Critic, controlling how fast it changes its mind.
    
- **$\nabla_\phi$ (Gradient):** The direction the Critic needs to adjust its weights ($\phi$) to align its original guess closer to reality.
    

**Updating the Actor:** The Actor tweaks its weights to make good actions more likely and bad actions less likely.

$$\theta \leftarrow \theta + \alpha \nabla_\theta \log \pi_\theta(a_t|s_t) \delta_t$$

- **$\alpha$ (Alpha):** The learning rate of the Actor.
    
- **$\nabla_\theta \log \pi_\theta(a_t|s_t)$:** The mathematical direction to adjust the weights to increase the probability of choosing this action again.
    
- **$\delta_t$:** Acts as a multiplier. If $\delta_t$ is positive, the multiplication pushes the Actor to do this action _more_ often. If $\delta_t$ is negative, it forces the Actor to do it _less_ often.
    
-  **Theoretical Guarantee:** We can blindly trust this single-step sample ($\delta_t$) because the [[Actor Direction Equivalence Proof]] mathematically proves that averaging these fast, local steps over time points the AI in the exact same direction as the true, long-term Policy Gradient Theorem .

## Additional Insights

### A Direct Comparison: Actor-Critic vs. Its Rivals

To truly understand Actor-Critic, it helps to see it placed between the two traditional reinforcement learning philosophies:

| **Methodology**                        | **How it Learns**                                                                                                          | **Pros**                                                                   | **Cons**                                                                                         |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Value-Based** (e.g., [[Q-Learning]]) | Has a "Critic" but **no Actor**. It calculates the exact value of every action and simply picks the highest one.           | Highly stable and data-efficient.                                          | Struggling or failing when there are infinite/continuous action choices (like steering a wheel). |
| **Policy-Based** (e.g., [[REINFORCE]]) | Has an "Actor" but **no Critic**. It tries random actions and waits until the very end of a game to see if it won or lost. | Excellent at handling complex, continuous actions.                         | High variance; learning is incredibly slow and erratic because it lacks instant feedback.        |
| **Actor-Critic**                       | Has **both an Actor and a Critic**. The Actor handles continuous actions, while the Critic gives instant feedback.         | Low variance, faster learning, handles continuous environments flawlessly. | Requires balancing two networks at the same time.                                                |

### A Major Limitation: The "Moving Target" Instability

The biggest Achilles' heel of Actor-Critic methods is **training instability**. Because the Actor and the Critic are learning at the same time, they are effectively trying to catch a moving target.

If the Actor changes its strategy too drastically, the Critic’s old knowledge becomes useless. Conversely, if the Critic makes a poor evaluation, it might provide bad feedback to the Actor, destroying a perfectly good strategy. If these two networks fall out of sync, it can trigger a feedback loop of bad learning, causing the AI's performance to suddenly collapse mid-training. Advanced variations (like [[Proximal Policy Optimization (PPO)]] or TRPO) were specifically invented to limit how much the Actor can change in a single update to prevent this exact issue.

