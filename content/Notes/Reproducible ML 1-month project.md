---
title: "Reproducible ML project"
created: "2026-05-24 12:57"
tags file:
---
# PROJECT PROPOSAL

**Title:** A Statistical Audit of Deep Reinforcement Learning Reproducibility

**Timeline:** 4 Weeks

### 1. Objective

Most Reinforcement Learning (RL) papers claim success based on simple average scores over just 3 to 5 runs. As shown by Agarwal et al. (2021), this is statistically unreliable due to high variance. This project will use modern statistical tools to audit recent RL algorithms and see if their claimed improvements are real or just noise.

### 2. Methodology & Data

To fit the 1-month deadline, I will skip the expensive step of training agents from scratch. Instead, I will analyze existing public data:

- **Data:** Raw training logs extracted from the **Open RL Benchmark** (Huang et al., 2024).
    
- **Tools:** The **`rliable`** Python library (Agarwal et al., 2021).
    
- **Metrics:** Interquartile Mean (IQM), Performance Profiles, and Stratified Bootstrapping to plot reliable 95% confidence intervals.
    

### 3. 4-Week Plan

- **Week 1:** Set up `rliable` and download baseline data from the Open RL Benchmark.
    
- **Week 2:** Format the data matrices and run the bootstrap statistics.
    
- **Week 3:** Generate performance profile plots and check for overlapping confidence intervals between algorithms.
    
- **Week 4:** Write the final technical report and clean up the GitHub repository.
    

### 4. Deliverables

- A reproducible GitHub repository with evaluation scripts.
    
- A concise report showing which recent RL advancements are statistically significant.
    

### Email Draft

> **Subject:** Short-Term Project Proposal: RL Reproducibility Audit
> 
> Dear Professor [Last Name],
> 
> For my upcoming one-month project, I would like to audit recent RL baselines by using pre-computed logs from the Open RL Benchmark and the `rliable` toolkit.
> 
> I am going to pull the performance logs of **PPO** and **SAC** that were trained by **CleanRL** and **Stable-Baselines3**, which are stored inside the **Open RL Benchmark**, and use statistics to see which one is truly better.
> 
> I have attached a brief proposal below and would love to hear your feedback on this direction.
> 
> Best regards,
> 
> [Your Name]


---

The answer is **yes, the _infrastructure_ creators have plotted the basic baselines.** If you just compare standard PPO vs standard SAC on standard games, that has been done.

However, the AI community is currently experiencing a massive shift regarding evaluation. NeurIPS added an official **Evaluations Track** specifically because the field has realized that _how_ we measure models is just as important as the architectures we build.

Because of this, there are major gaps in the existing literature where nobody has done the statistical audit yet. These gaps are your target.

### 🔍 Where the Gaps Are (What has _not_ been done)

#### 1. The "Cross-Library" Silent Discrepancy

The creators of OpenRL Benchmark proved that their _own_ code is reproducible. What they did **not** do is deep-dive into cross-library drift.

- **The Gap:** A paper says they used "PPO" as a baseline. But PPO in _Stable-Baselines3_ is coded differently than PPO in _CleanRL_ or _Tianshou_ (different default code-level optimizations, clipping behaviors, or orthogonal initializations).
    
- **Your Project:** Use OpenRL Benchmark data to run an audit comparing **Algorithm X across 3 different libraries**. Prove via performance profiles if "Stable-Baselines3 PPO" is statistically identical to "CleanRL PPO." You will likely find that they aren't, meaning hundreds of ML papers are comparing apples to oranges when they use different library baselines.
    

#### 2. The Algorithmic "Aged-Out" Audit

New RL algorithms are published every single month claiming to beat older ones.

- **The Gap:** Authors of a 2025 paper might claim their new algorithm beats a 2022 baseline based on 5 runs. But they rarely go back and check if the baseline would actually win if evaluated across the hundreds of aggregate runs available in the OpenRL Benchmark database.
    
