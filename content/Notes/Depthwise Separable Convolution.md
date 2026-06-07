---
title: "Depthwise Separable Convolution"
create: "2026-06-07 20:05"
tags file:
---
## Concept

The foundational building block of [[MobileNet]]. It replaces standard convolution layers to drastically reduce computational cost and model size. 

Instead of processing spatial features (width/height) and channel features (like Red, Green, Blue) all at once, it breaks the operation into **two distinct steps**:

1. **Depthwise Convolution (Spatial Filtering):**

	- Applies a single filter to each input channel *independently*. 
	
	- Example: The Red, Green, Blue channels get filtered separately. 
	
	- *Result:* 
		- Captures spatial features within channels, but doesn't mix information between channels.

2. **Pointwise Convolution (Channel Mixing):** 

	- Applies a $1 \times 1$ standard convolution across all the channels.
	
	- *Result:* 
		- Merges the separate channel maps together into a single output.


## Why it matters

By splitting the math apart, it achieves an **8x to 9x reduction in computations** compared to traditional convolutions, with only a minimal drop in accuracy. This is what allows deep learning to run smoothly on mobile CPUs.
