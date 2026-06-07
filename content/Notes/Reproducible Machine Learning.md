---
title: "Reproducible Machine Learning"
created: "2026-04-14 11:30"
tags file:
---
***
- Sources of Nondeterminism: 
	- Implementation-Level
		- [[2021 Problems and opportunities in training deep learning software systems - An analysis of variance]]
		- [[2022 RANDOMNESS IN NEURAL NETWORK TRAINING -  CHARACTERIZING THE IMPACT OF TOOLING]]
	- Optimizer-Level
		- [[2021 Descending through a Crowded Valley - Benchmarking Deep Learning Optimizers]]
		- [[2022 Reproducibility in Optimization - Theoretical Framework and Limits]]
	- Metaparameter Variation
		- [[2017 Reporting Score Distributions Makes a Difference - Performance Study of LSTM-networks for Sequence Tagging]]
	- Evaluation Metrics
		- [[Reproducibility Issues for BERT-based Evaluation Metrics]]
		- [[2018 A Call for Clarity in Reporting BLEU Scores]]
	- Data Splits
		- [[2021 We need to talk about random splits]]
	    - [[2019 We need to talk about standard splits]]
	- Prompt Variation
		- [[2024 Efficient multi-prompt evaluation of LLMs]]
		- [[2025 ReliableEval: A Recipe for Stochastic LLM Evaluation via Method of Moments]]
- Reliability Measures
	- Bootstrap Confidence Intervals
		- [[2021 Deep Reinforcement Learning at the Edge of the Statistical Precipice]]
		- [[2024 Confidence Interval Estimation of Predictive Performance in the Context of AutoML]]
	- Variance Component Analysis and Intra-Class Correlation Coefficient
		- [[2024 Validity, Reliability, and Significance: Empirical Methods for NLP and Data Science (Chapter 3)]]
		- [[2024 LMEMs for post-hoc analysis of HPO Benchmarking]]
- Significance Testing
	- Score Distribution Comparison
		- [[2019 Deep Dominance - How to Properly Compare Deep Neural Models]]
		- [[2022 deep-significance - Easy and Meaningful Statistical Significance Testing in the Age of Neural Networks]]
	- Bootstrap and Randomization
		- [[2011 Better hypothesis testing for statistical machine translation: Controlling for optimizer instability]]
		- [[2022 The multiBERTs: BERT reproductions for robustness analysis]]
	- The Generalized Likelihood Ratio Test
		- [[2024 Validity, Reliability, and Significance: Empirical Methods for NLP and Data Science (Chapter 4)]]
- Examples for Reproducibility Studies
	- [[2024 Evaluating the reproducibility of a deep learning algorithm for the prediction of retinal age]]
	- [[2025 ModernTCN Revisited - A Critical Look at the Experimental Setup in General Time Series Analysis]]
	- [[2025 Benchmarking LLM Capabilities in Negotiation through Scorable Games]]

|**Paper**|**The "Villain" (Main Focus)**|**Domain**|**Key Contribution**|
|---|---|---|---|
|**Reimers (2017)**|**The Random Seed**|NLP (LSTMs)|Proved that "seed mining" was creating fake SOTA results in NLP.|
|**Analysis of Variance (2021)**|**General Variance**|Software Engineering|Systematic audit showing variance is a "software bug" across all of DL.|
|**Crowded Valley (2021)**|**Optimizer Hype**|Optimization|Proved that tuning a baseline (Adam) is better than "novel" optimizers.|
|**Tooling (2022)**|**The Hardware Stack**|System/Hardware|Isolated that GPUs (CUDA/cuDNN) add noise even if the seed is fixed.|
|**Theory (2022)**|**Chaos & Precision**|Mathematics|Proved that bit-level rounding and chaos theory make 100% reproducibility impossible.|

---
# Reference
