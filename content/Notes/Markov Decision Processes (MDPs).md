---
title: "Markov Decision Processes (MDPs)"
created: "2026-05-02 11:42"
tags file:
  - "[[Reinforcement Learning]]"
---
### From [[Multi-arm Bandits]] to MDPs

MDPs extend bandits by adding **State**, **Dynamics**, and **Delayed Rewards**. Actions now affect not just immediate rewards but also future situations.

- State: tell us which situation we are in
- Dynamics: tell us how actions change our future

Bandits: q*(a)  ⇒  MDPs: v*(s), q*(s,a)
(q*: true action value)

### The Markov Property

A state is Markov if the current state and action are sufficient to predict the future, making the rest of the history redundant.

$$
Pr(S_{t+1},R_{t+1}|S_{0},A_{0},...,S_{t},A_{t}) = Pr(S_{t+1},R_{t+1}|S_{t},A_{t})
$$

### [[Value Functions]]

1. **State-Value Function ($v_{\pi}(s)$):** Expected return starting in state $s$ following policy $\pi$.
    
2. **Action-Value Function ($q_{\pi}(s,a)$):** Expected return after taking action $a$ in state $s$, then following $\pi$.
    

### [[Bellman Equations]]

idea: Replace a huge path expectation by a recursive one-step decomposition.

The "Huge Path" (The Return):
$$
v_{\pi}(s) = \mathbb{E}_{\pi} [ \underbrace{R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \dots}_{\text{Infinite future path}} \mid S_t = s ]
$$

The Recursive Decomposition (Bellman Equation):
$$
v_{\pi}(s) = \underbrace{\sum_{a} \pi(a|s) \sum_{s', r} p(s', r \mid s, a)}_{\text{One-step expectation}} [ \underbrace{r}_{\text{Immediate}} + \underbrace{\gamma v_{\pi}(s')}_{\text{Future Value}} ]
$$
    
Bellman Optimality Equation ($v^*$):
$$
v^{*}(s) = \max_{a}\sum_{s^{\prime},r}p(s^{\prime},r|s,a)[r + \gamma v^{*}(s^{\prime})]
$$