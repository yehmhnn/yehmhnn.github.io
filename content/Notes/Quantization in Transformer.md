---
title: Quantization in Transformer
created: 2026-07-15 20:49
tags file:
  - "[[Scalable & Robust ML]]"
---
# The Definition (What)

Quantization in Transformers is the process of translating high-precision, decimal-based numbers (like 16-bit or 32-bit floats) used by a model's weights and activations into compact, low-precision integers (typically 8-bit or 4-bit) to make the model run significantly faster and consume far less memory.

# Why It Is Important (Why)

Transformer-based Large Language Models (LLMs) are massive, often containing tens or hundreds of billions of parameters. Running them in their native high-precision format (**FP16**) requires expensive, high-end enterprise GPUs just to hold the model in memory.

Quantization dramatically lowers this hardware barrier. By compressing the model, it slashes GPU memory requirements by **50% to 75%** and unlocks massive throughput gains. This allows businesses to serve LLMs on cheaper, consumer-grade hardware and process user queries at a fraction of the original cost.

# How It Works (How)

To compress a Transformer without destroying its intelligence, the quantization process goes through a logical progression of mathematical scaling, scoping, and selective application.

### Step 1: The Core Mathematical Mapping

To map a wide range of floating-point numbers to a tiny set of integers (like -128 to 127 for 8-bit quantization), we use a linear mapping formula:

$$q = \operatorname{clip}\left(\operatorname{round}\left(\frac{x}{S}\right) + Z, q_{\min}, q_{\max}\right)$$

- $x$ is the original, high-precision floating-point number (e.g., `1.472`).
    
- $S$ (Scale) is a constant that scales down the real numbers to fit the integer range.
    
- $Z$ (Zero-point) is an integer offset that ensures the real-world number `0.0` maps perfectly to a whole integer, preventing rounding errors on neutral values.
    
- $\operatorname{clip}$ restricts any values that spill outside the boundaries of our target integer range ($q_{\min}$ to $q_{\max}$).
    

When the model needs to perform math, it "dequantizes" the integer back to a floating-point approximation:

$$\hat{x} = S \cdot (q - Z)$$

### Step 2: Choosing the Scope (Per-Tensor vs. Per-Channel)

As shown in your third slide, we have to decide how broadly we calculate our scale factor $S$:

- **Per-Tensor Quantization:** We calculate a single scale $S$ for an entire weight matrix. It is extremely fast and computationally simple, but it is too coarse; if a single value in the matrix is huge, it ruins the resolution for all other numbers in that matrix.
    
- **Per-Channel Quantization:** We calculate a unique scale $S_i$ for each individual row or column (channel) $i$:
    

$$q_i = \operatorname{round}\left(\frac{x_i}{S_i}\right) + Z_i$$

This preserves much higher accuracy, particularly for the Feed-Forward Network (**FFN**) layers in Transformers, which naturally have wildly different numerical ranges across different channels.

### Step 3: Selecting the Methodology (Static vs. Dynamic vs. QAT)

Depending on your hardware and performance goals, you choose when and how to compute these scales (referencing your second slide):

- **Dynamic Quantization:** Weights are quantized offline. However, the activation scales are calculated dynamically on-the-fly during inference. It requires no calibration data but introduces minor computation overhead during runtime.
    
- **Static Quantization:** We run a small "calibration dataset" through the model offline to observe typical activation ranges and pre-calculate fixed activation scales ($S$). At runtime, there is zero scale-calculation overhead, making it incredibly fast.
    
- **Quantization-Aware Training (QAT):** We simulate quantization rounding errors during the actual training or fine-tuning phase. The model learns to "adapt" to its loss of precision. This yields the highest accuracy but is highly complex and computationally expensive.
    

### Step 4: Selective Application within the Transformer Block

We do not quantize every operation. A Transformer block is divided into parts that quantize easily and parts that fail if compressed:

- **What gets quantized (INT8 GEMM targets):** 
	- The heavy linear projection weights and activations ($W_q, W_k, W_v, W_o$ in attention, and $W_0, W_1$ in the Feed-Forward Network) are safely compressed because they consist of standard matrix multiplications.
    
- **What stays in high precision (FP16/FP32):** 
	- **LayerNorm** and **Softmax** layers are kept in high precision. Because they involve non-linear exponentiations and divisions, compressing them to 8-bit integers introduces massive rounding errors that destabilize the entire network.
    

# Additional Insights

### A Direct Comparison: Static vs. Dynamic vs. QAT

|**Metric**|**Dynamic Quantization**|**Static Quantization**|**Quantization-Aware Training (QAT)**|
|---|---|---|---|
|**Setup Effort**|Low (no calibration data needed)|Medium (requires a calibration dataset)|High (requires full training setup)|
|**Computation Cost**|Minimal|Low|Extremely High|
|**Inference Speed**|Moderate (on-the-fly scaling overhead)|**Fastest** (pre-calculated scales)|**Fastest** (pre-calculated scales)|
|**Accuracy Retention**|Moderate|Good|**Best**|

### A Major Limitation: The Outlier Bottleneck (Why Quantizing Activations is so Hard)

The single biggest roadblock to successfully compressing an LLM is that **activations are a wildly unpredictable, moving target.** While a model's weights are static and predictable, activations change instantly based on whatever the user types. In modern LLMs (especially those over 6.7 billion parameters), this unpredictability takes the form of **activation outliers**—massive, sudden numerical spikes that appear in just a few specific channels.

To understand why this ruins standard quantization, imagine the model’s quantization step as a **"rounding checkpoint"** designed to compress numbers down to a scale ($S$) between -128 and 127:

- **The Normal State:** For most words, activations are small and quiet (e.g., values between `0.0` and `2.0`). A checkpoint scale calibrated for this range works perfectly.
    
- **The Outlier Spike:** If a user types a rare word or a complex prompt, a single activation channel might suddenly spike to a massive value like `150.0`.
    

This spike forces a lose-lose math dilemma when trying to calculate your scaling factor $S$:

> ⚠️ **The Lose-Lose Dilemma:**
> 
> - **Option A (Preserve the Spike):** You stretch your scale ($S$) to accommodate the massive `150.0`. Because the scale is now so large, all your normal, vital data points (like `0.02` or `0.1`) get rounded down to absolute **zero**. You lose the fine details, and the model starts outputting incoherent gibberish.
>     
> - **Option B (Preserve the Normal Data):** You keep the scale tight to keep the small numbers detailed. However, the massive `150.0` spike gets hard-clipped down to `1.27`. This "clipping" destroys the outlier's value, which severely degrades the model's accuracy.
>     

This activation outlier bottleneck is the exact reason standard W8A8 quantization fails, and it is precisely the problem that [[SmoothQuant]] solves by pre-smoothing these spikes before they ever hit the rounding checkpoint.