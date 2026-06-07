---
title: "Test-Time Scaling (TTS)"
created: "2026-05-07 16:45"
tags file:
---
***

**Test-Time Scaling** (also known as **Inference-Time Scaling** or **Inference Compute**) is a paradigm in machine learning where you allocate more computational power _during the generation phase_ (when the model is answering a prompt) to improve the quality of the final output.

Traditionally, the AI industry focused heavily on **Training-Time Scaling**—the idea that to get a smarter model, you had to train a larger neural network on more data using more GPUs. At test time, these models simply did a single, left-to-right pass to generate text, meaning the compute used per word was fixed.

Test-Time Scaling shifts this approach: it allows a model to "think longer" and use more compute at inference to arrive at a better answer.

Here is how it is typically implemented:

### 1. Search and Exploration (Multi-Path Generation)

Instead of generating a single sequence of text, the system generates multiple possible solutions or reasoning paths.

- **Best-of-N Sampling:** The model generates 100 different answers. A secondary model (a verifier or Reward Model) evaluates all 100 and selects the single best one.
    
- **Tree Search (e.g., Monte Carlo Tree Search):** The model generates step-by-step logic. At each step, it branches out into multiple possible next steps. It explores these branches, scores them, prunes the dead ends, and backtracks if it realizes a path is failing.
    

### 2. Extended Chain-of-Thought (CoT)

The system forces the model to generate a massive amount of intermediate reasoning text before outputting the final answer.

- By generating "thinking tokens" that might not be shown to the user, the model breaks complex problems into micro-steps. More tokens equal more computational steps, which reduces logical leaps and errors.
    
- This is the underlying mechanism behind models like OpenAI's **o1**, which pause to "think" for several seconds or minutes before responding.
    

### 3. Iterative Refinement and Self-Correction

The model generates an initial draft or solution, and then acts as its own critic.

- It might write a piece of code, simulate running it in its "head" (or in an actual execution environment), identify bugs, and rewrite it.
    
- It repeats this loop until it reaches a confidence threshold or hits a compute limit.
    

### Why is this a major shift?

- **Beating the Size Ceiling:** Research has shown that a much smaller model (e.g., a 7B parameter model) given significant test-time compute to search for the best answer can outperform a massive model (e.g., a 70B parameter model) that only gets one shot at answering.
    
- **Dynamic Resource Allocation:** Not all queries need the same amount of brainpower. Test-time scaling allows a system to use minimal compute for a simple question ("What is the capital of France?") and scale up massive compute for a complex one ("Solve this novel calculus problem").
    

### How it relates to PRMs (Process Reward Models)

In papers like [[2025 GenPRM - Scaling Test-Time Compute of Process Reward Models via Generative Reasoning]] and [[2025 CodePRM - Execution Feedback-enhanced Process Reward Model for Code Generation]], test-time scaling relies entirely on having a reliable **Verifier**. If you are going to generate 1,000 different reasoning paths at test time, you need an incredibly accurate way to grade those paths step-by-step. PRMs act as the "navigational system" that tells the model which branches of thought are worth spending more test-time compute on.

---
# Reference
