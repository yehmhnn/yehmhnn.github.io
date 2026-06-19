---
title: "Scalable & Robust ML"
created: "2026-06-03 11:06"
tags file:
---
## Ch 6 Uncertainty Quantification & Ensemble Methods

### Core Concepts

- [[Aleatoric Uncertainty]] & [[Epistemic Uncertainty]] 
	- The two primary dimensions of data and model uncertainty.
- [[Softmax Calibration]] & [[Post-hoc OOD Scores]] 
	- Why standard neural network outputs cannot be treated as probabilities and how to fix it.
- [[Uncertainty Decomposition for Classification]] 
	- Mathematical formulation for breaking down total predictive uncertainty.
    
### Practical & Ensemble Methods

- [[Monte Carlo Dropout]]
	- A cheap, inference-time approximation of Bayesian neural networks.
- [[Deep Ensemble]]
	- The state-of-the-art baseline for uncertainty prediction via randomization.
- [[Repulsive Ensemble]] & [[RLLES]] 
	- Advanced ensemble diversity through explicit optimization penalties.

---

## Ch 7 Bayesian Modeling
### Theoretical Foundations
* `[[Frequentist vs. Bayesian Paradigms]]`
	* The philosophical shift from fixed point estimates (MLE & MAP) to modeling parameters as random variable distributions.
* [[Probabilistic Graphical Models (PGMs)]]
	* Visual syntax frameworks (plates, circles, boxes) used to track conditional independence and deterministic vs. probabilistic execution steps.
* [[Bayesian Networks]]
	* Causal reasoning engines operating over Directed Acyclic Graphs (DAGs) and Conditional Probability Tables (CPTs).

### Practical Frameworks & Programming
* [[Probabilistic Programming Languages]]
	* The modern PPL software landscape and core tensor dimension axes syntax (Sample + Batch + Event) required for parallel generative code compilation.
* [[Pyro]]

### Deep Learning Implementations
* `[[Bayesian Neural Network Structural Variations]]` 
	* Engineering trade-offs between tracking weight vs. activation distributions alongside [[homoskedastic]] and [[heteroskedastic]] data noise profiles (NCAR, NAR, NNAR).
* `[[Bayesian Inference Methods]]` 
	* Overcoming weight-space intractability constraints using [[Markov Chain Monte Carlo]] (MCMC) sampling sequences or [[Variational Inference]] (VI) optimization pipelines ([[ELBO]] & Reparameterization trick).