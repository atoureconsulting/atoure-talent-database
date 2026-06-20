# Atoure Management & Consulting — Session Context

> Last updated: 20 June 2026. This file captures all relevant context from the document-creation session so work can continue seamlessly in a new chat.

---

## Company Details

| Field | Value |
|-------|-------|
| **Company name** | Atoure Management & Consulting |
| **Director** | Baba Touré |
| **Registration no.** | 15129711 |
| **Registered address** | 30b Chichele Road, London, England, United Kingdom |
| **Email** | General@atoureconsulting.com |
| **Tel** | +44 7456 728616 |
| **Web** | www.atoureconsulting.com |
| **Governing law** | England & Wales |

---

## The Tour / Principal Client

- **Client entity on contract:** Ash Fitness LLC ("the Client")
- **Nature of engagement:** Talent management, travel coordination, and on-the-ground itinerary management for a high-profile client's multi-country **African tour**
- **Party size:** Up to 12 people
- **Tour start date:** 28 June 2026
- **Principal Client (NDA):** Referred to only as "the Principal Client" in the NDA — identity is highly sensitive and must not be disclosed

---

## Documents Created

All files live in the `documents/` folder of this repo on branch `claude/focused-newton-2bi15m`.

### 1. Service Agreement
**File:** `documents/atoure-service-agreement.html`  
**PDF:** Generated locally as `atoure-service-agreement.pdf` (not in repo — regenerate with WeasyPrint if needed)

**Parties:**
- Agency: Atoure Management & Consulting
- Client: Ash Fitness LLC

**Fee structure (Section 02):**
| Fee | Amount | Basis |
|-----|--------|-------|
| Agency day rate | £500/day | Per country, each day of trip |
| On-the-ground partner | £700/day | Sorted countries only |
| Sorted-country fee | £5,000/country | Includes flights & hotels; contingent on both being sorted |
| Visa handling | £25/person | Per visa, per country, in addition to visa cost |

**Key clauses:**
- Visa fees: charged at cost, per person + £25 handling fee, **when requested by the Client** (not automatic)
- Sorted-country fee is **contingent on flights and hotels being booked** for that leg
- All other tour costs (food, SIM cards, incidentals) covered by Ash Fitness LLC, not the Agency
- Interest clause: **removed** (no late-payment interest provision)
- Payment triggered when Client signs country entity contract
- All fees due before end of tour; invoices payable within 7 days
- GBP; visa costs may be invoiced in USD at cost

### 2. Non-Disclosure Agreement (NDA)
**File:** `documents/atoure-nda.html`  
**PDF:** Generated locally as `atoure-nda.pdf` (not in repo — regenerate with WeasyPrint if needed)

**Parties:**
- Disclosing Party: Atoure Management & Consulting (acting on behalf of Principal Client)
- Receiving Party: vendor / agency / **ground partner** (company or individual)

**Key points:**
- Covers companies, agencies, and ground partners (all three types)
- Principal Client is a **third-party beneficiary** who can directly enforce the NDA
- Confidentiality terms:
  - **Perpetual** — for Principal Client's identity, personal info, whereabouts, travel plans, security info, photographs/videos/recordings
  - **10 years** — for commercial and financial information
- No social media, no photography, no press releases about Principal Client or the tour
- Can only reference/publicise Principal Client after: (i) services complete, (ii) Principal Client has left the country, and (iii) Principal Client has publicly disclosed their own presence
- Breach → immediate injunctive relief in England & Wales courts

### 3. Letterhead Template
**File:** `documents/atoure-letterhead-template.html`

A blank reusable template with the full Atoure header. To create a new official document:
1. Copy this file
2. Set the `<title>` tag
3. Update the `<h1>` document title and `.sub` subtitle in `.doc-title`
4. Add content inside `<div class="body">...</div>`

---

## Brand Guidelines

### Colour Palette (CSS variables)
```css
--ink:    #0d0c0a   /* near-black for primary text / headings */
--paper:  #FEFCF8   /* off-white page background */
--cream:  #FAF6EE   /* light tinted background for panels */
--sand:   #F5EDD6   /* slightly warmer panel / notice background */
--gold:   #C8A951   /* primary gold accent */
--gold-lt:#E0C47A   /* lighter gold (borders, dividers) */
--gold-dk:#9A7D30   /* darker gold (labels, links, section numbers) */
--muted:  #9A8870   /* muted warm grey (subtitles, contact bar) */
--line:   #e7ddc7   /* hairline dividers */
--text:   #3f382e   /* body text */
```

### Fonts
- **Cormorant Garamond** (serif) — headings, document title, fee table, signature names
- **Jost** (sans-serif) — body text, labels, contact bar
- Loaded via Google Fonts CDN

### Logo
- Gold "A" monogram — 146×200px RGBA PNG, embedded as base64 in all documents
- Used as `<img class="ll-mark" height="66px">` inside `.logo-lockup`

### Header / Letterhead Structure
All official documents use a **horizontal lockup**:
```html
<header>
  <div class="logo-lockup">
    <img class="ll-mark" src="data:image/png;base64,..." alt="Atoure">
    <div class="ll-text">
      <div class="ll-name">Atoure</div>
      <div class="ll-sub">Management &amp; Consulting</div>
    </div>
  </div>
  <div class="lh-contact"><!-- single-line contact bar --></div>
  <div class="doc-title">
    <h1>Document Title</h1>
    <div class="sub">Subtitle</div>
    <div class="rule"></div>
  </div>
</header>
```

Contact bar is always a **single line** (`white-space:nowrap`), format:
```
REG: 15129711 · ADDRESS: 30b Chichele Road, London, England · EMAIL: General@atoureconsulting.com · TEL: +44 7456 728616 · WEB: www.atoureconsulting.com
```

---

## Generating PDFs

WeasyPrint is installed via pip on the session machine:
```bash
python3 -m weasyprint documents/atoure-service-agreement.html atoure-service-agreement.pdf
python3 -m weasyprint documents/atoure-nda.html atoure-nda.pdf
```

All documents have `@page { size: A4; margin: 14mm; }` and `@media print` rules for clean PDF output.

To preview PDF pages as PNG (requires poppler-utils):
```bash
apt-get update && apt-get install -y poppler-utils
pdftoppm -r 150 -png atoure-service-agreement.pdf preview-sa
```

---

## Confirmed Company Details (verified with Baba)

- **REG number:** 15129711 (8 digits — confirmed correct; letterhead image showed 7-digit version which was wrong)
- **Address:** 30b Chichele Road (with the "b" — confirmed correct; letterhead image showed "30" without "b")

---

## Outstanding / Next Steps

- [ ] Fill in Ash Fitness LLC registration details (jurisdiction, company/entity no., registered address) in the service agreement
- [ ] Countersign service agreement
- [ ] Send NDA to each vendor / ground partner before sharing any Principal Client information
- [ ] PDFs can be regenerated at any time with WeasyPrint (see above)
