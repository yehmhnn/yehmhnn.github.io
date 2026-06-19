---
title: "ELBO"
created: "2026-06-16 11:58"
tags file:
---
#### The Evidence Lower Bound (ELBO) Objective

[[Variational Inference]] trains the network parameters by maximizing the Evidence Lower Bound (ELBO), which serves as the system's operational loss function:

$$\mathcal{L}_{ELBO} = \mathbb{E}_{q(w)}[\log P(D|w)] - \text{KL}[q(w) \,||\, P(w)]$$

- **$\mathbb{E}_{q(w)}[\log P(D|w)] \rightarrow$ Reconstruction Likelihood:** 
	- Pushes the model to fit and predict the training data accurately.
    
- **$\text{KL}[q(w) \,||\, P(w)] \rightarrow$ Kullback-Leibler Divergence:** 
	- Acts as a regularizer, penalizing the variational posterior $q(w)$ if it drifts too far from the initial prior assumptions $P(w)$.