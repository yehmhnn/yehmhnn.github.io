---
title: Softmax Policy Gradient Properties
created: 2026-07-21 11:49
tags file:
  - "[[Reinforcement Learning]]"
---
When using a **softmax policy parameterization** in policy gradient algorithms like [[REINFORCE]], the parameter update mechanism exhibits three fundamental theoretical properties: **Shift Invariance**, **Gradient Orthogonality**, and **Zero-Sum Preference Updates**.

---

## 1. Shift Invariance of Softmax

A softmax policy calculates action probabilities based on raw preference values $\theta = (\theta_1, \theta_2, \dots, \theta_K)^\top$:

$$
\pi(a_i \mid s, \theta) = \frac{e^{\theta_i}}{\sum_{j=1}^K e^{\theta_j}}
$$

The policy depends strictly on the **relative differences** between action preferences, rather than their absolute magnitudes.

### Mathematical Proof
If we add a uniform constant scalar $c$ to every preference component (equivalent to adding the vector $c\mathbf{1}$, where $\mathbf{1} = (1, 1, \dots, 1)^\top$), the policy distribution remains unchanged:

$$
\pi(a_i \mid s, \theta + c\mathbf{1}) = \frac{e^{\theta_i + c}}{\sum_{j=1}^K e^{\theta_j + c}} = \frac{e^{\theta_i} e^c}{e^c \sum_{j=1}^K e^{\theta_j}} = \frac{e^{\theta_i}}{\sum_{j=1}^K e^{\theta_j}} = \pi(a_i \mid s, \theta)
$$

> **Geometric Takeaway:** > Moving the parameter vector along the direction of uniform shift $\mathbf{1} = (1, 1, \dots, 1)^\top$ in parameter space is entirely redundant. It changes the raw preference values but leaves the agent's behavior identical.

---

## 2. Gradient Orthogonality (No Wasted Updates)

Because shifting parameters along $\mathbf{1}$ causes zero change in policy probabilities, the policy gradient automatically respects this invariant.

### Mathematical Proof
The score function (gradient of the log-policy) for a sampled action $a_k$ is given by:

$$
\nabla_\theta \ln \pi(a_k \mid s, \theta) = e_k - \pi
$$

where $e_k$ is the $k$-th standard basis vector and $\pi = (\pi_1, \pi_2, \dots, \pi_K)^\top$ is the vector of action probabilities.

Taking the inner product (dot product) of the shift vector $\mathbf{1}$ and the score vector gives:

$$
\mathbf{1}^\top \nabla_\theta \ln \pi(a_k \mid s, \theta) = \mathbf{1}^\top (e_k - \pi) = \sum_{i=1}^K (e_{k,i} - \pi_i) = \sum_{i=1}^K e_{k,i} - \sum_{i=1}^K \pi_i
$$

Evaluating the two sums:
1. $\sum_{i=1}^K e_{k,i} = 1$ (since $e_k$ has a $1$ at index $k$ and $0$ elsewhere).
2. $\sum_{i=1}^K \pi_i = 1$ (since probabilities over the action space sum to $1$).

$$
\mathbf{1}^\top \nabla_\theta \ln \pi(a_k \mid s, \theta) = 1 - 1 = 0
$$

> **Geometric Takeaway:**
> Two vectors with a dot product of zero are **orthogonal** (perpendicular). Because the gradient points in the direction of steepest change, and shifting along $\mathbf{1}$ produces zero change, the policy gradient is strictly orthogonal to $\mathbf{1}$. 
> 
> The algorithm naturally avoids wasting gradient steps on parameter shifts that do not alter agent behavior.

---

## 3. Action Preference as a Zero-Sum Game

Because the gradient is orthogonal to $\mathbf{1}$, a single policy gradient update step is a **zero-sum operation** across all action preferences.

### Component Breakdown

Consider a single REINFORCE update increment with step size $\alpha$, discount $\gamma^t$, and return $G_t$:

$$
\Delta \theta = \alpha \gamma^t G_t \nabla_\theta \ln \pi(a_k \mid s, \theta) = C (e_k - \pi)
$$

where $C = \alpha \gamma^t G_t$ is a scalar coefficient. 

Summing the components of the update vector $\Delta \theta$:

$$
\sum_{i=1}^K \Delta \theta_i = C \sum_{i=1}^K (e_{k,i} - \pi_i) = C (1 - 1) = 0
$$

### Individual Component Behavior (Assuming Positive Return $G_t > 0$)

* **For the sampled action $a_k$:**
$$
\Delta \theta_k = C (1 - \pi_k) > 0
$$
  The preference $\theta_k$ **increases**. The boost is inversely proportional to how likely the action already was (a surprising good outcome yields a larger boost).

* **For all unselected actions $a_{j \neq k}$:**
$$
\Delta \theta_j = C (0 - \pi_j) = -C \pi_j < 0
$$
  The preferences $\theta_j$ **decrease**. Each unselected action is penalized proportionally to its current probability.

> **Key Intuition:**
> Policy updates under softmax parameterization do not evaluate actions in isolation. Instead, boosting a rewarded action actively **pushes down** the preferences of all alternative actions by an equal total amount to shift their relative probabilities efficiently.
