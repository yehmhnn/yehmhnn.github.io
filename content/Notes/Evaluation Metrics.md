---
title: Evaluation Metrics
create: 2026-05-23 00:27
tags file:
  - "[[2025 FLOW MATCHING WITH GAUSSIAN PROCESS PRIORS FOR PROBABILISTIC TIME SERIES FORECASTING]]"
---
### 4.3 Evaluation Metrics
#### 4.3.1. 2-Wasserstein Distance (W2)

- **Used for:** Unconditional generation.
    
- **The Concept:** Also known as the "Earth Mover's Distance." Imagine the real data distribution is a pile of dirt and your synthetic data is another pile. The W2 distance is the minimum "work" required to move the synthetic pile to perfectly overlap the real pile.
    
- **What it tells you:** A lower W2 score means your generated vibrations are statistically indistinguishable from real ones.
    

#### 4.3.2. Linear Predictive Score (LPS)

- **Used for:** "Synthetic-for-Real" utility.
    
- **The Process:** 1. Generate a huge amount of fake data using your model. 2. Train a simple Linear Regression model **only on the fake data**. 3. Test that simple model on **real data**.
    
- **What it tells you:** This is a "quality check." If the fake data is realistic, a model trained on it should be able to predict real-world outcomes. If the LPS is good, your synthetic data is high-quality enough to be used for training other systems.
    

#### 4.3.3. Continuous Ranked Probability Score (CRPS)

- **Used for:** Probabilistic Forecasting.
    
- **The Concept:** Standard models give you one number (e.g., "The vibration will be 0.5mm"). Flow Matching gives you a **distribution** (e.g., "It will likely be 0.5mm, but could be between 0.4 and 0.6").
    
- **What it tells you:** CRPS rewards two things:
    
    1. **Accuracy:** Is the center of your prediction close to the truth?
        
    2. **Sharpness:** Is your "uncertainty" narrow? (A model that says "the value will be between -100 and +100" is always "accurate" but totally useless).
        
- **The Math note:** They mention "Pinball Loss." This is just a way to measure how well the model predicts specific percentiles (like the 10th or 90th percentile) of the possible outcomes.