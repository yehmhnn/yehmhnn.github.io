2026-04-28 15:35
Tags: 
***
In the context of optimization, a **convex function** is the "ideal" scenario.

- **The Shape:** If you draw a line between any two points on the graph of the function, that line segment will sit **above** or on the graph. It looks like a simple, smooth bowl.
    
- **The Benefit:** A convex function has **only one minimum** (the bottom of the bowl). This means no matter where you start, the optimizer will always find the same global best solution.
    
- **The Reality:** Deep learning models (like your TCNs or Flow Matching models) are **non-convex**. They look like a mountain range with thousands of peaks and valleys. This is why "seeds" matter so much—if you start in the wrong valley, you get stuck there.


---
# Reference
