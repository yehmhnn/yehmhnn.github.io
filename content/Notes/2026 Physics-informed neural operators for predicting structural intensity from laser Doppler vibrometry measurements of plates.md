---
title: 2026 Physics-informed neural operators for predicting structural intensity from laser Doppler vibrometry measurements of plates
created: 2026-05-27 17:46
tags file:
---
# Abstract & Key Takeaways

This paper introduces a Physics-Informed Neural Operator (PINO) framework to map and predict high-frequency structural intensity (vibrational energy flow) in mechanical plates using data captured via Laser Doppler Vibrometry (LDV). By embedding the governing partial differential equations (PDEs) of flexural waves directly into the deep learning model, it bypasses the massive computational grids traditionally required for high-frequency wave simulation.

# Motivation

- _Problem:_ 
	- Predicting high-frequency structural vibration energy flow requires hyper-dense finite element meshes, which are computationally prohibitive for real-time control. Laser measurements provide great spatial data but lack a direct, fast window into underlying energy trends.
    
- _Importance:_ 
	- Real-time localized high-frequency suppression requires knowing exactly _where_ the vibrational energy is traveling across a surface before it reaches critical optical components.

# Related Work

Prior approaches relied on pure Statistical Energy Analysis (SEA), which lacks spatial localized precision, or standard Physics-Informed Neural Networks (PINNs), which must be retrained from scratch every time the boundary conditions or structural shapes change.

# Method

The authors utilized a **Fourier Neural Operator (FNO)** baseline combined with a physics loss function based on Kirchhoff-Love plate bending equations. They validated the method using high-frequency ($>2\text{ kHz}$) vibration data captured by an automated scanning Laser Doppler Vibrometer on various aluminum alloy plates under point-force harmonic excitations.

# Conclusion

- _Strengths:_ Excellent generalization; once trained, the operator can predict high-frequency wave fields across varying plate dimensions instantly without retraining.
    
- _Weaknesses:_ Performance degrades slightly when handling highly dampening composite materials where energy dissipation is non-linear.

# Future Work

Extending the neural operator architecture to handle complex, curved 3D shell geometries (like laser housing casings) rather than flat plates.
