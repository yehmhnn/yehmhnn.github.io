2026-04-11 13:02
Tags: [[GPU]]
***

- Data-Level Parallelism (DLP)
- Thread-Level Parallelism (TLP)
- Instruction-Level Parallelism (ILP)

If **DLP** is the width of the road and **TLP** is the number of cars, **ILP** is how closely you can pack those cars together in a single lane without them crashing.

| **Parallelism Type** | **Hardware Mechanism**                                                                           | **Logic**                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| DLP                  | [[SIMD (Single Instruction, Multiple Data)]] <br>[[SIMT (Single Instruction, Multiple Threads)]] | "How many numbers can I add at the exact same clock cycle?" (Answer: 32).          |
| TLP                  | [[FGMT (Fine-Grained Multi-Threading)]]                                                          | "How many warps can I keep 'in flight' to hide stalls?" (Answer: Thousands).       |
| ILP                  | Instruction Pipelining                                                                           | "How many independent instructions from one thread can I keep in the air at once?" |

[[Data Parallelism]] is the Goal, and DLP, TLP, and ILP are the **three different levels of hardware efficiency** used to achieve that goal.

---
# Reference

