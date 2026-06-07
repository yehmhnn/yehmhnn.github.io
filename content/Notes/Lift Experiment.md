---
title: "Lift Experiment"
create: "2026-05-17 07:58"
tags file:
---
In data science and statistics, a **Lift Experiment** is a stress-test method used to find out how sensitive a statistical test or metric is.

Instead of comparing two completely different algorithms (where you don't know the "true" mathematical difference between them), you take a single baseline dataset and **artificially inflate (lift) the scores by a known percentage ($\ell\%$)** to create a synthetic "improved" algorithm.

Because you manually created the improvement, you know the absolute ground truth: **Model B is exactly $\ell\%$ better than Model A.** You then downsample the data to various sample sizes ($N$) to see if your statistical metrics (like Mean, Median, or IQM) are actually smart enough to detect that true difference over background noise.