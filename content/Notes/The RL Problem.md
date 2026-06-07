---
title: The RL Problem
create: 2026-05-11 14:10
tags file:
  - "[[Reinforcement Learning]]"
---
## Core Concept

The reinforcement learning problem is framed as a continuous, discrete-time interaction between a learning decision-maker (the **Agent**) and everything outside of it (the **Environment**).

```
    ┌─────────────────────────────────────────┐
    │                                         │
    ▼                                         │
┌───────┐         Action ($A_t$)           ┌─────────────┐
│       ├─────────────────────────────────>│             │
│ Agent │                                  │ Environment │
│       │<─────────────────────────────────┤             │
└───────┘    Reward ($R_t$), State ($S_t$)  └─────────────┘
```

The interaction forms a sequence or trajectory:

$$S_0, A_0, R_1, S_1, A_1, R_2, S_2, A_2, R_3, \dots$$

## Key Components

### 1. The Boundary

- **Agent:** The entity that makes decisions, executes actions, and learns to maximize rewards. It contains the policy and the value function updates.
    
- **Environment:** Everything else. Crucially, things the agent cannot arbitrarily change (like physical laws, market dynamics, or its own physical robot body) are considered part of the environment.
    

### 2. The Interaction Signals

- **State ($S_t \in \mathcal{S}$):** The environment's current condition or configuration as perceived by the agent at time step $t$.
    
- **Action ($A_t \in \mathcal{A}(s)$):** The choice made by the agent at time step $t$ given the current state.
    
- **Reward ($R_t \in \mathcal{R} \subset \mathbb{R}$):** The scalar numerical feedback received from the environment as a direct consequence of the action $A_{t-1}$ taken in state $S_{t-1}$.
    

## Environment Dynamics

In a finite framework, the mechanics of the environment are fully defined by a single probability distribution function, $p$, which dictates how the next state and reward are generated:

$$p(s', r \mid s, a) \doteq \Pr\{S_t = s', R_t = r \mid S_{t-1} = s, A_{t-1} = a\}$$

For all $s \in \mathcal{S}, a \in \mathcal{A}(s), s' \in \mathcal{S}$, and $r \in \mathcal{R}$, this function must satisfy the laws of probability:

$$\sum_{s' \in \mathcal{S}} \sum_{r \in \mathcal{R}} p(s', r \mid s, a) = 1$$

## Connections

- **[[Markov Decision Processes (MDPs)]]:** The formal mathematical definition when the environment dynamics function $p$ satisfies the Markov property.
    
- **[[Goals and Rewards]]:** Explains how the $R_t$ signal dictates the agent's entire purpose.
    

---

Reward vs Value:

|**Feature**|**Reward (R)**|**Value (V or Q)**|
|---|---|---|
|**Timing**|Immediate feedback.|Future expectation.|
|**Definition**|What the agent gets _now_.|What the agent expects to get _later_.|
|**Reliability**|Explicit and objective.|Estimated and subjective (based on policy).|
|**Goal**|To define the task.|To solve the task efficiently.|

