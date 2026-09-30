#!/usr/bin/env node
// Refreshes YouTube subscriber counts for every creator in the connected
// Google Sheet using the official YouTube Data API v3 — the one platform
// here with a real, reliable, ToS-compliant public API for this data.
//
// Instagram and TikTok have no equivalent: neither publishes follower counts
// through a public API for arbitrary accounts, and scraping their profile
// pages is blocked (bot detection, login walls) and against their Terms of
// Service. The admin tool's "Refresh Stats" / "AI Lookup" buttons already
// cover those two platforms as well as they realistically can be covered:
// they ask Gemini to search the live web (Google Search grounding) and
// report back what it finds, with a confidence label on every result. That
// is the accurate workaround, not scraping — treat its output as a
// well-researched estimate to review, not a guaranteed-fresh number.
//
// Usage:
//   YOUTUBE_API_KEY=xxx SHEETS_URL=https://script.google.com/macros/s/xxx/exec node scripts/update-youtube-stats.js
//
// YOUTUBE_API_KEY: free at https://console.cloud.google.com/apis/credentials
//   (enable "YouTube Data API v3" on the project first).
// SHEETS_URL: the same Apps Script /exec URL used by the "Connect Sheet"
//   button in the admin tool.

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const SHEETS_URL = process.env.SHEETS_URL;
const DRY_RUN = process.argv.includes('--dry-run');

if (!YOUTUBE_API_KEY || !SHEETS_URL) {
  console.error('Set YOUTUBE_API_KEY and SHEETS_URL environment variables first. See the top of this file for details.');
  process.exit(1);
}

async function sheetsPost(body) {
  const res = await fetch(SHEETS_URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'text/plain' },
  });
  const text = await res.text();
  try { return JSON.parse(text); }
  catch { throw new Error('Sheet returned non-JSON: ' + text.slice(0, 200)); }
}

function extractHandle(raw) {
  if (!raw) return null;
  let h = String(raw).trim();
  h = h.replace(/^https?:\/\/(www\.)?youtube\.com\//i, '');
  h = h.replace(/^@/, '');
  return h || null;
}

async function channelStatsByParam(param, value) {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&${param}=${encodeURIComponent(value)}&key=${YOUTUBE_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.items && data.items[0];
}

async function fetchSubscriberCount(handle) {
  // forHandle covers current @handles; forUsername is a fallback for older legacy channels.
  let item = await channelStatsByParam('forHandle', '@' + handle);
  if (!item) item = await channelStatsByParam('forUsername', handle);
  if (!item) return null;
  if (item.statistics.hiddenSubscriberCount) return null;
  return Number(item.statistics.subscriberCount) || 0;
}

async function main() {
  console.log('Fetching current roster from Sheet…');
  const r = await sheetsPost({ action: 'getAll' });
  if (!r.ok) throw new Error(r.error || 'Could not read Sheet');
  const rows = r.data || [];
  console.log(`${rows.length} creators loaded.\n`);

  let updated = 0, skipped = 0, failed = 0;
  for (const row of rows) {
    const handle = extractHandle(row.youtube_handle);
    if (!handle) { skipped++; continue; }
    try {
      const count = await fetchSubscriberCount(handle);
      if (count === null) { console.log(`  ${row.name}: hidden or channel not found for @${handle}`); skipped++; continue; }
      const old = Number(row.youtube_followers) || 0;
      if (count === old) { console.log(`  ${row.name}: unchanged (${count})`); continue; }
      console.log(`  ${row.name}: ${old} -> ${count}`);
      if (!DRY_RUN) {
        await sheetsPost({ action: 'save', record: { ...row, youtube_followers: count, last_updated: new Date().toISOString().split('T')[0] } });
      }
      updated++;
    } catch (e) {
      console.error(`  ${row.name}: FAILED (${e.message})`);
      failed++;
    }
    await new Promise(r => setTimeout(r, 200)); // stay well under API quota bursts
  }

  console.log(`\nDone. ${updated} updated, ${skipped} skipped (no YouTube handle or hidden count), ${failed} failed.`);
  if (DRY_RUN) console.log('(--dry-run: no changes were written to the Sheet)');
}

main().catch(e => { console.error(e); process.exit(1); });
