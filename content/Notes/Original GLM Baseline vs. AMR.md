---
title: "Original GLM Baseline vs. AMR"
created: "2026-06-25 19:58"
tags file:
---
Imagine we want the model to predict the missing relationship between **Marie Curie** and **Radium** based on this sentence:

_"Marie Curie discovered radium, which earned her a Nobel Prize."_

## 1. The Standard-Text Method (Original GLM Baseline)

In the original GLM setup, the model receives the raw, sequential natural language string directly alongside the query.

### What the Model Sees:

- **Input Part 1 (Context):** `"Marie Curie discovered radium, which earned her a Nobel Prize."`
    
- **Input Part 2 (Query Triplet):** `["Marie Curie", "<mask>", "radium"]`
    

### How the Model Processes It:

The T5 language model has to read the words in a linear sequence, handle the punctuation, figure out that "which" refers back to the discovery, and understand that "earned her" is extra context. It relies heavily on its pre-trained linguistic knowledge to guess that the `<mask>` should be `discovered` or `founder`.

## 2. The AMR-Graph Method

Completely throw away the raw text string. Instead, we pass the text through an AMR parser to extract a structural semantic graph of "who did what to whom," disambiguate the terms using external Knowledge Graphs, and linearize it into triples.

### What the Model Sees:

- **Input Part 1 (Context):** A list of explicit semantic triples like this:
    
    JSON
    
    ```
    [
      ["pb:discover-01", "pb:ARG0", "wd:Q13513"], 
      ["pb:discover-01", "pb:ARG1", "wd:Q1128"],
      ["pb:earn-01", "pb:ARG0", "pb:discover-01"],
      ["pb:earn-01", "pb:ARG1", "wd:Q38104"],
      ["pb:earn-01", "pb:ARG2", "wd:Q13513"],
      ["wd:Q13513", "label", "Marie Curie"],
      ["wd:Q1128", "label", "radium"],
      ["wd:Q38104", "label", "Nobel Prize"]
    ]
    ```
**PropBank** (`pb:`), **Wikidata** (`wd:`) ([[AMR example]])

- **Input Part 2 (Query Triplet):** `["Marie Curie", "<mask>", "radium"]`
    

### How the Model Processes It:

The modified graph-aware T5 attention mechanism doesn't have to guess how words connect grammatically. It is handed an explicit structural map:

1. There is a discovery action (`pb:discover-01`).
    
2. The person doing it (`ARG0`) is the Wikidata entity for Marie Curie (`wd:Q13513`).
    
3. The thing being discovered (`ARG1`) is the Wikidata entity for radium (`wd:Q1128`).
    

The model looks directly at the structural node connections to bridge the query gap and predict the target label (`discover`).