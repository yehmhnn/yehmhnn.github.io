---
title: "Interquartile Mean (IQM)"
create: "2026-05-17 21:13"
tags file:
---
The **Interquartile Mean** is the ultimate compromise between the mean and the median. It offers the outlier robustness of the median while retaining the statistical efficiency and tight confidence intervals of the mean.

#### The Mechanics:

To compute the IQM of an algorithm across your scores:

1. Sort all collected normalized scores (across all tasks and runs) from lowest to highest.
    
2. Truncate (discard) the bottom 25% of the scores (the worst runs/catastrophic drops).
    
3. Truncate (discard) the top 25% of the scores (the luckiest outlier runs).
    
4. Calculate the standard arithmetic mean of the remaining **middle 50%** of the data.
    

#### The Mathematical Edge:

Because it completely deletes the top and bottom quarters of the data, a lucky seed that spikes to infinity or an unstable run that plunges to zero cannot pull the metric.

Crucially, because it averages a continuous block of data points rather than pinpointing a single central index (like the median does), its variance drops off rapidly. This allows researchers to achieve tight, definitive 95% Confidence Intervals with a fraction of the computational budget ($N \approx 20 \text{ to } 25$ runs instead of $100$).