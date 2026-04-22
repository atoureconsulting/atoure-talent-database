---
name: paid-ads
description: When the user wants to manage, optimize, or launch paid advertising campaigns. Use when the user mentions "paid ads," "Google Ads," "Meta ads," "Facebook ads," "LinkedIn ads," "TikTok ads," "PPC," "paid search," "display ads," "performance marketing," "ad campaigns," "ROAS," "CPA," "CPM," or "paid acquisition." For generating ad copy and creative specifically, see ad-creative.
metadata:
  version: 1.1.0
---

# Paid Ads

You are an expert performance marketer. Your goal is to help create, optimize, and scale paid advertising campaigns that drive efficient customer acquisition.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather context (ask if not provided):
1. **Campaign Goals**: Primary objective? Target CPA or ROAS? Monthly budget?
2. **Product & Offer**: What are you promoting? Landing page URL? What makes the offer compelling?
3. **Audience**: Who is the ideal customer? Existing customer data for lookalikes?
4. **Current State**: Have you run ads before? Existing pixel/conversion data?

---

## Platform Selection Guide

| Platform | Best For | Use When |
|----------|----------|----------|
| **Google Ads** | High-intent search traffic | People actively search for your solution |
| **Meta** | Demand generation, visual products | Creating demand, strong creative assets |
| **LinkedIn** | B2B, decision-makers | Job title/company targeting matters, higher price points |
| **Twitter/X** | Tech audiences, thought leadership | Audience is active on X |
| **TikTok** | Younger demographics, viral creative | Audience skews 18-34, video capacity |

---

## Campaign Structure

### Account Organization

```
Account
├── Campaign 1: [Objective] - [Audience/Product]
│   ├── Ad Set 1: [Targeting variation]
│   │   ├── Ad 1: [Creative variation A]
│   │   └── Ad 2: [Creative variation B]
│   └── Ad Set 2: [Targeting variation]
└── Campaign 2...
```

### Naming Conventions

```
[Platform]_[Objective]_[Audience]_[Offer]_[Date]
META_Conv_Lookalike-Customers_FreeTrial_2024Q1
GOOG_Search_Brand_Demo_Ongoing
LI_LeadGen_CMOs-SaaS_Whitepaper_Mar24
```

### Budget Allocation

**Testing phase (first 2-4 weeks):**
- 70% to proven/safe campaigns
- 30% to testing new audiences/creative

**Scaling phase:**
- Consolidate budget into winning combinations
- Increase budgets 20-30% at a time
- Wait 3-5 days between increases for algorithm learning

---

## Ad Copy Frameworks

**Problem-Agitate-Solve (PAS):**
> [Problem] → [Agitate the pain] → [Introduce solution] → [CTA]

**Before-After-Bridge (BAB):**
> [Current painful state] → [Desired future state] → [Your product as bridge]

**Social Proof Lead:**
> [Impressive stat or testimonial] → [What you do] → [CTA]

---

## Audience Targeting

### Platform Strengths

| Platform | Key Targeting | Best Signals |
|----------|---------------|--------------|
| Google | Keywords, search intent | What they're searching |
| Meta | Interests, behaviors, lookalikes | Engagement patterns |
| LinkedIn | Job titles, companies, industries | Professional identity |

### Key Concepts

- **Lookalikes**: Base on best customers (by LTV), not all customers
- **Retargeting**: Segment by funnel stage (visitors vs. cart abandoners)
- **Exclusions**: Always exclude existing customers and recent converters

---

## Creative Best Practices

### Image Ads
- Clear product screenshots showing UI
- Before/after comparisons
- Stats and numbers as focal point
- Human faces (real, not stock)
- Bold, readable text overlay (<20%)

### Video Ads (15-30 sec)
1. Hook (0-3 sec): Pattern interrupt, question, bold statement
2. Problem (3-8 sec): Relatable pain point
3. Solution (8-20 sec): Show product/benefit
4. CTA (20-30 sec): Clear next step

**Tips:**
- Always include captions (85% watch without sound)
- Vertical for Stories/Reels, square for feed
- First 3 seconds determine if they watch

### Creative Testing Hierarchy
1. Concept/angle (biggest impact)
2. Hook/headline
3. Visual style
4. Body copy
5. CTA

---

## Campaign Optimization

### Key Metrics

| Objective | Primary Metrics |
|-----------|----------------|
| Awareness | CPM, Reach, Video view rate |
| Consideration | CTR, CPC, Time on site |
| Conversion | CPA, ROAS, Conversion rate |

### Troubleshooting

**If CPA is too high:**
1. Check landing page first (is the problem post-click?)
2. Tighten audience targeting
3. Test new creative angles
4. Improve ad relevance/quality score

**If CTR is low:**
- Creative isn't resonating → test new hooks/angles
- Audience mismatch → refine targeting
- Ad fatigue → refresh creative

**If CPM is high:**
- Audience too narrow → expand
- Low relevance → improve creative fit

### Bid Strategy Progression
1. Start with manual or cost caps
2. Gather conversion data (50+ conversions)
3. Switch to automated with targets based on historical data

---

## Retargeting

### Funnel-Based Approach

| Stage | Audience | Message |
|-------|----------|---------|
| Top | Blog readers, video viewers | Educational, social proof |
| Middle | Pricing/feature page visitors | Case studies, demos |
| Bottom | Trial users, cart abandoners | Urgency, objection handling |

### Retargeting Windows

| Stage | Window | Frequency Cap |
|-------|--------|---------------|
| Hot (cart/trial) | 1-7 days | Higher OK |
| Warm (key pages) | 7-30 days | 3-5x/week |
| Cold (any visit) | 30-90 days | 1-2x/week |

### Exclusions to Always Set
- Existing customers (unless upsell)
- Recent converters (7-14 day window)
- Bounced visitors (<10 sec)

---

## Pre-Launch Checklist

- [ ] Conversion tracking tested with real conversion
- [ ] Landing page loads fast (<3 sec) and is mobile-friendly
- [ ] UTM parameters configured
- [ ] Budget set correctly
- [ ] Targeting matches intended audience
- [ ] At least 3 ad variants per ad set

---

## Common Mistakes

- Launching without conversion tracking
- Too many campaigns (fragmenting budget)
- Not giving algorithms enough learning time (min 50 conversions)
- Stopping campaigns during the learning phase
- Audiences too narrow (not enough data)
- Only one ad per ad set (no testing)

---

## Task-Specific Questions

1. What platform(s) are you running or want to start?
2. What's your monthly ad budget?
3. What does a successful conversion look like and what's it worth?
4. Do you have creative assets or need to create them?
5. What landing page will ads point to?
6. Is conversion tracking set up?

---

## Related Skills

- **ad-creative**: For generating and iterating ad copy and creative
- **copywriting**: For landing page copy that converts ad traffic
- **analytics-tracking**: For conversion tracking setup
- **ab-test-setup**: For landing page testing to improve ROAS
- **page-cro**: For optimizing post-click conversion rates
