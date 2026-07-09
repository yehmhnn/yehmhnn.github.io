---
title: Actor Direction Equivalence Proof
created: 2026-07-08 13:05
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

This theorem proves that an Actor-Critic agent updating its policy step-by-step using a local one-step Temporal Difference error ($\delta_t$) moves, on average, in the exact same mathematical direction as an agent using the true analytical [[Policy Gradient Theorem]] .

## Why It Is Important (Why)

It provides the legal, mathematical justification for using **Critics** and **Bootstrapping**. Without this proof, we would have no way of knowing if updating an agent mid-episode using real-time estimates would warp the math, introduce permanent bias, or guide the AI's learning completely off a cliff .

## How It Works (How)

To understand how real-time Actor-Critic updates work on a theoretical level, it helps to decode the mathematical objective they are trying to reach. This objective combines two distinct ideas:

- **The Policy-Gradient Direction:** According to the core [[Policy Gradient Theorem]], the optimal way to improve a policy is to move parameters in a direction that scales the local policy gradient by the true action-values: $\sum_{a} q_{\pi}(s,a) \nabla \pi(a \mid s, {\theta})$ (see $\phi(s)$ in [[Policy Gradient Theorem]]). This tells the agent to find high-value choices and make them more likely to happen.
    
- **The State-Value Baseline:** Subtracting the average state value ($v_\pi(s)$) from our returns reduces the high variance of policy updates. Because this baseline value is completely independent of the specific action chosen, the baseline identity guarantees that it filters out statistical noise without altering the true analytical direction of the gradient.
    

When these two ideas are unified, they form the **golden theoretical standard** for an optimized, low-variance policy update:

$$\sum_{a} \big( q_{\pi}(s,a) - v_{\pi}(s) \big) \nabla \pi(a \mid s, {\theta})$$

Here proves that an agent taking quick, real-time updates based on a single-step "surprise" target will naturally hit this exact golden standard on average.

---

### Phase 1: The Real-Time Sample Step

In a practical training loop, the agent cannot see the future. It stands in a state ($S_t$), executes a single action ($A_t$), and receives a localized one-step Temporal Difference (TD) error sample ($\delta_t^* = R_{t+1} + \gamma v_{\pi}(S_{t+1}) - v_{\pi}(S_{t})$). It immediately shifts its parameters using this sample and the local policy score function $g(S_t, A_t) = \nabla_{{\theta}} \ln \pi(A_t \mid S_t, {\theta})$:

$$\text{Real-Time Update Direction} = \delta_t^* g(S_t, A_t)$$

### Phase 2: Averaging Over Action Probabilities

Because the action $A_t$ is a random variable, we analyze what this update looks like _on average_ if the agent stands in a fixed state $s$ and tries its choices millions of times. To calculate this expected value ($\mathbb{E}$), we sum up every possible action ($a$), weighted by how likely the policy is to choose it ($\pi(a \mid s, {\theta})$):

$$
\mathbb{E}[\delta_t^* g(S_t, A_t) \mid S_t = s] = \sum_{a} \pi(a \mid s, {\theta}) A_{\pi}(s,a) g(s,a)
$$

During this averaging process, the real-time sample error $\delta_t^*$ naturally resolves into the true, long-term **Advantage Function** ($A_{\pi}(s,a) = q_{\pi}(s,a) - v_{\pi}(s)$). This function precisely measures how much better a specific action is compared to the state's average expectation.

### Phase 3: Clearing Out the Baseline Noise

Next, we expand the advantage function back into its raw components inside the action-averaging sum:

$$
\sum_{a} \pi(a \mid s, {\theta}) \big( q_{\pi}(s,a) - v_{\pi}(s) \big) g(s,a)
$$

Distributing this multiplication separates the equation into a reward-tracking term and a baseline-tracking term:

$$
\sum_{a} \pi(a \mid s, {\theta}) q_{\pi}(s,a) g(s,a) - \sum_{a} \pi(a \mid s, {\theta}) v_{\pi}(s) g(s,a)
$$

Because the state-value $v_{\pi}(s)$ does not change based on which action is selected, it acts as a functional baseline. The baseline identity dictates that any action-independent term multiplied by the score function averages out to exactly zero ($\sum_{a} \pi(a \mid s, {\theta}) v_{\pi}(s) g(s,a) = {0}$). Thus, the entire second term completely vanishes.

### Phase 4: Reconstructing the Policy Gradient

We are left with only the primary action-value term:

$$
\sum_{a} \pi(a \mid s, {\theta}) q_{\pi}(s,a) g(s,a)
$$

Finally, substituting the explicit log-derivative definition of the score function ($g(s,a) = \frac{\nabla \pi(a \mid s, {\theta})}{\pi(a \mid s, {\theta})}$) yields:

$$
\sum_{a} \pi(a \mid s, {\theta}) q_{\pi}(s,a) \left( \frac{\nabla \pi(a \mid s, {\theta})}{\pi(a \mid s, {\theta})} \right) = \sum_{a} q_{\pi}(s,a) \nabla \pi(a \mid s, {\theta})
$$

$$
\implies \mathbb{E}[\,\delta_t^* \nabla_{\theta} \ln \pi(A_t \mid S_t, \theta) \mid S_t = s\,] = \sum_{a} q_{\pi}(s,a) \nabla_{\theta} \pi(a \mid s, \theta)
$$

This proves that when you configure an Actor-Critic agent to update its weights step-by-step using nothing but a quick, localized one-step TD error sample, the mathematical expectations guarantee that the agent is moving in the exact, unbiased direction of the true theoretical policy gradient. Local real-time surprises perfectly guide the global strategy!
    
