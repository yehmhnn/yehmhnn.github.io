---
title: power law
created: 2026-06-13 11:55
tags file:
---
A **power law** is a mathematical relationship between two variables where a relative change in one quantity leads to a proportional relative change in the other, independent of their initial size.

In simple terms: one variable changes as an exponent (a power) of another.

Unlike intuitive linear relationships where "twice as much input equals twice as much output," power laws are **nonlinear**. A small change in your input can lead to a massive, disproportionate acceleration—or a brutal stagnation—in your output.

## 1. The Mathematical Structure

The basic algebraic formula for a power law is:

$$y = k \cdot x^{\alpha}$$

Where:

- **$y$** and **$x$** are the variables being measured.
    
- **$k$** is a constant scaling factor.
    
- **$\alpha$** (alpha) is the **exponent** that dictates how the relationship scales.
    

### The Two Types of Power Laws

1. **Positive Exponent ($\alpha > 0$):** As $x$ grows, $y$ explodes exponentially. An everyday example is the area of a square ($A = s^2$). If you double the side length ($s$), the area ($A$) quadruples ($2^2 = 4$). It doesn't matter if the square is small or massive; the scaling factor is constant.
    
2. **Negative Exponent ($\alpha < 0$):** As $x$ grows, $y$ rapidly shrinks. This is an _inverse power law_. A prime example is gravity, which follows an inverse-square law ($B = -2$). If you double your distance from an object, the gravitational pull drops to one-fourth of its original strength.
    

## 2. The Signature of a Power Law: The Log-Log Plot

If you plot a power law on a traditional, standard graph, it creates a steep curve that is incredibly difficult for scientists to analyze or extrapolate.

However, power laws possess a unique mathematical trait called **scale invariance**. If you take the logarithm of both sides of a power law equation, the math transforms entirely:

$$\log(y) = \log(k) + \alpha \log(x)$$

This is the exact algebraic form of a straight line equation ($y = mx + b$).

Therefore, if you plot a power law on a chart where both axes are logarithmic (**a log-log plot**), the curved line becomes a perfectly straight line. The slope of that straight line is exactly equal to the exponent $\alpha$.

### Why This is the "Secret Weapon" of AI Scientists

Training an LLM with 100 billion parameters costs millions of dollars. To avoid wasting money, scientists train tiny, cheap models (e.g., 10 million parameters, 50 million parameters) and measure their error rates.

Because AI performance follows a power law, researchers can plot the performance of those tiny models on a log-log chart, draw a straight line through the data points, and look down the line to predict exactly how smart a massive $100\text{-million-dollar}$ model will be before they ever turn on the supercomputer.