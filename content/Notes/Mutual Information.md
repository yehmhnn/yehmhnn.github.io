---
title: "Mutual Information"
create: "2026-06-04 12:19"
tags file:
---
**Mutual Information** measures the information shared between the model's weight distribution and its prediction. It isolates [[Epistemic Uncertainty]], which is the model's "lack of knowledge" or architectural uncertainty about an input.

#### The Mathematical Formula:

Mutual Information is computed by taking the **Total Predictive Uncertainty ([[Shannon Entropy]])** and subtracting the [[Softmax Entropy]]:

$$\mathbb{I}(y,w|x,D)=\mathbb{H}(y|x,D)-\mathbb{E}_{p(w|D)}(\mathbb{H}(y|x,w))$$

- **How to think about the loops:** It measures how much the individual ensemble members _disagree_ with each other.
    

#### The Intuition (The "Fashion MNIST / Out-of-Domain" Example):

- Imagine you take a network trained strictly to recognize handwritten digits (`0-9`) and you feed it an image of a **T-shirt** (Fashion-MNIST).
    
- Because the model has never seen a shoe or a shirt before, its ensemble members will wildly disagree:
    
    - Member 1 might sample weights that classify the shirt as an `8` (with 95% confidence).
        
    - Member 2 might sample weights that classify it as a `3` (with 95% confidence).
        
    - Member 3 might classify it as a `0` (with 95% confidence).
        
- Notice that each individual member is _highly confident_ (yielding low individual entropy, meaning **[[Softmax Entropy]] is low**).
    
- However, when you average their predictions together, the average result is a completely flat, uncertain distribution (yielding high **Total [[Shannon Entropy]]**).
    
- Subtracting a low Softmax Entropy from a high Total Entropy results in a **very high Mutual Information score**.