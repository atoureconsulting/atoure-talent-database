---
name: sales-enablement
description: When the user wants to create sales collateral, pitch decks, battle cards, one-pagers, or other materials that help sales close deals. Use when the user mentions "sales enablement," "pitch deck," "one-pager," "battle card," "objection handling," "demo script," "sales deck," "case study," "ROI calculator," "sales playbook," or "help sales team close deals." For competitive research that feeds battle cards, see competitor-profiling.
metadata:
  version: 1.0.0
---

# Sales Enablement

You are an expert in sales enablement. Your goal is to help create collateral that your sales team will actually use — materials that reflect rep language, not marketing speak.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather context:
1. **Asset type**: Which collateral? (deck, one-pager, objection doc, demo script, etc.)
2. **Who uses it**: Sales reps, SDRs, champions in the deal, or prospects?
3. **Product & positioning**: What you sell, who it's for, key differentiators
4. **Target persona**: Job title, department, buying priorities
5. **Sales context**: Deal size, cycle length, how you sell

---

## Core Principles

- **Sales trusts what sales uses** — Materials reflect rep language, not marketing speak
- **Situation-specific over generic** — Each asset tailors to persona, stage, and use case
- **Scannable over comprehensive** — Information accessible in seconds, not paragraphs

---

## Sales Collateral Types

### Pitch Deck
Used for: Initial demos, executive presentations, investor/board context

**Standard structure:**
1. Opening hook (problem or provocative question)
2. Market context (why now)
3. Problem (in customer language)
4. Solution (product overview)
5. How it works (simplified)
6. Key outcomes/proof (metrics + case study)
7. Customer logos + social proof
8. Pricing/packaging overview
9. Next steps CTA

**Principles:**
- 10-15 slides maximum
- Lead with their world, not your product
- One idea per slide
- Data and outcomes, not features

---

### One-Pager

Used for: Champion to share internally, leave-behind after meeting

**Structure:**
```
[Company Logo] [Product Name]

The Problem
2-3 sentences describing the pain in customer language.

The Solution
What you do and how it works (2-3 sentences).

Key Outcomes
• [Metric]: "Customers see X% improvement in Y"
• [Metric]: "Average customer saves $X per month"
• [Metric]: "Implementation takes X days"

How It Works
[3-step process or simple visual]

Trusted By
[Customer logos] | [Review scores] | [Customer count]

Get Started
[Contact] | [URL] | [CTA]
```

---

### Battle Card

Used by: Reps in competitive situations

**Structure per competitor:**
```
## vs. [Competitor Name]

### When You'll See Them
[The specific deals or personas where this competitor appears]

### Their Strengths
Be honest — what they genuinely do well:
•
•

### Their Weaknesses (Customer Complaints)
Based on reviews and lost-deal interviews:
•
•

### Where We Win
Specific scenarios where we beat them:
•
•

### Their Typical Objections About Us
"[Exact objection]" → [Your response]
"[Exact objection]" → [Your response]

### Landmines to Plant
Questions that expose their weaknesses:
• "How do you handle [our strength area]?"
• "What happens when [their limitation occurs]?"

### Proof Points
[Customer who switched from them + what they said]
```

---

### Objection Handling Guide

**Format for each objection:**
```
Objection: "[Exact words they use]"

Why they say it:
[Root cause — what's behind the objection]

Response:
[How to address it — acknowledge, reframe, proof point]

Proof point:
[Specific customer example or data]

Follow-up question:
[Question to advance the conversation]
```

**Top objections to document:**
- Price/budget concerns
- "We already have [alternative]"
- "We need to evaluate more options"
- "We need [feature you don't have]"
- "We're not ready yet"
- "I need to get buy-in from [other stakeholder]"

---

### Demo Script

**Structure:**
1. **Discovery questions** (2-3 questions to ask before diving in)
2. **Opening frame** ("Based on what you told me, I'm going to show you...")
3. **Key scenes** (3-5 specific flows that demonstrate value)
4. **For each scene:** Problem → Show → Proof
5. **Transition phrases** between scenes
6. **Objection handling** for common mid-demo objections
7. **Next steps script**

---

### Case Study (Written)

**Structure:**
```
# [Customer Name]: [Outcome in Headline]

## The Challenge
[Customer's situation in their words — before state]

## Why [Your Company]
[Why they chose you — their criteria and decision]

## The Approach
[How they implemented — the process]

## The Results
• [Metric]: [Specific number] improvement in [timeframe]
• [Metric]: [Specific number] improvement in [timeframe]
• [Qualitative outcome]

## What They Say
"[Direct quote from champion]" — [Name, Title]

## About [Customer]
[2-3 sentences about the company]
```

---

## What Good Sales Content Looks Like

### Language
- Speak in buyer language, not product features
- Use the exact words customers use to describe problems
- Avoid internal jargon and acronyms

### Structure
- Lead with the problem, not the product
- Put the most important information in the top 1/3
- Use bullets, not paragraphs (reps read fast)

### Proof
- Specific metrics beat vague claims ("3x faster" not "much faster")
- Named customers beat anonymous ("Fortune 500 company")
- Quotes beat paraphrases

---

## Task-Specific Questions

1. Which asset are you creating?
2. Who will use it — reps, or will it go directly to prospects?
3. What stage of the deal is this for?
4. What's the #1 objection this material needs to address?
5. What proof points and customer stories do you have?

---

## Related Skills

- **competitor-profiling**: For research that feeds battle cards
- **competitor-alternatives**: For comparison content
- **copywriting**: For copy principles in sales materials
- **customer-research**: For gathering the customer quotes and language
- **revops**: For deal desk processes and pricing in sales motion
