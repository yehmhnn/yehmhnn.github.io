---
title: "2022 RANDOMNESS IN NEURAL NETWORK TRAINING -  CHARACTERIZING THE IMPACT OF TOOLING"
created: "2026-04-28 11:57"
tags file:
---

Title: 
Authors: 
Year: 
Journal/Conference: 
***
# Abstract
What are the main takeaways, answers to research questions, or new findings?

# Motivation
What problem does the paper address and why is it important?

Q: how does our choice of tooling introduce randomness to deep neural network training.

- **Beyond Algorithms:** Most reproducibility research focuses on random seeds or data shuffling; however, hardware-level optimizations (like atomic operations in GPUs) also introduce significant noise (Zhuang et al., 2021).
    
- **AI Safety:** In sensitive domains like healthcare or autonomous driving, the "luck of the draw" in training can lead to inconsistent behavior on specific data subgroups (Zhuang et al., 2021).
    
- **Quantifying Costs:** There is a lack of understanding regarding the performance "tax" (runtime overhead) required to achieve bit-wise determinism (Zhuang et al., 2021).

# Related Work

The paper positions itself against work that focuses primarily on:

- **Algorithmic Variance:** Factors like weight initialization and dropout.
    
- **Reproducibility Studies:** Previous benchmarks that didn't isolate the specific role of the software/hardware stack (tooling).

# Method
How did the authors conduct the research (e.g., experiments, case studies)?

- **Diverse Hardware:** Multiple GPU accelerator architectures.
    
- **State-of-the-Art Networks:** Various model architectures and open-source datasets.
    
- **Isolation:** Separating **Algorithmic Noise (ALGO)** from **Implementation Noise (IMPL)** to see their individual contributions (Zhuang et al., 2021).
    
- **Metrics:** Evaluating top-line accuracy, predictive divergence (churn), and per-class/subgroup variance.
# Conclusion
Strengths/weaknesses, how it compares to other work, and relevance to your own research.

# Future Work
What questions remain unanswered?
