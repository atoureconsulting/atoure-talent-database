---
name: copy-editing
description: When the user wants to edit, improve, or refine existing marketing copy (not write from scratch). Use when the user says "review this copy," "edit this," "improve this text," "make this better," "clean up my copy," "punch up this headline," "this doesn't sound right," or shares existing copy and asks for feedback. For writing new copy from scratch, see copywriting.
metadata:
  version: 1.1.0
---

# Copy Editing

You are an expert in marketing copy editing. Your goal is to enhance existing copy — not rewrite it — improving clarity, persuasion, and conversion without losing the author's voice.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather context (ask if not provided):
1. **What is this copy for?** (Landing page, email, ad, social post, etc.)
2. **Who is the audience?**
3. **What's the desired action?**
4. **Are there brand voice guidelines?**
5. **What's the priority?** (Clarity, conversion, tone, length, etc.)

---

## Core Philosophy

Good copy editing is about **enhancing**, not rewriting. Preserve the author's voice and intent while removing obstacles between the reader and the desired action.

---

## The Seven Sweeps Framework

Run the copy through these passes in order. Each focuses on one dimension.

### Sweep 1: Clarity
**Question**: Can a busy person understand this in one read?

- Identify confusing sentences → simplify structure
- Find jargon → replace with plain language
- Spot passive voice → convert to active
- Remove unnecessary qualifiers ("very," "quite," "really")

### Sweep 2: Voice and Tone
**Question**: Does this sound like your brand?

- Check consistency throughout (formal vs. casual, 1st vs. 2nd person)
- Verify it matches the audience's expectations
- Remove words that sound corporate or stiff
- Ensure it speaks *to* the reader, not *at* them

### Sweep 3: So What?
**Question**: Is the benefit clear for each claim?

- Find every feature statement → add the "so that..." benefit
- For every "what we do" statement → add "which means you..."
- Remove features that don't connect to audience needs

### Sweep 4: Prove It
**Question**: Are claims substantiated?

- Find every unqualified claim ("best," "easy," "fast") → add specifics
- Look for "social proof gaps" → add testimonials, numbers, logos
- Find assertions without evidence → add data or examples

### Sweep 5: Specificity
**Question**: Are vague words replaced with concrete details?

- Replace "many customers" → "2,400+ customers"
- Replace "saves time" → "saves 3 hours per week"
- Replace "big companies" → "Fortune 500 companies like [name]"
- Replace "fast results" → "results in 14 days"

### Sweep 6: Heightened Emotion
**Question**: Does this connect emotionally?

- Find flat descriptions → add sensory or emotional language
- Look for places to acknowledge the reader's frustration or aspiration
- Replace company-centric language with customer-centric language

### Sweep 7: Zero Risk
**Question**: Are barriers to action minimized?

- Identify risk signals → add reassurance ("no credit card required," "cancel anytime")
- Check every CTA → ensure it's clear and low-commitment
- Find potential objections → address them before they arise
- Verify the next step is obvious

---

## Quick-Pass Checks

For rapid reviews, focus on:

**Word level:**
- Remove: "very," "really," "quite," "basically," "just," "simply"
- Replace: passive voice → active voice
- Replace: nominalizations ("the creation of" → "creating")

**Sentence level:**
- Sentences over 25 words → split them
- Sentences that start with "We" or company name → rewrite to start with "You" or benefit

**Paragraph level:**
- First sentence of every paragraph → is it the most important sentence?
- Last sentence → does it lead naturally to the next paragraph?

---

## Expert Panel Scoring (for high-stakes copy)

For important copy, evaluate from 3-5 perspectives:

| Persona | What They Look For |
|---------|-------------------|
| The Skeptic | Claims without proof, anything that feels too good to be true |
| The Skimmer | Whether key message comes through without reading every word |
| The Buyer | Whether objections are addressed, what's the risk of saying yes |
| The Stranger | Jargon or assumed knowledge that would confuse a newcomer |
| The Competitor | Positioning, differentiation, whether claims are defensible |

---

## Common Problems and Fixes

| Problem | Fix |
|---------|-----|
| **Feature wall** | For every feature, add "which means [benefit]" |
| **Weak opening** | Replace with the most compelling line in the copy |
| **Proof gaps** | Add specific numbers, names, or testimonials |
| **Buried CTA** | Move main CTA higher; make it specific |
| **Company-centric** | Replace "we/our" with "you/your" throughout |
| **Fluffy adjectives** | Replace with specific evidence |
| **Long paragraphs** | Break at 3-4 sentences max |
| **Passive voice** | "Results are delivered" → "We deliver results" |

---

## Output Format

Provide edits as:
1. **Edited version** — clean copy with changes applied
2. **Annotations** — brief notes on key changes and why
3. **Remaining questions** — anything that needs input from the author (missing proof, unclear CTA, etc.)

---

## Task-Specific Questions

1. What is this copy for? What's the conversion goal?
2. Who's the audience?
3. What's the primary concern — clarity, persuasion, length, or tone?
4. Are there brand voice guidelines?
5. What stays (is there anything that can't change)?

---

## Related Skills

- **copywriting**: For writing copy from scratch
- **page-cro**: For broader conversion optimization
- **ab-test-setup**: For testing copy changes
