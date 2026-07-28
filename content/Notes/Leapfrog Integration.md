---
title: "Leapfrog Integration"
created: "2026-07-26 12:07"
tags file:
---
## The Definition (What)

Leapfrog Integration is a numerical method for updating position and velocity over discrete time steps by alternating half-step and full-step updates so that position and velocity "leapfrog" over each other.

## Why It Is Important (Why)

Standard numerical solvers (like Euler's method) suffer from energy drift—meaning simulated physical systems like orbiting planets or sliding particles gradually gain or lose energy over time, causing trajectories to spiral out of control. 

Leapfrog Integration solves this because it is **symplectic** (time-reversible and energy-preserving on average), allowing continuous trajectories in physics simulations and [[Hamiltonian Monte Carlo]] to remain stable and accurate over long periods.

## How It Works (How)

Leapfrog Integration simulates physical trajectories by taking a initial half-step with momentum, using that updated momentum to take a full step with position, and finishing with a final half-step update for momentum.

### Phase 1: The Initial Half-Step Momentum Update

Starting at time $t$ with position $q(t)$ and momentum $p(t)$, the algorithm uses the force (the negative gradient of potential energy $-\nabla U(q)$) to update momentum by **half a time step** $\frac{\epsilon}{2}$:

$$
p\left(t + \frac{\epsilon}{2}\right) = p(t) - \frac{\epsilon}{2} \nabla U(q(t))
$$

- $q(t)$: The current position vector.
    
- $p(t)$: The current momentum vector.
    
- $\epsilon$: The discrete time step size.
    
- $-\nabla U(q(t))$: The force vector acting on the object at position $q(t)$.
    
- **Intuitive Meaning:** Before changing your physical location, you adjust your speed half a step forward based on the slope of the terrain where you are currently standing.
    

### Phase 2: The Full-Step Position Update

Using the newly updated half-step momentum $p\left(t + \frac{\epsilon}{2}\right)$, the position takes a **full time step** $\epsilon$ forward:

$$
q(t + \epsilon) = q(t) + \epsilon M^{-1} p\left(t + \frac{\epsilon}{2}\right)
$$

- $M^{-1}$: The inverse mass matrix, converting momentum into velocity ($v = M^{-1} p$).
    
- **Intuitive Meaning:** You step forward across the space using the updated velocity. Because velocity was updated at the midpoint ($t + \frac{\epsilon}{2}$), this step evaluates velocity right in the middle of the distance interval, achieving higher accuracy.
    

### Phase 3: The Second Half-Step Momentum Update

Now at the new position $q(t + \epsilon)$, the algorithm recalculates the force at this new location and completes the remaining half-step update for momentum:

$$
p(t + \epsilon) = p\left(t + \frac{\epsilon}{2}\right) - \frac{\epsilon}{2} \nabla U(q(t + \epsilon))
$$

- $p(t + \epsilon)$: The final momentum vector at time $t + \epsilon$.
    
- **Intuitive Meaning:** Now that you've arrived at your new location, you use the new local slope to finish the second half of the speed adjustment, bringing position and momentum back in sync at time $t + \epsilon$.
    

## Additional Insights

### Direct Comparison: Euler Integration vs. Leapfrog Integration

|**Feature**|**Standard Euler Method**|**Leapfrog Integration**|
|---|---|---|
|**Update Mechanism**|Position and momentum update simultaneously using values at the start of the step.|Updates alternate in staggered half-steps ("leapfrogging").|
|**Energy Conservation**|**Poor:** Energy steadily drifts away (e.g., orbits spiral outward).|**Excellent:** Energy oscillates tightly around the true value without long-term drift (**symplectic**).|
|**Time Reversibility**|No (running backward doesn't return to the start).|**Yes** (negating momentum perfectly traces the path backward).|
|**Order of Accuracy**|First-order error ($\mathcal{O}(\epsilon)$).|Second-order error ($\mathcal{O}(\epsilon^2)$) for the same computational effort.|

### Concrete Example: The Planet Orbit

Imagine simulating Earth orbiting the Sun:

- **Euler's Method:** At each second, Earth calculates where to move based on where it was just standing. Because of the lag, Earth continually overshoots its curve, moving slightly outward every second until it spirals out of the solar system.
    
- **Leapfrog Integration:** Earth calculates its mid-step velocity using the slope ahead, "looking through" the curve. As a result, the artificial outward errors from stepping forward are canceled out by inward corrections on the second half-step, keeping Earth locked in a stable, closed orbit indefinitely.
    

### A Major Limitation: Discretization Instability (Step-Size Explosion)

- **The Stability Limit:** Leapfrog Integration relies on a small step size $\epsilon$. If $\epsilon$ is set too large relative to the curvature (stiffness) of the potential energy surface $\nabla U(q)$, the numerical errors compound uncontrollably.
    
- **The Failure:** Instead of smoothly conserving energy, the physical particle shoots off to infinity, causing numerical overflow errors (`NaN` values). In [[Hamiltonian Monte Carlo|HMC]], this triggers **divergent transitions**, indicating the sampler has hit a region of steep density where the leapfrog step size $\epsilon$ was too large to simulate physics reliably.