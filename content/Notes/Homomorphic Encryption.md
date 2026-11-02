---
title: Homomorphic Encryption
created: 2026-10-27 09:08
tags file:
  - "[[AI Privacy]]"
---
# The Definition (What)

Homomorphic Encryption (HE) is a form of encryption that allows computations to be performed directly on encrypted data without revealing the original data, producing an encrypted result that can later be decrypted.

# Why It Is Important (Why)

Normally, data must be **decrypted before it can be processed**, exposing sensitive information to whoever performs the computation.

Homomorphic Encryption removes this requirement:

- **Privacy:** A cloud server can process sensitive data without seeing its contents.
- **Untrusted environments:** Users can outsource computations without giving the server their decryption keys.
- **Applications:** Medical analysis, financial calculations, and privacy-preserving AI inference.

Unlike ordinary encryption, which protects data primarily during storage and transmission, HE can also protect data **during computation**.

# How It Works (How)

1. **Encrypt Locally**
   - The user generates a public key (for encryption) and a private key (for decryption).
   - The user's data $x$ is encrypted locally:

   $$c = E_{pk}(x)$$

   - $E_{pk}$ is encryption using the public key $pk$.
   - $c$ is the encrypted data, called *ciphertext*.

2. **Compute on Encrypted Data**
   - The user sends $c$ to a cloud server.
   - The server applies a function $f$ directly to the ciphertext using special mathematical operations:

   $$c_{\text{out}} = \operatorname{Eval}(f,c)$$

   - $f$ is the desired computation, such as addition, multiplication, or an AI model.
   - $\operatorname{Eval}$ performs the computation without decrypting $c$.
   - $c_{\text{out}}$ is the encrypted result.

   The key property is that **computing on ciphertext produces a result that decrypts to the expected computation on plaintext**.

3. **Decrypt Locally**
   - The server returns the encrypted result.
   - The user decrypts it using their private key $sk$:

   $$D_{sk}(c_{\text{out}}) \approx f(x)$$

   - $D_{sk}$ is the decryption function.
   - $f(x)$ is the result that would have been obtained from the original data.
   - The result is exact for many integer-based HE schemes; some schemes for real-valued computations introduce small approximation errors.

## **Simple numerical example:**

Suppose we want the cloud to calculate:

$$f(x)=2x+3$$

Our secret input is $x=7$, so the expected answer is $17$.

We will use a simplified Paillier encryption example.

### Step 1: Encrypt the number locally

Choose small public parameters:

- $n=35$
- $n^2=1225$
- $g=36$

Paillier encrypts a number $x$ using:
$$
E(x)=(g^x \cdot r^n)\bmod n^2
$$
Where:
- $x$ is the original number.
- $g$ and $n$ are public encryption parameters.
- $r$ is a random value that helps hide the input.
- $\bmod$ means taking the remainder after division.

For $x=7$ and $r=2$:
$$
E(7)=(36^7\cdot 2^{35})\bmod1225=753
$$

**The encrypted representation of 7 is 753.**

The user sends only $753$ to the cloud, not $7$.

### Step 2: Cloud processes the encrypted number

The cloud receives:
$$
c=753
$$

It knows that the desired computation is:
$$
f(x)=2x+3
$$

Paillier has two useful properties:

**Property A: Multiplying ciphertexts corresponds to adding plaintexts.**

$$E(a)\cdot E(b)\bmod n^2=E(a+b)$$

**Property B: Raising a ciphertext to a public power corresponds to multiplying its plaintext.**

$$E(a)^k\bmod n^2=E(ka)$$

The cloud uses these properties to calculate $2x+3$.

**Operation 1: Multiply the secret input by 2**

$$753^2\bmod1225=1059$$

Because of Property B, $1059$ is an encryption of $14$.

The cloud does not need to know that the original value was $7$.

**Operation 2: Add 3 to the encrypted result**

First, the cloud encrypts the public constant $3$:

$$E(3)=36^3\bmod1225=106$$

Then it multiplies the two ciphertexts:

$$1059\cdot106\bmod1225=779$$

Because of Property A, this produces an encryption of $14+3=17$.

**The cloud's final output is 779, not 17.**

## Step 3: User decrypts the result

The cloud sends $779$ back to the user.

The user applies the private decryption key:

$$D_{sk}(779)=17$$

For this toy example, the private decryption calculation uses $\lambda=12$ and $\mu=3$:

$$D(779)=\left(\frac{(779^{12}\bmod1225)-1}{35}\cdot3\right)\bmod35=17$$

The user obtains the correct answer.

### Summary of the Actual Computation

| Stage | Operation | Value |
|---|---|---|
| User | Original input | 7 |
| User | Encrypt 7 | 753 |
| Cloud | $753^2\bmod1225$ | 1059 |
| Cloud | $1059\cdot106\bmod1225$ | 779 |
| User | Decrypt 779 | 17 |

The cloud sees the numbers $753$, $1059$, $106$, and $779$, but does not need to recover $7$ or $17$.

# Additional Insights

## Major Limitations

**Computational overhead is the main limitation.**

- Operations on encrypted data are substantially more expensive than ordinary arithmetic because ciphertexts are large mathematical structures.
- Fully Homomorphic Encryption (FHE), which supports arbitrary computations, must also manage accumulated encryption noise to keep results decryptable.
- Neural networks are especially challenging because operations such as nonlinear activations may require expensive approximations or specialized techniques.

Consequently, running large AI models entirely through FHE can be much slower and more resource-intensive than ordinary inference, limiting its practicality for real-time applications.

HE also does not automatically hide metadata such as data sizes, computation patterns, or execution times.

## Common Misconceptions

- **"The server decrypts the data temporarily."** No. The computation happens while the data remains encrypted.
- **"Any encrypted data can be processed this way."** No. HE requires specially designed encryption schemes that support mathematical operations on ciphertext.
- **"HE makes all AI computations perfectly private and practical."** No. It protects the encrypted data and results, but performance costs and other possible information leaks remain.