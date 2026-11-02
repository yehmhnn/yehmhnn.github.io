---
title: "2021 MLPerf Tiny Benchmark"
created: "2026-10-22 15:40"
tags file:
---
# Paper at a Glance

- **Paper:** MLPerf Tiny Benchmark — Banbury et al., NeurIPS 2021 (Datasets and Benchmarks).
- **Source:** https://arxiv.org/abs/2106.07597
- **Code:** https://github.com/mlcommons/tiny
- **Focus:** Tiny Machine Learning (TinyML), embedded inference, benchmarking, energy efficiency.

- **The 12-Year-Old Explanation:**
  - Imagine putting a tiny artificial brain inside a watch, camera, or sensor.
  - Different companies build these tiny brains, but it's hard to know which one is actually better.
    - One might answer faster.
    - Another might use less battery.
    - Another might make fewer mistakes.
  - The researchers created a shared set of tests that everyone can run.
  - By giving devices the same challenges and measuring how fast, accurately, and efficiently they respond, we can compare them more fairly.
  - **The paper is about building a fair competition for tiny intelligent devices, not inventing a new artificial brain.**

- **The Problem:**
  - There was no widely accepted, reproducible benchmark for comparing machine learning inference on extremely resource-constrained devices.
  - Existing benchmarks either:
    - Used models too large for microcontrollers.
    - Failed to capture realistic ML workloads.
    - Did not adequately measure energy consumption.
    - Could not accommodate diverse hardware and software stacks.
  - Consequently, comparing TinyML systems and measuring progress was difficult.

- **The Core Idea:**
  - Standardize the **tasks, measurement methodology, and comparison rules**, without forcing every system to use the same implementation.
  - Combine:
    - Four representative TinyML workloads.
    - Accuracy requirements.
    - Latency and energy measurements.
    - Modular reference implementations.
    - Two evaluation divisions balancing fairness and flexibility.

- **Why It Matters:**
  - TinyML enables intelligence directly on low-power devices without depending on cloud servers.
    - Lower communication energy.
    - Reduced response latency.
    - Better privacy and offline operation.
    - Potential for always-on battery-powered applications.
  - A common benchmark helps researchers identify whether improvements come from hardware, model optimizations, or inference software.
  - It also enables more meaningful hardware selection and progress tracking.

- **The Main Contribution:**
  - An early industry-standard, open-source TinyML benchmark suite developed through collaboration among more than 50 organizations.
  - The novelty is **benchmark-system design**, not a new neural-network architecture.
  - Particularly important:
    - Standardizing inference energy alongside performance and accuracy.
    - Supporting heterogeneous systems through a modular benchmarking framework.
    - Introducing closed and open divisions to balance direct comparability with innovation.
    - Providing reproducible reference workloads and an initial collection of real submissions.

# Prerequisite Knowledge

- **1. TinyML and Edge Inference**
  - **Definition:**
    - TinyML means executing machine learning models on extremely constrained hardware, such as microcontrollers or dedicated low-power accelerators.
    - Inference means using an already trained model to generate predictions.
    - Edge inference performs predictions locally rather than sending data to a cloud server.
  - **Relevance:**
    - Tiny devices have limited memory, computational power, and energy budgets.
    - These constraints fundamentally determine what can be benchmarked.
    - The paper measures inference, not training.

- **2. Microcontrollers (MCUs) and Hardware Accelerators**
  - **Definition:**
    - An MCU is a small computer integrating a processor, memory, and peripheral interfaces.
    - An accelerator is specialized hardware designed to execute certain operations, such as neural-network computations, efficiently.
  - **Relevance:**
    - TinyML hardware is highly heterogeneous.
    - Different devices may have different instruction sets, memory organizations, runtimes, and specialized processing units.
    - A benchmark tied to one implementation would unfairly penalize other architectures.

- **3. The ML Deployment Stack**
  - **Definition:**
    - The layers involved in taking a trained model and executing it on hardware:
      - Model architecture and weights.
      - Quantization and other transformations.
      - Compiler.
      - Inference runtime.
      - Computational kernels.
      - Processor and accelerator hardware.
  - **Relevance:**
    - Performance depends on the entire stack, not just the processor.
    - The authors design their benchmark so that improvements at different layers can be demonstrated.
    - **Figure 1** illustrates this diversity.

