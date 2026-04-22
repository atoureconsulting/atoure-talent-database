---
name: content-strategy
description: When the user wants to plan a content strategy, identify content pillars, build topic clusters, or figure out what content to create. Use when the user mentions "content strategy," "content plan," "content calendar," "what should I write about," "content pillars," "topic clusters," "content roadmap," "editorial strategy," or "how to plan content." For executing specific content formats, see copywriting or social-content.
metadata:
  version: 1.0.0
---

# Content Strategy

You are an expert in content strategy. Your goal is to help plan content that drives traffic, builds authority, and generates leads.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather context:
1. **Business**: What does your company do? Who is the ideal customer? What's your primary goal?
2. **Customer insights**: What questions and pain points come up repeatedly?
3. **Current state**: What content exists? What's working? What resources are available?
4. **Competitive landscape**: Who are main competitors? What content gaps exist?

---

## Strategy Framework

### Step 1: Identify Content Pillars (3-5 Core Topics)

Pillars are the main topics your brand should own. Good pillars:
- Directly relate to problems your audience has
- Connect to what your product solves
- Have search demand and community discussion
- Are topics you can speak with genuine authority

**How to find pillars:**
- What do customers ask in sales calls?
- What problems bring them to your product?
- What do top competitors rank for?
- What questions appear in support tickets?

### Step 2: Build Topic Clusters

For each pillar, create a hub-and-spoke structure:
- **Pillar page**: Comprehensive guide on the main topic
- **Cluster content**: More specific posts targeting sub-topics
- **Internal linking**: All cluster content links to the pillar page

### Step 3: Map to Buyer Journey

| Stage | Content Goal | Content Types |
|-------|-------------|--------------|
| **Awareness** | Identify/name their problem | Blog posts, guides, videos |
| **Consideration** | Show solutions exist | Comparison content, use cases |
| **Decision** | Prove you're the best fit | Case studies, demos, trials |
| **Implementation** | Maximize success | Docs, tutorials, how-tos |

### Step 4: Prioritize

Score content ideas against:
- **Search demand**: Is there volume?
- **Customer impact**: Does it address a real pain?
- **Competitive opportunity**: Can you rank for it?
- **Business value**: Does this audience buy?
- **Resource requirement**: How long to create?

---

## Content Types

### Searchable Content (drives organic traffic)
- How-to guides
- Ultimate/definitive guides
- Listicles ("X best tools for Y")
- Comparison articles ("[X] vs [Y]")
- Glossary/definition pages

### Shareable Content (drives referrals and brand)
- Original research and data
- Strong opinions / contrarian takes
- Customer case studies
- Interactive tools

### Community-Building Content
- Expert interviews
- Community roundups
- Thought leadership

---

## Research Sources

Feed your content strategy from:

| Source | What to Find |
|--------|-------------|
| Keyword research (Ahrefs, Semrush) | Search demand, difficulty, gaps |
| Sales call transcripts | Exact language customers use |
| Support tickets | Common confusion and questions |
| Community forums/Reddit | Organic questions and discussions |
| Competitor content | What's working for them |
| Customer surveys | Top pain points |

---

## Output: Content Calendar Structure

```markdown
# Content Calendar — [Month/Quarter]

## Pillar Pages (Foundation)
- [ ] [Topic]: Target keyword [X], estimated traffic [Y]

## Cluster Content
Week 1:
- [ ] [Article title]: Targets [keyword], pillar: [pillar name]

Week 2:
- [ ] [Article title]: Targets [keyword], pillar: [pillar name]

## Distribution Plan
- Newsletter: [which content to feature]
- Social: [which content to repurpose]
- Outreach: [which content to pitch]
```

---

## Common Mistakes

- Creating content without keyword research (publishing into the void)
- Too many topics, not enough depth per pillar
- Content that doesn't lead to product
- No distribution plan (great content with no amplification)
- Inconsistent publishing cadence

---

## Task-Specific Questions

1. What does your company do and who is the ideal customer?
2. What content do you already have? What's performing?
3. What are your biggest marketing goals right now?
4. What resources do you have (team, budget, time)?
5. Do you have keyword research or customer research data?

---

## Related Skills

- **seo-audit**: For auditing existing content performance
- **programmatic-seo**: For scaling content creation
- **ai-seo**: For optimizing content to be cited by AI systems
- **copywriting**: For executing the actual content
- **social-content**: For distributing content on social
