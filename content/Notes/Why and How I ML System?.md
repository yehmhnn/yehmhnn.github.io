---
title: "Why and How I ML System?"
create: "2026-05-31 16:52"
tags file:
---
## 1. Why MLSys?

In AI, high-level algorithms change every six months. We went from LSTMs to Transformers, and now researchers are experimenting with State Space Models (like Mamba). If you only learn the math of the current trendy model, your knowledge has a short shelf life.

However, **hardware physics and system bottlenecks do not change.** Whether you are training a Transformer or a completely new architecture in 2028, the system will always be constrained by the exact same things:

- **The Memory Wall:** Moving data from High Bandwidth Memory (HBM) to the GPU's processor cache is incredibly slow compared to how fast the processor can actually calculate.
    
- **Network Latency:** Shuffling model weights across a cluster of 10,000 GPUs over InfiniBand networks.
    
- **Power & Thermal Limits:** Running models on devices that cannot exceed a 5-watt power budget.


## 2. How? Should I Learn It All?

### Core:

Regardless of your role, if you call yourself an AI Engineer, you must master these. They directly impact the cost and performance of modern AI applications:

- **Pillar 4 (MLSys at Scale):** You _must_ understand **KV-Cache** optimization, **Quantization** (FP8/INT8), and the difference between **Compute-bound** and **Memory-bound** operations. This is how companies reduce their cloud API bills by 90%.
    
- **Pillar 3 (Framework Internals):** Understand how **Computational Graphs** and **Automatic Differentiation** work. You don't need to be a C++ wizard, but you must know what PyTorch is doing under the hood when you call `.backward()`.
    

### Optional:

The remaining pillars depend entirely on your target career archetype:

| **If your goal is to be a...**                                                                 | **Focus Heavily On...**                                                                 | **You Can Safely Skim...**                                                                       |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **AI Product Engineer** _(Building LLM apps, agents, and enterprise software)_                 | **Pillar 2 & 6** (Data Pipelines, Versioning, MLOps, System Reliability).               | **Pillar 5** (TinyML/Hardware). You don't need to know how to flash a microcontroller.           |
| **Infra / Core MLSys Engineer** _(Optimizing massive clusters, working at OpenAI/NVIDIA/Meta)_ | **Pillar 4 & 5** (Distributed training parallelism, TPU/GPU architecture, Compilation). | **Pillar 6** (Basic MLOps). You are building the bedrock, not managing the high-level pipelines. |
| **Edge AI / Robotics Engineer** _(Autonomous vehicles, mobile apps, IoT devices)_              | **Pillar 5** (TinyML, Hardware-Software Co-Design, low-power optimization).             | **Pillar 4** (Massive multi-GPU distributed cluster training).                                   |
