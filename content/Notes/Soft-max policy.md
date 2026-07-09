---
title: Soft-max policy
created: 2026-07-05 21:23
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

A Soft-max policy is a decision-making strategy in reinforcement learning that chooses actions randomly based on their predicted worth, giving better actions a higher chance of being picked while keeping a small window open for less optimal choices.

## Why It Is Important (Why)

It solves the classic "exploration vs. exploitation" dilemma much more intelligently than rival methods like [[epsilon-Greedy]]. Instead of blindly picking a completely random (and potentially disastrous) action when it wants to explore, Soft-max ranks alternatives based on their estimated value—meaning the second-best action gets explored far more often than the absolute worst one.

## How It Works (How)

1. **Assign Value:** The agent calculates or retrieves a preference value (often called a Q-value) for every available action in its current state.
    
2. **Apply Exponents:** The policy raises Euler's number $e$ to the power of each action's value, which ensures all negative values become positive and accentuates the differences between high and low scores.
    
3. **Adjust with Temperature:** A tuning knob called "temperature" ($\tau$) is introduced to scale these values, dictating how adventurous or cautious the agent should be.
    
4. **Normalize:** The agent divides each action's exponentiated value by the sum of all actions' exponentiated values, turning the scores into a neat probability distribution that adds up to 100%.
    

The mathematical formula for this mechanism is:

$$P(a|s) = \frac{e^{Q(s, a) / \tau}}{\sum_{b} e^{Q(s, b) / \tau}}$$

- $P(a|s)$: The probability of choosing a specific action $a$ given the current state $s$.
    
- $Q(s, a)$: The estimated value or preference of action $a$ in state $s$.
    
- $e$: The mathematical constant (Euler's number, $\approx 2.718$).
    
- $\tau$ (tau): The **temperature parameter**.
    
    - A high temperature ($\tau \to \infty$) makes all actions almost equally likely (pure exploration).
        
    - A low temperature ($\tau \to 0$) forces the agent to almost always pick the highest-rated action (pure exploitation).
        
- $\sum_{b}$: The sum total calculated across all possible actions $b$ to normalize the probabilities.
    

## Additional Insights

### A Direct Comparison ($\epsilon$-Greedy vs. Soft-max)

Imagine you are picking a restaurant for dinner.

- An **$\epsilon$-greedy policy** will choose your favorite spot 90% of the time. The other 10% of the time, it flips a coin and might send you to a highly-rated new bistro _or_ a notoriously terrible dumpster-fire buffet with equal probability. It randomizes without looking at the menu.
    
- A **Soft-max policy** scales its choices. It will heavily favor your top favorite, frequently try the runner-up bistro, and almost completely ignore the dumpster-fire buffet because its value score is so low.
    

### A Major Limitation: The Temperature Trap

Soft-max is highly sensitive to the scaling of its value estimates ($Q$-values) and requires delicate tuning of the temperature parameter ($\tau$). If your agent's value estimates change drastically during training, a static temperature will break the system. If $\tau$ is set too low too early, the agent locks into sub-optimal habits and stops learning. If it's too high, the agent acts like it has short-term memory loss, wandering around randomly because it can't tell the difference between a great action and a mediocre one.