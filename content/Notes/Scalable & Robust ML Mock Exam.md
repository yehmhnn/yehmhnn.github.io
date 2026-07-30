---
title: SREML Mock Exam
created: 2026-07-27 15:01
tags file:
  - "[[Scalable & Robust ML]]"
---
## Part 1: Scalable ML & Transformer Architecture

### Q1 Transformer blocks

Explain the transformer block for a decoder-only architecture. We recommend sketch a block diagram. Discuss the intuitions behind the different components, if applicable.

#### Answer

A **decoder-only Transformer** (e.g., GPT series, LLaMA) processes input tokens autoregressively to predict the next token.

#### Key Components & Intuition

- **[[Masked Multi-Head Attention]]:**
    
    - _Intuition:_ Allows tokens to look back at previous tokens to gather context.
        
    - _Why Masked?_ Prevents tokens from "cheating" by looking at future tokens during training (causal masking).
        
- **[[Residual Connections]] (Skip Connections):**
    
    - _Intuition:_ Provides an "information highway" that allows gradients to flow smoothly during backpropagation, preventing vanishing gradients in deep networks.
        
- **Layer Normalization (LayerNorm / RMSNorm):**
    
    - _Intuition:_ Stabilizes training by keeping activations within a predictable scale across layers.
        
- [[Feed-Forward Network (FFN)]]:
    
    - _Intuition:_ Acts as a key-value memory store that processes and transforms the contextualized information gathered by the attention mechanism.
        

---
### Q2 Transformer Complexity

[[Transformer Complexity]]: resource costs regarding to MACs and parameters count

#### Answer

Let:

- $d$ = hidden dimension (model dimension)
- $L$ = sequence length
- $d_{ff}$ = feed-forward inner dimension (typically $4d$)
    

|**Component**|**Parameter Count**|**MACs (Multiply-Accumulate Operations)**|
|---|---|---|
|**Q, K, V Projections**|$3 \cdot d^2$|$3 \cdot L \cdot d^2$|
|**Attention Matrix ($QK^T + \text{Softmax} \cdot V$)**|$0$ (No learnable parameters)|$2 \cdot L^2 \cdot d$|
|**Output Projection ($O$)**|$d^2$|$L \cdot d^2$|
|**Feed-Forward Layer (FFN)**|$2 \cdot d \cdot d_{ff} \approx 8d^2$|$2 \cdot L \cdot d \cdot d_{ff} \approx 8 \cdot L \cdot d^2$|

> **Key Takeaway:** Parameter count and linear projections scale linearly with sequence length ($O(L)$), but the attention matrix computation scales quadratically ($O(L^2)$).


---
### Q3 Quantization

Explain Post-Training Quantization (PTQ), the intuition behind [[SmoothQuant]], and how different quantization methods compare.

#### Answer

**Post-Training Quantization (PTQ)** converts trained float weights (FP16/FP32) to lower precision (INT8/INT4) without retraining the full model.

#### The Challenge with LLMs

Activating large language models creates **outliers** (extreme values) in specific feature channels. Quantizing these outliers directly to INT8 causes massive accuracy loss.

#### SmoothQuant Intuition

SmoothQuant redistributes the quantization difficulty between activations and weights. It mathematically migrates the activation outliers into the weight matrix using a per-channel scaling factor $s$:

$$
Y = (X \cdot \text{diag}(s)^{-1}) \cdot (\text{diag}(s) \cdot W)
$$

#### Comparison of Quantization Approaches

- **Weight-Only Quantization (e.g., GPTQ, AWQ):** Keeps activations in FP16, quantizes only weights to INT4/INT8. Saves memory capacity; best for memory-bound token generation.
    
- **Weight-Activation Quantization (e.g., SmoothQuant, LLM.int8()):** Quantizes both weights and activations to INT8. Enables faster compute kernels (INT8 GEMM); best for compute-bound throughput processing.
    

## Part 2: Robust ML & Bayesian Neural Networks (BNNs)

### Q4 Bayes Theorems

