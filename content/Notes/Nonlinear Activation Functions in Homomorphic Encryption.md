---
title: Nonlinear Activation Functions in Homomorphic Encryption
created: 2026-11-03 08:58
tags file:
  - "[[AI Privacy]]"
---
## 1. Overview

**The main challenge:** [[Homomorphic Encryption]] (HE) supports computation on encrypted data, but common HE schemes cannot efficiently evaluate nonlinear activation functions such as ReLU, sigmoid, GELU, and softmax.

The difficulty is not nonlinearity itself. Instead, it comes from the types of mathematical operations supported by HE.

Most arithmetic HE schemes efficiently support:

- Addition
- Multiplication
- Multiplication by plaintext constants

However, typical activation functions require operations such as comparisons, division, exponentials, or conditional branching, which are not directly supported by arithmetic HE.

**Key insight:** Polynomial nonlinear functions are compatible with HE, while non-polynomial functions generally require approximation or additional cryptographic techniques.

---

## 2. Why Is This a Problem?

### 2.1 Supported Operations in Homomorphic Encryption

Homomorphic encryption allows arithmetic operations to be performed directly on ciphertexts.

Given encrypted values:

$$  
c_1 = Enc(x_1), \qquad c_2 = Enc(x_2)  
$$

An HE scheme supporting addition and multiplication can compute:

$$  
Dec(c_1 \oplus c_2) = x_1 + x_2  
$$

$$  
Dec(c_1 \otimes c_2) = x_1 x_2  
$$

Here, $\oplus$ and $\otimes$ represent the corresponding ciphertext operations.

This makes the linear layers of neural networks relatively straightforward to implement.

For example:

$$  
z = Wx + b  
$$

can be evaluated using additions and multiplications.

However, a typical neural network layer is:

$$  
a = \sigma(Wx+b)  
$$

where $\sigma$ is a nonlinear activation function.

The difficulty comes from evaluating $\sigma$ on encrypted values.

### 2.2 Example: ReLU

ReLU is defined as:

$$  
ReLU(x) = \max(0,x)  
$$

Equivalently:

$$  
ReLU(x)=  
\begin{cases}  
x & x>0\  
0 & x\leq0  
\end{cases}  
$$

To calculate ReLU, the evaluator needs to determine whether $x$ is positive or negative.

However, under encryption:

- The server cannot directly inspect the value of $x$.
    
- Arithmetic HE schemes do not natively provide an efficient comparison operation.
    
- The evaluator cannot simply branch based on the encrypted sign.
    

Therefore, ReLU cannot be directly expressed using a finite number of additions and multiplications over real-valued inputs.

**Important distinction:** FHE is not mathematically incapable of evaluating ReLU. Boolean-circuit-based FHE can implement comparisons, but doing so may be computationally expensive. The limitation mainly concerns efficient evaluation using arithmetic HE schemes such as CKKS and BFV.

### 2.3 Other Activation Functions

|Function|Mathematical expression|Difficulty|
|---|---|---|
|ReLU|$\max(0,x)$|Comparison / branching|
|Sigmoid|$\frac{1}{1+e^{-x}}$|Exponential and division|
|Tanh|$\frac{e^x-e^{-x}}{e^x+e^{-x}}$|Exponential and division|
|GELU|$x\Phi(x)$|Gaussian CDF / nonlinear approximation|
|Softmax|$\frac{e^{x_i}}{\sum_j e^{x_j}}$|Exponential and reciprocal|
|Square|$x^2$|Directly supported|

The square function is an example of a nonlinear activation that is naturally compatible with arithmetic HE.

---

## 3. Computational Depth and Noise Growth

Even when an activation function is replaced with a polynomial, evaluating that polynomial can still be expensive.

Suppose we approximate an activation using:

$$  
P(x)=a_0+a_1x+a_2x^2+\cdots+a_dx^d  
$$

This is compatible with arithmetic HE because it only requires addition and multiplication.

However, ciphertext multiplication is substantially more expensive than ordinary plaintext multiplication.

### 3.1 Multiplicative Depth

Multiplicative depth describes the maximum number of sequential ciphertext multiplication layers in a computation.

For example:

$$  
P(x)=x^2  
$$

requires one multiplication level.

Meanwhile:

