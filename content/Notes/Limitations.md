---
title: "Limitations"
created: "2026-05-18 22:21"
tags file:
---
### 1. The Safety Blind Spot: Discarding the Tail is Dangerous

- **The Critique:** The paper's most famous tool, the **Interquartile Mean (IQM)**, works by cutting off the bottom 25% and top 25% of scores. In **Safe Reinforcement Learning** (e.g., autonomous driving, medical robotics, or aerospace), cutting off the bottom 25% is an engineering sin. That bottom 25% contains the catastrophic crashes, system over-heating, and safety violations.
    
- **The Counter-Argument:** Critics argue that IQM makes an unstable, high-risk algorithm look "safe and consistent" on paper by literally throwing away its worst failures.
    
- **Alternative Literature:** Papers focusing on _Risk-Aware and Safe RL_ argue that instead of IQM, researchers must use metrics like **Conditional Value at Risk (CVaR)** or **Lower Confidence Bounds (LCB)**. These metrics explicitly zoom in on the _worst-case scenarios_ to ensure a model won't destroy hardware in the real world.
    

### 2. The Normalization Dependency Flaw

- **The Critique:** To plot a Performance Profile or calculate an Optimality Gap, all scores must be normalized against a standard baseline (usually $0.0 = \text{Random Agent}$ and $1.0 = \text{Human Expert}$).
    
- **The Counter-Argument:** This makes the entire evaluation framework completely dependent on how good the "human baseline" is. If the human tester was bad at a specific game, the baseline is artificially low, which heavily warps the shape of the Performance Profile and shifts the Optimality Gap. For new, custom engineering tasks (like your work in mechanical vibration), a true "human baseline score" doesn't even exist, making it incredibly awkward to implement their normalization math.
    

### 3. "Algorithm Robustness" vs. "Policy Reproducibility"

- **The Critique:** Agarwal et al. focus almost entirely on **variance across training runs** (i.e., _"If I train this model 5 times with 5 seeds, do I get the same average performance?"_).
    
- **The Counter-Argument:** Subsequent papers, like _“Beyond Expected Return: Accounting for Policy Reproducibility”_, note that this ignores **deployment/rollout variance**. An algorithm might look rock-solid and stable across training seeds via IQM, but when you take that single final trained policy and deploy it to a noisy environment, its performance might oscillate wildly from minute to minute. The paper fixes how we evaluate _training luck_, but it doesn't measure _operational deployment risk_.
    

### 4. It Bands-Aids Benchmarking Without Fixing the Cost

- **The Critique:** Papers like _“Limitations of and Alternatives to Benchmarking in Reinforcement Learning Research”_ argue that `rliable` is a brilliant band-aid, but it doesn't solve the structural problem of deep learning.
    
- **The Counter-Argument:** Even with the Percentile Bootstrap, if a researcher can only afford $N=3$ runs due to compute costs, the 95% Confidence Intervals are still so massive that they are practically useless for showing minor architectural improvements. Critics argue the field should stop obsessing over global leaderboard profiles entirely and focus more on localized **Ablation Studies** (turning off one component to see exactly what it does) to understand _why_ a model works, rather than just using complex statistics to prove a noisy win.
