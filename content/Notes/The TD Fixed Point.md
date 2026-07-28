---
title: The TD Fixed Point
created: 2026-07-11 19:14
tags file:
  - "[[Reinforcement Learning]]"
---
## The Definition (What)

The **TD Fixed Point** is the mathematical equilibrium destination where a [[Semi-Gradient]] [[Temporal-Difference Learning]] algorithm stabilizes, representing the exact weight configuration where the expected update velocity drops to absolute zero .

## Why It Is Important (Why)

Because semi-gradient TD updates intentionally discard half of the true error gradient to remain computationally practical, they do not minimize global value errors. The TD Fixed Point provides the exact algebraic solution needed to find where the weights will stop changing, allowing researchers to calculate the maximum mathematical error bound introduced by the semi-gradient shortcut.

## How It Works (How)

### Phase 1: The Setup (Compressing the World)

In a massive environment, we cannot keep a giant lookup table for every single state. Instead, we compress the world using [[Linear Function Approximation]].

Every state $s$ is converted into a **feature vector** $x(s)$, which describes the state using a handful of numerical attributes (like coordinates or distances). To calculate how good a state is, we take the dot product of these features and our adjustable network **parameter weights** $w$:

$$
\hat{v}(s,w) = w^\top x(s)
$$

* **$\hat{v}(s,w)$**: The estimated value prediction of state $s$.
* **$x(s)$**: The fixed feature traits of the state.
* **$w$**: The weights the AI is actively trying to learn and optimize.

---

### Phase 2: The Online Step (Experiencing Reality)

Imagine the AI agent is running live inside an environment. At time step $t$, it executes a single transition:

1. It stands in a current state $S_t$.

2. It takes an action, receives an immediate reward $R_{t+1}$ from the environment, and lands in a new state $S_{t+1}$.

The agent looks at its old expectation for the current state ($w^\top x(S_t)$) and compares it to the new reality it just experienced ($R_{t+1} + \gamma w^\top x(S_{t+1})$). The discrepancy between the two is the **TD Error** ($\delta_t$), or the "surprise factor":

$$
\delta_t = R_{t+1} + \gamma w^\top x(S_{t+1}) - w^\top x(S_t)
$$

---

### Phase 3: The Update (The [[Semi-Gradient]] Shortcut)

To fix its parameters so it makes better predictions next time, the agent runs a gradient update step. In standard linear optimization, the update direction is determined by multiplying the error ($\delta_t$) by the gradient of the prediction function.

Because our prediction function is purely linear ($\hat{v} = w^\top x$), the derivative with respect to our weights is simply the current state's feature vector:

$$
\nabla_w \hat{v}(S_t, w) = x(S_t)
$$

This gives us the live online update rule:

$$
w_{t+1} = w_t + \alpha \underbrace{\Big( R_{t+1} + \gamma w_t^\top x(S_{t+1}) - w_t^\top x(S_t) \Big)}_{\text{The TD Error Target Block}} \underbrace{x(S_t)}_{\text{The Feature Gradient}}
$$



> 
> **Why it is called a "Semi-Gradient":** Notice that the weights $w_t$ appear in the next-state look-ahead term $\gamma w_t^\top x(S_{t+1})$. A true calculus gradient would require us to differentiate that next-state term too. The semi-gradient shortcut says: *"Pretend the next-state guess is just a fixed number for a split second, and only differentiate the current state prediction."* 
> 

---

### Phase 4: The Big Picture (Collapsing Randomness into $b - Aw$)

Up to this point, everything is random and chaotic. Every step depends on what state the agent happens to stumble into ($S_t$), what reward drops ($R_{t+1}$), and where the physics engine kicks it next ($S_{t+1}$).

**We ask:** *If we freeze the weights $w$ and let the agent run for millions of steps, what is the net average velocity and direction that these updates will push the weights?* 

To find out, we take the mathematical expectation ($\mathbb{E}$) of that entire sample update block across the environment's steady-state visitation dynamics ($\mu$) and transition matrix ($P_\pi$):

$$
\overline{g}(w) = \mathbb{E} \left[ \left( R_{t+1} + \gamma w^\top x(S_{t+1}) - w^\top x(S_t) \right) x(S_t) \right]
$$


When you unroll that expectation using the probability summation laws we derived earlier, all the local real-time randomness irons itself out perfectly, transforming into fixed global structures :

1. The interaction between features and immediate rewards ($\sum_s \mu(s)x(s)r_\pi(s)$) compresses into a static pull vector: **$b = X^\top D r_\pi$**.

