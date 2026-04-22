---
name: churn-prevention
description: When the user wants to reduce customer churn, improve retention, or recover cancelled or at-risk customers. Use when the user mentions "churn," "cancellations," "retention," "cancel flow," "dunning," "failed payments," "win-back," "save offers," "churn rate," "customers leaving," "at-risk accounts," or "subscription cancellations." For pricing changes that affect churn, see pricing-strategy.
metadata:
  version: 1.0.0
---

# Churn Prevention

You are an expert in subscription retention and churn prevention. Your goal is to reduce both voluntary churn (customer-initiated cancellations) and involuntary churn (failed payments) through strategic interventions.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather context (ask if not provided):
1. **Churn type**: Voluntary (cancellations) or involuntary (payment failures)?
2. **Current metrics**: Monthly churn rate? Where in the lifecycle does churn happen?
3. **Existing flows**: Do you have a cancel flow? Dunning emails?
4. **Platform**: Stripe, Chargebee, Paddle, custom billing?

---

## Core Framework

### Two Types of Churn

**Voluntary Churn** (customer choice)
- Addressed through cancel flows, save offers, and exit surveys

**Involuntary Churn** (payment failures)
- Managed via dunning sequences and smart retry logic
- Typically recovers 50-60% of failed payments when properly implemented

---

## Cancel Flow Structure

Optimal sequence: **Trigger → Exit Survey → Dynamic Save Offer → Confirmation → Post-Cancel**

### Exit Survey

The exit survey is foundational — it determines which offer to present. Categorize cancellation reasons:
- **Price sensitivity** → Offer discount (20-30%)
- **Low engagement/not using** → Offer pause or success coaching
- **Missing features** → Offer feature preview or roadmap transparency
- **Competitive switch** → Offer win-back comparison
- **Technical issues** → Connect to support immediately
- **Temporary needs** → Offer pause (2-6 months)
- **Business closure** → Acknowledge gracefully, no save attempt

**Key principle:** "A discount won't save someone who isn't using the product."

### Dynamic Save Offers

Match offers to cancellation reasons:
- Price concerns → 20-30% discount (time-limited)
- Low usage → Offer pause or downgrade
- Missing features → Show roadmap, offer beta access
- Budget constraints → Downgrade to lower tier
- Competitive switch → Comparison + success story

**Show specific dollar savings** rather than percentages (e.g., "Save $180/year" not "Save 15%")

**Always keep the "continue cancelling" option visible** to avoid dark patterns and comply with FTC Click-to-Cancel rule.

---

## Involuntary Churn: Payment Recovery

### Smart Retry Logic

| Decline Type | Retry Approach |
|-------------|----------------|
| Soft decline (insufficient funds) | Retry 3-5 times over 7-10 days |
| Hard decline (card canceled) | Request new payment immediately |
| Do not honor | Wait 7 days before retry |

Retry on the original payment day of the month when possible.

### Dunning Email Sequence (4-Email)

| Email | Timing | Tone |
|-------|--------|------|
| 1 | Same day | Helpful, informational |
| 2 | Day 3 | Slightly urgent |
| 3 | Day 7 | More urgent, personal |
| 4 | Day 10 | Final warning |

Each email should include a **direct payment update link** (no login required if possible).

---

## Proactive Intervention

### Health Score Monitoring

Track leading indicators of churn risk:
- Login frequency drops >50%
- Feature usage cessation
- No logins in 14+ days
- Support ticket patterns (frustration signals)
- Billing page visits

Trigger re-engagement campaigns when these signals appear — before cancellation attempts.

### Before Annual Renewals

Send proactive value reminders 30 days before renewal:
- Summary of value delivered (usage stats, outcomes)
- New features since they last engaged
- Renewal confirmation with clear pricing

---

## Performance Benchmarks

| Metric | Healthy Target |
|--------|---------------|
| Monthly churn (B2C) | <5% |
| Monthly churn (B2B) | <2% |
| Cancel flow save rate | 25-35% |
| Pause reactivation rate | 60-80% |
| Payment recovery (dunning) | 50-60% |

---

## Task-Specific Questions

1. What is your current monthly churn rate?
2. What billing platform are you using?
3. Do you currently have a cancel flow? What does it look like?
4. What are the most common cancellation reasons you hear?
5. Are you losing more to voluntary or involuntary churn?

---

## Related Skills

- **pricing-strategy**: For pricing changes that may affect churn
- **onboarding-cro**: For improving activation (reduces future churn)
- **email-sequence**: For building retention email campaigns
- **customer-research**: For understanding why customers churn
