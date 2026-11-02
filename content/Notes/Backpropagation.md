---
title: Backpropagation
created: 2026-05-28 15:20
tags file:
  - "[[Machine Learning Essentials]]"
---
# The Definition (What)

**Backpropagation** is an algorithm that calculates how much each weight in a neural network contributes to its prediction error, allowing the network to learn how to adjust those weights.

# Why It Is Important (Why)

A neural network learns by adjusting its weights to reduce prediction errors.

The challenge is determining **which weights should change, in which direction, and by how much**.

- A network can contain millions of weights, each influencing the final prediction.
- Changing weights randomly is inefficient.
- Testing each weight separately would require enormous amounts of computation.

**Backpropagation solves this by efficiently calculating the effect of every weight on the error using the chain rule of calculus.**

This makes training deep neural networks computationally practical.

# How It Works (How)

Backpropagation works in four steps.

### 1. Forward Pass: Make a Prediction

Input data flows through the network, layer by layer, producing a prediction.

For a single neuron:

$$
z = wx + b
$$

$$
a = f(z)
$$

Where:
- $x$: Input to the neuron.
- $w$: Weight controlling the input's influence.
- $b$: Bias shifting the neuron's output.
- $f$: Activation function introducing nonlinearity.
- $a$: Neuron's output.

Each layer passes its outputs to the next until the network produces its final prediction $\hat{y}$.

### 2. Calculate the Error

The network compares its prediction $\hat{y}$ with the correct answer $y$ using a loss function $L$.

For example, using squared error:

$$
L = \frac{1}{2}(\hat{y}-y)^2
$$

The loss measures how far the prediction is from the correct answer.

**The goal is to find weight changes that reduce this loss.**

### 3. Backward Pass: Calculate Gradients

Starting at the output, backpropagation works backward through the network.

It calculates the **gradient** of the loss with respect to each weight:

$$
\frac{\partial L}{\partial w}
$$

This gradient tells us:
- **Direction:** Whether increasing the weight increases or decreases the loss.
- **Magnitude:** How sensitive the loss is to changes in that weight.

The key mathematical tool is the **chain rule**:

$$
\frac{\partial L}{\partial w}
=
\frac{\partial L}{\partial a}
\cdot
\frac{\partial a}{\partial z}
\cdot
\frac{\partial z}{\partial w}
$$

Each factor represents one link in the chain:

- $\frac{\partial L}{\partial a}$: How the neuron's output affects the loss.
- $\frac{\partial a}{\partial z}$: How the activation function responds to its input.
- $\frac{\partial z}{\partial w}$: How the weight affects the neuron's input.

Multiplying these effects tells us **how changing the weight ultimately changes the loss**.

In deeper networks, the same principle applies across multiple layers.

Crucially, backpropagation reuses intermediate calculations as it moves backward, rather than independently recalculating each weight's effect.

### 4. Update the Weights

Once the gradients are known, an optimization algorithm such as gradient descent adjusts the weights:

$$
w_{\text{new}} = w_{\text{old}} - \eta \frac{\partial L}{\partial w}
$$

Where:
- $\eta$: Learning rate controlling the step size.
- $\frac{\partial L}{\partial w}$: Gradient calculated by backpropagation.

Subtracting the gradient moves the weight in the direction that locally reduces the loss.

The network then repeats the process:

**Forward pass → Calculate loss → Backpropagate gradients → Update weights → Repeat**

Over many iterations, the network generally learns to make better predictions.

# Additional Insights

## Concrete Example

Consider a simple neuron with no bias and no activation function:

$$
\hat{y} = wx
$$

Suppose:

- Input: $x = 2$
- Weight: $w = 3$
- Correct output: $y = 4$
- Learning rate: $\eta = 0.1$

**Step 1: Forward pass**

$$
\hat{y} = 3 \cdot 2 = 6
$$

**Step 2: Calculate loss**

$$
L = \frac{1}{2}(6-4)^2 = 2
$$

**Step 3: Backpropagate**

Using the chain rule:

$$
\frac{\partial L}{\partial w}
=
(\hat{y}-y)x
$$

$$
= (6-4)\cdot 2 = 4
$$

The positive gradient means increasing the weight would increase the loss, so the weight should decrease.

**Step 4: Update weight**

$$
w_{\text{new}} = 3 - 0.1(4) = 2.6
$$

Check the new prediction:

$$
\hat{y}_{\text{new}} = 2.6 \cdot 2 = 5.2
$$

The new loss is:

$$
L_{\text{new}} = \frac{1}{2}(5.2-4)^2 = 0.72
$$

**Result:** The loss decreased from $2$ to $0.72$ after one update.

This illustrates how gradients guide the network toward better predictions.

## Direct Comparison

Backpropagation and gradient descent are closely related but perform different tasks.

| Concept | Main responsibility |
|---|---|
| **Backpropagation** | Calculates how each weight affects the loss (gradients). |
| **Gradient descent** | Uses those gradients to update weights and reduce the loss. |

**Backpropagation calculates what should change; gradient descent performs the change.**

## Major Limitations

**Vanishing and exploding gradients** can make training deep networks difficult.

Because backpropagation repeatedly multiplies derivatives through layers:

- **Vanishing gradients:** Multiplying many small derivatives produces gradients near zero, causing earlier layers to learn extremely slowly.
- **Exploding gradients:** Multiplying large derivatives can produce enormous gradients, leading to unstable weight updates.

Techniques such as residual connections, suitable activation functions, and gradient clipping help address these problems.

## Common Misconceptions

- **"Backpropagation updates the weights."** Not directly. It calculates gradients; the optimizer uses them to update weights.
- **"Backpropagation guarantees the best possible weights."** No. It provides local information about how to reduce loss, not a guarantee of finding the global optimum.
- **"Errors are simply passed backward."** More precisely, gradients are propagated backward using the chain rule.

**Key intuition:** Backpropagation traces how each weight influenced the final error, then computes how changing that weight would affect the error.