$$  
P(x)=x^4  
$$

can be evaluated as:

$$  
x^2=x\cdot x  
$$

$$  
x^4=x^2\cdot x^2  
$$

requiring two multiplication levels.

A higher-degree polynomial typically requires greater multiplicative depth, although the exact depth depends on the evaluation algorithm.

### 3.2 Why Depth Matters

Homomorphic operations introduce or amplify ciphertext noise and consume computational resources.

In leveled HE:

- Each multiplication consumes part of the available computation budget.
    
- More depth generally requires larger cryptographic parameters.
    
- Larger parameters increase runtime and memory consumption.
    
- Excessive noise or insufficient remaining levels can prevent correct decryption.
    

In CKKS, another issue is approximate numerical error and scale management.

Bootstrapping can refresh ciphertexts and restore the ability to perform more computations, but it introduces substantial computational overhead.

### 3.3 The Accuracy–Efficiency Trade-off

There is a fundamental trade-off:

$$  
\text{Polynomial degree}\uparrow  
$$

$$  
\Downarrow  
$$

$$  
\text{Potential approximation accuracy}\uparrow  
$$

but also:

$$  
\text{Computation cost and depth}\uparrow  
$$

The exact relationship depends on the function, approximation interval, and polynomial evaluation strategy.

**Main research problem:** How can we preserve the accuracy of modern neural networks while minimizing the cryptographic cost of nonlinear operations?

---

# 4. Solutions Proposed in Research Papers

## Solution 1: Replace Activations with HE-Friendly Polynomials

### Paper: CryptoNets (2016)

**Title:** _CryptoNets: Applying Neural Networks to Encrypted Data with High Throughput and Accuracy_

