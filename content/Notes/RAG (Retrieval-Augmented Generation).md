---
title: RAG (Retrieval-Augmented Generation)
created: 2026-04-13 15:53
tags file:
  - "[[LLM]]"
---
# 1. What is RAG?

**RAG** stands for **Retrieval-Augmented Generation**

Put simply, it is an AI framework that divides knowledge handling into two main actions

- **Retrieval:** Pulling up relevant matching documents or data fragments from an external repository.
    
- **Generation:** Sending that specific context alongside the user's query into a Large Language Model (LLM) to craft a grounded response.
    

This technology serves as the backbone for most high-quality corporate knowledge bases and intelligent customer service agents

# 2. Why Do We Need It?

When dealing with extensive documentation—such as product manuals spanning hundreds or thousands of pages—dumping the entire raw text directly into an LLM causes severe limitations:

- **[[Context Window]] Limits:** 
	- Models possess a rigid threshold for how much information they can hold at one time. Overloading this window forces the model to forget previous text and degrades accuracy.
    
- **High Inference Costs:** 
	- LLM processing costs scale directly with the amount of input text. Feeding thick text manuals into every single prompt quickly becomes financially unfeasible.
    
- **Sluggish Processing Speeds:** 
	- The larger the body of input data the LLM has to read and digest, the slower the eventual response generation becomes.
    

RAG cleanly bypasses these issues by pulling out only a targeted selection of relevant passages (e.g., 3 key snippets instead of a 1,000-page file) and passing just those fragments to the LLM.

# 3. The RAG Process

The entire technical architecture is split cleanly into two chronological stages: **Before Questioning (Data Preparation)** and **After Questioning (Answering)**. This involves 5 fundamental steps:

## Phase A: Before Questioning (Data Preparation)

- **Chunking:** 
	- Slicing massive files into shorter, digestible snippets. This fragmentation can be handled via fixed character sizes (e.g., 1000 characters), paragraph divisions, structural chapters, or page counts.
    
- **Indexing:** 
	- Processing each text fragment through an **Embedding Model** to convert it into a high-dimensional mathematical vector representing its core semantic meaning. 
	- Both the original text snippet and its corresponding vector are then saved into a specialized [[Vector Database]] for fast retrieval down the line.
    

## Phase B: After Questioning (The Answering Loop)

- **Retrieval:** 
	- Once a user submits a query, it is similarly transformed into a vector by the embedding model. The vector database runs similarity functions to swiftly pick out a rough batch of prospective context candidates, such as the top 10 most relevant fragments.

- **Reranking:** 
	- To ensure maximum precision, those initial candidates are funneled through a highly specialized **Cross-Encoder** model. 
	- This performs a deep evaluation to rank them accurately and narrow down the list to the absolute best matches, typically selecting the top 3 snippets.

- **Generation:** 
	- The system packages the user's original query tightly alongside those refined top 3 fragments and passes them into the LLM. 
	- The model references this customized context window to output a factual, precise answer.
    

# 4. Different Technical Methods

The video highlights distinct mathematical strategies and processing models leveraged at different steps of the pipeline:

## Vector Similarity Calculations (Used in Retrieval)

To figure out how close a document fragment is to a user's intent, vector databases mathematically evaluate spatial proximity using methods like:

- **Cosine Similarity:** 
	- Computes the cosine angle between two vectors; a smaller spatial angle indicates highly related content.
    
- **Euclidean Distance:** 
	- Measures the physical straight-line distance separating two coordinate points; a shorter distance means tighter contextual alignment.
    
- **Dot Product:** 
	- An algebraic calculation that tracks both vector orientation and magnitude; higher positive results signal that the vectors point heavily in the same semantic direction.
    

## Dual-Stage Filtering: Screening vs. Interviewing

The workflow utilizes two distinct types of modeling to balance speed against precision, comparable to a corporate hiring funnel:

- **Vector Search (Resume Screening):** Highly efficient, computationally cheap, and incredibly fast, but yields lower baseline accuracy. It acts like an initial resume screen to whittle thousands of raw documents down to 10 potential fits.
    
- **Cross-Encoder Reranking (Deep Interviewing):** Demands a higher computational cost and takes more processing time, but maintains superior accuracy. It dives deeply into the 10 candidates to screen out noise and select the final 3 winners.


---
# Reference
[RAG 工作机制详解——一个高质量知识库背后的技术全流程](https://www.youtube.com/watch?v=WWdlme1EAGI)
