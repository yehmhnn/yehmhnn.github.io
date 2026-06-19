---
title: "Agentic Design Patterns"
created: "2026-06-18 22:28"
tags file:
---
This is a practical book authored by Antonio Gulli, a veteran tech leader at Google, who released it as a 424-page engineering guide covering practical patterns across frameworks like LangGraph, CrewAI, and Google ADK. 

I am creating this Map of Content (MOC) to break down the text's 21 core patterns into atomic notes so I can easily digest the architectural layout of modern intelligent systems.

---
### Part One: Core Orchestration Foundations

- **[[Prompt Chaining]]**
    
    > _Atomic Concept:_ Breaking a massive macro-task into a linear sequence of smaller prompts, where the discrete output of Task A dynamically serves as the direct contextual input for Task B.
    
- **[[Routing]]**
    
    > _Atomic Concept:_ Utilizing an LLM classifier or semantic logic to analyze incoming user intent and dynamically direct the request down the most optimal processing path or specialized model.
    
- **[[Parallelization]]**
    
    > _Atomic Concept:_ Forking a workflow into multiple simultaneous LLM executions (either _Sectioning_ independent components or _Voting_ for consensus) and aggregating the results into a single payload.
    
- **[[Reflection]]**
    
    > _Atomic Concept:_ Designing a closed-loop system where an initial LLM output is structurally evaluated by a critic agent (or self-critiqued) against quality parameters, driving automated refinement cycles before user delivery.
    
- **[[Tool Use]]**
    
    > _Atomic Concept:_ Empowering language models to recognize when they lack capability or data, enabling them to safely execute sandboxed code, interact with web browsers, or trigger external APIs.
    
- **[[Planning]]**
    
    > _Atomic Concept:_ Orchestrating an initial "thinking" phase where the system uses task decomposition to map out a sequence of goals, tracks milestones, and dynamically adjusts the timeline when roadblocks occur.
    
- **[[Multi-Agent Collaboration]]**
    
    > _Atomic Concept:_ Splitting complex operations across an ecosystem of separate, specialized persona agents (e.g., Writer, Fact-Checker, Developer) who collaborate through defined workflows.
    

### Part Two: Memory, Adaptation & Protocols

- **[[Memory Management]]**
    
    > _Atomic Concept:_ Architecting agent states into short-term (in-flight conversation buffers) and long-term storage (semantic vectors or episodic records) to preserve persistence across sessions.
    
- **[[Learning and Adaptation]]**
    
    > _Atomic Concept:_ Designing systems that analyze historical run logs and downstream execution failures to automatically optimize future agent prompt logic or tool parameters.
    
- **[[Model Context Protocol (MCP)]]**
    
    > _Atomic Concept:_ Implementing the open-source architecture standard that provides a clean, universal contract for securely connecting AI agents to disparate, heterogeneous enterprise data tools.
    
- **[[Goal Setting and Monitoring]]**
    
    > _Atomic Concept:_ Feeding high-level boundaries and semantic intents to an agent while maintaining external programmatic loops to verify that autonomous drift does not decouple from the root objective.
    

### Part Three: Resilience & Knowledge Integration

- **[[Exception Handling and Recovery]]**
    
    > _Atomic Concept:_ Mitigating upstream API rate limits, parsing glitches, or model hallucinations through graceful fallback loops, self-healing code checks, or default backup models.
    
- **[[Human-in-the-Loop (HITL)]]**
    
    > _Atomic Concept:_ Establishing clear gating conditions where an agent pauses execution and waits for manual human verification, feedback, or approval for high-risk operations.
    
- **[[Knowledge Retrieval (RAG)]]**
    
    > _Atomic Concept:_ Augmenting agent context by semantically indexing, fetching, and embedding domain-specific documentation to ground the model’s reasoning in factual, real-time ground truth.
    

### Part Four: Advanced Enterprise Operations

- **[[Inter-Agent Communication (A2A)]]**
    
    > _Atomic Concept:_ Standardizing the semantic payload syntax, messaging queues, and metadata formats that allow multi-vendor or cross-system agents to securely negotiate and trade data.
    
- **[[Resource-Aware Optimization]]**
    
    > _Atomic Concept:_ Managing infrastructure overhead by dynamically compressing history windows, restricting max execution hops, and routing basic tasks to smaller, highly efficient models.
    
- **[[Reasoning Techniques]]**
    
    > _Atomic Concept:_ Overcoming simple next-token generation limitations by enforcing structural thinking graphs, such as Chain-of-Thought (CoT), Tree-of-Thought (ToT), or explicit scratchpads.
    
- **[[Guardrails and Safety Patterns]]**
    
    > _Atomic Concept:_ Enforcing rigid input/output screening layers to block prompt injection, eliminate toxic vectors, prevent sensitive data leaks, and ensure systemic safety alignment.
    
- **[[Evaluation and Monitoring]]**
    
    > _Atomic Concept:_ Instrumenting complete trace visibility into agent runs to evaluate operational latency, accuracy drift, and cost efficiency using automated LLM-as-a-judge patterns.
    
- **[[Prioritization]]**
    
    > _Atomic Concept:_ Triage orchestration where concurrent agent requests are ranked and queued based on algorithmic urgency, token caps, and system compute allocation.
    
- **[[Exploration and Discovery]]**
    
    > _Atomic Concept:_ Giving agents bounded autonomy to scan unmapped API spaces or run algorithmic trials to identify solutions without requiring rigid, step-by-step human prompts.