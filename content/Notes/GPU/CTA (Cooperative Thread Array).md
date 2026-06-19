---
title: "CTA (Cooperative Thread Array)"
created: "2026-04-14 18:15"
tags file:
  - [[GPU]]
---
***
**CTA** stands for **Cooperative Thread Array**. In the CUDA thread hierarchy, this is the formal name for a **Thread Block**.

- **Mapping:** Each CTA is mapped to exactly one **Streaming Multiprocessor (SM)**.
    
- **Abstraction:** It is a user-defined abstraction that remains independent of the actual hardware architecture.
    
- **Scheduling:** The CTA is one of the primary scheduling entities on the GPU.
    
- **Communication:** Threads within a single CTA can coordinate and share data through **Shared Memory**.


---
# Reference
