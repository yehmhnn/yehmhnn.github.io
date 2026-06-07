---
title: "Python `__name__`"
created: "2026-05-06 20:34"
tags file:
  - [[Coding]]
---
***

# Python: The `__name__` Variable

The `__name__` variable is a **built-in special variable** (often called a "dunder" for _double underscore_) that Python automatically assigns to every script. It acts as a "context tracker" that tells the code whether it is being run as the primary program or being used as a tool by another script.

## 1. The Two States of `__name__`

Depending on how the file is invoked, `__name__` will take one of two values:

|**Execution Method**|**Value of __name__**|**Meaning**|
|---|---|---|
|**Direct Run** (`python script.py`)|`"__main__"`|The script is the "boss" (entry point).|
|**Imported** (`import script`)|`"script"` (the filename)|The script is a "helper" (module).|

## 2. The Logic: `if __name__ == "__main__":`

This conditional block is the standard "Gatekeeper" in Python development. It ensures that specific code—like training loops, plots, or tests—**only** runs when you execute that file specifically.

### Example Scenario

Imagine you have two files in your project:

**File A: `math_tools.py`**

```
def add(a, b):
    return a + b

# This only runs if you run math_tools.py directly
if __name__ == "__main__":
    print("Testing the add function...")
    print(add(10, 5))
```

**File B: `main_experiment.py`**

```
from math_tools import add

print(f"Result: {add(20, 30)}")
```

**What happens?**

- If you run `python math_tools.py`, you see the test prints.
    
- If you run `python main_experiment.py`, it imports the `add` function, but it **ignores** the test prints because `__name__` in `math_tools` is now `"math_tools"`, not `"__main__"`.
    

## 3. Why This is Essential for Research

1. **Modularity:** You can write your GP Sampler, your S4 model, and your Data Loader in separate files. Each can have its own "test block" at the bottom to verify it works without breaking your main training script.
    
2. **Safety:** It prevents "side effects" (like accidentally starting a 10-hour training run) just because you imported a helper function from another file.
    
3. **Parallelism:** When using Python's `multiprocessing` (common in high-performance computing), this block is often **mandatory** to prevent the computer from spawning an infinite loop of new processes.
    

---
# Reference
https://www.freecodecamp.org/news/whats-in-a-python-s-name-506262fe61e8/
