---
title: Iron Law of ML Systems
create: 2026-06-02 14:45
tags file:
  - "[[ML System MOCs]]"
---
$$
T = \underbrace{\frac{\text{Data}(D_{\text{vol}})}{\text{Bandwidth}(\text{BW})}}_{\text{The Data Term}} + \underbrace{\frac{\text{Ops}(O)}{\text{Peak}(R_{\text{peak}}) \times \text{Efficiency}(\eta_{\text{hw}})}}_{\text{The Compute Term}} + \underbrace{\text{Overhead}(L_{\text{lat}})}_{\text{The Latency Term}}
$$

## Overview

The **Iron Law of ML Systems** decomposes the total execution time ($T$) of a machine learning workload into three distinct, additive bottlenecks: **Data Transfer**, **Computation**, and **Fixed Latency Overheads**.

$$T = \frac{D_{\text{vol}}}{\text{BW}} + \frac{O}{R_{\text{peak}} \times \eta_{\text{hw}}} + L_{\text{lat}}$$

## 1. The Data Term (Memory Bottleneck)

$$\text{Time}_{\text{data}} = \frac{D_{\text{vol}}}{\text{BW}}$$

- **$D_{\text{vol}}$ (Data Volume):** The total amount of data (in bytes) that must be moved across the memory hierarchy (e.g., weights, activations, KV cache).
    
- **$\text{BW}$ ([[Bandwidth (computing)]]):** The maximum speed of the data path (e.g., HBM bandwidth, PCIe transfer speeds, or interconnect/network bandwidth).
    
- **System State:** When this term dominates, the system is **memory-bound** (e.g., LLM generation/decoding phase).
    

## 2. The Compute Term (Processor Bottleneck)

$$\text{Time}_{\text{compute}} = \frac{O}{R_{\text{peak}} \times \eta_{\text{hw}}}$$

- **$O$ (Operations):** The total number of algorithmic floating-point operations required (FLOPs).
    
- **$R_{\text{peak}}$ (Peak Performance):** The maximum theoretical throughput of the hardware processor (e.g., GPU Tensor Core FLOPs/sec).
    
- **$\eta_{\text{hw}}$ (Hardware Efficiency):** The actual hardware utilization efficiency (Model FLOPs Utilization / MFU), represented as a fraction between $0$ and $1$.
    
- **System State:** When this term dominates, the system is **compute-bound** (e.g., LLM prefill phase, large-batch training).
    

## 3. The Latency Term (System Overhead)

$$\text{Time}_{\text{latency}} = L_{\text{lat}}$$

- **$L_{\text{lat}}$ (Overhead):** Fixed latency penalties that occur regardless of how much data is processed or how many operations are executed.
    
- **Common Culprits:** GPU kernel launch overheads, host-to-device synchronization barriers, network round-trip times (RTT) in distributed setups.
    
- **System State:** When this term dominates, the system is **latency-bound** (typically happens with tiny batch sizes or highly fragmented operations).
    

## System Optimization Strategies

> **The Core Rule:** You cannot optimize an ML system without first identifying which of the three terms is your primary bottleneck. Optimizing a non-dominant term yields zero notice-able performance gains (Amdahl's Law).

- **Fixing Memory-Bound Regimes:** Implement quantization (FP16 to INT8/INT4) to decrease $D_{\text{vol}}$, or use kernel fusion (e.g., FlashAttention) to minimize global memory round trips.
    
- **Fixing Compute-Bound Regimes:** Optimize matrix tile sizes, maximize Tensor Core utilization to boost $\eta_{\text{hw}}$, or scale horizontally across more GPUs to increase cumulative $R_{\text{peak}}$.
    
- **Fixing Latency-Bound Regimes:** Group operations using CUDA Graphs, increase batch sizes to amortize fixed costs, or use asynchronous execution streams to hide $L_{\text{lat}}$.
    

## Related Linkages

- [[Roofline Model]]
    
- `[[Arithmetic Intensity]]`
    
- `[[Model FLOPs Utilization (MFU)]]`
    
- `[[LLM Inference Performance - Prefill vs Decoding]]`