---
title: "Stratified Bootstrap Confidence Intervals"
created: "2026-05-17 19:14"
tags file:
---
### 1. The Core Problem: Why Standard Bootstrapping Fails Here

In deep learning evaluation across multiple domains, we often evaluate a model across $M$ distinct tasks (e.g., 26 Atari games, different translation languages, or distinct mechanical fault environments), running each task over $N$ random seeds. This yields an $M \times N$ matrix of scores.

If we want to calculate a 95% Confidence Interval (CI) to show the uncertainty of our global performance summary, a **Standard Bootstrap** would pool all $M \times N$ scores into a single giant bucket, randomly draw from that bucket with replacement, and calculate the metric.

**The Flaw:** Standard pooling assumes all data points are independent and identically distributed (i.e., drawn from the same distribution). In multi-task benchmarking, this is fundamentally false. Performance variance on an easy task is completely different from variance on a highly chaotic, difficult task. Pooling them blindly obliterates the structural boundaries of your experiment, allowing a single high-variance task to falsely widen or narrow your entire uncertainty profile.

---

### 2. The Solution: Stratified Bootstrapping

**Stratified Bootstrapping** treats each task as an independent, unchangeable slice (stratum) of the data pool. Instead of mixing the data, it restricts the random lottery to happen _within_ the boundaries of each individual task.

#### The Algorithmic Workflow:

Imagine you have an evaluation matrix of $M$ tasks and $N$ runs:

1. **Isolate the Task:** Go to Task 1. It contains $N$ real-world scores achieved from your random seeds.
    
2. **Resample Within the Stratum:** Randomly draw $N$ scores from those specific Task 1 scores **with replacement**. This forms your resampled row for Task 1.
    
3. **Repeat for All Tasks:** Move to Task 2, and randomly draw $N$ scores with replacement from Task 2's specific pool. Do this sequentially until you have built a brand-new, simulated $M \times N$ matrix.
    
4. **Aggregate:** Compute your global summary metric (such as Mean, Median, or Interquartile Mean) across this newly simulated matrix.
    
5. **The Monte Carlo Loop:** Repeat this entire pipeline 10,000 or 100,000 times.
    

Sorting these 100,000 simulated aggregate scores from lowest to highest allows you to chop off the outer 2.5% tails on both sides. The remaining middle segment forms your mathematically rigorous **95% Stratified Bootstrap Confidence Interval**.

---

### 3. The Mathematical Edge: Percentile Bootstrap vs. Alternatives

To justify their final recommendation, the authors ran a meta-evaluation on [[different bootstrap methods]] to see how they handled the high-variance, low-sample regime of Deep RL.

[[Figure 6 - Validating 95% Stratified Bootstrap CIs]]

The paper advocates for using the **Percentile Bootstrap** method within this stratified framework over standard asymptotic intervals (like those derived using Student's t-distribution).

- **No Distribution Assumptions:** 
	- T-tests and standard error intervals assume that your training scores follow a clean, symmetric Gaussian (normal) distribution. Deep learning scores, especially in unstable architectures or high-frequency time-series contexts, are heavily skewed, multimodal, or plagued by catastrophic failures (cliffs near zero).
    
- **True Shape Preservation:** 
	- The Percentile Bootstrap naturally adapts to the true shape of your training data's noise. If an algorithm has a hard ceiling but a long tail of random failures, the resulting confidence interval will be asymmetric, accurately reflecting that downside risk to anyone reading your evaluation.



---

### 4. Stress-Testing Sensitivity: The Lift Experiment ($\ell\%$)

To prove that Stratified Bootstrap CIs actually work reliably when sample sizes are small ($N \le 10$), the authors designed **Lift Experiments**.

By taking a real baseline score distribution ($\text{Score}_Y$) and artificially multiplying it by a fixed scaling factor ($(1 + \frac{\ell}{100})$), they created a synthetic champion model ($\text{Score}_X$) where the true algorithmic improvement was unshakeably locked to exactly $\ell\%$.

Using Stratified Bootstrap CIs over these groups revealed critical boundaries for scientific reporting:

- **The Overlap Danger:** If the shaded 95% CI bounds of a baseline and a new model overlap on a performance profile graph, you cannot claim scientific progress. The apparent improvement is statistically indistinguishable from a lucky sequence of random seeds.
    
- **Metric Efficiency:** The experiment proved that the choice of summary metric radically alters how many runs you need to spend to clear this overlap. The **Interquartile Mean (IQM)** compresses the bootstrap interval widths significantly faster than the Median, meaning you can achieve statistically definitive, non-overlapping project validations with far fewer total training runs.
    

---

### 5. Conceptual Implementation (Python Mockup)

This is the mathematical logic automated inside the paper's open-source `rliable` library. It demonstrates how to execute a single bootstrap iteration:

Python

```
import numpy as np

def get_single_stratified_bootstrap_matrix(score_matrix):
    """
    Input: score_matrix of shape (M_tasks, N_runs)
    Output: A resampled matrix of shape (M_tasks, N_runs)
    """
    M, N = score_matrix.shape
    bootstrap_matrix = np.empty((M, N))
    
    for m in range(M):
        # Sample N times with replacement strictly from row m
        bootstrap_matrix[m] = np.random.choice(score_matrix[m], size=N, replace=True)
        
    return bootstrap_matrix

# Example Evaluation:
# If you run this loop 100,000 times, calculating the IQM of each matrix,
# the 2.5th and 97.5th percentiles of those results form your 95% CI.
```
