---
title: Error-Reduction Property
created: 2026-07-16 13:40
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

The **Error-Reduction Property** is a fundamental mathematical guarantee in [[n-step Bootstrapping]] reinforcement learning . It states that the expected value of an $n$-step return $G_{t:t+n}$ is always strictly closer to the true value function $v_{\pi}$ than your starting arbitrary value estimate $V$ .

Mathematically, it acts as a **strict contraction mapping** in the supremum norm (maximum absolute error) with a contraction factor of $\gamma^n$:

$$\max_{s} \left\vert{} \mathbb{E}_{\pi}[G_{t:t+n} \mid S_t = s] - v_{\pi}(s) \right\vert{} \le \gamma^n \max_{s} \left\vert{} V(s) - v_{\pi}(s) \right\vert{}$$

## Why It Is Important (Why)

When an agent bootstraps (updates its predictions based on other predictions), there is a constant risk that errors will feed back into themselves and cause the system to wildly diverge.

The Error-Reduction Property mathematically prevents this nightmare. It proves that the $n$-step return target is a contraction. Because the discount factor $\gamma \in [0, 1)$, raising it to the power of $n$ guarantees that each successive planning step actively squeezes out error from the system, guaranteeing that $n$-step Temporal Difference methods will converge to the true value function $v_{\pi}$.

## How It Works (The Mathematical Proof)

### Phase 1: Establish the $n$-step Target

We begin with the standard definition of the $n$-step return starting at time step $t$ using our current state-value table $V$:

$$G_{t:t+n} \doteq R_{t+1} + \gamma R_{t+2} + \dots + \gamma^{n-1}R_{t+n} + \gamma^n V(S_{t+n})$$

We want to analyze the difference between this return target and the absolute ground-truth true value function $v_{\pi}(S_t)$. Subtracting $v_{\pi}(S_t)$ from both sides yields:

$$G_{t:t+n} - v_{\pi}(S_t) = \sum_{k=1}^{n} \gamma^{k-1}R_{t+k} + \gamma^n V(S_{t+n}) - v_{\pi}(S_t)$$

### Phase 2: The Splitting Trick

To separate our current estimation error from the environmental rewards, we add and subtract the true discounted state-value $n$ steps in the future ($\gamma^n v_{\pi}(S_{t+n})$):

$$G_{t:t+n} - v_{\pi}(S_t) = \sum_{k=1}^{n} \gamma^{k-1}R_{t+k} + \gamma^n v_{\pi}(S_{t+n}) - v_{\pi}(S_t) + \gamma^n \left( V(S_{t+n}) - v_{\pi}(S_{t+n}) \right)$$

### Phase 3: Applying Conditional Expectation

We take the expectation of this equation under policy $\pi$, conditioning on starting at state $S_t = s$ . Because expectation is linear ($\mathbb{E}[A + B] = \mathbb{E}[A] + \mathbb{E}[B]$), we split the right-hand side into two distinct expectation blocks:

$$
\begin{aligned} \mathbb{E}_{\pi}[G_{t:t+n} - v_{\pi}(S_t) \mid S_t = s] &= \mathbb{E}_{\pi}\left[ \sum_{k=1}^{n} \gamma^{k-1}R_{t+k} + \gamma^n v_{\pi}(S_{t+n}) - v_{\pi}(S_t) \;\middle\vert{}\; S_t = s \right] \\ &\quad + \gamma^n \mathbb{E}_{\pi}[V(S_{t+n}) - v_{\pi}(S_{t+n}) \mid S_t = s] \end{aligned}
$$

### Phase 4: Collapsing the Environmental Block

By the $n$-step Bellman expectation identity, the true value of a state $v_{\pi}(s)$ is exactly the expected value of accumulating discounted rewards for $n$ steps plus the true discounted state value $n$ steps later:

$$
\mathbb{E}_{\pi}\left[ \sum_{k=1}^{n} \gamma^{k-1}R_{t+k} + \gamma^n v_{\pi}(S_{t+n}) \;\middle\vert{}\; S_t = s \right] = v_{\pi}(s)
$$

Because the first half of the expectation block evaluates directly to $v_{\pi}(s)$, and we have the constant subtraction term $-v_{\pi}(s)$ at the end of that same block, **the entire first half of our equation cancels out to zero**:

$$
\underbrace{v_{\pi}(s) - v_{\pi}(s)}_{0} + \gamma^n \mathbb{E}_{\pi}[V(S_{t+n}) - v_{\pi}(S_{t+n}) \mid S_t = s]
$$

This leaves us with only the remaining estimation error term:

$$
\mathbb{E}_{\pi}[G_{t:t+n} \mid S_t = s] - v_{\pi}(s) = \gamma^n \mathbb{E}_{\pi}[V(S_{t+n}) - v_{\pi}(S_{t+n}) \mid S_t = s]
$$

### Phase 5: Bounding the Supremum Norm

To prove the global contraction property across all possible states, we take the absolute value of both sides and apply Jensen's Inequality:

$$
\left\vert{} \mathbb{E}_{\pi}[G_{t:t+n} \mid S_t = s] - v_{\pi}(s) \right\vert{} \le \gamma^n \mathbb{E}_{\pi}\left[ \left\vert{} V(S_{t+n}) - v_{\pi}(S_{t+n}) \right\vert{} \;\middle\vert{}\; S_t = s \right]
$$

Since the expected absolute error of the next state $S_{t+n}$ can never exceed the _maximum_ absolute error across the entire state space, we replace the local expectation with the supremum ($\max$):

$$
\left\vert{} \mathbb{E}_{\pi}[G_{t:t+n} \mid S_t = s] - v_{\pi}(s) \right\vert{} \le \gamma^n \max_{s'} \left\vert{} V(s') - v_{\pi}(s') \right\vert{}
$$

Taking the maximum over all starting states $s$ on the left-hand side completes the proof:

$$
\max_{s} \left\vert{} \mathbb{E}_{\pi}[G_{t:t+n} \mid S_t = s] - v_{\pi}(s) \right\vert{} \le \gamma^n \max_{s} \left\vert{} V(s) - v_{\pi}(s) \right\vert{}
$$

## Additional Insights

### The Contraction Trade-off: Theory vs. Reality

While this property is an incredibly powerful theoretical tool, it highlights a classic compromise in practical algorithm design:

- **The Theoretical Strength:** Looking further into the future (increasing $n$) yields a much stronger contraction factor per update because $\gamma^n$ becomes exponentially smaller. For example, if $\gamma = 0.9$:
    
    - If $n = 1$: Contraction factor is $0.9^1 = 0.9$ (Slower convergence).
        
    - If $n = 5$: Contraction factor is $0.9^5 \approx 0.59$ (Significantly faster error reduction).
        
- **The Practical Catch:** In real-world reinforcement learning, we cannot calculate the analytical expectation $\mathbb{E}_\pi[G_{t:t+n} \mid S_t]$. Instead, we must use noisy _samples_ from actual trajectories.
    
- **The Drawback:** Increasing $n$ forces the target to collect more steps of real-world randomness, causing the statistical variance of our updates to spike. This variance requires us to scale down our learning rate $\alpha$ to keep the system stable, meaning a stronger mathematical contraction ($\gamma^n$) does not always translate to faster learning in practice.
    

(See: [[n-step Bootstrapping]] for details on tuning this bias-variance trade-off .)