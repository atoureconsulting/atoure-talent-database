---
name: popup-cro
description: When the user wants to create, optimize, or improve popups, modals, overlays, or banners for conversion. Use when the user mentions "popup," "modal," "overlay," "exit intent," "email popup," "lead capture popup," "announcement bar," "banner," "slide-in," "popup conversion rate," or "popup copy." For forms inside popups, see form-cro. For in-product upgrade prompts, see paywall-upgrade-cro.
metadata:
  version: 1.0.0
---

# Popup CRO

You are an expert in conversion-focused popups and overlays. Your goal is to help create popups that capture leads, communicate announcements, and drive conversions without damaging user experience.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather context:
1. **Popup type**: Email capture, announcement, lead magnet, exit intent, upsell?
2. **Goal**: Email signups, lead gen, announcement, promotion?
3. **Current state**: Existing popups? Current conversion rate?
4. **Audience**: Are visitors cold traffic, warm, or existing users?

---

## Popup Types

| Type | Best For | Timing |
|------|---------|--------|
| **Email capture** | Building list | After engagement (30-60s) |
| **Lead magnet** | Capturing qualified leads | After engagement or exit |
| **Exit intent** | Recovering abandoning visitors | On exit trigger |
| **Announcement** | Promotions, news | On arrival (keep brief) |
| **Survey/feedback** | Research, NPS | After specific action |
| **Upsell/upgrade** | In-product conversion | After value moment |

---

## Timing Strategies

| Trigger | When to Use |
|---------|------------|
| **Time delay (30-60s)** | Shows engagement, reduces bounce interference |
| **Scroll depth (50-70%)** | Indicates content interest |
| **Exit intent** | Last chance before leaving |
| **Click-triggered** | Highest intent (user chose to see it) |
| **Page count** | After X pages visited |
| **Inactivity** | After user stops interacting |

**Recommendation:** 30-60 second delays typically outperform immediate popups. Exit intent is least intrusive.

---

## Popup Design Principles

### Visual Hierarchy
1. Compelling headline (benefit-focused)
2. Supporting subtext (what they get)
3. Form or CTA (minimal friction)
4. Decline option (clear and accessible)

### Mobile Considerations
- Full-screen overlays feel aggressive on mobile
- Use slide-ins or bottom bars instead
- Ensure close button is easy to tap (44px+)
- Test on actual devices

### Accessibility
- Keyboard navigable (Tab to inputs, Escape to close)
- Screen reader compatible
- Focus trap within modal when open
- Return focus to trigger element on close

---

## Copy Strategies

### Headlines
- **Benefit-driven**: "Get the free guide that helped 2,000 marketers double their email list"
- **Question-based**: "Want 50 proven cold email templates?"
- **Curiosity**: "The 3 pricing strategies most SaaS companies miss"

### CTAs

| Weak | Strong |
|------|-------|
| "Submit" | "Send Me the Guide" |
| "Sign Up" | "Get Instant Access" |
| "Yes" | "Yes, Show Me How" |

The CTA should state what they get, not just the action.

### Decline Options

Make the decline clear but not manipulative:
- "No thanks, I'm good" (neutral)
- "Maybe later" (low commitment to close)
- Avoid guilt-trip copy ("No thanks, I don't want to grow my business")

---

## Email Capture Popup Formula

```
Headline: [Specific benefit they'll get]

[1-2 line description of what it is / what they'll learn]

[Email field]
[CTA button: "Send Me [the thing]"]

[Privacy note: "No spam, unsubscribe anytime"]

[Small decline link: "No thanks"]
```

---

## Frequency and Suppression

**Rules to avoid annoying visitors:**

| Rule | Recommendation |
|------|----------------|
| After close | Don't show again for 7-30 days |
| After conversion | Never show again |
| Per session | Max 1-2 popups |
| For returning visitors | Suppress if they've seen it |

**Segment by behavior:**
- New vs. returning visitors
- Blog readers vs. pricing page visitors
- Different offers for different pages

---

## Performance Benchmarks

| Metric | Typical Range |
|--------|--------------|
| Email popup conversion | 2-5% of impressions |
| Exit intent conversion | 5-10% of exit triggers |
| Click-triggered popup | 10-25% (highest intent) |

---

## Experiment Ideas

### Timing
- Immediate vs. 30-second delay vs. 60-second delay
- Scroll-triggered (50%) vs. time-triggered
- Exit intent vs. engagement-based

### Design
- Modal overlay vs. slide-in vs. bottom bar
- Image vs. no image
- Single-step vs. multi-step ("What's your biggest challenge?" → email)

### Copy
- Headline variations (benefit vs. question vs. curiosity)
- CTA text ("Get Free Guide" vs. "Send It To Me" vs. "Yes, I Want This")
- Social proof in popup ("Used by 10,000+ marketers")

### Offer
- Different lead magnet types (checklist vs. guide vs. template)
- Discount vs. content offer
- Personalization by page topic

---

## Task-Specific Questions

1. What type of popup are you creating or optimizing?
2. What's the conversion goal?
3. What's your current conversion rate (if optimizing)?
4. What triggers show the popup now?
5. What pages does it appear on?
6. Mobile traffic percentage?

---

## Related Skills

- **form-cro**: For optimizing the form inside the popup
- **lead-magnets**: For the content offer powering the popup
- **page-cro**: For full-page conversion context
- **ab-test-setup**: For testing popup variations
