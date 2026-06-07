2026-04-11 12:28
Tags: [[GPU]]
***

SIMD is a hardware execution model where a single control unit broadcasts one instruction to multiple processing elements (ALUs).

- Inside the GPU, the "Cores" aren't actually independent; they are organized into **ALU lanes** (usually 32 wide).
    
- When the "Control Unit" says "Add," all 32 lanes perform an addition at the exact same moment. This is a "Vector Operation."


---
# Reference
https://en.wikipedia.org/wiki/Single_instruction,_multiple_data