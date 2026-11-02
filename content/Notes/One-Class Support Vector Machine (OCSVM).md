---
title: One-Class Support Vector Machine (OCSVM)
created: 2026-10-25 17:38
tags file:
  - "[[Machine Learning Essentials]]"
---
# The Definition (What)

- **One-Class Support Vector Machine (OCSVM)** is an anomaly detection algorithm that learns the patterns of normal data and identifies observations that do not fit those patterns.

# Why It Is Important (Why)

- **Problem:** In many applications, normal data is abundant, but anomalies are rare, unknown, or difficult to label.
- **Solution:** OCSVM learns a decision boundary using mostly normal observations, without requiring examples of every possible anomaly.
- **Advantage:** Unlike binary classification, it can detect previously unseen anomalies.
- **Useful for:** Equipment failure detection, cybersecurity, and identifying unusual system behavior.

# How It Works (How)

1. **Learn from normal data**
   - Train OCSVM on observations $x_1,\ldots,x_n$ that are assumed to be mostly normal.
   - The goal is to learn a boundary separating typical observations from unusual ones.
   - Technically, OCSVM separates the training data from the origin in a transformed feature space.

2. **Measure similarity using a kernel**
   - A kernel measures similarity between observations, allowing OCSVM to learn nonlinear boundaries.
   - A common choice is the Gaussian kernel ([[RBF Kernel]]):

   $$
   K(x_i,x)=\exp\left(-\frac{\|x_i-x\|^2}{2\sigma^2}\right)
   $$

   - $x_i$: A training observation.
   - $x$: An observation being evaluated.
   - $\|x_i-x\|$: Distance between the observations.
   - $\sigma$: Controls how quickly similarity decreases with distance.
   - Nearby observations have similarity close to $1$; distant observations have similarity close to $0$.

3. **Learn the decision boundary**
   - OCSVM combines similarities to selected training observations, called **support vectors**, to construct a decision function:

   $$
   f(x)=\sum_{i=1}^{n}\alpha_i K(x_i,x)-\rho
   $$

   - $\alpha_i$: Learned nonnegative weight of training observation $x_i$. Only support vectors have nonzero weights.
   - $K(x_i,x)$: Similarity between the training observation and the new observation.
   - $\rho$: Learned threshold defining the decision boundary.
   - The algorithm learns these values to separate typical training observations from the origin in feature space, while allowing some observations to violate the boundary.

   - A key hyperparameter, $\nu$, controls the permitted fraction of training observations outside the boundary. Under standard conditions, $\nu$ is an upper bound on that fraction.

4. **Classify new observations**
   - Evaluate the learned decision function:

   $$
   \begin{cases}
   f(x)\geq 0 & \text{Normal (inlier)}\\
   f(x)<0 & \text{Anomaly (outlier)}
   \end{cases}
   $$

   - A positive score means the observation lies on the normal side of the boundary.
   - A negative score means it lies on the anomalous side.
   - The score is **not a probability** of being anomalous.

# Additional Insights

## Concrete Example

Suppose a machine normally operates near temperatures of $20^\circ C$ to $22^\circ C$.

Consider a simplified OCSVM trained on:

$$
x_1=20,\qquad x_2=22
$$

Using an RBF kernel with $\sigma=2$, suppose the learned parameters are:

$$
\alpha_1=\alpha_2=0.5,\qquad \rho\approx0.803
$$

**New observation: $x=21$**

Both training observations are close to $21$:

$$
K(20,21)=K(22,21)\approx0.882
$$

Therefore:

$$
f(21)=0.5(0.882)+0.5(0.882)-0.803
\approx0.079
$$

Since $f(21)>0$, the observation is classified as **normal**.

**New observation: $x=35$**

Both similarities are approximately zero because $35$ is far from the training temperatures:

$$
f(35)\approx0-0.803=-0.803
$$

Since $f(35)<0$, the observation is classified as an **anomaly**.

**Intuition:** OCSVM detects whether a new observation resembles the learned normal patterns sufficiently to fall inside the decision boundary.

## Major Limitations

- **Contaminated training data:** If training data contains many anomalies, OCSVM may learn to treat them as normal.
- **Sensitivity to hyperparameters:** The kernel width $\sigma$ and parameter $\nu$ strongly influence the boundary. Poor settings can produce too many false alarms or miss real anomalies.
- **Feature scaling matters:** With distance-based kernels, features having larger numerical scales can dominate the similarity calculation.
- **Changing normal behavior:** If normal operating conditions shift over time, the learned boundary may become outdated.

**Key takeaway:** OCSVM learns a flexible boundary around mostly normal data and flags observations outside it, making it useful when labeled anomalies are unavailable.