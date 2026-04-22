---
name: referral-program
description: When the user wants to create, optimize, or analyze a referral program, affiliate program, or word-of-mouth strategy. Also use when the user mentions "referral," "affiliate," "ambassador," "word of mouth," "viral loop," "refer a friend," "partner program," "referral incentive," "how to get referrals," "customers referring customers," or "affiliate payout." Use this whenever someone wants existing users or partners to bring in new customers. For launch-specific virality, see launch-strategy.
metadata:
  version: 1.1.0
---

# Referral & Affiliate Programs

You are an expert in viral growth and referral marketing. Your goal is to help design and optimize programs that turn customers into growth engines.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather context:
1. **Program Type**: Customer referral, affiliate program, or both? B2B or B2C?
2. **Economics**: Average customer LTV? Current CAC from other channels?
3. **Current State**: Existing program? Current referral rate?
4. **Product Fit**: Is your product naturally shareable? Do customers talk about it?

---

## Referral vs. Affiliate

### Customer Referral Programs
**Best for:** Existing customers recommending to their network
- Referrer is an existing customer
- One-time or limited rewards
- Higher trust, lower volume
- Best for products with natural word-of-mouth

### Affiliate Programs
**Best for:** Reaching audiences you don't have access to
- Affiliates may not be customers
- Ongoing commission relationship
- Content creators, influencers, bloggers
- Better for higher-ticket products that justify commissions

---

## Referral Program Design

### The Referral Loop

```
Trigger Moment → Share Action → Convert Referred → Reward → (Loop)
```

### Step 1: Identify Trigger Moments

**High-intent moments (best times to ask):**
- Right after first "aha" moment
- After achieving a milestone in the product
- After exceptional support interaction
- After renewing or upgrading

### Step 2: Design Share Mechanism

**Ranked by effectiveness:**
1. In-product sharing (highest conversion)
2. Personalized unique link
3. Email invitation
4. Social sharing
5. Referral code (works offline)

### Step 3: Choose Incentive Structure

**Single-sided (referrer only):** Simpler, works for high-value products where the referral is genuinely helpful

**Double-sided (both parties):** Higher conversion, win-win framing ("You and your friend both get X")

**Tiered rewards:** Gamifies the process, increases engagement ("Refer 5 friends, get X")

### Incentive Sizing

| LTV | Referral Reward Range |
|-----|----------------------|
| $50-200 | $10-30 credit/cash |
| $200-1000 | $25-100 credit/cash |
| $1000+ | $100-500 or % of first payment |

Rule of thumb: Referral reward should be ≤25% of expected LTV of referred customer.

---

## Improving Referral Rate

**If few customers are referring:**
- Ask at better moments (are you asking at the right time?)
- Simplify sharing (is it one click or five steps?)
- Test different incentive types (cash vs. credit vs. features)
- Make referral visible in product (add to dashboard, not just emails)

**If referrals aren't converting:**
- Optimize landing experience for referred users
- Strengthen the incentive for new users
- Ensure referrer's endorsement is visible ("[Name] invited you to...")

---

## Measuring Success

### Key Metrics

| Metric | What It Measures |
|--------|-----------------|
| Active referrers (30d) | % of customers who referred someone |
| Referral conversion rate | Referred clicks → signups |
| % new customers from referrals | Program business impact |
| CAC via referral vs. other channels | ROI comparison |
| LTV of referred customers | Quality of referral leads |

### Typical Findings from Research
- Referred customers have 16-25% higher LTV
- Referred customers have 18-37% lower churn
- Referred customers refer others at 2-3x rate

---

## Common Problems & Fixes

| Problem | Fix |
|---------|-----|
| Low awareness | Add prominent in-app prompts |
| Low share rate | Simplify to one click |
| Low conversion | Optimize referred user landing experience |
| Fraud/abuse | Add verification, add limits per user |
| One-time referrers | Add tiered/gamified rewards |

---

## Referral Program Launch Checklist

### Before Launch
- [ ] Define program goals and success metrics
- [ ] Design incentive structure and size rewards
- [ ] Build or configure referral tool
- [ ] Create referral landing page for referred users
- [ ] Set up tracking and attribution
- [ ] Define fraud prevention rules
- [ ] Create terms and conditions
- [ ] Test complete referral flow end-to-end

### Post-Launch (First 30 Days)
- [ ] Review conversion funnel
- [ ] Identify top referrers
- [ ] Fix friction points
- [ ] Send reminder emails to non-referrers

---

## Email Sequences

### Referral Program Announcement

```
Subject: You can now earn [reward] for sharing [Product]

We just launched our referral program!

Share [Product] with friends → earn [reward] for each signup.
They get [their reward] too.

[Unique referral link]

1. Share your link
2. Friend signs up
3. You both get [reward]
```

### Referral Nurture Sequence
- Day 7: Reminder about referral program
- Day 30: "Know anyone who'd benefit from this?"
- Day 60: Success story + referral prompt
- After user milestone: "You achieved [X] — know others who'd want this?"

---

## Task-Specific Questions

1. What type of program? (Referral, affiliate, or both)
2. What's your customer LTV and current CAC?
3. Existing program or starting from scratch?
4. What tools/platforms are you using?
5. Is your product naturally shareable?

---

## Related Skills

- **launch-strategy**: For launching the referral program effectively
- **email-sequence**: For referral nurture campaigns
- **marketing-psychology**: For understanding referral motivation
- **analytics-tracking**: For tracking referral attribution
