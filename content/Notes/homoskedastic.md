---
title: "homoskedastic"
created: "2026-06-17 17:17"
tags file:
---
In the context of uncertainty quantification and Bayesian modeling, **homoskedastic** and **[[heteroskedastic]]** refer to how a model accounts for aleatoric uncertainty (the inherent noise in the data).

### Homoskedastic Noise

- **Definition:** 
	- Homoskedasticity assumes that the noise variance is constant across the entire input space.
    
- **Model Behavior:** 
	- The model treats the uncertainty as a single, global "noise floor." Regardless of where the input $x$ falls, the model assumes the output $y$ is subject to the same level of randomness ($\sigma^2$).
    
- **In Practice:** 
	- It is simpler to implement but often unrealistic for complex datasets where different regions of the input space are naturally noisier than others.
	