---
title: "AMR examples"
created: "2026-06-25 20:21"
tags file:
---
Imagine we want the model to predict the missing relationship between **Marie Curie** and **Radium** based on this sentence:
_"Marie Curie discovered radium, which earned her a Nobel Prize."_

This block of data is a list of **knowledge triples**. Every single line follows a strict three-part format: `[Subject, Relationship, Object]`.

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

**PropBank** (`pb:`) and **Wikidata** (`wd:`). Here is exactly how to read it.

## 1. Decoding the Prefixes

### The `pb:` Prefix (PropBank)

PropBank is a dictionary of word meanings that assigns numbered "roles" to actions so there is no ambiguity.

- **`pb:discover-01`**: This means the specific sense of the verb "to discover".
    
- **`pb:ARG0`**: In PropBank, `ARG0` is strictly the **doer** of the action (the discoverer).
    
- **`pb:ARG1`**: This is the **thing being acted upon** (the thing discovered).
    

### The `wd:` Prefix (Wikidata)

Instead of using English words (which can have typos or multiple meanings), your pipeline looked up entities on Wikidata to find their unique internet ID numbers.

- **`wd:Q13513`** is the permanent database ID for Marie Curie.
    
- **`wd:Q1128`** is the database ID for Radium.
    

## 2. Line-by-Line Translation

Let's translate that exact JSON block into plain English:

### The Discovery Event

- `["pb:discover-01", "pb:ARG0", "wd:Q13513"]`
    
    - _Translation:_ There is a discovery action, and the person who did it (`ARG0`) is Marie Curie (`wd:Q13513`).
        
- `["pb:discover-01", "pb:ARG1", "wd:Q1128"]`
    
    - _Translation:_ The thing that was discovered (`ARG1`) is Radium (`wd:Q1128`).
        

### The Earning Event

- `["pb:earn-01", "pb:ARG0", "pb:discover-01"]`
    
    - _Translation:_ There is an earning action. The thing that did the earning (`ARG0`) was the _entire discovery event itself_.
        
- `["pb:earn-01", "pb:ARG1", "wd:Q38104"]`
    
    - _Translation:_ The thing that was earned (`ARG1`) is a Nobel Prize (`wd:Q38104`).
        
- `["pb:earn-01", "pb:ARG2", "wd:Q13513"]`
    
    - _Translation:_ The person who received the prize (`ARG2`) is Marie Curie (`wd:Q13513`).
        

### The ID Dictionary

- `["wd:Q13513", "label", "Marie Curie"]`
    
- `["wd:Q1128", "label", "radium"]`
    
- `["wd:Q38104", "label", "Nobel Prize"]`
    
    - _Translation:_ These final lines tell the model exactly what text labels belong to those ID numbers so it can map the graph nodes back to real words.
        