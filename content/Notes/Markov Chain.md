---
title: "Markov Chain"
created: "2026-06-23 14:42"
tags file:
---
## The Definition (What)

A Markov Chain is a mathematical model that describes a sequence of possible events where the probability of transitioning to the next state depends solely on the current state, completely ignoring past history.

## Why It Is Important (Why)

Real-world dynamic systems are often too complex to model if every future prediction requires tracking their entire history of past actions. Markov Chains solve this memory bottleneck by introducing the **Markov Property** (memorylessness), drastically simplifying predictions and enabling efficient modeling of stochastic processes in physics, finance, text generation, and algorithms like Google's PageRank or [[Markov Chain Monte Carlo|MCMC]].

## How It Works (How)

A Markov Chain models a system jumping between discrete states according to fixed probabilistic transition rules.

### Phase 1: The Memoryless Rule (The Markov Property)

The foundational rule of a Markov Chain is that given the present state $X_t$, the future state $X_{t+1}$ is conditionally independent of all past states $(X_0, X_1, \dots, X_{t-1})$:

$$P(X_{t+1} = j \mid X_t = i, X_{t-1} = i_{t-1}, \dots, X_0 = i_0) = P(X_{t+1} = j \mid X_t = i) = P_{ij}$$

- $X_t$: The state of the system at time step $t$.
    
- $P_{ij}$: The **transition probability** of moving directly from state $i$ to state $j$ in one time step.
    
- **Intuitive Meaning:** The system has "no memory." It doesn't matter how or why you arrived at state $i$; only where you are _right now_ dictates where you can go _next_.
    

### Phase 2: State Transitions & The Matrix Representation

To track all possible moves across $N$ possible states, probabilities are organized into a square $N \times N$ matrix called the **Transition Matrix** $P$:

$$P = \begin{bmatrix} P_{11} & P_{12} & \dots & P_{1N} \\ P_{21} & P_{22} & \dots & P_{2N} \\ \vdots & \vdots & \ddots & \vdots \\ P_{N1} & P_{N2} & \dots & P_{NN} \end{bmatrix}$$

- Every entry $P_{ij} \ge 0$ represents the likelihood of transitioning from row $i$ to column $j$.
    
- **Row Stochastic Property:** Each row must sum to exactly $1.0$ ($\sum_{j=1}^N P_{ij} = 1$), because the system must transition to _some_ valid state in the next step.
    

### Phase 3: Multi-Step Forecasting (The Chapman-Kolmogorov Equation)

To predict the probability distribution $k$ steps into the future ($\pi^{(t+k)}$) given a current state distribution $\pi^{(t)}$, you repeatedly multiply the probability vector by the transition matrix:

$$\pi^{(t+k)} = \pi^{(t)} P^k$$

- $\pi^{(t)}$: A row vector containing the current probabilities of being in each state.
    
- $P^k$: The transition matrix raised to the power of $k$.
    

### Phase 4: Long-Term Equilibrium (Stationary Distribution)

Under certain conditions (if the chain is _ergodic_—meaning it is possible to eventually go from any state to any other state without getting stuck in a strict repeating cycle), the system eventually settles into a steady state called the **Stationary Distribution** $\pi$:

$$\pi P = \pi$$

- $\pi$: The long-term equilibrium vector where state probabilities no longer change from step to step, regardless of where the chain originally started ($X_0$).
    

## Additional Insights

### Concrete Example: Simple Weather Model

Imagine predicting tomorrow's weather using two states: **Sunny ($S$)** and **Rainy ($R$)**.

- **Transition Rules:**
    
    - If today is Sunny: $80\%$ chance tomorrow is Sunny, $20\%$ chance tomorrow is Rainy.
        
    - If today is Rainy: $40\%$ chance tomorrow is Sunny, $60\%$ chance tomorrow is Rainy.
        
- **Transition Matrix ($P$):**
    
    $$\begin{bmatrix} 0.8 & 0.2 \\ 0.4 & 0.6 \end{bmatrix}$$
    
- **Memorylessness in Action:** If today is Sunny, the probability of tomorrow being Sunny is $80\%$, regardless of whether it rained for the past 10 days straight or was sunny for a month.
    

### Direct Comparison: Markov Chain vs. Recurrent Neural Network (RNN)

|**Feature**|**Markov Chain**|**Recurrent Neural Network (RNN)**|
|---|---|---|
|**Memory State**|**Memoryless:** Strictly relies only on the current state $X_t$.|**Long Memory:** Retains a hidden state vector $h_t$ tracking temporal context across many steps.|
|**Underlying Math**|Discrete matrix operations & fixed transition probabilities $P_{ij}$.|Continuous non-linear weight transformations ($W_{hh}, W_{xh}$).|
|**Interpretability**|Transparent and exact analytical properties (stationary distribution).|Complex black-box representation.|

### A Major Limitation: The Memoryless Assumption Breaks Down

- **Context Blindness:** Many real-world processes depend heavily on past context. For example, in natural language processing, predicting the next word based _only_ on the current word (a 1st-order Markov Chain) yields nonsense text (e.g., "The" $\to$ "cat" $\to$ "sat" $\to$ "the"...).
    
- **Workarounds:** Higher-order Markov Chains consider the last $n$ states ($P(X_{t+1} \mid X_t, X_{t-1}, \dots, X_{t-n+1})$), but this causes the state space and matrix size to explode exponentially ($N^n$), quickly running out of computational memory.