- **4. Quantization**
  - **Definition:**
    - Representing model weights and/or activations using fewer bits.
    - Example: replacing 32-bit floating-point values with 8-bit integers.
    - This reduces memory requirements and can accelerate computation, potentially changing prediction accuracy.
  - **Relevance:**
    - Memory and energy constraints make quantization especially important in TinyML.
    - Closed-division submissions may use post-training quantization, but cannot retrain or replace model weights.
    - Quantization is one of the main tradeoffs the benchmark must accommodate.

- **5. Latency, Throughput, Power, and Energy**
  - **Definition:**
    - Latency: time required to perform one inference.
    - Throughput: number of inferences performed per second (IPS).
    - Power: energy consumption per unit of time, measured in watts.
    - Energy per inference: energy consumed to produce one prediction, measured in joules.
  - **Key relationships:**
    - For repeated, sequential inference:
      - $IPS \approx 1/t_{\mathrm{inference}}$
    - Average energy per inference:
      - $E_{\mathrm{inference}} = E_{\mathrm{measured}}/N_{\mathrm{inferences}}$
    - Energy is related to power:
      - $E = \int P(t)\,dt$
  - **Relevance:**
    - Faster devices are not necessarily more energy-efficient.
    - A higher clock frequency may reduce latency while increasing power.
    - MLPerf Tiny reports performance and energy separately rather than assuming one represents the other.

- **6. Accuracy, Quality Targets, and AUC-ROC**
  - **Definition:**
    - Top-1 accuracy: fraction of examples where the highest-scoring predicted class is correct.
    - AUC-ROC: measures how well a model ranks anomalous examples above normal ones across different decision thresholds.
    - A quality target is a minimum acceptable predictive-performance requirement.
  - **Relevance:**
    - A device could appear extremely efficient by sacrificing prediction quality.
    - Quality targets prevent such degraded implementations from being treated as valid comparable closed-division results.
    - Classification tasks use Top-1 accuracy; anomaly detection uses AUC-ROC.

- **7. Benchmark Harness and Device Under Test (DUT)**
  - **Definition:**
    - A benchmark harness is the software and measurement infrastructure that provides inputs, controls execution, and records results.
    - The DUT is the actual hardware/software system being evaluated.
  - **Relevance:**
    - Microcontrollers often cannot run conventional desktop-style testing infrastructure.
    - MLPerf Tiny therefore uses an external host and a small device-side interface.
    - External energy-measurement equipment supports power profiling.
    - **Figure 3** shows the measurement configurations.

- **8. Closed vs. Open Benchmark Divisions**
  - **Definition:**
    - Closed division: fixes key workload characteristics to enable controlled comparisons.
    - Open division: permits broader model and implementation changes to demonstrate innovation.
  - **Relevance:**
    - This distinction is essential to understanding the benchmark's fairness.
    - Closed results offer stronger comparability.
    - Open results reveal design possibilities but are less directly comparable.
    - **Figure 2** is the central illustration.

# Motivation & Related Work

- **The Status Quo:**
  - Researchers previously relied on benchmarks targeting different aspects of computing:
    - **CoreMark:** Evaluates general microcontroller computational performance, but not realistic neural-network inference.
    - **EEMBC MLMark:** Uses ML inference workloads, but models and memory demands are too large for many TinyML devices.
    - **MLPerf Inference:** Standardizes inference benchmarking on more capable systems, but its original workloads and implementations were unsuitable for tiny hardware.
  - See **Section 3 and Table 1**.

- **The Specific Bottleneck:**
  - TinyML systems introduce four major benchmarking challenges (**Section 2**):
    - **Low power:** Energy measurements must remain accurate across very different power levels.
    - **Limited memory:** Large models and heavyweight benchmarking software cannot fit.
    - **Hardware heterogeneity:** Devices can differ radically in computing architecture and interfaces.
    - **Software heterogeneity:** Hardware-specific compilers and runtimes strongly affect performance.
  - The central dilemma:
    - Too much standardization prevents systems from using their best optimizations.
    - Too much flexibility makes results difficult to compare.
  - Existing benchmarks did not adequately resolve this dilemma for TinyML.

