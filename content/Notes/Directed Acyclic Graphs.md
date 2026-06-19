---
title: "Directed Acyclic Graphs"
created: "2026-06-16 11:56"
tags file:
---
A Directed Acyclic Graph (DAG) is a fundamental data structure and mathematical concept composed of nodes (vertices) and directed edges. The edges have a specific direction, and the edges enforce a one-way progression that never loops back onto itself (no cycles).

Key Characteristics:

- **Directed:** 
	- Edges have a start and an end point, indicating direction (usually represented by an arrow).
- **Acyclic:** 
	- You cannot traverse the graph and return to a previously visited node. There are no closed loops.
- **Topological Ordering:** 
	- DAGs allow nodes to be linearly arranged so that every directed edge goes from an earlier node to a later node in the sequence.