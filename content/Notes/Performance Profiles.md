---
title: "Performance Profiles"
create: "2026-05-17 20:47"
tags file:
---
### 1. The Core Problem: The Blind Spots of "Summary Statistics"

When evaluating a machine learning model across multiple tasks, researchers traditionally condense thousands of data points into a single summary number (like the Mean or Median) to display on a leaderboard.

This creates a massive statistical blind spot. A single summary number cannot distinguish between:

- **Algorithm A:** An architecture that achieves a solid, reliable score of $1.0$ across all 26 tasks.
    
- **Algorithm B:** An unstable architecture that scores a massive $5.0$ on half the tasks (extreme outliers) but completely crashes to $0.0$ on the other half (catastrophic failures).

Both algorithms might end up with the exact same mean score, but Algorithm A is a dependable, production-ready model, while Algorithm B is a liability. **Performance Profiles** solve this by visualizing the _entire distribution_ of results simultaneously.

---

### 2. Mathematical Foundation

A Performance Profile is a plot of the **Empirical Cumulative Distribution Function (ECDF)** or, more specifically, the **Empirical Tail Distribution Function** ($\hat{F}(\tau)$) across a continuous spectrum of target targets.

Instead of evaluating a single average, the profile maps out the following equation as a continuous curve:

$$\hat{F}(\tau) = \frac{1}{M \times N} \sum_{m=1}^{M} \sum_{n=1}^{N} \mathbb{1}[x_{m,n} > \tau]$$

Where:

- $M \times N$ is the total number of data points (Tasks $\times$ Runs).
    
- $\tau$ (Tau) is a variable performance threshold on the X-axis.
    
- $\mathbb{1}[\cdot]$ is an indicator function that outputs $1$ if the run's score exceeded $\tau$, and $0$ if it failed.
    

---

### 3. Anatomy of a Performance Profile Curve

When looking at a performance profile graph, reading a specific coordinate reveals a precise story about the model's reliability:

- **The X-Axis ($\tau$):** The target benchmark score. For human-normalized scores, $0.0$ represents a random baseline, $1.0$ represents average human performance, and $> 2.0$ represents advanced superhuman performance.
    
- **The Y-Axis ($\hat{F}(\tau)$):** The fraction of runs/tasks that successfully surpassed the corresponding X-axis threshold.
    
- **Reading a Point $(X, Y)$:** If a curve passes through $(1.0, 0.70)$, it means: _"Across all combined tasks and random seeds, this algorithm outperformed a human operator in exactly **70%** of trials."_
    

---

### 4. Key Interpretations & Diagnostic Power

Switching from a leaderboard table to a performance profile curve unlocks three powerful diagnostic capabilities:

#### A. Stochastic Dominance (Clear Superiority)

If Algorithm A’s curve sits entirely **above and to the right** of Algorithm B’s curve across the whole graph, Algorithm A exhibits _stochastic dominance_. It is indisputably the superior model at every single performance tier.

#### B. Intersecting Curves (The Tail Trade-off)

If two profile curves cross each other, it exposes a critical trade-off that a mean score would hide:

- **At low thresholds (left side):** Curve A is higher than Curve B. This tells you that Algorithm A has a higher **overall success rate** (it rarely completely fails or drops to zero).
    
- **At high thresholds (right side):** Curve B crosses over and sits higher than Curve A. This tells you that when conditions are perfect, Algorithm B has a higher **superhuman peak capacity** (it scales to extreme high scores on select tasks).
    

#### C. The Area Under the Curve (AUC) Connection

Mathematically, the total area enclosed under a performance profile curve is exactly equal to the **sample mean score** across all tasks. This means you do not lose the "mean" information by switching to a profile; the mean is simply represented as the total visual volume under the line.

---

### 5. Integrating Uncertainty (Bootstrap Bands)

A common mistake when plotting profiles is drawing them as thin, definite lines. Because these curves are generated from a finite set of experimental runs ($N$), the lines themselves contain uncertainty.

To fix this, the authors combine performance profiles with [[Stratified Bootstrap Confidence Intervals]]:

1. For every one of the 100,000 bootstrap simulation matrices, they compute a separate profile line.
    
2. At every threshold $\tau$ along the X-axis, they extract the $2.5^{\text{th}}$ and $97.5^{\text{th}}$ percentiles across those 100,000 lines.
    
3. They render this uncertainty as a **shaded envelope (band)** around the main profile curve.
    
If the shaded bands of two algorithms overlap significantly at a specific threshold, a researcher cannot claim that one model is reliably better than the other at that performance level.
