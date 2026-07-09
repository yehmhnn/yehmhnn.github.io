---
title: Federated Learning
created: 2026-06-24 12:15
tags file:
  - "[[ML System]]"
---
### The Definition (What)

Federated Learning is a decentralized machine learning approach where an AI model is trained across multiple independent devices holding local data, without those devices ever sharing or exchanging their raw data.

### Why It Is Important (Why)

It enables organizations to train powerful AI models using vast pools of real-world data while completely preserving user privacy and complying with strict data protection regulations.

### How It Works (How)

1. **Distribute:** A central server broadcasts a copy of the current global AI model to participating edge devices (like smartphones or local hospital servers).
    
2. **Local Training:** Each device trains the model locally using only its own private, on-device data.
    
3. **Send Updates:** The devices send only their newly calculated mathematical updates (gradients/weights) back to the central server—never the raw user data.
    
4. **Aggregate:** The server combines these updates to improve the master global model, and the cycle repeats.
    

The standard aggregation mechanism relies on the Federated Averaging (FedAvg) equation:

$$w_{t+1} = \sum_{k=1}^{K} \frac{n_k}{n} w_{t+1}^k$$

- **$w_{t+1}$** represents the newly updated master global model weights for the next round.
    
- **$K$** is the total number of participating client devices.
    
- **$n_k$** is the number of data points present on client $k$.
    
- **$n$** is the total sum of all data points across every participating device combined.
    
- **$w_{t+1}^k$** is the specific local weight update sent back by client $k$.
    

### Additional Insights

- **A Concrete Example:** Imagine a network of international hospitals wanting to train an AI to detect rare diseases, but strict privacy laws make it illegal to share patient records. Instead of moving patient data to the AI, they send the AI software to each hospital's local computer, let it learn locally overnight, and then share only the "lessons learned" to create a master diagnostic tool.
    
- **A Major Limitation (The Non-IID Problem):** Data across different users is rarely uniform or balanced. For instance, if training a predictive text model, one smartphone user might type exclusively in English, another in Spanish, and another might use mostly emojis; this data chaos can cause the global model to slow down drastically, conflict with itself, or become heavily biased.