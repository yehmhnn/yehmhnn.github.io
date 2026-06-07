---
title: "different bootstrap methods"
create: "2026-05-17 20:17"
tags file:
---
- **`percentile` (Percentile Bootstrap):** 
	- The simplest method. It sorts your 100,000 simulated scores from lowest to highest and grabs the literal 2.5th and 97.5th percentiles as the boundary. It makes no assumptions about the shape of the data.
    
- **`bc` (Bias-Corrected):** 
	- Adjusts the percentile cutoffs if the bootstrap distribution's median shifts away from your original sample estimate (correcting for **median bias**). Instead of taking the 2.5th and 97.5th percentiles, it might dynamically shift to the 3.1st and 98.1st percentiles to compensate.
    
- **`bca` (Bias-Corrected and Accelerated):** 
	- The most advanced variation. It adjusts for both median bias _and_ **skewness (acceleration)**. It accounts for the fact that the standard error of your model might change depending on how high or low the score is. It uses a "jackknife" resampling technique under the hood to calculate this skewness.

- **`basic` (Basic/Empirical Bootstrap):** 
	- Uses the mathematical difference between your initial sample estimate and the bootstrap percentiles to project an interval, effectively mirroring the distribution.

---

### What is the "Basic (Empirical) Bootstrap"?

Don't let the word "Basic" fool you—it is actually more mathematically counterintuitive than the **Percentile Bootstrap** we talked about earlier. It is also known as the _Empirical Bootstrap_.

To understand it, let's contrast it directly with the Percentile method using a simple analogy.

Imagine your original laboratory experiment got a score of **80**. You run 100,000 bootstrap simulations to see how much that score fluctuates due to seed noise.

#### The Percentile Bootstrap (The Simple Way)

You sort all 100,000 bootstrap scores from lowest to highest. You look down at the $2.5^{\text{th}}$ percentile mark and see a score of **70**. You look at the $97.5^{\text{th}}$ percentile mark and see a score of **95**.

- **Your Interval:** $[70, 95]$
    
- **The Logic:** "My simulation literally landed between 70 and 95 most of the time, so that's my interval."
    

#### The Basic/Empirical Bootstrap (The "Mistake-Distance" Way)

The Basic Bootstrap doesn't look at the raw scores of the simulation. Instead, it looks at the **distance** between the simulation runs and your original score of 80 to calculate the _empirical error_ ($\delta^*$).

1. **Calculate the Distances:** * A simulation run hits 95? That is a distance of $+15$ from your original score.
    
    - A simulation run hits 70? That is a distance of $-10$ from your original score.
        
2. **Flip the Errors:** It takes the distribution of those distances, flips them mathematically to account for bias, and projects them as a safety window _around your original laboratory score_.
    

The formal mathematical formula for the Basic Bootstrap bounds is:

$$\text{CI} = [2\hat{\theta} - \theta^*_{(97.5\%)}, \; 2\hat{\theta} - \theta^*_{(2.5\%)}]$$

_(Where $\hat{\theta}$ is your original lab score, and $\theta^*$ represents the bootstrap percentile scores).

- **Your Interval:** $[2(80) - 95, \; 2(80) - 70] = [160 - 95, \; 160 - 70] = \mathbf{[65, 90]}$
    
- **The Logic:** "If my simulation runs had a habit of wandering up to 15 points higher than my lab score due to luck, then my true algorithmic performance might actually be 15 points _lower_ than what I saw in the lab."
    

#### Summary of the Difference

- **Percentile Bootstrap:** Looks at the raw values of the simulation. (If the simulation reads 70 to 95, the interval is 70 to 95).
    
- **Basic Bootstrap:** Looks at the _errors_ of the simulation and projects them backward onto the original score. (If the simulation can wander 15 points high, it shifts the interval lower to compensate).
    

As shown in your appendix chart, when dealing with the **Median** at tiny sample sizes ($N = 3$), this complex mathematical flipping in the Basic Bootstrap actually breaks down, resulting in bad coverage. The simple **Percentile Bootstrap** handles the chaotic nature of low-sample deep learning data much better.