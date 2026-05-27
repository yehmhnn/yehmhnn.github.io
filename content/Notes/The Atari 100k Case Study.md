---
title: Re-evaluating the Past
create: 2026-05-16 14:25
tags file:
  - "[[2021 Deep Reinforcement Learning at the Edge of the Statistical Precipice]]"
---
This note documents how Agarwal et al. (2021) conducted their historical audit of the **Atari 100k benchmark**, exposing how point-estimate reporting, mathematical biases, and evaluation "protocol creep" led the machine learning community to completely incorrect conclusions about algorithmic superiority.

---

### 1. What Exactly was the "Atari 100k" Benchmark?

In traditional Deep Reinforcement Learning (RL), agents are allowed to interact with an environment for 50 million to 200 million frames (equivalent to weeks of continuous play) to achieve high scores.

The **Atari 100k benchmark** was introduced to test **sample efficiency**. It restricts the agent to only **100,000 steps** of environment interaction—roughly equal to just 2 to 3 hours of real human gameplay experience. It contains a suite of 26 different games (tasks) used to evaluate how fast an AI can learn a complex strategy.

---

### 2. What Exactly was the Paper Re-evaluating?

The paper was re-evaluating the **SOTA (State-of-the-Art) claims** made by five highly prominent, sample-efficient RL algorithms published between 2019 and 2021:

1. **CURL** (Contrastive Unsupervised RL)
    
2. **DER** (Data-Efficient Rainbow)
    
3. **DrQ** (Data Regularized Q-learning)
    
4. **OTR** (Optimistic Tiger... an optimistic variation of model-based/model-free RL)
    
5. **SPR** (Self-Predictive Representations)
    

Specifically, it re-evaluated the **validity of the rank-ordering** of these algorithms on the global leaderboard. The community believed that the higher the published point estimate, the better the algorithm design.

---

### 3. How the Paper Conducted the Re-evaluation (The Step-by-Step Workflow)

To audit the historical claims, the authors didn't just re-read the papers; they reconstructed the full statistical landscape under the hood.

#### Step 1: Expanding the Run Pool

Originally, the published papers ran their models only a handful of times due to compute limitations ($N=5$ for DER/OTR, $N=10$ for SPR, $N=20$ for CURL).

- **The Correction:** Agarwal et al. collected or re-ran the source code to get a massive pool of **100 independent runs per game, per algorithm**. This created a robust, statistically sound ground truth dataset.
    

#### Step 2: Running the 100,000x Bootstrap Simulation

To show how much "luck" was involved in the original papers, they performed a massive resampling simulation:

- They repeatedly sampled a smaller subset of runs (e.g., picking 5 random runs out of the 100 available) with replacement.
    
- They repeated this sampling loop **100,000 times**.
    
- For each of the 100,000 simulated universes, they calculated the median score across the tasks. This allowed them to construct the smooth probability distributions (the bell curves) seen in Figure 2.
    

#### Step 3: Stress-Testing the "Folk Wisdom" of Sample Sizes

They ran an artificial [[Lift Experiment]] on SPR, taking two identical setups and inflating one's score by a fixed percentage ($\ell\%$). This allowed them to calculate how many runs are actually required to prove an algorithm is genuinely better.
    
##### The Setup

1. They took the true 100-run data pool of the **SPR** algorithm.
    
2. They created two identical groups from this pool. Group 1 was left alone (the baseline).
    
3. They multiplied every score in Group 2 by $(1 + \frac{\ell}{100})$, where $\ell$ is the "lift" percentage (e.g., $\ell = 5\%, 10\%, 25\%$).
    
4. When $\ell = 0\%$, it means they are comparing the exact same algorithm against itself using different random seeds.

##### The Simulation Loop

To see how often a researcher would make a false claim in the lab, they simulated thousands of low-sample studies:

- They extracted a small number of runs ($N$) from both groups.
    
- They checked if the 95% Confidence Intervals of the two groups overlapped. If they overlapped, the experiment was a **failure** (inconclusive). If they did not overlap, it was a **success** (statistically defensible improvement).

