---
title: "Windowing"
created: "2026-06-18 18:46"
tags file:
---
Windowing solves [[Spectral Leakage]] by altering the amplitude of your time-series sample before the FFT sees it. Instead of letting the signal drop off a cliff at the boundaries, a window function multiplies the data by a bell-like curve.

Both windows are constructed using cosine shapes to create a smooth arch:

$$
\text{Hann:} \quad w(n) = 0.5 \left(1 - \cos\left(\frac{2\pi n}{N-1}\right)\right)
$$

$$
\text{Hamming:} \quad w(n) = 0.54 - 0.46 \cos\left(\frac{2\pi n}{N-1}\right)
$$

By applying this multiplication, the data at the very left and very right edges of your timeline is faded out to zero (or very close to it). This eliminates the boundary discontinuity entirely. When the FFT loops the signal, the transitions are perfectly smooth, and the artificial high-frequency "noise" vanishes.

## Hann vs. Hamming: The Classical Trade-Off

You can't get something for nothing in signal processing. While windowing squashes spectral leakage (sidelobes), it also slightly distorts the signal's true peaks, making them look a bit wider (main lobe broadening). Hann and Hamming handle this compromise slightly differently:

|**Metric**|**Hann Window**|**Hamming Window**|
|---|---|---|
|**Edge Behavior**|Tapers precisely to **0** at the boundaries.|Tapers to **0.08** (does not fully hit zero).|
|**Sidelobe Suppression**|The first sidelobe is moderately high, but subsequent lobes drop off **incredibly fast**.|Optimized to make the _very first_ sidelobe as small as possible, but later lobes decay **slowly**.|
|**Best Used For**|General purpose noise analysis, transient signals, and tracking precise frequencies that decay.|Resolving two close-together frequencies where you need to prevent the dominant peak from masking its neighbor.|

> **Analogy:** Think of Hann as a gentle ramp that completely flattens out at the ends, whereas Hamming is a fast drop that stops _just_ short of the floor to cancel out the most aggressive bounce.