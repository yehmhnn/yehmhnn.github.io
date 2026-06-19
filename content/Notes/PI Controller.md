---
title: "PI Controller"
created: "2026-06-18 19:14"
tags file:
---
A **Proportional-Integral (PI)** controller is a reactive feedback mechanism. It looks at the **Error ($e$)**—the difference between where your laser beam actually is and where you _want_ it to be—and calculates a correction signal using two paths:

$$u(t) = K_p e(t) + K_i \int_{0}^{t} e(\tau) d\tau$$

- **The Proportional Term ($P$):** 
	- This reacts instantly to the _present_ error. If the beam drifts left, it pushes it right. The correction is purely proportional to the size of the mistake.
    
- **The Integral Term ($I$):** 
	- This looks at the _past_ error. It accumulates (integrates) even tiny errors over time. Its job is to eliminate **steady-state error** —ensuring that if a constant force is pushing the beam away, the controller builds up enough muscle to force it back to zero.