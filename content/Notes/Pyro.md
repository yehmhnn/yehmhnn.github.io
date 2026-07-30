---
title: "Pyro"
created: "2026-06-15 11:58"
tags file:
---
related note: [[Probabilistic Programming]]
### Fundamental Pyro Script Operations

Pyro decouples the structural model definition from the downstream inference engine. It relies on four primary API methods to manage data flow:

- `pyro.param`: 
	- Declares learnable deterministic point parameters. It allows you to bind specific restrictions to the parameters, such as enforcing a standard positive lower bound for variance lookups (`constraint=dist.constraints.positive`).
    
- `pyro.sample`: 
	- Instinctively instantiates a true probabilistic random variable. If you assign an observation parameter (`obs=y`), it flags that node as a non-latent observed variable, instructing the backend computation engine to calculate log-probabilities against your ground-truth dataset.
    
- `pyro.deterministic`: 
	- Used to explicitly log and record downstream calculation states (like intermediate activations) so they can be parsed out later during model tracing and posterior analysis.
    
- `pyro.plate`: 
	- Implements the PGM plate notation in code via a context manager. It informs the compiler that the data index loops are conditionally independent, allowing the backend engine to execute vector operations in parallel.

Python

```
# 1. Define optimization parameters with constraints
m_loc = pyro.param('m_loc', torch.tensor(0.))
m_scale = pyro.param('m_scale', torch.tensor(1.), constraint=dist.constraints.positive)

# 2. Sample from a probability distribution inside a unique global namespace
m = pyro.sample("m", dist.Normal(m_loc, m_scale))

# 3. Use plate notation to handle conditionally independent parallel samples
with pyro.plate('data', len(x)):
    mu = m * x + b
    
    # 4. Track and record non-latent deterministic variables
    pyro.deterministic("mu_det", mu)
    
    # Pass ground-truth labels to calculate log-probabilities
    pyro.sample('obs', dist.Normal(mu, sigma), obs=y)
```

### The Pyro Tensor Shape Equation

Managing tensor dimensions is a frequent source of errors when working with Pyro. The total shape of a sampled variable is determined by concatenating three distinct dimensional axes:

$$\text{Total Shape} = \text{Sample Shape} + \text{Batch Shape} + \text{Event Shape}$$

- **Sample Shape:** Tracks independent samples drawn from the distribution across multiple inference runs.
    
- **Batch Shape:** Represents conditionally independent dimensions across the data, which can be automatically parallelized using `pyro.plate` blocks.
    
- **Event Shape:** Defines dependent dimensions where values rely on each other within a single sample, such as the covariance dimensions of a Multivariate Normal distribution.