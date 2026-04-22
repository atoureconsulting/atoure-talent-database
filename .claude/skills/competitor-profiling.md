---
name: competitor-profiling
description: When the user wants to research and analyze competitors in depth. Use when the user mentions "competitor research," "analyze competitors," "competitive analysis," "competitor profile," "what are competitors doing," "competitive intelligence," "benchmark against competitors," or "spy on competitors." For creating comparison pages from that research, see competitor-alternatives.
metadata:
  version: 1.0.0
---

# Competitor Profiling

You are an expert in competitive intelligence. Your goal is to research and analyze competitors by profiling their websites, SEO strength, positioning, and market presence.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather context:
1. **Competitor URLs** — which websites to profile
2. **Profile depth** — quick scan (key facts only) or deep profile (comprehensive research)
3. **Focus areas** — specific dimensions that matter most (pricing, SEO, positioning, etc.)
4. **Your product context** — what do you do? (helps spot competitive gaps)

---

## Research Process

### 1. Website Scraping

Fetch and extract from key pages:
- **Homepage**: Headline, value prop, target audience, key messaging
- **Pricing**: Plans, prices, features per tier, free trial/freemium
- **Features**: Core capabilities, differentiators
- **Customers**: Case studies, testimonials, logos
- **About**: Founding story, team size, investors
- **Integrations**: What tools they connect with

### 2. SEO Analysis

| Metric | What It Reveals |
|--------|----------------|
| Domain Authority (DA) | Overall SEO strength |
| Organic traffic (estimated) | Search investment and reach |
| Top ranking keywords | What problems they're targeting |
| Content volume | Content investment level |
| Backlink profile | PR/partnership reach |

Tools: Ahrefs, Semrush, Moz (if available)

### 3. Review Intelligence

Mine customer reviews on:
- **G2** — B2B SaaS reviews
- **Capterra** — Business software
- **Product Hunt** — Launch performance
- **App Store / Google Play** — If mobile app

Extract:
- Overall rating and review count
- Most praised features (what they do well)
- Most common complaints (weaknesses)
- Direct competitor comparisons mentioned by customers

---

## Profile Template

```markdown
# [Competitor Name]

**Website**: [URL]
**Founded**: [Year]
**Employees**: [Range]
**Funding**: [Stage + Amount if public]
**Last Updated**: [Date]

## Positioning

**Tagline**: [Their main headline]
**Target audience**: [Who they primarily serve]
**Primary value prop**: [What they claim to solve]
**Key differentiators**: [How they position themselves]

## Pricing

| Plan | Price | Key Limits | Notable Features |
|------|-------|------------|-----------------|
| Free | $0 | [limits] | [features] |
| Pro | $X/mo | [limits] | [features] |
| Enterprise | Custom | — | [features] |

**Free trial**: Yes/No — [duration]
**Annual discount**: [X%]

## Strengths

1. [Specific strength with evidence]
2. [Specific strength with evidence]

## Weaknesses

1. [Specific weakness from reviews/research]
2. [Specific weakness from reviews/research]

## Common Customer Complaints

- "[Direct quote from review]"
- "[Direct quote from review]"

## SEO Snapshot

- **Domain Authority**: [score]
- **Est. monthly organic traffic**: [range]
- **Top keywords**: [list]
- **Content output**: [posts/month estimate]

## Notable Features You Don't Have

- [Feature gap to consider]

## Where You Win vs. Them

- [Your advantage]
```

---

## Output Files

Save research to:
- `competitor-profiles/raw/[competitor-name]-[date].json` — Raw scraped data
- `competitor-profiles/[competitor-name].md` — Formatted profile
- `competitor-profiles/summary.md` — Side-by-side comparison

---

## Side-by-Side Comparison

When profiling multiple competitors:

| Dimension | You | Competitor A | Competitor B |
|-----------|-----|-------------|-------------|
| Starting price | $X | $Y | $Z |
| Free tier | Yes | No | Limited |
| Target market | [X] | [Y] | [Z] |
| Avg rating | [X] | [Y] | [Z] |
| Review count | [X] | [Y] | [Z] |
| SEO strength | [X] | [Y] | [Z] |

---

## Task-Specific Questions

1. Which competitor URLs should I profile?
2. Quick scan or deep dive?
3. Any specific dimensions that matter most to you?
4. What's your product so I can identify relevant gaps?

---

## Related Skills

- **competitor-alternatives**: For creating comparison pages from this research
- **sales-enablement**: For battle cards based on this research
- **marketing-ideas**: For identifying marketing tactics competitors use that you don't
- **pricing-strategy**: For benchmarking your pricing against competitors
