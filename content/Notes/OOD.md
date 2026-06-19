---
title: OOD
created: 2026-06-03 19:36
tags file:
  - "[[Scalable & Robust ML]]"
---
**OOD** stands for **Out-of-Domain** (or Out-of-Distribution) data.

- **Definition:** In machine learning, OOD refers to test examples or environments that look significantly different from the "In-Domain" (ID) data the model was originally trained on.
    
- **The Core Problem:** Classical neural networks are deterministic and lack the capability to say _"I don't know"_. When given OOD data, they will still make a prediction, often with dangerously high confidence.
    
- **Connection to Uncertainty:** OOD data is the primary driver of [[Epistemic Uncertainty]] (also known as modeling uncertainty). Unlike data noise, epistemic uncertainty can be reduced if you collect more training data that covers these missing domains.

#### Examples:

- **The Driverless Car:** A driverless car encountering wet, freshly poured concrete on a road and getting stuck. Because the vehicle's vision network was never trained on the visual domain of active, wet construction concrete, it failed to identify it as a hazard.
    
- **The Image Dataset Shift:** If a model is trained exclusively to recognize clean, handwritten digits (the MNIST dataset), the digits represent In-Domain data. If you then feed that same model pictures of clothing (the Fashion-MNIST dataset), the clothing items act as Out-of-Domain (OOD) data.
