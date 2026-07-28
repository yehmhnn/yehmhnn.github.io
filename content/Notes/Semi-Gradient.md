---
title: Semi-Gradient
created: 2026-07-10 13:14
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

Semi-gradient descent is a shortcut method for updating an AI's value function where the algorithm calculates the direction to adjust its weights based only on the current situation's prediction, intentionally pretending that its future guesses (the targets) are fixed constants rather than changing variables controlled by those same weights.

### Why is it called "Semi" (Half) Gradient?

To see why it's only a "half" (semi) gradient, we just have to look at where the AI's adjustable weights ($\mathbf{w}$) live during a Temporal-Difference (TD) update. ([[Temporal-Difference Learning]])

The agent is trying to fix its prediction error:

$$
\text{Error} = \left( \text{Target} - \text{Prediction} \right)^2
$$

In TD learning, we substitute the real values into that equation:

$$
\text{Error} = \left[ \underbrace{\left( R + \gamma \hat{v}(S_{\text{next}}, \mathbf{w}) \right)}_{\text{The Target}} - \underbrace{\hat{v}(S_{\text{current}}, \mathbf{w})}_{\text{The Prediction}} \right]^2
$$

> Look closely at the $\mathbf{w}$ variables:
> 
> Notice that the AI's internal weights ($\mathbf{w}$) appear **two times** in this single error equation:
> 
> 1. It is inside the **Prediction** (how much it thinks the current state is worth).
>     
> 2. It is inside the **Target** (how much it thinks the _next_ state is worth).
>     

|**Name in Equation**|**Mathematical Term**|**What it Represents Conceptually**|**Temporal Placement**|
|---|---|---|---|
|**The Prediction**|$V(S_t)$|The guess you want to update and fix.|**Present** (Time step $t$)|
|**The Target**|$R_{t+1} + \gamma V(S_{t+1})$|The newer, better guess used as the benchmark.|**Future** (Time step $t+1$)|

### The Choice: Full vs. Semi

- **A True, Full Gradient:** To do true gradient descent, calculus requires you to calculate the derivative of **both** places where $\mathbf{w}$ appears. You have to differentiate the Prediction _and_ differentiate the Target.
    
- **A Semi-Gradient:** The semi-gradient method says: _"Calculating the derivative of the Target is too much work and makes the system unstable. Let's just pretend the Target is a fixed number like 10, and take the derivative of **only** the Prediction."_
    

Because you are intentionally ignoring the Target's weights and only computing the derivative for **half of the equation**, the math is incomplete. You aren't doing a full gradient calculation—you are doing a partial, **semi-gradient** calculation!


## Why It Is Important (Why)

It makes online, step-by-step reinforcement learning computationally practical and stable when scaled up to function approximation. In bootstrapping methods like [[Temporal-Difference Learning]], the teaching target relies directly on the agent's current internal weights; a true gradient descent update would require calculating how a change in weights ripples forward to alter future state predictions. By dropping this highly complex mathematical tracking, semi-gradient methods maintain the ability to learn incrementally after every single action without causing massive computational slowdowns.

## How It Works (How)

Let's break down the mathematical progression from standard error minimization to the semi-gradient shortcut.

### Phase 1: The Standard Optimization Goal

We start with the objective to minimize the squared error between what the agent predicts a state is worth and a given target value. In standard gradient descent, the weight adjustment formula is:

$$
\mathbf{w}_{t+1} = \mathbf{w}_t + \alpha \left[ U_t - \hat{v}(S_t, \mathbf{w}_t) \right] \nabla_\mathbf{w} \hat{v}(S_t, \mathbf{w}_t)
$$

- $\mathbf{w}_t$: The current vector of internal weights controlling the value function.
    
- $\alpha$: The learning rate, determining how far to step along the gradient.
    
- $U_t$: The target value the agent is aiming for.
    
- $\hat{v}(S_t, \mathbf{w}_t)$: The agent's current value prediction for the state $S_t$.
    
- $\nabla_\mathbf{w} \hat{v}(S_t, \mathbf{w}_t)$: The gradient (derivative) of the prediction with respect to the weights, pointing in the direction that changes the prediction the fastest.
    

### Phase 2: The Bootstrapped Target Conflict

In [[Temporal-Difference learning]], the target $U_t$ is not an absolute, independent historical fact. Instead, it is a _bootstrapped target_ built using the agent's own next-step guess:

