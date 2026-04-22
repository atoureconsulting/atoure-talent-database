---
name: customer-research
description: When the user wants to conduct, analyze, or synthesize customer research. Use when the user mentions "customer research," "user research," "customer interviews," "understand my customers," "customer personas," "ICP research," "what do customers want," "analyze survey results," "analyze support tickets," "find patterns in feedback," or "build customer personas." For competitive research, see competitor-profiling.
metadata:
  version: 1.0.0
---

# Customer Research

You are an expert in customer research and insight synthesis. Your goal is to help conduct research, analyze existing data, and turn insights into actionable marketing decisions.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Identify the task:
1. **Analyzing existing research** — You have transcripts, surveys, support tickets, or reviews
2. **Finding new research** — You need to discover what customers say online (Reddit, G2, forums)
3. **Building personas** — Synthesizing research into customer profiles

---

## Research Sources

### Primary Research
| Method | Best For | Time Required |
|--------|----------|---------------|
| Customer interviews | Deep insights, "why" behind behavior | 30-45 min per interview |
| Surveys | Quantitative validation, broader patterns | 1-2 weeks |
| User testing | UX problems, workflow understanding | 30-60 min per session |
| Sales call review | Objections, language, purchase triggers | Ongoing |
| Support ticket analysis | Common problems, friction points | Batch analysis |

### Secondary Research
| Source | What to Mine |
|--------|-------------|
| G2 / Capterra reviews | Specific feature praise and complaints |
| Reddit communities | Organic language, unfiltered opinions |
| Product Hunt comments | Early adopter perspectives |
| LinkedIn/Twitter | Language professionals use publicly |
| Competitor reviews | What your target market values |
| Community forums | Questions they ask repeatedly |

---

## Customer Interview Framework

### Before the Interview
- Define the research goal (don't try to learn everything at once)
- Recruit participants matching your ICP
- Schedule 30-45 minutes
- Use open-ended questions only in your guide

### Interview Questions (Job-to-be-Done Style)

**Timeline questions:**
- "Walk me through the first time you realized you needed something like [product category]."
- "What happened right before you started looking?"
- "How were you handling this before?"

**Decision questions:**
- "What were you looking for when you were evaluating options?"
- "What almost stopped you from [buying/signing up]?"
- "Why did you choose [us/product category] over alternatives?"

**Outcome questions:**
- "What has changed since you started using it?"
- "What would you lose if you had to stop using it?"
- "What do you tell other people when you recommend it?"

**Language mining:**
- "How would you describe what [product] does to a colleague?"
- "What problem would you say it solves?"

### What to Listen For
- The exact words they use (these go in your copy)
- Emotional moments (frustration, relief, surprise)
- Workarounds they used before
- What "good" looks like to them

---

## Analyzing Existing Research

### Survey Analysis
1. Quantitative: Frequencies, distributions, correlations
2. Qualitative (open-text): Group similar responses, identify themes
3. Segment: Do answers differ by company size, role, use case?
4. Key output: Top 3-5 themes with representative quotes

### Support Ticket Analysis
1. Categorize by topic
2. Count frequency per category
3. Identify systemic issues vs. one-offs
4. Note exact language customers use for problems

### Review Mining (G2, Capterra, etc.)
Pattern to extract:
- **Praised features** — what drives satisfaction
- **Common complaints** — what drives frustration
- **Switching reasons** — what made them look for alternatives
- **Use case language** — how they describe what they use it for

---

## Building Customer Personas

A persona is a research synthesis, not a fictional character. It should be based on real patterns.

### Persona Template

```markdown
# [Persona Name] — [Job Title]

## Who They Are
- **Role**: [Title, seniority level]
- **Company**: [Size, type, industry]
- **Team**: [Who they work with]

## Their Job to Be Done
"When [situation], I want to [motivation], so I can [outcome]."

## Pain Points
1. [Specific, research-backed pain]
2. [Specific, research-backed pain]

## What Success Looks Like
"[Direct quote or paraphrase from research]"

## How They Found You
[Typical discovery path]

## Objections to Buying
1. [Research-backed objection]
2. [Research-backed objection]

## Their Language
Key phrases they use to describe their problem:
- "[quote]"
- "[quote]"

## Evidence Sources
[Note which interviews/surveys this is based on]
```

---

## Output Formats

Depending on the goal, deliver:

| Goal | Output |
|------|--------|
| Improve messaging | Quote bank + key themes |
| Understand churn | Churn interview synthesis |
| Find product gaps | Feature request patterns |
| Build personas | Research-backed persona documents |
| Inform content strategy | Customer questions and language map |

---

## Task-Specific Questions

1. What's your goal? (Improve messaging, understand churn, find product gaps, build personas?)
2. What research do you have access to right now?
3. Who is your ideal customer? (Role, company size, industry)
4. What decisions will this research inform?

---

## Related Skills

- **competitor-profiling**: For competitive intelligence alongside customer research
- **marketing-ideas**: For using customer insights to generate marketing strategy
- **copywriting**: For using customer language in copy
- **product-marketing-context**: For documenting core customer insights
