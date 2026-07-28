---
title: Why Decoder-Only Transformer?
created: 2026-07-14 23:13
tags file:
---
It is one of the biggest "aha!" moments in modern AI history.

In the original 2017 paper, _Attention Is All You Need_, the Transformer was designed as a translation machine (e.g., English to French). This required two specialized towers: an **Encoder** to fully digest and understand the English input, and a **Decoder** to generate the French output word-by-word.

But as AI scaled up, researchers asked a radical question: _What if we just kicked the Encoder out entirely and let a modified Decoder do all the work?_

Here is exactly why the Encoder was abandoned for models like GPT-4, LLaMA, and Claude.

### 1. Unified Interface: Treating Prompt and Response as One Sequence

In an Encoder-Decoder system, the input (your prompt) and the output (the AI's response) are treated as two fundamentally different things, processed in different computational spaces.

In a **Decoder-Only** system, everything is treated as one long, continuous sequence of text. Your prompt is simply the _beginning_ of the sequence, and the AI’s task is simply to _complete_ it:

- **Prompt:** _"The capital of France is..."_
    
- **Completion:** _"...Paris."_
    

Because the Decoder naturally uses masked attention to predict what word comes next, it doesn't need a separate "reading" tower to understand the prompt. It simply treats your prompt as the starting context and starts predicting the next word.

### 2. Deleting the Computational Middleman

If you look at the original full Transformer diagram, the **Decoder** has a middle attention block called **Multi-Head Cross-Attention** (the "bridge"). This bridge is computationally expensive because it constantly maps the Decoder's output back to the Encoder's representations.

By abandoning the Encoder, researchers could completely delete this middle cross-attention layer.

- **Fewer components** mean simpler, cleaner code.
    
- **Fewer parameters** mean the model runs much more efficiently on GPUs.
    
- In deep learning, **simplicity scales**. It is vastly easier to scale a single, highly-optimized Decoder tower to hundreds of billions of parameters than it is to scale a complex, double-tower system.
    

### 3. Next-Token Prediction Automatically Teaches "Understanding"

The original theory was that you _needed_ an Encoder for bidirectional understanding (reading text forward and backward to grasp its true context) and a Decoder just for generation.

However, researchers discovered a fascinating quirk of scale: **if you train a Decoder-Only model on the simple task of predicting the next word across the entire internet, it accidentally learns to "understand" text anyway.** To predict the next word in a complex physics paper, a computer program, or a riddle, the model has to implicitly figure out grammar, context, math, and logic. A separate, bidirectional "understanding" tower became completely redundant.

### 4. Extreme Efficiency in Chat (The KV Cache Superpower)

For multi-turn chat applications (like ChatGPT), you are constantly feeding the previous conversation history back to the model.

In a Decoder-only model, you can use a trick called **KV (Key-Value) Caching**. Since the model only generates one new word at a time, it can "save" the mathematical representations of the prompt and past messages in memory. It never has to re-process the prompt; it only calculates the math for the single new word it is currently writing.

If we kept the Encoder, we would have to re-encode the entire prompt and history from scratch every time the model wanted to generate another word, leading to a massive slowdown.

### In Summary: The Minimalist Wins

The shift to Decoder-Only was a triumph of minimalism. Why build a complex system with a designated "Reader" (Encoder) and "Writer" (Decoder) when you can just build a highly optimized "Writer" that reads the prompt as part of its draft?

For a deeper look into this architectural choice, watch [How Transformers Work - Attention Explained Step by Step](https://www.youtube.com/watch?v=4w1xlFRfayM). This video is incredibly helpful because it breaks down the core structural differences between encoders and decoders, explicitly explaining why modern models like GPT and Claude ended up abandoning the encoder tower.