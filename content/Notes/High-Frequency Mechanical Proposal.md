---
title: High-Frequency Mechanical Proposal
created: 2026-05-23 10:33
tags file:
  - "[[Flow Matching]]"
  - "[[2025 FLOW MATCHING WITH GAUSSIAN PROCESS PRIORS FOR PROBABILISTIC TIME SERIES FORECASTING]]"
---
- Abstract:
	- Contextualizing high-frequency mechanical vibration prediction as a proxy for laser beam stabilization.
- Introduction
	- objective
		- research questions
			- How does the predictive performance of TimesNet compare to Flow Matching in non-stationary vibration regimes?
			- What are the physical and computational limits of long-term vibration forecasting at high sampling rates?
			- Can we empirically verify the cubic scaling bottleneck of Gaussian Process priors when applied to high-frequency time series?
	- state of the art
		- **CNN-based Methods:**
    
		    - CNNs are highly effective for extracting local temporal or spatial patterns from vibration data, often by transforming raw signals into scalograms or other time-frequency representations (He et al., 2022; MDPI, 2026).
		        
		    - **Refinement:** While strong for fixed-window inference, their performance in non-stationary environments is often bolstered by residual connections (SPIE, 2026).
        
		- **RNN-based Methods (LSTM/GRU):**
		    
		    - RNNs are classical choices for modeling sequential dependencies but are indeed constrained by their inherently sequential computational nature, which often creates latency bottlenecks (Taylor & Francis, 2026).
		        
		- **MLP-based Models:**
		    
		    - While simple MLPs are efficient, they lack the structural inductive bias for capturing long-range temporal correlations in raw high-frequency signals. However, when paired with sophisticated signal processing (e.g., matrix pencil features), they can achieve high performance (PMC, 2026).
		        
		- **GNN-based Models:**
		    
		    - GNNs are uniquely suited for multi-sensor setups where the physical or statistical relationships between different machine components (nodes) need to be captured (He et al., 2022). Their overhead is often unnecessary for simple, isolated sensor channels.
		        
		- **Transformer-based Models:**
		    
		    - They excel at long-range dependency modeling. However, their quadratic complexity regarding sequence length makes them computationally heavy, which is a known challenge for strict, real-time industrial deployment (Taylor & Francis, 2026).
		        
		- **Diffusion, Flow Matching, and Hybrid Pipelines:**
		    - These are emerging as the cutting edge of generative time-series modeling. Diffusion and flow-matching models are gaining traction for their ability to model complex, multi-modal distributions in temporal sequences, which is superior to standard point-prediction methods (Preprints.org, 2026).
		    - Although diffusion models are stable and expressive, sampling usually requires many iterative denoising steps. This can be problematic for time-critical forecasting and control applications.
	- our approach
- theoretical background
	- timesnet
	- flow matching with gaussian process priors
- method
	- dataset selection
		- Justification for discarding VBL/SUBF based on DC/low-frequency bias.
			- transform all of the signals in datasets(VBL/SUBF/CWRU/Ottawa) into frequency domain by FFT and calculate the accumulation and plot the frequency distribution of all datasets together by normalization
			- 
			- To identify a representative proxy for non-stationary mechanical noise in optical systems, we conducted a comparative spectral analysis across candidate datasets (VBL, SUBF, CWRU, and Ottawa). 
			- Each signal was transformed into the frequency domain via Fast Fourier Transform (FFT). To ensure comparability, spectral amplitudes were normalized, and group-level accumulations were plotted to visualize the energy distribution across the frequency spectrum. 
				- For each signal $x_i(t)$ in a dataset:

				- **Windowing:** Apply a window function (e.g., Hann) to prevent spectral leakage.
				    
				- **FFT Computation:** Calculate the discrete Fourier transform $X_i(f) = \text{FFT}(x_i(t))$.
				    
				- **Energy Normalization:** Normalize each spectrum by its total energy to ensure each signal contributes equally to the dataset's average:
				    $$S_i(f) = \frac{|X_i(f)|^2}{\sum_{f} |X_i(f)|^2}$$
				    
				- **Averaging:** The dataset-level distribution is the mean across all $N$ signals in that dataset:
				    $$\bar{S}(f) = \frac{1}{N} \sum_{i=1}^{N} S_i(f)$$
			- This analysis revealed that the VBL and SUBF datasets are heavily concentrated near the zero-frequency (DC) region, with the vast majority of spectral energy confined to low-frequency bands. 
			- This characteristic biases predictive models toward learning slow-timescale trends rather than the high-frequency structural perturbations critical to laser beam instability. Consequently, VBL and SUBF were discarded in favor of the CWRU dataset, which exhibits a more representative distribution of high-frequency vibrational energy consistent with industrial mechanical resonance.
	    - Comparative analysis of **CWRU** (Stationary High-Frequency) vs. **Ottawa** (Non-Stationary High-Frequency).
		    - The selected datasets represent two complementary regimes. 
		    - The CWRU bearing dataset is treated as a stationary high-frequency benchmark, where vibration patterns are comparatively regular and suitable for controlled model comparison. 
		    - The Ottawa dataset is treated as a non-stationary high-frequency benchmark, where transient behavior and changing operating conditions provide a more challenging forecasting scenario.
		    - This contrast supports a more rigorous evaluation: a model that performs well only on CWRU may be exploiting stationary structure, whereas robust performance on Ottawa would indicate stronger generalization to realistic non-stationary disturbances.
		- Deep learning architectures
			- **Baseline:** TimesNet (Temporal 2D-Variation modeling via FFT).
		    - **Proposed:** Flow Matching with Gaussian Process Priors (leveraging continuous temporal paths).
        
- **Deep Learning Architectures:**
    
    - **Baseline:** TimesNet (Temporal 2D-Variation modeling via FFT).
        
    - **Proposed:** Flow Matching with Gaussian Process Priors (leveraging continuous temporal paths).
        
- **Rigorous Experimental Framework:**
    
    - The streamlined 2x2 matrix (TimesNet vs. Flow Matching across CWRU and Ottawa).
        
    - Protocol for the **Lookback vs. Horizon Sensitivity Sweep** to map out forecast degradation.
	    - Lookback Window (L): Input sequence length for the models.
	    - Prediction Horizon (H): The duration into the future the models forecast.
        
    - Framework for measuring empirical training time to evaluate the $O(N^3)$ GP complexity vs. downsampled sequence lengths.

- experiments and results
	- All experiments utilize a fixed temporal grid (∆t = 1μs). We use Mean Absolute Error (MAE) as the primary evaluation metric to assess the predictive accuracy of the models.
	- For Flow Matching, we specifically monitor training time as a function of the lookback window to map the empirical computational cost versus the theoretical O(N^3) scaling
- discussion
---

## The Dataset Mismatch: Why CWRU Fails

The Case Western Reserve University (CWRU) bearing dataset is a gold standard for _fault classification and anomaly detection_, but it is a highly problematic choice for _generative probabilistic time-series forecasting_ using Flow Matching.

### High Frequency vs. GP Scalability

CWRU data consists of raw accelerometer vibrations sampled at 12 kHz or 48 kHz.

- [[Gaussian Processes (GPs) scale cubically]] ($O(N^3)$) with the number of time steps $N$. Even with sparse GP approximations, handling thousands of high-frequency time steps becomes computationally brutal.
    
- [[Flow Matching optimization trap]]
	- Flow matching requires learning a vector field to transport a prior distribution to the target data distribution. Trying to flow-match a raw, highly oscillatory 12 kHz wave point-by-point will likely lead to massive optimization instability or mode collapse.

