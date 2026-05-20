const express = require('express');
const cors = require('cors');
const multer = require('multer');
const db = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const upload = multer({ storage: multer.memoryStorage() });

// ─── Helper: build WHERE clause from query params ───────────────────────────
function buildWhere(query) {
  const conditions = [];
  const params = {};

  if (query.search) {
    const s = `%${query.search}%`;
    conditions.push(`(
      name LIKE @search1 OR company LIKE @search2 OR phone LIKE @search3
      OR city LIKE @search4 OR message LIKE @search5 OR notes LIKE @search6
    )`);
    params.search1 = s;
    params.search2 = s;
    params.search3 = s;
    params.search4 = s;
    params.search5 = s;
    params.search6 = s;
  }

  if (query.sector) {
    conditions.push('sector = @sector');
    params.sector = query.sector;
  }

  if (query.status) {
    conditions.push('status = @status');
    params.status = query.status;
  }

  if (query.priority) {
    conditions.push('priority = @priority');
    params.priority = query.priority;
  }

  const where = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
  return { where, params };
}

// ─── GET /api/contacts ───────────────────────────────────────────────────────
app.get('/api/contacts', (req, res) => {
  const { page = 1, pageSize = 25, sort = 'combinedScore', dir = 'desc' } = req.query;

  const allowedSorts = ['name', 'firstName', 'lastName', 'company', 'sector', 'city',
    'combinedScore', 'companyScore', 'personScore', 'priority', 'status', 'followUpDate',
    'createdAt', 'updatedAt', 'phone', 'email'];
  const sortField = allowedSorts.includes(sort) ? sort : 'combinedScore';
  const sortDir = dir === 'asc' ? 'ASC' : 'DESC';

  const { where, params } = buildWhere(req.query);

  const pageNum = Math.max(1, parseInt(page) || 1);
  const pageSizeNum = Math.min(200, Math.max(1, parseInt(pageSize) || 25));
  const offset = (pageNum - 1) * pageSizeNum;

  const total = db.prepare(`SELECT COUNT(*) as c FROM contacts ${where}`).get(params).c;

  const contacts = db.prepare(
    `SELECT * FROM contacts ${where} ORDER BY ${sortField} ${sortDir} LIMIT @limit OFFSET @offset`
  ).all({ ...params, limit: pageSizeNum, offset });

  const parsed = contacts.map(c => ({ ...c, tags: safeParseJSON(c.tags) }));

  res.json({ contacts: parsed, total, page: pageNum, pageSize: pageSizeNum });
});

// ─── GET /api/contacts/:id ───────────────────────────────────────────────────
app.get('/api/contacts/:id', (req, res) => {
  const contact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(req.params.id);
  if (!contact) return res.status(404).json({ error: 'Not found' });
  res.json({ ...contact, tags: safeParseJSON(contact.tags) });
});

// ─── POST /api/contacts ──────────────────────────────────────────────────────
app.post('/api/contacts', (req, res) => {
  const now = new Date().toISOString();
  const c = req.body;

  const stmt = db.prepare(`
    INSERT INTO contacts
      (name, firstName, lastName, company, sector, phone, email, profile, city, message,
       companyScore, personScore, combinedScore, priority, status, notes, followUpDate, tags,
       createdAt, updatedAt)
    VALUES
      (@name, @firstName, @lastName, @company, @sector, @phone, @email, @profile, @city, @message,
       @companyScore, @personScore, @combinedScore, @priority, @status, @notes, @followUpDate, @tags,
       @createdAt, @updatedAt)
  `);

  const result = stmt.run({
    name: buildName(c.firstName, c.lastName, c.name),
    firstName: c.firstName || '',
    lastName: c.lastName || '',
    company: c.company || '',
    sector: c.sector || '',
    phone: c.phone || '',
    email: c.email || '',
    profile: c.profile || '',
    city: c.city || '',
    message: c.message || '',
    companyScore: c.companyScore || 0,
    personScore: c.personScore || 0,
    combinedScore: c.combinedScore || 0,
    priority: c.priority || 'Medium',
    status: c.status || 'New',
    notes: c.notes || '',
    followUpDate: c.followUpDate || null,
    tags: JSON.stringify(Array.isArray(c.tags) ? c.tags : []),
    createdAt: now,
    updatedAt: now
  });

  const id = result.lastInsertRowid;

  db.prepare('INSERT INTO activity_log (contactId, action, detail, timestamp) VALUES (?, ?, ?, ?)')
    .run(id, 'Contact created', '', now);

  const created = db.prepare('SELECT * FROM contacts WHERE id = ?').get(id);
  res.status(201).json({ ...created, tags: safeParseJSON(created.tags) });
});

