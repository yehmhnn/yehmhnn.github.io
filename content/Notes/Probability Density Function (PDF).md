2026-05-08 14:05
Tags: [[Probability & Statistics]]
***

## 1. Definition

A **Probability Density Function (PDF)**, denoted as $f(x)$, describes the likelihood of a continuous random variable $X$ taking on a specific value. Unlike discrete variables, the probability of a continuous variable taking an _exact_ point is zero; instead, we measure the probability over an interval.

The probability that $X$ falls within the interval $[a, b]$ is given by the area under the curve:

$$P(a \leq X \leq b) = \int_{a}^{b} f(x) \, dx$$

---

## 2. Core Properties

For a function to be a valid PDF, it must satisfy two strict conditions:

1. **Non-negativity:** The density cannot be negative for any value of $x$.
    $$f(x) \geq 0 \quad \forall x$$
    
2. **Total Area Rule:** The total area under the curve must equal 1, representing the certainty that the variable exists within the sample space.
    $$\int_{-\infty}^{\infty} f(x) \, dx = 1$$
    

---

## 3. Relationship to CDF

The [[Cumulative Distribution Function (CDF)]], denoted $F(x)$, is the integral of the PDF. It represents the probability that the variable is less than or equal to $x$.

- **From PDF to CDF:** $F(x) = \int_{-\infty}^{x} f(t) \, dt$
    
- **From CDF to PDF:** $f(x) = \frac{d}{dx} F(x)$ (The PDF is the derivative of the CDF).
    

---

## 4. Key Examples

### The [[Normal (Gaussian) Distribution]]

Defined by mean $\mu$ and variance $\sigma^2$:

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}$$

### The [[Uniform Distribution]]

Where the density is constant over an interval $[a, b]$:

$$f(x) = \begin{cases} \frac{1}{b-a} & \text{for } a \leq x \leq b \\ 0 & \text{otherwise} \end{cases}$$

---

## 5. Applications in Advanced Modeling

In modern computational contexts, PDFs are the foundation for:

- **Density Estimation:** Inferring the underlying $f(x)$ from a set of observed data points.
    
- **Change of Variables:** Calculating how a density shifts under a transformation $y = g(x)$, which is essential for **Flow-based models**.
    
- **Score Functions:** The gradient of the log-density, $\nabla_x \log f(x)$, which guides the sampling process in **Diffusion** processes.


---
# Reference
