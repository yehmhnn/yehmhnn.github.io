---
title: "Supervised Fine-Tuning (SFT)"
created: "2026-08-14 12:28"
tags file:
---
## The Definition (What)

Supervised fine-tuning is the process of training a pre-trained AI model on a curated dataset of specific input-output examples so it learns how to accurately follow instructions and converse like a helpful assistant.

## Why It Is Important (Why)

While raw pre-training only teaches a model to predict the next word on the internet, it often results in models that ramble or fail to follow directions. Supervised fine-tuning solves this by aligning the model's behavior directly with human expectations, transforming a chaotic text predictor into a directed, practical tool.

## How It Works (How)

Supervised fine-tuning operates by feeding the model pairs of prompts and ideal responses, then adjusting the model's internal weights to minimize prediction errors on those correct answers.

The process unfolds through a structured optimization mechanism:

1. **Dataset Construction:** Pairs of input prompts ($x$) and human-written target responses ($y$) are compiled.
    
2. **Token-by-Token Prediction:** The model processes the prompt and attempts to generate the target sequence. At each step, its output is evaluated against the gold-standard token.
    
3. **Loss Minimization:** The discrepancy between the model's predicted probabilities and the actual target tokens is measured and used to update the model parameters.


Mathematically, this is optimized by minimizing the negative log-likelihood loss across the dataset:

$$
L(\theta) = - \sum_{(x, y)} \sum_{t=1}^{T} \log P_\theta(y_t \mid x, y_{<t})
$$

In this formulation, $\theta$ represents the adjustable model parameters (weights), $x$ is the input prompt, $y_{<t}$ represents all the preceding tokens in the target response up to position $t$, and $P_\theta(y_t \mid x, y_{<t})$ is the probability assigned by the model to the correct token $y_t$. By minimizing this loss via gradient descent, the model updates its internal weights to increase its statistical confidence in producing the exact words found in the human-written demonstrations.

## Additional Insights

- **Direct Comparison: SFT vs. RLHF (Reinforcement Learning from Human Feedback)**
    
    SFT provides the model with exact blueprints of "good" answers, teaching it grammar, formatting, and task execution through strict imitation. However, SFT does not teach a model how to choose between multiple _acceptable_ responses based on nuance, safety, or subjective quality. That is where RLHF steps in later, using preference rankings and reward models to guide the AI toward preferred behavioral traits rather than mere mimicry.
    
    
- **Major Limitation**
    
    SFT models are entirely bounded by the quality and diversity of their training data. If the fine-tuning dataset contains factual errors, biases, or superficial patterns, the model will faithfully learn to imitate them, often resulting in outputs that _sound_ authoritative and well-formatted while remaining factually incorrect.