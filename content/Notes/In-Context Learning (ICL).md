---
title: In-Context Learning (ICL)
created: 2026-10-10 09:33
tags file:
  - "[[Foundation Model]]"
---
# The Definition (What)

**In-Context Learning (ICL)** is the ability of a pretrained AI model to learn how to perform a task from instructions or examples provided in its input, without updating its model parameters.

# Why It Is Important (Why)

Traditionally, adapting an AI model to a new task often required **fine-tuning**, meaning additional training on task-specific data.

This created several problems:
- **Computational cost:** Updating model parameters requires training resources.
- **Data requirements:** Fine-tuning often needs a dataset of labeled examples.
- **Limited flexibility:** Switching tasks may require different fine-tuned models.

ICL addresses these problems by allowing a model to adapt its behavior directly from the information provided in a prompt.

**Key advantage:** A single pretrained model can perform different tasks simply by changing its input, without additional training.

This is particularly useful for tasks that change frequently, have limited labeled data, or require rapid experimentation.

# How It Works (How)

## Step 1: Provide Task Examples in the Context

ICL begins by placing instructions or examples into the model's input, called the **context**.

For example, suppose we want a language model to classify sentiment.

We provide:

> Review: "The food was amazing."  
> Sentiment: Positive
>
> Review: "The service was terrible."  
> Sentiment: Negative
>
> Review: "I really enjoyed the experience."  
> Sentiment:

Each example demonstrates a relationship between an input and its desired output.

These examples are called **demonstrations**.

The model uses them to infer what task it should perform and how the output should be formatted.

## Step 2: Infer the Pattern from the Examples

The model processes the demonstrations using patterns and capabilities acquired during pretraining.

Conceptually, the task can be represented as:

$$
\hat{y} = f_{\theta}(x \mid D)
$$

Where:
- $x$: The new input to be processed.
- $D = \{(x_1,y_1), \ldots, (x_k,y_k)\}$: The examples provided in the prompt.
- $f_{\theta}$: The pretrained model with fixed parameters $\theta$.
- $\hat{y}$: The model's predicted output.

**Intuition:** Instead of modifying its internal parameters, the model uses the examples in $D$ to determine how it should respond to $x$.

In the sentiment example, it recognizes that the task is to map reviews to sentiment labels.

Importantly, the model's parameters remain unchanged.

## Step 3: Generate an Output Using the Inferred Pattern

After processing the demonstrations, the model predicts the output for the new input.

For a language model, this can be expressed probabilistically:

$$
\hat{y} = \arg\max_y P_{\theta}(y \mid D,x)
$$

Where:
- $P_{\theta}(y \mid D,x)$: The probability of output $y$ given the demonstrations $D$ and new input $x$.
- $\arg\max_y$: Selects the output with the highest probability.

For our example:

> Review: "I really enjoyed the experience."  
> Sentiment: **Positive**

The model produces "Positive" because the demonstrations establish the classification pattern and its pretrained knowledge helps interpret the review.

**Crucially, the adaptation happens through the context, not through parameter updates.**

# Additional Insights

## Direct Comparison

The most important distinction is between **In-Context Learning and Fine-Tuning**.

| Aspect | In-Context Learning | Fine-Tuning |
|---|---|---|
| Adaptation mechanism | Examples provided in the prompt | Additional training |
| Model parameters | Remain unchanged | Updated |
| Computational cost | No additional training cost | Requires training computation |
| Persistence | Task examples must remain available in the context | Adaptation is stored in model parameters |
| Best suited for | Rapid, flexible task adaptation | Repeated or specialized tasks requiring consistent performance |

**Core distinction:** Fine-tuning changes what the model has learned in its parameters, while ICL changes how the model behaves by providing relevant information in its current context.

## Major Limitations

**ICL depends heavily on the quality and relevance of the provided context.**

For example:
- Incorrect demonstrations can lead to incorrect predictions.
- Ambiguous examples can cause the model to infer the wrong task.
- Too many examples may exceed the model's context window (the maximum amount of input it can process at once).

Furthermore, ICL does not guarantee that the model can learn an entirely unfamiliar capability from a few examples.

**Why?** The model primarily relies on capabilities acquired during pretraining to interpret and generalize from the demonstrations.

Consequently, ICL works best when the model already has relevant underlying capabilities and the examples clearly communicate the desired behavior.

## Common Misconceptions

- **"ICL means the model learns new information permanently."**
  - False. The model uses information from the current context without changing its parameters. The adaptation does not automatically persist across independent conversations.

- **"ICL is the same as fine-tuning."**
  - False. ICL conditions the model's predictions on the prompt, while fine-tuning updates its parameters through training.

- **"ICL always requires multiple examples."**
  - False. ICL can involve different prompting approaches:
    - **Zero-shot:** Instructions without demonstrations.
    - **One-shot:** One demonstration.
    - **Few-shot:** Several demonstrations.
  - Few-shot prompting is the most characteristic form of ICL, while zero-shot prompting is often discussed alongside it.

**Key takeaway:** In-Context Learning enables a pretrained model to **adapt its behavior from examples in the prompt without changing its parameters**, making task adaptation fast and flexible.