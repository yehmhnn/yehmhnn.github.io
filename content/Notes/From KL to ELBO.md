---
title: "From KL to ELBO"
created: "2026-07-28 18:10"
tags file:
---
### Step 1: Write the definition of KL Divergence

By definition, the KL divergence between your guess $q_\phi(z \mid x)$ and the true posterior $p(z \mid x)$ is:

$$D_{KL}\big(q_\phi(z \mid x) \parallel p(z \mid x)\big) = \int q_\phi(z \mid x) \log \left( \frac{q_\phi(z \mid x)}{p(z \mid x)} \right) dz$$

### Step 2: Use Bayes' Theorem on the denominator

Using Bayes' theorem, we replace $p(z \mid x)$ with $\frac{p(x, z)}{p(x)}$:

$$\frac{q_\phi(z \mid x)}{p(z \mid x)} = \frac{q_\phi(z \mid x)}{\frac{p(x, z)}{p(x)}} = \frac{q_\phi(z \mid x) \cdot p(x)}{p(x, z)}$$

Plugging this back into the integral:

$$D_{KL}\big(q_\phi(z \mid x) \parallel p(z \mid x)\big) = \int q_\phi(z \mid x) \log \left( \frac{q_\phi(z \mid x) \cdot p(x)}{p(x, z)} \right) dz$$

### Step 3: Split the logarithm

Using standard log rules ($\log(A \cdot B / C) = \log A - \log C + \log B$), split the log term into three separate pieces:

$$\log \left( \frac{q_\phi(z \mid x) \cdot p(x)}{p(x, z)} \right) = \log q_\phi(z \mid x) - \log p(x, z) + \log p(x)$$

Now substitute this back into the integral:

$$D_{KL}\big(q_\phi(z \mid x) \parallel p(z \mid x)\big) = \int q_\phi(z \mid x) \Big[ \log q_\phi(z \mid x) - \log p(x, z) + \log p(x) \Big] dz$$

### Step 4: Split the integral into two parts

Distribute $q_\phi(z \mid x)$ to isolate the term containing $\log p(x)$:

$$D_{KL}\big(q_\phi(z \mid x) \parallel p(z \mid x)\big) = \int q_\phi(z \mid x) \Big[ \log q_\phi(z \mid x) - \log p(x, z) \Big] dz + \int q_\phi(z \mid x) \log p(x) \, dz$$

### Step 5: Simplify the $\log p(x)$ term

Notice that $\log p(x)$ does **not** depend on $z$ at all. Because $z$ is the variable being integrated, $\log p(x)$ behaves like a constant and can be pulled completely outside the integral:

$$\int q_\phi(z \mid x) \log p(x) \, dz = \log p(x) \underbrace{\int q_\phi(z \mid x) \, dz}_{= 1}$$

Since $q_\phi(z \mid x)$ is a valid probability distribution, integrating it over all $z$ equals $1$. Therefore:

$$\int q_\phi(z \mid x) \log p(x) \, dz = \log p(x)$$

### Step 6: Define ELBO and Rearrange

Now substitute that back into our main equation from Step 4:

$$D_{KL}\big(q_\phi(z \mid x) \parallel p(z \mid x)\big) = \int q_\phi(z \mid x) \Big[ \log q_\phi(z \mid x) - \log p(x, z) \Big] dz + \log p(x)$$

Notice the first term on the right side:

$$\int q_\phi(z \mid x) \Big[ \log q_\phi(z \mid x) - \log p(x, z) \Big] dz = -\int q_\phi(z \mid x) \log \left( \frac{p(x, z)}{q_\phi(z \mid x)} \right) dz$$

By definition, this integral is the **negative ELBO**:

$$-\text{ELBO}(\phi) = \int q_\phi(z \mid x) \Big[ \log q_\phi(z \mid x) - \log p(x, z) \Big] dz$$

Substituting $-\text{ELBO}(\phi)$ gives:

$$D_{KL}\big(q_\phi(z \mid x) \parallel p(z \mid x)\big) = -\text{ELBO}(\phi) + \log p(x)$$

Finally, add $\text{ELBO}(\phi)$ to both sides:

$$\log p(x) = \text{ELBO}(\phi) + D_{KL}\big(q_\phi(z \mid x) \parallel p(z \mid x)\big)$$