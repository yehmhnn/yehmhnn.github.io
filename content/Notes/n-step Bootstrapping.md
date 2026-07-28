---
title: n-step Bootstrapping
created: 2026-06-17 18:31
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

**$n$-step Bootstrapping** is a prediction framework in reinforcement learning that unifies one-step [[Temporal-Difference Learning]] and [[Monte Carlo in RL]] . It allows an agent to update its current state-value estimates by looking a flexible number of steps ($n$) into the future, rather than restricting updates to either a single step or the absolute end of an episode .

## Why It Is Useful (Why)

In reinforcement learning, choosing how to evaluate experience presents a direct engineering compromise:

- **One-step TD** is highly stable but can be slow to propagate distant rewards, as it relies heavily on inaccurate initial guesses.
    
- **Monte Carlo** is completely unbiased but suffers from massive variance because it accumulates all the random actions and environmental noise of a full trajectory.
    

$n$-step bootstrapping acts as a **tunable slider** between these two extremes, allowing practitioners to find the optimal mathematical sweet spot that minimizes overall prediction error.

## How It Works (How)

### Phase 1: The [[On-Policy]] $n$-step Return Target

For a positive integer $n \ge 1$, we define our on-policy target update return starting at time step $t$ as :

$$G_{t:t+n} \doteq R_{t+1} + \gamma R_{t+2} + \dots + \gamma^{n-1}R_{t+n} + \gamma^n V_{t+n-1}(S_{t+n})$$

- **$R_{t+1} \dots R_{t+n}$**: The actual, unbiased rewards observed from the real environment during the next $n$ steps.
    
- **$V_{t+n-1}(S_{t+n})$**: The estimated value of the state the agent lands on $n$ steps in the future, acting as the bootstrap guess.
    

### Phase 2: Evaluating the Spectrum Boundaries

By analyzing the limits of the step parameter $n$, we mathematically recover our classic RL algorithms :

#### 1. The One-step TD Limit ($n = 1$)

Substituting $n=1$ directly into the general formula yields :

$$G_{t:t+1} = R_{t+1} + \gamma V_{t}(S_{t+1})$$

This is the standard, localized TD target.

#### 2. The Monte Carlo Limit ($n \ge T-t$)

If $n$ meets or exceeds the remaining steps in the episode, the sequence reaches the terminal state $S_T$. Because the value of a terminal state is defined as $V(S_T) = 0$, the bootstrap term disappears completely:

$$G_{t:T} = R_{t+1} + \gamma R_{t+2} + \dots + \gamma^{T-t-1}R_T$$

This collapses the equation back into the exact episodic accumulated return $G_t$ used in Monte Carlo.

### Phase 3: The [[Error-Reduction Property]] (The Guarantee)

We can mathematically prove that $n$-step updates are guaranteed to bring our value estimates closer to the true value function $v_\pi$ . If $V$ is any arbitrary value estimate, the expected $n$-step return satisfies the contraction inequality :

$$\max_{s} \left\vert{} \mathbb{E}_{\pi}[G_{t:t+n} \mid S_t = s] - v_{\pi}(s) \right\vert{} \le \gamma^n \max_{s} \left\vert{} V(s) - v_{\pi}(s) \right\vert{}$$

Because the discount factor $\gamma \in [0,1)$, multiplying by $\gamma^n$ makes this a **strict contraction mapping**. The expected value of our $n$-step target is guaranteed to be closer to reality than our starting guess.

## Additional Insights

### The Bias-Variance Trade-off

The choice of $n$ controls the statistical properties of your target returns :

|**Step Setting (n)**|**Primary Benefit**|**Primary Drawback**|**Required Learning Rate (α)**|
|---|---|---|---|
|**Small $n$ (TD-like)**|**Low Variance:** Few random actions are accumulated, leading to highly stable updates.|**High Bias:** Relies heavily on potentially incorrect initial value guesses.|**Higher $\alpha$** is permissible due to low statistical noise.|
|**Large $n$ (MC-like)**|**Low Bias:** Relies primarily on real-world rewards, making the target highly accurate.|**High Variance:** Accumulates transition noise over many steps.|**Smaller $\alpha$** is required to prevent value oscillations .|
