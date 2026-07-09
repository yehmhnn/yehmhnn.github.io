---
title: Model-Free vs Model-Based and On-Policy vs Off-Policy
created: 2026-06-20 18:37
tags file:
  - "[[Reinforcement Learning]]"
---
Think of them as two different questions you ask about an algorithm.

### Axis 1: Do you have a map of the world?

This is **[[Model-Free vs. Model-Based RL]]**. It asks: Does the algorithm predict or simulate the environment's physics ($p(s', r \mid s, a)$) to plan ahead?

- **Model-Free:** No map. The agent learns exclusively by reacting to raw, real-world experiences.
    
- **Model-Based:** Yes, a map. The agent uses a simulator or transition model to "think" and plan actions offline.
    

### Axis 2: Whose mistakes are you learning from?

This is **On-Policy vs. Off-Policy**. It asks: Does the policy being evaluated and optimized match the behavior policy that is actively gathering the data?

- **[[On-Policy]]:** Learning from your own current behavior, including your exploratory flaws and random mistakes.
    
- **[[Off-Policy]]:** Learning from a target policy (usually the idealized, optimal greedy policy) while using a different, exploratory behavior policy to look around.
    

# The 2x2 RL Matrix

| -                                            | **On-Policy (Evaluates actual behavior )**                                                                                  | **Off-Policy (Evaluates a target/greedy policy )**                                                                   |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Model-Free** (No environment model )       | **SARSA**<br><br>Learns step-by-step from its own active, exploratory trajectories.                                         | **Q-Learning**<br><br>Learns the optimal path from raw data, even while acting randomly.                             |
| **Model-Based** (Uses an environment model ) | **Policy Iteration (DP)**<br><br>Uses a known model to calculate the exact mathematical value of a specific, active policy. | **Value Iteration (DP) / Dyna-Q**<br><br>Uses a model to plan and evaluate the absolute best greedy targets offline. |

### A Simple Unified Analogy

Imagine learning how to drive a race car:

- **Model-Free + On-Policy (SARSA):** You get in a real car on a real track. You drive defensively because you know you are a beginner who might accidentally swerve. You learn safely from your real-time adjustments.
    
- **Model-Free + Off-Policy (Q-Learning):** You get in a real car on a real track. You drive aggressively, aiming for the perfect racing lines. You might spin out and crash a lot during practice, but you are directly learning how a master driver would take the corners.
    
- **Model-Based + Off-Policy (Dyna-Q):** You alternate between driving a few laps on the real track and sitting in a high-tech **virtual flight simulator** in the garage. Inside the simulator, you repeatedly practice the absolute fastest, perfect lines to train your muscle memory without risking the real car.
    