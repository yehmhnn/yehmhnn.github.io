---
title: "Scalable & Robust ML"
created: "2026-06-03 11:06"
tags file:
---
### 1. Hardware & ML Foundations

- **[[Hardware and ML Accelerators]]**: Traditional CMOS processors (GPUs, TPUs) vs. emerging technologies like Analog, Photonic, and RRAM computing.
- **[[Representation Learning]]**: How image classification and language modeling serve as pretext tasks to map inputs into a dense, semantic feature space for downstream tasks.
- **[[Noisy Training and Hardware Corrections]]**: Hardening neural architectures against noise found in non-traditional/analog hardware using noise injection and robust optimization.
- **[[Quality Metrics for ML Models]]**: Moving beyond loss and accuracy to metrics like mAP (Mean Average Precision) for object detection and AUROC for out-of-domain detection.

### 2. Transformers & Large Language Models (LLMs)

- **[[Sequence Models and Autoregression]]**: The foundational shift to generating tokens sequentially based on previous contexts.
- **[[Transformer Architecture Block]]**: Core components including Self-Attention, Positional Encoding, and Feed-Forward Networks (FFN).
- **[[Foundation Models and Emergent Abilities]]**: Zero/few-shot generalization, chain-of-thought reasoning, and how scaling laws lead to sudden discrete capabilities.
- **[[LLM Inference Bottlenecks]]**: The "Memory Wall", specifically how the prefill phase is compute-bound while the autoregressive decode loop is heavily memory-bandwidth bound.
- **[[KV Caching]]**: Storing past Key and Value representations to prevent redundant recomputation during text generation.

### 3. Scalable Transformer Optimizations

- **[[Hardware-Aware Attention Optimizations]]**: Techniques like **FlashAttention**, which fuses CUDA kernels and uses tiling to avoid materializing the full attention matrix in high-bandwidth memory.
- **[[Multi-Latent Attention (MLA)]]**: Compressing the Key/Value cache footprint by mapping tokens to a compressed latent representation.
- **[[Mixture-of-Experts (MoE)]]**: Replacing dense FFNs with sparsely activated "expert" pools to drastically increase model capacity without increasing compute cost per token.

### 4. Uncertainty & Robustness in ML

- **[[Epistemic vs Aleatoric Uncertainty]]**: Decomposing uncertainty into model ignorance (Epistemic) versus inherent data noise (Aleatoric).
- **[[Quantifying Uncertainty in Classification]]**: Using Softmax Entropy and Mutual Information to evaluate predictions and handle Out-of-Distribution (OOD) data.
- **[[Ensemble Methods for Uncertainty]]**: **Deep Ensembles** as a scalable baseline, **Monte Carlo Dropout (MCDO)**, and **Repulsive Ensembles** that use variance regularizers to calibrate uncertainty.

### 5. Bayesian Modeling & Inference

- **[[Bayes Theorem Fundamentals]]**: Updating prior beliefs with data likelihood to calculate the posterior distribution (MAP vs. MLE estimation).
- **[[Probabilistic Graphical Models (PGM)]]**: Visualizing conditional dependencies using observed/unobserved random variables, deterministic parameters, and plate notation.
- **[[Bayesian Neural Networks (BNNs)]]**: Replacing deterministic weights with probability distributions to naturally capture uncertainty in deep learning.
- **[[Probabilistic Programming with Pyro]]**: Implementing generative models, tracking deterministic variables, and utilizing conditional independence (plates).

### 6. Advanced Sampling & Variational Inference

- **[[Markov Chain Monte Carlo (MCMC)]]**: Iterative sampling from high-dimensional distributions using methods like **Metropolis-Hastings** and **Gibbs Sampling**.
- **[[Hamiltonian Monte Carlo (HMC)]]**: Using Hamiltonian mechanics (potential and kinetic energy) and Leapfrog integration to efficiently explore probability spaces.
- **[[Stochastic Variational Inference (SVI)]]**: Turning inference into an optimization problem by minimizing KL divergence (or maximizing the **ELBO**) to fit a parameterized approximation to the true posterior.

---

## Ch3 Transformer
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