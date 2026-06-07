---
title: "Figure 6 - Validating 95% Stratified Bootstrap CIs"
created: "2026-05-17 20:24"
tags file:
---
![[Pasted image 20260517202557.png|406]]

The top row of the image tracks **True Coverage %** (how often a calculated "95% CI" successfully traps the actual, true performance of the algorithm). Ideally, every line should sit perfectly on the horizontal dashed line at **95%**.

- **The Median Problem (Top Left):** At low sample sizes ($N=3$ or $N=5$), advanced methods like `bc` and `bca` fail spectacularly—only covering the true score 75% to 85% of the time, despite claiming 95% confidence. The simple **`percentile` method (purple line)** actually performs the best, getting closest to or exceeding the 95% coverage line.
    
- **The IQM Advantage (Top Right):** When using the **Interquartile Mean (IQM)**, all four methods converge rapidly to the 95% target. Because IQM naturally removes extreme outliers, the complex corrections of `bc` and `bca` become unnecessary.
    
- **The Takeaway:** Since the percentile bootstrap performs best for medians at low sample sizes and performs identically to advanced methods for IQM (while being much easier to compute without crashing on skewed data), the authors officially packaged the **Percentile Bootstrap** into their `rliable` library.

---
### What is "Average CI Width"?

The "CI Width" is the physical size of your interval window (the **Upper Bound minus the Lower Bound**).

- **Example:** If Interval A says the score is between **0.15 and 0.25**, its width is $0.25 - 0.15 = \mathbf{0.10}$. If Interval B says the score is between **0.19 and 0.21**, its width is $0.21 - 0.19 = \mathbf{0.02}$.
    
- **The Goal:** You want your CI width to be as **small/narrow** as possible (like Interval B). A narrow width means your model is highly precise and predictable. A massive width means your model is a total wild card.
    

#### Why do the bottom graphs slope downward?

As you increase the Number of Runs ($N$) from 3 to 100, you are feeding the bootstrap more data. More data means less uncertainty, which causes the average width of the interval to shrink significantly across all methods.
