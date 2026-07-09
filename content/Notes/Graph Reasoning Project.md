---
title: "Graph Reasoning Project"
created: "2026-06-25 19:41"
tags file:
---
## 1. The Elevator Pitch (What is this project?)

We reimplemented and extended a framework called the **[[Graph Language Model]] (GLM)** (originally by Plenz and Frank, 2024). The high-level goal was to fuse text processing (where LMs excel) with structural graph reasoning (where GNNs excel) to improve factuality and reduce hallucinations in language models.

### The Big Twist:

The original GLM used text to guide relation predictions. We decided to push the boundaries by replacing plain text guidance with deeply structured semantic graphs derived from **[[Abstract Meaning Representation (AMR)]]**. We wanted to see if structured semantic data could beat standard text-based methods.

[[Original GLM Baseline vs. AMR]]

## 2. The Core Technical Details

- **The Model:** 
	- We built a bidirectional encoder model based on the T5 architecture, specifically matching the "gGLM" configuration. 
	- This meant we disabled the decoder, added 2 extra relative attention buckets, and stripped away things like caching, parallelization, and head pruning.
    
- **The Code Strategy (Monkey-Patching):** 
	- To keep the codebase clean and avoid duplicating the massive T5 source code, we heavily relied on **monkey-patching** to dynamically override and redefine the specific T5 methods and attributes needed for graph awareness.
    
- **The Data Pipeline:**
	- We took the REBEL dataset and augmented it by creating AMR-based graphs. 
	- The pipeline used Penman notation, queried Wikidata for compound terms, used ConceptNet for entity disambiguation, and pulled arguments from PropBank concepts.
    

## 3. The "Honest Reflection"

### Bottleneck A: The Slow Data Pipeline

- **The Plan:** 
	- We wanted to scale up to 100,000 training instances to reach a performance plateau.
    
- **The Reality:** 
	- The API requests to ConceptNet and Wikidata caused severe lag, resulting in a crawl of only ~1,000 instances processed every 24 hours. 
	- We had to stop at roughly 4,000 instances—25 times less than planned.
    
- **The Fix:** 
	- In the future, we would fix this by using local Wikidata dumps, implementing better cache hashing, and parallelizing the independent sentence processing.
    

### Bottleneck B: The Fine-Tuning Block

- **The Problem:** We couldn't actually run a final evaluation because fine-tuning failed.
    
- **The Technical Snippet:** 
	- Our **forward pass worked perfectly**, but the system got completely stuck during the **backward pass** (gradient computation/backpropagation).
    
- **The Fix:** 
	- Beyond fixing the backprop bug, we noted that migrating the graph processing architecture to a dedicated library like **PyTorch-Geometric** would streamline the entire setup.
