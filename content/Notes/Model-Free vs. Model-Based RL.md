---
title: Model-Free vs. Model-Based RL
created: 2026-06-20 16:29
tags file:
  - "[[Reinforcement Learning]]"
---
## The Core Distinction: What is a "Model"?

In reinforcement learning, a **Model** refers to the agent's internal understanding or simulation of the environment's physics. Specifically, it is a probability distribution function that predicts the environment's dynamics: given a current state $s$ and an action $a$, the model outputs the joint probability of the next state $s'$ and the immediate reward $r$, formalized as:

$$p(s', r \mid s, a) = \mathbb{P}(S_{t+1} = s', R_{t+1} = r \mid S_t = s, A_t = a)$$

From this master distribution, we can extract the two working components of a model:

1. **Transition Dynamics:** $p(s' \mid s, a) = \sum_{r} p(s', r \mid s, a)$, which tells us the probability of landing in state $s'$.
    
2. **Expected Reward Function:** $r(s, a) = \mathbb{E}[R_{t+1} \mid S_t = s, A_t = a]$, which tells us the average immediate payout.
    

- **Model-Free RL:** The agent does not try to predict what the environment will do next. It completely bypasses estimating $p(s' \mid s, a)$ and $r(s,a)$. It learns purely by trial-and-error experience, mapping states directly to values based on raw observations.
    
- **Model-Based RL:** The agent either learns or is given a model ($\hat{p}$ and $\hat{r}$). It uses these functions to simulate future possibilities mathematically and plan its choices before executing them in the real world.
    

## Side-by-Side: Metaphor vs. Reality

| **Feature**     | **The Metaphor (Navigating a Maze)**                                                                                                                                                                                                                                   | **The Reality (Reinforcement Learning Framework)**                                                                                                                                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Model-Free**  | **Navigating by Muscle Memory:** You walk around randomly. When you hit a dead end, it hurts; when you find cheese, it feels good. You memorize which directions felt best in each room, but you don't actually know what lies behind a closed door until you open it. | **Expectation-Free Sampling:** The agent updates estimates using real, raw transition tuples $(S_t, A_t, R_{t+1}, S_{t+1})$.<br><br>  <br>  <br><br>The update bypasses the transition model entirely:<br><br>$V(S_t) \leftarrow V(S_t) + \alpha \left[ R_{t+1} + \gamma V(S_{t+1}) - V(S_t) \right]$ |
| **Model-Based** | **Navigating with a Mental Map:** You look at a blueprint of the maze. Before taking a single physical step, you trace routes with your finger in your mind, predicting exactly which room each hallway leads to, and choosing the shortest path offline.              | **Full-Expectation Lookahead (Planning):** The agent computes values by sweeping through its transition and reward models mathematically via the Bellman operator:<br><br>$V(s) = \sum_{a} \pi(a \mid s) \sum_{s'} p(s' \mid s, a) \left[ r(s,a) + \gamma V(s') \right]$                              |

## 1. Model-Free Reinforcement Learning

Model-free algorithms skip the step of learning environment mechanics and focus entirely on learning value functions or policies directly from raw experience.

### How it works (The Math)

The agent interacts with the real world, experiences a single transition tuple, and applies an update rule. Because it lacks a model, it cannot sum over all possible future states. It uses the experienced next state $S_{t+1}$ and immediate reward $R_{t+1}$ as a sample:

$$\text{TD Target} = R_{t+1} + \gamma V(S_{t+1})$$

It computes the discrepancy (TD Error):

$$\delta_t = R_{t+1} + \gamma V(S_{t+1}) - V(S_t)$$

And shifts its estimate: $V(S_t) \leftarrow V(S_t) + \alpha \delta_t$

- **Core Algorithms:** [[Q-Learning]], [[SARSA]], [[Monte Carlo in RL]].
    
- **Advantages:** 
	* Highly robust; it functions perfectly in complex environments that are mathematically impossible to model or simulate accurately.
    
    - Low computational overhead per step, as it only requires basic arithmetic table lookups and changes taking $O(1)$ time per transition.
        
- **Disadvantages:** 
	* **Data Hungry:** Because it discards the structural connections between states and relies entirely on random single samples, it requires massive amounts of data to average out the sampling variance.
    

## 2. Model-Based Reinforcement Learning

Model-based algorithms split the problem into two distinct parts: Learning an empirical model (understanding the environment's rules) and Planning (using that model to calculate values offline).

### How it works (The Math)

If the agent doesn't know the true physics, it builds an **empirical model** from its history dataset $D$ by calculating sample averages:

- **Empirical Transition Probability:** $\hat{p}(s' \mid s, a) = \frac{N(s, a \rightarrow s')}{N(s, a)}$, where $N$ represents count frequencies.
    
- **Empirical Expected Reward:** $\hat{r}(s, a) = \frac{1}{N(s, a)}\sum_{i=1}^{N(s,a)} R^{(i)}$.
    

Once these functions are estimated, the agent solves the **Certainty-Equivalence Equation** offline without taking any more real actions:

$$V^*(s) = \hat{r}(s) + \gamma \sum_{s'} \hat{p}(s' \mid s) V^*(s')$$

- **Core Algorithms:** [[Dyna-Q]], [[Dynamic Programming]] (Value/Policy Iteration), AlphaZero.
    
- **Advantages:**
    
    - **Data Efficient:** It extracts maximum value from every real-world interaction by using it to build a permanent model, meaning it can think about a single real-world step thousands of times offline.
        
- **Disadvantages:**
    
    - **Model Error Trap:** If the learned model $\hat{p}$ is inaccurate, the mathematical planning summation ($\sum_{s'}$) will propagate false assumptions, leading to catastrophic failure when deployed.
        
    - **High Computational Cost:** Solving the certainty-equivalence system directly requires matrix inversions or comprehensive loops over the entire state space, demanding $O(\vert{}\mathcal{S}\vert{}^3)$ time.
        

## Enhanced Trade-off Comparison

|**Evaluation Metric**|**Model-Free RL**|**Model-Based RL**|**Mathematical Reason**|
|---|---|---|---|
|**Data Efficiency**|❌ Low|**High**|Model-Based methods maximize data utility by extracting explicit probability models $\hat{p}(s' \mid s)$ from sample counts.|
|**Computational Cost**|**Low**|❌ High|Model-Free uses cheap, incremental $O(1)$ updates. Model-Based requires heavy matrix computation or full iterative sweeps over all states taking $O(\vert{}\mathcal{S}\vert{}^3)$ time.|
|**Vulnerability**|**Low**|❌ High|Model-Free relies strictly on real-world ground truth data. Model-Based can compound errors if its internal simulation model $\hat{p}(s' \mid s)$ contains bias.|