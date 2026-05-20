const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'contacts.db');
const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY,
    name TEXT,
    firstName TEXT,
    lastName TEXT,
    company TEXT,
    sector TEXT,
    phone TEXT,
    email TEXT,
    profile TEXT,
    city TEXT,
    message TEXT,
    companyScore REAL DEFAULT 0,
    personScore REAL DEFAULT 0,
    combinedScore REAL DEFAULT 0,
    priority TEXT DEFAULT 'Medium',
    status TEXT DEFAULT 'New',
    notes TEXT,
    followUpDate TEXT,
    tags TEXT DEFAULT '[]',
    createdAt TEXT,
    updatedAt TEXT
  );

  CREATE TABLE IF NOT EXISTS activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contactId INTEGER NOT NULL,
    action TEXT NOT NULL,
    detail TEXT,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contactId) REFERENCES contacts(id) ON DELETE CASCADE
  );
`);

// Seed data if empty
const count = db.prepare('SELECT COUNT(*) as c FROM contacts').get();
if (count.c === 0) {
  const seedPath = path.join(__dirname, 'seed-data.json');
  if (fs.existsSync(seedPath)) {
    const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
    const insert = db.prepare(`
      INSERT OR IGNORE INTO contacts
        (id, name, firstName, lastName, company, sector, phone, email, profile, city, message,
         companyScore, personScore, combinedScore, priority, status, notes, followUpDate, tags,
         createdAt, updatedAt)
      VALUES
        (@id, @name, @firstName, @lastName, @company, @sector, @phone, @email, @profile, @city, @message,
         @companyScore, @personScore, @combinedScore, @priority, @status, @notes, @followUpDate, @tags,
         @createdAt, @updatedAt)
    `);

    const insertMany = db.transaction((contacts) => {
      for (const c of contacts) {
        insert.run({
          id: c.id || null,
          name: c.name || '',
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
          tags: Array.isArray(c.tags) ? JSON.stringify(c.tags) : (c.tags || '[]'),
          createdAt: c.date || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    });

    insertMany(seedData);
    console.log(`Seeded ${seedData.length} contacts`);
  }
}

module.exports = db;