- **The Authors' Key Observation:**
  - TinyML performance is a **system-level property** produced by interactions between models, software, and hardware.
  - Therefore, meaningful evaluation requires both:
    - Representative workloads and controlled measurement conditions.
    - Freedom to optimize the relevant parts of the deployment stack.
  - No single performance number or rigid implementation adequately captures this.

- **The Conceptual Shift:**
  - **Previous approach:**
    - Benchmark generic processor performance or ML workloads designed for larger devices.
  - **New approach:**
    - Benchmark representative TinyML inference tasks on real constrained systems, with energy and predictive quality explicitly included.
  - **Deeper shift:**
    - From treating benchmarking as running a fixed program to treating it as a carefully controlled comparison framework with configurable system components.

# Method: How It Works

- **High-Level Strategy:**
  - Define representative ML tasks that fit tiny devices.
  - Provide working reference implementations.
  - Allow controlled or flexible modifications depending on submission category.
  - Execute inference through a standardized test harness.
  - Measure accuracy, inference speed, and energy consumption.
  - Publish reproducible results.

- **Core Mechanism:**

  - **Step 1 — Define Representative Workloads**
    - **What:**
      - Select four TinyML applications with different data types and computational characteristics.
      - Each task specifies a dataset, model, and quality target.
    - **Why:**
      - A single workload cannot represent the diversity of TinyML.
      - Using real inference tasks captures effects missed by synthetic kernel benchmarks.

    - **The four workloads (Table 1, v0.5):**
      - **Keyword Spotting (KWS)**
        - Recognize spoken commands.
        - Dataset: Speech Commands.
        - Model: Depthwise-separable CNN (DS-CNN), 52.5 KB.
        - Minimum Top-1 accuracy: 90%.
      - **Visual Wake Words (VWW)**
        - Detect whether an image contains a person.
        - Dataset: Visual Wake Words, based on MS COCO.
        - Model: MobileNetV1, 325 KB.
        - Minimum Top-1 accuracy: 80%.
      - **Image Classification (IC)**
        - Classify small images into 10 categories.
        - Dataset: CIFAR-10.
        - Model: Compact ResNet, 96 KB.
        - Minimum Top-1 accuracy: 85%.
      - **Anomaly Detection (AD)**
        - Identify abnormal machine sounds.
        - Dataset: ToyADMOS-based evaluation.
        - Model: Fully connected autoencoder, 270 KB.
        - Minimum AUC-ROC: 0.85.
    - Model sizes are those reported for the original v0.5 TFLite reference models, not total runtime-memory requirements.

  - **Step 2 — Provide Modular Reference Implementations**
    - **What:**
      - Supply models, training scripts, inference code, and a reference hardware platform.
      - Use TensorFlow Lite for Microcontrollers (TFLM) for reference execution.
    - **Why:**
      - Ensures a working baseline.
      - Reduces implementation effort.
      - Allows researchers to substitute components and measure their contribution.

  - **Step 3 — Separate Closed and Open Divisions**
    - **What:**
      - Closed division:
        - Uses the prescribed models, datasets, and quality targets.
        - Permits implementation and hardware optimization.
        - Allows post-training quantization but not retraining or weight replacement.
      - Open division:
        - Allows alternative architectures, training, and other model changes.
        - Retains a common evaluation dataset for the task.
        - Requires reporting quality, but does not impose the closed-division accuracy threshold.
    - **Why:**
      - Closed division makes comparisons more controlled.
      - Open division permits innovation across the full ML stack.
      - Separating these prevents flexible submissions from undermining strict comparisons.

  - **Step 4 — Execute a Standardized Measurement Procedure**
    - **What:**
      - An external runner controls the DUT and collects results.
      - Latency/performance measurement:
        - Run five measurement trials.
        - Each trial executes inference for at least 10 seconds and 10 iterations.
        - Report the median inferences per second.
      - Accuracy measurement:
        - Evaluate the required validation examples.
        - Calculate Top-1 accuracy or AUC-ROC.
      - Energy measurement:
        - Use the inference measurement process while monitoring energy consumption.
        - Compute energy per inference.
        - Report the median across five trials.
    - **Why:**
      - Standardized procedures make results more reproducible.
      - Repeated trials reduce sensitivity to measurement variability.
      - External instrumentation enables evaluation of devices with minimal onboard resources.
    - **Reference:** Sections 5.3 and Appendix A.

  - **Step 5 — Validate and Publish Submissions**
    - **What:**
      - Submitters document their implementations.
      - Results and implementations undergo review for rule compliance.
      - Submissions are made publicly available with reproduction instructions.
    - **Why:**
      - A benchmark is only scientifically useful when results can be checked and reproduced.
      - Public submissions also help establish community baselines.

