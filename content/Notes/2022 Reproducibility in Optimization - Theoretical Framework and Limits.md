---
title: "2022 Reproducibility in Optimization - Theoretical Framework and Limits"
created: "2026-04-28 15:14"
tags file:
---

Title: 
Authors: L. Guérard, O. Goudet, D. Gauthier, et al.
Year: 2022
Journal/Conference: 
***
# Abstract
What are the main takeaways, answers to research questions, or new findings?


# Motivation
What problem does the paper address and why is it important?

- **The "Sensitivity" Problem:** Why do two identical models diverge even when we try to control everything?
    
- **Theoretical Limits:** Is "perfect reproducibility" even mathematically possible in a high-dimensional non-convex space?
	- related note: [[Convex Function]]
    
- [[Chaos Theory]]: The authors want to prove that neural network training obeys the laws of chaotic systems (like weather forecasting).

# Related Work

- **Lyapunov Stability:** Using classical physics/math concepts to describe how systems evolve.
    
- **Floating Point Errors:** How the tiny difference between $0.10000000000000001$ and $0.10000000000000002$ cascades over millions of iterations.

# Method
How did the authors conduct the research (e.g., experiments, case studies)?

The authors use a heavy theoretical framework:

1. **Iterative Maps:** They treat SGD as a discrete-time dynamical system: $x_{n+1} = f(x_n)$.
    
2. **Lyapunov Exponents ($\lambda$):** They calculate these exponents to measure the "rate of separation" of two training trajectories that start almost exactly at the same point.
    
    - If $\lambda > 0$, the system is chaotic.
        
3. **Sensitivity Analysis:** They mathematically model how errors grow exponentially over training epochs.

# Conclusion
Strengths/weaknesses, how it compares to other work, and relevance to your own research.

# Future Work
What questions remain unanswered?
