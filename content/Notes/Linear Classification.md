2026-05-08 16:19
Tags: [[Machine Learning]]
***

**The Geometry:** This refers to any classifier where the decision boundary is a **hyperplane** (a line in 2D, a plane in 3D, etc.).

A classifier is "linear" if the decision rule can be written as:

$$y = \text{sign}(w^T x + b)$$

- Generative Linear Classifiers: 
	- [[Linear Discriminant Analysis (LDA)]] (when covariance is shared).
    
- **Discriminative Linear Classifiers:** 
	- [[Logistic Regression]]
	- Linear [[Support Vector Machines (SVM)]]
	- [[Perceptron]]

(related notes: [[Generative Classification]], [[Discriminative Classification]])

---
## **Overview of Linear Classification**

These four methods—**Perceptron, SVM, LDA, and LR**—all implement a deterministic decision rule for binary classification where $y \in \{-1, 1\}$:

$$\hat{y} = \text{sign}(x^T \hat{\beta} + \hat{b})$$

While they share this rule, they differ in how they determine the optimal parameters $\beta$ and $b$.

### **Probabilistic vs. Deterministic**

- **LDA and LR**: These methods go beyond a simple sign-based decision by providing probabilistic predictions via the posterior distribution.
    
- **Posterior Probabilities**: For these models, the probability is typically expressed as:
    
    - $P(Y=1|x) = \sigma(x^T \beta + b)$
        
    - $P(Y=-1|x) = \sigma(-(x^T \beta + b))$
        

---

## **Optimization & Objective Functions**

Most of these methods can be unified under a single objective function for optimization:

$$\min_{\beta, b} \left( \lambda \frac{\|\beta\|^2}{2} + \frac{1}{N} \sum_{n=1}^{N} \text{loss}(X_n, Y_n) \right)$$

This objective consists of two parts: a **regularization term** ($\lambda \frac{\|\beta\|^2}{2}$) and a **data term** (the loss function).

### **Regularization Settings ($\lambda$)**

|**Method**|**Regularization Parameter (λ)**|**Notes**|
|---|---|---|
|**Perceptron**|$\lambda = 0$|No regularization.|
|**LDA**|$\lambda = 0$|No regularization.|
|**SVM**|$\lambda > 0$|Requires regularization.|
|**LR**|$\lambda \geq 0$|Regularization is optional.|

---

## **Loss Functions**

The primary difference between these methods lies in their "opinions" of what constitutes a "good" or "bad" fit, which is reflected in their distinct loss functions:

- [[Perceptron]]: 
	- Focuses on misclassified points, often assuming $b=0$ through centralization.
    
- [[Logistic Regression]]: 
	- Often utilizes a log-loss structure, such as $\text{Softplus}(-y_i(x_i \beta + b))$.
    
- [[Support Vector Machines (SVM)]]: 
	- Defined by its own specific loss function to maximize the margin.
    

---

## **Performance Considerations**

- **Similarity**: If the data is approximately linearly separable and consists of Gaussian-like clusters, all four methods will yield similar results.
    
- **Divergence**: If these assumptions are not met, one method might outperform the others by chance due to the specific "shape" of the data. Relying on this accidental performance is noted as "dangerous".


---
# Reference
