---
title: Post-hoc
created: 2026-06-03 19:38
tags file:
  - "[[Scalable & Robust ML]]"
---
**Post-hoc** is a Latin phrase meaning "after this" or "after the fact."

- **Definition:** 
	- In machine learning, a post-hoc method is an algorithm or score applied **after a neural network has already finished its standard training**.
    
- **How it works:** 
	- Instead of changing the model architecture, altering the loss function, or training a highly complex probabilistic network from scratch, you take a standard, pre-trained model and apply a mathematical calculation directly to its final outputs (such as its raw logits or softmax outputs).
    

#### Examples of Post-hoc Methods:

1. **[[Temperature Scaling]]:** 
	- A post-hoc calibration technique where raw network outputs (logits) are divided by a learned scalar temperature value ($T$) after training. This helps fix model overconfidence and maps the outputs closer to actual probabilities.
    
2. [[Post-hoc OOD Scores]]: 
	- Simple deterministic metrics calculated from a trained network to see if an input is out-of-domain. Common examples include:
	    - _Maximum Softmax Probability (MSP)_
	    - _MaxLogit_
	    - _Energy-based OOD Scores_

#### The [[Post-hoc]] Trade-off:

- **Pros:** The computational overhead is extremely low. You do not need to run computationally expensive operations or execute dozens of forward passes to get an uncertainty estimate.
    
- **Cons:** Their OOD-detection and uncertainty calibration quality is strictly limited and heavily outperformed by deeper probabilistic approaches, such as true [[Bayesian Neural Network]]s.
