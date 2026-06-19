---
title: "Probabilistic Graphical Models (PGMs)"
created: "2026-06-15 11:57"
tags file:
---
A **Probabilistic Graphical Model (PGM)** is a compact diagrammatic framework used to represent complex statistical models and trace the conditional dependencies between random variables. Instead of writing out massive joint probability equations, PGMs use a visual language of nodes, edges, and boundaries to denote how a system is built.

#### Visual Syntax & Node Typology

Standard PGM notation utilizes distinct shapes and shading styles to explain the exact nature of every parameter inside a network:

![[Pasted image 20260616102531.png|469]]

- **Observed Variable (Colored/Grey Circle):** 
	- Represents data that you have explicitly measured or collected from your training set or environment (e.g., input features $x$ or true labels $y$).
    
- **Probabilistic Random Variable (White Circle):** 
	- Represents a latent or unobserved variable modeled explicitly as a probability distribution (e.g., weights $\theta$ in a BNN).
    
- **Deterministic Variable (Dashed White Circle):** 
	- Represents an absolute calculation node whose value is determined cleanly from its parents with zero added noise (e.g., an activation line $\mu = m \cdot x + b$).
    
- **Learned Deterministic Parameter (White Box):** 
	- Represents a traditional, non-probabilistic parameter that contains a single fixed point-estimate optimized directly during training.
    
- **Plate Boundaries (Outer Rectangle Layout):** 
	- Encloses sections of the graph to indicate **conditional independence** across repeating structural units. 
	- For instance, a plate marked with size $N$ implies that the operations inside repeat independently across every sample in your dataset, enabling parallelized execution.
    

#### The Progression from Deterministic to Probabilistic

PGMs visually clarify how a model scales from standard linear regression into a fully probabilistic system:

![[Pasted image 20260616103127.png]]

- **Deterministic Mode ($y = m \cdot x + b$):** 
	- The slope $m$ and bias $b$ exist strictly inside square parameter boxes. 
	- They map directly onto an observed input $x$ to calculate an absolute output value $y$.
    
- **Partially Probabilistic Mode ($y = \mathcal{N}(m \cdot x + b, \sigma^2)$):** 
	- The slope and bias remain fixed deterministic boxes, but an unshaded circle for variance ($\sigma^2$) is introduced. This models _[[homoskedastic]] aleatoric uncertainty_ (data-level noise). 
	- The target $y$ becomes an unshaded circle during modeling but turns into a shaded circle when grounded by observations.
    
- **Fully Probabilistic Mode:** 
	- Every single variable in the system is transformed into an unshaded distribution circle. 
	- The architecture captures both data noise ($\sigma^2$) and model parameter variance ($m, b$) simultaneously:
    $$
    y = \mathcal{N}\left(\mathcal{N}(m_\mu, m_{\sigma^2}) \cdot x + \mathcal{N}(b_\mu, b_{\sigma^2}), \sigma^2\right)
    $$
    
