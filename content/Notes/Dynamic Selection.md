---
title: Dynamic Selection
created: 2026-06-13 18:04
tags file:
  - "[[ML System]]"
---
### 1. Definition & System Timing

* **When:** In-line, **During training** (active loop execution).
* **Where:** Executed directly on the GPU/TPU acceleration cluster.

### 2. Core Mechanism

Dynamic selection evaluates the informativeness of data samples on the fly, based on the *current state* of the training model. 
* *Examples:* The pipeline calculates a metric like **EL2N (Error $L_2$-Norm)** or raw training loss on a batch. If the model predicts a sample with $99.9\%$ confidence (an "easy" sample), the system dynamically drops that sample or skips the heavy backward pass.

### 3. Impact

* **Targeted Compute:** It ensures that the GPU only spends its maximum power drawing gradients from "hard" samples near the decision boundary.
* **The Payoff:** Directly slashes the total operations ($O$) of training by truncating the computation of low-value updates mid-flight.