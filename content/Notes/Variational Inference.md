---
title: "Variational Inference"
created: "2026-06-16 11:10"
tags file:
---
- **Core Concept:** Shifts the problem from a complex sampling challenge into a **deterministic optimization task**.
    
- **Methodology:** Rather than searching for the true complex posterior directly, you define a simple, known distribution family $q(w)$ (such as a Gaussian curve) and optimize its parameters ($\mu, \sigma$) to mirror the true posterior closely.