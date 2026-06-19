---
title: "Spectral Leakage"
created: "2026-06-18 18:44"
tags file:
---
The FFT algorithm operates under a strict mathematical assumption: it believes the finite chunk of data you gave it repeats infinitely, looping over and over.

- **The Ideal Case:** 
	- If your sample window catches a signal over an exact integer number of cycles, the end of the sample matches perfectly with the start. The loop is perfectly seamless.
    
- **The Real-World Case:**
	- Most of the time, the wave gets cut off mid-cycle. When the FFT tries to loop this piece, it creates a sharp, artificial "cliff" or discontinuity where the end forces its way back to the beginning.
    

In the physics of waves, a sharp, instantaneous change like this requires an infinite sum of high frequencies to construct. Because of this boundary artifact, energy from your true frequency "leaks" out across the entire spectrum, muddying your plot and throwing off your predictions. If you don't use a window, you are implicitly using a **Rectangular Window**, which acts like a brutal cookie-cutter.

Solution: [[Windowing]]