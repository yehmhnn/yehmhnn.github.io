---
title: Likelihood vs. Probability
created: 2026-05-08 15:16
tags file:
  - "[[Machine Learning Essentials]]"
---
Mathematically, they are expressed by the same functional form: $P(x \mid \theta)$. The difference lies in **what you are holding constant** and **what you are varying**. They refer to two different directions of the same equation.

---

## 1. Probability: Predicting Outcomes

**Focus:** The Data ($x$)

**Given:** Fixed Parameters ($\theta$)

Probability is used when you know the parameters of a process and want to predict the chance of a specific outcome.

- **Direction:** Parameters $\rightarrow$ Data.
    
- **Property:** A probability distribution must integrate (or sum) to 1.
    
- **Example:** If you know a coin is fair ($\theta = 0.5$), what is the probability ($P$) of getting 3 heads in 10 tosses? You are looking at the area under the curve for a specific $x$.
    

---

## 2. Likelihood: Estimating Parameters

**Focus:** The Parameters ($\theta$)

**Given:** Fixed Data ($x$)

Likelihood is used after you have observed data and want to determine which parameters most likely generated that data. It is the basis for **Maximum Likelihood Estimation (MLE)**.

- **Direction:** Data $\rightarrow$ Parameters.
    
- **Property:** A likelihood function does _not_ necessarily sum to 1. It is not a probability distribution over $\theta$; it is a measure of "support" the data provides for a specific parameter value.
    
- **Example:** You flipped a coin 10 times and got 7 heads. The **Likelihood** ($L$) asks: "How well does the parameter $\theta = 0.5$ (a fair coin) explain this result compared to $\theta = 0.7$?"
    

---

## 3. The Comparison Table

| **Feature**           | **Probability**           | **Likelihood**                |
| --------------------- | ------------------------- | ----------------------------- |
| **Notation**          | $P(x \mid \theta)$        | $L(\theta \mid x)$            |
| **What is variable?** | The outcome $x$           | The parameter $\theta$        |
| **What is fixed?**    | The parameters $\theta$   | The observed data $x$         |
| **Goal**              | Predicting future events. | Estimating the model's "fit." |
| **Sum/Integral**      | Must equal 1.             | No requirement to sum to 1.   |

---

## 4. Why the distinction matters

In advanced modeling—like the **generative models** used in computer vision—this distinction is critical:

1. **Sampling:** When you generate an image, you are sampling from a **probability** distribution (fixed model, varying pixels).
    
2. **Training:** When you train the model, you are maximizing the **likelihood** (varying model weights, fixed training images).
    

> **The "Intuition" Check:**
> 
> If you are asking "How likely is it that my model is correct?", you are talking about **Likelihood**.
> 
> If you are asking "How likely is it that this event will happen?", you are talking about **Probability**.
