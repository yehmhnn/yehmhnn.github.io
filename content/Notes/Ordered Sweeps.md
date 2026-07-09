---
title: "Ordered Sweeps"
created: "2026-06-23 18:01"
tags file:
---
A **Sweep** defines a systematic, ordered method for choosing which states and actions to update during the planning phase of model-based reinforcement learning, replacing uniform random sampling.

To see the math clearly, consider a **deterministic chain [[Markov Decision Processes (MDPs)]]** with states $0, 1, \dots, L$, where all rewards are $0$ except the final transition to the terminal state, which gives $r_{L-1} = 1$. Assuming an update learning rate of $\alpha = 1$ , the [[Dyna-Q]] planning backup formula simplifies to:

$$Q(i,a) \leftarrow r_i + \gamma Q(i+1,a)$$

## Types of Sweeps

### 1. Forward Sweep

Processes transitions systematically in chronological order from the starting state to the goal state:

$$(0, a), (1, a), \dots, (L-1,a)$$

#### The Math:

When running a forward sweep on a blank Q-table ($Q \equiv 0$):

- **For state 0:** $Q(0,a) \leftarrow 0 + \gamma Q(1,a) = 0 + \gamma(0) = 0$
    
- **For state 1:** $Q(1,a) \leftarrow 0 + \gamma Q(2,a) = 0 + \gamma(0) = 0$
    
- $\dots$
    
- **For the final predecessor state:** $Q(L-1,a) \leftarrow 1 + \gamma Q(L,a) = 1 + \gamma(0) = 1$
    

> **Limitation:** During its first pass, a forward sweep only updates the final predecessor state nontrivially ($Q(L-1,a) = 1$). Information moves incredibly slowly, creeping backward by only one state per entire sweep.

### 2. Backward Sweep

Processes transitions in reverse topological order, starting from the goal state and moving backward to the initial state:

$$(L-1, a), (L-2, a), \dots, (0,a)$$

#### The Math:

When running a backward sweep on a blank Q-table ($Q \equiv 0$):

- **For state L-1:** $Q(L-1,a) \leftarrow 1 + \gamma Q(L,a) = 1 + \gamma(0) = 1$
    
- **For state L-2:** $Q(L-2,a) \leftarrow 0 + \gamma Q(L-1,a) = 0 + \gamma(1) = \gamma$
    
- **For state L-3:** $Q(L-3,a) \leftarrow 0 + \gamma Q(L-2,a) = 0 + \gamma(\gamma) = \gamma^2$
    

By induction, the general value for any state $i$ after exactly one backward sweep is:

$$Q(i,a) = \gamma^{L-1-i}$$

> **Advantage:** Because each state lookup uses the value of its successor that was _just updated_ a fraction of a second earlier, a backward sweep propagates a terminal reward completely upstream to all predecessor states in **just a single pass**.

## Application in Dyna-Q

Sweeps modify **Step 3A (Query the Model)**. Instead of picking a random state-action pair to practice, the agent systematically "sweeps" through the environment structure using these mathematical patterns to dramatically optimize how quickly sparse reward information spreads through the Q-table.