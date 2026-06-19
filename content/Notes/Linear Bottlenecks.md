---
title: "Linear Bottlenecks"
created: "2026-06-07 20:33"
tags file:
---
## Concept

A technique introduced in **[[MobileNet]]V2** to prevent the network from destroying useful information as data passes through compressed layers.

## The Problem

Deep networks rely on non-linear activation functions (like **ReLU**) to learn complex patterns. ReLU works by turning all negative numbers into zero. 
However, when you apply ReLU to a highly compressed, narrow layer (a "bottleneck"), clearing out the negative numbers ends up accidentally **destroying a massive amount of useful feature information**. 

## The Solution

In the final layer of an [[Inverted Residual Block]] (the projection/bottleneck layer), the non-linear activation function is completely removed. The data is output using a **linear activation** instead.

## Why it matters

It allows the network to safely compress data into tiny, power-saving bottlenecks without losing the vital mathematical representation needed for high accuracy.
