---
title: Linear TD Stability and Convergence
created: 2026-07-11 20:30
tags file:
  - "[[Reinforcement Learning]]"
---
### The Definition (What)

**Linear TD Stability and Convergence** is a mathematical framework used to establish the exact learning rate speed limits ($\alpha$) required to guarantee that an iterative, semi-gradient Temporal Difference learning system will successfully stabilize and converge to its equilibrium destination instead of exploding to infinity .

### Why It Is Important (Why)

Because semi-gradient TD learning does not follow a true error gradient down a hill, it lacks standard optimization stability guarantees. By framing the algorithm's weight updates as a discrete dynamic system, linear stability analysis allows us to find the exact boundary threshold for the step-size parameter ($\alpha$) based on the underlying environmental feature matrices .

### How It Works (How)

The mathematical verification moves from tracking live parameter weights to assessing the contractive properties of an error propagation matrix.

#### Phase 1: The Error-Tracking System

Rather than tracking the parameter weight vector $w_k$ directly, we track the remaining distance to our target fixed point ($w_{\text{TD}}$). We define our localized prediction error vector at any step $k$ as:

$$e_k = w_k - w_{\text{TD}}$$

Now, let's look at how this error changes from the current step ($e_k$) to the next step ($e_{k+1}$) under the deterministic update rule:
$$
w_{k+1} = w_k + \alpha(b - Aw_k)
$$

Subtracting the true target vector $w_{\text{TD}}$ from both sides allows us to isolate our error terms:
$$
w_{k+1} - w_{\text{TD}} = w_k - w_{\text{TD}} + \alpha(b - Aw_k)
$$

Substituting $b = Aw_{\text{TD}}$ into the equation:

$$
e_{k+1} = e_k + \alpha(Aw_{\text{TD}} - Aw_k)
$$
$$
e_{k+1} = e_k - \alpha A(w_k - w_{\text{TD}})
$$

Because $(w_k - w_{\text{TD}})$ is just our current error $e_k$, we can factor it out cleanly:

$$
e_{k+1} = e_k - \alpha A e_k = (I - \alpha A)e_k
$$

This establishes that on every single iteration of training, the remaining error vector is multiplied directly by the transformation matrix $(I - \alpha A)$.

#### Phase 2: The [[Spectral Radius]] Condition ($\rho < 1$)

Unrolling this error system over an infinite timeline yields the exponential matrix sequence $e_k = (I - \alpha A)^k e_0$. For this error vector to systematically shrink to zero from any random starting position, the absolute maximum scaling factor of the matrix must be strictly contractive.

This requirement is dictated by the **Spectral Radius** ($\rho$), which is the absolute value of the single largest eigenvalue ($\lambda$) of the matrix:

$$\rho(I - \alpha A) < 1$$

If this condition fails, the matrix will stretch the error along at least one coordinate axis, causing the system to wildly diverge toward infinity.

#### Phase 3: The [[Eigenvalue]] Transformation Trick

To find the eigenvalues of our error matrix $(I - \alpha A)$, we exploit the native eigenvalues of our environment system matrix $A$.

> 💡 **Notation Reminder:** We write the eigenvalues of matrix $A$ as $\lambda_i(A)$. This is **functional notation** (like $f(x)$), which reads as "the $i$-th eigenvalue _of_ matrix $A$." It does **not** mean $\lambda_i$ multiplied by $A$.

By the foundational definition of eigenvectors ($Av = \lambda v$), we pass a native vector through our error matrix and evaluate the transformation:

$$
\begin{aligned} (I - \alpha A)v &= Iv - \alpha Av \\ &= v - \alpha \lambda_i(A)v \\ &= \left(1 - \alpha \lambda_i(A)\right)v \end{aligned}
$$

This maps the eigenvalues of our step-by-step update system directly to our environment properties:

$$
\lambda_i(I - \alpha A) = 1 - \alpha \lambda_i(A)
$$

#### Phase 4: Calculating the Step-Size Speed Limit

Because matrix $A$ is assumed to be symmetric positive definite , its native eigenvalues are strictly positive real numbers ($\lambda_i(A) > 0$). To satisfy our contractive safety window ($\rho < 1$), every transformed eigenvalue must sit strictly between $-1$ and $1$:

$$-1 < 1 - \alpha \lambda_i(A) < 1$$

We split this compound inequality to isolate our learning rate bounds:

- **The Upper Boundary (Preventing Oscillatory Divergence):**
    
    $$-1 < 1 - \alpha \lambda_i(A) \implies \alpha \lambda_i(A) < 2 \implies \alpha < \frac{2}{\lambda_i(A)}$$
    
- **The Lower Boundary (Ensuring Forward Progress):**
    
    $$1 - \alpha \lambda_i(A) < 1 \implies -\alpha \lambda_i(A) < 0 \implies \alpha > 0$$
    

To ensure this boundary condition holds true uniformly across every single directional axis in the state space simultaneously, $\alpha$ is strictly bottlenecked by the single largest native eigenvalue, $\lambda_{\max}(A)$. This yields the final valid operational window:

$$0 < \alpha < \frac{2}{\lambda_{\max}(A)}$$

### Additional Insights

#### A Critical Caveat: The Deadly Triad Conflict

While this proof guarantees convergence when $A$ is symmetric positive definite , real-world off-policy reinforcement learning can violate this property entirely. When combining function approximation, bootstrapping, and off-policy data generation, the resulting matrix $A$ can lose its positive definiteness. This shifts its eigenvalues into the negative real plane, rendering the stability condition impossible to satisfy and causing the weight vector to actively diverge toward infinity regardless of how small you configure your learning rate ($\alpha$).