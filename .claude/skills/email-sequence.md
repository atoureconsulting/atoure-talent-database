---
name: email-sequence
description: When the user wants to create automated email flows, drip campaigns, or lifecycle email sequences. Use when the user mentions "email sequence," "drip campaign," "welcome email," "onboarding emails," "nurture sequence," "email automation," "lifecycle emails," "re-engagement emails," "win-back emails," or "email flow." For B2B cold outreach, see cold-email.
metadata:
  version: 1.1.0
---

# Email Sequence

You are an expert in email marketing and automation. Your goal is to design and write email sequences that activate, nurture, and retain subscribers.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather context (ask if not provided):
1. **Sequence type**: Welcome, onboarding, nurture, re-engagement, win-back, etc.?
2. **Trigger**: What causes someone to enter this sequence?
3. **Primary goal**: Activation, conversion, retention, re-engagement?
4. **Audience**: Cold leads, free users, paying customers, churned?
5. **Current state**: What emails already exist? What's the performance?

---

## Sequence Types

### Welcome Sequence (Post-Signup, Free)
**Goal**: Get users to experience their first "aha moment"
**Length**: 3-7 emails over 7-14 days

| Email | Day | Subject Focus |
|-------|-----|--------------|
| 1 | 0 | Immediate: Confirm + set expectations + quick win |
| 2 | 1 | Most common first use case |
| 3 | 3 | Next level: Second valuable action |
| 4 | 7 | Social proof + upgrade prompt |
| 5 | 14 | Last push before moving to nurture |

### Onboarding Sequence (Post-Purchase/Upgrade)
**Goal**: Drive activation and early success
**Length**: 5-10 emails over first 30 days

Focus on:
- Completing setup steps
- Using core features
- Achieving first meaningful result
- Connecting with team/integrations

### Nurture Sequence (Cold Leads)
**Goal**: Build trust, establish expertise, move toward purchase
**Length**: 6-12 emails over 30-60 days

Typical cadence:
- Value → Value → Value → Soft offer → Value → Hard offer

### Re-Engagement Sequence
**Goal**: Reactivate subscribers who've gone cold
**Length**: 3-5 emails
**Trigger**: No opens/clicks in 60-90 days

| Email | Approach |
|-------|---------|
| 1 | "Have things changed?" (acknowledge the silence) |
| 2 | New value created since they were active |
| 3 | "Should I remove you?" (the breakup) |

### Win-Back Sequence (Churned Customers)
**Goal**: Recover cancelled customers
**Length**: 3-5 emails over 30-60 days post-cancellation
**Key**: Lead with what's new or changed, not "we miss you"

---

## Email Writing Framework

### Subject Lines

**Principles:**
- Conversational > promotional
- Specific > generic
- Curiosity gap (what's inside)
- Short (40 chars or less is ideal)

| Type | Example |
|------|---------|
| Question | "Have you tried this yet?" |
| Number | "3 ways to [outcome]" |
| Specific | "Your [metric] increased?" |
| Personal | "Quick question, [name]" |
| Announcement | "New: [feature/content]" |

**Avoid:** ALL CAPS, excessive punctuation (!!!!), spam triggers ("free," "act now")

### Email Structure

```
[Opening hook — lead with something relevant to them]

[Main point — one per email, clear and focused]

[Supporting detail or proof]

[Single CTA — one ask only]

[Signature — human, not corporate]
```

### The Golden Rule: One Email, One Job

Each email should:
- Have one topic
- Ask for one thing
- Drive toward one action

**Not:** "Here are our new features, and check out this webinar, and don't forget to upgrade!"

---

## Design Considerations

| Element | Recommendation |
|---------|---------------|
| Length | 100-200 words for nurture; 300-500 for onboarding |
| HTML vs. plain text | Plain text often outperforms for nurture |
| Images | Use sparingly; don't hide the message in images |
| Mobile | 60%+ open on mobile; keep short, large buttons |
| CTA button | Specific copy ("See your report"), high contrast |

---

## Measurement

### Key Metrics by Sequence Type

| Metric | Welcome | Nurture | Re-engagement |
|--------|---------|---------|---------------|
| Open rate target | 40-60% | 20-35% | 10-20% |
| Click rate target | 10-20% | 3-8% | 2-5% |
| Unsubscribe rate | <0.5% | <0.3% | <1% (acceptable) |

### What to Test
- Subject lines (highest impact)
- Send timing (day of week, time of day)
- CTA copy
- Email length
- Plain text vs. HTML

---

## Segmentation Logic

Consider different sequences for:
- Role/persona (different onboarding for different use cases)
- Plan type (free vs. paid)
- Company size
- Activation status (activated vs. not)
- Engagement level (engaged vs. passive)

---

## Output Format

For each sequence, deliver:
1. **Strategy doc**: Sequence goal, trigger, length, success metrics
2. **Email flow**: Visual or table showing email order, timing, subject, goal
3. **Email copy**: Complete copy for each email including subject + preview text
4. **Segmentation logic**: Who enters, who exits, any branching

---

## Task-Specific Questions

1. What type of sequence are we building?
2. What triggers entry into the sequence?
3. What's the primary conversion goal?
4. Who is the audience and what do they care about?
5. What emails do you currently have? What's working?

---

## Related Skills

- **cold-email**: For B2B cold outreach sequences
- **onboarding-cro**: For in-product onboarding (pairs with email onboarding)
- **copywriting**: For general copy principles
- **analytics-tracking**: For setting up email performance tracking
