---
title: "Batch Normalization"
create: "2026-06-02 12:17"
tags file:
---
### The Core Problem: Internal Covariate Shift

As a neural network learns, the weights and biases of previous layers continuously update. This means the input distributions of deeper layers keep shifting—a phenomenon known as _internal covariate shift_. This makes training notoriously slow and difficult because subsequent layers must constantly adapt to these shifting distributions.

### How Batch Normalization Works

To fix this, a Batch Normalization (BatchNorm) layer is typically inserted between a hidden layer and the activation function. The normalization follows a specific set of steps:

- Calculate the Batch Mean
- Calculate the Batch Variance
- **Normalize:** 
	- Subtract the mean and divide by the square root of the variance (plus a small constant $\epsilon$ for numerical stability) to scale the inputs. 
- **Scale and Shift:** 
	- Multiply the normalized value by a learned parameter $\gamma$ and add a learned parameter $\beta$. These learnable parameters allow the network to restore the representation power that strict normalization might restrict. 

### Key Benefits

- **Faster Convergence:** Because the data flowing through the network is stabilized, you can use significantly higher learning rates without the model diverging.
- **Better Gradient Flow:** It prevents gradients from vanishing or exploding as they propagate backward through very deep networks.
- **Regularization Effect:** The slight noise introduced by calculating the mean and variance of individual mini-batches acts as a regularizer, reducing the network's reliance on techniques like Dropout.

### Training vs. Inference

Batch normalization behaves differently depending on the stage of the model: 

- **During Training:** The mean and variance are calculated on a per-batch basis.
- **During Inference (Testing):** You typically evaluate one sample at a time, so batch-level calculations aren't possible. Instead, the layer uses a moving average of the means and variances tracked during training to normalize the test data.