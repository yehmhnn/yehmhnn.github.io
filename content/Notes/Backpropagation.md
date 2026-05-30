---
title: Backpropagation
created: 2026-05-28 15:20
tags file:
  - "[[Machine Learning]]"
---
## 1. The Mathematics of Error Backpropagation

Training a network via **Gradient Descent** requires computing the partial derivative of the loss function with respect to every weight matrix $B_l$ in the network. This is achieved using the mathematical **Chain Rule**, working backward through the network layers starting from the output layer ($l=L$) down to the first layer ($l=1$).

### Core Definitions

- **Pre-activation ($\tilde{z}_l$):** The raw linear combination before the non-linearity is applied:
    
$$
\tilde{z}_l = [1, z_{l-1}] \cdot B_l
$$
    
- **Activation ($z_l$):** The layer's output after non-linear transformation:
    
$$
z_l = \psi_l(\tilde{z}_l)
$$
    
- **Layer Error Vector ($\delta_l$):** The gradient of the loss with respect to the layer's _pre-activations_:
    
$$
\delta_l = \frac{\partial \text{loss}}{\partial \tilde{z}_l}
$$
    

### The Gradient and Recursion Formulas

Once the error vector $\delta_l$ is calculated for a layer, computing the gradient for that layer's weights is straightforward:

$$
\frac{\partial \text{loss}}{\partial B_l} = [1, z_{l-1}]^T \cdot \delta_l
$$

To compute $\delta_l$ for **interior (hidden) layers**, the error is recursively propagated backward from layer $l+1$:

$$
\delta_l = \delta_{l+1} \cdot (B_{l+1}^T)_{1 \dots D_l} \cdot \text{diag}(\psi'_l(\tilde{z}_l))
$$

> ⚠️ **Matrix Adjustment Note:** The term $(B_{l+1}^T)_{1 \dots D_l}$ indicates that we **drop the column** corresponding to the bias neuron from the transposed weight matrix, as the bias does not receive backpropagated error from subsequent layers. The $\text{diag}(\psi'_l(\tilde{z}_l))$ represents an element-wise multiplication with the derivative of the activation function.

## 2. Base Cases: Last Layer Evaluation ($\delta_L$)

The formula for the final layer's error vector ($\delta_L$) depends entirely on the machine learning task and its chosen loss function:

### A. Regression Task (Squared Loss + Identity Activation)

- **Loss Function:** $\text{loss} = \frac{1}{2}(y^* - z_L)^2$
    
- **Activation:** $z_L = \tilde{z}_L$
    
- **Final Layer Error:**
    
$$
\delta_L = z_L - y^*
$$
    

### B. Multi-class Classification Task (Cross-Entropy Loss + Softmax Activation)

- **Loss Function:** $\text{loss} = -\log \hat{p}(Y = y^* \mid X)$
    
- **Activation:** $z_L = \text{softmax}(\tilde{z}_L)$
    
- **Final Layer Error:** Evaluating the derivative of the cross-entropy loss through the softmax quotient rule yields the same clean difference vector: $$\delta_L = z_L - y^*$$
    (Where $y^*$ is the one-hot encoded ground truth target vector).
    

## 3. Weight Initialization Strategies

An initial weight guess $B_l^{(0)}$ is required to start the gradient descent optimization iterations. The core goal of initialization is to choose random weights such that neuron activations land within the active, non-saturating ("interesting") regions of their activation functions with high probability.

To prevent signals from exploding or vanishing, columns of $B_l^{(0)}$ should maintain a mean of 0 and a controlled target variance $V_l$:

- **Xavier / Glorot Initialization:** Ideal for antisymmetric activation functions (like Tanh or Sigmoid). It sets the element variance based on input and output dimensions:
    
$$
V_l = \frac{2}{D_{l-1} + D_l}
$$
    
- **He Initialization:** Designed specifically for **ReLU** activations. Because ReLU sets exactly half of the activations to zero on average, the variance must be doubled to compensate for the lost signal capacity:
    
$$
V_l = \frac{2}{D_{l-1} + 1}
$$
    

Common distributions used to draw these weights include the Gaussian distribution $N(0, \sigma^2 = V_l)$ or a Uniform distribution spanning $[-\sqrt{3V_l}, +\sqrt{3V_l}]$.

## 4. Stochastic Gradient Descent & Mini-Batch Dynamics

Networks handle dataset scales via distinct optimization strategies:

- **Ordinary Gradient Descent (Deterministic):** Computes the true average gradient across the **entire** training set before making a single weight update. It scales linearly with data size ($N$) but converges slowly over massive datasets.
    
- **Stochastic / Batch Gradient Descent:** Computes an estimated gradient based on a random subset (**mini-batch**) of the training data.
    

### Computational Trade-offs

While higher-order optimizations (like Newton's Method) converge in fewer iterations, calculating the Hessian matrix requires an expensive cubic complexity ($O(N^3)$). Mini-batch gradient descent maintains linear parameter complexity and balances time per iteration efficiently, making it the mathematically optimal choice for large networks and massive training sets. Batch sizes ($B$) are typically configured in powers of 2 (such as 32, 64, up to 1024), bounded by available GPU memory.

## 5. The Complete Training Loop Algorithm

Below is the structured execution loop mapping how forward propagation, backpropagation, and weight updates interact across an optimization run:

Plaintext

```
Initialize all weight matrices B_l randomly using Xavier or He methods

For epoch = 1 to E:
    Randomly shuffle the Training Set
    For each mini-batch of size B:
        
        1. FORWARD PASS:
           For each instance 'i' in the mini-batch:
               Set initial layer input: z_0 = X_i
               For layer l = 1 to L:
                   Compute pre-activation: z~_l = [1, z_{l-1}] * B_l
                   Compute activation: z_l = ψ_l(z~_l)
               Store final layer output prediction: ŷ_i = z_L
               
        2. BACKWARD PASS (Backpropagation):
           For each instance 'i' in the mini-batch:
               Compute final layer error: δ_L = z_L - y_i
               For layer l = L down to 1:
                   Calculate instance weight gradient: ΔB_{l,i} = [1, z_{l-1}]^T * δ_l
                   If l > 1:
                       Propagate error backward: δ_{l-1} = δ_l * (B_l^T)_{no_bias} * ψ'_{l-1}(z~_{l-1})
                       
        3. WEIGHT UPDATE:
           For layer l = 1 to L:
               Compute mini-batch average gradient: ΔB_l = (1 / B) * Σ(ΔB_{l,i})
               Apply learning rate update: B_l_new = B_l_old - (γ * ΔB_l)

Return optimized network weights B_l
```

> 💡 **Modern Note:** While knowing these explicit matrix operations is vital for design, modern deep learning framework libraries perform these loops automatically via high-level `forward()`, `backward()`, and automated differentiation (`autodiff`) function calls.