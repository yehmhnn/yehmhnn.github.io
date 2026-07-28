---
title: epsilon-Greedy
created: 2026-05-26 19:57
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

Epsilon-Greedy is a decision-making strategy that balances exploring unknown options to discover better choices with exploiting the best-known option to maximize immediate rewards.

## Why It Is Important (Why)

It provides a lightweight, adaptable solution to the fundamental **exploration vs. exploitation dilemma**, preventing reinforcement learning agents from getting permanently trapped in sub-optimal habits early on while keeping computational overhead minimal.

## How It Works (How)

### Phase 1: Allocating the Exploration Budget ($\epsilon$)

Before training begins, you define an exploration parameter $\epsilon \in (0, 1]$. This parameter represents the fixed probability budget reserved strictly for sampling actions at random. The remaining probability, $1 - \epsilon$, is dedicated entirely to choosing the single best-performing option available.

### Phase 2: Formal Policy Distribution ($\epsilon$-Soft Policy)

To model the agent's behavior across states $s$, we define a formal policy distribution $\pi(a \mid s)$, which gives the exact probability of choosing any action $a$ from the set of available actions $\mathcal{A}(s)$.

Because random exploration distributes its probability share $\epsilon$ **uniformly** across all $\vert{}\mathcal{A}(s)\vert{}$ actions, every action—including the current best—receives an equal slice of the exploration pool:

$$\text{Exploration share per action} = \frac{\epsilon}{\vert{}\mathcal{A}(s)\vert{}}$$

Combining exploitation and exploration into a unified policy yields:

$$\pi(a \mid s) = \begin{cases} 1 - \epsilon + \frac{\epsilon}{\vert{}\mathcal{A}(s)\vert{}} & \text{if } a \text{ is the greedy action } (\arg\max_{a'} Q(s, a')) \\ \frac{\epsilon}{\vert{}\mathcal{A}(s)\vert{}} & \text{if } a \text{ is a non-greedy action} \end{cases}$$

- **Non-Greedy Actions:** Can only be selected when the agent decides to explore. Their selection chance is strictly their uniform fraction of the exploration budget: $\frac{\epsilon}{\vert{}\mathcal{A}(s)\vert{}}$.
    
- **The Greedy Action:** Can be selected in two ways—intentionally during an exploitation step ($1 - \epsilon$), or accidentally during an exploration step ($\frac{\epsilon}{\vert{}\mathcal{A}(s)\vert{}}$). Adding both scenarios together gives $1 - \epsilon + \frac{\epsilon}{\vert{}\mathcal{A}(s)\vert{}}$.
    

> Because $\frac{\epsilon}{\vert{}\mathcal{A}(s)\vert{}} > 0$ for every action, every choice retains a non-zero probability of selection. In reinforcement learning theory, this classification is known as an **$\epsilon$-soft policy**.

### Phase 3: Operational Decision Rule

During execution at time step $t$, the agent draws a random float $r$ uniformly from $[0, 1]$ to make its decision:

- **Exploration ($r < \epsilon$):** Pick an action $a_t$ uniformly at random from $\mathcal{A}(s)$.
    
- **Exploitation ($r \ge \epsilon$):** Pick the action with the highest estimated expected value:
    
    $$a_t = \arg\max_{a \in \mathcal{A}(s)} Q_t(s, a)$$
    

### Phase 4: Value Updates & Decay

After taking action $a_t$ in state $s$ and receiving reward $R_t$, the algorithm updates its state-action value estimate $Q(s, a_t)$:

$$Q_{t+1}(s, a_t) = Q_t(s, a_t) + \alpha \left[ R_t - Q_t(s, a_t) \right]$$

Here, $\alpha \in (0, 1]$ is the learning rate, and $\left[ R_t - Q_t(s, a_t) \right]$ is the prediction error.

To prevent the agent from acting randomly forever, an operational variation decays $\epsilon$ over time $t$:

$$\epsilon_t = \frac{\epsilon_0}{1 + \delta \cdot t}$$

As $t \to \infty$, the exploration rate $\epsilon_t \to 0$, smoothly transitioning the policy from broad initial discovery toward pure exploitation once value estimates stabilize.

## Additional Insights

### A Concrete Example: Restaurant Selection

Imagine choosing where to eat dinner each night:

- **Exploitation ($1 - \epsilon$ of the time):** You go to your favorite reliable spot that consistently yields a 9/10 experience ($Q(s, a) = 9$).
    
- **Exploration ($\epsilon$ of the time):** You roll a die and pick a venue completely at random. It could be a 2/10 failure or an undiscovered 10/10 masterpiece. If it turns out to be a 10/10, its stored value $Q(s, a)$ rises, redefining what your default spot will be during future exploitation steps.
    

### When to Use It (On-Policy Context)

- **Real-World / Online Trajectories:** Because $\epsilon$-greedy forces the agent to experience its own random mistakes firsthand while learning, it naturally builds value estimates that account for risk (an **on-policy** property).
    
- **Vast State Spaces:** Ideal for complex environments where forcing explicit initial exploration across every single state-action pair is computationally impossible.
    

### A Direct Comparison: $\epsilon$-Greedy vs. Upper Confidence Bound (UCB)

|**Feature**|**ϵ-Greedy**|**Upper Confidence Bound (UCB)**|
|---|---|---|
|**Exploration Strategy**|**Undirected / Random:** Treats all non-greedy choices identically regardless of uncertainty.|**Directed / Optimistic:** Prioritizes choices with high uncertainty or high potential upside.|
|**Selection Formula**|$a_t = \text{Random}$ (if $r < \epsilon$)|$a_t = \arg\max_{a} \left[ Q_t(a) + c \sqrt{\frac{\ln t}{N_t(a)}} \right]$|
|**Overhead**|Minimal; basic random number generation.|High; must record action visit counts $N_t(a)$ and compute confidence bounds.|

### A Major Limitation: Blind Randomness

Standard $\epsilon$-greedy makes no distinction between a disastrous option (a known 1/10) and a promising unknown option (an untested 8/10). During an exploration step, both receive the exact same selection probability $\frac{\epsilon}{\vert{}\mathcal{A}(s)\vert{}}$. In high-stakes environments (e.g., autonomous driving or medical trials), this lack of directed caution can lead to costly or dangerous exploratory actions.