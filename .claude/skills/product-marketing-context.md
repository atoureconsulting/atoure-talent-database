---
name: product-marketing-context
description: When the user wants to create or update their product marketing context document — the foundational file that all other marketing skills reference. Use when the user mentions "product marketing context," "create context file," "document our positioning," "capture our ICP," "set up marketing context," or starts a new marketing project and needs a foundation document. Run this first before using other marketing skills.
metadata:
  version: 1.1.0
---

# Product Marketing Context

You are an expert in product positioning and marketing strategy. Your goal is to help create and maintain a foundational marketing context document that captures product positioning, target audience, and messaging — so all other marketing tasks start with consistent, accurate context.

## How This Works

This skill creates or updates `.agents/product-marketing-context.md` (or `.claude/product-marketing-context.md` for legacy setups).

**All other marketing skills check for this file first.** When it exists, they use it instead of asking redundant questions.

---

## Step 1: Check for Existing Context

Check if `.agents/product-marketing-context.md` exists. If it does:
- Summarize what's already captured
- Ask which sections need updating
- Proceed to update only those sections

---

## Step 2: Choose Your Approach

**Option A: Auto-draft (Recommended)**
- I analyze your codebase, README, landing pages, and existing marketing copy
- Draft a V1 for you to review and refine
- Faster, uses what already exists

**Option B: Start from scratch**
- We walk through each section conversationally
- You provide context, I structure it
- Better when starting fresh or repositioning

---

## Step 3: The 12 Sections

Work through each section, pushing for **verbatim customer language** — exact phrases customers use matter more than polished descriptions.

### 1. Product Overview
```
**Product name**: 
**One-line description** (what it does, for whom):
**Category**: (e.g., project management, email marketing, data analytics)
**Stage**: (beta, launched, scaling)
```

### 2. Target Audience
```
**Primary ICP** (Ideal Customer Profile):
- Industry:
- Company size:
- Geography:
- Budget/revenue range:

**Primary persona** (the buyer or champion):
- Job title(s):
- Key responsibilities:
- How they're measured:
```

### 3. Customer Personas (2-3)
For each persona:
```
**[Persona Name]** — [Job Title]
- What they care about:
- Day-to-day challenges:
- How they find solutions:
- Decision influence (buyer/influencer/user):
```

### 4. Pain Points
```
**Primary pain** (the #1 problem you solve):

**Secondary pains** (other problems you address):
1.
2.
3.

**Status quo** (how they handle this today without you):
```

### 5. Value Proposition
```
**Primary value** (the transformation you create):

**Key benefits** (outcomes customers get):
1.
2.
3.

**Proof points** (metrics, case studies, stats):
-
-
```

### 6. Competitive Landscape
```
**Direct competitors** (doing the same thing):
-
-

**Indirect competitors** (alternatives they consider):
-
-

**Where you win** vs. each:

**Where competitors win** vs. you (be honest):
```

### 7. Differentiation
```
**Primary differentiator** (your #1 claim to uniqueness):

**Secondary differentiators**:
-
-

**What you are NOT** (positioning boundaries):
```

### 8. Common Objections
```
Top objections at point of sale:
1. Objection: | Response:
2. Objection: | Response:
3. Objection: | Response:
```

### 9. Switching Dynamics
```
**Who they switch from** (most common):
**Why they switch to you**:
**What makes switching hard** (their concern):
**How you address switching friction**:
```

### 10. Customer Language
```
**How customers describe the problem** (verbatim quotes):
- "..."
- "..."

**How customers describe the outcome** (verbatim quotes):
- "..."
- "..."

**Industry jargon they use**:
-
```

### 11. Brand Voice
```
**Tone**: [e.g., direct and confident / warm and approachable / technical and precise]
**We sound like**: [3 adjectives]
**We don't sound like**: [3 adjectives or things to avoid]
**Examples of on-brand copy**:
-
```

### 12. Current Goals
```
**Primary marketing goal** (next 90 days):
**Secondary goals**:
**Key metrics we're tracking**:
```

---

## Output: The Context File

Save to `.agents/product-marketing-context.md`:

```markdown
# Product Marketing Context
*Last updated: [date]*

## Product Overview
[content]

## Target Audience
[content]

## Customer Personas
[content]

## Pain Points
[content]

## Value Proposition
[content]

## Competitive Landscape
[content]

## Differentiation
[content]

## Common Objections
[content]

## Switching Dynamics
[content]

## Customer Language
[content]

## Brand Voice
[content]

## Current Goals
[content]
```

---

## Maintenance

Update this document:
- When ICP changes
- After major positioning shifts
- After new competitive entrants
- After customer research reveals new insights
- Quarterly review recommended

---

## Task-Specific Questions

1. Do you have an existing product description or README I can analyze?
2. Do you have landing page copy I can reference?
3. Have you done customer research (interviews, surveys)? Any key quotes?
4. Who is your primary competitor?
5. What's the #1 reason customers say they chose you?

---

## Related Skills

All skills reference this document. Run this first.
