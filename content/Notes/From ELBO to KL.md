---
title: From ELBO to KL
created: 2026-07-28 18:10
tags file:
  - "[[Scalable & Robust ML]]"
---
The short answer to "who comes first?" is **ELBO comes first**, and **KL divergence appears inside it** (or is used to derive it).

To see how they connect, we start with the fundamental goal of Bayesian inference: we have some observed data $x$ and hidden/latent variables $z$, and we want to find the true posterior distribution $p(z\vert{}x)$.

Because $p(z\vert{}x)$ is usually impossible to compute directly (intractable), we approximate it with a simpler distribution, $q(z)$.

Here is the step-by-step derivation showing how the **Evidence Lower Bound (ELBO)** and **Kullback-Leibler (KL) Divergence** come together.

## 1. The Starting Point: Marginal Likelihood (Evidence)

We want to maximize the log-evidence of our data, $\log p(x)$. Since $z$ is a latent variable, we marginalize over $z$:

$$\log p(x) = \log \int p(x, z) \, dz$$

To introduce our approximating distribution $q(z)$, we multiply and divide the inside by $q(z)$:

$$\log p(x) = \log \int q(z) \frac{p(x, z)}{q(z)} \, dz$$

## 2. Deriving the ELBO via Jensen's Inequality

Since the log function is **concave**, we can apply **Jensen's Inequality** ($\log \mathbb{E}[Y] \ge \mathbb{E}[\log Y]$) to move the log inside the integral (expectation):

$$\log p(x) \ge \int q(z) \log \frac{p(x, z)}{q(z)} \, dz$$

This lower bound on the log-evidence is defined as the **ELBO**:

$$\text{ELBO}(q) = \mathbb{E}_{q(z)} \left[ \log \frac{p(x, z)}{q(z)} \right]$$

## 3. Revealing the KL Divergence

To see where KL divergence explicitly enters the picture, we can rewrite the true posterior relationship using Bayes' rule: $p(x, z) = p(z\vert{}x) p(x)$.

Substitute this back into the log term of the ELBO:

$$\text{ELBO}(q) = \mathbb{E}_{q(z)} \left[ \log \frac{p(z\vert{}x) p(x)}{q(z)} \right]$$

Split the logarithm into separate terms:

$$\text{ELBO}(q) = \mathbb{E}_{q(z)} \left[ \log p(x) \right] + \mathbb{E}_{q(z)} \left[ \log \frac{p(z\vert{}x)}{q(z)} \right]$$

Since $\log p(x)$ does not depend on $z$, its expectation under $q(z)$ is just $\log p(x)$. Rearranging the fraction inside the second log gives:

$$\text{ELBO}(q) = \log p(x) - \mathbb{E}_{q(z)} \left[ \log \frac{q(z)}{p(z\vert{}x)} \right]$$

By definition, the Kullback-Leibler divergence $D_{\text{KL}}(q(z) \parallel p(z\vert{}x))$ is $\mathbb{E}_{q(z)} \left[ \log \frac{q(z)}{p(z\vert{}x)} \right]$. Therefore:

$$\text{ELBO}(q) = \log p(x) - D_{\text{KL}}(q(z) \parallel p(z\vert{}x))$$

## 4. Bringing It All Together

Rearranging the equation yields the complete relationship:

$$\underbrace{\log p(x)}_{\text{Evidence}} = \underbrace{\text{ELBO}(q)}_{\text{Evidence Lower Bound}} + \underbrace{D_{\text{KL}}(q(z) \parallel p(z\vert{}x))}_{\text{KL Divergence to True Posterior}}$$

### Key Takeaways:

- **Why it's called a "lower bound":** Since $D_{\text{KL}} \ge 0$ always, it follows that $\text{ELBO}(q) \le \log p(x)$.
    
- **The Optimization Trick:** We cannot directly compute $D_{\text{KL}}(q(z) \parallel p(z\vert{}x))$ because $p(z\vert{}x)$ is unknown. However, since $\log p(x)$ is fixed with respect to $q$, **maximizing the ELBO automatically minimizes the KL divergence** between your approximation $q(z)$ and the true posterior $p(z\vert{}x)$.