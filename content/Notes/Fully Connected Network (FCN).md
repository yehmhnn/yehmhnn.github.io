---
title: Layer Types
created: 2026-05-28 14:43
tags file:
  - "[[Machine Learning]]"
---
A **Fully Connected Network (FCN)**—or Multilayer Perceptron (MLP)—is built by stacking layers where every neuron in one stage connects to every neuron in the next. Structurally, it is divided into three main stages: **Input**, **Hidden Blocks**, and **Output**.

> ⚠️ **Important Design Note on Hidden Blocks:** > While a hidden layer block is composed of a Linear layer, Batch Normalization, Activation, and Dropout, their **exact execution order is modular and not strictly fixed**. Different architectures rearrange these components based on empirical results.

## 1. The Input Stage

Before data can be processed by the network's weights, it must be properly formatted.

### Input Layer

- **Purpose:** The entry point for data features. It performs no mathematical operations.
    
- **Neurons:** Equal to the number of features in your dataset.
    

### Flatten / Reshape Layer

- **Purpose:** Prepares multi-dimensional data (like a $28 \times 28$ pixel image matrix) for the network.
    
- **Mechanism:** Unrolls the data into a 1D vector (e.g., $784$ elements) so the subsequent linear layers can ingest it.
    

## 2. The Hidden Layer Blocks (The Modular Engine)

In modern deep learning, a single "hidden layer" is actually a compound block of several functional components.

### Core Components inside a Hidden Block:

- **Linear Layer (Dense / Fully Connected)**
    
    - **Purpose:** Learns the linear combinations and relationships between features.
        
    - **Math:** Performs an affine transformation using a weight matrix $W$ and a bias vector $b$:
        
        $
z = W \cdot x + b
$
        
- **Activation Function Layer**
    
    - **Purpose:** Introduces non-linearity so the network can learn complex patterns. Without this, multiple linear layers collapse mathematically into a single linear function.
        
    - **Common Types:**
        
        - `[[ReLU]]` (Rectified Linear Unit): $f(x) = \max(0, x)$. The standard choice to prevent vanishing gradients.
            
        - `[[Leaky ReLU]]`: Allows a tiny gradient when $x < 0$ to prevent neurons from completely dying.
            
- **Batch Normalization (Batch Norm) Layer**
    
    - **Purpose:** Normalizes values to stabilize training, allow higher learning rates, and act as a mild regularizer.
        
    - **How it handles statistics:**
        
        1. **During Training:** Normalizes data using the current mini-batch mean and variance while maintaining a **running average** (exponential moving average) of these statistics across the entire training set.
            
        2. **After Training (Inference):** Stops updating statistics. The layer uses the final **computed $\mu_l$ and $\sigma_l$** derived from the whole training set to ensure predictions remain deterministic.
            
- **Dropout Layer**
    
    - **Purpose:** A regularization technique to prevent overfitting by stopping neurons from co-adapting too heavily.
        
    - **Mechanism:** 
	    - **During Training:** Randomly deactivates a fraction (e.g., 30%) of neurons during each forward pass.
        
        - **During Testing:** Bypassed completely so the network can utilize its full capacity.
            

### Common Hidden Block Sequencing Options

The order of these layers matters and depends on your choice of activation function:

#### Option A: The Modern Standard (Recommended for ReLU)

`Linear ➔ Activation ➔ BatchNorm ➔ Dropout`

- **Why:** Applying ReLU first zeroes out negative values, and BatchNorm then normalizes only the features that actually survived. Dropout is kept at the end to prevent interfering with BatchNorm's variance tracking.
    

#### Option B: The Classical Classical (Original BN Paper)

`Linear ➔ BatchNorm ➔ Activation ➔ Dropout`

- **Why:** Originally designed to ensure that inputs to saturating activations (like Sigmoid or Tanh) land perfectly in their non-zero gradient sweet spot before non-linearity is applied.
    

## 3. The Output Stage

The final layer shapes the network's raw calculations into the specific format required by your machine learning task.

### Output Layer + Softmax / Activation

The configuration of this final step depends entirely on what you are trying to predict:

|**Task Type**|**Output Neurons**|**Final Activation Layer**|**Output Meaning**|
|---|---|---|---|
|**Regression** (e.g., Housing Price)|1 (or number of targets)|Linear / None|Raw numerical value|
|**Binary Classification** (Yes/No)|1|Sigmoid|Probability of the positive class ($0$ to $1$)|
|**Multi-class Classification** (One of $N$)|$N$ (Number of classes)|**Softmax**|A strict probability distribution ($\sum P_i = 1$)|
|**Multi-label Classification** (Tags)|$N$ (Number of possible tags)|Sigmoid|Independent probabilities for each tag|

> **Note on Softmax:** The Softmax layer takes the raw scores (logits) from the final linear layer and squashes them into a distribution where all values range between 0 and 1, and the total sum equals exactly 1.

## Summary: Example End-to-End Pipeline (Option A Style)

When building an FCN, you repeat your chosen **Hidden Block** sequence as many times as your network depth requires:

Plaintext

```
[Input Data] 
     ↓
[Flatten Layer] (If input is multi-dimensional)
     ↓
┌─── Hidden Block 1 ────────────────────────────────────────────────────────┐
│ [Linear] ➔ [Activation (ReLU)] ➔ [Batch Normalization] ➔ [Dropout]        │
└─── ➔ Passes to next block ────────────────────────────────────────────────┘
     ↓
┌─── Hidden Block 2 ────────────────────────────────────────────────────────┐
│ [Linear] ➔ [Activation (ReLU)] ➔ [Batch Normalization] ➔ [Dropout]        │
└─── ➔ Passes to final stage ───────────────────────────────────────────────┘
     ↓
[Output Linear Layer] ➔ [Softmax / Sigmoid / None] ➔ [Final Prediction]
```
