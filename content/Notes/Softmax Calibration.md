---
title: "Softmax Calibration"
create: "2026-06-04 07:14"
tags file:
---
Softmax calibration is the process of adjusting a neural network’s raw probability outputs so that they accurately reflect the true likelihood of a prediction being correct.

### The [[Softmax]] Fallacy

- While softmax outputs map strictly to the range $[0, 1]$, **softmax outputs are not true probabilities**.
    
- Modern network architectures and advanced training techniques actually _increase_ model overconfidence, widening the gap between accuracy and confidence. (e.g., a 90% softmax score but only 70% actual accuracy)
    

### [[Temperature Scaling]]

To transform raw network logits ($z$) into calibrated confidence scores, **Temperature Scaling** can be applied [[Post-hoc]] using a learned scalar parameter $T$:

$$\sigma_{i}(z;T)=\frac{\exp(z_{i}/T)}{\sum_{j}\exp(z_{j}/T)}$$