**Authors:** Gilad-Bachrach et al.
**Venue:** ICML 2016
**Paper:** [https://proceedings.mlr.press/v48/gilad-bachrach16.html](https://proceedings.mlr.press/v48/gilad-bachrach16.html)

### Main idea

Instead of evaluating ReLU or sigmoid, CryptoNets replaces conventional activations with the square function:

$$  
\sigma(x)=x^2  
$$

Since the square function only requires multiplication, it can be evaluated directly under HE.

CryptoNets also replaces max pooling with a pooling operation based on arithmetic aggregation.

### Advantages

- Simple implementation.
    
- No comparison operation required.
    
- Low-degree polynomial with minimal multiplicative depth.
    
- Demonstrated practical encrypted neural network inference on MNIST.
    

### Limitations

- Square activation behaves differently from ReLU.
    
- The derivative $2x$ is unbounded, which can complicate training.
    
- Repeated square activations can cause large intermediate values.
    
- Accuracy and training stability can degrade on deeper or more complex networks.
    

### Takeaway

CryptoNets demonstrates that nonlinear neural networks can operate on encrypted inputs if their activations are redesigned to use HE-supported operations.

---

## Solution 2: Polynomial Approximation of ReLU

### Paper: Polynomial Approximations of ReLU (2025)

**Title:** _Polynomial Approximations of ReLU for Secure CNN Inference in Homomorphic Encryption Environments_

**Author:** Pierpaolo Agamennone
**Venue:** IEICE Transactions on Fundamentals, 2025
**Paper:** [https://doi.org/10.1587/transfun.2024EAL2090](https://doi.org/10.1587/transfun.2024EAL2090)

### Main idea

Instead of replacing ReLU with a fundamentally different activation, approximate ReLU with a polynomial:

$$  
ReLU(x)\approx P_d(x)  
$$

where:

$$  
P_d(x)=\sum_{k=0}^{d}a_kx^k  
$$

For example, a low-degree polynomial can be fitted to the ReLU function over a bounded interval:

$$  
x\in[-B,B]  
$$

The paper proposes a degree-7 polynomial approximation constructed using the Remez algorithm, together with techniques for extending the approximation domain.

### Why this works

Polynomial evaluation only requires arithmetic operations supported by CKKS.

The encrypted computation becomes:

$$  
Enc(x)\xrightarrow{P_d}Enc(P_d(x))  
$$

rather than requiring a direct encrypted comparison.

### Advantages

- Retains behavior closer to ReLU.
    
- Compatible with arithmetic HE.
    
- Can offer improved accuracy compared with simply using square activation.
    
- Supports nonlinear encrypted inference without relying on interactive comparison protocols.
    

### Limitations

- Approximation errors remain.
    
- Polynomial performance depends on the input interval.
    
- Higher degrees increase computational cost.
    
- Values outside the approximation interval may produce large errors.
    

### Takeaway

Polynomial approximation is one of the most important approaches for evaluating conventional activation functions in arithmetic HE.

---

## Solution 3: Train Networks with Accuracy-Preserving Polynomial Activations

### Paper: AESPA (2022)

**Title:** _AESPA: Accuracy Preserving Low-degree Polynomial Activation for Fast Private Inference_

**Authors:** Park et al.

**Paper:** [https://arxiv.org/abs/2201.06699](https://arxiv.org/abs/2201.06699)

### Main idea

Rather than replacing ReLU after training, AESPA designs low-degree polynomial activations and adapts neural network training to them.

The approach uses:

- Hermite polynomial expansion.
    
- Basis-wise normalization.
    
- HE/MPC-friendly polynomial activations.
    
- Training methods that preserve predictive accuracy.
    

A Hermite-basis approximation has the general form:

$$  
P_d(x)=\sum_{k=0}^{d}a_kH_k(x)  
$$

where $H_k(x)$ denotes a Hermite polynomial.

### Why this matters

Naively replacing pretrained ReLU functions with polynomials can significantly reduce accuracy.

AESPA addresses this issue by making polynomial activations part of the model design and training process.

### Advantages

- Better accuracy retention than naive polynomial substitution.
    
- Low-degree activations.
    
- Reduced nonlinear-layer overhead in the evaluated private-inference setting.
    
- Demonstrated on architectures including ResNet and VGGNet.
    

### Limitations

- Model adaptation and training changes are necessary.
    
- The results are primarily demonstrated in hybrid HE/MPC private-inference settings, not exclusively pure CKKS inference.
    
- Polynomial activations may still behave differently from standard ReLU.
    

### Takeaway

**Activation-aware training can be as important as the polynomial approximation itself.**

---

## Solution 4: Combine Homomorphic Encryption with Secure Multiparty Computation

### Paper: GAZELLE (2018)

**Title:** _GAZELLE: A Low Latency Framework for Secure Neural Network Inference_

**Authors:** Juvekar, Vaikuntanathan, Chandrakasan

**Venue:** USENIX Security 2018

**Paper:** [https://www.usenix.org/conference/usenixsecurity18/presentation/juvekar](https://www.usenix.org/conference/usenixsecurity18/presentation/juvekar)

### Main idea

Instead of forcing all computations into HE, GAZELLE combines homomorphic encryption with secure two-party computation.

Different operations use different cryptographic techniques:

|Neural network operation|Technique|
|---|---|
|Matrix multiplication|Homomorphic encryption|
|Convolution|Homomorphic encryption|
|ReLU|Garbled circuits|
|Max pooling|Garbled circuits|

### Why this works

Homomorphic encryption is well suited for linear algebra.

Garbled circuits can efficiently implement Boolean operations such as comparisons, which are needed by ReLU.

The system switches between cryptographic representations when necessary.

### Advantages

- Supports conventional ReLU.
    
- Avoids polynomial approximation error for ReLU.
    
- Faster than several early HE-only inference systems.
    
- Can preserve existing network architectures more easily.
    

### Limitations

- Requires an interactive protocol between parties.
    
- Additional communication is needed.
    
- Switching between HE and garbled-circuit representations introduces overhead.
    
- Different security and deployment assumptions from noninteractive, HE-only inference.
    

### Takeaway

A hybrid cryptographic architecture can be more efficient than forcing every neural network operation into arithmetic HE.

---

## Solution 5: Evaluate Nonlinear Functions During Bootstrapping

### Paper: Homomorphic Activation and Argmax via Bootstrapping (2025)

**Title:** _Homomorphic Activation and Argmax via Bootstrapping and Applications in Privacy-Preserving Neural Networks_

**Authors:** Zhang et al.

**Venue:** Neurocomputing, 2025

**Paper:** [https://doi.org/10.1016/j.neucom.2025.130862](https://doi.org/10.1016/j.neucom.2025.130862)

### Main idea

Use TFHE and programmable bootstrapping to evaluate nonlinear functions.

Unlike arithmetic polynomial evaluation alone, programmable bootstrapping can implement functions through a lookup-table-like mechanism over an appropriately encoded, finite input domain.

Conceptually:

$$  
Enc(x)\xrightarrow{\text{Programmable Bootstrap}}Enc(f(x))  
$$

where $f$ can represent:

$$  
f(x)=ReLU(x)  
$$

or another nonlinear activation such as sigmoid.

### Advantages

- Supports comparison-based nonlinear behavior.
    
- Avoids relying exclusively on high-degree polynomial approximation.
    
- Bootstrapping refreshes ciphertext noise.
    
- Allows deeper encrypted computation.
    
- Can implement argmax and related nonlinear operations.
    

### Limitations

- Bootstrapping can be computationally expensive.
    
- Precision and representation depend on the encoding.
    
- Lookup domain and range must be handled carefully.
    
- Not equivalent to exact real-valued evaluation over unlimited precision.
    

### Takeaway

Programmable bootstrapping offers an alternative to polynomial approximation, particularly in TFHE-based systems.

---

## Solution 6: Fuse ReLU with CKKS Bootstrapping

### Paper: RBOOT (2026)

**Title:** _RBOOT: Accelerating Homomorphic Neural Network Inference by Fusing ReLU within Bootstrapping_

**Authors:** Yang et al.

**Venue:** USENIX Security 2026

**Paper:** [https://www.usenix.org/conference/usenixsecurity26/presentation/yang-zhaomin](https://www.usenix.org/conference/usenixsecurity26/presentation/yang-zhaomin)

### Main idea

Instead of treating ReLU evaluation and CKKS bootstrapping as separate expensive operations, RBOOT integrates nonlinear activation evaluation into the bootstrapping procedure.

The approach exploits nonlinear computations already present within CKKS bootstrapping, particularly its EvalMod component.

### Advantages

- Reduces the overhead associated with separately evaluating ReLU approximations.
    
- Co-optimizes activation and noise-refresh operations.
    
- Targets the expensive nonlinear bottleneck in CKKS neural network inference.
    

### Limitations

- Depends on specialized CKKS bootstrapping design.
    
- Implementation complexity is higher.
    
- Performance benefits depend on the network and cryptographic parameters.
    

### Takeaway

Recent work increasingly treats bootstrapping not only as a noise-refresh mechanism but also as an opportunity to perform useful nonlinear computation.

---

# 5. Comparison of Approaches

|Approach|Representative paper|Main benefit|Main drawback|
|---|---|---|---|
|Polynomial replacement|CryptoNets (2016)|Simple, low depth|May reduce model accuracy|
|Polynomial approximation|Agamennone (2025)|Approximates conventional ReLU|Approximation error and depth|
|Polynomial-aware training|AESPA (2022)|Better accuracy retention|Requires training changes|
|Hybrid HE + MPC|GAZELLE (2018)|Supports conventional ReLU|Interaction and communication|
|Programmable bootstrapping|Zhang et al. (2025)|Nonlinear function evaluation|Bootstrapping overhead|
|Bootstrapping fusion|RBOOT (2026)|Reduces separate ReLU overhead|Specialized implementation|

---

# 6. Important Research Considerations

## 6.1 Approximation Interval

A polynomial approximation is usually optimized over a particular interval.

For example:

$$  
P(x)\approx ReLU(x),\qquad x\in[-B,B]  
$$

If intermediate neural network activations fall outside this interval, the approximation may become inaccurate.

Consequently, techniques such as activation normalization, range-aware training, and input scaling can be important.

## 6.2 Approximation Error Propagation

Suppose:

$$  
\tilde{\sigma}(x)=\sigma(x)+\epsilon(x)  
$$

where $\epsilon(x)$ represents activation approximation error.

Across multiple neural network layers, errors may accumulate or be amplified by subsequent weight matrices.

Thus, a small local approximation error does not necessarily guarantee a small final prediction error.

## 6.3 Multiplicative Depth Versus Polynomial Degree

Polynomial degree and multiplicative depth are related but not identical.

A high-degree polynomial may be evaluated more efficiently using methods such as:

- Repeated squaring.
    
- Balanced multiplication trees.
    
- Paterson–Stockmeyer evaluation.
    
- Composition of lower-degree polynomials.
    

Therefore, optimization should focus on the full evaluation circuit rather than polynomial degree alone.

## 6.4 Pure HE Versus Hybrid Protocols

The best solution depends on the deployment requirements.

**Pure HE inference:**

- Useful when server-side evaluation should remain noninteractive after receiving ciphertexts.
    
- Polynomial approximation and bootstrapping are central techniques.
    

**Hybrid HE + MPC inference:**

- Useful when interaction is acceptable.
    
- Can support conventional nonlinear activations through secure comparison protocols.
    
- May reduce computation at the expense of communication and protocol complexity.
    

---

# 7. Main Conclusion

Nonlinear activation functions are difficult under homomorphic encryption primarily because common arithmetic HE schemes support addition and multiplication, while functions such as ReLU, sigmoid, and softmax require operations that are not directly available.

This creates three major challenges:

1. **Operation compatibility:** Conventional activations involve comparisons, exponentials, or divisions.
    
2. **Computational efficiency:** Polynomial approximations require expensive ciphertext multiplications and may increase multiplicative depth.
    
3. **Model accuracy:** Replacing or approximating activation functions can change network behavior and introduce prediction errors.
    

Research has developed several solution families:

- Replace activations with simple polynomial functions.
    
- Approximate conventional activations with carefully optimized polynomials.
    
- Train networks specifically for low-degree activations.
    
- Combine HE with secure multiparty computation.
    
- Evaluate nonlinear functions through programmable bootstrapping.
    
- Fuse activation evaluation with CKKS bootstrapping.
    

**Core insight:** The challenge is not whether FHE can theoretically evaluate nonlinear functions, but how to evaluate them efficiently while maintaining numerical precision, model accuracy, and practical security.

---

# 8. References

1. Gilad-Bachrach, R., et al. (2016). _CryptoNets: Applying Neural Networks to Encrypted Data with High Throughput and Accuracy._ ICML. [https://proceedings.mlr.press/v48/gilad-bachrach16.html](https://proceedings.mlr.press/v48/gilad-bachrach16.html)
    
2. Juvekar, C., Vaikuntanathan, V., & Chandrakasan, A. (2018). _GAZELLE: A Low Latency Framework for Secure Neural Network Inference._ USENIX Security. [https://www.usenix.org/conference/usenixsecurity18/presentation/juvekar](https://www.usenix.org/conference/usenixsecurity18/presentation/juvekar)
    
3. Park, J., et al. (2022). _AESPA: Accuracy Preserving Low-degree Polynomial Activation for Fast Private Inference._ [https://arxiv.org/abs/2201.06699](https://arxiv.org/abs/2201.06699)
    
4. Agamennone, P. (2025). _Polynomial Approximations of ReLU for Secure CNN Inference in Homomorphic Encryption Environments._ IEICE Transactions on Fundamentals. [https://doi.org/10.1587/transfun.2024EAL2090](https://doi.org/10.1587/transfun.2024EAL2090)
    
5. Zhang, P., et al. (2025). _Homomorphic Activation and Argmax via Bootstrapping and Applications in Privacy-Preserving Neural Networks._ Neurocomputing. [https://doi.org/10.1016/j.neucom.2025.130862](https://doi.org/10.1016/j.neucom.2025.130862)
    
6. Yang, Z., et al. (2026). _RBOOT: Accelerating Homomorphic Neural Network Inference by Fusing ReLU within Bootstrapping._ USENIX Security. [https://www.usenix.org/conference/usenixsecurity26/presentation/yang-zhaomin](https://www.usenix.org/conference/usenixsecurity26/presentation/yang-zhaomin)
    

## Further Reading

- _Towards Practical Secure Neural Network Inference: The Journey So Far and the Road Ahead_ — ACM Computing Surveys. [https://doi.org/10.1145/3628446](https://doi.org/10.1145/3628446)
    
- _Low-Complexity Deep Convolutional Neural Networks on Fully Homomorphic Encryption Using Multiplexed Parallel Convolutions_ — ICML 2022. [https://proceedings.mlr.press/v162/lee22e.html](https://proceedings.mlr.press/v162/lee22e.html)