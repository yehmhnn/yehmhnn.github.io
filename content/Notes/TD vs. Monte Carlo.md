---
title: TD vs. Monte Carlo
created: 2026-06-10 18:17
tags file:
  - "[[Reinforcement Learning]]"
---
## TD vs. Monte Carlo

| **Dimension**          | **Monte Carlo (MC)**                                                                                                                           | **Temporal-Difference (TD)**                                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Update Frequency**   | **End of Episode:** Must wait until a terminal state is reached to compute the total return $G_t$.                                             | **Step-by-Step:** Updates online after every single action taken ($S_t \to A_t \to R_{t+1} \to S_{t+1}$).                                     |
| **Task Compatibility** | Strictly limited to **episodic tasks**.                                                                                                        | Works flawlessly on both **episodic** and **continuing tasks**.                                                                               |
| **Bias / Variance**    | **Zero Bias, High Variance:** Estimates are mathematically true to experience, but highly sensitive to random events across long trajectories. | **High Bias, Low Variance:** Relies on an initial guess (bias), but fluctuations are small because it updates based on single-step intervals. |
| **Data Efficiency**    | Often requires more data to stabilize due to high variance.                                                                                    | Typically converges faster than MC in practice by capitalizing on step-level feedback.                                                        |

## Bias / Variance in Value Prediction Detail:

An estimator $\hat{\theta}$ is **unbiased** for a true parameter $\theta$ if its expected value matches the truth:
$$\mathbb{E}[\hat{\theta}] = \theta$$

* **[[Monte Carlo in RL]] Target ($G_t$):**
$$
G_t = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}
$$
	* **Unbiased**, High Variance. 
	* The true return $G_t$ directly samples the full trajectory
	* By definition, $\mathbb{E}_\pi[G_t \mid S_t = s] = v_\pi(s)$.

* **[[Temporal-Difference Learning]] Target:**
$$
R_{t+1} + \gamma V(S_{t+1})
$$
	* **Biased**, Low Variance 
	* It swaps out the true value function $v_\pi$ for the current estimate table $V$ (Bootstrapping).
	* Because $V \neq v_\pi$ during training, $\mathbb{E}_\pi[R_{t+1} + \gamma V(S_{t+1}) \mid S_t = s] \neq v_\pi(s)$.
	* The TD target is $R_{t+1} + \gamma V(S_{t+1})$. Because it uses our current running table $V$ instead of the true $v_\pi$ , its expected value carries over whatever wrong numbers are currently in our table: $\mathbb{E}_\pi[R_{t+1} + \gamma V(S_{t+1}) \mid S_t = s] \neq v_\pi(s)$.