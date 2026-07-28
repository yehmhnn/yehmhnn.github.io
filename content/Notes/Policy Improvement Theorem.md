---
title: Policy Improvement Theorem
created: 2026-07-19 07:57
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

The Policy Improvement Theorem states that if a new strategy selects actions—or a probabilistic blend of actions—whose immediate expected return is at least as good as the current strategy's value at every step, then adopting this new strategy permanently is mathematically guaranteed to yield an overall equal or superior expected outcome across all situations.

## Why It Is Important (Why)

The biggest benefit of the Policy Improvement Theorem is that it provides a strict mathematical guarantee that a strategy can be updated step-by-step without the risk of making the agent's overall performance worse. Instead of relying on blind trial and error, it allows reinforcement learning algorithms to confidently make local updates to an agent's behavior, knowing that these changes will always compound into global optimization.

## How It Works (How)

The theorem proves that local, short-term smart choices inevitably compound into global, long-term domination through four logical phases. This formulation accounts for both **deterministic** choices (picking one definitive action) and **stochastic** choices (probabilistic balancing).

### Phase 1: Evaluating the Baseline Strategy

Before making an improvement, we must know how well the current strategy (policy $\pi$) performs. We measure this using the state-value function, which calculates the total expected long-term reward from any given starting point:

$$v_\pi(s)$$

- $v_\pi$: The state-value function under the current strategy, representing the total expected future reward.
    
- $s$: The current state or situation the agent is experiencing.
    

### Phase 2: Evaluating the Blended New Strategy

Next, we look at an alternative strategy, $\pi'$. Because strategies can be probabilistic, $\pi'$ might distribute probabilities across several actions. We calculate the expected value of taking a single step under this new strategy before immediately reverting back to our old strategy $\pi$ for all remaining steps:

$$\sum_{a \in \mathcal{A}} \pi'(a\vert{}s) q_{\pi}(s,a)$$

- $q_{\pi}(s,a)$: The action-value function, which estimates the total return of taking a specific action $a$ right now and following the old policy $\pi$ thereafter.
    
- $\pi'(a\vert{}s)$: The probability (e.g., $0.7$ or $70\%$) that the new strategy $\pi$ will choose action $a$ when in state $s$. _(Note: In a simple deterministic policy, this collapses down to a single chosen action, written simply as $q_\pi(s, \pi'(s))$)_.
    
- $\sum_{a \in \mathcal{A}}$: The summation over all possible actions. This multiplies each action's value by the probability of choosing it, calculating a weighted average (expected value) of the new policy's first step.
    

### Phase 3: Meeting the Local Condition

The core mechanism of the theorem requires that this new blend of choices meets or exceeds the baseline performance for **every single state** in the environment:

$$\sum_{a \in \mathcal{A}} \pi'(a\vert{}s) q_{\pi}(s,a) \geq v_{\pi}(s)$$

- $\geq$: Represents the strict requirement that the new blend of choices cannot perform worse on average than the old baseline. If this inequality holds true across the entire environment, the local condition for improvement is satisfied.
    

### Phase 4: Expanding to Global Domination

Through mathematical induction, the theorem proves that if the local condition holds true everywhere, the benefit propagates forward in time. If changing the strategy at step one is better, then changing it at step two, step three, and infinitely into the future will be even better. This leads to the final global guarantee:

