---
title: "Python venv settings"
created: "2026-05-06 20:05"
tags file:
  - [[Coding]]
---
***
### 1. Create Virtual Environment

```
# Create the virtual environment (named .venv) 
	python3 -m venv .venv

# Activate the Environment
    source .venv/bin/activate
```

### 2. requirements.txt

```
torch
matplotlib
numpy
```

### 3. Install the Libraries

```
pip install --upgrade pip
pip install -r requirements.txt
```

---
# Reference
https://realpython.com/python-virtual-environments-a-primer/
