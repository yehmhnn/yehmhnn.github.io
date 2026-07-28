---
title: Prioritized Sweeping
created: 2026-06-23 17:17
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

Prioritized sweeping is an advanced reinforcement learning technique that makes simulated practice highly efficient by focusing its internal training updates only on the states where the agent's knowledge is most inaccurate, rather than wasting time simulating random states.

## Why It Is Important (Why)

In standard model-based learning (like [[Dyna-Q]]), the agent picks random states from its memory to simulate during its "thinking" phase. In large or complex environments, this is incredibly inefficient because the agent wastes massive amounts of computing power practicing irrelevant or already-mastered scenarios. Prioritized sweeping solves this by working backward from major surprises (unexpected rewards or penalties), focusing only on the areas of the environment where learning will make the biggest difference.

## How It Works (How)

Instead of randomly picking states to simulate, prioritized sweeping uses a smart **priority queue** to organize its mental practice. Every state-action pair is assigned a priority score based on how much its value needs to change.

### Step 1: Real-World Experience & Surprise Calculation

The agent interacts with the real world, moves from a state $s$ to a next state $s'$ via action $a$, and receives an immediate reward $r$ . It calculates the **Bellman residual** $\delta(s,a)$, which measures the direct discrepancy between its previous expectation and newly updated reality :

$$
\delta(s,a) = \underbrace{\vphantom{\max_{a'}} r(s,a) + \gamma \max_{a'} Q(s', a')}_{\text{The New Reality (What Happened)}} - \underbrace{\vphantom{\max_{a'}} Q(s, a)}_{\text{The Old Prediction (What Was Expected)}}
$$

The absolute magnitude of this error determines its priority score $P(s,a)$:

$$
P(s,a) = \vert{}\delta(s,a)\vert{}
$$

If $P(s,a)$ is higher than a configured small threshold $\theta$, this state-action pair $(s, a)$ is pushed into a priority queue.
(Because if $\delta(s,a)$ is a big number, it means the agent's old expectations were wildly wrong, making this a high-priority "surprise" worth learning from.)

### Step 2: The Model Update

The agent logs the real-world transition into its learned deterministic environment model table $\hat{M}(s,a) = (r(s,a), f(s,a))$, updating its internal simulator:

$$
\text{Model}(s, a) \leftarrow (R, s')
$$
Breaking Down the Variables:

- **$\hat{M}$ (The Model):** Think of $\hat{M}$ as a giant look-up table or database in the AI's brain. The little hat ($\hat{\cdot}$) means it is the AI's _estimated_ guess of how the world works, not the absolute true physics of reality.
    
- **$r(s,a)$ (The Reward Predictor):** A function inside the model that answers: _"If I am in state $s$ and take action $a$, what immediate reward will the world give me?"_
    
- **$f(s,a)$ (The Transition Function):** A function inside the model that answers: _"If I am in state $s$ and take action $a$, what exact state $s'$ will I land in next?"_


### Step 3: Sweeping Through the Priority Queue

Instead of picking random states, the agent pulls the single most urgent state-action pair out of the top of its priority queue and runs a simulated Q-update on it:

$$
Q(s, a) \leftarrow Q(s, a) + \alpha \delta(s,a)
$$
$$
Q(s, a) \leftarrow Q(s, a) + \alpha [R + \gamma \max_{a'} Q(s', a') - Q(s, a)]
$$

### Step 4: Backward Propagation (The "Sweeping" Effect)

This is where the magic happens. Because the value of state $s$ just changed significantly, the agent looks at its model to find all **predecessor states**—any states that could lead _into_ $s$.

For every predecessor state ($\bar{s}$) and action ($\bar{a}$) that leads to $s$:

1. It calculates a new simulated priority: $P_{pred} = |\bar{R} + \gamma \max_{a} Q(s, a) - Q(\bar{s}, \bar{a})|$
    
2. If $P_{pred}$ exceeds the threshold, that predecessor is stuffed into the priority queue.
    
The agent repeats Steps 3 and 4 for $N$ planning steps, effectively "sweeping" the updates backward through the chain of events that led to the surprise.

>**The Localization Theorem (Why this is computationally viable):** 
>
>A major concern with backward propagation is the processing cost of updating priorities. However, it is mathematically proven that if a single value $Q(x,b)$ changes, the **only** Bellman residuals in the entire universe that can change immediately are : 
>
	1. The residual of $(x,b)$ itself (due to the direct $-Q(s,a)$ term). 
	2. The residuals of pairs inside $\text{Pred}(x)$ (due to the look-ahead $\max_{s'} Q(f(s,a),a')$ term).
>
>Because the rest of the world's residuals are entirely unaffected, the agent only needs to perform localized updates for immediate parent nodes, completely bypassing the need to sweep or check the rest of the state-space matrix.

### Variable Definitions

- **$Q(s, a)$**: The estimated long-term value of taking action $a$ in state $s$.
    
- **$P$**: The priority score (the absolute value of the error). Higher means more urgent.
    
- **$\alpha$ (Alpha)**: The learning rate.
    
- **$\gamma$ (Gamma)**: The discount factor for future rewards.
    
- **$\max_{a'} Q(s', a')$**: The maximum predicted value of the next state.
    
- **$\bar{s}, \bar{a}, \bar{R}$**: The states, actions, and rewards that immediately preceded the current state in past experiences.
    
---

## Additional Insights

### A Direct Comparison: [[Dyna-Q]] vs. Prioritized Sweeping

|**Feature**|**Standard Dyna-Q**|**Prioritized Sweeping**|
|---|---|---|
|**Planning Strategy**|**Uniform Random:** Loops through random past experiences.|**Targeted:** Loops through experiences sorted by urgency.|
|**Information Flow**|**Passive:** Value information diffuses slowly across the map.|**Active:** Surprises instantly trigger a backward chain-reaction of updates.|
|**Computational Overhead**|**Low per step:** No complex tracking or sorting required.|**High per step:** Must maintain a sorted queue and a map of predecessor states.|

### A Concrete Example: Finding Gold in a Maze

Imagine an AI learning to navigate a massive 1,000-room maze. There is a pot of gold in Room 1,000, and every other room gives a reward of 0.

- **[[Dyna-Q]]:** When the agent finally stumbles into Room 1,000, it notes the reward. During its planning phase, it picks random rooms out of its head to simulate (e.g., Room 12, Room 405). Because those rooms don't connect to the gold yet, the simulations are a waste of time. It takes thousands of real-world steps for the "knowledge" of the gold to randomly drift backward to the start of the maze.
    
- **Prioritized Sweeping:** The moment the agent hits Room 1,000, its priority queue screams. It immediately updates Room 1,000. Then, it instantly identifies Room 999 (the predecessor) and puts it at the top of the queue. On the very next simulation step, it updates Room 999, which triggers Room 998, and so on. It updates the entire winning path backward to the entrance in a single thinking cycle.

[[Prioritized Sweeping Step-by-Step example]]

### A Major Limitation: The Continuous State Nightmare

Prioritized Sweeping relies entirely on the ability to look backward and ask: _"Which specific states lead to my current state?"_ In a discrete world (like a grid, chess, or a maze), this is easy to track. However, in continuous environments (like controlling a robotic arm or steering a car where states are infinitely precise floating-point numbers), the agent almost never visits the exact same state twice. Tracking predecessors becomes mathematically messy and computationally brutal, often causing the overhead of managing the priority queue to completely break down the speed benefits of the algorithm.
(see: [[From Tables to Approximation]])

