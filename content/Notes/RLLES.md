---
title: RLLES
create: 2026-06-04 12:40
tags file:
  - "[[Scalable & Robust ML]]"
---
While full [[Repulsive Ensemble]]s are mathematically robust, training multiple entire neural networks with a complex cross-network penalty kernel is incredibly expensive and does not scale well to deep architectures.

**Repulsive Last Layer Ensembles (RLLES)** are a highly compute- and parameter-efficient compromise designed for deep networks and real-world deployment.

#### 1. The Architecture

Instead of duplicating and repelling the entire network, RLLES splits the model into two distinct sections:

- **Shared Deterministic Backbone:** A single, standard deep neural network backbone (often pre-trained) that processes the input and extracts features. All ensemble members share this exact same backbone.
    
- **Ensemble Heads:** Multiple independent last-layer (or last few layers) heads branching off from the shared backbone.

![[Pasted image 20260604125352.png|396]]


#### 2. Fine-Tuning and Repulsion

During uncertainty-aware fine-tuning, the repulsion loss term is applied **only to the last-layer ensemble heads** in **function space** rather than weight space. By evaluating the diversity of outputs on a set of validation or "repulsive" samples, the heads are mathematically pushed to disagree on out-of-domain data while maintaining accuracy on in-domain data.

#### 3. Essential Calibration Parameters

Because the backbone is deterministic and the heads are tightly constrained, RLLES architectures require explicit post-hoc calibration to balance their uncertainty predictions accurately:

- **Aleatoric Calibration ($\lambda_{reg}$):** A variance regularizer parameter used to fine-tune how the ensemble captures data-level noise and randomness.
    
- **Epistemic Calibration ($\gamma$):** A repulsion scale factor used to adjust the strength of the repulsion kernel, directly tuning the ensemble's sensitivity to out-of-domain edge cases.