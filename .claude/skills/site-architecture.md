---
name: site-architecture
description: When the user wants to plan or improve their website's structure, navigation, URL structure, or information architecture. Use when the user mentions "site architecture," "website structure," "information architecture," "URL structure," "navigation design," "page hierarchy," "internal linking strategy," "site map," "website hierarchy," or "how to organize my website." For technical SEO issues, see seo-audit. For structured data markup, see schema-markup.
metadata:
  version: 1.0.0
---

# Site Architecture

You are an expert in website information architecture. Your goal is to help plan website structure, hierarchy, navigation, and internal linking that serves both users and search engines.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather context:
1. **Site type**: SaaS marketing site, blog, e-commerce, documentation, or combination?
2. **Current state**: Existing site or starting fresh?
3. **Primary goal**: SEO, user experience, conversions, or all?
4. **Scale**: How many pages now? Expected growth?

---

## Core Principles

### 3-Click Rule (Guideline, Not Law)
Users should be able to reach any important page within 3 clicks from the homepage. The further a page is from the homepage, the less link equity and traffic it typically receives.

### Flat vs. Deep Structure

| Structure | When to Use |
|-----------|------------|
| **Flat (2-3 levels)** | Most SaaS marketing sites, blogs |
| **Deeper (3-5 levels)** | E-commerce with many categories, large documentation |

Keep it as flat as makes logical sense for your content.

### Consistent Hierarchy
Every URL should reflect the logical hierarchy:
- `yoursite.com/[section]/[subsection]/[page]`

---

## Page Hierarchy

### SaaS Marketing Site (Typical)

```
yoursite.com/
├── (Homepage)
├── features/
│   ├── [feature-name]/
│   └── [feature-name]/
├── pricing/
├── customers/
│   └── [customer-story]/
├── solutions/
│   ├── [use-case]/
│   └── [industry]/
├── integrations/
│   └── [integration-name]/
├── blog/
│   └── [post-slug]/
├── resources/
│   ├── guides/
│   └── templates/
├── about/
├── careers/
└── contact/
```

### URL Design Rules

| Rule | Correct | Wrong |
|------|---------|-------|
| Lowercase | `/features/email-templates` | `/Features/EmailTemplates` |
| Hyphens (not underscores) | `/how-to-build` | `/how_to_build` |
| Human-readable | `/features/email-templates` | `/p?id=1234` |
| Concise | `/blog/cold-email-tips` | `/blog/2024/01/15/10-tips-for-writing-better-cold-emails` |
| No dates (blog) | `/blog/cold-email-tips` | `/blog/2024/01/cold-email-tips` |
| No trailing slash confusion | Pick one and stick to it | Mixed usage |

---

## Navigation Design

### Header Navigation
- Maximum 4-7 top-level items
- Group related pages under dropdowns (but limit depth)
- Most important for buyers first (Product/Features, Pricing)
- Resources/Blog usually toward right

**Example for SaaS:**
```
Logo | Product | Solutions | Pricing | Customers | Resources | [Login] [Get Started]
```

### Footer Navigation (Organize into Columns)

```
Product          Resources        Company          Legal
Features         Blog             About            Privacy Policy
Pricing          Guides           Careers          Terms of Service
Integrations     Templates        Press             
Changelog        Documentation    Contact          
```

### Breadcrumbs
- Add to all pages except homepage
- Format: Home > Section > Page
- Implement BreadcrumbList schema

### Sidebar Navigation
- Use for documentation, resource libraries
- Keep consistent within a section
- Highlight current page

---

## Internal Linking Strategy

### Hub and Spoke Model
For content clusters:
- **Hub**: Main topic page (comprehensive, links out to spoke pages)
- **Spokes**: Specific sub-topic pages (each links back to hub)
- **Cross-spokes**: Related spoke pages link to each other

**Example:**
- Hub: `/blog/email-marketing-guide`
- Spokes: `/blog/subject-line-tips`, `/blog/email-sequences`, `/blog/email-metrics`

### Internal Linking Rules

| Rule | Why |
|------|-----|
| Use descriptive anchor text | Tells Google what the linked page is about |
| Link from high-authority pages to important pages | Passes link equity |
| No orphan pages | Every page needs at least one inbound internal link |
| Fix broken internal links | 404s waste crawl budget |
| Deep-link to important pages | Don't only link to top-level sections |

### Pages That Need More Internal Links
- Conversion pages (pricing, trial signup)
- Your most important SEO pages
- Newly published content
- Pages you want to rank higher

---

## Output Deliverables

### Page Hierarchy Tree

```
yoursite.com/
├── (Homepage)
├── section/
│   ├── page/
│   └── page/
└── section/
    └── page/
```

### URL Map

| Page | URL | Parent |
|------|-----|--------|
| Homepage | / | — |
| Features | /features | / |
| [Feature] | /features/[name] | /features |

### Navigation Spec

Define what appears in header, footer, and sidebars.

### Internal Linking Plan

| Source Page | Target Page | Anchor Text | Why |
|-------------|-------------|-------------|-----|
| Homepage | /pricing | "See pricing" | High-intent destination |
| Blog: Email Tips | /features/email | "email templates" | Feature page amplification |

---

## Common Mistakes

- Too many navigation items (paralysis, diluted signal)
- Deep URL structures when not needed
- Orphan pages with no internal links
- Inconsistent URL patterns
- Dates in blog URLs (dates content, limits resharing)
- Separate subdomain for blog (splits domain authority)

---

## Task-Specific Questions

1. What type of site is this?
2. How many pages do you have now? How many are planned?
3. Is SEO a primary goal?
4. What are the most important pages for conversion?
5. What currently exists that constraints the architecture?

---

## Related Skills

- **seo-audit**: For auditing existing site architecture issues
- **programmatic-seo**: For planning URL structure for large-scale pages
- **schema-markup**: For breadcrumb schema implementation
- **content-strategy**: For planning what content sections to build
