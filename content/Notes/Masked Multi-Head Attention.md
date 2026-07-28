---
title: Masked Multi-Head Attention
created: 2026-07-27 18:01
tags file:
aliases:
  - MHA
---
## The Definition (What)

Masked Multi-Head Attention is a mechanism in AI models that allows a network to process different parts of a sequence simultaneously while explicitly blocking its view of future words so it can only focus on past and present context.

## Why It Is Important (Why)

It solves the problem of **information leakage** during the training of generative language models (like GPT). Without masking, a model processing an entire sentence at once could "cheat" by looking ahead at the exact words it is trying to predict; masking forces the model to learn genuine context-based prediction while still benefiting from parallel processing on GPUs.

## How It Works (How)

Masked Multi-Head Attention transforms an input sequence through five logical phases, blending linear algebra with probability to restrict future information flow:

### 1. Linear Projection to $Q$, $K$, and $V$

For a given sequence representation matrix $X$, the model creates three distinct vectors for each word using learned weight matrices ($W^Q, W^K, W^V$): **Queries ($Q$)** (what the current word is looking for), **Keys ($K$)** (what identity each word holds), and **Values ($V$)** (the actual content information to pass forward).

$$
Q = XW^Q, \quad K = XW^K, \quad V = XW^V
$$

Think of $Q, K, V$ like a YouTube search:
- **Query ($Q$):** What you type into the search bar (_"funny cat videos"_).
- **Key ($K$):** The titles and tags of all the videos stored on YouTube's servers.
- **Value ($V$):** The actual video content that plays when a key matches your query.

### 2. Calculating Unmasked Attention Scores

To measure how much attention every word should pay to every other word, the model calculates the dot product of the Query matrix and the transposed Key matrix, scaling the result by $\sqrt{d_k}$ (where $d_k$ is the dimension of the keys) to keep gradients stable:

$$\text{Scores} = \frac{QK^T}{\sqrt{d_k}}$$

At this stage, token $i$ can still see scores for future tokens $j > i$.

### 3. Applying the Mask Matrix ($M$)

To eliminate future visibility, an attention mask $M$—an upper-triangular matrix filled with $-\infty$ above the main diagonal and $0$ on and below it—is added to the raw scores:

$$\text{Masked Scores} = \frac{QK^T}{\sqrt{d_k}} + M$$

Where the mask $M_{ij}$ is defined as:

$$M_{ij} = \begin{cases} 0 & \text{if } i \ge j \quad (\text{past or present token}) \\ -\infty & \text{if } i < j \quad (\text{future token}) \end{cases}$$

### 4. Softmax Normalization and Value Weighting

Passing the masked scores through the $\text{softmax}$ function turns the values into probabilities. Because $e^{-\infty} = 0$, any future positions receive an exact attention weight of $0$, completely blocking information leakage. The resulting weights are then multiplied by the Value matrix $V$:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}} + M\right)V$$

### 5. Multi-Head Combination

Instead of doing this once, the model performs this process $h$ times in parallel (each called a "head") with different learned weights, allowing it to attend to multiple types of relationships simultaneously. Finally, the outputs are concatenated and projected:

$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \dots, \text{head}_h)W^O$$

## Additional Insights

### A Concrete Example

Consider the sentence: **"The robot baked a cake."**

- When processing the word **"baked"** (index 2):
    
    - Unmasked attention would allow "baked" to look at **"a"** and **"cake"**.
        
    - **Masked** attention forces the score for "a" and "cake" to $-\infty$. After applying the softmax function, the attention weights for future words become **$0\%$**, ensuring "baked" can only use context from **"The"** and **"robot"**.
        

### A Direct Comparison: Self-Attention vs. Masked Self-Attention

|**Feature**|**Standard Self-Attention**|**Masked Multi-Head Attention**|
|---|---|---|
|**Visibility**|Bidirectional (looks at both past and future words).|Unidirectional (looks only at past and present words).|
|**Primary Use Case**|Encoders (e.g., BERT) for comprehension tasks like classification or named entity recognition.|Decoders (e.g., GPT, LLaMA) for autoregressive text generation.|
|**Masking Matrix**|None (or only padding masks to ignore blank tokens).|Causal mask (upper-triangular matrix set to $-\infty$).|