Bayes Theorems and Inferences: State Bayes Theorem in the context of BNNs. Why is exact Bayes Inference intractable in such models?

#### Answer

In a [[Bayesian Neural Network]], we assign a prior distribution $p(w)$ over the parameters (weights) $w$. Given training data $\mathcal{D} = (X, Y)$, Bayes' Theorem gives the posterior distribution over weights:

$$
p(w \mid \mathcal{D}) = \frac{p(\mathcal{D} \mid w) \, p(w)}{p(\mathcal{D})}
$$

#### Why Exact Inference is Intractable

Computing the marginal likelihood (evidence) $p(\mathcal{D})$ requires integrating over the entire weight space:

$$
p(\mathcal{D}) = \int p(\mathcal{D} \mid w) \, p(w) \, dw
$$

1. **High Dimensionality:** Modern neural networks have billions of weights ($\mathbb{R}^d$ where $d \ge 10^9$).
    
2. **Non-Linearity:** The likelihood $p(\mathcal{D} \mid w)$ is highly non-convex due to deep non-linear activations, making the integral analytical uncomputable.
    

### Q5 SVI

SVI: Briefly describe how SVI approximates posterior. What is the ELBO, and how is it related to KL divergence? Why is ELBO optimized instead of KL divergence?

#### Answer

**[[Stochastic Variational Inference (SVI)]]** turns an integration problem into an optimization problem. Instead of computing the true posterior $p(w \mid \mathcal{D})$, SVI posits a tractable family of distributions $q_\theta(w)$ (the variational distribution) and optimizes its parameters $\theta$ to match $p(w \mid \mathcal{D})$.

#### The ELBO Definition

The **[[Evidence Lower Bound]] (ELBO)** is defined as:

$$
\text{ELBO}(\theta) = \mathbb{E}_{q_\theta(w)} [\log p(\mathcal{D} \mid w)] - D_{\text{KL}}(q_\theta(w) \parallel p(w))
$$

#### Relationship to KL Divergence

The true marginal likelihood $\log p(\mathcal{D})$ can be decomposed as:

$$
\log p(\mathcal{D}) = \text{ELBO}(\theta) + D_{\text{KL}}(q_\theta(w) \parallel p(w \mid \mathcal{D}))
$$

#### Why Optimize ELBO Instead of KL Divergence?

We want to minimize $D_{\text{KL}}(q_\theta(w) \parallel p(w \mid \mathcal{D}))$ to make $q$ close to $p$. However, calculating this KL directly requires knowing the intractable true posterior $p(w \mid \mathcal{D})$.

Because $\log p(\mathcal{D})$ is a constant with respect to $\theta$, **maximizing the ELBO directly minimizes the KL divergence to the true posterior** without needing to compute $p(w \mid \mathcal{D})$.

### Q6 Guide in SVI

Guide: What is the purpose of the guide in SVI? 
List and explain the main considerations when designing an effective guide.
[[Pyro Guide]]

#### Answer

In [[Probabilistic Programming]] frameworks, the **guide** (or variational distribution $q_\theta(w)$) is an auxiliary probabilistic model used to approximate the unobserved latent variables of the main **model** $p(\mathcal{D}, w)$.

#### Considerations for Designing an Effective Guide

1. **Expressiveness vs. Tractability:** Fully factorized (Mean-Field) distributions are easy to compute but ignore correlations between weights. Structured guides capture dependencies but increase computational cost.
    
2. **Support Alignment:** The guide must cover the exact same domain/support as the model's latent variables (e.g., if a variable in the model must be strictly positive, the guide must enforce positivity).
    
3. **Differentiability:** The parameters $\theta$ of the guide must be differentiable to allow gradient-based updates (e.g., via the reparameterization trick).
    

### Q7 SVI-BNN

A. Training a SVI-BNN: roles of different components: module, guide, optimizer, elbo, training loop. 
B. Implement a Bayesian model, like Bayesian linear regression.

#### Answer

#### Roles of Components

