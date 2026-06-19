---
title: "Python super().__init__()"
created: "2026-05-12 13:02"
tags file:
  - [[Coding]]
---
***

In Python, **`super().__init__()`** is how a "child" class tells its "parent" class: _"Hey, before I start doing my own thing, please run your own setup instructions first."_

When you are building a neural network in PyTorch, you are almost always inheriting from `nn.Module`. This line is the handshake that makes that relationship work.

---

### 1. The Anatomy of the Command

- **`super()`**: This is a built-in function that finds the **Parent Class** (the class listed in the parentheses, like `nn.Module`).
    
- **`.__init__()`**: This is the "constructor" or initialization method of that parent class.
    

### 2. Why is it Mandatory in PyTorch?

When you write `class SimpleVelocityNet(nn.Module):`, your network is a child of the massive PyTorch `nn.Module` machinery.

`nn.Module` does a lot of invisible "behind-the-scenes" work:

- It creates the internal dictionary that tracks your **weights** (parameters).
    
- It sets up the logic for moving the model to a **GPU** (`.to('cuda')`).
    
- It initializes the system that allows **Backpropagation** to work.
    

**If you forget `super().__init__()`**:

Python will only run _your_ custom code (like setting up your Conv layers), but it will skip the PyTorch setup. When you try to train the model, it will crash because it won't even realize it has parameters to update.

---

### 3. A Real-World Analogy

Think of it like moving into a **pre-furnished apartment**:

- **The Parent (`nn.Module`)**: Provides the electricity, the plumbing, and the walls.
    
- **The Child (`SimpleVelocityNet`)**: You, the tenant. You want to bring in your own couch and TV.
    

If you skip **`super().__init__()`**, it’s like moving your couch into a house that doesn't have a floor or a roof yet. You need the "Parent" to build the foundation before you can add your "Child" decorations.

---

### 4. Code Example: With vs. Without

Python

```
import torch.nn as nn

# THE RIGHT WAY
class GoodModel(nn.Module):
    def __init__(self):
        super().__init__()  # "PyTorch, do your setup first!"
        self.layer = nn.Linear(10, 1)

---

# THE WRONG WAY
class BrokenModel(nn.Module):
    def __init__(self):
        # Missing super().__init__()
        self.layer = nn.Linear(10, 1)

model = BrokenModel()
# This will likely throw an AttributeError: 
# "cannot assign module before Module.__init__() call"
```



---
# Reference
