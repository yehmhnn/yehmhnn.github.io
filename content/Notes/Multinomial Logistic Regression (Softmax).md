---
title: Multinomial Logistic Regression (Softmax)
created: 2026-05-12 16:06
tags file:
  - "[[Machine Learning Essentials]]"
---
***

## Definition

**Multinomial Logistic Regression** (or Softmax Regression) is a classification method that generalizes Binary Logistic Regression to handle multiple classes ($C > 2$). It is a **joint classifier** that models the probability of each class simultaneously using the [[Softmax]] function as the output layer and [[Cross-Entropy Loss]] as the objective function.

---

## 1. The Functional Connection

[[Logistic Regression]] is essentially a "single-neuron" neural network. The relationship between the binary and multinomial cases is one of generalization:

- **Binary Case:** Uses the **[[Sigmoid]] function** to predict the probability of a single class ($y=1$).
    
    $$P(y=1) = \frac{1}{1 + e^{-z}}$$
    
- **Multinomial Case:** Uses the **[[Softmax]] function** to predict a probability distribution across $K$ classes.
    
    $$\sigma(\mathbf{z})_i = \frac{e^{z_i}}{\sum_{j=1}^{K} e^{z_j}}$$
    

> [!info] The Special Case
> 
> When $K=2$, the Softmax function mathematically simplifies exactly to the Sigmoid function. This is why Multinomial Logistic Regression is often called "Generalized Logistic Regression."

---

## 2. The Loss Connection

To train these models, we must measure the "divergence" between predicted probabilities ($\hat{y}$) and ground truth labels ($y$).

### Binary Cross Entropy (BCE)

For binary outcomes, we use **Log Loss**:

$$J(\theta) = -\frac{1}{m} \sum_{i=1}^{m} [y^{(i)} \log(\hat{y}^{(i)}) + (1 - y^{(i)}) \log(1 - \hat{y}^{(i)})]$$

### Categorical Cross Entropy (CCE)

For $C > 2$ classes, the "Joint" loss considers all classes at once:

$$J(\theta) = -\sum_{c=1}^{C} y_c \log(\hat{y}_c)$$

In practice, since $y$ is usually a one-hot encoded vector, this formula simply pulls the $-\log(\text{predicted probability})$ of the correct class.

---

## 3. Theoretical Justification

Why are the Softmax/Sigmoid and Cross-Entropy always paired together?

### [[Maximum Likelihood Estimation (MLE)]]

In statistics, we seek parameters $\theta$ that maximize the likelihood of the observed data. Minimizing the Cross-Entropy Loss is mathematically equivalent to maximizing the Log-Likelihood. This provides a solid frequentist foundation for the model.

### Gradient Behavior & Numerical Stability

When you use the Softmax-Cross-Entropy pair, the derivative of the loss with respect to the raw input (logit) $z$ simplifies to:

$$\frac{\partial L}{\partial z_i} = \hat{y}_i - y_i$$

> [!important] Why this matters
> 
> This "error term" ($\text{prediction} - \text{target}$) is linear and intuitive.
> 
> 1. It prevents the **vanishing gradient problem** that occurs with Mean Squared Error (MSE) in classification.
>     
> 2. It makes the optimization landscape much easier for Gradient Descent to navigate.
>     

---
# Reference
