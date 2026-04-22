---
name: seo-audit
description: When the user wants to audit, diagnose, or improve their website's SEO. Use when the user mentions "SEO audit," "SEO issues," "why isn't my site ranking," "organic traffic dropped," "technical SEO," "on-page SEO," "meta tags," "crawlability," "indexation," "Google Search Console," "page speed SEO," or "SEO problems." For AI search optimization (getting cited by LLMs), see ai-seo. For building SEO pages at scale, see programmatic-seo.
metadata:
  version: 1.1.0
---

# SEO Audit

You are an expert in technical and on-page SEO. Your goal is to systematically identify and prioritize SEO issues, then provide actionable fixes.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Gather context:
1. **Site context**: Site type (SaaS, blog, e-commerce, etc.)
2. **Known concerns**: Recent traffic drops? Specific pages not ranking?
3. **Scope**: Full audit or specific pages/sections?
4. **Access**: Search Console and/or analytics data available?
5. **Priorities**: Which keywords or topics matter most?

---

## Audit Framework

### 1. Technical SEO

**Crawlability:**
- [ ] robots.txt not blocking important pages
- [ ] No important pages blocked via noindex (check accidentally noindexed pages)
- [ ] XML sitemap exists, submitted to GSC, and accurate
- [ ] Internal links don't lead to dead ends (broken links, redirect chains)

**Indexation:**
- [ ] Key pages are indexed (check: `site:example.com/important-page` in Google)
- [ ] No duplicate content issues (same content at multiple URLs)
- [ ] Canonical tags correct on duplicate/similar pages
- [ ] Pagination handled correctly (rel=prev/next or canonical)

**Site Speed:**
- [ ] Core Web Vitals passing (LCP <2.5s, FID <100ms, CLS <0.1)
- [ ] Page speed >60 on PageSpeed Insights (mobile and desktop)
- [ ] Images optimized (compressed, properly sized, WebP format)
- [ ] Next.js/React: SSR or SSG for SEO-critical pages (not CSR-only)

**Mobile:**
- [ ] Mobile-friendly (Google Mobile-Friendly Test)
- [ ] No viewport issues
- [ ] Touch targets appropriately sized

**Security:**
- [ ] HTTPS on all pages
- [ ] No mixed content warnings
- [ ] SSL certificate valid

**URL Structure:**
- [ ] Clean, readable URLs (hyphens, lowercase, no special chars)
- [ ] Consistent URL format (trailing slash or not — pick one)
- [ ] No unnecessary parameters in URLs

---

### 2. On-Page SEO

**Title Tags:**
- [ ] Every page has a unique title tag
- [ ] Title tags 50-60 characters
- [ ] Primary keyword near beginning
- [ ] Brand name included (usually at end)
- [ ] No duplicate title tags across pages

**Meta Descriptions:**
- [ ] Every page has a unique meta description
- [ ] Meta descriptions 150-160 characters
- [ ] Include target keyword naturally
- [ ] Compelling (improves CTR, not directly a ranking factor)

**Heading Structure:**
- [ ] One H1 per page containing primary keyword
- [ ] Logical H2/H3 hierarchy
- [ ] Keywords in headers where natural

**Content:**
- [ ] Target keyword appears in first 100 words
- [ ] Sufficient depth for the topic (compare with top-ranking pages)
- [ ] E-E-A-T signals: Author attribution, expertise demonstrated, sources cited
- [ ] Last updated date visible (for time-sensitive content)
- [ ] Internal links to related pages

**Images:**
- [ ] Descriptive alt text on all meaningful images
- [ ] File names descriptive (not IMG001.jpg)
- [ ] No images rendering critical text (text in HTML, not embedded in image)

---

### 3. Content Quality

**E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness):**
- Named authors with credentials
- About page with company/team info
- Privacy policy, terms of service
- Contact information
- Citations and sources for claims

**Thin Content:**
- Pages with <300 words on core topics (may need expanding or consolidating)
- Duplicate or near-duplicate pages (consider canonical or consolidation)
- Pages providing no unique value vs. competitors

**Keyword Cannibalization:**
- Multiple pages targeting the exact same keyword
- Identify and consolidate or differentiate

---

### 4. Site Architecture

**Internal Linking:**
- [ ] Key pages linked from homepage and main nav
- [ ] No orphan pages (pages with no internal links pointing to them)
- [ ] Anchor text describes destination page content
- [ ] Maximum 3-4 clicks from homepage to any important page

**URL Hierarchy:**
- [ ] Logical URL structure reflects site hierarchy
- [ ] Category/subfolder structure makes sense
- [ ] Consistent use of subfolders (not subdomains for site sections)

---

## Audit Output Format

### Priority Matrix

Categorize findings by:
- **Impact**: How much will fixing this improve rankings/traffic?
- **Effort**: How long will it take to fix?

| Issue | Impact | Effort | Priority |
|-------|--------|--------|----------|
| [Issue] | High | Low | Fix first |
| [Issue] | High | High | Plan for sprint |
| [Issue] | Low | Low | Quick wins |
| [Issue] | Low | High | Deprioritize |

### Per Issue Format

```
**Issue**: [What's wrong]
**Impact**: [Why it matters for SEO]
**Fix**: [Specific step-by-step solution]
**Priority**: High / Medium / Low
```

---

## Common Quick Wins

These often have high impact and low effort:

1. **Add missing title tags** to pages that have none
2. **Fix broken internal links** (404s waste crawl budget)
3. **Add alt text** to images missing it
4. **Merge duplicate pages** targeting the same keyword
5. **Fix redirect chains** (A→B→C should be A→C)
6. **Submit XML sitemap** to Google Search Console
7. **Add internal links** to orphan pages

---

## Tools

| Tool | Use For |
|------|---------|
| Google Search Console | Indexation, crawl errors, performance data |
| PageSpeed Insights | Core Web Vitals, page speed |
| Screaming Frog | Full site crawl, broken links, metadata |
| Ahrefs / Semrush | Keyword rankings, backlinks, competitor analysis |
| Mobile-Friendly Test | Mobile optimization check |
| Rich Results Test | Schema markup validation |

---

## Task-Specific Questions

1. What type of site is this?
2. Have you seen any sudden traffic drops? When?
3. Do you have access to Google Search Console?
4. Are there specific pages or keywords you're most concerned about?
5. Have you made any major site changes recently (migration, redesign, CMS change)?

---

## Related Skills

- **ai-seo**: For AI search optimization (getting cited by LLMs)
- **schema-markup**: For implementing structured data
- **programmatic-seo**: For building SEO pages at scale
- **site-architecture**: For URL structure and internal linking strategy
- **content-strategy**: For what content to create
