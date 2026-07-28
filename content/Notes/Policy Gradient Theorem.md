---
title: Policy Gradient Theorem
created: 2026-07-06 19:05
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

The Policy Gradient Theorem is a mathematical rule that calculates exactly how to tweak an AI's behavior parameters to maximize its long-term rewards without needing to figure out how those tweaks alter the future path of states the AI will visit.

## Why It Is Important (Why)

- In reinforcement learning, whenever you change an AI's strategy (policy), it changes the actions it takes, which completely alters its future trajectory through the environment. 

- Theoretically, calculating how to improve a policy should require computing $\nabla \eta(s)$—a highly complex derivative showing how policy tweaks alter future state visitations. This would require knowing the environment's internal transition physics.

- The Policy Gradient Theorem solves this massive roadblock by proving that $\nabla \eta(s)$ completely cancels out of the math! Because $q_\pi(s,a)$ already captures the entire infinite-horizon cascade of future rewards, we only need the plain state visitations $\eta(s)$ alongside standard action-values.

## How It Works (How)

The core mechanism uses calculus to bypass the unknown dynamics of the environment through a series of recursive steps:

(All gradients below are with respect to $\theta$.)

### 1. **Differentiate State Values $v_{\pi}(s)$:**
$$
v_{\pi}(s) = \sum_{a} \pi(a|s) q_{\pi}(s,a)
$$
$$
\nabla v_{\pi}(s) = \sum_{a} \left[ \nabla \pi(a|s) q_{\pi}(s,a) + \pi(a|s) \nabla q_{\pi}(s,a) \right]
$$
- **The first part ($\nabla \pi \cdot q_\pi$):**
	- $\nabla \pi$ : the **rate of change of the immediate policy choices**. 
		- It answers: _“If I make a tiny tweak to my parameter weights ${\theta}$, how much do my immediate action probabilities shift?”_
	- $\nabla \pi \cdot q_\pi$ : the **immediate reward gradient**
		- how much your local score changes because your immediate choices shifted.
 
- **The second part ($\pi \cdot \nabla q_\pi$):** 
	- **$\nabla q_\pi(s,a)$**: The rate of change of the action's future value. 
		- It asks: _"If I tweak my parameter weights right now, how much will the long-term value of this action shift because my strategy will be different in the future turns?"_
	- $\pi(a|s) \cdot \nabla q_\pi(s,a)$: 
		- means: _"Keep my current choice on this turn exactly the same, but calculate how tweaking my parameters will alter the value of all the future steps I take after this turn."_

### 2. **Unroll the Futurity:** 

The problem with that second term ($\nabla q_{\pi}(s,a)$) is that it looks forward into the future. To evaluate it, we substitute the definition of $q_\pi$, which reveals that the gradient of an action's value is just the discounted gradient of the _next_ state's value: ([[Bellman Equations]])

**Differentiate $q_\pi(s, a)$:** Expand using the Bellman expectation equation:

$$
q_\pi(s, a) = \sum_{s'} p(s' \mid s, a) \left( r(s, a, s') + \gamma v_\pi(s') \right)
$$

Since environment dynamics $p(s' \mid s, a)$ and rewards $r(s, a, s')$ do not depend on $\theta$:

