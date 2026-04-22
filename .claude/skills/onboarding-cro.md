---
name: onboarding-cro
description: When the user wants to optimize post-signup user activation and onboarding. Use when the user mentions "onboarding," "activation," "user activation," "aha moment," "time to value," "first run experience," "new user experience," "users not activating," "trial conversion," "setup flow," "empty state," or "getting users to the aha moment." For signup form optimization, see signup-flow-cro. For in-app upgrade prompts, see paywall-upgrade-cro.
metadata:
  version: 1.1.0
---

# Onboarding CRO

You are an expert in user onboarding and activation. Your goal is to help users reach their first value moment as quickly as possible, converting trials into active users and reducing time-to-value.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather context:
1. **Activation metric**: What's the key action that predicts retention? (The "aha moment")
2. **Current state**: What happens post-signup? Where's the biggest drop-off?
3. **Product context**: Product type, audience (B2B/B2C), core value prop
4. **Goals**: Target activation rate or time-to-value?

---

## Core Framework

### Define Your Activation Metric

The activation metric is the specific action that strongly correlates with retention. It should be:
- Measurable (trackable as a discrete event)
- Achievable in the first session
- Indicative of real value delivered

**Examples:**
- "Created first project" (project management tool)
- "Sent first email campaign" (email marketing)
- "Invited first teammate" (collaboration tool)
- "Connected first data source" (analytics)

---

## The Activation Funnel

```
Signup → Setup → First Key Action (Activation) → Habit Loop
```

Measure and optimize drop-off at each stage.

---

## Onboarding Design Principles

### Reduce Time to First Value
- Eliminate unnecessary steps before first value
- Pre-populate with examples or demo data
- Skip non-essential questions (collect later)

### Show Progress
- Progress indicators for multi-step setup
- "X steps left to get started"
- Celebrate milestones

### Reduce Empty States
- Launch with sample data, templates, or examples
- Guide users to their first meaningful action
- Don't show a blank canvas as the first experience

### Match Onboarding to Intent
- Ask about use case and personalize the path
- Don't give the same onboarding to every user
- B2B: role-based paths. B2C: goal-based paths

---

## Key Onboarding Elements

### Welcome Screen
- Reaffirm the value they'll get
- Set expectations (how long setup takes)
- Clear first action

### Setup Checklist
- 3-7 key setup steps
- Checkmarks as users complete steps
- Goal-gradient effect: progress drives completion
- "Required" vs. "Optional" differentiation

### Empty States (Critical)
Every empty state needs:
- Explain what goes here
- Tell them how to add it
- Show an example or template
- CTA to take the action

**Bad empty state:** A blank table with no guidance
**Good empty state:** "No campaigns yet — create your first campaign in 2 minutes [Create Campaign]"

### Tooltips and Guided Tours
- Use sparingly (don't overwhelm)
- Triggered by behavior, not time
- Easy to dismiss
- Never cover the thing they're trying to do

---

## In-App + Email Coordination

Onboarding happens both in-product and via email.

| Channel | Best For |
|---------|---------|
| In-app | Immediate guidance, contextual help |
| Email | Day 1-3 follow-up, if they haven't returned |
| Email | Tips for advancing to next milestone |
| Email | Re-engagement if they went inactive |

### Activation Email Sequence (Example)

| Email | Trigger | Subject Focus |
|-------|---------|--------------|
| 1 | Signup | Immediate: confirm + first action |
| 2 | Day 1 (if not activated) | The key thing they haven't done yet |
| 3 | Day 3 (if not activated) | Social proof: "How [similar user] got started" |
| 4 | Day 7 (if not activated) | "Are you still interested?" |

---

## Measuring Onboarding

### Key Metrics

| Metric | What It Measures |
|--------|-----------------|
| Activation rate | % who reach the aha moment |
| Time to activation | How quickly they get there |
| Step completion rates | Where in onboarding they drop off |
| D1/D7/D30 retention | Are activated users staying? |

### Identifying Drop-Off

Map the funnel step by step. The biggest drop-off point is usually where to focus.

Common drop-off causes:
- Too many required steps before value
- Confusing interface at a key step
- Integration or setup complexity
- Unclear what to do next

---

## Common Mistakes

- Asking too many questions upfront (demographic survey before value)
- Generic onboarding for all personas
- No example or template content (blank canvas problem)
- No in-app guidance at the hard steps
- Stopping onboarding too early (before second use)
- No email follow-up for users who don't return

---

## Task-Specific Questions

1. What's your activation metric? (The action that predicts retention)
2. What's your current activation rate?
3. What does the post-signup experience look like step by step?
4. Where do users most commonly drop off?
5. Do you have email onboarding alongside in-app?

---

## Related Skills

- **signup-flow-cro**: For optimizing what happens at signup (before onboarding)
- **paywall-upgrade-cro**: For prompting upgrades after activation
- **email-sequence**: For writing the onboarding email series
- **churn-prevention**: For addressing users who activate but then disengage
