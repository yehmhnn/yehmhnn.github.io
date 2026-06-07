2026-04-13 15:49
Tags: 
***
3 types:
1. **Context-Memory Conflict** 
	- This occurs when external information provided to the model (context) contradicts the information the model learned during its training phase (parametric memory). 
	- For example, a user provides a recent news article that differs from the AI’s older, pre-trained knowledge.
2. Inter-Context Conflict
	- This happens when multiple external sources or retrieved documents contradict each other. 
	- The model receives conflicting information within the same prompt or [[RAG (Retrieval-Augmented Generation)]] context.
	- Main research question:
		- When faced with several retrieved evidence passages with knowledge conflicts, which evidence will convince the language models?
3. Intra-Memory Conflict
	- This arises when an LLM's own internal training data contains inconsistencies, leading it to have contradictory "beliefs" embedded within its parameters. 
	- The model may give different answers to similarly phrased questions based on which part of its internal knowledge it accesses.

Extra: Multimodal knowledge conflicts


---
# Reference