detail: [[Figure 4 - Detecting score lifts]]
#### Step 4: Cross-Protocol Evaluation

The authors re-evaluated historical baselines using the exact alternative evaluation protocols introduced by newer algorithms to see if the metric architectures themselves were distorting the leaderboard.

##### How RL Evaluation Works Under the Hood

During a standard 100k-step training run, an RL agent cannot be evaluated continuously. Instead, training is paused at fixed intervals (e.g., every 10,000 steps) to run "evaluation episodes" where the agent plays without learning, and its score is recorded. If you evaluate 10 times during training, you get 10 sequential checkpoint scores.

The authors contrasted two fundamentally incompatible protocols for reporting that final project score:

##### Protocol A: End-Performance (The Legacy Standard)

- **The Rule:** You look strictly at the final checkpoint (or average the last few episodes at the very end of training).
    
- **The Logic:** This measures what the agent actually _learned_ by the end of its training budget. This was the protocol used by the older baseline, **DER**.

##### Protocol B: Maximum-Performance (The Creep Protocol)

- **The Rule:** You look at all 10 evaluation checkpoints across the entire timeline and report the **absolute highest peak score** the model ever reached, even if it happened halfway through training.
    
- **The Logic:** This measures the absolute limit of what the model _can_ do, completely ignoring whether the model is stable or if it immediately crashed and degraded afterward. This was the protocol introduced by newer algorithms like **CURL** and **SUNRISE**.

##### The Unfair Comparison Exposed by Re-evaluation

When CURL and SUNRISE published their leaderboards, they placed their **Protocol B (Max)** scores directly next to DER's published **Protocol A (End)** scores.

Agarwal et al. went back to the original source data and corrected this discrepancy. They took the historical **DER** training logs and re-evaluated them using the **Max-Performance (Protocol B)** standard.

---

### 4. The Deep Revelations of the Case Study

#### Revelation A: The Deceptive Rank Inversion (DER vs. OTR)

The most shocking finding of the re-evaluation was that **the published leaderboard ranking was completely backward.** Based on published point estimates (dashed lines), OTR ($0.21$) beat DER ($0.16$). But looking at the true shaded distributions, DER's bell curve sits significantly farther to the right than OTR's. **DER is fundamentally the better algorithm**, but it lost the leaderboard race because it got an unlucky draw in its original paper, while OTR won because it published a lucky outlier.

#### Revelation B: Code Tuning Over Algorithmic Innovation

By taking the standard $\text{DrQ}$ architecture and tweaking exactly _one_ hidden parameter—the $\epsilon$ (epsilon) term in the Adam optimizer (shifting it from $10^{-8}$ to $10^{-3}$)—performance jumped from a $0.22$ median to a $0.28$ median. This version, $\text{DrQ}(\epsilon)$, proved that minor, unreported optimizer tuning can yield a larger performance leap than entirely "novel" structural architectures.

#### Revelation C: The Mathematical Trap of Sample Median Bias

While the community transitioned to using medians to avoid outlier distortions, the sample median is actually a **biased estimator** of the true median in low-sample regimes:

$$E[\text{Median}(\bar{X}_{1:M})] \neq \text{Median}(E[X_{1:M}])$$

At $N = 5$, this pure mathematical bias is massive, accounting for **36%** of SPR's apparent improvement over $\text{DrQ}(\epsilon)$. Furthermore, "folk wisdom" dictating that 20–30 runs are enough for statistical safety is false; the lift experiments proved that achieving stable, defensible median metrics requires **50 to 100 independent runs** per game.

#### Revelation D: Protocol Creep and Moving Goalposts

To claim superiority, newer algorithms quietly shifted how scores were captured. Traditional baselines used **End-Performance** (averaging the scores of the final training episodes). Newer algorithms like CURL and SUNRISE used **Maximum-Performance** (reporting the absolute peak evaluation score achieved at any point during training).

When the authors corrected this by evaluating the older baseline (DER) using CURL's maximum-performance protocol, **DER's scores shot up far above CURL's reported performance**, proving that CURL's apparent superiority was entirely an artifact of a modified evaluation rule.
