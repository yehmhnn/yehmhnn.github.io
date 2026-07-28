---
title: Gradient Bandit
created: 2026-07-20 22:42
tags file:
  - "[[Reinforcement Learning]]"
---
## The Big Idea Behind the Math

Up until now, your exploration has relied entirely on **Action-Value Estimation**—calculating absolute numeric values for actions to determine which one is "best."

This framework transitions you into **Policy Optimization**. Instead of forcing an agent to learn the exact numeric payout of every choice, it teaches the agent to optimize a behavior pattern directly by adjusting relative preferences based on the steepness (gradient) of a performance landscape. Furthermore, it demonstrates how you can cleanly subtract a moving baseline to dramatically stabilize an agent's learning path without corrupting or altering its true strategic direction .

## The Definition (What)

A Gradient Bandit is a reinforcement learning algorithm that selects actions based on relative numerical preferences rather than absolute action-value estimates, updating those preferences by moving along the directional slope of expected total reward .

## Why It Is Important (Why)

Unlike value-based approaches that struggle when true rewards are highly variable or continuous, Gradient Bandits optimize the policy directly. This enables smooth, gradual behavioral changes and allows the agent to converge cleanly on optimal probabilistic strategies without requiring arbitrary exploration parameters (like $\epsilon$) or hard-threshold decisions.

## How It Works (How)

### Phase 1: Tracking Relative Preferences

Instead of estimating true action values, the agent maintains a real number preference $H_t(a) \in \mathbb{R}$ for each action $a$. These preferences do not correspond to expected point rewards; they only matter _relative_ to one another. If $H_t(1) = 10$ and $H_t(2) = 2$, arm 1 is highly preferred over arm 2.

### Phase 2: Translating Preferences to Probabilities

To choose an action, preferences are fed into a softmax distribution to calculate a definitive probability $\pi_t(a)$ for selecting each arm $a$ :

$$\pi_t(a) = \frac{\exp(H_t(a))}{\sum_{b=1}^{k} \exp(H_t(b))}$$

- **$\exp(H_t(a))$**: Converts all preferences to positive values and ensures that higher numerical preferences grow exponentially more likely to be selected.
    
- **$\sum_{b=1}^{k} \exp(H_t(b))$**: Sums the converted values of all $k$ available choices to normalize the final output into a valid probability distribution that adds up to $1.0$ .
    

### Phase 3: Defining the Performance Landscape

The ultimate goal is to maximize the expected total reward, defined as the objective function $J(H)$:

$$J(H) = \sum_{a=1}^{k} \pi(a)q^{*}(a)$$

- **$\pi(a)$**: The current probability of taking action $a$.
    
- **$q^{*}(a)$**: The true, hidden average reward of action $a$.
    
- **$\sum$**: Summing these products defines the total expected reward under the current policy. The agent visualizes this as a multi-dimensional hill it wants to climb.
    

### Phase 4: Stepping Up the Gradient Using Actual Rewards

To climb the hill, we calculate the partial derivative of performance with respect to our preferences, which unrolls to the theoretical gradient :

$$\frac{\partial J}{\partial H(b)} = \pi(b)(q^{*}(b) - J(H))$$

Because the agent does not actually know the true action value $q^*(b)$ or the total environment performance $J(H)$ in practice, it substitutes them with real-world samples gathered at step $t$. The preference update for every arm $a$ is performed using a stochastic estimate :

$$H_{t+1}(a) = H_t(a) + \alpha (R_t - \overline{R}_t)(1_{\{A_t=a\}} - \pi_t(a))$$

- **$\alpha$**: A constant step-size parameter determining how quickly preferences change.
    
- **$R_t$**: The actual, single-step reward received at time $t$ for pulling the chosen arm $A_t$. This acts as a proxy for $q^*(A_t)$.
    
- **$\overline{R}_t$**: A baseline tracking the average of all rewards received so far . Subtracting this baseline acts as a comparison; if $R_t > \overline{R}_t$, the action performed better than average.
    
- **$1_{\{A_t=a\}}$**: An indicator function that equals $1$ if action $a$ was the chosen action, and $0$ otherwise . This splits the update logic conceptually:
    
    - **For the chosen action ($A_t = a$):** The term becomes $(1 - \pi_t(a))$, pushing the preference **up** if the reward was better than the baseline.
        
    - **For all unchosen actions ($a \neq A_t$):** The term becomes $(0 - \pi_t(a))$, pulling their preferences **down** proportionally so that the chosen action stands out even more.
        

## Additional Insights

### A Direct Comparison: Action-Value Methods vs. Gradient Bandit Methods

|**Feature**|**Action-Value Methods (ϵ-Greedy, UCB)**|**Gradient Bandit Methods**|
|---|---|---|
|**Core Target**|Learns absolute estimates of environment payouts ($Q(a) \approx q^*(a)$).|Learns relative behaviors and action inclinations ($H(a)$).|
|**Selection Type**|Hard deterministic choices broken up by explicit exploratory deviations.|Fluid, fully probabilistic choices generated natively at every step.|
|**Best Suited For**|Environments where knowing exact numeric value thresholds is helpful.|Environments where optimal behavior requires mixed, non-deterministic actions.|

### A Major Limitation: Preference Saturation

Because the policy relies on a softmax function, if the preference for one specific arm becomes significantly larger than the others, its selection probability $\pi(a)$ will drive extremely close to $1.0$.

Once this happens, the unchosen arms' probabilities sink near $0$. If the environment suddenly changes (non-stationarity) and a previously bad arm becomes the best choice, the unchosen updates drop to near-zero because of the $\pi_t(a)$ multiplier in the update rule. The agent effectively "locks in" its choice and becomes blind to alternative exploration paths.