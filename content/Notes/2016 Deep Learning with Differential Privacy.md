---
title: 2016 Deep Learning with Differential Privacy
created: 2026-10-05 14:26
tags file:
  - "[[AI Privacy]]"
---
```
We want to train a neural network.
        ↓
But training data is sensitive.
        ↓
What privacy property do we want?
        ↓
Differential Privacy
```

Differential Privacy
$$
\underbrace{P[M(d)\in S]}_{\text{dataset }d} \le \underbrace{e^\epsilon}_{\text{privacy bound}} \underbrace{P[M(d')\in S]}_{\text{adjacent dataset }d'} + \underbrace{\delta}_{\text{small additive slack}}
$$


$$
\epsilon \downarrow,\quad \delta \downarrow \Rightarrow stronger\ privacy
$$



Differentially Private SGD
- clipping
	- controls sensitivity
- noise
	- hides that bounded difference
- Moments Accountant
	- the paper's method for tracking/calculate the accumulated privacy loss over many DP-SGD training steps more tightly than previous accounting approaches.