// ─── PUT /api/contacts/:id ───────────────────────────────────────────────────
app.put('/api/contacts/:id', (req, res) => {
  const now = new Date().toISOString();
  const existing = db.prepare('SELECT * FROM contacts WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  const c = req.body;
  const newName = buildName(c.firstName, c.lastName, c.name) || existing.name;

  db.prepare(`
    UPDATE contacts SET
      name = @name, firstName = @firstName, lastName = @lastName,
      company = @company, sector = @sector, phone = @phone, email = @email,
      profile = @profile, city = @city, message = @message,
      companyScore = @companyScore, personScore = @personScore, combinedScore = @combinedScore,
      priority = @priority, status = @status, notes = @notes, followUpDate = @followUpDate,
      tags = @tags, updatedAt = @updatedAt
    WHERE id = @id
  `).run({
    id: req.params.id,
    name: newName,
    firstName: c.firstName !== undefined ? c.firstName : existing.firstName,
    lastName: c.lastName !== undefined ? c.lastName : existing.lastName,
    company: c.company !== undefined ? c.company : existing.company,
    sector: c.sector !== undefined ? c.sector : existing.sector,
    phone: c.phone !== undefined ? c.phone : existing.phone,
    email: c.email !== undefined ? c.email : existing.email,
    profile: c.profile !== undefined ? c.profile : existing.profile,
    city: c.city !== undefined ? c.city : existing.city,
    message: c.message !== undefined ? c.message : existing.message,
    companyScore: c.companyScore !== undefined ? c.companyScore : existing.companyScore,
    personScore: c.personScore !== undefined ? c.personScore : existing.personScore,
    combinedScore: c.combinedScore !== undefined ? c.combinedScore : existing.combinedScore,
    priority: c.priority !== undefined ? c.priority : existing.priority,
    status: c.status !== undefined ? c.status : existing.status,
    notes: c.notes !== undefined ? c.notes : existing.notes,
    followUpDate: c.followUpDate !== undefined ? c.followUpDate : existing.followUpDate,
    tags: c.tags !== undefined ? JSON.stringify(Array.isArray(c.tags) ? c.tags : []) : existing.tags,
    updatedAt: now
  });

  // Log status changes
  if (c.status !== undefined && c.status !== existing.status) {
    db.prepare('INSERT INTO activity_log (contactId, action, detail, timestamp) VALUES (?, ?, ?, ?)')
      .run(req.params.id, `Status changed to ${c.status}`, '', now);
  }

  // Log follow-up date changes
  if (c.followUpDate !== undefined && c.followUpDate !== existing.followUpDate && c.followUpDate) {
    db.prepare('INSERT INTO activity_log (contactId, action, detail, timestamp) VALUES (?, ?, ?, ?)')
      .run(req.params.id, `Follow-up set to ${c.followUpDate}`, '', now);
  }

  const updated = db.prepare('SELECT * FROM contacts WHERE id = ?').get(req.params.id);
  res.json({ ...updated, tags: safeParseJSON(updated.tags) });
});

// ─── DELETE /api/contacts/:id ────────────────────────────────────────────────
app.delete('/api/contacts/:id', (req, res) => {
  const existing = db.prepare('SELECT id FROM contacts WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });
  db.prepare('DELETE FROM contacts WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ─── GET /api/contacts/:id/activity ─────────────────────────────────────────
app.get('/api/contacts/:id/activity', (req, res) => {
  const logs = db.prepare(
    'SELECT * FROM activity_log WHERE contactId = ? ORDER BY timestamp DESC, id DESC'
  ).all(req.params.id);
  res.json(logs);
});

// ─── POST /api/contacts/:id/activity ────────────────────────────────────────
app.post('/api/contacts/:id/activity', (req, res) => {
  const { action, detail } = req.body;
  if (!action) return res.status(400).json({ error: 'action required' });

  const now = new Date().toISOString();
  const result = db.prepare(
    'INSERT INTO activity_log (contactId, action, detail, timestamp) VALUES (?, ?, ?, ?)'
  ).run(req.params.id, action, detail || '', now);

  res.status(201).json({ id: result.lastInsertRowid, contactId: req.params.id, action, detail, timestamp: now });
});

// ─── POST /api/contacts/bulk-status ─────────────────────────────────────────
app.post('/api/contacts/bulk-status', (req, res) => {
  const { ids, status } = req.body;
  if (!ids || !Array.isArray(ids) || !status) {
    return res.status(400).json({ error: 'ids array and status required' });
  }

  const now = new Date().toISOString();
  const update = db.transaction(() => {
    for (const id of ids) {
      db.prepare('UPDATE contacts SET status = ?, updatedAt = ? WHERE id = ?').run(status, now, id);
      db.prepare('INSERT INTO activity_log (contactId, action, detail, timestamp) VALUES (?, ?, ?, ?)')
        .run(id, `Status changed to ${status}`, '', now);
    }
  });
  update();

  res.json({ updated: ids.length });
});

// ─── GET /api/stats ──────────────────────────────────────────────────────────
app.get('/api/stats', (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as c FROM contacts').get().c;

  const statusRows = db.prepare('SELECT status, COUNT(*) as c FROM contacts GROUP BY status').all();
  const byStatus = { New: 0, Contacted: 0, Partner: 0, Archived: 0 };
  for (const row of statusRows) {
    if (byStatus.hasOwnProperty(row.status)) byStatus[row.status] = row.c;
  }

  const priorityRows = db.prepare('SELECT priority, COUNT(*) as c FROM contacts GROUP BY priority').all();
  const byPriority = { High: 0, Medium: 0 };
  for (const row of priorityRows) {
    if (byPriority.hasOwnProperty(row.priority)) byPriority[row.priority] = row.c;
  }

  const sectorRows = db.prepare('SELECT sector, COUNT(*) as c FROM contacts GROUP BY sector ORDER BY c DESC').all();
  const bySector = {};
  for (const row of sectorRows) {
    bySector[row.sector] = row.c;
  }

  res.json({ total, byStatus, byPriority, bySector });
});

// ─── POST /api/import ────────────────────────────────────────────────────────
app.post('/api/import', (req, res) => {
  const contacts = req.body;
  if (!Array.isArray(contacts)) return res.status(400).json({ error: 'Expected array of contacts' });

  const now = new Date().toISOString();
  let imported = 0;
  let skipped = 0;

  const insertOne = db.prepare(`
    INSERT OR IGNORE INTO contacts
      (name, firstName, lastName, company, sector, phone, email, profile, city, message,
       companyScore, personScore, combinedScore, priority, status, notes, followUpDate, tags,
       createdAt, updatedAt)
    VALUES
      (@name, @firstName, @lastName, @company, @sector, @phone, @email, @profile, @city, @message,
       @companyScore, @personScore, @combinedScore, @priority, @status, @notes, @followUpDate, @tags,
       @createdAt, @updatedAt)
  `);

  const phoneCheck = db.prepare('SELECT id FROM contacts WHERE phone = ?');

  const doImport = db.transaction(() => {
    for (const c of contacts) {
      if (c.phone && phoneCheck.get(c.phone)) {
        skipped++;
        continue;
      }
      const result = insertOne.run({
        name: buildName(c.firstName, c.lastName, c.name),
        firstName: c.firstName || '',
        lastName: c.lastName || '',
        company: c.company || '',
        sector: c.nature || c.sector || '',
        phone: c.phone || '',
        email: c.email || '',
        profile: c.profile || '',
        city: c.city || '',
        message: c.message || '',
        companyScore: c.companyScore || 0,
        personScore: c.personScore || 0,
        combinedScore: c.combinedScore || 0,
        priority: c.priority || 'Medium',
        status: c.status || 'New',
        notes: c.notes || '',
        followUpDate: c.followUpDate || null,
        tags: JSON.stringify(Array.isArray(c.tags) ? c.tags : []),
        createdAt: c.date || now,
        updatedAt: now
      });
      if (result.changes > 0) {
        imported++;
        db.prepare('INSERT INTO activity_log (contactId, action, detail, timestamp) VALUES (?, ?, ?, ?)')
          .run(result.lastInsertRowid, 'Contact created', 'Imported', now);
      } else {
        skipped++;
      }
    }
  });

  doImport();
  res.json({ imported, skipped });
});

// ─── GET /api/export ─────────────────────────────────────────────────────────
app.get('/api/export', (req, res) => {
  const { where, params } = buildWhere(req.query);

  const allowedSorts = ['name', 'firstName', 'lastName', 'company', 'sector', 'city',
    'combinedScore', 'companyScore', 'personScore', 'priority', 'status', 'followUpDate',
    'createdAt', 'updatedAt'];
  const sortField = allowedSorts.includes(req.query.sort) ? req.query.sort : 'combinedScore';
  const sortDir = req.query.dir === 'asc' ? 'ASC' : 'DESC';

  const contacts = db.prepare(
    `SELECT * FROM contacts ${where} ORDER BY ${sortField} ${sortDir}`
  ).all(params);

  const columns = ['name', 'company', 'sector', 'phone', 'email', 'city', 'profile',
    'combinedScore', 'priority', 'status', 'followUpDate', 'notes', 'tags', 'message'];

  const csvEscape = (val) => {
    if (val === null || val === undefined) return '';
    const s = String(val);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };

  const lines = [columns.join(',')];
  for (const c of contacts) {
    const tags = safeParseJSON(c.tags);
    const row = columns.map(col => {
      if (col === 'tags') return csvEscape(tags.join('; '));
      return csvEscape(c[col]);
    });
    lines.push(row.join(','));
  }

  const today = new Date().toISOString().split('T')[0];
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="atoure-contacts-${today}.csv"`);
  res.send(lines.join('\r\n'));
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
function safeParseJSON(str) {
  try { return JSON.parse(str || '[]'); } catch { return []; }
}

function buildName(firstName, lastName, fallback) {
  if (firstName || lastName) {
    return [firstName, lastName].filter(Boolean).join(' ');
  }
  return fallback || '';
}

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`AToure backend running on http://localhost:${PORT}`);
});
