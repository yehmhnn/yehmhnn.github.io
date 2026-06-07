---
title: Ensemble
create: 2026-06-03 11:12
tags file:
  - "[[Machine Learning]]"
---
In machine learning, an **ensemble** is a technique that combines the predictions of multiple individual models (often referred to as base learners or ensemble members) to generate a single, more robust output.

Instead of relying on a single model that might suffer from high variance or systemic bias, an ensemble gathers a "committee" of models to improve generalization, increase predictive accuracy, and smooth out errors. In the context of robust deep learning, ensembles are primarily leveraged as a highly effective tool for **Uncertainty Quantification**—helping a system flag when it encounters data it does not understand.

An ensemble can even be simulated within a single architecture; for instance, [[Monte Carlo Dropout]] can be interpreted as an ensemble of many temporary, sparse neural networks by keeping dropout active during inference.