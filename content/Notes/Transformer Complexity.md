---
title: "Transformer Complexity"
created: "2026-07-27 19:41"
tags file:
---
## 1. Fundamentals of Matrix Math

Before looking at the Transformer, keep two rules in mind for matrix operations:

- **Parameter Count:** If a linear layer maps an input vector of dimension $d_{in}$ to an output vector of dimension $d_{out}$, its weight matrix $W$ has dimensions $(d_{in} \times d_{out})$. The total number of parameters (weights) is:
    
$$
\text{Parameters} = d_{in} \cdot d_{out}
$$
    
- **MACs (Multiply-Accumulate Operations):** If you multiply an input matrix $X$ of shape $(L \times d_{in})$ by a weight matrix $W$ of shape $(d_{in} \times d_{out})$, the result has shape $(L \times d_{out})$. Calculating every single element takes $d_{in}$ multiplications and additions. The total MAC count is:
    
$$
\text{MACs} = L \cdot d_{in} \cdot d_{out}
$$
    

Here:

- $L$ = Sequence length (number of input tokens)
    
- $d$ = Hidden dimension size (e.g., $d = 4096$ in modern LLMs)
	- represents the **vector size used to represent each single token** (word or sub-word) as it flows through the Transformer layers.
	- Higher values of $d$ allow the model to encode richer semantic meaning and subtle context for every token, but require significantly more memory and compute.
    
- $d_{ff}$ = Inner dimension of the Feed-Forward Network (standardly set to $4d$)
	- In a Transformer block, after tokens pass through the Attention mechanism, they are fed into a **Feed-Forward Network (FFN)**. The inner dimension $d_{\text{ff}}$ is the size of the intermediate layer inside that FFN.
	- In the original 2017 Transformer paper (_Attention Is All You Need_), the authors set $d_{\text{ff}}$ to be **4 times** the hidden dimension $d$.
	- Expanding the vector space temporarily inside the FFN allows the network to process and store complex factual patterns (acting like a key-value store) before projecting back down to the main model dimension $d$.

## 2. Step-by-Step Breakdown

### Step A: Projection to Query, Key, and Value ($Q, K, V$)

The input $X$ has shape $(L \times d)$. To transform $X$ into Query ($Q$), Key ($K$), and Value ($V$), we multiply $X$ by three learnable weight matrices: $W_Q$, $W_K$, and $W_V$, each of shape $(d \times d)$.

- **Parameters:** Each matrix has $d \cdot d = d^2$ weights. For $W_Q$, $W_K$, and $W_V$ combined:
$$
\text{Parameters} = 3 \cdot d^2
$$
    
- **MACs:** Multiplying $(L \times d)$ by $(d \times d)$ takes $L \cdot d \cdot d = L d^2$ MACs per matrix. For all three:
$$
\text{MACs} = 3 \cdot L \cdot d^2
$$
    

### Step B: The Attention Calculation ($QK^T$ and Attention $\cdot V$)

Attention computes relationships between tokens using the matrices generated in Step A:

1. **Computing Attention Scores ($Q \cdot K^T$):**
    
    - $Q$ shape: $(L \times d)$
        
    - $K^T$ shape: $(d \times L)$
        
    - Multiplication $(L \times d) \times (d \times L) \to (L \times L)$ matrix.
        
    - **MACs:** $L \cdot d \cdot L = L^2 d$
        
2. **Weighting the Values ($\text{Softmax} \cdot V$):**
    
    - Attention matrix shape: $(L \times L)$
        
    - $V$ shape: $(L \times d)$
        
    - Multiplication $(L \times L) \times (L \times d) \to (L \times d)$ matrix.
        
    - **MACs:** $L \cdot L \cdot d = L^2 d$
        

- **Parameters:** **$0$** (This is an operation performed directly between activation tensors; no learnable weight matrices are involved).
    
- **Total Attention MACs:** $L^2 d + L^2 d = 2 L^2 d$.
    

### Step C: Output Projection Layer ($W_O$)

After calculating attention, the result $(L \times d)$ is projected back through a output weight matrix $W_O$ of shape $(d \times d)$.

- **Parameters:** $d \cdot d = d^2$
    
- **MACs:** $L \cdot d \cdot d = L d^2$
    

### Step D: Feed-Forward Network (FFN / MLP)

The Feed-Forward Network consists of two linear projections:

1. **Up-projection ($W_1$):** Projects shape $(L \times d)$ to $(L \times d_{ff})$.
    
    - Weight matrix shape: $(d \times d_{ff})$
        
    - Parameters: $d \cdot d_{ff} = d \cdot 4d = 4d^2$
        
    - MACs: $L \cdot d \cdot d_{ff} = 4 L d^2$
        
2. **Down-projection ($W_2$):** Projects shape $(L \times d_{ff})$ back to $(L \times d)$.
    
    - Weight matrix shape: $(d_{ff} \times d)$
        
    - Parameters: $d_{ff} \cdot d = 4d \cdot d = 4d^2$
        
    - MACs: $L \cdot d_{ff} \cdot d = 4 L d^2$
        

- **Total FFN Parameters:** $4d^2 + 4d^2 = 8d^2$
    
- **Total FFN MACs:** $4 L d^2 + 4 L d^2 = 8 L d^2$
    

## 3. Total Summary per Transformer Layer

By summing up all four steps:

- **Total Parameters:**
    
$$
\underbrace{3d^2}_{\text{Q,K,V}} + \underbrace{0}_{\text{Attention}} + \underbrace{d^2}_{\text{Output Proj.}} + \underbrace{8d^2}_{\text{FFN}} = 12d^2
$$
    
- **Total MACs:**
    
$$
\underbrace{3Ld^2}_{\text{Q,K,V}} + \underbrace{2L^2 d}_{\text{Attention}} + \underbrace{Ld^2}_{\text{Output Proj.}} + \underbrace{8Ld^2}_{\text{FFN}} = 12Ld^2 + 2L^2 d
$$
    