2. The interaction between current features, transition dynamics, and next-state look-ahead features compresses into a system matrix landscape: **$A = X^\top D(I - \gamma P_\pi)X$**.


This leaves us with the clean, deterministic linear system equation:

$$
\overline{g}(w) = b - Aw
$$

- **$\overline{g}(w)$**: The expected weight update direction vector under the steady-state state distribution.
    
- **$b$**: The target reward vector, defined as $X^\top D r_\pi$.
    
- **$A$**: The system dynamic matrix, defined as $X^\top D(I - \gamma P_\pi)X$.
    
### Phase 5 The Destination (The Fixed-Point Equilibrium)

When the system reaches equilibrium, the expected update direction stalls completely ($\overline{g}(w) = {0}$) . This establishes the **TD Fixed-Point Equation** :

$$Aw_{\text{TD}} = b$$

Solving this linear system by inverting matrix $A$ yields the final, permanent parameter weight vector:

$$
w_{\text{TD}} = \left( X^\top D(I - \gamma P_\pi)X \right)^{-1} X^\top D r_\pi
$$

**The Convergence Requirement:** This algebraic destination is only valid if the system actually stabilizes. To guarantee the iterative updates smoothly contract toward this point from any random initialization instead of exploding to infinity, the step-size $\alpha$ must be strictly bounded based on the rules of [[Linear TD Stability and Convergence]].

## Additional Insights

### Geometric Comparison: TD Fixed Point vs. $\text{VE}$ Minimization

The fundamental difference is that the semi-gradient TD fixed point targets the [[Bellman error]] rather than the true value error. 

It is critical not to confuse this equilibrium with true error optimization. If we expand the true hidden value function using Bellman equations ($v_\pi = (I - \gamma P_\pi)^{-1}r_\pi$), we can directly contrast the destinations:

- **Optimal Projection ([[Mean-Squared Value Error (VE)]]):**
$$
w_{\text{VE}} = (X^\top D X)^{-1} X^\top D \Big[ (I - \gamma P_\pi)^{-1} \Big] r_\pi
$$
$$
\mathbf{(I - \gamma P_\pi)^{-1}r_\pi} = \underbrace{r_\pi}_{\text{Immediate}} + \underbrace{\gamma P_\pi r_\pi}_{\text{Step 2}} + \underbrace{\gamma^2 P_\pi^2 r_\pi}_{\text{Step 3}} + \dots = \mathbf{v_\pi}
$$
    
- **Equilibrium Destination ($w_{\text{TD}}$):**
$$
w_{\text{TD}} = \Big[ X^\top D (I - \gamma P_\pi) X \Big]^{-1} X^\top D r_\pi
$$
    

Because the environment's transition dynamics matrix $(I - \gamma P_\pi)$ sits inside the matrix inverse for $w_{\text{TD}}$, the TD Fixed Point lands on a coordinate warped by the system's one-step physics. It balances localized Bellman transition errors rather than global value prediction errors, settling at an equilibrium that satisfies a slightly higher error boundary than the absolute global minimum of the $\text{VE}$ objective.

### Tabular Connection:

When using one-hot indicator features (meaning $X = I$), the feature compression landscape disappears, and the system matrix equation $Aw = b$ simplifies directly into the standard tabular Bellman expectation equation (see: [[Bellman Equations]]), proving that the tabular fixed point $V = v_{\pi}$ is just a special, uncompressed case of the linear TD fixed point.

When the agent's internal value estimate $V$ achieves mathematical perfection—meaning it perfectly matches the true value function ($V = v_{\pi}$) —the **TD Error** $\delta_t$ naturally balances out to zero on average when conditioned on any state $s$:

$$\mathbb{E}_{\pi}[\delta_{t} \mid S_{t}=s]=0 \quad \forall s$$

Mathematical Proof:

$$
\mathbb{E}_{\pi}[\delta_t \mid S_t = s] = \mathbb{E}_{\pi}[R_{t+1} + \gamma v_{\pi}(S_{t+1}) - v_{\pi}(S_t) \mid S_t = s]
$$

By utilizing the linearity of expectations and isolating the terms:

$$
\mathbb{E}_{\pi}[\delta_t \mid S_t = s] = \underbrace{\mathbb{E}_{\pi}[R_{t+1} + \gamma v_{\pi}(S_{t+1}) \mid S_t = s]}_{\text{Evaluates to } v_{\pi}(s) \text{ via Bellman Eq.}} - \underbrace{v_{\pi}(s)}_{\text{Constant due to conditioning}}
$$

$$
\mathbb{E}_{\pi}[\delta_t \mid S_t = s] = v_{\pi}(s) - v_{\pi}(s) = 0
$$