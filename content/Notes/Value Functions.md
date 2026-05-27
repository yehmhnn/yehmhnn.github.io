2026-05-11 14:24
Tags: [[Reinforcement Learning]]
***

## Definition

Value functions are functions of states (or state-action pairs) that estimate how "good" it is for the agent to be in a given state. This "goodness" is defined in terms of the **expected return**—the total reward an agent can expect to accumulate over the future, starting from that state.

---

## 1. State-Value Function ($v_\pi$)

The value of a state $s$ under a policy $\pi$, denoted as $v_\pi(s)$, is the expected return when starting in $s$ and following $\pi$ thereafter.

$$v_\pi(s) \doteq \mathbb{E}_\pi [G_t | S_t = s] = \mathbb{E}_\pi \left[ \sum_{k=0}^{\infty} \gamma^k R_{t+k+1} \mid S_t = s \right]$$

- **Role:** Evaluates the desirability of being in a specific state.
    
- **Key Insight:** It averages over all possible future trajectories allowed by the policy $\pi$ and the environment's dynamics.
    

---

## 2. Action-Value Function ($q_\pi$)

The value of taking action $a$ in state $s$ under a policy $\pi$, denoted as $q_\pi(s, a)$, is the expected return starting from $s$, taking action $a$, and thereafter following policy $\pi$.

$$q_\pi(s, a) \doteq \mathbb{E}_\pi [G_t | S_t = s, A_t = a] = \mathbb{E}_\pi \left[ \sum_{k=0}^{\infty} \gamma^k R_{t+k+1} \mid S_t = s, A_t = a \right]$$

- **Role:** Directly informs the agent which action is superior in a given state.
    
- **Significance:** Most model-free algorithms (like Q-Learning) focus on estimating $q$ because it allows for action selection without knowing the environment's transition probabilities ($p$).
    

---

## 3. Optimal Value Functions

The goal of RL is to find a policy that achieves the maximum reward. This leads to the optimal value functions:

- **Optimal State-Value:** $v_*(s) \doteq \max_\pi v_\pi(s)$ for all $s \in \mathcal{S}$.
    
- **Optimal Action-Value:** $q_*(s, a) \doteq \max_\pi q_\pi(s, a)$ for all $s \in \mathcal{S}$ and $a \in \mathcal{A}(s)$.
    

If you have $q_*(s, a)$, the optimal policy is simply to choose the action that maximizes it: $\pi_*(s) = \arg\max_a q_*(s, a)$.

---

## Connections

- **[[Bellman Equations]]:** Value functions are computed and updated using Bellman's recursive consistency.
    
