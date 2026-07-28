---
title: Transformer
created: 2026-07-14 14:04
tags file:
  - "[[LLM]]"
  - "[[Scalable & Robust ML]]"
---
## The Definition (What)

A Transformer is a type of artificial intelligence architecture designed to understand the relationships between all the words in a sentence or sequence at the same time, rather than reading them one by one.

## Why It Is Important (Why)

Before Transformers, AI models processed language sequentially—reading word-by-word like a human. This meant older models (like Recurrent Neural Networks, or RNNs) took a long time to train and would easily "forget" the beginning of a long paragraph by the time they reached the end.

The Transformer completely solved this by processing entire blocks of text simultaneously (**parallelization**). This allows the model to capture long-range relationships across massive amounts of text instantly, which is the exact breakthrough that made modern generative AI (like ChatGPT) possible.

## How It Works (How)

The Transformer operates by transforming raw text into math, projecting it into a multi-dimensional space to analyze relationships, and then generating a response. Here is how that blueprint operates step-by-step.

![[Pasted image 20260714222046.png|273]]

### 1. The Entry Point: Embeddings & Positional Encoding ($\oplus$)

Look at the very bottom of both towers where you see **Inputs** and **Outputs (shifted right)**.

- **Input/Output Embedding:** Words are converted into high-dimensional vectors (lists of numbers) that capture their core definition.
    
* **Outputs (shifted right):** This label represents how text enters the Decoder. Its exact behavior depends entirely on whether the model is **learning** or **generating**:
    * **During Training (Parallel Learning):** We feed the entire target sentence in at once, but shifted right by inserting a `<START>` token at the beginning (e.g., feeding `["<START>", "I", "want", "to"]` to predict `["I", "want", "to", "eat"]`). Together with Masked Attention, this forces the model to learn to predict the next word in parallel without "cheating" by looking ahead.
    * **During Inference (The Real-Time Loop):** When actively generating text, there is no future text to shift. The Decoder starts by reading only the `<START>` token, predicts the first word, and then feeds that output word *back* into its own input to predict the next, creating a step-by-step feedback loop.

- **Positional Encoding ($\sim$):** Because the architecture doesn't process text sequentially, it has no native concept of word order. The model injects a mathematical wave function (the sine/cosine symbol) into the embeddings via the plus sign ($\oplus$). This mathematically stamps the position of each word into its data vector.


### 2. The Left Tower: The Encoder ($N\times$)

The left block is responsible for "reading." The $N\times$ means this entire grey box is stacked on top of itself multiple times (typically 6 to 12 layers deep) to build a deep understanding.

Once the words are represented as vectors, the model needs to figure out which words relate to each other. This is done using **Self-Attention**.

For every single word in the sequence, the model generates three new vectors: 
- a **Query ($Q$)** (what the word is looking for)
- a **Key ($K$)** (what the word can offer)
- a **Value ($V$)** (the actual content of the word).

**Multi-Head Attention:** This is where the model calculates how words relate to each other. For every word vector, it calculates a **Query ($Q$)**, a **Key ($K$)**, and a **Value ($V$)** using the following core formula:

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

Here is exactly what each mathematical component is doing:

- **$Q K^T$ (The Matching Score):** This multiplies the Query matrix of our words by the transposed Key matrix of all other words. It calculates a raw "compatibility score" between every pair of words. If a Query matches a Key well, their dot product is high.
    
- **$\sqrt{d_k}$ (The Scaler):** We divide the score by the square root of the dimension of the key vectors ($d_k$). Without this, in high dimensions, the dot products would grow extremely large, pushing the next step (softmax) into flat zones where the model stops learning.
    
- **$\text{softmax}(\dots)$ (The Focus Filter):** This function squashes the scaled scores into probabilities between 0 and 1 that sum up to 1. This generates an "attention map," telling the model exactly what percentage of its focus to allocate to each word.
    
- **Multiplying by $V$ (The Output):** Finally, we multiply these attention percentages by the Value vector. This extracts the actual meaning of the words we decided to pay attention to, while ignoring the irrelevant ones.

- **Add & Norm (The Skip Arrows):** Notice the lines that branch off _around_ the Multi-Head Attention and Feed Forward blocks? These are **[[residual connections]]**. They allow the original word information to bypass the heavy math layers unchanged, preventing vital data from getting distorted or lost as it climbs up the tower.
    
