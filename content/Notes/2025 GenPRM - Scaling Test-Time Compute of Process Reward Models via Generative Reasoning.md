---
title: "2025 GenPRM - Scaling Test-Time Compute of Process Reward Models via Generative Reasoning"
created: "2026-05-07 16:38"
tags file:
---

Title: 
Authors: 
Year: 
Journal/Conference: 
***
# Abstract
What are the main takeaways, answers to research questions, or new findings?

Current PRMs face a "ceiling" because they are typically trained as classifiers that output a single number. This has three main drawbacks:

- **Limited Interpretability:** A scalar doesn't explain _why_ a step is wrong.
    
- **Wasted Capability:** It ignores the pre-trained generative reasoning of the LLM.
    
- **Scaling Bottleneck:** You can’t "think harder" to get a better scalar, but you _can_ generate more detailed reasoning to reach a more accurate verdict. The paper addresses the need for a verifier that can scale its performance through "test-time compute"—essentially giving the verifier more time to reason about the solution's correctness.

# Motivation
What problem does the paper address and why is it important?

# Related Work


# Method
How did the authors conduct the research (e.g., experiments, case studies)?

The authors introduce three key components:

1. **Generative Supervision:** GenPRM is trained to produce a rationale ($v_t$) and a reward token ($r_t$) for each step.
    
2. **Code-Integrated Verification:** For technical or math tasks, the model generates and executes code snippets to verify its internal logic before providing a final step reward.
    
3. **Relative Progress Estimation (RPE):** Instead of binary labels (correct/incorrect), they use RPE to estimate how much a specific step actually brings the model closer to the final answer compared to other potential paths.
    
4. [[Test-Time Scaling (TTS)]]: They use GenPRM in two ways:
    
    - **As a Verifier:** Standard "Best-of-N" or tree search.
        
    - **As a Critic:** Using the generated rationales to iteratively refine and "edit" the policy model’s output.


# Conclusion
Strengths/weaknesses, how it compares to other work, and relevance to your own research.

# Future Work
What questions remain unanswered?
