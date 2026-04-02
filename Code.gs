// ── ATOURE TALENT DATABASE — Google Apps Script Backend ──
// Deploy as: Extensions > Apps Script > Deploy > New deployment > Web app
// Execute as: Me | Who has access: Anyone
//
// Sheet names used:
//   "Roster"    — main talent data
//   "Enquiries" — client enquiry form submissions

var ROSTER_SHEET    = 'Roster';
var ENQUIRY_SHEET   = 'Enquiries';

var ROSTER_COLS = [
  'id','name','role','gender','country',
  'instagram','instagram_followers',
  'tiktok_handle','tiktok_followers',
  'youtube_handle','youtube_followers',
  'photo_url','bio','notes','last_updated'
];

// ── Entry point ──────────────────────────────────────────────────────────────
function doPost(e) {
  var result;
  try {
    var body = JSON.parse(e.postData.contents);
    var action = body.action;

    if      (action === 'getAll')    result = getAll();
    else if (action === 'save')      result = save(body.record);
    else if (action === 'delete')    result = deleteRecord(body.id);
    else if (action === 'bulkInit')  result = bulkInit(body.records);
    else if (action === 'enquiry')   result = saveEnquiry(body.data);
    else                             result = { ok: false, error: 'Unknown action: ' + action };
  } catch (err) {
    result = { ok: false, error: err.message };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── GET ALL ──────────────────────────────────────────────────────────────────
function getAll() {
  var sheet = getOrCreateSheet(ROSTER_SHEET);
  var data  = sheet.getDataRange().getValues();
  if (data.length < 2) return { ok: true, data: [] };

  var headers = data[0].map(String);
  var rows = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    // Skip completely empty rows
    if (row.every(function(c){ return c === '' || c === null; })) continue;
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j] !== undefined ? row[j] : '';
    }
    rows.push(obj);
  }
  return { ok: true, data: rows };
}

// ── SAVE (upsert by id) ──────────────────────────────────────────────────────
function save(record) {
  if (!record) return { ok: false, error: 'No record provided' };
  var sheet   = getOrCreateSheet(ROSTER_SHEET);
  var headers = ensureHeaders(sheet, ROSTER_COLS);
  var idCol   = headers.indexOf('id');

  // Find existing row
  var data    = sheet.getDataRange().getValues();
  var rowIdx  = -1;
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(record.id)) { rowIdx = i + 1; break; }
  }

  var values = ROSTER_COLS.map(function(col){ return record[col] !== undefined ? record[col] : ''; });

  if (rowIdx > 0) {
    sheet.getRange(rowIdx, 1, 1, values.length).setValues([values]);
  } else {
    sheet.appendRow(values);
  }
  return { ok: true };
}

// ── DELETE ───────────────────────────────────────────────────────────────────
function deleteRecord(id) {
  if (!id) return { ok: false, error: 'No id provided' };
  var sheet  = getOrCreateSheet(ROSTER_SHEET);
  var idCol  = getOrCreateSheet(ROSTER_SHEET); // re-fetch isn't needed, sheet is the same ref
  var data   = sheet.getDataRange().getValues();
  var headers = data[0].map(String);
  var idIdx   = headers.indexOf('id');

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][idIdx]) === String(id)) {
      sheet.deleteRow(i + 1);
      return { ok: true };
    }
  }
  return { ok: false, error: 'Record not found' };
}

// ── BULK INIT ────────────────────────────────────────────────────────────────
function bulkInit(records) {
  if (!records || !records.length) return { ok: false, error: 'No records provided' };
  var sheet = getOrCreateSheet(ROSTER_SHEET);
  sheet.clearContents();

  var header = [ROSTER_COLS];
  var rows   = records.map(function(r){
    return ROSTER_COLS.map(function(col){ return r[col] !== undefined ? r[col] : ''; });
  });

  sheet.getRange(1, 1, 1, ROSTER_COLS.length).setValues(header);
  sheet.getRange(2, 1, rows.length, ROSTER_COLS.length).setValues(rows);
  return { ok: true };
}

// ── SAVE ENQUIRY ─────────────────────────────────────────────────────────────
function saveEnquiry(data) {
  if (!data) return { ok: false, error: 'No data provided' };
  var sheet = getOrCreateSheet(ENQUIRY_SHEET);

  var enqCols = ['date','name','brand','email','type','message','talent'];
  ensureHeaders(sheet, enqCols);

  var values = enqCols.map(function(col){ return data[col] !== undefined ? data[col] : ''; });
  sheet.appendRow(values);
  return { ok: true };
}

// ── HELPERS ──────────────────────────────────────────────────────────────────
function getOrCreateSheet(name) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  return sheet;
}

function ensureHeaders(sheet, cols) {
  var existing = sheet.getLastRow() > 0
    ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String)
    : [];

  if (existing.length === 0 || existing[0] === '') {
    sheet.getRange(1, 1, 1, cols.length).setValues([cols]);
    return cols;
  }
  return existing;
}
