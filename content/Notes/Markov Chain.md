---
title: "Markov Chain"
created: "2026-06-23 14:42"
tags file:
---
A **Markov chain** is a mathematical system that transitions from one state (a situation or condition) to another according to specific probabilistic rules.

The defining feature of a Markov chain is that it is **memoryless**. This means that the probability of moving to the next state depends _only_ on the current state, and not on the sequence of events that came before it. This behavior is known as the **Markov Property**.

> **The Frog Analogy:** Imagine a frog jumping between lily pads. If the frog is on Lily Pad A, its next jump depends entirely on where Lily Pad A is located and how close the other pads are. It doesn't matter if the frog spent the last hour on Lily Pad B, C, or D; its immediate future move is determined solely by its present location.

## Core Components of a Markov Chain

To build or understand a Markov chain, you need three main pieces:

- **States ($S$):** The distinct conditions or scenarios the system can be in. For example, if you are modeling the weather, your states might be `[Sunny, Rainy, Cloudy]`.
    
- **Transition Probabilities:** The likelihood of moving from one state to another. For instance, if it is `Sunny` today, there might be a 70% chance it stays `Sunny` tomorrow and a 30% chance it becomes `Rainy`.
    
- **Transition Matrix ($P$):** A table or matrix that neatly organizes all these transition probabilities. Every row in the matrix must sum up to 1 (or 100%), because the system _has_ to transition to something next.
    

## A Simple Example: The Weather

Let's look at a basic two-state Markov chain for the weather with two states: **Sunny** and **Rainy**.

- If today is **Sunny**:
    
    - 80% chance tomorrow is Sunny.
        
    - 20% chance tomorrow is Rainy.
        
- If today is **Rainy**:
    
    - 40% chance tomorrow is Sunny.
        
    - 60% chance tomorrow is Rainy.
        

This system can be written as a **Transition Matrix**:

|-|**Tomorrow Sunny**|**Tomorrow Rainy**|
|---|---|---|
|**Today Sunny**|0.8|0.2|
|**Today Rainy**|0.4|0.6|

If you want to know the weather two days from now, you can multiply this matrix by itself. Because it only cares about the present state, calculating long-term probabilities becomes a straightforward matrix algebra problem.

## Real-World Applications

Because they simplify complex systems by ignoring unnecessary history, Markov chains are incredibly powerful and widely used:

- **Google's PageRank:** The original algorithm behind Google Search treated the entire internet as a massive Markov chain. Each webpage was a state, and links between pages were the transitions.
    
- **Text Prediction:** The predictive text on your smartphone keyboard uses a basic Markov chain to guess the next word based on the word you just typed.
    
- **Finance:** Analysts use them to model stock market regimes (e.g., transitioning between a Bull market, Bear market, and Stagnant market) to predict future market behaviors.
    
- **Genetics:** Scientists use them to model how DNA sequences mutate over generations.
    

## The Mathematical Definition

For a sequence of random variables $X_1, X_2, X_3, \dots, X_n$, the Markov property is formally expressed as:

$$P(X_{n+1} = x \mid X_1 = x_1, X_2 = x_2, \dots, X_n = x_n) = P(X_{n+1} = x \mid X_n = x_n)$$

This equation states that the conditional probability of the future state ($X_{n+1}$), given all past states and the current state ($X_n$), depends entirely and exclusively on the current state ($X_n$).