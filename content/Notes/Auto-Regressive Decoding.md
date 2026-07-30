---
title: "Auto-Regressive Decoding"
created: "2026-07-29 10:27"
tags file:
---
## What is Auto-Regressive Decoding?

**Auto-regressive decoding** is the step-by-step process that generative AI models (like ChatGPT, Claude, and LLaMA) use to generate text.

The term **"auto-regressive"** means that the model uses its own previous outputs as part of the input for predicting the next step. Instead of generating an entire sentence or paragraph all at once, the model generates text **one token (word or word piece) at a time**.

## How It Works Step-by-Step

1. **Initial Prompt:** You give the model an input prompt, such as `"The sky is"`.
    
2. **Predicting Token 1:** The model evaluates the prompt and calculates probabilities for the next likely word. It selects **`"blue"`**.
    
3. **Appending to Input:** The output `"blue"` is appended back to the original prompt, forming a new input: `"The sky is blue"`.
    
4. **Predicting Token 2:** The model evaluates this expanded sequence and predicts the next token: **`"."`**.
    
5. **Repeat until Stopped:** This loop repeats iteratively until the model generates a special **End-of-Sequence (EOS)** token or reaches a maximum length limit.
    

## Mathematical Formulation

Mathematically, auto-regressive decoding decomposes the joint probability of generating a sequence of $T$ tokens $W = (w_1, w_2, \dots, w_T)$ into a product of conditional probabilities:

$$P(w_1, w_2, \dots, w_T) = \prod_{t=1}^{T} P(w_t \mid w_1, w_2, \dots, w_{t-1})$$

- **$P(w_t \mid w_1, \dots, w_{t-1})$:** The probability of generating token $w_t$ given all the tokens generated before it.
    
- **$\prod_{t=1}^{T}$:** The product over each time step $t$ from $1$ to $T$.
    

## Key Characteristics & Trade-offs

- **Sequential Nature:** Because step $t+1$ depends on the result of step $t$, generation cannot be fully parallelized across time steps. This makes generation slower than prompt processing (prefill).
    
- **Contextual Coherence:** By considering all past tokens at each step, the model maintains local and global coherence throughout long texts.
    
- **Sampling Strategies:** During each step, the model picks tokens using decoding strategies like **Greedy Search** (picking the highest probability token), **Top-$k$ / Top-$p$ Sampling**, or **Temperature** adjustments to control randomness and creativity.