- **Your Project:** Pick a specific claim from a paper published in the last year. Use the `rliable` stratified bootstrap on the massive baseline pool to prove whether that new paper's claims are statistically significant, or if the baseline actually outperforms it when accounting for variance.
    

#### 3. System Metrics vs. Performance Profiles

OpenRL Benchmark didn't just track rewards; they tracked **GPU memory, CPU usage, and power consumption**.

- **The Gap:** `rliable` was originally designed _only_ for performance scores (episodic returns). Almost no one has applied `rliable`’s performance profiling to **efficiency metrics**.
    
- **Your Project:** Instead of plotting "Score Profiles," plot **"Efficiency Profiles"** (e.g., probability of an algorithm staying under a certain GPU memory or carbon footprint threshold while achieving a target score). This bridges green AI with statistical rigor—something very few people have done.
    

### 📚 Related Works to Mention to Your Professor

If your professor asks for related literature beyond the 2021 paper, you can point to these recent developments:

- **Open RL Benchmark (Huang et al., 2024):** The paper that established the database you are using. It integrates `rliable` into its command-line interface but leaves deeper meta-analyses to the user.
    
- **Rollout Cards (2026):** A recent standard introduced to fix reproducibility in AI agent research, highlighting that researchers are still leaving raw rollout records behind and relying on shaky aggregate scores.
    
- **The NeurIPS Evaluations & Datasets Track:** You can explicitly note in your proposal that you are aligning your work with this framework, where evaluation itself is studied as a primary scientific object.
    

### The Scientific Angle

You are not inventing the calculator (`rliable`), nor are you digging up the raw materials (OpenRL Benchmark). You are acting as the **forensic data scientist** using these advanced tools to audit specific, unexamined claims in the literature. That is a completely standard, highly respected form of computer science research.

---

### 1. The Core Engines: PPO and SAC (Algorithms)

These are **Proximal Policy Optimization (PPO)** and **Soft Actor-Critic (SAC)**. They are not software programs; they are mathematical blueprints (algorithms) that tell an AI agent how to learn from trial and error.

- **PPO** is like a reliable, fuel-efficient sedan. It is stable, works well across many different tasks (like games or robotics), and is the default choice for most researchers.
    
- **SAC** is like a high-performance sports car. It is designed for continuous, smooth movements (like controlling robotic joints) and focuses on exploring as much of the environment as possible so it doesn't get stuck in a bad habit.
    

### 2. The Mechanics: Stable-Baselines3, CleanRL, and Tianshou (Libraries)

An algorithm is just math on paper. To actually use it, programmers have to write code. These three are **Python software libraries** that contain pre-written code for PPO, SAC, and other algorithms so you don't have to code them from scratch. However, they are built with completely different philosophies:

- **Stable-Baselines3 (SB3):** The industry standard. It is built to be user-friendly, clean, and highly structured. It hides a lot of the complex background code to give you a smooth experience.
    
- **CleanRL:** Built for researchers who want to see exactly what is happening under the hood. Instead of hiding code in complex structures, they write every algorithm in a single, massive Python file ("single-file implementations"). It is highly transparent.
    
- **Tianshou:** Built for speed and handling massive amounts of data at the same time (parallel computing) using a highly optimized tensor library.
    

### 3. The Test Track: Open RL Benchmark

This is where everything connects. Because PPO in _Stable-Baselines3_ might perform slightly differently than PPO in _CleanRL_ due to minor coding choices, the community needed a giant database to track everything fairly.

The **Open RL Benchmark** is that database. It is a massive, public repository where the creators took algorithms (like PPO and SAC) from different libraries (like CleanRL and Stable-Baselines3), ran them across thousands of different games and environments, and recorded the raw performance data.

```
 [ Math Blueprints ]        ──> PPO or SAC
                                  │
                                  ▼
 [ Written into Code ]     ──> Stable-Baselines3, CleanRL, or Tianshou
                                  │
                                  ▼
 [ Tested & Recorded ]     ──> Open RL Benchmark (The database you will use)
```

---

Give me a simple example of how a hidden code-level setting in Stable-Baselines3 vs CleanRL can make their PPO algorithms perform differently.

