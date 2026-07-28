---
title: Theoretical Foundations of TD
created: 2026-07-17 17:55
tags file:
  - "[[Reinforcement Learning]]"
---
### The Two Core Approximations

The mathematical foundation of value prediction rests on the **Bellman Expectation Equation** (see: [[Bellman Equations]]), which defines the true value function $v_{\pi}(s)$ as an exact expectation:

$$v_{\pi}(s)=\mathbb{E}_{\pi}[R_{t+1}+\gamma~v_{\pi}(S_{t+1}) \mid S_{t}=s]$$

To convert this theoretical identity into the operational $TD(0)$ target formula ($R_{t+1}+\gamma~V(S_{t+1})$) , we apply two structural approximations:

1. **Sampling (Drops the Expectation Operator $\mathbb{E}_{\pi}$):** Instead of computing the true mathematical average across all possible branches of transitions and rewards (which demands an explicit environment model) , we sample a single real-world interaction tuple $(S_t, R_{t+1}, S_{t+1})$ via active environment interaction.
    
2. **Bootstrapping (Replaces the True Value $v_{\pi}$ with the Estimate $V$):** Because the true future value function $v_{\pi}(S_{t+1})$ is unknown , we substitute it with our current algorithmic estimate $V(S_{t+1})$ from our lookup table.
    

### Understanding Target Bias

The $TD(0)$ target exhibits a split statistical nature depending on what it is measured against:

- **Biased Estimator of True Return ($G_t$):** The target is a **biased** estimator of the full future sequence return $G_t = \sum_{k=0}^{\infty}\gamma^{k}R_{t+k+1}$. Because our value table $V$ is initialized randomly or is mid-convergence, it introduces systemic estimation errors. The target is pulled toward our flawed guesses rather than the objective reality.
    
- **Unbiased Estimator of Local One-Step Expectation:** When strictly conditioned on the current state $S_t$, the sampling process itself is completely honest. If we assume our value table has perfectly converged to the true value function ($V = v_{\pi}$), the expected value of our target exactly recovers the true Bellman identity:
    
    $$\mathbb{E}_{\pi}[R_{t+1}+\gamma~v_{\pi}(S_{t+1}) \mid S_{t}=s] = v_{\pi}(s)$$