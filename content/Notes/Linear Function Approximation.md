---
title: Linear Function Approximation
created: 2026-07-10 11:24
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

Linear function approximation is a method where an AI calculates the value of a situation by multiplying distinct numeric characteristics of that situation by a corresponding set of adjustable weights and adding them together, ensuring that a change in any single weight has a straightforward, proportional impact on the total estimate.

## Why It Is Important (Why)

It provides a mathematically stable and computationally efficient framework for generalizing across infinite or continuous state spaces. Unlike deep neural networks, which can suffer from unpredictable training behavior or catastrophic divergence when combined with temporal-difference learning, linear models possess a convex error landscape. This geometric property provides solid mathematical proofs of convergence to a global optimum or a tightly bounded fixed point, making it highly reliable for real-time systems where stability guarantees are mandatory.

## How It Works (How)

Linear function approximation transitions an agent from independent state lookups into a structured three-phase process that scales across continuous variables.

### Phase 1: Feature Extraction

Before any math occurs, the raw state description $s$ must be converted into a numeric profile called a feature vector. This vector represents the state as a list of components:

$$\mathbf{x}(s) \doteq \begin{bmatrix} x_1(s) \\ x_2(s) \\ \vdots \\ x_d(s) \end{bmatrix}$$

- $s$: The current raw state of the environment.
    
- $\mathbf{x}(s)$: A column vector containing $d$ numerical features that describe the state. Each individual feature $x_i(s)$ represents a specific trait, such as a position, velocity, or binary marker.
    

### Phase 2: The Value Prediction Formula

To compute the value prediction $\hat{v}(s, \mathbf{w})$, the agent performs a linear dot product between its internal weight parameters and the extracted features:

$$\hat{v}(s, \mathbf{w}) \doteq \mathbf{w}^T \mathbf{x}(s) = \sum_{i=1}^d w_i x_i(s)$$

- $\mathbf{w}$: The internal weight vector representing the "knobs" or importance metrics of the system.
    
- $w_i$: The specific weight assigned to feature $i$. If a feature is highly positive and its corresponding weight is large, it drives the total state value estimate upward.
    
- $\mathbf{w}^T \mathbf{x}(s)$: The algebraic dot product, which cleanly maps the multi-dimensional feature space down to a single, continuous value estimate.
    

### Phase 3: The Weight Update Mechanics

When the agent updates its weights using Stochastic Gradient Descent (SGD), the linear structure provides a major mathematical simplification. In a general system, calculating the direction of the update requires computing a complex gradient vector $\nabla \hat{v}(s, \mathbf{w})$. However, because the value equation is purely linear, the derivative with respect to the weights simplifies perfectly down to the feature vector itself:

$$\nabla \hat{v}(s, \mathbf{w}) = \mathbf{x}(s)$$

This derivative transforms the core reinforcement learning weight adjustment rule into a straightforward vector update:

$$\mathbf{w}_{t+1} = \mathbf{w}_t + \alpha \left[ U_t - \hat{v}(S_t, \mathbf{w}_t) \right] \mathbf{x}(S_t)$$

- $U_t$: The value target (e.g., the Monte Carlo return $G_t$ or a bootstrapped TD target).
    
- $\left[ U_t - \hat{v}(S_t, \mathbf{w}_t) \right]$: The prediction error scalar.
    
- $\mathbf{x}(S_t)$: The feature vector, acting as the directional update multiplier.
    

**Conceptual Meaning:** The product means that the adjustment is proportional to the feature values. If a feature $x_i(S_t)$ is zero, its corresponding weight $w_i$ changes by zero. If a feature is highly active, its weight absorbs a large portion of the blame or credit for the prediction error, adjusting accordingly to minimize future discrepancies.

### Operational Variations: Structuring the Features

Because the underlying valuation math is strictly linear, the entire complexity of the model hinges on how the features $\mathbf{x}(s)$ are constructed. Two primary variations are used to partition continuous spaces:

#### 1. [[Tile Coding]] (Binary Features)

Tile coding discretizes a continuous space by laying down multiple overlapping grids, called "tilings." Each tiling is offset from the others by a small fraction.

When an agent lands at a continuous coordinate $s$, it falls into exactly one grid square (a "tile") per tiling.

$$\text{If Tile } i \text{ is active} \implies x_i(s) = 1, \quad \text{otherwise} \implies x_i(s) = 0$$

This structure ensures that the feature vector is highly sparse, consisting mostly of zeros with a fixed number of ones. It allows the linear function to create sharp, localized step-adjustments across continuous dimensions.

#### 2. Radial Basis Functions (Continuous Features)

Radial Basis Functions (RBFs) output a continuous spectrum between $0$ and $1$ based on a state's physical distance from a designated prototype coordinate. The most common form is the Gaussian RBF:

$$x_i(s) \doteq \exp \left( -\frac{\|s - c_i\|^2}{2\sigma_i^2} \right)$$

- $c_i$: The fixed center point (prototype) of feature $i$ in the state space.
    
- $\sigma_i$: The width or standard deviation of the function, which dictates how far the feature's influence blurs outward.
    
- $\|s - c_i\|$: The distance between the current state and the center. If the agent stands exactly on $c_i$, the numerator becomes zero, causing $x_i(s) = 1$. As the agent drifts away, the feature value decays smoothly toward zero, producing continuous generalizations.
    

## Additional Insights

### A Direct Comparison: Linear Approximation vs. Deep Learning (Non-Linear)

|**Evaluation Metric**|**Linear Function Approximation**|**Deep Neural Networks (Non-Linear)**|
|---|---|---|
|**Optimization Landscape**|Convex (Single global optimum, no local traps).|Non-convex (Vulnerable to local minima and saddle points).|
|**Convergence Stability**|High; mathematically proven convergence bounds under standard TD.|Low; prone to destabilization and divergence ("Deadly Triad").|
|**Feature Reliance**|Requires manual feature engineering (e.g., Tile Coding design).|Automatically extracts and constructs complex feature spaces from raw data.|

### A Major Limitation: The Representation Bottleneck

Because the mathematical model is strictly linear, **the system cannot learn feature interactions on its own.** If a task requires an agent to recognize a non-linear relationship (for example, a combination where an action is only good if feature $A$ AND feature $B$ are both active simultaneously), a standard linear model is blind to it. It will treat feature $A$ and feature $B$ as completely isolated elements.

To overcome this, the engineer must explicitly pre-program cross-product features or multi-dimensional tilings. This makes linear approximation highly dependent on human feature design; if your feature layout cannot express the core solution, the algorithm will fail to learn it.