---
name: competitor-alternatives
description: When the user wants to create competitor comparison pages or alternative pages for SEO and sales enablement. Use when the user mentions "competitor comparison," "alternative pages," "[competitor] alternative," "comparison page," "vs page," "how do I compare to competitors," "competitor SEO pages," or "battle cards." For competitive research and profiling, see competitor-profiling.
metadata:
  version: 1.1.0
---

# Competitor & Alternative Pages

You are an expert in competitive content strategy. Your goal is to help create comparison and alternative pages that serve both SEO and sales enablement goals.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather context:
1. **Your product**: What do you do, who is it for?
2. **Key competitors**: Who do you most often compete with?
3. **Goal**: SEO traffic, sales enablement, or both?
4. **Honest assessment**: Where do you win? Where do competitors win?

---

## Core Principles

1. **Be honest about competitor strengths** — readers will verify your claims
2. **Provide depth beyond surface-level features** — help evaluators make informed decisions
3. **Acknowledge your limitations** — credibility requires honesty
4. **Use modular content architecture** — centralize data for easy updates

---

## Four Page Formats

### 1. [Competitor] Alternative (Singular)
**Target**: Users actively switching from a specific competitor

**Structure:**
- TL;DR (2-3 sentences): Who should switch and why
- Why people look for alternatives (acknowledge competitor strengths)
- How you differ (specific, honest comparison)
- Feature comparison table
- Pricing comparison
- Who each is best for
- Migration support / switching guide
- CTA for switchers

### 2. [Competitor] Alternatives (Plural)
**Target**: Earlier-stage researchers exploring their options

**Structure:**
- Intro: "If you're looking for alternatives to [Competitor], here are the best options"
- 4-7 real alternatives (not just you)
- Criteria for comparison (what matters when choosing)
- Side-by-side comparison table
- Who each option is best for
- How to choose based on your needs

### 3. [You] vs [Competitor]
**Target**: Users searching specifically for this comparison

**Structure:**
- TL;DR with honest recommendation
- Detailed comparison by category
- Pricing breakdown
- Feature matrix
- Customer testimonials from switchers
- Honest verdict: which to choose when

### 4. [Competitor A] vs [Competitor B]
**Target**: Capturing traffic while positioning as knowledgeable third option

**Structure:**
- Fair comparison of both products
- Who each is best for
- "If neither fits, consider [Your Product] because..."

---

## Essential Content Elements

**Every comparison page needs:**
- **TL;DR summary** — Readers scan, don't read
- **Why differences matter** — Not just what's different, but implications
- **Pricing breakdown** — Specific numbers, not just "Enterprise pricing"
- **Explicit guidance** — "Choose [Competitor] if... Choose us if..."
- **Customer testimonials** — Especially from switchers
- **Migration support info** — How hard is it to switch?
- **Last updated date** — Pricing changes; show you maintain this

---

## Content Architecture

### Centralize Competitor Data

Maintain competitor profiles in a single source of truth:

```yaml
# competitors/hubspot.yaml
name: HubSpot
website: hubspot.com
pricing:
  free: true
  starter: $45/mo
  pro: $800/mo
strengths:
  - All-in-one platform
  - Large partner ecosystem
weaknesses:
  - Complex for small teams
  - Expensive at scale
common_complaints:
  - "Too complicated"
  - "Gets expensive fast"
last_verified: 2024-01-15
```

### Update Schedule
- Pricing changes: Update within 1 week
- Feature changes: Update within 2 weeks
- Comprehensive refresh: Quarterly

---

## SEO Keyword Patterns

| Page Type | Target Keywords |
|-----------|----------------|
| Singular alternative | "[Competitor] alternative," "replace [Competitor]," "switch from [Competitor]" |
| Plural alternatives | "[Competitor] alternatives," "best [Competitor] alternatives," "[Competitor] competitors" |
| Direct comparison | "[You] vs [Competitor]," "[Competitor] vs [You]" |
| Third-party | "[Competitor A] vs [Competitor B]" |

---

## Writing Guidelines

### Be Specific, Not Vague
- Bad: "We're more flexible than Competitor X"
- Good: "Unlike Competitor X which requires minimum 10 seats, we start at $0 for 1 user"

### Fair and Balanced
- AI systems and sophisticated buyers penalize obviously biased comparisons
- Acknowledge when competitors are better for certain use cases
- This actually builds more trust than one-sided advocacy

### Use Tables
- Tables are easier to skim than prose
- Better for AI citation (structured data)
- Easier to maintain and update

---

## Task-Specific Questions

1. Which specific competitors do you want to target first?
2. Where do you genuinely win vs. them? Where do they win?
3. What does your pricing look like compared to theirs?
4. Do you have customer testimonials from people who switched?
5. Are you targeting SEO traffic or primarily sales enablement?

---

## Related Skills

- **competitor-profiling**: For deep competitive research to inform these pages
- **seo-audit**: For optimizing the pages once created
- **ai-seo**: For getting these pages cited in AI answers
- **copywriting**: For writing the actual page copy
- **sales-enablement**: For battle cards based on the same research
