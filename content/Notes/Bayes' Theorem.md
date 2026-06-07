2026-05-08 15:37
Tags: [[Machine Learning]], [[Probability & Statistics]]
***

## 1. The Formula

Bayes' Theorem provides a principled way to update beliefs based on new evidence.

$$P(\theta \mid x) = \frac{P(x \mid \theta) P(\theta)}{P(x)}$$
## 2. Component Analysis
    
- $x$ (Data):
	- The actual observations you have collected 
	- (e.g., sensor readings, image pixels, coin flip results).

- $\theta$ (Parameters):
	- The hidden constants that govern how that data is generated.

- **$P(\theta \mid x)$ (Posterior):** 
	- What we know about the parameters after observing data.
	- The probability of the parameters being true _after_ seeing the data.
    
- **$P(x \mid \theta)$ (Likelihood):** 
	- The probability of the data $x$ occurring given parameters $\theta$.
	- How well the parameters explain the observed data.
    
- **$P(\theta)$ (Prior):** 
	- Your belief about the parameters before seeing any data.
    
- **$P(x)$ (Evidence):** 
	- The total probability of the data under all possible parameters (a normalizing constant).
	- The marginal likelihood of the data, calculated by integrating the numerator over all possible $\theta$: $\int P(x \mid \theta)P(\theta) d\theta$.

In machine learning, we often ignore $P(x)$ because it's constant for a given dataset, and we focus on the relationship:

**Posterior $\propto$ Likelihood $\times$ Prior**.


## 3. In Practice (MAP vs. MLE)

- [[Maximum Likelihood Estimation (MLE)]]: 
	- Choosing $\theta$ that maximizes the Likelihood $P(x \mid \theta)$.
    
- [[Maximum A Posteriori (MAP)]]: 
	- Choosing $\theta$ that maximizes the Posterior $P(\theta \mid x)$. This is essentially MLE with a Prior $P(\theta)$ acting as a "regularizer."



related note: [[Likelihood vs. Probability]]

---
# Reference
