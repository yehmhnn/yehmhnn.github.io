2026-04-28 14:19
Tags: 

Title: 
Authors: Robin M. Schmidt, Frank Schneider, Philipp Hennig
Year: 2021
Journal/Conference: ICML (International Conference on Machine Learning)
***
# Abstract
What are the main takeaways, answers to research questions, or new findings?

we contribute the following three points: 
(i) Optimizer performance varies greatly across tasks. 
(ii) We observe that evaluating multiple optimizers with default parameters works approximately as well as tuning the hyperparameters of a single, fixed optimizer. 
(iii) While we cannot discern an optimization method clearly dominating across all tested tasks, we identify a significantly reduced subset of specific optimizers and parameter choices that generally lead to competitive results in our experiments: Adam remains a strong contender, with newer methods failing to significantly and consistently outperform it.
# Motivation
What problem does the paper address and why is it important?

- **The "Crowded Valley":** Hundreds of optimizers are published every year, each claiming to be superior on specific benchmarks.
    
- **Lack of Standardization:** Most optimizer papers tune their own method extensively while comparing it against poorly tuned baselines.
    
- **Computational Cost:** Practitioners often don't know if they should spend their budget tuning one optimizer or trying many different ones.

# Related Work

- **DeepOBS:** The authors utilize this standardized benchmarking framework to ensure comparisons are fair and reproducible.
    
- **Hyperparameter Optimization (HPO):** Built on the idea that the "quality" of an optimizer is inextricably linked to its sensitivity to hyperparameter tuning.

# Method
How did the authors conduct the research (e.g., experiments, case studies)?

- **15 Optimizers:** Included classics (SGD, Momentum, Adam) and newer contenders (Adabound, AMSGrad, Radam, etc.).
    
- **8 Diverse Tasks:** Ranging from simple CNNs on MNIST/CIFAR to VAEs and RNNs (e.g., character prediction on "War and Peace").
    
- **Tuning Protocol:** They compared two strategies:
    
    - **Tuning:** Extensive random search for the best hyperparameters for a single optimizer.
        
    - **Defaults:** Running multiple different optimizers using their "out-of-the-box" default settings.
        
- **Scale:** Over 50,000 runs to ensure statistical significance, documenting the distribution of final performance.

# Conclusion
Strengths/weaknesses, how it compares to other work, and relevance to your own research.

# Future Work
What questions remain unanswered?
