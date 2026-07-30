---
title: "KV Caching"
created: "2026-07-28 21:28"
tags file:
---
## The Definition (What)

**KV (Key-Value) Caching** is an optimization technique used in Large Language Models (LLMs) that saves the intermediate mathematical representations of previously processed tokens so the model doesn't have to recompute them when generating every new word.

## Why It Is Important (Why)

Without KV caching, LLMs face a massive computational bottleneck during generation: every time the model predicts token $N+1$, it has to recompute the attention scores for all preceding $N$ tokens from scratch.

By storing these precomputed Key and Value vectors in memory, KV caching reduces token generation time from quadratic time complexity $\mathcal{O}(N^2)$ to linear time complexity $\mathcal{O}(N)$, dramatically speeding up inference speed and reducing energy costs during long multi-turn conversations.

## How It Works (How)

### Phase 1: The Standard Attention Step (Without Cache)

In a standard Transformer, self-attention computes how much each token in a sequence should focus on every other token. For a input sequence of $N$ tokens, the model projects the token embeddings into three matrices: **Queries ($Q$)**, **Keys ($K$)**, and **Values ($V$)**. The mathematical output for scaled dot-product attention is defined as:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

- $Q \in \mathbb{R}^{N \times d_k}$: What the current token is searching for.
    
- $K \in \mathbb{R}^{N \times d_k}$: What identity/context each previous token offers.
    
- $V \in \mathbb{R}^{N \times d_v}$: The actual information content delivered by each token.
    
- $\sqrt{d_k}$: A scaling factor (where $d_k$ is the feature dimension of keys) that prevents inner products from growing too large in high dimensions.

#### The "Naive" Way (Without KV Cache)

Imagine you give the LLM a 1,000-word prompt: `"Write an essay about..."`

1. **To output Word 1001:** The model processes words $1 \dots 1000$. It runs all 1,000 words through its math layers, generating $Q, K,$ and $V$ for all 1,000 words to calculate attention and predict word #1001.
    
2. **To output Word 1002:** The model now receives all 1,001 words. It runs words $1 \dots 1001$ through the entire neural network **from scratch**, recalculating $Q, K,$ and $V$ for words $1 \dots 1000$ _again_, plus word #1001, just to generate word #1002.
    
3. **To output Word 1003:** It recalculates $Q, K,$ and $V$ for words $1 \dots 1002$ _from scratch again_.
    
If you generate a 500-word answer to a 1,000-word prompt, you are mathematically recalculating the exact same past activations thousands of times.

### Phase 2: The KV Cache Mechanism (Token-by-Token Generation)

During [[auto-regressive decoding]], the model generates one new token at step $t+1$. Instead of re-projecting all $t$ past tokens into $Q, K,$ and $V$, the model only projects the **single new token** to get $q_{t+1}$, $k_{t+1}$, and $v_{t+1}$.

It then appends the new $k_{t+1}$ and $v_{t+1}$ to the stored **KV Cache**:

$$K_{\text{cached}} = \begin{bmatrix} K_{\text{past}} \\ k_{t+1} \end{bmatrix}, \quad V_{\text{cached}} = \begin{bmatrix} V_{\text{past}} \\ v_{t+1} \end{bmatrix}$$

The updated attention computation for generating the next token simplifies to:

$$\text{Output}_{t+1} = \text{softmax}\left(\frac{q_{t+1} K_{\text{cached}}^T}{\sqrt{d_k}}\right) V_{\text{cached}}$$

- $q_{t+1} \in \mathbb{R}^{1 \times d_k}$: Only a single row query vector for the newly generated token.
    
- $K_{\text{cached}} \in \mathbb{R}^{(t+1) \times d_k}$: The concatenated matrix of all past and current Key vectors.
    
- $V_{\text{cached}} \in \mathbb{R}^{(t+1) \times d_v}$: The concatenated matrix of all past and current Value vectors.
    

Because $K_{\text{past}}$ and $V_{\text{past}}$ are loaded directly from memory rather than recomputed across all Transformer layers, matrix operations drop significantly.

#### Why did past tokens' $K$ and $V$ need to be computed?

In self-attention, to predict the next word, the new word's **Query ($q_{\text{new}}$)** needs to look back and "talk" to the **Keys ($K_{\text{past}}$)** and **Values ($V_{\text{past}}$)** of all previous words to understand context.

$$\text{Attention Score} = \text{softmax}\left(\frac{q_{\text{new}} \cdot K_{\text{past}}^T}{\sqrt{d_k}}\right) V_{\text{past}}$$

Notice what is missing from that formula: **$Q_{\text{past}}$**.
- Once a word has already been processed in previous steps, its Query vector is never used again! Only its **Key** (its context label) and **Value** (its information payload) are needed for future words to attend to.

## Additional Insights

### A Major Limitation: High Memory Overhead (VRAM Bottleneck)

While KV caching solves the **compute (FLOPs)** bottleneck, it creates a massive **GPU High-Bandwidth Memory (HBM)** bottleneck.

The memory required to store the KV Cache grows linearly with batch size, sequence length, number of layers, and hidden dimensions:

$$\text{Memory}_{\text{KV}} = 2 \times \text{Batch Size} \times \text{Sequence Length} \times \text{Num Layers} \times \text{Num Heads} \times \text{Head Dim} \times \text{Bytes per Precision}$$

> **Example Impact:** > For a 70B parameter model operating at FP16 precision with a sequence length of 8,000 tokens and a batch size of 1, the KV cache alone can consume over **10 GB of VRAM**—often exceeding the memory footprint required to run the model's weights during inference!

### A Direct Comparison: Prefill Phase vs. Generation Phase

|**Feature**|**Prefill Phase (Prompt Processing)**|**Generation Phase (Token Output)**|
|---|---|---|
|**Input**|The entire user prompt at once ($N$ tokens).|One token at a time ($1$ token).|
|**KV Cache Role**|**Populates** the cache with initial keys & values.|**Reads & Appends** to the existing cache.|
|**Bottleneck**|Compute-bound (Parallelized matrix multiplication).|Memory-bandwidth bound (Loading large cached matrices).|