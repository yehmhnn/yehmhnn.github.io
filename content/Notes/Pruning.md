---
title: "Pruning"
created: "2026-06-24 12:48"
tags file:
---
### The Definition (What)

Pruning is the process of removing unnecessary or redundant weights and connections from a neural network to make it smaller and faster without significantly hurting its accuracy.

### Why It Is Important (Why)

It directly cuts down the number of mathematical calculations required during inference, enabling models to execute faster and consume significantly less battery power on hardware compared to unpruned models.

### How It Works (How)

1. **Evaluate Importance:** The algorithm analyzes a trained model to score the importance of its weights (commonly by checking their size or magnitude).
    
2. **Remove Weak Connections:** Weights that fall below a certain threshold—meaning they are close to zero and barely affect the final output—are dropped from the network.
    
3. **Fine-tune:** The remaining network is briefly retrained to "heal" any minor accuracy loss caused by removing those connections.
    

The fundamental mechanism for magnitude-based pruning relies on a mask matrix:

$$W_{\text{pruned}} = W \odot M$$

- **$W_{\text{pruned}}$** is the resulting network weight matrix after pruning.
    
- **$W$** is the original, fully trained weight matrix.
    
- **$\odot$** represents the element-wise multiplication operator.
    
- **$M$** is a binary mask matrix where the value is $0$ if a weight's absolute value is below the threshold (cutting the connection), and $1$ if it is kept.
    

### Additional Insights
    
- **A Direct Comparison: Structured vs. Unstructured Pruning:** Unstructured pruning cuts individual weights randomly across the network; while it creates a tiny file size, standard computer chips struggle to see speed gains from it. Structured pruning removes entire columns, rows, or attention heads at once, creating a clean, smaller shape that immediately speeds up on any standard GPU.
    
- **A Major Limitation:** If you push pruning too far (e.g., cutting away more than 50% to 70% of the network), you hit a cliff where vital foundational knowledge gets permanently erased, causing a catastrophic and unrecoverable drop in the model's intelligence.