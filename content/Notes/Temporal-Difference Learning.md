---
title: Temporal-Difference Learning
created: 2026-05-28 11:20
tags file:
---
## Core Concept

Temporal-difference (TD) learning combines two ideas: 

- [[Monte Carlo Methods]]: learn from raw experience, no model needed.

- [[Dynamic Programming]]: bootstrap — update toward an estimate based on other estimates.

### The DP / MC / TD Taxonomy

All three methodologies aim to estimate the same mathematical object, the true value function $v_{\pi}(s) = \mathbb{E}_{\pi}[G_{t}|S_{t}=s]$ , but they differ entirely in how they approximate that expectation:

| **Method**                   | **Source of Estimate** | **Backup Type**         |
| ---------------------------- | ---------------------- | ----------------------- |
| **Dynamic Programming (DP)** | Model + Bootstrap      | Full expectation backup |
| **Monte Carlo (MC)**         | Samples, No Bootstrap  | Complete return ($G_t$) |
| **Temporal-Difference (TD)** | Samples + Bootstrap    | One-step sample backup  |

![[Pasted image 20260528120513.png|486]]
(Open circles = states. Filled circles = state-action pairs. Filled square = terminal.)



## The TD(0) Algorithm (One-Step TD)

The simplest form of TD learning, known as $TD(0)$, updates the state-value function $V$ immediately following the transition from time step $t$ to $t+1$. 

### The Mathematical Update Rule

$
V(S_t) \leftarrow V(S_t) + \alpha \left[ R_{t+1} + \gamma V(S_{t+1}) - V(S_t) \right]
$

Where:

- $\alpha$ is the learning rate (step-size).
    
- $\gamma$ is the discount factor.
    
- $R_{t+1} + \gamma V(S_{t+1})$ is known as the **TD Target**.
    

## The TD Error ($\delta_t$)

The quantity inside the brackets of the update rule measures the discrepancy between the estimated value of a state and a better, updated estimate available one step later. This is called the **TD Error**:

$
\delta_t \doteq R_{t+1} + \gamma V(S_{t+1}) - V(S_t)
$

### Key Insights:

- **The Core Mechanism:** If $\delta_t > 0$, the transition turned out better than expected, so $V(S_t)$ is adjusted upward. If $\delta_t < 0$, it was worse, and $V(S_t)$ is adjusted downward.
    
- **Neuroscience Link:** In computational neuroscience, spiking patterns of dopamine neurons in the brain have been shown to map almost perfectly to this mathematical TD error signal.
    

## Comparison: TD vs. Monte Carlo

|**Dimension**|**Monte Carlo (MC)**|**Temporal-Difference (TD)**|
|---|---|---|
|**Update Frequency**|**End of Episode:** Must wait until a terminal state is reached to compute the total return $G_t$.|**Step-by-Step:** Updates online after every single action taken ($S_t \to A_t \to R_{t+1} \to S_{t+1}$).|
|**Task Compatibility**|Strictly limited to **episodic tasks**.|Works flawlessly on both **episodic** and **continuing tasks**.|
|**Bias / Variance**|**Zero Bias, High Variance:** Estimates are mathematically true to experience, but highly sensitive to random events across long trajectories.|**High Bias, Low Variance:** Relies on an initial guess (bias), but fluctuations are small because it updates based on single-step intervals.|
|**Data Efficiency**|Often requires more data to stabilize due to high variance.|Typically converges faster than MC in practice by capitalizing on step-level feedback.|


## The Spectrum of RL Foundations

Sutton & Barto contextualize TD by comparing how information flows across the three foundational paradigms:

1. **[[Dynamic Programming]]:** Explores all possible transitions using a model; relies on bootstrapping (guesses) rather than real experience.
    
2. **[[Monte Carlo Methods]]:** Explores single trajectories using real experience; does **not** bootstrap (waits for final outcomes).
    
3. **Temporal-Difference:** Explores single trajectories using real experience; **and** relies on bootstrapping to update step-by-step.
    

## Connections

- **[[Monte Carlo Methods]]:** Represents the non-bootstrapping alternative where the step horizon $n \to \infty$.
    
- **[[n-step Bootstrapping]]:** The generalized architecture that unifies TD(0) and Monte Carlo by looking $n$ steps into the future before making an update.
    
- **[[SARSA]] & [[Q-Learning]]:** The control frameworks that apply this specific TD(0) value prediction concept to action-selection policies.