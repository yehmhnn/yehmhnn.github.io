---
title: Context Window
created: 2026-06-01 12:14
tags file:
  - "[[LLM]]"
---
The context window is the AI's **working short-term memory**. It is the total number of tokens the AI can hold in its brain _at the exact same instant_ during a single conversation.

#### What happens when you run out of Context Window?

If an AI has an 8,000-token context window (like older models or some versions of Gemma), and your chat history plus your notes total 9,000 tokens, the AI suffers from immediate short-term memory loss. It will literally "forget" the very first 1,000 tokens of your conversation to make room for the new text.
