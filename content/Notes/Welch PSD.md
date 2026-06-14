---
title: "Welch PSD"
created: "2026-06-13 20:11"
tags file:
---
**Welch’s PSD** (Power Spectral Density), or **Welch's method**, is a widely used approach in signal processing to estimate how the power of a signal is distributed over different frequencies.

Invented by Peter Welch in 1967, it is an improvement over the standard **[[periodogram]]** (a basic Fourier transform of the entire signal) because it significantly reduces noise (variance) in the final measurement.

## The Core Problem It Solves

If you take a noisy signal and just apply a Fast Fourier Transform (FFT) to the whole thing, the resulting spectrum looks incredibly jagged and erratic. In technical terms, a standard periodogram is an **inconsistent estimator**, meaning that even if you collect more data, the variance of the noise in the spectrum does not decrease.

Welch’s method solves this by using the **"divide and conquer"** strategy: it cuts the signal into pieces, analyzes them separately, and averages the results.

## How Welch's Method Works (Step-by-Step)

The algorithm processes a signal through four main stages:

### 1. Segmentation (Splitting)

The long data sequence is divided into smaller, equal-sized segments. Crucially, these segments **overlap** with each other (usually by 50% or 75%). Overlapping ensures that data at the edges of the segments isn't lost during the next step.

### 2. Windowing

A window function (such as a Hamming, Hann, or Blackman window) is applied to each individual segment. This tapers the signal down to zero at the edges, which prevents a mathematical artifact called **spectral leakage** (where energy from one frequency spills into neighboring frequencies due to sharp cuts at the edges).

### 3. Periodogram Calculation

The algorithm computes the Fast Fourier Transform (FFT) for each windowed segment and squares the magnitude. This gives a modified periodogram for each individual chunk of data.

### 4. Averaging

Finally, it averages all of these individual periodograms together. Because noise is random, averaging the segments cancels out a lot of the variance, leaving you with a much smoother, cleaner look at the true underlying frequencies.

## The Mathematics Behind It

For a segment $m$ of length $M$, the periodogram $P_m(f)$ is calculated as:

$$P_m(f) = \frac{1}{U} \left| \sum_{n=0}^{M-1} x_m[n] w[n] e^{-j 2 \pi f n} \right|^2$$

Where $x_m[n]$ is the signal segment, $w[n]$ is the window function, and $U$ is a normalization factor for the power of the window:

$$U = \sum_{n=0}^{M-1} |w[n]|^2$$

The final Welch PSD estimate is the average over all $K$ overlapping segments:

$$\hat{P}_{\text{Welch}}(f) = \frac{1}{K} \sum_{m=0}^{K-1} P_m(f)$$

## The Ultimate Trade-Off

In signal processing, you rarely get something for nothing. Welch's method relies on a fundamental trade-off between **variance** (noise) and **resolution** (sharpness):

- **More/Smaller Segments:** Gives you more chunks to average, which drastically reduces noise (**low variance**). However, because the chunks are shorter, you lose the ability to distinguish between frequencies that are very close together (**low frequency resolution**).
    
- **Fewer/Larger Segments:** Gives you longer chunks of data, allowing you to see highly detailed frequency peaks (**high frequency resolution**). However, you have fewer chunks to average, so the resulting graph will be much noisier (**high variance**).