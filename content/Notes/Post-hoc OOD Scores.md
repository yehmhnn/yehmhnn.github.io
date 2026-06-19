---
title: "Post-hoc OOD Scores"
created: "2026-06-04 07:26"
tags file:
---
- [[Post-hoc]]
- [[OOD]]

When true probabilistic modeling is too computationally expensive, simple post-hoc deterministic scores are used to identify out-of-domain data:

1. **Maximum Softmax Probability (MSP):** Using the maximum raw softmax value as a confidence proxy.
    
2. **MaxLogit:** Relying directly on the largest raw unscaled logit output.
    
3. **Energy-based OOD:** Mapping logits to a physics-inspired scalar energy value.
    

- **Trade-off:** Computational overhead is remarkably low , but their OOD detection quality is significantly outperformed by true [[Bayesian Neural Network]]s.
