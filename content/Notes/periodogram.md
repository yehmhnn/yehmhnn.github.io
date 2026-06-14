---
title: "periodogram"
created: "2026-06-13 20:52"
tags file:
---
## What is a Periodogram?

A **periodogram** is a foundational tool in signal processing used to estimate the power spectral density (PSD) of a signal. In simple terms, it takes a signal from the time domain (like an audio recording, a seismic wave, or a stock market trend) and breaks it down to show how much "power" or energy exists at different frequencies.

If you want to find out whether a signal contains a hidden 60 Hz hum or a specific repeating pattern, the periodogram is the most direct way to visualize it.

## How It Is Calculated

The periodogram is directly tied to the **Fourier Transform**. For a discrete-time signal $x[n]$ consisting of $N$ samples, the calculation follows these steps:

1. **Transform:** Compute the Discrete Fourier Transform (DFT) of the signal—typically using the fast Fast Fourier Transform (FFT) algorithm.
    
2. **Magnitude:** Take the absolute value (magnitude) of the resulting frequency components to remove phase information.
    
3. **Square:** Square those values to convert amplitude into power.
    
4. **Normalize:** Scale the result by dividing it by the total number of samples $N$.
    

### The Mathematical Formula

Mathematically, the periodogram $P(f)$ is defined as:

$$P(f) = \frac{1}{N} \left| \sum_{n=0}^{N-1} x[n] e^{-j 2 \pi f n} \right|^2$$

Where:

- $x[n]$ is the signal value at time step $n$.
    
- $N$ is the total number of data points.
    
- $f$ is the frequency.
    

## History

The periodogram was invented by physicist Arthur Schuster in 1898. He originally designed it to search for repeating cycles and hidden periodicities in meteorological data and sunspot activity. Because the FFT algorithm hadn't been invented yet, these complex calculations had to be performed entirely by hand.

## The Fatal Flaw: High Variance

While the periodogram is mathematically straightforward, it has a massive drawback when applied to real-world, noisy signals: **it is an inconsistent estimator.**

In statistics, an estimator is considered "consistent" if it converges to the true value as you collect more data. The periodogram fails this test.

If you increase the number of data points ($N$), two things happen:

- **The Good:** You get better frequency resolution (you can see finer details along the frequency axis).
    
- **The Bad:** The variance (the erratic fluctuation or "shakiness" of the graph) **does not decrease**.
    

Instead of smoothing out with more data, a raw periodogram simply becomes a more densely packed, jagged mess of noise. The random fluctuations remain just as large because adding more data points simply adds more noisy variables to the calculation rather than averaging them out.

## Modern Alternatives

Because a raw periodogram is often too noisy to be useful on its own, engineers developed advanced spectral estimation techniques that build upon it to reduce noise:

- **Bartlett's Method:** Slices the signal into several non-overlapping sections, calculates a periodogram for each section, and averages them together to reduce noise.
    
- **Welch's Method:** Takes Bartlett's approach a step further by overlapping the sections and applying a "window function" to each to prevent data distortion at the edges.