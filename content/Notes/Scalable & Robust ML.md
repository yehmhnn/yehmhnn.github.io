---
title: "Scalable & Robust ML"
created: "2026-06-03 11:06"
tags file:
---
3 Transformer
- [[Transformer]]
	- [[Why Decoder-Only Transformer?]]
- [[Quantization in Transformer]]
	- [[SmoothQuant]]

4 Foundation Models/LLMs
- [[Transformer]] for LLMs
- Embedding Layers
- MHA variants
- Masked MHA
- [[KV Caching]]

5 LLM Optimizations
- Normalization
	- batch norm, layer norm, rms norm
- Attention Variants
- FFN Variants
	- [[Feed-Forward Network (FFN)]]
	- [[Mixture-of-Experts (MoE)]]
	- [[Gated Linear Unit (GLU)]]
		- [[SwiGLU]]
	- [[Conditional FFNs]]
	- [[Token Pruning]]

6 Uncertainty & Ensembling
- [[Out-of-Domain]]
- Core Concepts
	- [[Aleatoric Uncertainty]] & [[Epistemic Uncertainty]] 
		- The two primary dimensions of data and model uncertainty.
	- [[Softmax Calibration]] & [[Post-hoc OOD Scores]] 
		- Why standard neural network outputs cannot be treated as probabilities and how to fix it.
	- [[Uncertainty Decomposition for Classification]] 
		- Mathematical formulation for breaking down total predictive uncertainty.
- Practical & Ensemble Methods
	- [[Monte Carlo Dropout]]
		- A cheap, inference-time approximation of Bayesian neural networks.
	- [[Deep Ensemble]]
		- The state-of-the-art baseline for uncertainty prediction via randomization.
	- [[Repulsive Ensemble]] & [[RLLES]] 
		- Advanced ensemble diversity through explicit optimization penalties.

7 [[Bayesian Inference]]

### Theoretical Foundations
* `[[Frequentist vs. Bayesian Paradigms]]`
	* The philosophical shift from fixed point estimates (MLE & MAP) to modeling parameters as random variable distributions.
* [[Probabilistic Graphical Models (PGMs)]]
	* Visual syntax frameworks (plates, circles, boxes) used to track conditional independence and deterministic vs. probabilistic execution steps.
* [[Bayesian Networks]]
	* Causal reasoning engines operating over Directed Acyclic Graphs (DAGs) and Conditional Probability Tables (CPTs).

### Practical Frameworks & Programming
* [[Probabilistic Programming]]
	* The modern PPL software landscape and core tensor dimension axes syntax (Sample + Batch + Event) required for parallel generative code compilation.
* [[Pyro]]

### Deep Learning Implementations
* `[[Bayesian Neural Network Structural Variations]]` 
	* Engineering trade-offs between tracking weight vs. activation distributions alongside [[homoskedastic]] and [[heteroskedastic]] data noise profiles (NCAR, NAR, NNAR).
* `[[Bayesian Inference Methods]]` 
	* Overcoming weight-space intractability constraints using [[Markov Chain Monte Carlo]] (MCMC) sampling sequences or [[Variational Inference]] (VI) optimization pipelines ([[Evidence Lower Bound]] & [[Reparameterization Trick]]).

8 MCMC
- [[Monte Carlo]]
- [[Markov Chain]]
- [[Markov Chain Monte Carlo]]
	- [[Metropolis-Hastings]]
	- [[Random-Walk Metropolis]]
	- [[Gibbs Sampling]]
	- [[Hamiltonian Monte Carlo]]
		- [[Leapfrog Integration]]
	- [[No-U-Turn Sampler]]
- Parallelization

9 SVI
- [[Variational Inference]] Methods
	- [[Coordinate Ascent Variational Inference (CAVI)]]
	- [[Black Box Variational Inference (BBVI)]]
	- [[Stochastic Variational Inference (SVI)]]
- [[Kullback-Leibler (KL) Divergence]]
- [[Evidence Lower Bound]]
- [[Reparameterization Trick]]
- [[Pyro Guide]]
- Probabilistic Forward Pass

10 Bayesian Neural Networks

11 LLM Inference & Accelerators

12 Scaling rules & future

[[Scalable & Robust ML Mock Exam]]