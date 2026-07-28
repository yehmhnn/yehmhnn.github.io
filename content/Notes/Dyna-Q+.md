---
title: Dyna-Q+
created: 2026-06-23 17:23
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

Dyna-Q+ is an enhanced version of the [[Dyna-Q]] reinforcement learning framework designed for changing environments, which continuously encourages exploration by giving the agent a simulated reward bonus for trying actions it has not performed in a long time.

## Why It Is Important (Why)

Standard Dyna-Q assumes the world is stationary—meaning once it learns a map or a set of rules, it assumes those rules never change. If a new, better shortcut opens up in the environment, standard Dyna-Q will completely miss it because its internal simulator keeps telling it to stick to the old path. Dyna-Q+ solves this flaw by introducing a mathematical sense of "curiosity," ensuring the agent periodically checks back on old, unvisited paths to see if the world has changed, making it highly adaptable to dynamic, real-world conditions.

## How It Works (How)

Dyna-Q+ keeps the same core architecture as Dyna-Q (Direct Learning, Model Learning, and Simulated Planning) but adds a time-tracking mechanism that alters how the agent "thinks" during its imaginary practice phase.

### Step 1: Track the Time Elapsed

For every state-action pair, the agent maintains a counter, $\tau(s, a)$, which tracks the number of time steps that have passed since the agent last tried action $a$ in state $s$ during _real-world_ interaction.

### Step 2: The Curiosity-Infused Simulated Update

When the agent runs its simulated planning steps, it pulls a random state $s$ and action $a$ from its model memory . However, it replaces the standard recorded reward $\hat{r}(s,a)$ with an augmented **exploration bonus target** $r^+(s,a)$ :

$$
r^{+}(s,a) = \hat{r}(s,a) + \kappa \sqrt{\tau(s,a)}
$$

This modified reward is plugged directly into the standard Q-planning update rule :

$$
Q(s, a) \leftarrow Q(s, a) + \alpha \left[ \Big( \hat{r}(s,a) + \kappa \sqrt{\tau(s,a)} \Big) + \gamma \max_{a'} Q(s', a') - Q(s, a) \right]
$$

> **What is happening here:** The longer an action is ignored, the larger $\tau$ grows, and the larger the artificial reward bonus ($\kappa \sqrt{\tau}$) becomes. In the agent's mind, an unvisited path starts looking incredibly attractive. If this hallucinated bonus is high enough, it trickles into the agent's real-world strategy, forcing it to go investigate that path in real life.

### Variable Definitions

- **$Q(s, a)$**: The estimated long-term value of taking action $a$ in state $s$.
    
- **$\alpha$ (Alpha)**: The learning rate.
    
- **$R$**: The standard reward memorized by the internal model.
    
- **$\kappa$ (Kappa)**: A small positive weight factor that controls how heavily the agent values curiosity (a higher $\kappa$ means a more exploratory agent).
    
- **$\tau(s, a)$**: The number of time steps elapsed since action $a$ was actually selected in state $s$.
    
- **$\gamma$ (Gamma)**: The discount factor for future rewards.
    
- **$\max_{a'} Q(s', a')$**: The maximum predicted value of the next state.


> 💡 **Why Use a Square Root ($\sqrt{\tau}$)?**
> 
> Sutton and Barto chose a square root instead of a linear counter ($\kappa \cdot \tau$) to achieve two critical mathematical balances:
> 
> 1. **Unbounded Growth (Long-term Guarantee):** Because $\lim_{\tau \to \infty} \sqrt{\tau} = \infty$, the bonus can grow infinitely large. This mathematically guarantees that no matter how bad the agent _thinks_ an action is, if it ignores it for long enough, the bonus will eventually become massive enough to override any finite value disadvantage and force a re-test.
>     
> 2. **Sublinear / Diminishing Growth (Short-term Stability):** The square root function is concave, meaning it grows rapidly at the beginning but flattens out over time. If the bonus grew linearly, short absences would trigger frantic, hyper-aggressive over-exploration, causing the agent to constantly drop its optimal, high-reward routines to check on minor things. The square root dampens early panic while still maintaining the long-term exploration safety net.
>
    
---

## Additional Insights

### A Direct Comparison: [[Dyna-Q]] vs. Dyna-Q+

| **Feature**                  | **Dyna-Q**                                                          | **Dyna-Q+**                                                                                        |
| ---------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Environment Fit**          | Ideal for fixed, unchanging environments.                           | Ideal for non-stationary, changing environments.                                                   |
| **Exploration Strategy**     | Relies entirely on $\epsilon$-greedy exploration in the real world. | Uses an explicit, time-based curiosity bonus during simulated planning.                            |
| **Handling Untried Actions** | Ignored during planning if never experienced.                       | Actively allowed during planning, initialized with a high curiosity potential to prompt discovery. |

### A Concrete Example: The Shortcut Maze

Imagine a maze where an AI agent learns to walk a long, winding path from the start to the finish because the center corridor is blocked by a wall.

- **The Change:** Halfway through the experiment, the center wall is removed, opening a massive shortcut.
    
- **Dyna-Q's Behavior:** Because Dyna-Q is already happy with its long path, it exploits it perfectly. Its internal model tells it the center wall is solid. It never plans to go there, so it _never_ discovers the shortcut unless it accidentally bumps into it during a random real-world exploratory stutter.
    
- **Dyna-Q+'s Behavior:** As the agent repeatedly walks the long path, the time elapsed ($\tau$) for the actions near the center wall keeps climbing. In its mind, the curiosity bonus for checking that wall becomes massive. During a planning phase, a simulated update recognizes this high value, altering the Q-table. On its next real-world run, the agent intentionally detours to the wall, finds it open, and permanently switches to the faster shortcut.
    

### A Major Limitation: The Hyperparameter Tightrope

The success of Dyna-Q+ hinges entirely on tuning the curiosity weight ($\kappa$). If $\kappa$ is set too low, the agent behaves just like standard Dyna-Q and fails to adapt to changes. If $\kappa$ is set too high, the agent becomes severely "hyperactive" and easily distracted. It will constantly abandon perfectly optimal, high-reward routines to go wander into useless corners of the environment simply because it hasn't looked at them recently, severely degrading its overall real-world performance.