- **Model:** Defines the generative process (priors and likelihood equation).
    
- **Guide:** Parameterizes the approximate posterior distribution $q_\theta(w)$.
    
- **ELBO:** Serves as the loss function (minimized as $-\text{ELBO}$).
    
- **Optimizer:** Updates guide parameters $\theta$ via stochastic gradients.
    
- **Training Loop:** Iteratively samples mini-batches, evaluates ELBO, calculates gradients, and steps the optimizer.
    

#### Implementation Concept (Pyro-style Bayesian Linear Regression)

Python

```
import torch
import pyro
import pyro.distributions as dist
from pyro.infer import SVI, Trace_ELBO
from pyro.optim import Adam

# 1. Define Model
def model(x, y):
    # Priors for weight and bias
    w = pyro.sample("w", dist.Normal(0.0, 1.0))
    b = pyro.sample("b", dist.Normal(0.0, 1.0))
    
    # Likelihood
    mean = w * x + b
    with pyro.plate("data", x.shape[0]):
        pyro.sample("obs", dist.Normal(mean, 0.1), obs=y)

# 2. Define Guide
def guide(x, y):
    # Variational parameters to learn
    w_loc = pyro.param("w_loc", torch.tensor(0.0))
    w_scale = pyro.param("w_scale", torch.tensor(1.0), constraint=dist.constraints.positive)
    
    pyro.sample("w", dist.Normal(w_loc, w_scale))
    pyro.sample("b", dist.Normal(0.0, 1.0))

# 3. Setup SVI & Training
optimizer = Adam({"lr": 0.01})
svi = SVI(model, guide, optimizer, loss=Trace_ELBO())

for step in range(1000):
    loss = svi.step(x_data, y_data)
```

## Part 3: Systems & Hardware Performance

### Q8 MCMC

Compare MCMC sampling and Transformer model training across parameters, parallelism, memory access patterns, control flow, and hardware optimization on CPUs and GPUs.

#### Answer

|**Dimension**|**MCMC Sampling**|**Transformer Training**|
|---|---|---|
|**Control Flow**|Sequential / Conditional branching (Accept/Reject steps).|Static, deterministic computational graphs.|
|**Parallelism**|Low intra-chain parallelism; sequential step $t$ depends on step $t-1$.|High data and tensor parallelism across millions of operations.|
|**Memory Access**|Random / Pointer-chasing walks through target space; unpredictable cache behavior.|Predictable, continuous stride memory access (dense matrix multiplication).|
|**Hardware Preference**|**CPU-friendly:** Benefits from high clock speeds and fast single-thread latencies.|**GPU/TPU-friendly:** Maximizes massive parallel compute units (Tensor Cores).|

### Q9 KV Cache

a. Explain what KV cache is and how it affects autoregressive decoding computation.
b. Discuss implications of [[KV caching]] for hardware performance (compute reuse, memory access patterns, off/on-chip memory requirements).
#### Answer

#### a. Mechanics & Impact

During autoregressive generation, generating token $t$ requires computing Key ($K$) and Value ($V$) projections for all preceding tokens $1 \dots t-1$.

Without KV Caching, previously calculated keys and values are recomputed at every step, leading to $O(N^3)$ computational cost for $N$ tokens. **KV Cache stores past Key and Value vectors in memory**, reducing compute complexity per token step from $O(N^2)$ to $O(N)$.

#### b. Hardware Implications

- **Compute Reuse:** Shifts the workload from being **compute-bound** (dense matrix multiplications during prefill) to **memory-bandwidth bound** (fetching cached KV tensors for single-token projections).
    
- **Memory Access Patterns:** Requires dynamic allocation and appending to memory, leading to memory fragmentation issues (solved by techniques like _PagedAttention_).
    
- **On-Chip vs. Off-Chip Memory:**
    
    - SRAM (On-chip) is too small to fit the large cache of long sequences.
        
    - HBM/DRAM (Off-chip) capacity limits the maximum batch size and sequence length, making high memory bandwidth crucial for fast token generation.