---
title: Mathematical Framework
created:
  - 2026-05-15 07:52
tags file: "[[2021 Deep Reinforcement Learning at the Edge of the Statistical Precipice]]"
---
### 1. The Setup: Tasks ($M$) and Runs ($N$)

- **$M$ (Tasks):** These are the different "environments" or games (e.g., Pong, Breakout, Seaquest).
    
- **$N$ (Runs):** Because RL is random, you can't just play Pong once. You play it $N$ times (usually 3 to 5 times) to see how the scores vary.
    
- **$x_{m,n}$ (The Score):** This is the specific score for **Task $m$** on **Run $n$**.
    
    - Example: $x_{Pong, 3}$ is the score the model got the 3rd time it played Pong.
        

### 2. Normalization: Making Apples into Oranges

You can't compare a score of 500 in _Space Invaders_ to a score of 20 in _Pong_. To fix this, they **normalize** the scores:

- **0:** What a random "button-masher" agent gets.
    
- **1:** What an average human gets.
    
- Anything above **1** means the AI is "Superhuman." This makes the scores comparable across all $M$ tasks.
    

### 3. The Random Variable ($X_m$)

The authors are being scientifically honest here. They say that because of **GPU noise, seeds, and software randomness**, the score isn't a fixed number. It's a **Random Variable**.

- If you run the experiment again, you will get a different $x_{m,n}$.
    
- The math assumes there is an underlying "true" probability distribution ($X_m$) for how your model performs on that task.
    

---

### 4. The Tail Distribution ($F_m(\tau)$) — The "Success Rate"

This is the part that usually trips people up. **$\tau$ (Tau)** is just a threshold (a target score).

- **$F_m(\tau) = P(X_m > \tau)$**: This asks: "What is the probability that my model will score higher than $\tau$ on this task?"
    
- If $\tau = 1.0$, $F_m(1.0)$ is the probability that your AI beats a human.
    

### 5. The Empirical Tail Distribution ($\hat{F}$)

Since we don't know the "true" probability (we only have our $N$ runs), we use the **Empirical** version.

$$\hat{F}(\tau; y_{1:K}) = \frac{1}{K} \sum_{k=1}^{K} \mathbb{1}[y_k > \tau]$$

**In plain English:**

1. Look at all your scores ($y_{1:K}$).
    
2. Count how many of them are higher than your target $\tau$.
    
3. Divide by the total number of scores ($K$).
    
4. **Result:** The percentage of your runs that "passed the test."
    

---

### Why is this in the paper?

The authors are setting this up so they can create **Performance Profiles**. Instead of saying "Our average score is 1.2," they want to show a graph that says:

> "Our model beats a human ($\tau=1.0$) in **80%** of runs, but it beats a pro-gamer ($\tau=5.0$) in only **5%** of runs."

This gives a much more complete picture of **reliability** than a single average number.

---

### 6. Aggregate Metrics: The "One Number" Problem

When we test an AI, we end up with a huge spreadsheet of $M$ tasks and $N$ runs. To tell a story, we usually squash that data into a single number:

- **Sample Mean over Task Means:** First, calculate the average for each task ($\bar{x}_m$). Then, take the average of those averages.
    
- **Sample Median over Task Means:** Calculate the average for each task, then find the "middle" value among all tasks.
    

> **The Point Estimate:** These single numbers are just "guesses" (point estimates) based on a tiny window of data.

---

### 7. Sample vs. True Scores

The authors draw a sharp line between your results in the lab and the "Absolute Truth."

- **Sample Score (Finite $N$):** What you got when you ran the code 5 times. It's heavily influenced by whether you were "lucky" or "unlucky" with your seeds and GPU noise.
    
- **True Score ($N \to \infty$):** The score the algorithm _would_ get if you had infinite time and electricity. This is represented by the Expected Value, $E[X_{1:M}]$.
    

---

### 8. Confidence Intervals (CIs): The "Plausibility" Zone

Since we can't run the model infinite times, we use **Confidence Intervals** to show how much we actually trust our result.

- **The Definition:** A 95% CI is an interval that is "likely" to contain the true score.
    
- **The Frequentist Logic:** If you ran your entire experiment 100 times (each time with a new set of 5 runs) and drew a 95% CI for each, **95 out of those 100 intervals** would successfully trap the "True Score" inside them.
    

$$ \text{CI} = [\text{Lower Bound}, \text{Upper Bound}] $$

---

### 9. The "5% Chance" Rule

This is the most important part for research integrity:

- If your "True Score" (the baseline you are trying to beat) falls **outside** your 95% CI, there are only two possibilities:
    
	- **Genuine Progress:** Your new algorithm is actually better.
	    
	- **Sampling Event:** You got extremely lucky (a 5% chance event happened).


---
# Reference
[[2021 Deep Reinforcement Learning at the Edge of the Statistical Precipice]]
