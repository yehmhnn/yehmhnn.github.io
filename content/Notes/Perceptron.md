---
title: Perceptron
created: 2026-10-22 14:32
tags file:
  - "[[Machine Learning Essentials]]"
---
# The Definition (What)

A **Perceptron** is a simple machine learning model that learns to make binary decisions (e.g., yes/no or 0/1) by combining inputs with adjustable weights.

# Why It Is Important (Why)

- **Problem:** How can a computer learn to classify things without manually writing decision rules?
- **Solution:** A Perceptron automatically learns which inputs matter and how strongly they should influence a decision.
- **Key advantage:** Instead of manually choosing a decision boundary, it learns one from labeled examples.
- **When useful:** Simple binary classification problems where the two classes can be separated by a straight line (or a flat boundary in higher dimensions).

The Perceptron is also a foundational building block for understanding artificial neural networks.

# How It Works (How)

A Perceptron operates in three main steps:

### 1. Calculate a weighted sum

Each input is multiplied by a weight, and the results are added together with a bias:

$$
z = \sum_{i=1}^{n} w_i x_i + b
$$

Where:
- $x_i$: Input feature (information used to make a decision).
- $w_i$: Weight indicating how strongly that input influences the decision.
- $b$: Bias that shifts the decision threshold.
- $z$: Combined score used to make the prediction.

**Intuition:** Positive weights push the decision toward 1; negative weights push it toward 0.

### 2. Make a binary prediction

The Perceptron applies a **step function** to the weighted sum:

$$
\hat{y} =
\begin{cases}
1 & \text{if } z \geq 0 \\
0 & \text{if } z < 0
\end{cases}
$$

- $\hat{y}$: Predicted class (0 or 1).
- $z$: Score calculated in Step 1.

**Intuition:** The Perceptron says "yes" when the combined score reaches the threshold and "no" otherwise.

### 3. Learn from mistakes

During training, the Perceptron compares its prediction with the correct label and updates its weights:

$$
w_i \leftarrow w_i + \eta(y-\hat{y})x_i
$$

$$
b \leftarrow b + \eta(y-\hat{y})
$$

Where:
- $y$: Correct label (0 or 1).
- $\hat{y}$: Predicted label.
- $\eta$: Learning rate controlling the size of each adjustment.
- $x_i$: Input feature.

**How the update works:**

- **Correct prediction ($y=\hat{y}$):** No update.
- **False negative ($y=1,\hat{y}=0$):** Increase the score for this example.
- **False positive ($y=0,\hat{y}=1$):** Decrease the score for this example.

This process repeats across training examples until the model makes no mistakes or training stops.

# Additional Insights

## Concrete Example

Suppose a Perceptron predicts whether a student passes an exam based on:

- $x_1$: Hours studied.
- $x_2$: Number of practice tests completed.

Assume:

$$
w_1=0.5,\quad w_2=1,\quad b=-3
$$

A student studied 4 hours and completed 2 practice tests:

$$
z = 0.5(4)+1(2)-3=1
$$

Since $z \geq 0$, the prediction is:

$$
\hat{y}=1 \quad \text{(Pass)}
$$

Now suppose the student actually failed ($y=0$).

With learning rate $\eta=0.1$, the weights update:

$$
w_1 = 0.5+0.1(0-1)(4)=0.1
$$

$$
w_2 = 1+0.1(0-1)(2)=0.8
$$

$$
b=-3+0.1(0-1)=-3.1
$$

The model has **reduced its score for this student**, making the same incorrect "Pass" prediction less likely in the future.

## Major Limitations

A single Perceptron can only learn **linear decision boundaries**.

For two inputs, its boundary is:

$$
w_1x_1+w_2x_2+b=0
$$

This describes a straight line separating the two classes.

- **Works:** Problems where a straight line can separate the classes, such as the AND logic function.
- **Fails:** Problems like XOR, where no single straight line can separate the classes correctly.

**Why?** The Perceptron makes its decision using only one weighted sum and one threshold. It cannot represent more complex, nonlinear boundaries.

If the data is not linearly separable, the standard Perceptron learning algorithm is not guaranteed to converge.

**Key takeaway:** A Perceptron learns a binary decision by adjusting weights based on mistakes, but a single Perceptron can only solve linearly separable classification problems.