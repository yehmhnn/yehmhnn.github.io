---
title: parametric
create: 2026-05-22 10:22
tags file:
  - "[[Machine Learning]]"
---
## Core Definition

A **parametric model** is a learning framework that captures the relationship in data using a **fixed, predetermined number of parameters**.

No matter how much data you throw at a parametric model, the size of its parameter set (its "memory" or structure) remains completely constant. It forces the data to conform to a specific functional form (like a straight line or a fixed curve).

> 💡 **The Bucket Analogy:** Think of a parametric model as a **rigid bucket** with a fixed shape. Training is just adjusting the orientation of the bucket to catch as much data as possible. If your data doesn't fit that specific shape, the model cannot morph to accommodate it.

## How it Works (The Two-Step Process)

1. **Select a Form:** You assume the data follows a specific mathematical layout (e.g., a straight line: $y = \beta_0 + \beta_1 x$).
    
2. **Learn the Coefficients:** You use your training data to find the optimal values for your fixed parameters ($\beta_0$ and $\beta_1$). Once learned, you can throw the training data away—you only need those two numbers to make future predictions.
    

## Parametric vs. Non-Parametric

|**Attribute**|**Parametric Models**|**Non-Parametric Models (e.g., [[Gaussian Process]])**|
|---|---|---|
|**Parameter Count**|**Fixed** (Does not change with data size)|**Flexible** (Grows with the number of training samples $N$)|
|**Data Retention**|Can delete data after training|Must keep data to make new predictions|
|**Complexity**|Simple, fast to train, highly interpretable|Complex, slower inference, powerful fitting|
|**Risk**|High risk of **underfitting** (too rigid)|High risk of **overfitting** (too flexible)|

## Trade-offs

### Strengths

- **Blazing Fast Inference:** Because the mathematical equation is fixed, calculating a prediction takes negligible time.
    
- **Data Efficient:** They require significantly less data to find a good fit if your initial assumption about the data's shape is correct.
    
- **Interpretable:** It is easy to look at a parameter (like a weight in linear regression) and explain exactly how an input affects the output.
    

### Weaknesses

- **Highly Biased:** If you assume your data is linear, but it actually follows a complex wave pattern, a parametric model will fundamentally fail to capture it. It cannot learn patterns outside its predefined scope.
    

## Common Examples

- [[Linear Regression]]: Fixed to a straight line or hyperplane ($y = wx + b$).
    
- [[Logistic Regression]]: Fixed to a sigmoid curve for classification boundaries.
    
- [[Linear Discriminant Analysis (LDA)]]: Assumes data within classes follows a normal distribution.
    
- **Simple Neural Networks (with fixed architectures):** While they can have millions of parameters, that count is structurally locked in place before training begins.
