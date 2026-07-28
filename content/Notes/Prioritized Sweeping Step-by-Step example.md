---
title: Prioritized Sweeping Step-by-Step example
created: 2026-07-13 12:55
tags file:
  - "[[Reinforcement Learning]]"
---
#### The Setup

Consider a deterministic discrete state space containing four states ($A$, $B$, $C$, and a terminal goal state $G$). The environment's transition dynamics and rewards are defined entirely by the following model table :

|**(s,a)**|**f(s,a)**|**r(s,a)**|
|---|---|---|
|$(A, \alpha_1)$|$B$|$0$|
|$(A, \alpha_2)$|$C$|$0$|
|$(B, b)$|$G$|$1$|
|$(C, c)$|$G$|$0.4$|

The global parameters are configured as follows:

- **Discount Factor ($\gamma$):** $0.9$
- **Learning Rate ($\alpha$):** $1$
- **Queue Inclusion Threshold ($\theta$):** $0$
- **Tabular Memory Initialization:** $Q \equiv 0$ (every single value starts at zero).
- **Terminal State Condition:** $G$ is a terminal state, meaning $\max_{a'} Q(G,a') = 0$.
    
#### Initial Priority Computation

Before running any planning cycles, the system computes the initial Bellman residuals ($\delta$) and absolute priority values ($P$) across all known transitions in memory :

- $\delta(A, \alpha_1) = 0 + 0.9 \cdot \max_{a'} Q(B, a') - Q(A, \alpha_1) = 0 + 0 - 0 = 0 \implies P(A, \alpha_1) = 0$
    
- $\delta(A, \alpha_2) = 0 + 0.9 \cdot \max_{a'} Q(C, a') - Q(A, \alpha_2) = 0 + 0 - 0 = 0 \implies P(A, \alpha_2) = 0$
    
- $\delta(B, b) = 1 + 0.9 \cdot 0 - 0 = 1.0 \implies P(B, b) = 1.0$
    
- $\delta(C, c) = 0.4 + 0.9 \cdot 0 - 0 = 0.4 \implies P(C, c) = 0.4$
    

**Initial Queue:** $\mathcal{Q} = \{ (B,b): 1.0, \, (C,c): 0.4 \}$

#### Step-by-Step Backups and Priority Updates

**Backup 1:**

- Pop highest priority pair: $(B,b)$ with priority $1.0$.
    
- Update: $Q(B,b) \leftarrow Q(B,b) + 1 \cdot \delta(B,b) = 0 + 1.0 = 1.0$.
    
- **Predecessor Updates:** $\text{Pred}(B) = \{(A, \alpha_1)\}$.
    
    Recompute residual: $\delta(A, \alpha_1) = 0 + 0.9 \cdot \max\{Q(B,b)\} - Q(A, \alpha_1) = 0 + 0.9(1.0) - 0 = 0.9$.
    
    Priority $P(A, \alpha_1) = 0.9$. Since $0.9 > \theta$, insert $(A, \alpha_1)$ into the queue.
    
- **Queue Status:** $\mathcal{Q} = \{ (A, \alpha_1): 0.9, \, (C,c): 0.4 \}$
    

**Backup 2:**

- Pop highest priority pair: $(A, \alpha_1)$ with priority $0.9$.
    
- Update: $Q(A, \alpha_1) \leftarrow Q(A, \alpha_1) + 1 \cdot \delta(A, \alpha_1) = 0 + 0.9 = 0.9$.
    
- **Predecessor Updates:**
	- $\text{Pred}(A) = \emptyset$ (no recorded actions in the environment lead into state $A$). No predecessors are affected.
    
- **Queue Status:** $\mathcal{Q} = \{ (C,c): 0.4 \}$
    

**Backup 3:**

- Pop highest priority pair: $(C,c)$ with priority $0.4$.
    
- Update: $Q(C,c) \leftarrow Q(C,c) + 1 \cdot \delta(C,c) = 0 + 0.4 = 0.4$.
    
- **Predecessor Updates:** $\text{Pred}(C) = \{(A, \alpha_2)\}$.
    
    Recompute residual: $\delta(A, \alpha_2) = 0 + 0.9 \cdot \max\{Q(C,c)\} - Q(A, \alpha_2) = 0 + 0.9(0.4) - 0 = 0.36$.
    
    Priority $P(A, \alpha_2) = 0.36$. Since $0.36 > \theta$, insert $(A, \alpha_2)$ into the queue.
    
- **Queue Status:** $\mathcal{Q} = \{ (A, \alpha_2): 0.36 \}$