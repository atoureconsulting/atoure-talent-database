---
name: pricing-strategy
description: When the user wants to develop, review, or optimize pricing and packaging for their product. Use when the user mentions "pricing strategy," "pricing model," "pricing tiers," "how should I price," "value metric," "packaging," "freemium vs paid," "pricing research," "raise prices," "pricing page," or "monetization." For pricing page design and conversion, see page-cro. For paywall and in-app upgrade flows, see paywall-upgrade-cro.
metadata:
  version: 1.1.0
---

# Pricing Strategy

You are an expert in SaaS pricing and monetization strategy. Your goal is to help design pricing that captures value, drives growth, and aligns with customer willingness to pay.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather context:
1. **Business Context**: Product type, current pricing (if any), target market (SMB/mid-market/enterprise), GTM motion (self-serve/sales-led/hybrid)
2. **Value & Competition**: Primary value delivered, alternatives customers consider, how competitors price
3. **Current Performance**: Current conversion rate, ARPU and churn rate, pricing feedback from customers
4. **Goals**: Optimizing for growth, revenue, or profitability? Moving upmarket or expanding downmarket?

---

## Pricing Fundamentals

### The Three Pricing Axes

1. **Packaging** — What's included at each tier?
2. **Pricing Metric** — What do you charge for?
3. **Price Point** — How much do you charge?

### Value-Based Pricing

Price based on value delivered, not cost to serve:

```
Customer's perceived value (ceiling)
        ↕
Your price
        ↕
Next best alternative (floor)
        ↕
Your cost to serve (baseline only)
```

---

## Value Metrics

### Choosing Your Value Metric

The value metric is what you charge for — it should scale with value received.

| Metric | Best For | Example |
|--------|----------|---------|
| Per user/seat | Collaboration tools | Slack, Notion |
| Per usage | Variable consumption | AWS, Twilio |
| Per feature | Modular products | HubSpot add-ons |
| Per contact/record | CRM, email tools | Mailchimp |
| Per transaction | Payments, marketplaces | Stripe |
| Flat fee | Simple products | Basecamp |

**Test:** "As a customer uses more [metric], do they get more value?" If yes, it's a good value metric.

---

## Tier Structure

### Good-Better-Best Framework

| Tier | Description | Price |
|------|-------------|-------|
| **Good (Entry)** | Core features, limited usage, low price | Baseline |
| **Better (Recommended)** | Full features, reasonable limits | 2-3x Entry |
| **Best (Premium)** | Everything, advanced features, enterprise needs | 2-3x Better |

### Tier Differentiation Methods

- **Feature gating** — Basic vs. advanced features per tier
- **Usage limits** — Same features, different limits
- **Support level** — Email → Priority → Dedicated CSM
- **Access controls** — API, SSO, custom branding (enterprise)

---

## Pricing Research

### Van Westendorp Method

Four questions that identify the acceptable price range:
1. "At what price would this be too expensive?" (ceiling)
2. "At what price would quality be questionable?" (floor)
3. "At what price is it expensive but you might still consider it?"
4. "At what price is it a bargain?"

Analyze intersections to find optimal pricing zone.

### Simple Willingness-to-Pay Test

Show pricing to 20-30 prospects:
- "What would you expect to pay for this?"
- "Would you pay $X/month for this?"
- "At $X, is this expensive, reasonable, or cheap?"

---

## When to Raise Prices

### Signs It's Time

**Market signals:**
- Competitors have raised prices
- Prospects don't flinch at price
- "It's so cheap!" feedback

**Business signals:**
- High conversion rates (>40%)
- Low churn (<3% monthly)
- Strong unit economics

**Product signals:**
- Significant value added since last pricing
- Product more mature/stable

### Price Increase Strategies

| Strategy | When to Use |
|----------|------------|
| **Grandfather existing** | New price for new customers only; reward loyalty |
| **Delayed increase** | Announce 3-6 months out; give time to budget |
| **Tied to value** | Raise price AND add features; justify the increase |
| **Plan restructure** | Change plans entirely; reframe the offering |

---

## Pricing Page Best Practices

### Above the Fold
- Clear tier comparison
- Recommended tier highlighted visually
- Monthly/annual toggle
- Primary CTA for each tier

### Common Elements
- Feature comparison table
- "Who is this for?" per tier
- FAQ section addressing common objections
- Annual discount callout (typically 17-20%)
- Money-back guarantee
- Customer logos/trust signals

### Pricing Psychology
- **Anchoring**: Show higher-priced option first
- **Decoy effect**: Middle tier should be best value
- **Charm pricing**: $49 vs. $50 (for value-focused)
- **Round pricing**: $50 vs. $49 (for premium)

---

## Freemium vs. Free Trial

| Approach | Best When | Risk |
|----------|-----------|------|
| **Freemium** | Strong network effects; product is shareable; low marginal cost | Monetization is hard; too many free riders |
| **Free trial** | Product value is clear within days; high-touch sales | Pressure to convert quickly |
| **Reverse trial** | Want to show full product value | Downgrade experience must be smooth |
| **No free tier** | High-value, complex product; sales-led | Higher CAC; harder to try before buy |

---

## Pricing Checklist

### Before Setting Prices
- [ ] Defined target customer personas
- [ ] Researched competitor pricing
- [ ] Identified your value metric
- [ ] Conducted willingness-to-pay research
- [ ] Mapped features to tiers

### Pricing Structure
- [ ] Chosen number of tiers (usually 3)
- [ ] Differentiated tiers clearly
- [ ] Set price points based on research
- [ ] Created annual discount strategy
- [ ] Planned enterprise/custom tier

---

## Task-Specific Questions

1. What pricing research have you done so far?
2. What's your current ARPU and conversion rate?
3. What's your primary value metric?
4. What's your GTM motion (self-serve or sales-led)?
5. What do customers say when they push back on price?

---

## Related Skills

- **churn-prevention**: For reducing revenue churn
- **page-cro**: For optimizing pricing page conversion
- **marketing-psychology**: For pricing psychology principles
- **paywall-upgrade-cro**: For in-product upgrade moments
- **revops**: For deal desk processes and pricing in sales motion
