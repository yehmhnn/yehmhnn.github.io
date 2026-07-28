---
title: Coarse Coding
created: 2026-07-12 14:26
tags file:
  - "[[Reinforcement Learning]]"
---
### The Definition (What)

**Coarse Coding** is a method for representing a continuous state space by covering it with a collection of overlapping geometric regions (called receptive fields) and representing any specific coordinate as a binary vector based on which regions it falls inside.

### Why It Is Important (Why)

In a continuous world (like a robot navigating a coordinate grid), the AI will almost never visit the exact same micro-coordinate twice. If you treat every coordinate as a distinct, isolated point (like a classic tabular lookup table), the AI cannot generalize; learning at coordinate $(1.001, 2.002)$ tells it absolutely nothing about coordinate $(1.002, 2.002)$.

Coarse coding solves this by creating shared features between nearby points. It allows a simple linear model to achieve smooth, non-linear generalization across space without needing the massive computational overhead of deep neural networks.

### How It Works (How)

The transition from a raw physical location to an AI feature vector moves through spatial mapping phases.

#### Phase 1: The Receptive Fields

Imagine the continuous state space. We drop a set of $d$ overlapping shapes (receptive fields) across the space. Each shape corresponds to a single index in our binary feature vector $x(s)$. These shapes can be:

- **2D Spaces:** Overlapping circles, squares, or long directional strips.
    
- **1D Spaces:** Overlapping numerical intervals given by boundary thresholds $[a_i, b_i]$ .
    

#### Phase 2: Binary Feature Extraction (The Operational Rule)

To construct the feature vector $x(s)$ for a specific state $s$, we test whether the coordinate falls inside each region's mathematical boundaries. For each feature index $i$:

$$
\begin{aligned} \text{For 2D Circles: } \quad x_i(s) &= \begin{cases} 1 & \text{if distance}(s, \text{center}_i) \le \text{radius}_i \\ 0 & \text{otherwise} \end{cases} \\ \text{For 1D Intervals: } \quad x_i(s) &= \begin{cases} 1 & \text{if } a_i \le s \le b_i \\ 0 & \text{otherwise} \end{cases} \end{aligned}
$$

#### Phase 3: The Parameter-Sharing Rule

In linear function approximation ($\hat{v}(s,w) = w^\top x(s)$), the internal parameters (weights) are shared between states through feature overlap .

> **The Parameter Sharing Theorem:** Two distinct states $s_a$ and $s_b$ **share parameters** if and only if their binary feature vectors have an active element at the exact same index . Mathematically, this means their vector dot product is strictly greater than zero:
> 
> $$x(s_a)^\top x(s_b) > 0$$

If they share an active feature, updating the weight for that feature at state $s_a$ will automatically alter the value prediction at state $s_b$. If $x(s_a)^\top x(s_b) = 0$, they share no parameters, and learning at $s_a$ has zero impact on $s_b$.

### A Concrete 1D Walk-through (Solving the Grid)

Suppose we have a 1D state space with 5 overlapping intervals :

1. $x_1 = [0.0, 0.3]$
2. $x_2 = [0.2, 0.5]$
3. $x_3 = [0.4, 0.7]$
4. $x_4 = [0.6, 0.9]$
5. $x_5 = [0.8, 1.0]$
    
To evaluate state **$s = 0.45$**, we run our Phase 2 boundary rules:

- Is $0.45$ between $0.0$ and $0.3$? No ($x_1 = 0$)
- Is $0.45$ between $0.2$ and $0.5$? **Yes** ($x_2 = 1$)
- Is $0.45$ between $0.4$ and $0.7$? **Yes** ($x_3 = 1$)
- Is $0.45$ between $0.6$ and $0.9$? No ($x_4 = 0$)
- Is $0.45$ between $0.8$ and $1.0$? No ($x_5 = 0$)

$$
x(0.45) = \begin{pmatrix} 0 & 1 & 1 & 0 & 0 \end{pmatrix}^\top
$$

If another state (like $s=0.35$) also lands in interval 2, then $x_2 = 1$ for both vectors. Because their vectors share a matching active row index ($x(0.45)^\top x(0.35) = 1$), they **share parameters**!

### Additional Insights

#### A Direct Comparison: Large Circles vs. Small Circles

The geometry of your coarse coding shapes completely alters how your AI generalizes:

|**Feature Geometry**|**Generalization Width**|**Resolution Detail**|**Learning Speed**|
|---|---|---|---|
|**Large Overlapping Shapes**|Very Broad|Low / Blurry|**Fast:** Updates at one point ripple far away, changing broad areas quickly.|
|**Small Overlapping Shapes**|Narrow / Localized|High / Sharp|**Slow:** The AI must explore granularly since learning doesn't ripple very far.|

#### Coarse Coding vs. Tile Coding

You will often see Coarse Coding mentioned right next to Tile Coding. They are close cousins, but with a structural twist:

- **Coarse Coding:** Drops shapes randomly or arbitrarily across the space. The boundaries overlap chaotically.
    
- **Tile Coding:** A highly organized form of coarse coding where regular grids (tilings) are stacked neatly on top of each other, shifted by a tiny uniform offset. It is much faster to compute in code because you can look up feature indices using simple math arrays instead of evaluating boundary equations for hundreds of separate shapes.
    

Adding that **Parameter-Sharing Theorem** box and the 1D boundary execution code should clear up any confusion. Do you want to tackle Task 4 next, which deals with calculating stored weights and active features for Tile Coding ?