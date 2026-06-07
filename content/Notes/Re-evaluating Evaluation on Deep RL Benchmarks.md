---
title: "Re-evaluating Evaluation on Deep RL Benchmarks"
created: "2026-05-18 12:28"
tags file:
---
### The Goal of the Meta-Analysis

After developing their robust statistical framework, the authors wanted to prove that the evaluation crisis wasn't just limited to the tiny Atari 100k environment. They applied their new tools—**[[Stratified Bootstrap Confidence Intervals]], [[Performance Profiles]], and [[Interquartile Mean (IQM)]]**—to the three most heavily cited, computationally demanding benchmarks in modern Reinforcement Learning history. 

1. Arcade Learning Environment
2. DeepMind Control Suite
3. Procgen benchmark

Because these benchmarks cost thousands of dollars in compute to run, papers typically only evaluate **3 to 5 random runs** per task, creating a massive breeding ground for statistical noise and false SOTA claims.

---

### Benchmark 1: The Arcade Learning Environment (Atari 200M)

The Atari 200M frame benchmark is the gold standard for deep RL. The authors scrutinized high-profile algorithms including **DreamerV2, M-IQN, Munchausen DQN (M-DQN), IQN, and Rainbow**.


#### The Outlier Distortion Discovered:

Prior papers claimed that **DreamerV2** and **M-IQN** had achieved massive breakthroughs based on their astronomical **Sample Mean** scores. 

The re-evaluation exposed a major flaw: these algorithms were not globally superior; they were simply hyper-specialized. 

* On the game *James Bond*, both DreamerV2 and M-IQN achieved extreme, outlying normalized scores **above 50** (5000% of human capability).
* This single game's massive score mathematically dragged up the global sample mean for the entire algorithm, masking the fact that they performed identically to (or worse than) older baselines on the other 54 games.
* **The Correction:** When evaluated using the [[Optimality Gap]] (which caps outlier credit) and [[Interquartile Mean (IQM)]], the leaderboard stabilized, showing that the performance gaps between these top-tier algorithms were drastically narrower than originally advertised.

---

### Benchmark 2: DeepMind Control Suite (Continuous Control)

Unlike Atari's discrete button-pressing, the **DeepMind Control Suite** evaluates continuous physics control (e.g., teaching robots to walk, swim, or balance). The authors re-evaluated algorithms like **D4PG** and **DMPO**.

#### The Hidden Trade-offs Discovered:

Traditional reporting showed a flat tie in mean accuracy between the top continuous control networks. However, when the authors plotted their full **Performance Profiles (ECDFs)**, the curves intersected, revealing a hidden structural trade-off:

* One algorithm maintained a higher curve on the *left* side of the graph, meaning it was a highly **stable, low-risk deployment** that almost never completely failed.
* The competitor algorithm crossed over and sat higher on the *right* side, meaning it was an unstable "high-risk, high-reward" layout that achieved **extreme peak performance** on easy tasks but frequently crashed on complex ones.
* This proved that squashing continuous control results into a single leaderboard number hides vital operational safety dynamics.
---

### Benchmark 3: The Procgen Benchmark

OpenAI’s **Procgen** suite uses procedurally generated levels to specifically test an agent's ability to **generalize** rather than just memorize layouts. The authors audited flagship algorithms like **PPO** and **Phasic Policy Gradient (PPG)**.

#### The Overlap Discovered:

When looking at the original published tables, PPG appeared to cleanly beat PPO. However, when Agarwal et al. projected the **95% Stratified Bootstrap Confidence Intervals** onto the data:

* The uncertainty intervals for the sample medians of PPO and PPG completely overlapped.
* Mathematically, this meant that the community was celebrating PPG as a major architectural breakthrough for generalization, when in reality, its alleged improvement was statistically indistinguishable from random data noise. 
* **The Metrics Fix:** By switching the evaluation metric from the unstable Median to the robust **IQM**, the confidence intervals tightened significantly, allowing researchers to finally see which minor performance gaps were actually real.


