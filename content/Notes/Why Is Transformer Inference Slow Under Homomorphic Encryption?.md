---
title: Why Is Transformer Inference Slow Under Homomorphic Encryption?
created: 2026-10-28 15:05
tags file:
  - "[[AI Privacy]]"
---
## TL;DR

Transformer inference is expensive under [[Homomorphic Encryption|Homomorphic Encryption (HE)]] because its operations are not naturally compatible with encrypted computation.

The main bottlenecks are:

1. **Expensive encrypted arithmetic** — ciphertext operations are much more costly than ordinary floating-point operations.
2. **Nonlinear functions** — Softmax, GeLU, and LayerNorm require special approximations.
3. **Multiplicative depth** — sequential multiplications consume HE computation levels, potentially requiring expensive bootstrapping.
4. **Ciphertext rotations** — attention and matrix operations require costly movement of encrypted values between slots.
5. **Memory and GPU overhead** — large ciphertexts, evaluation keys, memory traffic, and synchronization can limit performance.

> [!important] Key insight
> Optimizing encrypted Transformer inference involves two different strategies:
> - **Make expensive operations faster** (e.g., GPU acceleration).
> - **Avoid expensive operations** (e.g., better ciphertext packing or HE-friendly model design).

---

## 1. What Is Homomorphic Encryption?

Homomorphic Encryption allows computations on encrypted data without first decrypting it.

For a supported computation $f$:

$$
\operatorname{Dec}(
    \operatorname{Eval}(f,\operatorname{Enc}(x))
)
\approx f(x)
$$

The approximation is relevant to schemes such as **CKKS**, which support approximate numerical computation.

### Typical private-inference workflow

1. Client encrypts input $x$.
2. Server evaluates a model using encrypted $x$.
3. Server returns an encrypted result.
4. Client decrypts the prediction.

**Goal:** Protect the input from the server under the specified threat model.

HE does not automatically guarantee model confidentiality, output integrity, or protection from side-channel leakage.

---

## 2. Transformer Operations Under HE

### 2.1 Linear operations

A Transformer computes:

$$
Q=XW_Q,\quad K=XW_K,\quad V=XW_V
$$

CKKS supports encrypted addition and multiplication, so these operations are possible.

However, matrix multiplication on encrypted data can involve:

- Ciphertext–plaintext multiplication
- Ciphertext–ciphertext multiplication
- Ciphertext rotation
- Key switching
- Rescaling

These operations can be considerably more expensive than ordinary GPU matrix multiplication.

### 2.2 Nonlinear operations

Attention uses:

$$
\operatorname{Attention}(Q,K,V)
=
\operatorname{Softmax}
\left(
\frac{QK^\top}{\sqrt{d_k}}
\right)V
$$

Softmax requires:

$$
\operatorname{Softmax}(x_i)
=
\frac{e^{x_i}}{\sum_j e^{x_j}}
$$

Other problematic operations include:

| Transformer component | Expensive operation |
|---|---|
| Softmax | Exponential and division |
| LayerNorm | Inverse square root |
| RMSNorm | Inverse square root |
| GeLU | Non-polynomial activation |
| SwiGLU | Nonlinear gating |

CKKS directly supports arithmetic circuits, not arbitrary mathematical functions.

**Common approach:** Replace unsupported operations with polynomial approximations or redesign the computation.

For example:

$$
f(x)\approx P_d(x)
=\sum_{k=0}^{d}a_kx^k
$$

A more accurate approximation may require more encrypted computation.

> [!warning] Trade-off
> Lower approximation error does not necessarily mean better encrypted inference.
>
> We must consider accuracy, multiplicative depth, latency, and bootstrapping cost together.

---

## 3. Multiplicative Depth

**Multiplicative depth** is the longest chain of sequentially dependent multiplication operations.

Compare:

$$
y=((ab)c)d
$$

and

$$
y=(ab)(cd)
$$

Both require three multiplications, but their multiplicative depths differ:

- Sequential computation: depth 3
- Balanced computation: depth 2

In CKKS, multiplication consumes levels of the modulus chain.

Deep Transformer architectures repeatedly apply attention, normalization, and FFN computations.

This can exhaust the available computation levels.

### Bootstrapping

Bootstrapping refreshes a ciphertext so more encrypted computations can be performed.

However, bootstrapping is computationally expensive.

**Optimization goal:** Reduce multiplicative depth and/or the frequency and cost of bootstrapping.

---

## 4. Ciphertext Packing and Rotations

CKKS supports SIMD-style computation by placing multiple encrypted values into the slots of one ciphertext.

Example:

$$
c=\operatorname{Enc}([a,b,c,d])
$$

The same arithmetic operation can be applied across multiple slots.

But combining values in different positions may require a ciphertext rotation:

$$
[a,b,c,d]\rightarrow[b,c,d,a]
$$

Unlike an ordinary array shift, HE rotation is a cryptographic operation, typically involving key switching.

### Why packing matters

Different operations prefer different data layouts.

For example:

- Matrix multiplication may benefit from diagonal packing.
- Some normalization or reduction operations may benefit from column-based arrangements.
- Switching layouts between layers can create additional overhead.

