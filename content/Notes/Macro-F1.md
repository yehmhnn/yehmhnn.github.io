---
title: Macro-F1
created: 2026-09-22 09:45
tags file:
---
## Definition (What)

Macro-F1 is a classification metric that calculates the F1 score separately for each class and then gives every class equal weight when averaging those scores.

## Why It Is Important (Why)

- Accuracy can hide poor performance on rare classes when the dataset is imbalanced.
- A single overall metric can therefore look good even if the model performs badly on an important minority class.
- Macro-F1 prevents large classes from dominating the evaluation because each class contributes equally.
- It is especially useful when performance on **every class matters**, regardless of how frequently each class appears.

## How It Works (How)

Suppose a classifier has $K$ classes.

### 1. Evaluate each class separately

For each class $k$, temporarily treat:

- class $k$ as the positive class
- every other class as negative

This gives:

- $TP_k$: examples of class $k$ correctly predicted as $k$
- $FP_k$: examples incorrectly predicted as $k$
- $FN_k$: examples of class $k$ incorrectly predicted as another class

### 2. Calculate precision and recall for that class

Precision asks: **Of everything predicted as class $k$, how much was actually class $k$?**

$$
P_k = \frac{TP_k}{TP_k + FP_k}
$$

Recall asks: **Of everything actually belonging to class $k$, how much did the model find?**

$$
R_k = \frac{TP_k}{TP_k + FN_k}
$$

### 3. Combine precision and recall into F1

For each class:

$$
F1_k = 2\frac{P_kR_k}{P_k+R_k}
$$

Equivalently:

$$
F1_k = \frac{2TP_k}{2TP_k+FP_k+FN_k}
$$

F1 is high only when both precision and recall are high, so a class cannot get a strong F1 score by doing well on only one of them.

### 4. Average the class-level F1 scores

Macro-F1 is the ordinary arithmetic mean:

$$
\text{Macro-F1} = \frac{1}{K}\sum_{k=1}^{K}F1_k
$$

For three classes with:

- $F1_A = 0.90$
- $F1_B = 0.75$
- $F1_C = 0.30$

we get:

$$
\text{Macro-F1}
= \frac{0.90+0.75+0.30}{3}
= 0.65
$$

The crucial point is that **each class contributes exactly one-third**, even if class A has 10,000 examples and class C has only 100.

# Additional Insights

## Direct Comparison

Macro-F1 is commonly contrasted with micro-F1.

| Metric | How it aggregates | Consequence |
|---|---|---|
| **Macro-F1** | Compute F1 per class, then average | Every class has equal influence |
| **Micro-F1** | Pool all $TP$, $FP$, and $FN$ first, then compute F1 | Frequent classes have more influence |

Therefore, macro-F1 answers roughly:

> "How well does the model perform on the average class?"

while micro-F1 answers roughly:

> "How well does the model perform across the individual predictions overall?"

For imbalanced datasets, the difference can be substantial.

## Major Limitations

Macro-F1 can give a **very small class the same influence as a very large class**.

For example, a class containing 10 examples affects the final score just as much as a class containing 100,000 examples.

This is desirable when every class is equally important, but potentially misleading when class frequency should reflect real-world importance.

## Common Misconceptions

- **Macro-F1 is not the F1 score computed from macro-averaged precision and recall.**
  - The usual definition computes an F1 score for each class first and then averages those F1 scores.
  - Because F1 is nonlinear, these two procedures can produce different results.

- **A high macro-F1 does not mean every class has a high F1.**
  - It is still an average, so inspecting the individual $F1_k$ values can reveal classes with poor performance.