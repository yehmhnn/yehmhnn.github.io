---
title: True Positive Rate
created: 2026-06-09 17:08
tags file:
  - "[[Machine Learning]]"
---
The True Positive Rate (TPR), also known as sensitivity, recall, or probability of detection, measures the proportion of actual positive cases a model or test correctly identifies. It is a vital metric in statistics, machine learning, and medical diagnostics to evaluate a system's accuracy and effectiveness.

Mathematically, it is defined as:

$$
\text{TPR} = \frac{\text{True Positives (TP)}}{\text{True Positives (TP)} + \text{False Negatives (FN)}}
$$

![[Pasted image 20260609171654.png|217]]


### Key Characteristics

- **High TPR:** Indicates the model does an excellent job at "catching" positives and minimizing missed detections.

- **Trade-off:** In machine learning, increasing the TPR often results in a higher [[False Positive Rate]], meaning the model becomes overly sensitive and incorrectly flags negative cases as positive.

- **Application:** It is frequently paired with the True Negative Rate ([[Specificity]]) to provide a complete picture of a model's performance