A famous discovery in modern reinforcement learning (RL) is that **the math in an RL paper is often less important than the "tricks" hidden in the code.** A paper by Engstrom et al. (2020) titled _"Implementation Matters in Deep Policy Gradients"_ famously proved that PPO's success is largely driven by these silent code-level optimizations.

The differences between **Stable-Baselines3 (SB3)** and **CleanRL** provide a perfect example of how an agent can succeed or fail based on a single line of hidden code.

### The Hidden Difference: **Learning Rate Schedules**

When an AI trains, it uses a hyperparameter called the **Learning Rate ($\alpha$)**, which dictates how big of a step the AI takes when updating its strategy.

- **The standard math definition:** 
	- In the original PPO paper, the learning rate is often set as a constant number (e.g., $0.0003$) across the entire training process.
    
- **The hidden code reality:** 
	- In practice, letting the AI take big steps at the beginning of training is great for exploration, but it needs to slow down at the end to fine-tune its strategy without ruining everything.
    

Because of this, libraries use **learning rate annealing**—smoothly decreasing the learning rate down to 0 as training progresses. This is where SB3 and CleanRL handle defaults differently:

#### 1. Stable-Baselines3 (Constant Default)

By default, if you initialize PPO in SB3, it sets a **constant learning rate** that stays exactly the same from step 1 to step 1,000,000.

Python

```
# Stable-Baselines3 Default Behavior
model = PPO("MlpPolicy", "CartPole-v1", learning_rate=3e-4) # Stays 3e-4 forever
```

#### 2. CleanRL (Decay Default)

By default, CleanRL automatically turns on a **linear decay schedule**. If you run their baseline `ppo.py` script, the learning rate starts at $0.0003$ and linearly drops to $0.0$ by the final training step.

Python

```
# CleanRL Default Behavior (Hidden inside the main loop)
progress = 1.0 - (current_step / total_steps)
optimizer.param_groups[0]["lr"] = progress * 3e-4 # Drops down to 0
```

### Why This Causes Different Performance

If you run SB3's default PPO and CleanRL's default PPO on a tough environment (like an Atari game or a complex robot simulator) using the exact same starting learning rate of $0.0003$, **their performance curves will look entirely different.**

```
Score
 ▲
 │         /─── CleanRL (Linear Decay: Fine-tunes beautifully at the end)
 │       /
 │     /  ┌─── Stable-Baselines3 (Constant: Randomly crashes or plateaus)
 │   /    │
 └───┴────┴────────────────────────► Training Steps
```

- **What happens to CleanRL:** The agent learns quickly early on. As it gets closer to the end of training, the learning rate shrinks. The agent stops making drastic strategy overhauls and focuses on making tiny adjustments. It safely locks in a high score.
    
- **What happens to SB3:** The agent learns quickly early on, but because the learning rate stays high forever, the agent continues taking massive risks even when it is already performing well. One bad sequence of events can cause the neural network to experience "catastrophic forgetting," completely ruining its policy and causing the performance score to plummet right at the end of training.
    

### Other Hidden Details

This is just one of about **37 distinct code-level choices** tracked by researchers (Huang et al., 2022). Other hidden defaults include:

- **Orthogonal Initialization:** CleanRL initializes weights using specific geometric math (`orthogonal_init`), whereas other libraries might use standard Gaussian distributions. This changes how well gradients flow through the network on step one.
    
- **Adam Optimizer Epsilon:** PyTorch defaults the safety variable $\epsilon$ in the Adam optimizer to $10^{-8}$ to avoid dividing by zero. CleanRL manually overrides this to $10^{-5}$ because that is what OpenAI used in their closed-source codebase, heavily affecting training stability in complex environments.
    

### Why This Fits Your Audit Project

This discrepancy is exactly why your project is so valuable. If a researcher writes a paper saying, _"Our new algorithm beats PPO,"_ but they used SB3's default constant learning rate for PPO, they hobbled the baseline. By pulling data from the Open RL Benchmark, you can expose these hidden biases and see which setups are actually robust.
