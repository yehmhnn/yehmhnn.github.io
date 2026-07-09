---
title: Baseline Identity (Policy Gradient)
created: 2026-07-07 22:12
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

The **Baseline Identity** is a mathematical guarantee in policy-gradient methods proving that adding or subtracting an action-independent baseline function $b(s)$ to your policy update step introduces absolutely zero bias to the true gradient direction.

## The Mathematical Proof

Let $g(s,a) = \nabla_{{\theta}} \ln \pi(a \mid s, {\theta})$ represent the score function. If we multiply this score function by an action-independent baseline $b(s)$ and take the expected value over all possible actions, the sum collapses to zero through logical steps:

$$
\sum_{a} \pi(a \mid s, {\theta}) b(s) g(s,a)
$$

We rewrite the log-derivative $g(s,a)$ using its basic calculus definition, which is $\frac{\nabla_{{\theta}} \pi(a \mid s, {\theta})}{\pi(a \mid s, {\theta})}$:

$$
\sum_{a} \pi(a \mid s, {\theta}) b(s) \left( \frac{\nabla_{{\theta}} \pi(a \mid s, {\theta})}{\pi(a \mid s, {\theta})} \right)
$$
$$
\implies \sum_{a} b(s) \nabla_{{\theta}} \pi(a \mid s, {\theta})
$$

Because the baseline function $b(s)$ is explicitly independent of the action $a$

$$
b(s) \sum_{a} \nabla_{{\theta}} \pi(a \mid s, {\theta})
$$

By the linearity of derivatives, we can slide the gradient operator $\nabla_{{\theta}}$ outside the summation. This leaves us taking the derivative of the total probability space:

$$
b(s) \nabla_{{\theta}} \left( \sum_{a} \pi(a \mid s, {\theta}) \right)
$$

Because the probabilities of all possible actions must always sum up to exactly $1$, the term inside the parenthesis becomes a constant:

$$
b(s) \nabla_{{\theta}} (1) = b(s) \cdot {0} = {0}
$$

## Why This Matters (The Practical Insight)

When you expand a full REINFORCE update that uses a baseline, the mathematical expectation naturally splits into two individual parts:

$$\mathbb{E} \left[ G_t g(S_t, A_t) \right] - \mathbb{E} \left[ b(S_t) g(S_t, A_t) \right]$$

Thanks to the identity you just proved, that second expectation block evaluates to **exactly zero**.

This tells us that you can invent almost any baseline function $b(s)$ you want—whether it's a simple moving average of past scores or a massive secondary neural network predicting state values—and subtract it from your policy gradient updates. Because its total expected value is zero, it will **never alter the true direction** of your policy updates. It stabilizes the wild variance of your training loops while guaranteeing your agent still climbs the exact same optimal hill.
