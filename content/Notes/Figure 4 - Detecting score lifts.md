---
title: "Figure 4 - Detecting score lifts"
create: "2026-05-17 14:27"
tags file:
---
![[Pasted image 20260517143416.png|324]]

### 1. What does "artificially inflating the scores ($\ell\%$)" mean?

To test how reliable a statistical metric is, you need to know the absolute truth. In a real lab experiment, you never know the true difference between two algorithms.

To bypass this, the authors ran a controlled simulation:

1. They took the baseline scores of a single algorithm, **SPR**. Let's call these scores $\text{Score}_Y$.
    
2. They created a fake, synthetic "New Algorithm" ($\text{Algorithm X}$) by manually multiplying the baseline scores by a fixed percentage improvement ($\ell\%$).
    

- **If $\ell = 0\%$:** $\text{Score}_X$ is exactly identical to $\text{Score}_Y$ (Zero actual improvement).
    
- **If $\ell = 10\%$:** They artificially forced $\text{Score}_X$ to be exactly 10% better than $\text{Score}_Y$.
    
- **If $\ell = 25\%$:** They forced it to be exactly 25% better.
    

Because they manually injected this "lift," they created a perfect test environment where they knew the ground truth. They then wanted to see if a researcher running only $N$ runs could successfully detect that forced difference.

---

### 2. What is the Y-Axis Formula: $\text{Score}_X / \text{Score}_Y - 1$?

It says:

$$\text{Lift} = \frac{\text{Score}_X}{\text{Score}_Y} - 1$$

This is the standard mathematical formula for calculating **percentage change**.

- **Example:** Imagine the base algorithm scored $100$ ($\text{Score}_Y = 100$) and the artificially inflated algorithm scored $125$ ($\text{Score}_X = 125$).
    
- Plug those into the formula: $\frac{125}{100} - 1 = 1.25 - 1 = 0.25$.
    
- $0.25$ is exactly **$25\%$** on the y-axis.
    

The y-axis simply measures the percentage improvement observed in the simulation.

---

### 3. How to Read the Plot Lines

![[Pasted image 20260517143416.png|371]]

For each lift color (Blue = 0%, Orange = 10%, Green = 25%), the authors plotted two lines:

- **The Solid Line with Circles:** The **Upper** Limit of the 95% Confidence Interval.
    
- **The Dotted Line with Triangles:** The **Lower** Limit of the 95% Confidence Interval.
    
- **The Shaded Shroud:** The space between the solid and dotted lines. This represents the "Range of Reality"—any random experiment you run in the lab will yield a score that lands somewhere inside that shaded envelope.
    

---

### 4. What does "CI Overlap" mean, and why is it dangerous?

**Confidence Interval (CI) Overlap** means that the shaded zones of two different truths occupy the exact same vertical space on the graph. When zones overlap, you cannot tell the algorithms apart.

Let’s look at the **Left Plot (Median Lift)** at **$N = 5$ runs** (a very standard sample size in RL papers):

1. Look at the **Blue zone (0% real improvement)**: At $N=5$, a researcher might randomly observe a lift anywhere from **$-38\%$ up to $+60\%$**.
    
2. Look at the **Green zone (25% real improvement)**: A researcher might randomly observe a lift anywhere from **$-20\%$ up to $+100\%$**.
    

#### The Nightmare Scenario:

Because these two regions completely overlap, imagine you run your experiment with 5 seeds in the lab and calculate an observed median lift of **$+20\%$**.

You look at your chart and celebrate. But if you look at Figure 4, $+20\%$ sits comfortably inside the Blue zone **and** the Green zone. Mathematically, you have **absolutely no way of knowing** if your algorithm is a breakthrough that is 25% better (Green) or if it is exactly identical to the baseline (Blue) and you just got a lucky set of runs.

#### When is an experiment successful? (No Overlap)

An experiment is only definitive when the **Lower Bound (dotted line) of a higher lift climbs above the Upper Bound (solid line) of a lower lift**.

- Look at the **Left Plot (Median)**: The Green dotted line finally clears the Blue solid line at **$N = 100$**. You need 100 runs to confidently distinguish a 25% breakthrough from pure random noise using the Median!
    
- Look at the **Right Plot (IQM)**: The Green dotted line clears the Blue solid line much faster, around **$N = 25$**.
    

This visualizes the ultimate conclusion of the paper: The **Interquartile Mean (IQM)** narrows down the confidence intervals (compresses the shaded zones) much faster than the Median, allowing you to prove your model works with far fewer GPU hours.