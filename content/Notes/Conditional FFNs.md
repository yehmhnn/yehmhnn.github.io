---
title: "Conditional FFNs"
created: "2026-07-25 10:51"
tags file:
---
## The Definition (What)

A Conditional Feed-Forward Network (Conditional FFN) is a neural network component that dynamically selects, modulates, or routes data through specific subsets of its parameters based on the input itself or an external conditioning signal.

## Why It Is Important (Why)

Standard feed-forward layers execute the exact same set of matrix multiplications for every piece of data, wasting memory and computation on simple inputs while limiting model capacity. 

Conditional FFNs solve this by decoupling model size from computational cost (conditional computation); they allow models to scale to trillions of parameters while only activating a fraction of those parameters per input, drastically lowering inference costs and enabling specialized domain expertise within a single network.

## How It Works (How)

Conditional FFNs operate by evaluating the incoming data to decide which sub-networks (often called "experts") to invoke, running only the selected paths, and combining the results.

### Phase 1: Routing Signal Calculation

When an input vector $x$ arrives at a Conditional FFN, a light gating network computes routing scores across a pool of $N$ candidate feed-forward expert networks:

$$s = W_g x + b_g$$

- $x$: The input feature vector.
    
- $W_g, b_g$: The weight matrix and bias of the gating/router network.
    
- $s$: The vector of raw unnormalized routing logits assigned to each expert.
    

### Phase 2: Top-$k$ Selection & Normalization

To enforce sparsity and save computation, the network keeps only the top $k$ highest-scoring experts (often $k = 1$ or $k = 2$) and applies a Softmax function over those chosen scores:

$$g(x) = \text{Softmax}\left(\text{TopK}(s, k)\right)$$

- $\text{TopK}(s, k)$: A function that sets all unselected expert scores to $-\infty$ so their post-softmax probability becomes zero.
    
- $g(x)$: The dynamic routing vector containing non-zero weights only for the selected $k$ experts.
    

### Phase 3: Conditional Execution & Aggregation

Only the selected experts execute their feed-forward calculations on input $x$. The final output is formed by taking a weighted sum of the active experts' outputs:

$$\text{CondFFN}(x) = \sum_{i \in \text{TopK}} g_i(x) \cdot \text{FFN}_i(x)$$

- $\text{FFN}_i(x)$: The transformation performed by expert sub-network $i$, typically taking the standard form $\text{FFN}_i(x) = \sigma(x W_{1,i}) W_{2,i}$.
    
- $g_i(x)$: The dynamic scalar weight determining how much expert $i$ contributes to the final output.
    

## Additional Insights

### Concrete Example: The Specialized Medical Board

Imagine a hospital consulting system:

- **Static FFN:** Every patient (regardless of whether they have a headache, a broken bone, or a rash) is examined by every single specialist in the hospital sequentially.
    
- **Conditional FFN:** A triage nurse (the router) looks at the patient's symptoms (input $x$) and directs them exclusively to the Neurologist and Cardiologist (Top-2 experts). The remaining specialists sit idle, saving energy and time while delivering specialized care.
    

### Direct Comparison: Static Dense FFN vs. Conditional FFN (MoE)

| **Feature**          | **Static Dense FFN**                                             | **Conditional FFN (e.g., Sparse MoE)**                                                   |
| -------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Parameter Usage**  | **100% active:** Every parameter is used for every token/sample. | **Sparse active:** Only a fraction (e.g., 5-10%) of total parameters activate per token. |
| **Compute Scaling**  | Parameter count is tightly bound to computational cost (FLOPs).  | Parameter capacity scales independently of compute per input.                            |
| **Specialization**   | Generalist representation across all parameters.                 | Specialized modular sub-networks suited for different sub-domains.                       |
| **Primary Examples** | Vanilla Transformers (e.g., GPT-3, original BERT)                | [[Mixture-of-Experts (MoE)]] Models (e.g., Mixtral 8x7B, DeepSeek, Gemini MoE)           |

### Major Limitation: Load Imbalance & Memory Bandwidth Bottlenecks

- **Routing Collapse (Load Imbalance):** The gating router naturally prefers a few early high-performing experts. Without auxiliary load-balancing losses, the router will send almost all traffic to 1 or 2 experts, rendering the remaining 98% of the model useless while creating severe computational bottlenecks.
    
- **VRAM Overhead:** Although FLOPS (floating-point operations) are reduced per token because only $k$ experts run, **all expert parameters must still reside in VRAM**. This makes Conditional FFNs memory-heavy to deploy and host compared to standard dense models.