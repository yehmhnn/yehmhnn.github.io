---
title: "heteroskedastic"
created: "2026-06-17 17:17"
tags file:
---
In the context of uncertainty quantification and Bayesian modeling, **[[homoskedastic]]** and **heteroskedastic** refer to how a model accounts for aleatoric uncertainty (the inherent noise in the data).

### Heteroskedastic Noise

- **Definition:** 
	- Heteroskedasticity assumes that the noise variance is **input-dependent**.
    
- **Model Behavior:** 
	- The model learns to predict a variance $\sigma(x)$ as a function of the input. This allows the model to become "confident" in regions of the input space that are inherently clean and "uncertain" in regions that are inherently messy or noisy.
    
- **In Practice:** 
	- This is essential for robust systems, as it allows the model to distinguish between its own lack of knowledge and the actual noise level present in specific data points.
	