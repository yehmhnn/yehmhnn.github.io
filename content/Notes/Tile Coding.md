---
title: Tile Coding
created: 2026-07-12 17:17
tags file:
  - "[[Reinforcement Learning]]"
---
### The Definition (What)

**Tile Coding** is a highly structured, computationally efficient form of [[Coarse Coding]] where a continuous state space is covered by multiple overlapping grids (called **tilings**), with each grid partitioned into a set of discrete, non-overlapping receptive fields (called **tiles**).

### Why It Is Important (Why)

Standard [[Coarse Coding]] drops shapes randomly, forcing a computer to evaluate complex geometric distance equations for hundreds of separate circles to find out which ones are active. Tile coding solves this overhead. By organizing shapes into neat, uniform grids offset by a tiny fraction, a computer can find out exactly which features are active using lightning-fast integer division. It provides clean, localized, graded generalization.

### How It Works (How)

Tile coding discretizes spaces by stacking multi-layered grid configurations.

#### Phase 1: The Matrix Architecture ($n_{\text{tilings}}$ and $m$)

To set up tile coding, we choose two primary hardware parameters:

1. **$n_{\text{tilings}}$**: The number of independent grid layers stacked on top of each other . Each layer is shifted slightly along the diagonal axis by a tiny uniform offset.
    
2. **$m$**: The number of individual tiles contained within a single tiling layer.
    

> **The Weight Storage Rule:** Because every single tile across every single tiling layer is allocated its own distinct parameter value in our linear function approximation, the total number of weights stored in the AI's memory is simply the product of your layers and tiles per layer:
> 
> $$\text{Total Weights Stored} = n_{\text{tilings}} \times m$$

![[Pasted image 20260712185637.png|477]]


#### Phase 2: Active Features Rule

When the agent stands at any continuous coordinate state $s$, it must land somewhere on the map. Because a single tiling grid covers the entire environment cleanly without gaps, **the state will land inside exactly one tile per grid layer**.

> **The Active Feature Theorem:** In tile coding, no matter where the agent stands, the number of active features (the number of components in the binary vector $x(s)$ that evaluate to $1$) is always **exactly equal to the number of tilings** :
> 
> $$\text{Number of Active Features} = n_{\text{tilings}}$$

All other thousands of indices in the global feature vector collapse to $0$.

#### Phase 3: The Step-Size Rule of Thumb

In standard linear gradient descent, when you update your weights, you divide your learning rate $\alpha$ across your active features to keep your updates stable. Because tile coding guarantees that exactly $n_{\text{tilings}}$ features are active at any given moment, the mathematical rule of thumb for setting a balanced step size is :

$$
\alpha = \frac{1}{\tau \cdot n_{\text{tilings}}}
$$

- **$n_{\text{tilings}}$**: The count of active features absorbing the gradient update .
    
- **$\tau$**: A tuning parameter that represents the approximate number of times an agent needs to visit a local region to completely overhaul and replace its old value estimate. If $\tau = 10$, you are configuring the system to take roughly 10 updates to fully learn a new target value.
    
That is a brilliant strategy for keeping your note-taking system completely evergreen. By stripping out references to "Task 4" or "the worksheet" and turning those numbers into a standard textbook example, your note remains universally useful for any future project or exam review.

Here is your complete, updated atomic note for **Tile Coding**, with those specific numbers fully integrated into a clean, permanent **Concrete Example** section.


### A Concrete Example

Consider a continuous environment utilizing a tile-coding architecture configured with **$n_{\text{tilings}} = 8$ offset layers** and **$m = 25$ tiles per layer**.

Using our operational phases, we can map out the exact mathematical properties of this system:

1. **Memory Allocation:** According to the _Weight Storage Rule_, the system must allocate and track a total of 200 individual parameters in memory:
$$
\text{Total Weights} = 8 \times 25 = 200
$$

2. **Feature Extraction Vector:** According to the _Active Feature Theorem_, when the agent stands at any random coordinate on the map, its generated feature vector $x(s)$ will contain exactly **8 active features** (evaluating to 1), while the remaining 192 features will be completely inactive (evaluating to 0).
    
3. **Step-Size Calculation:** If we want the agent to learn conservatively, requiring roughly **$\tau = 10$ local updates** to fully overwrite a value prediction , we calculate our learning rate $\alpha$ using the step-size rule of thumb :
$$
\alpha = \frac{1}{10 \times 8} = \frac{1}{80} = 0.0125
$$
    

### Additional Insights

#### [[Coarse Coding]] vs. Tile Coding

You will often see Coarse Coding mentioned right next to Tile Coding. They are close cousins, but with a structural twist:

- **Coarse Coding:** Drops shapes randomly or arbitrarily across the space. The boundaries overlap chaotically.
    
- **Tile Coding:** A highly organized form of coarse coding where regular grids (tilings) are stacked neatly on top of each other, shifted by a tiny uniform offset. It is much faster to compute in code because you can look up feature indices using simple array indexing instead of evaluating geometric boundary equations for hundreds of separate shapes.