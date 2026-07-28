---
title: Batch Temporal Difference (TD) Learning
created: 2026-07-17 21:47
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

Batch TD is a reinforcement learning method where an agent repeatedly processes a fixed, pre-collected dataset of historical experiences until its value predictions fully converge, rather than updating its estimates live from real-time interactions with an environment.

## Why It Is Important (Why)

Batch TD maximizes data efficiency when gathering live experience is slow, expensive, or dangerous (such as in medical systems or robotics). It solves a major limitation of standard model-based learning: it computes the "certainty-equivalence" solution—meaning it implicitly aligns predictions with the true underlying structure of the observed data—using only $O(\vert{}\mathcal{S}\vert{})$ memory, bypassing the heavy $O(\vert{}\mathcal{S}\vert{}^3)$ computational cost of explicitly constructing and inverting massive transition probability matrices.

## How It Works (How)

### Phase 1: The Static Dataset

Instead of interacting with a live environment, we are given a fixed dataset $D$ consisting of pre-recorded episodes generated under a fixed policy $\pi$. The agent loops through this static log of transitions repeatedly.

### Phase 2: Applying the Empirical Bellman Operator

For each state $s$ present in our dataset, we calculate an updated value estimate by replacing the true environment expectations with sample averages from our records. This is driven by the **empirical Bellman operator** $\hat{\mathcal{T}}$:

$$(\hat{\mathcal{T}}V)(s)=\frac{1}{N(s)}\sum_{i=1}^{N(s)} \left[ R^{(i)}+\gamma V(S^{\prime(i)}) \right]$$

- **$(\hat{\mathcal{T}}V)(s)$**: The newly proposed value estimate for state $s$ after scanning the batch.
    
- **$N(s)$**: The total number of times state $s$ was visited across the entire dataset $D$.
    
- **$R^{(i)}$**: The actual, real-world immediate reward observed during the $i$-th transition out of state $s$.
    
- **$\gamma$**: The discount factor determining the present value of future rewards ($\gamma\in[0,1)$).
    
- **$V(S^{\prime(i)})$**: The agent's current table estimate for the next state $S^{\prime}$ that followed state $s$ in that specific logged transition.
    

### Phase 3: Reaching the Fixed-Point Equilibrium

The agent continually runs updates across the dataset until the value table stabilizes completely and stops changing. This yields the final batch $TD(0)$ fixed-point function $V^*$, satisfying the equality $\hat{\mathcal{T}}V^*=V^*$. Mathematically, this fixed point perfectly balances the **empirical model equation**:

$$V^{*}(s)=\hat{r}(s)+\gamma\sum_{s^{\prime}}\hat{p}(s^{\prime}\vert{}s)V^{*}(s^{\prime})$$

- **$\hat{r}(s)$**: The maximum-likelihood expected reward computed directly from the dataset counts ($\hat{r}(s)=\frac{1}{N(s)}\sum_{i=1}^{N(s)}R^{(i)}$).
    
- **$\hat{p}(s^{\prime}\vert{}s)$**: The empirical maximum-likelihood transition probability matrix, defined by the transition count ratio $\frac{N(s\rightarrow s^{\prime})}{N(s)}$.
    

### Phase 4: Minimizing the [[Bellman Error]]

From an optimization perspective, this repeating batch process minimizes a specific objective function. By differentiating the system and setting it to zero, it can be proven that the batch $TD(0)$ fixed point $V_{TD}$ explicitly minimizes the **Mean-Squared Bellman Error (MSBE)** on observed transitions:

$$V_{TD}=\arg\min_{V} \sum_{s}\frac{1}{N(s)}\sum_{i=1}^{N(s)}\left(R^{(i)}+\gamma V(S^{\prime(i)})-V(s)\right)^2$$

This objective minimizes the squared discrepancies between consecutive state steps across the historical log.

## Additional Insights

### Direct Comparison: Batch TD vs. Batch Monte Carlo (MC)

While both methods run repeatedly on the exact same dataset $D$, they optimize entirely different mathematical objectives and draw different conclusions from the data:

| **Feature**                  | **Batch Monte Carlo (MC)**                                                                                 | **Batch TD(0)**                                                                                       |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Optimization Target**      | Minimizes **Return Mean-Squared Error** on observed paths.                                                 | Minimizes **Mean-Squared Bellman Error** on observed transitions.                                     |
| **Mathematical Objective**   | $V_{MC}(s)=\arg\min \frac{1}{N(s)}\sum_{i=1}^{N(s)}(G^{(i)}-v)^2$                                          | $V_{TD}=\arg\min \sum_{s}\frac{1}{N(s)}\sum_{i=1}^{N(s)}(R^{(i)}+\gamma V(S^{\prime(i)})-V(s))^2$     |
| **Environmental Assumption** | Treats trajectories as independent histories; ignores state-to-state structural dependencies.              | Assumes the underlying environment is a Markov Decision Process (MDP) with a shared transition graph. |
| **Generalization**           | Tends to give zero training error on the sample trajectories but can generalize poorly to future episodes. | Generalizes significantly better to future data because it constructs a cohesive network model.       |

### A Concrete Example: The Fragmented Trajectory Problem

Imagine a simple dataset consisting of only two recorded episodes where the discount factor $\gamma = 1$:

- **Episode 1:** State $A \rightarrow$ transition to State $B$ (with an observed reward) $\rightarrow$ terminal.
    
- **Episode 2:** State $B \rightarrow$ transition straight to terminal.
    

#### How the Approaches Differ:

- **Batch Monte Carlo:** MC assesses each state based on the complete terminal returns observed after visiting them. When analyzing State $B$, it looks only at Episode 2, sees an immediate termination, and assigns $V_{MC}(B)$. When analyzing State $A$, it evaluates the entire path return of Episode 1. It does not link the fact that the $B$ in Episode 1 and the $B$ in Episode 2 are the same state; it treats them as isolated events.
    
- **Batch TD:** TD exploits the Markov property. It builds an implicit transition model : it learns that $A$ transitions to $B$ , and it averages _all_ transitions leaving $B$ to determine $B$'s structural value. By bootstrapping, the value of State $A$ automatically updates to incorporate the refined value of State $B$.
    

Because it pieces these transitions together like a puzzle, Batch TD generalizes better to future trials where an agent might visit those same states in completely new combinations.

### A Major Limitation: The Certainty-Equivalence Bias Trap

Because Batch TD explicitly fits its value function to a maximum-likelihood empirical model ($\hat{p}$ and $\hat{r}$), it relies entirely on the assumption that the data frequencies in the log accurately reflect the true probabilities of the real world.

If the dataset $D$ is small or lacks adequate exploration, the empirical transition model $\hat{p}$ will be missing critical branches or contain skewed ratios. Batch TD will completely trust these corrupted sample frequencies and converge to a highly biased value function. While Monte Carlo stays anchored directly to real, unaltered historical returns ($G^{(i)}$), Batch TD can become trapped in a distorted simulated reality if the training batch is non-representative.