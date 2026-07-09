---
title: Low-Rank Adaptation (LoRA)
created: 2026-06-24 12:41
tags file:
---
### The Definition (What)

LoRA is an efficient fine-tuning technique that freezes a large model's original parameters and injects small, manageable pairs of trainable matrices into its layers to adapt it to new tasks.

### Why It Is Important (Why)

It reduces training memory and storage requirements by up to 99% compared to full fine-tuning, allowing developers to customize massive models using a fraction of the compute power.

### How It Works (How)

1. **Freeze the Core:** The massive, pre-trained weight matrix ($W_0$) of the LLM is completely locked so its original parameters never change.
    
2. **Inject Small Matrices:** Two incredibly thin, low-rank matrices ($A$ and $B$) are placed right next to the locked layer.
    
3. **Train the Add-on:** During training, only the values in $A$ and $B$ are updated, capturing the new task or style. When running the model, incoming data passes through both paths and the results are combined.
    

The mathematical update to the layer's output is expressed as:

$$Y = W_0X + \Delta WX = W_0X + \frac{\alpha}{r}(BA)X$$

- **$Y$** is the final output of the network layer.
    
- **$W_0$** is the frozen, pre-trained weight matrix.
    
- **$X$** is the incoming input data.
    
- **$B$ and $A$** are the newly added, highly compressed low-rank matrices.
    
- **$r$** is the "rank" (an integer controlling how tiny and compressed matrices $A$ and $B$ are).
    
- **$\alpha$** is a constant scaling factor that adjusts how heavily the new adjustments influence the original model.
    

### Additional Insights
    
- **A Major Limitation:** LoRA is explicitly built for adapting _existing_ knowledge to specific tasks or styles. If you are trying to teach an AI entirely new, deeply complex foundational capabilities—such as learning an entirely new spoken language from scratch—LoRA matrices lack the raw capacity to handle it, and you will need to resort to traditional full fine-tuning.