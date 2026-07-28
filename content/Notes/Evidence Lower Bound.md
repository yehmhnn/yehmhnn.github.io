---
title: Evidence Lower Bound
created: 2026-06-16 11:58
tags file:
aliases:
  - ELBO
---
## The Definition (What)

The Evidence Lower Bound (ELBO) is a mathematical proxy that turns the impossible task of calculating exact probabilities in complex probabilistic models into a manageable optimization problem by setting a guaranteed minimum score to maximize.

## Why It Is Important (Why)

In Bayesian machine learning and generative AI (such as Variational Autoencoders), calculating the true probability of observed data—known as the **marginal likelihood** or **evidence**—requires integrating across every possible hidden state, an operation that is computationally impossible (intractable) for high-dimensional data. ELBO solves this bottleneck by providing a computable lower limit for the true evidence; maximizing this lower bound naturally pushes our model's guesses closer to reality without ever needing to calculate the impossible integral.

## How It Works (How)

ELBO works by decomposing the total probability of an observation into a computable lower bound plus an error term, then breaking that lower bound into two competing objectives.

### Phase 1: The Intractable Intention

When observing data $x$, we want to maximize its log-probability $\log p(x)$ (the log-evidence). Because the true posterior distribution of hidden features $p(z \mid x)$ is impossible to calculate directly, we introduce a simpler, trainable approximation distribution $q_\phi(z \mid x)$.

The difference between our approximation and the true distribution is measured by the **[[Kullback-Leibler (KL) Divergence]]**:

$$\text{KL}\big(q_\phi(z \mid x) \parallel p(z \mid x)\big) \ge 0$$

- $q_\phi(z \mid x)$: Our approximate distribution (e.g., the encoder in a VAE).
    
- $p(z \mid x)$: The true, unknown distribution of hidden factors given the data.
    
- **Property:** KL divergence measures the "distance" between two distributions and is strictly non-negative (it equals $0$ only if the two distributions are identical).
    

### Phase 2: Splitting Log-Evidence into computable and uncomputable parts

Using Bayes' theorem to rewrite $p(z \mid x) = \frac{p(x, z)}{p(x)}$, we can rearrange the log-evidence $\log p(x)$ into two parts:

$$\log p(x) = \text{ELBO}(\phi) + \text{KL}\big(q_\phi(z \mid x) \parallel p(z \mid x)\big)$$

Because the KL divergence term is always $\ge 0$, the remaining $\text{ELBO}(\phi)$ term acts as a strict lower boundary:

$$\text{ELBO}(\phi) \le \log p(x)$$

- **The Core Mechanism:** Since calculating the exact KL divergence to $p(z \mid x)$ is impossible, we maximize $\text{ELBO}(\phi)$ instead. As $\text{ELBO}(\phi)$ increases, it forces $\log p(x)$ up while simultaneously shrinking the unknown KL error term.
    

### Phase 3: The Practical Two-Part Loss Function

When expanded into computable components, the ELBO translates into a trade-off between reconstruction accuracy and structural regularity:

$$\text{ELBO}(\phi) = \underbrace{\mathbb{E}_{q_\phi(z \mid x)}[\log p_\theta(x \mid z)]}_{\text{Reconstruction Quality}} - \underbrace{\text{KL}\big(q_\phi(z \mid x) \parallel p(z)\big)}_{\text{Prior Regularization}}$$

- $\mathbb{E}_{q_\phi(z \mid x)}[\log p_\theta(x \mid z)]$: Measures how well the model reconstructs input $x$ after compressing it into latent variable $z$.
    
- $\text{KL}\big(q_\phi(z \mid x) \parallel p(z)\big)$: Forces the approximate distribution $q_\phi(z \mid x)$ to remain close to a simple prior distribution $p(z)$ (typically a standard Gaussian $\mathcal{N}(0, I)$), preventing the model from memorizing individual inputs.
    

## Additional Insights

### Concrete Example: The Tent and Pole Analogy

Imagine trying to lift a heavy, rigid tent ceiling (representing the true **Log-Evidence** $\log p(x)$) from underneath, but you cannot reach it directly:

- **The ELBO** is a adjustable vertical pole resting on the floor that pushes upward against the ceiling.
    
- **Maximizing ELBO** is like extending the pole as high as it will go.
    
- As you extend the pole upward, the top of the pole gets closer to touching the tent ceiling, minimizing the remaining gap (the **KL Divergence**).
    

### Direct Comparison: Log-Evidence vs. ELBO

|**Feature**|**True Log-Evidence (logp(x))**|**Evidence Lower Bound (ELBO)**|
|---|---|---|
|**What it measures**|The exact marginal probability of observing data $x$.|A guaranteed lower floor estimate of $\log p(x)$.|
|**Calculability**|**Intractable:** Requires integrating over all possible latent states $\int p(x, z) dz$.|**Computable:** Calculated using mini-batches via the [[Reparameterization Trick]].|
|**Primary Goal**|The ideal objective we want to maximize.|The practical proxy objective we actually optimize in training.|

### A Major Limitation: The "Variational Gap" Loose Bound

- **The Loose Bound Problem:** ELBO is only as good as the expressiveness of your chosen distribution family $q_\phi(z \mid x)$. If $q_\phi$ is too simple (e.g., assumed to be a standard Gaussian), it will never be able to perfectly mirror a complex, multi-modal true distribution $p(z \mid x)$.
    
- **The Resulting Failure:** This leaves a persistent gap ($\text{KL} > 0$) that can never be closed. In practice, a loose ELBO bound causes generative models to produce **blurry outputs** or suffer from **posterior collapse**, where the model ignores the latent variables entirely and relies purely on local decoding shortcuts.