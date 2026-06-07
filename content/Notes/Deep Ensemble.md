---
title: "Deep Ensemble"
create: "2026-06-04 08:34"
tags file:
---
A **Deep Ensemble** is a specific type of [[Ensemble]] method tailored for deep learning where you train multiple independent Deep Neural Networks (DNNs) from scratch to solve the same problem.

#### 1. How It Works

- **Different Initializations:** You train several identical neural network architectures on the same dataset, but you initialize each network with a **different random seed**.
    
- **Training Randomness:** Because of different random weight initializations and the random shuffling of batches during Stochastic Gradient Descent (SGD), each network converges to a slightly different set of final parameters.
    
- **Standard Workflow:** A massive benefit of this approach is that it requires no special tools; you use standard frameworks (like PyTorch or TensorFlow) and normal DNN training routines.
    
![[Pasted image 20260604130037.png|449]]

#### 2. Why Deep Ensembles Are Successful

- **SOTA Baseline:** Deep Ensembles are widely considered the practical State-of-the-Art (SOTA) mechanism for uncertainty estimation in large-scale deep learning models.
    
- **Approximating Bayesian Networks:** Research shows that Deep Ensembles act as surprisingly excellent approximations of true [[Bayesian Neural Network]]s (BNNs).

Half way to BNNs: (Standard NN -> Deep Ensembles -> BNNs)
![[Pasted image 20260604125755.png|589]]
    
- **Exploring Multiple Loss Basins:** Their exceptional performance comes from their ability to find unique, diverse solutions by marginalizing predictions over **multiple distinct optimization basins** in the complex weight landscape. While a single network gets stuck in one local minimum basin, an ensemble explores several.
    

#### 3. Limitations & Considerations

- **The Compute Trade-off:** The primary downside is resource consumption; both the training time and inference computational costs scale linearly with the number of ensemble members you choose to run. However, each individual member remains relatively cheap to compute compared to heavy sampling methods.
    
- **The Similarity Trap:** If the parameters or configurations of your ensemble members become too similar, the ensemble loses its diversity, which severely limits its ability to predict uncertainty accurately.
    
- **Advanced Solution (Repulsive Ensembles):** To guarantee that models stay diverse and don't end up making identical predictions, advanced variations called **Repulsive Ensembles** add an explicit penalty kernel to the loss function. This mathematically pushes the networks away from each other in either weight-space or function-space during training.