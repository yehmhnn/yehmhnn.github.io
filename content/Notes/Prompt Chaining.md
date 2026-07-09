---
title: Prompt Chaining
created: 2026-06-20 15:10
tags file:
  - "[[Agentic Design Patterns (Antonio Gulli)]]"
---
In _Agentic Design Patterns_, Antonio Gulli highlights **Prompt Chaining** as the fundamental gateway pattern for moving beyond single-turn interactions. It represents the transition from treating an LLM like an omniscient oracle to treating it as a step-by-step programmatic pipeline.

# The Architecture Loop

Instead of forcing a single model to reason, analyze, format, and review all in one massive execution hop, the workflow is serialized:

```
[User Input] 
     │
     ▼
┌──────────┐      ┌───────────┐      ┌───────────┐
│ Prompt 1 │ ───> │  Prompt 2 │ ───> │  Prompt 3 │ ───> [Final Output]
└──────────┘      └───────────┘      └───────────┘
 (Extract)          (Transform)         (Format)
```

1. **Step 1 (Extraction/Isolation):** The raw data is passed to Prompt 1 to extract core entities or clean up noise.
    
2. **Step 2 (Processing/Transformation):** The output of Step 1 is injected into Prompt 2's template to perform the primary reasoning or translation task.
    
3. **Step 3 (Formatting/Validation):** The output of Step 2 is handed to Prompt 3 to be structured into its final payload (e.g., rigid JSON or Markdown).
    

### Why It Matters: Benefits vs. Trade-offs

#### The Advantages

- **Massive Accuracy Boost:** LLMs perform significantly better when given single, highly focused objectives per execution cycle rather than a massive checklist of instructions.
    
- **Deterministic Debugging:** If an enterprise workflow fails, chaining allows developers to pinpoint exactly which prompt in the sequence broke or hallucinated.
    
- **Cost and Model Optimization:** You can route simple steps (like text cleaning) to cheaper, faster models, saving expensive frontier models only for the critical reasoning links in the chain.
    

#### The Pitfalls

- **Latency Accumulation:** Because each step relies on the output of the previous one, the steps cannot run simultaneously. The total response time is the sum of all API round-trips.
    
- **Cascading Failures:** If Step 1 returns a malformed or corrupted output, that error compounds and ruins every subsequent link down the line.
    

### Practical Implementation Example

A classic production pattern is generating a technical blog post from raw research notes:

- **Link 1 (`Fact Extractor`):** Read 5,000 words of messy interview transcripts $\rightarrow$ Output a bulleted list of verified technical claims.
    
- **Link 2 (`Outline Generator`):** Read the bulleted claims $\rightarrow$ Generate a structured 4-part content outline.
    
- **Link 3 (`Drafting Engine`):** Read the outline and the original claims $\rightarrow$ Write the full-length technical article.
    
- **Link 4 (`JSON Formatter`):** Read the article $\rightarrow$ Output a JSON payload containing the article, meta-tags, and an SEO description.