> [!tip] Key insight
> Ciphertext packing is not the same as GPU memory coalescing.
>
> Both concern data layout, but packing determines which encrypted SIMD operations and rotations are necessary.

---

## 5. GPU and Memory Bottlenecks

HE computations commonly involve large polynomial representations and cryptographic evaluation keys.

Potential bottlenecks:

| Bottleneck | GPU Programming connection |
|---|---|
| Polynomial arithmetic / NTT | Parallel computation and kernel optimization |
| Large ciphertexts and keys | Memory bandwidth and capacity |
| CPU–GPU transfers | PCIe overhead |
| Repeated kernel launches | CUDA Graphs and launch overhead |
| Synchronization | Kernel scheduling and execution dependencies |
| Data layout | Memory access patterns and workload organization |

The actual bottleneck depends on the HE scheme, library, workload, and hardware.

**Important:** An optimized GPU kernel may improve one operation without significantly improving end-to-end inference time.

---

## 6. Two Research Approaches

### EncryptedLLM (ICML 2025)

**Paper:** [EncryptedLLM: GPU-Accelerated Fully Homomorphic LLM Inference](https://proceedings.mlr.press/v267/de-castro25a.html)

**Main approaches:**
- GPU-accelerated FHE computation
- Approximation of nonlinear Transformer operations
- Batching and parallel execution

**Core idea:**

> Make encrypted computation executable and faster.

**Connection to my courses:**
- GPU Programming: parallel execution and performance
- Scalable and Robust Embedded ML: Transformer operations and numerical approximations

**Limitation:** Results for encrypted GPT-2 cannot be assumed to transfer directly to every foundation model.

### MOAI (ICLR 2026)

**Paper:** [MOAI: Module-Optimizing Architecture for Non-Interactive Secure Transformer Inference](https://proceedings.iclr.cc/paper_files/paper/2026/hash/2f2b1d6bbd50865eca40e2774a057eef-Abstract-Conference.html)

**Main approaches:**
- Ciphertext packing
- Reducing rotations
- Efficient encrypted matrix operations
- Coordinating data layouts across Transformer modules

**Core idea:**

> Avoid unnecessary expensive encrypted operations.

**Connection to my courses:**
- Data layout and computational overhead
- Transformer attention and normalization
- Model–system co-design

**Important distinction:** MOAI primarily optimizes encrypted computation and packing, not ordinary CUDA memory coalescing.

---

## 7. Implications for My DLR Project

**Project:** Foundation Models + Homomorphic Encryption + Anomaly Detection

### Candidate research question

> Which operations dominate homomorphic inference cost in our anomaly-detection workload, and what system-level or model-level optimizations could reduce this cost without unacceptable accuracy or security trade-offs?

### Possible methodology

1. Identify the model architecture and HE scheme.
2. Define the threat model and which computations remain encrypted.
3. Implement or reproduce a minimal encrypted-inference baseline.
4. Measure latency, memory usage, and numerical error.
5. Profile expensive operations.
6. Evaluate optimizations based on the measured bottleneck.
7. Compare detection performance and end-to-end cost.

### Possible optimization directions

| Observed bottleneck | Candidate direction |
|---|---|
| Expensive cryptographic kernels | GPU optimization |
| Too many ciphertext rotations | Packing and evaluation-flow optimization |
| Excessive multiplicative depth | HE-friendly model computation |
| Underused SIMD slots | Batching or packing improvements |
| Excessive CPU–GPU transfer | System-level optimization |
| Model accuracy degradation | Numerical approximation analysis |

These are hypotheses, not established bottlenecks in the DLR implementation.

---

## 8. Open Questions

- [ ] Which foundation model will DLR use?
- [ ] Which HE scheme and library will be used?
- [ ] Is inference fully encrypted or only partially encrypted?
- [ ] Are model weights plaintext or encrypted?
- [ ] Which operations dominate end-to-end latency?
- [ ] Is the intended application real-time or offline anomaly detection?
- [ ] What latency and throughput are acceptable?
- [ ] Can GPU optimization meaningfully help?
- [ ] Can HAWAII provide systems supervision while DLR supports the HE aspects?

---

## 9. Connection to Future Career

This thesis could build transferable skills in:

- ML inference and model efficiency
- Performance profiling and benchmarking
- GPU and memory optimization
- Model–system co-design
- Numerical accuracy and computational trade-offs
- Privacy-preserving computation

**Preferred career positioning:**
ML Systems / Efficient Inference / Research Engineering.

HE is the specialized application domain, not necessarily the only future career option.

> [!important] Personal takeaway
> The most transferable skill is not knowing one HE library.
>
> It is being able to identify a computational bottleneck, explain its cause, design an improvement, and rigorously verify its effect.

## References

1. [EncryptedLLM — ICML 2025](https://proceedings.mlr.press/v267/de-castro25a.html)
2. [MOAI — ICLR 2026](https://proceedings.iclr.cc/paper_files/paper/2026/hash/2f2b1d6bbd50865eca40e2774a057eef-Abstract-Conference.html)
3. [Cheddar: A Swift Fully Homomorphic Encryption Library for CUDA GPUs](https://arxiv.org/abs/2407.13055)
