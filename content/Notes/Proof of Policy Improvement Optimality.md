---
title: Proof of Policy Improvement Optimality
created: 2026-07-19 09:22
tags file:
  - "[[Reinforcement Learning]]"
---
This note contains the derivation showing that when a policy can no longer be improved by the Policy Improvement Theorem, it satisfies the Bellman Optimality Equation, proving that $v_\pi = v^*$.

## Part 1: Deriving the Bellman Optimality Equation

### Step 1: Start from the Convergence Condition

When the policy iteration loop stops changing, the new greedy policy $\pi'$ is identical to the old policy $\pi$. This means the state-value matches the maximum possible action-value for every state:

$$v_\pi(s) = \max_{a \in \mathcal{A}} q_\pi(s, a) \quad \forall s \in \mathcal{S}$$

### Step 2: Expand the Action-Value Function ($q_\pi$)

By definition, the action-value function $q_\pi(s, a)$ represents the expected return of taking action $a$ in state $s$ and following policy $\pi$ thereafter. We expand this using the probability dynamics of the environment, $p(s', r \mid s, a)$:

$$q_\pi(s, a) = \sum_{s' \in \mathcal{S}} \sum_{r \in \mathcal{R}} p(s', r \mid s, a) \left[ r + \gamma v_\pi(s') \right]$$

- $p(s', r \mid s, a)$: The probability of transitioning to next state $s'$ and receiving immediate reward $r$, given current state $s$ and action $a$.
    
- $r + \gamma v_\pi(s')$: The immediate reward plus the discounted value of the next state under the current policy.
    

### Step 3: Substitute and Combine

Now, we substitute the expanded definition of $q_\pi(s, a)$ back into our Step 1 equation. Because the maximization operates over the action $a$, we place the $\max_a$ operator outside the expectation sum:

$$v_\pi(s) = \max_{a \in \mathcal{A}} \sum_{s', r} p(s', r \mid s, a) \left[ r + \gamma v_\pi(s') \right] \quad \forall s \in \mathcal{S}$$

This equation is universally known as the **Bellman Optimality Equation** for state-value functions.

## Part 2: Concluding that $v_\pi = v^*$

Now that we have shown $v_\pi$ satisfies the Bellman Optimality Equation, how do we definitively conclude that it equals the absolute optimal value function ($v^*$)?

### 1. The Principle of Uniqueness

The Bellman Optimality Equation can be thought of as a system of equations (one equation for each state $s$). In reinforcement learning theory, the Bellman optimality operator is proven to be a **$\gamma$-contraction mapping** under the mathematical framework of the Banach Fixed-Point Theorem.

> **Concept:** A contraction mapping acts like a mathematical funnel. If you repeatedly apply it, it drags any starting function toward one specific destination. Because it is a strict contraction, the equation is guaranteed to have **exactly one unique solution**.

### 2. The Final Link

By definition, the true optimal value function $v^*(s)$ is defined as the unique solution to this exact Bellman Optimality Equation:

$$v^*(s) = \max_{a \in \mathcal{A}} \sum_{s', r} p(s', r \mid s, a) \left[ r + \gamma v^*(s') \right]$$

Because:

1. The equation has only **one unique solution** total.
    
2. $v^*$ satisfies this equation.
    
3. Our policy's value function $v_\pi$ _also_ satisfies this exact equation.
    

It is mathematically impossible for them to be different functions. Therefore, they must be completely identical:

$$v_\pi = v^*$$

### The Ultimate Conclusion

This completes the mathematical loop of Policy Iteration. The Policy Improvement Theorem guarantees that as long as your strategy keeps changing, it is strictly getting better. And this proof guarantees that the exact moment your strategy _stops_ changing, it has officially reached global, absolute perfection ($v^*$). $\blacksquare$

Back to main note: [[Policy Improvement Theorem]]