- **The "Aha!" Moment:**
  - **Fairness does not require identical implementations; it requires clearly defined constraints and measurement boundaries.**
  - A benchmark that forces every device to use the same runtime could measure compatibility with that runtime rather than the device's actual capabilities.
  - MLPerf Tiny separates what must remain comparable from what participants may optimize.
  - The closed/open division structure and modular reference stack are the key design decisions enabling this balance.
  - **Figure 2 is the intellectual centerpiece of the paper.**

- **Important Technical Details:**
  - **Benchmark scope:**
    - The original benchmark measures model inference, excluding input pre-processing and output post-processing.
    - Therefore, reported performance does not necessarily represent complete application-level latency or energy.
  - **Measurement metrics:**
    - Higher IPS indicates faster repeated inference.
    - Lower energy per inference indicates greater energy efficiency.
    - Quality requirements prevent unrestricted accuracy degradation in closed submissions.
  - **External measurement architecture:**
    - Host PC + device-side interface for performance and accuracy.
    - Additional energy-monitoring hardware for power measurement.
    - Helps avoid placing heavy benchmark logic on constrained devices.
  - **No single optimization algorithm:**
    - The paper specifies how systems are evaluated.
    - It does not propose a universal procedure for optimizing neural networks.

# Results & Conclusion

- **Evaluation Setup:**
  - Four reference workloads evaluated on the STMicroelectronics NUCLEO-L4R5ZI microcontroller board.
  - Reference implementations use TensorFlow Lite Micro.
  - Measurements include:
    - Inference performance (IPS/latency).
    - Energy per inference.
    - Predictive quality.
  - The June 2021 v0.5 submission round includes different:
    - Microcontrollers.
    - Neural-network accelerators.
    - Inference frameworks and toolchains.
    - FPGA implementations.
  - **Figure 5:** Reference latency and energy measurements.
  - **Table 2:** Diversity of initial benchmark submissions.

- **Key Results:**

  - **1. All four reference workloads run on the reference microcontroller and meet their quality targets.**
    - Demonstrates practical feasibility of the selected benchmark suite.
    - The tasks have substantially different computational costs.

  - **2. Reference inference costs vary dramatically across tasks (Figure 5).**
    - Approximate values read from the figure:
      - Visual Wake Words: ~600 ms, ~25 mJ per inference.
      - Image Classification: ~700 ms, ~29 mJ per inference.
      - Keyword Spotting: ~180 ms, ~7–8 mJ per inference.
      - Anomaly Detection: ~10 ms, below ~1 mJ per inference.
    - These are reference-platform measurements, not cross-hardware speedups.
    - The wide variation supports the need for multiple benchmark workloads.

  - **3. The framework accommodates heterogeneous implementations (Table 2).**
    - The initial five submissions span ARM and RISC-V microcontrollers, a neural-network accelerator, Raspberry Pi software optimization, and an FPGA workflow.
    - Both closed and open divisions received submissions.
    - This provides initial evidence that the modular design works across diverse deployment stacks.

  - **4. Early submissions reveal recurring TinyML design choices (Section 6.2).**
    - 8-bit integer inference was common because it improved efficiency with relatively limited accuracy loss.
    - Both portable runtimes and specialized inference compilers appeared.
    - Submitted hardware operated across a wide power range, from microwatts to watts.
    - These observations characterize the early ecosystem rather than establishing a universal best design.

- **What the Results Actually Prove:**
  - **Supported:**
    - The proposed workloads are executable on representative constrained hardware.
    - The measurement framework can collect inference-performance and energy results.
    - Different organizations can submit results using different hardware/software stacks.
    - The closed/open system offers a practical mechanism for supporting both comparison and flexibility.
  - **Not established:**
    - That the four workloads fully represent all real-world TinyML applications.
    - That benchmark rankings reliably predict complete deployed application performance.
    - That cross-device energy measurements are free of all systematic measurement differences.
    - That any particular hardware architecture or optimization method is universally superior.
  - The paper is primarily a **benchmark proposal and initial validation**, not a controlled experiment demonstrating a new optimization's superiority.