$$v_{\pi'}(s) \geq v_\pi(s)$$

- $v_{\pi'}(s)$: The complete long-term expected value of adopting the new strategy $\pi'$ for all steps.
    
- This formula ensures that the total expected rewards under the new policy will be equal to or greater than the rewards under the old policy for every state.
    

> 🔗 **Mathematical Proof:** For the rigorous step-by-step derivation of how this single-step inequality expands into an infinite-horizon global guarantee, see the sub-note: [[Proof of Policy Improvement Theorem]].

### Phase 5: Reaching the Convergence Endpoint (Optimality)

If we continue updating our strategy greedily, we eventually hit a threshold where the new strategy $\pi'$ is no better or worse than our current strategy $\pi$. When $\pi' = \pi$, the local optimization loop stops because we have maximized our options:

$$v_\pi(s) = q_\pi(s, \pi'(s)) = \max_{a \in \mathcal{A}} q_\pi(s, a)$$

- $\max_{a \in \mathcal{A}} q_\pi(s, a)$: This signifies that the actions our strategy is already taking match the absolute maximum value available across all choices. When this occurs, the policy has satisfied the Bellman Optimality Equation, proving that the algorithm has successfully converged to the absolute best possible strategy ($v_\pi = v^*$).
    

> 🔗 **Optimality Proof:** For the mathematical breakdown of how this stopping condition uniquely identifies the absolute best strategy, see the sub-note: [[Proof of Policy Improvement Optimality]].
## Additional Insights

### The Probability Paradox: How Can an Average Guarantee an Upgrade?

If a policy is probabilistic, a random run _could_ theoretically result in a lower reward on a specific turn. How does the theorem guarantee it never gets worse?

1. **Value Functions are Already Averages:** The baseline $v_\pi(s)$ isn't a promise of a fixed reward; it is already the _average_ reward the old policy gets over thousands of tries.
    
2. **The "Blended Portfolio" is Better:** Imagine your old strategy always chooses an action that gives you a $\$10$ reward. Your new strategy chooses that same action $50\%$ of the time, and a different action that gives $\$20$ the other $50\%$ of the time. The weighted average of your new strategy is $(0.5 \times \$10) + (0.5 \times \$20) = \$15$. Even though there is a chance you only get $\$10$ on a single try, the _overall strategy_ is mathematically guaranteed to average $\$15$, which is strictly better than the old average of $\$10$.
    
3. **The Guarantee is Monotonic:** Because the condition must hold true for **all** states, no matter where the probabilities bounce the agent next, it will land in a state where the new policy is _also_ better or equal than the old one. The "bad luck" options never accumulate enough to drag the overall average below the old baseline.
    

### A Concrete Example

Imagine a chess-playing AI. Under its old strategy ($\pi$), when it is in a specific board state ($s$), it always plays a conservative move that leads to a win rate of $60\%$ ($v_\pi(s) = 0.60$).

It tests a new, creative strategy ($\pi'$). This new strategy decides to split its choices at this board state: $80\%$ of the time it plays an aggressive move with an $85\%$ win rate, and $20\%$ of the time it plays a defensive move with a $50\%$ win rate.

We calculate the weighted average of this new first step:

$$\text{New Average} = (0.80 \times 0.85) + (0.20 \times 0.50) = 0.68 + 0.10 = 0.78\text{ (or }78\%\text{)}$$

Because $78\% \geq 60\%$, the local condition is met. Even though the defensive move by itself is worse ($50\% < 60\%$), the _overall blend_ of the new strategy is superior. The Policy Improvement Theorem guarantees that if the AI permanently adopts this new strategy, its long-term average win rate across all future games will strictly increase or stay the same.

### A Direct Comparison: Policy Evaluation vs. Policy Improvement

|**Concept**|**Primary Goal**|**Core Question Answered**|**Mathematical Tool**|
|---|---|---|---|
|**Policy Evaluation**|Measure performance.|"How good is my current strategy on average?"|Computes $v_\pi(s)$ using the Bellman expectation equation.|
|**Policy Improvement**|Change behavior.|"How can I change my action probabilities to get a higher average?"|Updates $\pi \rightarrow \pi'$ using the Policy Improvement Theorem.|

### A Major Limitation

The theorem assumes **perfect model knowledge** or infinitely accurate estimates of the value functions ($v_\pi$ and $q_\pi$). In real-world applications, value functions are often approximated using neural networks or sampled from limited, noisy experience. If the estimates of $q_\pi(s, a)$ contain errors, the calculated average might look better on paper while actually being worse in reality, breaking the theorem's real-world guarantee.