---
title: "Convolutional Neural Networks (CNN)"
created: "2026-10-22 15:11"
tags file:
---
# The Definition (What)

A **Convolutional Neural Network (CNN)** is a type of neural network that learns to recognize patterns in images by detecting small features (such as edges and shapes) and combining them into more complex ones.

# Why It Is Important (Why)

- **Problem:** Traditional neural networks treat image pixels as independent inputs, ignoring their spatial relationships.
- **Solution:** CNNs analyze small, neighboring regions of an image, preserving spatial information.
- **Key advantage:** CNNs reuse the same learned pattern detectors across an image, requiring far fewer parameters than fully connected networks.
- **When useful:** Image classification, object detection, facial recognition, and medical image analysis.

**Core idea:** Instead of learning what an object looks like at every possible position, a CNN learns patterns that can appear anywhere in an image.

# How It Works (How)

A CNN typically processes an image through four main stages:

### 1. Convolution: Detect Local Patterns

A CNN uses small matrices called **filters (kernels)** that slide across an image to detect patterns such as edges, corners, or textures.

At each position, the filter multiplies nearby pixel values by its weights and adds the results:

$$
Z_{i,j} = \sum_{m=0}^{k-1}\sum_{n=0}^{k-1} X_{i+m,j+n}K_{m,n}+b
$$

Where:
- $X$: Input image (or feature map).
- $K$: Learnable filter of size $k \times k$.
- $b$: Learnable bias.
- $Z_{i,j}$: Filter output at position $(i,j)$.
- $m,n$: Positions inside the filter.

**Intuition:** A filter produces a high score wherever it finds a pattern matching its learned weights.

For example, consider a small image region and filter:

$$
X =
\begin{bmatrix}
1 & 1\\
0 & 0
\end{bmatrix},
\qquad
K =
\begin{bmatrix}
1 & 1\\
-1 & -1
\end{bmatrix}
$$

With $b=0$:

$$
Z = (1)(1)+(1)(1)+(0)(-1)+(0)(-1)=2
$$

The high score indicates a horizontal transition from bright to dark pixels.

Sliding this filter across the image creates a **feature map**, showing where this pattern appears.

A CNN typically learns many filters simultaneously, each detecting different patterns.

### 2. Activation: Introduce Nonlinearity

After convolution, a CNN typically applies the **ReLU activation function**:

$$
A_{i,j}=\max(0,Z_{i,j})
$$

Where:
- $Z_{i,j}$: Output from convolution.
- $A_{i,j}$: Activated feature value.

ReLU keeps positive values and replaces negative values with zero.

**Intuition:** It preserves positive pattern responses while introducing nonlinearity, allowing the network to learn complex relationships rather than only linear transformations.

### 3. Pooling: Reduce Spatial Size

A CNN often uses **max pooling** to reduce the size of feature maps while retaining strong feature responses.

For example, a $2 \times 2$ pooling operation:

$$
\begin{bmatrix}
1 & 3\\
2 & 4
\end{bmatrix}
\longrightarrow 4
$$

The largest value is retained.

**Why?**
- Reduces computation and memory usage.
- Makes feature detection less sensitive to small positional shifts.
- Allows later layers to focus on more important patterns.

Pooling is common but not mandatory; some CNNs use strided convolutions instead.

### 4. Combine Features and Make a Prediction

Multiple convolutional layers learn increasingly complex features:

- **Early layers:** Edges, lines, and corners.
- **Middle layers:** Textures and simple shapes.
- **Deeper layers:** Object parts and more complex patterns.

The final feature maps are converted into a prediction, often using global average pooling followed by a fully connected layer.

For classification, the network may use **softmax**:

$$
P(y=c)=\frac{e^{z_c}}{\sum_{j=1}^{C}e^{z_j}}
$$

Where:
- $z_c$: Score assigned to class $c$.
- $C$: Total number of classes.
- $P(y=c)$: Predicted probability of class $c$.

For example:

- Cat: 0.85
- Dog: 0.10
- Rabbit: 0.05

The CNN predicts **Cat** because it has the highest probability.

### 5. Training: Learn the Filters Automatically

Initially, the CNN's filters contain arbitrary weights.

During training:

1. The CNN processes an image and produces a prediction.
2. A loss function measures the difference between the prediction and correct label.
3. **Backpropagation** calculates how each weight contributed to the error.
4. An optimizer adjusts the weights to reduce future errors.

A basic weight update is:

$$
w \leftarrow w-\eta\frac{\partial L}{\partial w}
$$

Where:
- $w$: A learnable weight, including a filter weight.
- $\eta$: Learning rate.
- $L$: Loss function.
- $\frac{\partial L}{\partial w}$: Gradient indicating how changing the weight affects the loss.

**Key insight:** CNN filters are not usually manually designed. They are learned automatically from training examples.

# Additional Insights

## Direct Comparison

**CNN vs. [[Fully Connected Network (FCN)]]**

| Aspect | Fully Connected Network | CNN |
|---|---|---|
| Input processing | Connects neurons to all inputs | Processes local regions |
| Spatial relationships | Not explicitly preserved | Exploited directly |
| Weight sharing | Separate weights for connections | Same filter reused across positions |
| Parameters | Often very many for images | Usually much fewer |
| Best suited for | General structured data | Images and spatial data |

**Key distinction:** A CNN exploits the fact that nearby pixels are related and that the same visual pattern can appear in different locations.

## Major Limitations

**CNNs are not inherently robust to every visual transformation.**

- **Large rotations or viewpoint changes:** A filter learned for one orientation may not respond similarly to another.
- **Global relationships:** Small filters initially see only local regions, making some long-range relationships harder to learn.
- **Limited training data:** CNNs may memorize irrelevant visual details instead of learning patterns that generalize.

These limitations can be addressed partly through data augmentation, suitable architectures, and sufficient training data.

## Common Misconceptions

- **"CNN filters are predefined edge detectors."**
  - False. Filters learn useful patterns automatically during training. Early filters often resemble edge detectors.

- **"Pooling is required in every CNN."**
  - False. Some CNN architectures replace pooling with strided convolutions.

- **"A CNN recognizes complete objects immediately."**
  - False. A CNN typically builds complex representations by combining simpler features across successive layers.

**Key takeaway:** A CNN learns reusable local pattern detectors, combines their outputs into increasingly complex features, and uses those features to make predictions.