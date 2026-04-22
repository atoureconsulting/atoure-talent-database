---
name: form-cro
description: When the user wants to optimize lead capture forms, contact forms, demo request forms, or any other conversion forms. Use when the user mentions "form optimization," "form conversion," "reduce form friction," "form abandonment," "form fields," "lead form," "improve form completion," or asks about a specific form type. For full page optimization, see page-cro. For signup flows, see signup-flow-cro.
metadata:
  version: 1.1.0
---

# Form CRO

You are an expert in form optimization. Your goal is to maximize form completion rates while capturing the data that matters.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Identify:
1. **Form Type**: Lead capture, contact, demo request, application, survey, checkout, quote
2. **Current State**: How many fields? Current completion rate? Where do users abandon?
3. **Business Context**: What happens with form submissions? Which fields are actually used?

---

## Core Principles

### 1. Every Field Has a Cost

Each field reduces completion rate:
- 3 fields: Baseline
- 4-6 fields: 10-25% reduction
- 7+ fields: 25-50%+ reduction

For each field, ask: Is this absolutely necessary before we can help them? Can we get this later?

### 2. Value Must Exceed Effort
- Clear value proposition above form
- Make what they get obvious

### 3. Reduce Cognitive Load
- One question per field
- Clear, conversational labels
- Logical grouping and order

---

## Field-by-Field Optimization

### Email Field
- Single field, no confirmation required
- Inline validation
- Typo detection ("did you mean gmail.com?")
- Proper mobile keyboard type

### Name Fields
- Single "Name" field reduces friction vs. First/Last
- Split only if personalization truly requires it

### Phone Number
- Make optional if possible
- If required, explain why ("We'll use this to schedule your demo")
- Auto-format as they type

### Company/Organization
- Auto-suggest for faster entry
- Consider inferring from email domain

### Job Title/Role
- Dropdown if categories matter for routing
- Free text if wide variation

### Message/Comments
- Make optional
- Reasonable character guidance
- Expand on focus

### Dropdown Selects
- Searchable if many options
- Consider radio buttons if < 5 options
- Include "Other" option with text field

---

## Form Layout

### Field Order
1. Start with easiest fields (name, email)
2. Build commitment before harder fields
3. Sensitive fields last (phone, company size)

### Labels vs. Placeholders

**Do this:**
```
Email
[name@company.com]
```

**Not this:**
```
[Enter your email address]  ← Disappears on focus; leaves user confused
```

Keep labels visible always — placeholders vanish when the user starts typing.

### Single vs. Multi-Column
- Single column: Higher completion, mobile-friendly
- Multi-column: Only for short related fields (First/Last name)
- Default: Single column

---

## Multi-Step Forms

Use when:
- More than 5-6 fields
- Logically distinct sections
- Complex forms (applications, quotes)

Best practices:
- Progress indicator (Step X of Y)
- Start easy, end with sensitive info
- Allow back navigation
- Save progress (don't lose data on refresh)

### Progressive Commitment Pattern
1. Low-friction start (just email)
2. More detail (name, company)
3. Qualifying questions
4. Contact preferences

---

## Submit Button Optimization

### Button Copy
- Weak: "Submit," "Send"
- Strong: "[Action] + [What they get]"

Examples:
- "Get My Free Quote"
- "Download the Guide"
- "Request Demo"
- "Start Free Trial"

### Post-Submit States
- Loading state (disable button, show spinner)
- Success confirmation (clear next steps)
- Error handling (keep their data, focus on first error)

---

## Error Handling

### Inline Validation
- Validate as they move to next field
- Not while they're actively typing
- Clear visual indicators

### Error Messages
- Specific: "Please enter a valid email (e.g., name@company.com)"
- Not: "Invalid input"
- Positioned near the field
- Never clear their input on error

---

## Trust Reduction

Near the form:
- "We'll never share your info"
- "No spam, unsubscribe anytime"
- Expected response time ("We'll reply within 1 business day")
- Security badges if collecting sensitive data

---

## Form Types: Specific Guidance

| Form Type | Recommended Fields | Notes |
|-----------|-------------------|-------|
| Lead capture | Email only (or + name) | Test email-only vs. email + name |
| Contact | Name + Email + Message | Phone optional |
| Demo request | Name + Email + Company | Calendar embed can increase show rate |
| Quote request | Multi-step often best | Save progress for complex forms |
| Survey | One question per screen | Progress bar essential |

---

## Key Metrics

| Metric | What It Measures |
|--------|-----------------|
| Form start rate | Page views → Started form |
| Completion rate | Started → Submitted |
| Field drop-off | Which fields lose people |
| Error rate | By field |
| Time to complete | Total and by field |

---

## Experiment Ideas

- Single-step vs. multi-step with progress bar
- Reduce to minimum viable fields
- Add/remove phone number field
- Email-only vs. email + name for lead capture
- Button copy variations
- Add privacy assurance near form
- Calendar embed vs. form submission (demo request)

---

## Task-Specific Questions

1. What's your current form completion rate?
2. Do you have field-level analytics showing where people drop off?
3. Which fields do you actually use in follow-up?
4. Are there compliance/legal requirements?
5. What's the mobile vs. desktop split for this form?

---

## Related Skills

- **signup-flow-cro**: For account creation forms
- **popup-cro**: For forms inside popups/modals
- **page-cro**: For the page containing the form
- **ab-test-setup**: For testing form changes
