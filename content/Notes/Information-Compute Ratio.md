---
title: Information-Compute Ratio
created: 2026-06-13 12:28
tags file:
  - "[[ML System]]"
---
The **Information-Compute Ratio (ICR)** measures the exact return on investment (ROI) for every hardware cycle spent processing data.

$$
ICR = \frac{\Delta I}{\Delta \text{FLOPs}}
$$

---

## The Derivation of Hyperbolic Decay

Brute-force AI scaling eventually fails because data value scales logarithmically, while physical compute costs scale linearly. 

$$
\text{ICR}(D) = \frac{\frac{d}{dD} I(D)}{\frac{d}{dD} C(D)} \approx \frac{1/D}{O} = \frac{1}{O \cdot D}
$$

### Step-by-Step Component Breakdown

* **The Numerator: $\frac{d}{dD} I(D) \approx \frac{1}{D}$ (Information Burnout)**
    * Uncurated web data $I(D)$ scales logarithmically ($\log D$) due to massive redundancy. 
    * **The Reality:** 
	    * Diminishing returns. When the dataset ($D$) is small, new data yields high learning. When $D$ is massive, the value of new data shrinks toward zero because the model is just seeing variations of what it already knows.

* **The Denominator: $\frac{d}{dD} C(D) \approx O$ (Constant Energy Cost)**
    * Compute cost scales linearly ($O \cdot D$), where $O$ is the fixed operations (FLOPs) required to process a single token.
    * **The Reality:** 
	    * Silicon does not care if data is revolutionary logic or low-value spam; the GPU must execute the exact same number of FLOPs ($O$) to process it. The physical energy cost per token never drops.

* **The Result: $\text{ICR}(D) \approx \frac{1}{O \cdot D}$ (Hyperbolic Efficiency Decay)**
    * Dividing diminishing information gains by a constant hardware cost mathematically creates a steep decay curve.

---

## The 3 System Realities for Engineers

The fraction $\frac{1}{O \cdot D}$ dictates the core economic boundaries of modern AI training infrastructure:

### 1. Data Subsidies Inevitably Turn into "Data Taxes"

When $D$ scales into trillions of tokens, the denominator explodes while the numerator stagnates. At this point, extra data ceases to be an asset. It becomes a linear **compute tax**—burning electricity, hardware time, and capital for near-zero gains in model intelligence.

### 2. The "Knee" of the Curve is the Target

Plotting $\frac{1}{O \cdot D}$ reveals a sharp curve that plunges before flattening into a long, wasteful tail. 
* **The Waste:** Operating on the flat tail burns data center power grids for fractional ($0.1\%$) accuracy gains.
* **The Goal:** Keep the training loop operating exactly at the **"knee"** (the bend of the curve) to maximize the learning signal extracted per physical FLOP.

### 3. Data Selection Software Mimics Hardware Upgrades

By using intelligent data selection to filter out low-information, redundant samples, you artificially keep $D$ small but dense. 

> 💡 **Systemic Equivalence:** Doubling your dataset's ICR through smart filtering software is mathematically identical to buying twice as many GPUs or doubling your physical hardware's peak throughput ($R_{\text{peak}}$)—but it costs a fraction of the capital and saves megawatts of power.