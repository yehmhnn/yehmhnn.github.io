---
title: "Gating Prevents Vanishing Gradients"
created: "2026-07-24 13:07"
tags file:
---
## Core Mechanism

Gating architectures resolve the [[Vanishing Gradient Problem]] by splitting an input into two parallel branches—a linear candidate stream $u$ and a non-linear gate $v$—joined via element-wise multiplication:

$$
y = u \odot v
$$

Because the linear branch $u = xW + b$ has **no activation function sitting directly on top of it**, taking its derivative yields the gate value itself:

$$
\frac{\partial y}{\partial u} = v
$$

## Why Gradients Flow Freely

Using the calculus product rule, the derivative of the output with respect to the input $x$ is:

$$
\frac{\partial y}{\partial x} = \underbrace{W \odot v}_{\text{Unblocked Pathway}} + \underbrace{u \odot (\sigma' \cdot V)}_{\text{Gating Pathway}}
$$

* **The Gradient Highway:** Even if the gating derivative $\sigma'$ saturates and drops to zero, the left term ($W \odot v$) remains completely open. As long as the gate is open ($v > 0$), gradients flow backward along an unimpeded linear route.

## Applied In
* [[Gated Linear Unit (GLU)]]
* [[LSTM]] & [[GRU]]