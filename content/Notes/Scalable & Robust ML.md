---
title: "Scalable & Robust ML"
create: "2026-06-03 11:06"
tags file:
---
## Ch 6 Uncertainty Quantification & Ensemble Methods

### Core Concepts

- [[Aleatoric Uncertainty]] & [[Epistemic Uncertainty]] 
	- — The two primary dimensions of data and model uncertainty.
    
- [[Softmax Calibration]] & [[Post-hoc OOD Scores]] 
	- — Why standard neural network outputs cannot be treated as probabilities and how to fix it.
    
- [[Uncertainty Decomposition for Classification]] 
	- — Mathematical formulation for breaking down total predictive uncertainty.
    
### Practical & Ensemble Methods

- [[Monte Carlo Dropout]] — A cheap, inference-time approximation of Bayesian neural networks.
    
- [[Deep Ensemble]] — The state-of-the-art baseline for uncertainty prediction via randomization.
    
- [[Repulsive Ensemble]] & [[RLLES]] — Advanced ensemble diversity through explicit optimization penalties.