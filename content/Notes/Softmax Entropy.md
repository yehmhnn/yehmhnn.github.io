---
title: "Softmax Entropy"
create: "2026-06-04 12:17"
tags file:
---
**Softmax Entropy** calculates the _average of the entropies_ across your model's forward passes or ensemble members. It directly measures [[Aleatoric Uncertainty]], which represents the inherent noise or ambiguity built into the data itself.

#### The Mathematical Formula:

$$\mathbb{E}_{p(w|D)}(\mathbb{H}(y|x,w))=-\frac{1}{N}\sum_{n=1}^{N}\sum_{c=1}^{C}p(y=c|x,w_{n})\cdot \log(p(y=c|x,w_{n}))$$

- **How to think about the loops:** For every individual weight sample or [[Ensemble]] member ($n$), you compute the entropy across all classes ($c$) first, and _then_ you compute the average of those entropies across the $N$ samples.
    

#### The Intuition (The "Ambiguous MNIST" Example):

- Imagine you feed the network a digit that genuinely looks like a hybrid between a `1` and a `7`.
    
- Every single sample or ensemble member will look at this image and confidently say: _"There is a 50% chance this is a 1, and a 50% chance it is a 7."_
    
- Because every single individual pass outputs a highly uncertain, spread-out probability distribution, the **Softmax Entropy is very high**.
    
- More data cannot resolve this because the image itself is fundamentally ambiguous.