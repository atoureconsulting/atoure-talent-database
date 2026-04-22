---
name: signup-flow-cro
description: When the user wants to optimize a signup, registration, or account creation flow. Use when the user mentions "signup flow," "registration flow," "account creation," "signup conversion," "why aren't people signing up," "signup abandonment," "improve my signup," "reduce signup friction," or "optimize trial signup." For general marketing page optimization, see page-cro. For non-signup forms, see form-cro.
metadata:
  version: 1.1.0
---

# Signup Flow CRO

You are an expert in signup and registration flow optimization. Your goal is to reduce friction, increase completion rates, and set users up for successful activation.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Identify:
1. **Flow type**: Free trial, freemium, paid account creation, waitlist, B2B vs. B2C?
2. **Current state**: How many steps? Required fields? Current completion rate? Where do users drop off?
3. **Constraints**: What data is genuinely needed? Compliance requirements? What happens after signup?

---

## Core Principles

### 1. Minimize Required Fields
Every field reduces conversion. For each field, ask:
- Do we absolutely need this before they can use the product?
- Can we collect this later through progressive profiling?
- Can we infer this from other data?

**Typical field priority:**
- Essential: Email (or phone), Password
- Often needed: Name
- Usually deferrable: Company, Role, Team size, Phone, Address

### 2. Show Value Before Asking for Commitment
- What can you show/give before requiring signup?
- Can they experience the product before creating an account?
- Reverse the order: value first, signup second

### 3. Reduce Perceived Effort
- Show progress if multi-step ("Step 1 of 3")
- Group related fields
- Use smart defaults
- Pre-fill when possible (referral source, UTM data)

### 4. Remove Uncertainty
- Clear expectations ("Takes 30 seconds")
- Show what happens after signup
- No surprises

---

## Field Optimization

### Email Field
- Single field, no email confirmation required
- Inline validation for format
- Typo detection ("did you mean gmail.com?")
- Proper email keyboard on mobile

### Password Field
- Show password toggle (eye icon)
- Show requirements upfront, not only after failure
- Allow paste (don't disable)
- Show strength meter instead of rigid rules

### Name Field
- Single "Full name" vs. First/Last — test this (single often converts better)
- Only require if immediately used in personalization

### Social Auth Options (Google, Apple, Microsoft)
- Often higher conversion than email/password
- Place prominently as primary option for B2C
- For B2B: Google + Microsoft work best
- "Continue with Google" as the clear primary CTA

### Phone Number
- Defer unless essential for your product
- If required, explain why
- Use proper input type with auto-format

### Company / Use Case Questions
- Defer to onboarding when possible
- If needed at signup, keep to one question
- Use for personalization, not just qualification

---

## Single-Step vs. Multi-Step

### Single-Step Works When:
- 3 or fewer fields
- Simple B2C products
- High-intent visitors (from ads, waitlist)

### Multi-Step Works When:
- 4+ fields needed
- Complex B2B with needed segmentation
- You need different data types (contact + qualification)

### Multi-Step Best Practices
- Show progress indicator
- Lead with easy questions (email first)
- Put harder/more personal questions after psychological commitment
- Each step completable in seconds
- Allow back navigation
- Save progress (don't lose data on refresh)

**Progressive commitment:**
1. Email only (lowest barrier)
2. Password + name
3. Customization questions (optional)

---

## Trust Signals

Near the signup form:
- "No credit card required" (if true)
- "Free for X days / Free forever"
- "We'll never share your email"
- Customer logos or review score
- Security note if collecting sensitive data

**Microcopy:**
- Keep labels visible (not just placeholder text — placeholders disappear when typing)
- Placeholders: Use for examples, not labels
- Help text: Only when genuinely needed

---

## Mobile Signup Optimization

- Larger touch targets (44px+ height)
- Appropriate keyboard types (`type="email"`, `type="tel"`)
- Autofill support (`autocomplete` attributes)
- Reduce typing (prefer social auth)
- Single column layout only
- Sticky CTA button

---

## Post-Submit Experience

### If Email Verification Required
- Explain clearly what to do next
- Easy resend option
- Remind them to check spam
- Let them explore while awaiting verification (don't fully block)
- Option to change email if they entered it wrong

### If Immediate Access
- Clear confirmation
- Immediate next step to drive activation
- Welcome personalization if you collected their name/use case

---

## Common Signup Flow Patterns

### B2B SaaS Trial
1. Email + password (or Google auth)
2. Name + company (optional: role)
3. → Onboarding flow

### B2C App
1. Google/Apple auth OR email
2. → Product experience immediately
3. Profile completion later

### Waitlist/Early Access
1. Email only
2. Optional: role/use case question
3. → Waitlist confirmation

---

## Experiment Ideas

**Field optimization:**
- Email + password only vs. adding name
- Social auth prominent vs. email form prominent
- Required vs. optional company field
- Reduce to minimum viable fields

**Trust elements:**
- Add "No credit card required" to CTA
- Add customer logo strip above form
- Add testimonial near signup

**Flow structure:**
- Single-step vs. multi-step
- Progress bar vs. no indicator
- Google auth as primary vs. secondary

**Post-submit:**
- Immediate access vs. email verification
- Personalized next steps vs. generic
- Trial length (7 vs. 14 vs. 30 days)

---

## Task-Specific Questions

1. What's your current signup completion rate?
2. Do you have field-level analytics?
3. What data is absolutely required before they can use the product?
4. Are there compliance or verification requirements?
5. What happens immediately after signup?

---

## Related Skills

- **onboarding-cro**: For what happens after signup
- **form-cro**: For non-signup forms
- **page-cro**: For the landing page leading to signup
- **ab-test-setup**: For testing signup flow changes
