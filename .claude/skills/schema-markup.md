---
name: schema-markup
description: When the user wants to add or optimize structured data / schema markup on their website. Use when the user mentions "schema markup," "structured data," "JSON-LD," "rich results," "rich snippets," "FAQ schema," "HowTo schema," "Product schema," "schema.org," "Google rich results," or "search appearance." For broader SEO auditing, see seo-audit. For AI search optimization, see ai-seo.
metadata:
  version: 1.0.0
---

# Schema Markup

You are an expert in structured data and schema markup. Your goal is to implement schema.org markup that helps search engines understand content and enables rich results in search.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Identify:
1. **Page type**: What kind of page? What's the primary content?
2. **Current state**: Any existing schema? Errors in Search Console?
3. **Goals**: Which rich results are you targeting?

---

## Core Principles

### 1. Accuracy First
- Schema must accurately represent page content
- Don't markup content that doesn't exist on the page
- Keep updated when content changes

### 2. Use JSON-LD
- Google recommends JSON-LD format
- Easier to implement and maintain than microdata
- Place in `<head>` or end of `<body>`

### 3. Follow Google's Guidelines
- Only use markup Google supports for rich results
- Avoid spam tactics (fake reviews, inflated ratings)
- Review eligibility requirements per schema type

### 4. Validate Everything
- Test before deploying
- Monitor Search Console Enhancements reports
- Fix errors promptly

---

## Common Schema Types

| Type | Use For | Required Properties |
|------|---------|-------------------|
| Organization | Company homepage/about | name, url |
| WebSite | Homepage (enables sitelinks search box) | name, url |
| Article | Blog posts, news | headline, image, datePublished, author |
| BlogPosting | Blog posts | headline, image, datePublished, author |
| Product | Product pages | name, image, offers |
| SoftwareApplication | SaaS/app pages | name, offers |
| FAQPage | FAQ content | mainEntity (Q&A array) |
| HowTo | Tutorial/process content | name, step |
| BreadcrumbList | Any page with breadcrumbs | itemListElement |
| LocalBusiness | Local business pages | name, address |
| Event | Events, webinars | name, startDate, location |
| Review | Review content | reviewRating, author |
| AggregateRating | Product/service ratings | ratingValue, reviewCount |

---

## JSON-LD Examples

### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://twitter.com/company",
    "https://linkedin.com/company/company"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@example.com"
  }
}
```

### FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is [Product]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A clear, complete answer here."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pricing starts at $X/month."
      }
    }
  ]
}
```

### Article

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title Here",
  "image": "https://example.com/image.jpg",
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-20",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://example.com/author"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Company Name",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  }
}
```

### HowTo

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to [accomplish X]",
  "description": "Brief description of what this teaches",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Step 1 Name",
      "text": "Detailed instructions for step 1."
    },
    {
      "@type": "HowToStep",
      "name": "Step 2 Name",
      "text": "Detailed instructions for step 2."
    }
  ]
}
```

### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://example.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Article Title"
    }
  ]
}
```

---

## Multiple Schema Types on One Page

Use `@graph` to combine multiple schemas:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://example.com/#organization",
      "name": "Company Name",
      "url": "https://example.com"
    },
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "name": "Company Name",
      "url": "https://example.com",
      "publisher": { "@id": "https://example.com/#organization" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [...]
    }
  ]
}
```

---

## Validation and Testing

### Tools
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Validator**: https://validator.schema.org/
- **Search Console**: Enhancements reports (show errors + impressions)

### Common Errors

| Error | Fix |
|-------|-----|
| Missing required properties | Check Google docs for required fields per type |
| Invalid date format | Use ISO 8601: `2024-01-15` |
| URL not fully qualified | Use full URL: `https://example.com/page` |
| Mismatch with page content | Schema must match visible content |
| Invalid enum value | Check schema.org for valid options |

---

## Implementation by Tech Stack

| Stack | Approach |
|-------|---------|
| Static HTML | Add JSON-LD directly in `<head>` |
| WordPress | Yoast SEO, Rank Math, or Schema Pro plugins |
| React/Next.js | `next/head` component or `react-helmet` |
| Webflow | Embed code block in page settings |
| Shopify | Theme liquid templates |

---

## Output Format

1. **Complete JSON-LD code** — ready to copy/paste
2. **Placement instructions** — where to add it
3. **Testing checklist** — how to validate

---

## Task-Specific Questions

1. What type of page is this?
2. What rich results are you hoping to achieve?
3. What data is available to populate the schema?
4. Is there existing schema on the page?
5. What's your tech stack?

---

## Related Skills

- **seo-audit**: For overall SEO including schema review
- **ai-seo**: For AI search optimization (schema helps AI understand content)
- **programmatic-seo**: For templated schema at scale
- **site-architecture**: For breadcrumb structure planning
