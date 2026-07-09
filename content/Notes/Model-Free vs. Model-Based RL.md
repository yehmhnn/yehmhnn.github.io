---
title: Model-Free vs. Model-Based RL
created: 2026-06-20 16:29
tags file:
  - "[[Reinforcement Learning]]"
---
# The Core Distinction: What is a "Model"?

In reinforcement learning, a **Model** refers to the agent's internal understanding or simulation of the environment's physics. Specifically, it is a function that predicts the environment's dynamics: given a current state $s$ and an action $a$, the model outputs the probability of the next state $s'$ and the expected reward $r$, formalized as $p(s', r \mid s, a)$.

- **Model-Free RL:** The agent does **not** try to predict what the environment will do next. It learns purely by trial-and-error experience, mapping states directly to actions or values based on what happened in the past.
    
- **Model-Based RL:** The agent either learns or is given a model of the environment. It uses this model to simulate future possibilities and **plan** its choices before actually executing them in the real world.
    

# Side-by-Side: Metaphor vs. Reality

Imagine trying to navigate a dark, complex maze to find a prize.

| **Feature**     | **The Metaphor (Navigating a Maze)**                                                                                                                                                                                                                                     | **The Reality (Reinforcement Learning)**                                                                                                                                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Model-Free**  | **Navigating by Muscle Memory**: You walk around randomly. When you hit a dead end, it hurts; when you find cheese, it feels good. You memorize which directions _felt_ best in each room, but you don't actually know what lies behind a closed door until you open it. | **Value/Policy Mapping**: The agent maps experiences directly to a $Q$-table or policy. It updates estimates using real, raw transitions $(S_t, R_{t+1}, S_{t+1})$ without calculating the underlying transition probabilities.                      |
| **Model-Based** | **Navigating with a Mental Map**: You look at a blueprint of the maze. Before taking a single physical step, you trace routes with your finger in your mind, predicting exactly which room each hallway leads to, and choosing the shortest path offline.                | **Planning & Simulation**: The agent feeds its state and action choices into an internal function $\text{Model}(s, a) \to (s', r)$. It computes future trajectories offline to optimize its policy before executing actions in the real environment. |

# 1. Model-Free Reinforcement Learning

Model-free algorithms skip the step of learning environment mechanics and focus entirely on learning value functions or policies directly from raw experience.

- **How it works:** The agent interacts with the real world, experiences a transition, and applies an update rule (like TD or MC) to adjust its value estimates.
    
- **Core Algorithms:** [[Q-Learning]], [[SARSA]], [[Monte Carlo in RL]].
    
- **Advantages:** 
	* Highly robust; it functions perfectly in complex environments that are mathematically impossible to model or simulate accurately.
    
    - Low computational overhead per step, as it does not require running simulated forward passes.
        
- **Disadvantages:** 
	* **Data Hungry:** Because it relies entirely on real-world trial and error, it often requires millions of physical interactions to learn an effective policy.
    

# 2. Model-Based Reinforcement Learning

Model-based algorithms split the problem into two distinct parts: **Learning a Model** (understanding the environment's rules) and **Planning** (using the model to generate simulated data to learn from).

- **How it works:** The agent builds a predictive dataset of how the environment responds. It then uses that dataset to generate virtual experiences, running algorithms (like Dynamic Programming or simulated value loops) on the virtual data.
    
- **Core Algorithms:** [[Dyna-Q]], [[Dynamic Programming]] (Value/Policy Iteration), AlphaZero.
    
- **Advantages:**
    
    - **Data Efficient:** It extracts maximum value from every real-world interaction by using it to refine the model, then thinking about that interaction multiple times offline.
        
- **Disadvantages:**
    
    - **Model Error Trap:** If the learned model is inaccurate, the agent will plan using a flawed simulation, leading to catastrophic failure when the learned policy is deployed in the real world.
        

# Trade-off Comparison

|**Evaluation Metric**|**Model-Free RL**|**Model-Based RL**|
|---|---|---|
|**Data Efficiency**|❌ **Low** (Needs massive real-world data)|**High** (Can learn a lot from few real steps)|
|**Computational Cost**|**Low** (Simple lookup and quick adjustments)|❌ **High** (Heavy processing needed for planning updates)|
|**Vulnerability**|**Low** (Ground truth driven; cannot be fooled by fake simulations)|❌ **High** (Prone to failure if the model is imperfect)|
|**Best Used For...**|Video games, robotics with easy-to-collect data, or highly chaotic environments.|Real-world medical systems, chemical plants, or scenarios where real mistakes are expensive.|
