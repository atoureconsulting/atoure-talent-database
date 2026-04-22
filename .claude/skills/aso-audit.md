---
name: aso-audit
description: When the user wants to audit or optimize an App Store or Google Play listing. Also use when the user mentions "ASO audit," "app store optimization," "optimize my app listing," "improve app visibility," "app store ranking," "audit my listing," "why aren't people downloading my app," "improve my app conversion," "keyword optimization for app," or "compare my app to competitors." Use when the user shares an App Store or Google Play URL and wants to improve it.
metadata:
  version: 1.0.0
---

# ASO Audit

Analyze App Store and Google Play listings against ASO best practices. Fetches live listing data, scores metadata, visuals, and ratings, then produces a prioritized action plan.

## Before Auditing

**Check for product marketing context first:**
If `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

## Phase 1 — Identify Store & Fetch

### Detect store type from URL

```
Apple:  apps.apple.com/{country}/app/{name}/id{digits}
Google: play.google.com/store/apps/details?id={package}
```

### Fields to Extract

**Apple App Store:**
- App name (title) — 30 char limit
- Subtitle — 30 char limit
- Description (long) — not indexed for search, matters for conversion
- Promotional text — 170 chars, updatable without new release
- Category (primary + secondary)
- Screenshots (count, order, caption text)
- Preview video (presence, duration)
- Rating (average + count)
- Recent reviews, Price / in-app purchases
- Last updated date

**Google Play:**
- App name (title) — 30 char limit
- Short description — 80 char limit
- Full description — 4,000 char limit, IS indexed for search
- Screenshots, Preview video, Rating, Downloads range
- Data safety section

---

## Phase 1.5 — Assess Brand Maturity

Classify the app into one of three tiers:

| Tier | Signals | Examples |
|------|---------|---------|
| **Dominant** | Household name, 1M+ ratings, top-10 in category | Instagram, Uber, Spotify |
| **Established** | Well-known in category, 100K+ ratings | Strava, Notion, Duolingo |
| **Challenger** | Building awareness, <100K ratings | Most indie/startup apps |

**Key principle:** Before docking points, ask: "Is this a mistake or a deliberate choice by a team that has data I don't?"

---

## Phase 2 — Score Each Dimension

| # | Dimension | Weight | What It Covers |
|---|-----------|--------|----------------|
| 1 | Title & Subtitle | 20% | Character usage, keyword presence, clarity |
| 2 | Description | 15% | First 3 lines, keyword density (Google), CTA, structure |
| 3 | Visual Assets | 25% | Screenshot count/quality/messaging, video, icon |
| 4 | Ratings & Reviews | 20% | Average rating, volume, recency, developer responses |
| 5 | Metadata & Freshness | 10% | Category choice, update recency, localization count |
| 6 | Conversion Signals | 10% | Price positioning, IAP transparency, social proof |

**Final score** = weighted sum, out of 100.

| Score | Grade | Meaning |
|-------|-------|---------|
| 85-100 | A | Well-optimized; focus on A/B testing |
| 70-84 | B | Good foundation; clear opportunities |
| 50-69 | C | Significant gaps; high-impact fixes available |
| 30-49 | D | Major optimization needed |
| 0-29 | F | Complete overhaul needed |

---

## Phase 3 — Competitor Comparison (Optional)

If the user provides competitor URLs:
1. Fetch 2-3 top competitors in the same category
2. Score each the same way
3. Build comparison table highlighting gaps
4. Identify keyword gaps

---

## Phase 4 — Generate Report

Include:
1. **Score card** — all 6 dimensions with scores and grade
2. **Top 3 quick wins** — changes that take <1 hour
3. **Detailed findings** — per-dimension breakdown
4. **Keyword suggestions**
5. **Visual asset recommendations**
6. **Priority action plan** — ordered by impact vs effort

---

## Platform-Specific Rules

### Apple App Store

- Title (30) + Subtitle (30) + Keyword field (100 bytes, hidden) = indexed text
- Keywords field is bytes not chars — Arabic/CJK use 2-3 bytes per char
- Long description NOT indexed for search — optimize for conversion only
- Never repeat words across title/subtitle/keyword field
- Screenshots: up to 10 per device. First 3 visible in search
- App preview video: up to 3, 15-30s each. Autoplays muted — +20-40% conversion lift

### Google Play

- Title (30) + Short description (80) + Full description (4,000) = indexed text
- Full description IS indexed — target 2-3% keyword density naturally
- Google NLP/semantic understanding — keyword stuffing detected and penalized
- Screenshots: min 2, max 8 per device
- Feature graphic (1024x500) required for featured placements
- Video does NOT autoplay — only ~6% of users tap play

### What Apple Indexes vs What Google Indexes

| Field | Apple Indexed? | Google Indexed? |
|-------|:--------------:|:---------------:|
| Title | Yes | Yes (strongest signal) |
| Subtitle / Short desc | Yes | Yes |
| Keyword field | Yes (hidden) | Does not exist |
| Long description | No | Yes (heavily) |
| Screenshot captions | Yes (since 2025) | No |

---

## Common Issues Checklist

**Always flag (all tiers):**
- [ ] Rating below 4.0
- [ ] Last update > 3 months ago
- [ ] Google Play description has no keyword strategy
- [ ] Google Play missing feature graphic
- [ ] Fewer than 5 screenshots

**Flag for Challenger/Established only:**
- [ ] Title wastes characters on brand name only (no keywords)
- [ ] Subtitle duplicates title keywords
- [ ] No preview video
- [ ] Screenshots are just UI dumps with no captions

---

## Task-Specific Questions

1. What is the App Store or Google Play URL?
2. Is this your app or a competitor's?
3. What category does the app compete in?
4. Are you focused on search visibility, conversion rate, or both?

---

## Related Skills

- **page-cro**: For optimizing web-based landing pages that drive app installs
- **ad-creative**: For creating App Store and Google Play ad creatives
- **analytics-tracking**: For setting up install attribution
- **customer-research**: For understanding user language to inform listing copy
