---
title: "Continuous Normalizing Flows (CNFs)"
created: "2026-03-31 14:37"
tags file:
  - [[GNNs]]
---
***

### 1. The Core Mechanism

Unlike standard [[Normalizing Flows]] that use a sequence of discrete layers ($z \rightarrow h_1 \rightarrow h_2 \rightarrow x$), a CNF treats the transformation as a smooth evolution over time $t \in [0, 1]$.

The movement of a sample $x$ is defined by a **Vector Field** $v_{\theta}(x, t)$:

$$\frac{dx_t}{dt} = v_{\theta}(x_t, t)$$

To get from noise to data, we "solve" the ODE:

$$x_1 = x_0 + \int_{0}^{1} v_{\theta}(x_t, t) \, dt$$

### 2. The Probability Change (The Math "Magic")

How do we know the probability density at the end? We use the **Instantaneous Change of Variables** formula. Instead of calculating a massive determinant (which is a nightmare in high dimensions), we only need the **Trace of the Jacobian**:

$$\frac{\partial \log p_t(x_t)}{\partial t} = -\text{Tr}\left( \frac{\partial v_{\theta}}{\partial x_t} \right)$$

> [!TIP] Insight for Vibration Data
> 
> The "Trace" is just the sum of the diagonal of the Jacobian matrix. In 1024-dimensional space (like your vibration windows), this is much cheaper to calculate than a full determinant!

---

# Comparison: Conditional vs. Unconditional FM

This is the distinction that usually trips people up. In your code, we used **Conditional** because it's the "Engineering Cheat Code" for modern generative AI.

|**Feature**|**Unconditional Flow Matching (UFM)**|**Conditional Flow Matching (CFM)**|
|---|---|---|
|**The Goal**|Match the _global_ vector field of the entire population.|Match the _local_ vector field of a single path.|
|**Target Field**|$v_t(x)$: The velocity of the whole "cloud."|$u_t(x|
|**Computability**|**Extremely Hard.** You rarely know the true $p_t(x)$ for complex data.|**Very Easy.** If the path is a straight line, the velocity is just $x_1 - x_0$.|
|**Training**|Requires estimating gradients of the whole distribution.|Simple **Regression** (MSE loss) between the model and the straight line.|
|**The "Magic"**|It is the "True" objective we want.|Proved to be mathematically equivalent to UFM, but much more stable.|

### Why we use "Conditional" for your TSFlow:

If we used **Unconditional**, we would have to look at the entire dataset of CWRU vibration signals and try to figure out how the "average" noise becomes the "average" signal.

By using **Conditional**, we say: _"Take this specific piece of noise ($x_0$) and move it toward this specific fault signal ($x_1$) in a straight line."_ Because we do this thousands of times with different pairs, the model eventually learns the **Global** structure (the Unconditional field) without ever having to calculate it directly.

---

### Obsidian "Atomic" Strategy

1. **Note 1:** `[[Continuous Normalizing Flows]]` (The "What"). Focus on the ODE and the Trace formula.
    
2. **Note 2:** `[[CFM vs UFM]]` (The "How"). Use the table above. Link this to your `[[Flow Matching]]` note.
    

> [!QUOTE] The "Aha!" Moment
> 
> **CNF** is the car. **The Vector Field** is the steering wheel. **Flow Matching** is the driving instructor telling you how to turn the wheel. **Conditional FM** is the instructor saying "Just drive toward that tree in a straight line."

Does this clear up why we used the $(x_1 - x_0)$ subtraction in your training loop? That was you defining the **Conditional** target!

Since your training loss has stabilized, are you ready to write the **Inference Script** to solve the ODE and generate a brand-new vibration signal from scratch?
