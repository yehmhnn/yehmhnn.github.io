---
title: Logit
created: 2026-05-12 15:55
tags file:
---
**Logits** are the raw, unnormalized output values from the final linear layer of a classification model.

- **The Values:** They can be any real number from $-\infty$ to $+\infty$.
    
- **The Purpose:** They represent the "evidence" or "scores" the model has accumulated for each class. If a logit for "Class A" is $15.0$ and the logit for "Class B" is $-2.0$, the model is much more confident in Class A.
    
- **The Limitation:** Because they aren't bounded (they don't have to sum to 1), humans (and loss functions) find them difficult to interpret as probabilities.
