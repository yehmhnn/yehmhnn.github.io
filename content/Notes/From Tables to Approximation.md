---
title: From Tables to Approximation
created: 2026-07-03 18:42
tags file:
  - "[[Reinforcement Learning]]"
---
# The Death of Memorization

In tabular reinforcement learning, the agent lives in an idealized world where it can cleanly look up the exact value of any situation. It assigns a single, independent number to every individual state or state-action pair.

This brute-force memorization breaks completely when applied to real-world problems. Real systems generate state spaces that are too vast, fluid, or complex to fit into a discrete spreadsheet. To scale, the agent must transition from **memorization** (lookup tables) to **generalization** (function approximation).


Real problems often have states that are:

- Continuous: 
	- Systems governed by physical sensors, velocities, voltages, or robotic joint angles are continuous. 
	- Because they are floating-point values, you can pass through an infinite number of unique states without ever repeating the exact same coordinates twice.

- Very High-Dimensional: 
	- Inputs like high-resolution camera images or raw audio streams contain millions of pixel-level variables. 
	- The total combination of possible values scales exponentially—a phenomenon known as the Curse of Dimensionality.

- Combinatorial: 
	- Systems with multiple moving components (e.g., tracking the precise configurations, velocities, and interactions of dozens of distinct objects on a factory floor or a chess board) create an astronomical explosion of unique structural combinations.

# The Double Trouble

Even if you had access to infinite supercomputer memory, tabular learning would still fail on real-world problems due to a fundamental statistical bottleneck:

- THE MEMORY BARRIER
	- A table indexed by millions of states is mathematically too vast to store or compute efficiently

- THE DATA BARRIER 
	- Most unique states will only be encountered AT MOST ONCE in the agent's entire operational lifetime.
		- Even if an environment is completely discrete (no decimals), states break down into multiple individual variables (dimensions). When you combine these variables, the total number of unique states multiplies exponentially.
		- If environment involves physical sensors, physics, time, or robotics, your states are **continuous** (represented by floating-point numbers). The probability of landing on the exact same point a second time is effectively zero.