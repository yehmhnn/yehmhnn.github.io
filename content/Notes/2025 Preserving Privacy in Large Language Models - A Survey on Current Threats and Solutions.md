---
title: 2025 Preserving Privacy in Large Language Models - A Survey on Current Threats and Solutions
created: 2026-10-05 15:35
tags file:
  - "[[AI Privacy]]"
---
- ATTACKS
	- Training Data Extraction
		- "Can I get the actual training data back out of the model?"
	- Membership Inference
		- "Was this record used to train the model?"
	- Model Inversion / Stealing
	- Inference-time Threats

| Defense                    | 最簡單的問題                                     |
| -------------------------- | ------------------------------------------ |
| **Anonymization**          | 訓練前，能不能先移除/模糊敏感資訊？                         |
| **Differential Privacy**   | 能不能限制單一個人對 model output 的影響？               |
| **Federated Learning**     | 能不能不要把所有 raw data 集中到同一地方？                 |
| **Machine Unlearning**     | Model 已經學過資料後，能不能要求它「忘掉」某些資料的影響？           |
| **Homomorphic Encryption** | 能不能在 data 保持 encrypted 的情況下進行 computation？ |