- **Feed Forward:** A standard, independent neural network layer that processes each word's new contextual meaning individually. ([[Feed-Forward Network (FFN)]])

### 3. The Right Tower: The Decoder ($N\times$)

The right block is responsible for "writing" the response, one word at a time. It also loops $N\times$ times.

- **[[Masked Multi-Head Attention]]:** At the very bottom right, you see "Masked" attention. When generating text, the AI must not cheat by looking ahead at words it hasn't written yet. The "Mask" mathematically blanks out all future tokens by setting their attention scores to $-\infty$, ensuring the model only looks backward at what it has already generated.
    
- **The Bridge (The Cross-Attention arrows):** Look closely at the middle Multi-Head Attention block in the right tower. Notice how **two arrows come from the left tower** and **one comes from below**.
    
    - The two arrows from the left supply the **Keys ($K$)** and **Values ($V$)** (the full meaning of the prompt).
        
    - The arrow from below supplies the **Queries ($Q$)** (what the AI is currently trying to write).
        
    - This allows the Decoder to check its homework against the original prompt before deciding what word to write next:
    
$$
\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \dots, \text{head}_h)W^O
$$
$$
\text{head}_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)
$$

> A single word might have different types of relationships simultaneously (e.g., grammatical, factual, or emotional). To capture all of these, the Transformer uses **Multi-Head Attention**, running multiple attention calculations in parallel.

> Each **$\text{head}_i$** looks at a different linguistic angle, which are then fused back together via **$\text{Concat}$** and smoothed out by the final weight matrix **$W^O$**.

- **$W_i^Q, W_i^K, W_i^V$ (The Projection Weights):** These are unique, learnable matrices for each "head" ($i$). They project the data into different mathematical spaces, allowing Head 1 to focus on grammar (like linking verbs to nouns), while Head 2 focuses on context (like linking pronouns to people).
    
- **$\text{Concat}(\dots)$ (The Merger):** Once each head has finished looking at its specific relationship, their outputs are glued back together.
    
- **$W^O$ (The Final Polish):** This is a final weight matrix that blends the merged outputs back into a single, cohesive vector of the correct size.
    

### 4. The Exit: Linear & Softmax

Once the data reaches the very top of the right tower, it passes through two final stages:

- **Linear:** A standard layer that maps the mathematical vectors back into a massive list of numbers—one number for every single word in the AI's dictionary (its vocabulary).
    
- **Softmax:** Turns those raw numbers into a clear percentage probability. The word with the highest probability is chosen as the next word in the sequence, and the whole cycle restarts.

## Additional Insights

### A Concrete Example

To see Self-Attention in action, look at how a Transformer resolves the word **"it"** in these two sentences:

> _"The animal didn't cross the street because **it** was too tired."_
> 
> _"The animal didn't cross the street because **it** was too wide."_

A human easily knows that in the first sentence, "it" is the animal, and in the second, "it" is the street.

The Transformer achieves this using $Q K^T$. In sentence one, the Query for "it" finds a strong mathematical match with the Key for "animal" because of the word "tired." In sentence two, the Query for "it" matches strongly with the Key for "street" because of the word "wide."

### A Direct Comparison: Encoder vs. Decoder

While your diagram shows the complete, original Transformer, modern AI models often use only half of it:

- **Encoder-Only (e.g., BERT):** Uses only the left tower. Excellent for analysis, sentiment tracking, or classification because it can look left-and-right across a text simultaneously.
    
- **Decoder-Only (e.g., GPT-4, Llama):** Uses only a modified version of the right tower. Excellent for open-ended text generation because it excels at predicting the next most logical word. ([[Why Decoder-Only Transformer?]])
### A Major Limitation: The Quadratic Bottleneck

While incredibly powerful, the Transformer has a massive Achilles' heel: **quadratic computational complexity ($O(N^2)$)**.

Because every word must calculate its relationship to every other word, the number of calculations grows exponentially relative to the input length ($N$). If you double the length of your prompt from 1,000 words to 2,000 words, the computer doesn't do twice as much work—it does **four times ($2^2$)** as much work. This is the primary reason AI models have "context window" limits and require massive, expensive data centers to run.