---
title: Neural Network Training Tricks
created: 2026-05-28 15:44
tags file:
  - "[[Machine Learning Essentials]]"
---
## 1. Learning Rate Schedules

Adjusting the learning rate dynamically prevents the optimization from stalling or oscillating destructively around minima.

- **Initialization:** Training begins with an optimized baseline learning rate found through hyperparameter optimization combined with cross-validation.
    
- **Decay Rule:** When the training loss plateaus and fails to improve for a set duration, the learning rate is systematically reduced.
    
- **Repetition:** This reduction protocol is typically repeated 2 to 3 times before training is fully concluded.
    

## 2. Early Stopping

Early stopping is a highly effective regularization technique designed specifically to prevent model overfitting.

- **Mechanism:** The practitioner monitors the loss of a separate validation dataset entirely decoupled from the training parameters.
    
- **Snapshots:** As training progresses over time $t$, periodic snapshots of the network weight configurations are saved every few iterations.
    
- **Model Selection:** Instead of keeping the weights from the final training iteration, the algorithm selects and outputs the specific snapshot that achieved the absolute lowest validation loss.
    

## 3. Momentum-Based Smooth Updates

Standard gradient descent steps can become highly erratic and noisy due to the randomness inherent in stochastic mini-batch sampling.

- **The Running Average:** To smooth out these erratic jumps, momentum calculates a running average over multiple sequential gradient updates ($\Delta B_l$).
    
- **Velocity Equation:** The smoothed gradient directional vector $G_l^{(t)}$ is computed recursively: $$
G_l^{(t)} = \mu \cdot G_l^{(t-1)} + (1-\mu)\Delta B_l$$
    
    Where $\mu \in [0, 1)$ acts as the momentum scaling coefficient, and the initial gradient begins at zero ($G_l^{(0)} = 0$).
    
- **Parameter Update:** The network weights are then shifted smoothly using this filtered direction:
    
$$
B_l^{(t)} = B_l^{(t-1)} - \gamma G_l^{(t)}
$$
    

## 4. The ADAM Optimizer

The Adaptive Moment Estimation (ADAM) optimizer enhances standard momentum by applying a customized, effective learning rate to each individual parameter inside the network.

- **Core Intuition:** The step size allocated to a parameter is inversely proportional to the standard deviation of its historical gradients. If a parameter's gradient exhibits high variance and jumps around erratically, the optimizer responds more cautiously by reducing its update stride.
    
- **Moment Tracking:** ADAM tracks both a smoothed gradient (first moment) and a smoothed variance (second moment):
    
$$
\tilde{G}_l^{(t)} = \mu_1 \tilde{G}_l^{(t-1)} + (1-\mu_1)\Delta B_l
$$
    
$$
\tilde{V}_l^{(t)} = \mu_2 \tilde{V}_l^{(t-1)} + (1-\mu_2)(\Delta B_l)^2
$$
    
- **Burn-In Corrections:** Because the moment matrices are initialized at zero, they are uninformative during early iterations. ADAM resolves this initialization bias using explicit burn-in corrections:
    
$$
G_l^{(t)} = \frac{1}{1-\mu_1^t} \tilde{G}_l^{(t)}
$$
    
$$
V_l^{(t)} = \frac{1}{1-\mu_2^t} \tilde{V}_l^{(t)}
$$
    
- **The Final Step:** The parameters are updated using an element-wise division, incorporating a tiny constant $\epsilon = 10^{-8}$ to guarantee protection against division by zero:
    
$$
B_l^{(t)} = B_l^{(t-1)} - \frac{\gamma}{\sqrt{V_l^{(t)}} + \epsilon} G_l^{(t)}
$$
    

> 📌 **Impact:** Published by Kingma & Ba (2014), ADAM has amassed over 250,000 citations and remains by far the most popular training method in deep learning. Typical hyperparameter configurations settle near $\mu_1 = 0.9$ and $\mu_2 = 0.995$.