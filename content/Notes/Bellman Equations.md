2026-05-07 11:30
Tags: [[Reinforcement Learning]]
***

idea: Replace a huge path expectation by a recursive one-step decomposition.

The "Huge Path" (The Return):
$$v_{\pi}(s) = \mathbb{E}_{\pi} [ \underbrace{R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \dots}_{\text{Infinite future path}} \mid S_t = s ]$$

The Recursive Decomposition (Bellman Equation):
$$v_{\pi}(s) = \underbrace{\sum_{a} \pi(a|s) \sum_{s', r} p(s', r \mid s, a)}_{\text{One-step expectation}} [ \underbrace{r}_{\text{Immediate}} + \underbrace{\gamma v_{\pi}(s')}_{\text{Future Value}} ]$$
    
Bellman Optimality Equation ($v^*$):
    $$v^{*}(s) = \max_{a}\sum_{s^{\prime},r}p(s^{\prime},r|s,a)[r + \gamma v^{*}(s^{\prime})]$$


---
# Reference
