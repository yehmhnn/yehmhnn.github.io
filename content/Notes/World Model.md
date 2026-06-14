---
title: World Model
created: 2026-06-13 20:22
tags file:
  - "[[Table Talk]]"
---
At its most fundamental level, a **World Model** is an AI’s internal understanding of physical reality. It’s the computational equivalent of "common sense"—knowing that if you drop a glass, it will fall and shatter; or if a car drives behind a bus, it hasn't ceased to exist.

## 1. The Anatomy (Foundations & First Principles)

- **Foundational Axioms:** 
	- The bedrock agreement across the entire field is that **Large Language Models (LLMs) are structurally blind to physical reality.** Text alone cannot teach an AI geometry, gravity, or spatial awareness. To achieve true autonomy (like autonomous driving or robotics), an AI must possess an internal simulator of the physical world.
    
    - _What if this is wrong?_ If the "scale maximalists" are right, and simply scaling next-token text/multimodal transformers _implicitly_ forces the AI to understand perfect physics anyway, then building dedicated world models is an expensive, over-engineered detour.
        
- **The Core Problem:** 
	- Moving AI from _statistical correlation_ (predicting the next most likely word or pixel) to _causal understanding_ (predicting the actual physical consequence of an action).
    
- **The Historical Catalyst:** 
	- The explosion of video generation models (like OpenAI's Sora) and the push for physical robotics. When video models started generating highly realistic movements, it sparked a crisis of definition: _Is the AI just painting pretty pixels, or does it actually understand the physics of the scene?_
    

## 2. The Ecosystem (Mechanics & Dynamics)

|**Dimension**|**The Latent Purist(Yann LeCun / Meta Lineage)**|**The Video Scale Maximalist(Jim Fan / NVIDIA)**|**The Spatial Grounder(Fei-Fei Li / World Labs)**|
|---|---|---|---|
|**The Bet**|Work strictly in **latent space** (abstract concepts). Ignore fine visual details.|**Generative video** _is_ the simulator. Scale it until it perfectly mimics reality.|**Simulation is the bridge.** Unify planning, rendering, and 3D geometry.|
|**Primary Tool**|Joint Embedding Predictive Architecture (V-JEPA 2).|Mixture-of-Transformers (Cosmos 3).|3D Gaussian Splatting + Collision Meshes (Marble).|
|**Success Metric**|Planning efficiency and conceptual accuracy.|Visual fidelity and next-frame physics prediction.|Geometric verifiability and 3D precision.|

- **Gatekeepers vs. Contrarians:** 
	- Jim Fan (NVIDIA) represents the mainstream corporate roadmap: pour massive compute into video transformers to build a digital twin of the world. 
	- Yann LeCun is the ultimate contrarian, loudly calling NVIDIA's pixel-prediction roadmap a "dead end." 
	- Fei-Fei Li stands as a pragmatic bridge, insisting that we can use pixels, but _only_ if they are anchored to explicit 3D math (geometry).
    

## 3. The Friction (Debates & Limitations)

> **The Fierce Internal Debate: To Predict Pixels or Not?**
> 
> This is the late-night argument fracturing the field.

- **LeCun’s Argument:** 
	- If an AI tries to predict every single pixel of a tree blowing in the wind, it wastes 99% of its compute on irrelevant details. It should only model the _abstract concept_ (e.g., "the tree is blocking the road").
    
- **Fan’s Argument:** 
	- Predicting pixels at massive scale is the only way to capture the messy, infinite nuances of real-world physics. Scale will smooth out the noise.
    
- **Li’s Argument:** 
	- Pure video simulation hallucinates and cheats. You need explicit, checkable 3D geometry (like collision meshes) so the AI can mathematically verify that two objects aren't clipping through each other.
    
- **The Shadow (Blind Spots):** 
	- Video simulators (NVIDIA) suffer from "hallucinated physics" where objects randomly morph or vanish. 
	- Latent models (Meta) are incredibly difficult to interpret or "look inside" because they don't render visual outputs. 
	- Geometric models (World Labs) are highly complex and difficult to scale seamlessly to open, unpredictable environments.
    

## 4. The Frontier (Future & Evolution)

- **Where the "Puck" is Moving:** 
	- The smartest minds are migrating toward **Embodied AI**. 
	- The ultimate goal isn't just to have an AI look at a video, but to have a robot use these world models to navigate a physical kitchen or factory floor.
    
- **Adjacent Disruptions:** 
	- The collision of **Hollywood Special Effects (Computer Graphics/Gaming Engines)** and AI. Technologies like Unreal Engine, NeRFs, and 3D Gaussian Splatting are no longer just for video games—they are becoming the training grounds and architectural skeletons for the next generation of AI world models.
    