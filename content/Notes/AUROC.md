---
title: AUROC
created: 2026-06-09 16:41
tags file:
  - "[[Machine Learning Essentials]]"
---
**AUROC** stands for **Area Under the Receiver Operating Characteristic curve**.

In the context of machine learning and uncertainty estimation, it measures how good your model is at distinguishing between two distinct groups based on a score (like Mutual Information or Softmax Entropy).

- **How to read the score:** AUROC ranges from `0.0` to `1.0`.
    
    - An AUROC of **1.0** means perfect discrimination (the model perfectly identifies all anomalies/unfamiliar data without false alarms).
        
    - An AUROC of **0.5** means the model is performing no better than a random coin toss.

---

# How it Works: The ROC Curve

The AUROC is calculated by finding the area underneath the ROC (Receiver Operating Characteristic) curve.

![[Pasted image 20260609170315.png|380]]

- **Y-axis**: [[True Positive Rate]] (Sensitivity / Recall).
- **X-axis**: [[False Positive Rate]] (1 - [[Specificity]]).
- The curve is plotted by evaluating the model's predictions at various probability thresholds (e.g., from 0.0 to 1.0).

---

# Example: FashionMNIST

To understand how an ROC curve is built, it helps to step away from abstract math for a second and look at a concrete example.

Let's assume you are using **Mutual Information (MI)** as an uncertainty score to separate your "Normal" data from "Anomalies":

- **Negative Class ($-$)**: Clean **MNIST** images (In-Distribution / Normal).
    
- **Positive Class ($+$)**: **FashionMNIST** images (Out-of-Distribution / Anomalies).
    
Here is the breakdown of every term and how they interact to draw that curve.

## 1. Probability (or Uncertainty) Thresholds: The "Knobs"

Your model outputs a continuous uncertainty score (like Mutual Information) for every single image. Clean MNIST images usually get low scores (e.g., $0.01$), while unfamiliar FashionMNIST images get higher scores (e.g., $0.29$).

A **threshold** is a strict cutoff line you choose to make a final decision:

> _"If an image's uncertainty score is **above** my threshold, flag it as an OOD Anomaly ($+$). If it is **below**, classify it as Normal MNIST ($-$)."_

Because you don't know the "perfect" threshold in advance, the ROC calculation sweeps the threshold knob all the way from **$0.0$ to $1.0$**. At every single micro-step along the way, it calculates how many images were guessed right or wrong, generating a new coordinate $(X, Y)$ on your plot.

## 2. The Y-Axis: True Positive Rate (Sensitivity / Recall)

**Sensitivity** and **Recall** are exactly the same thing—they are just synonyms for the **True Positive Rate (TPR)**.

Mathematically, it is defined as:

$$\text{TPR} = \frac{\text{True Positives (TP)}}{\text{True Positives (TP)} + \text{False Negatives (FN)}}$$

- **In plain English:** Out of all the actual FashionMNIST images hidden in the evaluation test set, what percentage did your uncertainty threshold successfully catch?
    
- **The Goal:** You want this to be as close to $1.0$ ($100\%$) as possible. If it's $1.0$, your model successfully flagged every single anomaly.
    

## 3. The X-Axis: False Positive Rate (1 - Specificity)

To understand the X-axis, we first have to look at **Specificity** (also called the True Negative Rate).

$$\text{Specificity} = \frac{\text{True Negatives (TN)}}{\text{True Negatives (TN)} + \text{False Positives (FP)}}$$

- **In plain English:** Out of all the actual _clean_ MNIST images, what percentage did your threshold correctly identify as normal and leave alone?
    

### Why the X-Axis uses $1 - \text{Specificity}$ (False Positive Rate)

If Specificity is your "True Negative Rate" (success on clean data), then $1 - \text{Specificity}$ is your **False Positive Rate (FPR)**—your alarm error rate.

$$\text{FPR} = 1 - \text{Specificity} = \frac{\text{False Positives (FP)}}{\text{False Positives (FP)} + \text{True Negatives (TN)}}$$

- **In plain English:** Out of all the actual clean MNIST images, what percentage did your threshold accidentally trip over and falsely flag as an anomaly?
    
- **The Goal:** You want this to be as close to $0.0$ ($0\%$) as possible. You don't want to spam user-facing applications with false uncertainty alarms on perfectly clean data.
    

## 4. Putting It All Together: How the Curve is Traced

Imagine walking your threshold knob step-by-step to see how the coordinates move across the grid:

- **Extreme Threshold = 0.0:** Your cutoff is so low that _everything_ is declared an anomaly. You catch $100\%$ of the FashionMNIST images ($\text{TPR} = 1.0$), but you also falsely flag $100\%$ of your clean MNIST images ($\text{FPR} = 1.0$). Your plot coordinate is at the very top-right corner: $(1.0, 1.0)$.
    
- **Extreme Threshold = 1.0:** Your cutoff is so high that _nothing_ passes. You flag zero clean MNIST images as anomalies ($\text{FPR} = 0.0$), but you also catch absolutely zero actual FashionMNIST images ($\text{TPR} = 0.0$). Your plot coordinate is at the bottom-left corner: $(0.0, 0.0)$.
    
- **Varying the Threshold (0.0 to 1.0):** As you slowly slide the threshold between these extremes, the coordinate traces a path from the bottom-left to the top-right.
    

### Why AUROC Matters

If your model has high structural diversity and successfully outputs low uncertainty for in-distribution data and massive uncertainty for OOD data, you can set a threshold that catches almost all anomalies ($\text{TPR} \approx 1.0$) while triggering almost zero false alarms ($\text{FPR} \approx 0.0$).

This causes the traced line to rocket straight up to the top-left corner $(0.0, 1.0)$ before leveling off. The total **Area Under that ROC curve (AUROC)** will be nearly a perfect $1.0$. If your model is guessing randomly, the path will just be a straight diagonal line across the middle, resulting in an AUROC of $0.5$.