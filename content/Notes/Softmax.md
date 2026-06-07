---
title: Softmax
create: 2026-05-12 15:11
tags file:
  - "[[Machine Learning]]"
---
### Definition

The **Softmax function** takes a vector of $K$ real numbers (logits) and normalizes it into a probability distribution consisting of $K$ probabilities proportional to the exponentials of the input numbers.

$$\sigma(\mathbf{z})_i = \frac{e^{z_i}}{\sum_{j=1}^{K} e^{z_j}}$$

- **$\mathbf{z}$ (The [[Logit]]):** This is the input vector of raw scores from your model's last layer. These numbers can be anything—positive, negative, or zero.
    
- **$e^{z_i}$ (The Exponential):** We take the natural exponential of each score. This serves two purposes:
    
    1. **Positivity:** It ensures every value is positive ($e^x > 0$ for all real $x$).
        
    2. **Magnification:** It acts as a "max" operator. Larger scores become significantly larger, while smaller scores stay relatively small.
        
- **$\sum_{j=1}^{K} e^{z_j}$ (The Normalizer):** We sum up all the exponentiated values.
    
- **The Ratio:** By dividing each $e^{z_i}$ by the total sum, we ensure that the resulting values are between 0 and 1 and that **the entire vector sums to 1.0**.


---

### What is Softmax used for?

**Softmax** is the "squashing" function that sits on top of the logits. Its primary roles are:

1. **Probability Mapping:** It converts those raw scores into a probability distribution (values between 0 and 1 that sum to 100%).
    
2. **Selection (The "Soft" Max):** Unlike a "hard max" (which would just pick the highest score and set it to 1, making the rest 0), Softmax keeps the distribution "soft" and differentiable. This allows the model to communicate not just _what_ it thinks the answer is, but how _uncertain_ it is.
    
3. **Training via Backpropagation:** During training, we need a smooth gradient to update weights. Softmax provides a continuous surface for the optimizer to navigate.

---

### [[Temperature Scaling]]

In some contexts (like Reinforcement Learning or LLM sampling), a **temperature** parameter $T$ is introduced:

$$\sigma(\mathbf{z}, T)_i = \frac{e^{z_i/T}}{\sum_{j=1}^{K} e^{z_j/T}}$$

- **High $T$:** Results in a "softer" (more uniform) distribution.
    
- **Low $T$:** Results in a "harder" distribution (the largest logit dominates).

(related note: [[Softmax Calibration]])
