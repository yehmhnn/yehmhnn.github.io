---
title: "2024 Evaluating the reproducibility of a deep learning algorithm for the prediction of retinal age"
create: "2026-06-02 14:58"
tags file:
---
# Abstract & Key Takeaways

- **Substantial Test-Retest Noise:** While overall correlations are high, the mean absolute discrepancy in predicted age between consecutive or closely timed images averages **over 2 years**.
    
- **The Quality Filter Fix:** Subsetting and matching image pairs based on rigorous image quality reduces test-retest discrepancies by up to **50%**.
    
- **Diurnal Oscillations:** Retinal age predictions exhibit a distinct biological or technical pattern tied to the time of day, displaying a statistically significant **overestimation of age in the afternoon** compared to the morning.
    
- **Inter-Eye Asymmetry:** A baseline age prediction discrepancy exceeding **3 years** is frequently found between the left and right eyes of the same individual.

# Motivation

### The Problem

The paper addresses the **lack of clinical validation regarding the reproducibility and stability** of deep learning models that calculate biological retinal age.

### Why It Is Important

The Retinal Age Gap (RAG) is increasingly promoted as an easily accessible, cheap, and predictive biomarker for conditions like cardiovascular disease, stroke, cognitive decline, and early mortality. However, in medical diagnostics, an AI tool must have a known and acceptable range of measurement error. If a clinician records a 2-year increase in a patient's retinal age over a short period, they need to know whether that change reflects actual systemic accelerated aging or simply random technical noise, differences in camera focus, or time-of-day variations.

# Related Work


# Method

The research was structured as a non-randomized, dual-cohort clinical validation study at the Department of Ophthalmology of Stadtspital Zürich:

- **Cohort Segmentation:**
    
    - **Intervisit Group (n = 26 healthy subjects, 45–65 years old):** Imaged across two separate sessions spaced 1 to 14 days apart to test intermediate-term reproducibility.
        
    - **Intravisit Group (n = 41 healthy volunteers, 22–59 years old):** Imaged twice within a single brief session (averaging 8 minutes apart) to analyze baseline model precision and immediate test-retest consistency.
        
- **Imaging Setup:** All photographs were foveal-centered and taken in a state of miosis (constricted pupil) utilizing a _Zeiss Visucam Pro NM_ fundus camera.
    
- **Quality Filtering Pipeline:** Images were computationally parsed using AutoMorph software. Discrepant pairs with poor focus, poor field definition, or severe artifacts were filtered, dropping the finalized data to 38 validated pairs for Intervisit and 81 validated pairs for Intravisit testing.
    
- **Covariate Analysis:** The researchers systematically tested variables including the specific eye chosen (left vs. right), the order in which the eyes were scanned, the time of day (morning vs. afternoon), and the participants' self-reported subjective age perception.
    

### Precision Performance Metrics

| **Precision Metric**                     | **Intervisit Group (38 validated pairs)** | **Intravisit Group (81 validated pairs)** |
| ---------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| **Mean Absolute Error (MAE)**            | 2.39 years                                | 2.13 years                                |
| **Intraclass Correlation (ICC)**         | 0.80                                      | 0.90                                      |
| **Coefficient of Determination ($R^2$)** | 0.63                                      | 0.82                                      |
| **Discrepancy Range (Min–Max)**          | 0.56 to 9.17 years                        | 0.01 to 19.00 years                       |

# Conclusion

### Strengths

- **Identifies a Major Blind Spot:** It transitions the conversation from theoretical AI model capabilities to real-world deployment limitations, showing that "static" biological age outputs can change rapidly based on a camera shot.
    
- **Actionable Quality Standards:** Proves empirically that rigorous image quality checking can halve prediction errors, offering immediate improvements for future data loading structures.
    
- **Discovery of Diurnal Shifts:** The detection of afternoon age overestimations highlights a previously ignored physiological or optical variable that must be accounted for.
    

### Weaknesses

- **Limited Sample Size & Diversity:** The data relies on a relatively narrow, single-center Swiss cohort with modest participant counts.
    
- **Hardware Dependability:** The observations are tied entirely to a single camera type (_Zeiss Visucam_), leaving it unclear if these exact retest variances and diurnal noise thresholds generalize to other devices or smartphone-based fundus configurations.

# Future Work
What questions remain unanswered?