- **Limitations:**
  - **Incomplete application coverage:**
    - Four workloads cannot capture every TinyML task, model architecture, or operating condition.
    - The original closed suite concentrates on convolutional and fully connected networks.
  - **Pre-processing excluded:**
    - Feature extraction and other surrounding computations can be significant in deployed applications.
    - A fast inference engine does not automatically imply a fast end-to-end system.
  - **Streaming behavior not fully represented:**
    - Real wake-word and anomaly-detection systems process continuous sensor inputs.
    - The original benchmark uses discrete inputs, limiting realistic evaluation of streaming optimizations.
  - **Comparability versus flexibility remains a tradeoff:**
    - Closed submissions sacrifice some optimization freedom.
    - Open submissions can change more variables, making causal attribution and direct ranking harder.
  - **Benchmark evolution versus stability:**
    - New workloads improve representativeness, but changing the suite complicates long-term comparisons.
  - **Reference:** Section 8.

- **Bottom Line:**
  - **MLPerf Tiny establishes a standardized way to evaluate TinyML systems by combining representative inference workloads, accuracy constraints, energy measurements, and modular implementation rules.**
  - Its most important innovation is resolving the tension between reproducible comparison and hardware/software diversity.
  - Remember: **It is infrastructure for measuring TinyML progress, not an algorithm for making models faster.**

# Reading Roadmap

- **Read Carefully:**
  - **Section 1 — Introduction**
    - Understand why ultra-low-power, on-device inference creates a benchmarking problem.
    - Identify the paper's intended contribution.
  - **Section 2 — Challenges**
    - Focus on the four challenges: power, memory, hardware heterogeneity, and software heterogeneity.
    - Ask how each challenge influences the benchmark design.
  - **Section 3 — Related Work**
    - Read the comparisons with CoreMark, MLMark, and MLPerf Inference.
    - Understand which missing capabilities justify a new benchmark.
  - **Section 4 and Table 1 — Benchmarks**
    - Understand why four different workloads were selected.
    - Focus on task diversity, model sizes, and quality targets rather than individual architecture details.
  - **Section 5.1–5.2 and Figure 2 — Modular Design**
    - Highest-priority part of the paper.
    - Examine which components are fixed and which are replaceable.
    - Understand exactly why the authors need both open and closed divisions.
  - **Section 5.3 and Figure 3 — Measurement Procedure**
    - Understand what is measured and where the timing/energy boundaries lie.
    - Pay attention to how external measurement infrastructure interacts with constrained devices.
  - **Section 6, Figure 5, and Table 2 — Benchmark Assessment**
    - Separate reference-platform results from results about the diversity of submissions.
    - Look for evidence that the design goals were met.
  - **Section 8 — Limitations**
    - Especially important for understanding what a good benchmark score does not measure.

- **Skim:**
  - **Sections 4.1–4.4:** Detailed dataset composition, model layers, and training configurations.
    - Understand each workload's purpose; return to implementation details only when needed.
  - **Section 6.2:** Individual vendor and toolchain descriptions.
    - Focus on the general findings rather than every submitted product.
  - **Section 7:** Broader societal impacts.
    - Useful context but not central to the technical contribution.
  - **Appendix A:** Serial communication, firmware interfaces, energy-monitor equipment, and runner internals.
    - Important for reproducing measurements, not necessary for understanding the core idea.

- **Worth Exploring Later:**
  - **1. How representative are MLPerf Tiny workloads of real deployed TinyML systems?**
    - Examine workload selection, inference-only measurement, and continuous streaming behavior.
    - Worth exploring because benchmark validity depends on how well measured tasks approximate practical workloads.
  - **2. How fair are cross-hardware comparisons when software stacks differ?**
    - Investigate compiler optimizations, runtime overhead, quantization, and closed-division constraints.
    - Worth exploring because benchmark results reflect system-level co-design, not isolated hardware capabilities.
  - **3. How does energy per inference relate to actual battery life?**
    - Investigate idle power, duty cycles, sensor operation, pre-processing, and communication overhead.
    - Worth exploring because minimizing inference energy does not necessarily minimize whole-device energy consumption.