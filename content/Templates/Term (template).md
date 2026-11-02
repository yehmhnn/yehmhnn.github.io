---
title: "{{title}}"
created: "{{date}} {{time}}"
tags file:
---
Please explain {{title}} using the following structure.

The goal is to help me **understand the concept quickly**, not to provide a comprehensive textbook explanation.

Keep the entire note concise. Prioritize the few ideas necessary to understand the concept and omit secondary details.

## Output Format

Return the entire answer as **Obsidian-compatible Markdown** inside a single Markdown code block so I can copy and paste it directly into Obsidian.

Follow these formatting rules:

- Use standard Markdown headings (`#`, `##`, `###`).
    
- Use `-` for bullet points.
    
- Use `$...$` for inline mathematical expressions.
    
- Use `$$...$$` for standalone mathematical equations.
    
- Do not use `\(...\)` or `\[...\]` as math delimiters.
    
- Use LaTeX syntax inside math delimiters.
    
- Make equations compatible with Obsidian's MathJax renderer.
    
- Use Markdown tables only when they genuinely improve comparison or clarity.
        
- Do not use HTML unless absolutely necessary.
    
- Keep the Markdown readable even in Source mode.
    
- Do not wrap ordinary text unnecessarily in LaTeX.

- Use only the section headings specified in the template. Do not add an introductory title above `# The Definition (What)`.

- The very first line inside the Markdown code block must be `# The Definition (What)`.
    

# The Definition (What)

- Give one clear, jargon-free sentence explaining what {{title}} is.
    
- If technical terminology is unavoidable, immediately explain it in plain language.
    
# Why It Is Important (Why)

Explain the main problem {{title}} solves and why that problem matters.

Focus on:

- What problem existed before or without it?
    
- What does it do better than obvious alternatives?
    
- In what situations does this advantage actually matter?
    

# How It Works (How)

Provide an integrated, step-by-step explanation of the mechanism.

For each logical step, phase, or variant:

1. Explain what is happening conceptually.
    
2. Introduce the relevant mathematical expression immediately when it becomes useful.
    
3. Explain what every important component of the equation represents.
    
4. Explain how the mathematics corresponds to the intuitive mechanism.
    
5. Connect the step to the previous and next steps.
    

Do **not** collect equations into a separate mathematics section.

For example, instead of presenting:

$$  
y = f(x)  
$$

and moving on, explain what $x$, $f$, and $y$ represent and what transformation the equation is describing.

When useful, work through a small numerical example so that the mathematics can be followed manually.

# Additional Insights

Include this entire section **only if it materially improves understanding of {{title}}**. If none of the subsections below adds meaningful information beyond what has already been explained, omit `# Additional Insights` entirely.

Do not add content merely to satisfy the template.

Include only the relevant subsections below, and omit all others.

## Concrete Example

Use a small, realistic example and work through it step by step.

For mathematical concepts, prefer actual numbers when possible.

## Direct Comparison

Compare {{title}} with the concept it is most commonly confused with or the most relevant alternative.

Focus on the conceptual difference, not merely different definitions.

Use a table if it makes the distinction clearer.

## Major Limitations

Explain the most important situation in which {{title}} becomes misleading, unreliable, inappropriate, or less useful.

Explain **why** the limitation occurs rather than merely stating it.

## Common Misconceptions

Identify one or more misunderstandings that could cause someone to think they understand {{title}} when they actually do not.

Correct each misconception explicitly.
