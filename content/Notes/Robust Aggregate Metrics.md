---
title: "Robust Aggregate Metrics"
create: "2026-05-17 21:07"
tags file:
---
### The Core Problem: Why Mean and Median Fail

While [[Performance Profiles]] offer the most complete view of an algorithm's performance, science and industry leaderboards still frequently require a single summary number (an aggregate metric) for abstracts, tables, and quick comparisons.

Traditionally, fields rely on the **Sample Mean** or **Sample Median**. The authors prove that both choices introduce severe distortions:

- **The Sample Mean** is highly sensitive to extreme outliers. An algorithm that achieves a massive, hyper-inflated score on just one or two exceptionally easy tasks can maintain a high global mean, completely masking the fact that it fails catastrophically on the remaining tasks.
    
- **The Sample Median** is structurally robust against outliers, but it is **statistically inefficient** in the low-sample regime ($N \le 10$). As shown in [[The Atari 100k Case Study]], its confidence intervals are incredibly wide, it exhibits massive sample bias, and it requires up to 100 independent training runs to reliably detect a true 10% performance improvement.
    

To fix this, the authors introduce three alternative metrics from the field of robust statistics.

1. [[Interquartile Mean (IQM)]]: As an alternative to median
2. [[Optimality Gap]]: As a robust alternative to mean
3. [[Probability of Improvement]]