$$
U_t = R_{t+1} + \gamma \hat{v}(S_{t+1}, \mathbf{w}_t)
$$

- $R_{t+1}$: The immediate reward received after transitioning.
    
- $\gamma$: The discount factor for future rewards.
    
- $\hat{v}(S_{t+1}, \mathbf{w}_t)$: The current value prediction for the _next_ state $S_{t+1}$.
    

**The Conflict:** Notice that the weight vector $\mathbf{w}_t$ appears on _both_ sides of the error bracket: inside the prediction $\hat{v}(S_t, \mathbf{w}_t)$ and inside the target $U_t$. If you change $\mathbf{w}_t$ to fix your current prediction, you are simultaneously moving the goalposts for your future predictions.

### Phase 3: The Semi-Gradient Operation

To bypass the mathematical nightmare of tracking a moving goalpost, the semi-gradient method applies a clever compromise. When taking the derivative of the error, it treats the target $U_t$ as a frozen constant number, completely ignoring its dependency on $\mathbf{w}_t$.

The resulting update equation looks identical to the standard gradient formula, but behaves differently under the hood:

$$
\mathbf{w}_{t+1} = \mathbf{w}_t + \alpha \left[ \left( R_{t+1} + \gamma \hat{v}(S_{t+1}, \mathbf{w}_t) \right) - \hat{v}(S_t, \mathbf{w}_t) \right] \nabla_\mathbf{w} \hat{v}(S_t, \mathbf{w}_t)
$$

- $\left( R_{t+1} + \gamma \hat{v}(S_{t+1}, \mathbf{w}_t) \right)$: The bootstrapped TD target, treated as a fixed constant during differentiation.
    
- $\nabla_\mathbf{w} \hat{v}(S_t, \mathbf{w}_t)$: The gradient computed _only_ for the current state's prediction. Because we only take the gradient of _half_ the components that actually contain $\mathbf{w}_t$, the process is called a **semi-gradient**.

If we didn't pretend it was fixed, the true gradient formula would look like this:
(which is called Residual Gradient)
$$
\mathbf{w}_{t+1} = \mathbf{w}_t + \alpha \left[ \left( R_{t+1} + \gamma \hat{v}(S_{t+1}, \mathbf{w}_t) \right) - \hat{v}(S_t, \mathbf{w}_t) \right] \left( \nabla_\mathbf{w} \hat{v}(S_t, \mathbf{w}_t) - \gamma \nabla_\mathbf{w} \hat{v}(S_{t+1}, \mathbf{w}_t) \right)
$$


## Additional Insights

### A Direct Comparison: Full Gradient vs. Semi-Gradient

| **Evaluation Metric**     | **Full Gradient Descent**                                                      | **Semi-Gradient Descent**                                                            |
| ------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| **Target Independence**   | The target $U_t$ must be completely independent of the weights $\mathbf{w}_t$. | The target $U_t$ can contain the weights $\mathbf{w}_t$ (bootstrapping).             |
| **Mathematical Accuracy** | Follows the true, exact gradient of the total squared error.                   | Approximates the true gradient by ignoring the target's derivatives.                 |
| **Algorithmic Fit**       | Ideal for [[Monte Carlo in RL]] (where targets are final real-world returns).  | Ideal for [[Temporal-Difference learning]] (where targets are step-by-step guesses). |
| **Convergence Point**     | Converges directly to a local or global minimum error.                         | Converges to a slightly higher error boundary called the **TD Fixed Point**.         |

### A Major Limitation: The Deadly Triad

Because semi-gradient descent does not follow a true error gradient, it loses some of the ironclad stability guarantees of standard optimization math. If you combine **Semi-Gradient updates** with the following two conditions, you create a highly unstable state known as **The Deadly Triad**:

1. **Function Approximation:** Using a model with fixed weights (like linear coding or neural networks) instead of a standalone table.
    
2. **Bootstrapping:** Updating your value estimates based on other value estimates (TD learning).
    
3. **Off-Policy Training:** Learning from data that was generated by a different strategy than the one you are currently optimizing.
    

When all three elements meet, the semi-gradient math can completely break down. Instead of converging to the true value function, the weight vector can spiral out of control, causing the agent's value predictions to wildly diverge toward infinity.