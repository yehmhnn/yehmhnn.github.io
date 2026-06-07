---
title: Covariance
created: "2026-05-06 19:06"
tags file:
  - "[[Probability & Statistics]]"
---
***

If you have two variables, $X$ and $Y$, covariance measures their **linear relationship**.

- **Positive Covariance:** When $X$ goes up, $Y$ tends to go up (and vice versa). They are "team players."
    
- **Negative Covariance:** When $X$ goes up, $Y$ tends to go down. They are "rivals."
    
- **Zero Covariance:** Knowing how $X$ moves tells you nothing about $Y$. They are "strangers."
    

**The Math:**

The formula for covariance between two random variables $X$ and $Y$ is:

$$\text{Cov}(X, Y) = E[(X - E[X])(Y - E[Y])]$$

In plain English: You take the distance of $X$ from its average, multiply it by the distance of $Y$ from its average, and see what the result is on average.

For a finite dataset, it is often written as:

$$cov(x,y) = \frac{1}{n} \sum_{i=1}^{n} (x_i - \bar{x})(y_i - \bar{y})$$
---

Here is the breakdown of why those specific components are used:

### 1. The Deviations: $(x_i - \bar{x})$ and $(y_i - \bar{y})$

Instead of looking at the raw values, the formula looks at the **distance from the mean**. This centers the data.

- If $x_i$ is greater than the average, $(x_i - \bar{x})$ is **positive**.
    
- If $x_i$ is less than the average, $(x_i - \bar{x})$ is **negative**.
    

### 2. The Product: Multiplying the Deviations

This is the "magic" of the formula. By multiplying these two distances together, we determine the direction of the relationship for every single data point:

- **Positive Covariance:** If $X$ and $Y$ both tend to be above their means at the same time (positive $\times$ positive) or both below their means at the same time (negative $\times$ negative), the product is **positive**.
    
- **Negative Covariance:** If $X$ is above its mean while $Y$ is below its mean (positive $\times$ negative), or vice-versa, the product is **negative**.

### 3. The Summation and Average: $\frac{1}{n} \sum$

The summation adds up all these individual products. If the variables move together more often than not, the positive products will outweigh the negative ones, resulting in a positive total. If they move in opposite directions, the negative products will dominate. Dividing by $n$ (or $n-1$ for a sample) gives us the **average** tendency—the "expected" co-movement.

---

### The Expansion (Computational Formula)

When you multiply out the terms inside the parentheses and apply the linearity of expectation, the formula transforms:

$$Cov(X, Y) = E[(X - E[X])(Y - E[Y])]$$

1. **Distribute the terms:**
    $$(X \cdot Y) - (X \cdot E[Y]) - (Y \cdot E[X]) + (E[X] \cdot E[Y])$$
    
2. **Apply the outer Expectation ($E$):**
    $$E[XY] - E[X \cdot E[Y]] - E[Y \cdot E[X]] + E[E[X] \cdot E[Y]]$$
    
3. **Simplify (since $E[X]$ and $E[Y]$ are just constant numbers):**
    $$E[XY] - E[X]E[Y] - E[Y]E[X] + E[X]E[Y]$$
    
4. **Final Result:**    
    $$Cov(X, Y) = E[XY] - E[X]E[Y]$$

---
### Covariance vs. Correlation

- **Covariance** is "raw." It's measured in the units of your data (e.g., $volts^2$ for vibration). It can be any number.
    
- **Correlation** is "normalized." It’s always between -1 and 1. Think of Correlation as Covariance with a standardized scale so you can compare different datasets easily.

---
# Reference