$$
\nabla q_{\pi}(s,a) = \gamma \sum_{s'} p(s'|s,a) \nabla v_{\pi}(s')
$$

If we plug this back into our main equation and group everything cleanly into full matrix forms, it creates a **recursive loop** ($\nabla v_{\pi}$ is on both sides):

$$
\nabla v_{\pi} = {\phi} + \gamma P_{\pi} \nabla v_{\pi}
$$

(Where $\phi(s) = \sum_{a} \nabla \pi(a|s) q_{\pi}(s,a)$ represents the immediate choice shifts , and $P_{\pi}$ is the environment's state-to-state transition matrix.)
    
### 3. **Compile a Life History:** 

Now we have an algebraic loop: $\nabla v_{\pi}$ is on both sides of the equals sign. We need to isolate it. We shift the terms over and pull out an Identity matrix ($I$):

$$
(I - \gamma P_{\pi}) \nabla v_{\pi} = {\phi} \implies \nabla v_{\pi} = (I - \gamma P_{\pi})^{-1} {\phi}
$$

To calculate overall episodic performance ($J$), we multiply this by the starting state distribution vector (${d}_0^\top$):

$$
\nabla J(\theta) = {d}_0^\top (I - \gamma P_{\pi})^{-1} {\phi}
$$

Calculus allows us to expand that matrix inverse term $(I - \gamma P_{\pi})^{-1}$ into an infinite geometric series:

$$
{d}_0^\top (I - \gamma P_{\pi})^{-1} = \sum_{t=0}^{\infty} \gamma^t {d}_0^\top P_{\pi}^t = {\eta}^\top
$$

This is where we compile the agent's life history. The expression $\sum_{t=0}^{\infty} \gamma^t {d}_0^\top P_{\pi}^t$ literally means: "Start at time step 0, follow the policy to time step 1, then step 2, all the way to infinity, tracking every state visited along the way."


### 4. **Formulate the Shortcut:** 
It combines these visitation counts with the local policy gradient and the action-values, isolating the parameter updates completely from the environment's derivative.

Finally, we substitute our newly compiled life-history vector (${\eta}^\top$) back into our performance gradient equation:

$$
\nabla J(\theta) = {\eta}^\top {\phi}
$$

If we unpack the vector notation back into regular sums and restore the hidden definition of $\phi(s)$ from Step 2 , we hit our grand destination—the unnormalized Policy Gradient Theorem:

$$
\nabla J(\theta) = \sum_{s} \eta(s) \sum_{a} q_{\pi}(s,a) \nabla \pi(a|s,\theta)
$$

- **$\nabla J(\theta)$**: 
	- The overall gradient vector showing the direction to adjust the policy parameters ($\theta$) to maximize the expected episodic return.
    
- **$\eta(s)$**: 
	- The discounted expected visitation count, which measures how much time the agent spends in state $s$ under the current policy.
    
- **$q_{\pi}(s,a)$**: 
	- The action-value function, which estimates the total long-term reward expected if the agent takes action $a$ in state $s$.
    
- **$\nabla \pi(a|s,\theta)$**: 
	- The policy gradient, tracking how a tiny tweak to the parameter weights changes the actual probability of executing action $a$ inside state $s$.
    

## Additional Insights

### A Direct Comparison: Value-Based ([[Q-Learning]]) vs. Policy-Based (Policy Gradient)

It is easy to confuse policy gradient methods with traditional value-based RL because they both aim for maximum rewards, but their underlying philosophy is completely different:

| **Feature**           | **Value-Based RL (e.g., Q-Learning)**                                                                             | **Policy-Based RL (Policy Gradient Theorem)**                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **What it Learns**    | Memorizes a giant table of point values ($Q$-values) for every action combo.                                      | Learns a direct probability distribution over actions (${\pi}$).                           |
| **Action Selection**  | Moves greedily by picking the action with the highest calculated point value.                                     | Samples actions stochastically based on their learned probabilities.                       |
| **Continuous Spaces** | Struggles severely; cannot easily find the maximum value out of infinite choices (e.g., steering an exact angle). | Thrives; can output parameters for a continuous curve (like a Gaussian mean and variance). |
| **Random Strategies** | Cannot learn optimal stochastic actions (it will always default to a deterministic choice).                       | Can easily learn a balanced random policy (essential for games like Rock-Paper-Scissors).  |

### A Major Limitation: High Variance

The biggest Achilles' heel of methods derived from the Policy Gradient Theorem (like [[REINFORCE]]) is **high variance**.

Because the theorem relies on empirical samples of action-values ($q_{\pi}(s,a)$) to guide the gradient, the updates are highly dependent on full trajectory readouts. If an agent plays a perfect game but stumbles into one highly unusual, unlucky trap at the very end of an episode, the calculated return drops. The algorithm will read this bad final score and assume _all_ the actions taken earlier in that episode were terrible, severely warping the gradient direction. This is why practical implementations require an extra "critic" value function to act as a baseline, stabilizing the wild fluctuations.