---
title: Machine Learning
created: 2026-05-06 12:35
tags file:
---
## Chapter 1. Introduction

- `[[What is Machine Learning]]` — Core paradigms, definitions, and setting the mathematical playground.
    

## Chapter 2. Classification

### 2.1 – 2.3: Foundations & Linear Baselines

- `[[Introduction to Classification]]` — Task setup, decision boundaries, and elementary classification strategies.
    
- [[Perceptron]] — The foundational linear binary classifier.
    
- [[Support Vector Machines (SVM)]] — Optimal margin hyperplanes and kernel boundary concepts.
    
- `[[Cross-Validation Techniques]]` — Out-of-sample error estimation, validation splits, and preventing data leakage.
    

### 2.4 – 2.6: Statistical & Probabilistic Classifiers

- [[Linear Discriminant Analysis (LDA)]] — Generative modeling, class-conditional Gaussian distributions, and decision boundaries.
    
- [[Logistic Regression]] — Discriminative probabilistic modeling using log-odds optimization.
    
- [[Multiclass Classification]] — One-vs-Rest (OvR), One-vs-One (OvO), and comprehensive linear classification synthesis.
    

### 2.7 – 2.11: Non-linear Models & Deep Fully Connected Networks

- `[[Introduction to Nonlinear Classification]]` — Why linear boundaries fail and the motivation for mapping complex feature spaces.
    
- [[The Standard Neuron]] — Structural mechanics computing pre-activations and activations via weights and biases.
    
- [[XOR Problem]] — The classic historical limit proving a minimum of 2 layers is required for non-linear separations.

- [[Crucial Deep Learning Theorems]]

- [[Activation Functions]] — Hidden layer transformations ($\text{ReLU}$, $\text{GELU}$, $\text{Swish}$, $\text{Tanh}$) and output selection ($\text{Softmax}$, $\text{Sigmoid}$).
    
- [[Backpropagation]] — Evaluating the matrix chain rule recursively through layer error vectors ($\delta_l$).

- [[Fully Connected Network (FCN)]] — Deep architectural layer sequencing, neuron allocations, and the structural bias neuron trick.

- [[Neural Network Training Tricks]]


### 2.12 – 2.15: Computer Vision & Modern Deep Architectures

- `[[Convolutional Neural Networks (CNN)]]` — Local receptive fields, weight sharing, spatial hierarchies, pooling layers, and feature maps.
    
- `[[Residual Networks (ResNet)]]` — Skip connections, residual learning blocks, and resolving the vanishing gradient barrier in very deep networks.
    
- `[[Data Augmentation & Self-Supervised Learning]]` — Synthesizing training variance and training feature representations without human labeling.
    
- `[[Semantic Segmentation & U-Net Architectures]]` — Pixel-level spatial classification, encoder-decoder contractions, skip connections, and automated Medical Imaging applications via nnU-Nets.
    

## Chapter 3. Regression

### 3.1 – 3.3: Least Squares & Formulations

- `[[Ordinary Least Squares (OLS)]]` — Deriving the normal equation, minimizing residual sum of squares, and linear projections.
    
- `[[Application: Computed Tomography]]` — Transforming OLS structures into tomographic reconstruction algorithms.
    
- `[[Weighted Least Squares (WLS)]]` — Modifying optimization goals when noise strength varies across data observations.
    

### 3.4 – 3.6: Regularization & Sparsity

- `[[The Bias-Variance Trade-off]]` — Deconstructing prediction errors into irreducible noise, model bias, and structural model variance.
    
- `[[Ridge Regression]]` — Implementing $L_2$ regularizations to handle collinearities and restrict parameter scale.
    
- `[[LASSO Regression]]` — Utilizing $L_1$ penalty frameworks to induce coordinate shrinkage and sparse feature selection.
    
- `[[Orthogonal Matching Pursuit (OMP)]]` — Greedy selection algorithms for sparse signal recovery and regression reconstructions.
    

### 3.7 – 3.10: Advanced & Non-linear Regression

- `[[Introduction to Non-linear Regression]]` — Transitioning from linear weight bounds to complex structural mappings.
    
- `[[Decision Trees & Random Forests]]` — Recursive binary splitting for regression and classification tasks, bagging techniques, and ensembles.
    
- `[[Gaussian Processes]]` — Non-parametric Bayesian regressions modeling infinite functional distributions via kernel covariances.
    
- `[[Robust Regression Models]]` — Utilizing Huber losses and M-estimators to withstand outlier anomalies in target variables.
    

## Chapter 4. Reinforcement Learning

- `[[Introduction to Reinforcement Learning]]` — Markov Decision Processes (MDPs), agents, environment states, action tracking, and reward functions.
    
- `[[Q-Learning Fundamentals]]` — Tabular model-free TD control updates and temporal difference exploration steps.
    
- `[[Deep Q-Networks (DQN)]]` — Transforming tabular Q-learning tracking into an optimized neural network regression problem.
    

## Chapter 5. Unsupervised Learning

- `[[Introduction to Unsupervised Learning]]` — Pattern detection, density estimation, and data structures without target labels.
    
- `[[Linear Dimension Reduction]]` — High-to-low feature projections utilizing Principal Component Analysis (PCA) and Non-Negative Matrix Factorization (NNMF).
    
- `[[Data Clustering Algorithms]]` — Partitioning feature spaces using K-Means, Hierarchical structures, and density-based groupings.
