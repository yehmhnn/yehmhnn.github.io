---
title: Quantization
created: 2026-06-24 12:01
tags file:
  - "[[ML System]]"
---
## The Definition (What)

Quantization is the process of reducing a machine learning model's size and memory footprint by converting its internal numerical weights from highly detailed, high-precision formats into simpler, lower-precision formats.

## Why It Is Important (Why)

It solves the massive hardware barrier of modern AI by drastically shrinking models and speeding up processing times, allowing advanced Large Language Models to run locally on consumer devices like smartphones and laptops rather than requiring expensive, power-hungry cloud GPUs.

## How It Works (How)

Quantization transforms a continuous spectrum of numbers into a tight, discrete grid of integers (commonly shifting from 32-bit floating points to 8-bit or 4-bit integers).

1. **Find the Range:** The algorithm analyzes a layer of the model to find the minimum and maximum values of its current weights.
    
2. **Scale and Shift:** It calculates how to stretch or shrink that range to fit cleanly into a smaller, fixed target range (like -128 to 127 for 8-bit integers).
    
3. **Round and Clip:** Every original number is divided by the scale factor, shifted to line up with the grid, and rounded to the nearest whole integer. Any extreme outliers are clipped to fit within the new boundaries.
    

The core mechanism relies on a uniform quantization formula:

$$q = \text{round}\left(\frac{x}{S}\right) + Z$$

- **$q$** is the resulting quantized integer value.
    
- **$x$** is the original high-precision weight or activation value.
    
- **$S$** is the **Scale Factor**, a constant that determines the step size of the new grid.
    
- **$Z$** is the **Zero-Point**, an integer offset that ensures the real number $0$ maps perfectly to an exact integer on the new grid, preventing bias.
    