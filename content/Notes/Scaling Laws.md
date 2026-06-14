---
title: Scaling Laws
created: 2026-06-13 11:05
tags file:
  - "[[ML System]]"
---
Coined fundamentally by OpenAI in 2020 and later refined by DeepMind (the "Chinchilla" Scaling Laws) in 2022, **Scaling Laws** are empirical formulas proving that an AI model’s performance (measured by its reduction in error/loss) follows a highly predictable [[power law]] relationship.

Crucially, performance depends on three metrics:

1. **$N$**: The number of model parameters (size of the brain).
    
2. **$D$**: The number of training tokens (amount of data fed to it).
    
3. **$C$**: The total amount of compute power used (FLOPs).
    

### The "Chinchilla Optimal" Rule

Before these laws were finalized, researchers built massive models with hundreds of billions of parameters but trained them on relatively small datasets. DeepMind proved this was a massive waste of energy. They showed that **to scale a model optimally, parameters ($N$) and data ($D$) must scale in equal proportion.**

For optimal compute efficiency, the golden ratio for LLMs is roughly:

$$D \approx 20 \cdot N$$

> **The Translation:** If you want to increase your model size from 7 Billion parameters to a 70 Billion parameters ($10\times$ increase), you cannot just make the model bigger. You _must_ also give it $10\times$ more data during training, or the system will be wildly inefficient.