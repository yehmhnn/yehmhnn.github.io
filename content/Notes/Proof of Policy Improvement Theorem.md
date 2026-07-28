---
title: Proof of Policy Improvement Theorem
created: 2026-07-19 08:30
tags file:
  - "[[Reinforcement Learning]]"
---
This note contains the formal mathematical proof for the [[Policy Improvement Theorem]] on a finite Markov Decision Process (MDP) with a discount factor $\gamma \in [0,1)$.

## The Objective

Given two deterministic policies $\pi$ and $\pi'$ where the local condition holds true for every state $s \in \mathcal{S}$:

$$
q_\pi(s, \pi'(s)) \geq v_\pi(s)
$$

We want to prove that this guarantees global long-term improvement across all states:

$$
v_{\pi'}(s) \geq v_\pi(s) \quad \forall s \in \mathcal{S}
$$

## Step-by-Step Derivation

### Step 1: Establish the Baseline Inequality

We start with the base assumption. The value of the old policy is less than or equal to the action-value of taking the first step with the new policy $\pi'$. By definition, we expand the action-value function $q_\pi(s, \pi'(s))$ into the immediate reward plus the discounted expected value of the next state:

$$
v_\pi(s) \leq q_\pi(s, \pi'(s)) = \mathbb{E}_{\pi'} [R_{t+1} + \gamma v_\pi(S_{t+1}) \mid S_t = s]
$$

> **Concept:** The total return of the old policy is worse than (or equal to) getting one immediate reward from the new policy $\pi'$ and then playing the old policy $\pi$ from the next state $S_{t+1}$ onward.

- **$\mid S_t = s$**: You are currently standing in state $s$.
    
- **$\mathbb{E}_{\pi'}$**: You consult the new policy $\pi'$ to pick your very next action. Because you took $\pi'$'s advice, the resulting immediate reward ($R_{t+1}$) and the next state you land in ($S_{t+1}$) are explicitly tied to $\pi'$'s choice.
    
- **$v_\pi(S_{t+1})$**: Notice that once you actually land in that next state ($S_{t+1}$), the subscript switches back to $\pi$. This means for all _future_ steps after this first one, the old policy takes back control of the wheel.

### Step 2: The First Unrolling (Substitution)

Because our baseline inequality ($v_\pi(s) \leq q_\pi(s, \pi'(s))$) holds true for **every** state in the environment, it must also hold true for the next state, $S_{t+1}$:

$$v_\pi(S_{t+1}) \leq q_\pi(S_{t+1}, \pi'(S_{t+1}))$$

We substitute this inequality directly into the right-hand side of our Step 1 equation:

$$v_\pi(s) \leq \mathbb{E}_{\pi'} [R_{t+1} + \gamma q_\pi(S_{t+1}, \pi'(S_{t+1})) \mid S_t = s]$$

Now, we expand $q_\pi(S_{t+1}, \pi'(S_{t+1}))$ using its definition, just like we did in Step 1:

$$v_\pi(s) \leq \mathbb{E}_{\pi'} [R_{t+1} + \gamma \mathbb{E}_{\pi'}[R_{t+2} + \gamma v_\pi(S_{t+2}) \mid S_{t+1}] \mid S_t = s]$$

Using the **Law of Total Expectation** to combine the nested expectations, we simplify this to:

$$v_\pi(s) \leq \mathbb{E}_{\pi'} [R_{t+1} + \gamma R_{t+2} + \gamma^2 v_\pi(S_{t+2}) \mid S_t = s]$$

> **Concept:** Following the new policy $\pi'$ for _two_ steps before reverting to the old policy is still better than or equal to the old baseline.

### Step 3: Repeated Unrolling to Infinity

If we repeat this substitution process for step 3, step 4, and so on, we can unroll this equation all the way to an infinite time horizon ($k \to \infty$):

$$v_\pi(s) \leq \mathbb{E}_{\pi'} [R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \dots + \gamma^{k-1} R_{t+k} + \gamma^k v_\pi(S_{t+k}) \mid S_t = s]$$

Written compactly using summation notation, this becomes:

$$v_\pi(s) \leq \mathbb{E}_{\pi'} \left[ \sum_{i=1}^{k} \gamma^{i-1} R_{t+i} + \gamma^k v_\pi(S_{t+k}) \;\middle\vert{}\; S_t = s \right]$$

### Step 4: Taking the Limit

Now, we take the limit as the number of steps $k$ approaches infinity ($k \to \infty$).

Because the discount factor is strictly less than one ($\gamma \in [0,1)$), as $k$ gets infinitely large, the term $\gamma^k$ shrinks to absolute zero. This causes the final boundary value term to completely vanish:

$$\lim_{k \to \infty} \gamma^k v_\pi(S_{t+k}) = 0$$

This leaves us with only the infinite sum of discounted rewards:

$$v_\pi(s) \leq \mathbb{E}_{\pi'} \left[ \sum_{i=1}^{\infty} \gamma^{i-1} R_{t+i} \;\middle\vert{}\; S_t = s \right]$$

## Conclusion

By definition, the expected value of an infinite sum of discounted rewards where _every single action_ is chosen by policy $\pi'$ is exactly the definition of the value function of $\pi'$:

$$\mathbb{E}_{\pi'} \left[ \sum_{i=1}^{\infty} \gamma^{i-1} R_{t+i} \;\middle\vert{}\; S_t = s \right] = v_{\pi'}(s)$$

Therefore, we arrive at our final proof:

$$v_\pi(s) \leq v_{\pi'}(s) \quad \text{for all } s \in \mathcal{S}$$

The local, single-step edge has officially accumulated into a guaranteed global policy upgrade. $\blacksquare$

Back to main note: [[Policy Improvement Theorem]]