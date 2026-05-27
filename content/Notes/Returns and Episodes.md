---
title: Returns and Episodes
create: 2026-05-26 14:57
tags file:
  - "[[Reinforcement Learning]]"
---
## Core Concept

The **return**, denoted as $G_t$, is the specific mathematical function of the reward sequence that the agent seeks to maximize over time. How we define $G_t$ depends heavily on the nature of the task sequence.

## Task Typologies

### 1. Episodic Tasks

Tasks where the agent-environment interaction naturally breaks down into distinct, self-contained sequences called **episodes**. Each episode ends in a special state called the **terminal state**.

- **Examples:** Games (chess, Atari), a maze run, a driving simulation trip.
    
- **The Return Formula:** For an episode ending at final time step $T$:
    

$$G_t \doteq R_{t+1} + R_{t+2} + R_{t+3} + \dots + R_T = \sum_{k=0}^{T-t-1} R_{t+k+1}$$

### 2. Continuing Tasks

Tasks where the interaction goes on indefinitely without a natural termination point.

- **Examples:** An automated stock-trading bot, a continuous process control system in a chemical factory.
    
- **The Infinite Return Problem:** If a task goes on forever, the un-discounted sum of rewards could reach infinity ($\infty$), making it impossible to compare different actions.
    

## The Discount Factor ($\gamma$)

To make the math work for continuing tasks—and to model the preference for immediate rewards over distant ones—we introduce the **discount factor**, $\gamma$ (gamma), where $0 \le \gamma \le 1$.

### The Discounted Return Formula

$$G_t \doteq R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \dots = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}$$

### Behavioral Impact of $\gamma$

- **$\gamma = 0$ (Myopic/Short-sighted):** The agent only cares about the immediate reward $R_{t+1}$ and completely ignores the future consequences of its actions.
    
- **$\gamma \to 1$ (Far-sighted):** The agent becomes highly sensitive to long-term rewards, evaluating current choices based on what will happen many steps down the line.
    

### The Recursive Property of Returns

A critical mathematical trick used throughout all of RL is that the return at time $t$ can be written recursively using the return from time $t+1$:

$$G_t = R_{t+1} + \gamma G_{t+1}$$

## 🔗 Connections

- **[[Markov Decision Processes (MDPs)]]**: Provides the formal framework where these returns are tracked.
    
- **[[Bellman Equations]]**: Directly derived by taking the mathematical expectation of the recursive return property ($G_t = R_{t+1} + \gamma G_{t+1}$).
    