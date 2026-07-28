---
title: "Law of Total Expectation"
created: "2026-07-22 12:15"
tags file:
---
## The Definition (What)

The Law of Total Expectation (also known as the **Tower Property**) states that you can calculate the overall average of a random variable by first calculating the average for specific subsets or conditions, and then taking the average of those subset averages weighted by how likely each condition occurs.

## Why It Is Important (Why)

It provides a "divide-and-conquer" mechanism for probability problems involving multi-stage or sequential processes. Calculating the total expectation of a complex, long-horizon variable directly is often mathematically intractable; conditioning on intermediate outcomes breaks the overall expectation into smaller, manageable single-step calculations.

## How It Works (How)

The Law of Total Expectation operates through a logical progression that connects conditional expectations to an overall expectation:

### Phase 1: Conditioning on a Sub-Scenario

Suppose you want to find the expected value $\mathbb{E}[X]$ of a random variable $X$ that depends on another random variable $Y$. You first compute the expectation of $X$ given that $Y$ takes on a specific value $y$:

$$\mathbb{E}[X \mid Y = y]$$

This evaluates the expected outcome of $X$ strictly within the subset of outcomes where $Y = y$.

### Phase 2: Treating Conditional Expectation as a Random Variable

Since the value of $Y$ varies across trials, the conditional expectation $\mathbb{E}[X \mid Y]$ is not a fixed scalar—it is itself a random variable whose value depends on $Y$.

### Phase 3: The General Mathematical Identity

To recover the overall expected value $\mathbb{E}[X]$, you calculate the expectation of this conditional random variable over all possible realizations of $Y$:

$$\mathbb{E}[X] = \mathbb{E}_{Y}\left[ \mathbb{E}[X \mid Y] \right]$$

For discrete random variables $Y$, this expands directly into a weighted sum:

$$\mathbb{E}[X] = \sum_{y} P(Y = y) \cdot \mathbb{E}[X \mid Y = y]$$

Here, $\mathbb{E}[X \mid Y = y]$ is the conditional average for scenario $y$, and $P(Y = y)$ is the probability weight of scenario $y$ occurring.

### Phase 4: Application in Reinforcement Learning

In reinforcement learning, we aim to derive the action-value function:

$$q_{\pi}(s,a) = \mathbb{E}_{\pi}[G_t \mid S_t=s, A_t=a]$$

Since the total return is recursive ($G_t = R_{t+1} + \gamma G_{t+1}$), evaluating $G_t$ directly over an infinite future horizon is difficult. We apply the Law of Total Expectation by conditioning on the immediate next state and reward outcome $(S_{t+1}, R_{t+1}) = (s', r)$:

$$q_{\pi}(s,a) = \sum_{s', r} p(s', r \mid s, a) \cdot \mathbb{E}_{\pi}[R_{t+1} + \gamma G_{t+1} \mid S_t=s, A_t=a, S_{t+1}=s', R_{t+1}=r]$$

By law of total expectation, this transforms a complex multi-step trajectory expectation into a weighted sum of single-step transition probabilities $p(s', r \mid s, a)$ multiplied by the expected future return from next state $s'$.

## Additional Insights

### A Concrete Example

To calculate the average salary of all graduates from a university ($\mathbb{E}[X]$):

1. **Conditioning:** Calculate the average salary for each individual major ($Y$), such as $\mathbb{E}[X \mid Y = \text{Engineering}]$ or $\mathbb{E}[X \mid Y = \text{Arts}]$.
    
2. **Weighting:** Multiply each major's average salary by the proportion of total graduates who completed that major ($P(Y = y)$).
    
3. **Recombination:** Sum these values together. The result matches the exact average salary of the entire graduate population.
    

### A Direct Comparison: Law of Total Expectation vs. Law of Total Probability

- **Law of Total Probability:** Used to find the total _probability of an event_ $A$ by summing conditional probabilities across scenarios:
    
    $$P(A) = \sum_y P(A \mid Y=y)P(Y=y)$$
    
- **Law of Total Expectation:** Used to find the total _average value of a numerical quantity_ $X$ by summing conditional expectations across scenarios:
    
    $$\mathbb{E}[X] = \sum_y \mathbb{E}[X \mid Y=y]P(Y=y)$$
    

_(Note: The Law of Total Probability is actually a specific instance of the Law of Total Expectation where $X$ is an indicator variable taking the value $1$ if event $A$ occurs and $0$ otherwise)._