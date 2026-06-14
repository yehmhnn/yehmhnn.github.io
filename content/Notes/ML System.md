---
title: "ML System MOCs"
created: "2026-05-31 16:42"
tags file:
---
course: Harvard CS249r / MLSysBook

> **Core Philosophy:** "AI Engineering is the discipline of building efficient, reliable, safe, and robust intelligent systems that operate in the real world—not just models in isolation."

---

## Part 1: Foundation
- Ch 1: Introduction
- Ch 2: ML Systems
- Ch 3: ML Workflow
- Ch 4: Data Engineering
## Part 2: Development
- Ch 5: Neural Computation
- Ch 6: Network Architectures
- Ch 7: ML Frameworks
- Ch 8: Model Training
## Part 3: Optimization
- Ch 9: [[Data Selection]]
- Ch 10: Model Compression
- Ch 11: Hardware Acceleration
- Ch 12: Benchmarking
## Part 4: Deployment
- Ch 13: Model Serving
- Ch 14: ML Operations
- Ch 15: Responsible Engineering
- Ch 16: Conclusion

---

[[Why and How I ML System?]]

## 🏛️ Pillar 1: Foundations & Evolution
*The history of AI shifts and why computation ultimately wins.*
- [[The Bitter Lesson (Richard Sutton)]]
- [[MLSys Definition]]
- [[Evolution of AI: Symbolic vs. Statistical Learning]]
- [[Hardware-Software Co-Design Principles]]

## 📊 Pillar 2: Data Engineering Infrastructure
*How data is sourced, stored, and routed before it ever hits a tensor.*
- [[Data Sourcing & Synthetic Data Generation]]
- [[Data Storage Architectures for Deep Learning]]
- [[Data Processing & High-Throughput Pipelines]]
- [[Data Version Control & Lineage]]
- [[Data Optimization for Embedded AI]]

## 🏗️ Pillar 3: AI Frameworks & Compilation Internals
*Peeling back the layers of PyTorch and TensorFlow to look at execution engines.*
- [[Tensor Data Structures & Memory Layouts]]
- [[Static vs. Dynamic Computational Graphs]]
- [[Automatic Differentiation Mechanisms]]
- [[Custom Framework Implementation: TinyTorch Engine]]

## 🚀 Pillar 4: MLSys At Scale (Distributed Training & Inference)
*Moving from a single GPU to massive distributed clusters and optimizing execution.*
- [[Distributed Training: Data, Pipeline, and Tensor Parallelism]]
- [[Inference Bottlenecks: Memory-Bound vs. Compute-Bound]]
- [[The Transformer Memory Crisis: Deep Dive into KV-Cache]]
- [[Model Compression: Quantization, INT8 Math, and Pruning]]
- [[GPU Schedulers: Latency vs. Throughput]]

## 🔋 Pillar 5: Edge AI & Hardware Co-Design (TinyML)
*Deploying models onto microcontrollers with milliwatt power budgets.*
- [[Introduction to TinyML & Ultra-Low-Power Systems]]
- [[TensorFlow Lite for Microcontrollers (TFLM)]]
- [[Hardware Acceleration: TPU, NPU, and Custom ASIC Architectures]]
- [[Mapping Neural Networks to Physical Silicon]]

## 🛠️ Pillar 6: MLOps, Reliability & Responsible AI
*Keeping production systems running and preventing them from going sideways.*
- [[MLOps Pipelines & Production Monitoring]]
- [[Technical Debt in Machine Learning Systems]]
- [[Responsible AI Infrastructure & Architectural Constraints]]

---

## 🔬 Practical Lab & Project Trackers
- [[Lab Directory & Code Base]]
- [[TinyTorch Labs Inventory]]
- [[TinyML Hardware Kit Projects]]
- [[MLSys.im Simulation Experiments]]
- [[StaffML System Interview Preparation]]
