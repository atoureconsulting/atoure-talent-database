import React, { useRef, useState, useEffect, useCallback } from 'react';

const SORT_OPTIONS = [
  { label: 'Score ↓', field: 'combinedScore', dir: 'desc' },
  { label: 'Score ↑', field: 'combinedScore', dir: 'asc' },
  { label: 'Name A–Z', field: 'name', dir: 'asc' },
  { label: 'Name Z–A', field: 'name', dir: 'desc' },
  { label: 'Date ↓', field: 'createdAt', dir: 'desc' },
  { label: 'Date ↑', field: 'createdAt', dir: 'asc' },
];

const COLUMN_LABELS = {
  name: 'Name & Company',
  sector: 'Sector',
  phone: 'Phone',
  score: 'Score',
  priority: 'Priority',
  status: 'Status',
  followUpDate: 'Follow-up Date',
  actions: 'Actions',
};

export default function Toolbar({
  search, onSearchChange,
  sort, onSortChange,
  visibleColumns, allColumns, onToggleColumn,
  total,
}) {
  const searchRef = useRef(null);
  const [colDropOpen, setColDropOpen] = useState(false);
  const colDropRef = useRef(null);

  // Keyboard shortcut: / to focus search
  useEffect(() => {
    function handler(e) {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close column dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (colDropOpen && colDropRef.current && !colDropRef.current.contains(e.target)) {
        setColDropOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [colDropOpen]);

  const currentSortLabel = SORT_OPTIONS.find(o => o.field === sort.field && o.dir === sort.dir)?.label || 'Score ↓';

  function handleSortSelect(e) {
    const val = e.target.value;
    const opt = SORT_OPTIONS.find(o => `${o.field}:${o.dir}` === val);
    if (opt) onSortChange(opt.field, opt.dir);
  }

  const toggleableColumns = allColumns.filter(c => c !== 'name' && c !== 'actions');

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <div className="search-wrap">
          <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={searchRef}
            className="search-input"
            type="text"
            placeholder="Search contacts…  /"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => onSearchChange('')}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="toolbar-right">
        <span className="toolbar-count">
          {total.toLocaleString()} contact{total !== 1 ? 's' : ''}
        </span>

        <div className="sort-wrap">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{opacity:0.5}}>
            <line x1="21" y1="10" x2="3" y2="10"/>
            <line x1="21" y1="6" x2="3" y2="6"/>
            <line x1="21" y1="14" x2="10" y2="14"/>
            <line x1="21" y1="18" x2="10" y2="18"/>
          </svg>
          <select
            className="sort-select"
            value={`${sort.field}:${sort.dir}`}
            onChange={handleSortSelect}
          >
            {SORT_OPTIONS.map(o => (
              <option key={`${o.field}:${o.dir}`} value={`${o.field}:${o.dir}`}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-toggle-wrap" ref={colDropRef}>
          <button
            className={`col-toggle-btn ${colDropOpen ? 'open' : ''}`}
            onClick={() => setColDropOpen(v => !v)}
            title="Toggle columns"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="18"/>
              <rect x="14" y="3" width="7" height="18"/>
            </svg>
            Columns
          </button>

          {colDropOpen && (
            <div className="col-dropdown">
              <div className="col-dropdown-header">Toggle Columns</div>
              {toggleableColumns.map(col => (
                <label key={col} className="col-option">
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col)}
                    onChange={() => onToggleColumn(col)}
                  />
                  <span>{COLUMN_LABELS[col] || col}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: var(--cream);
          border-bottom: 1px solid var(--bdr2);
          gap: 12px;
          flex-shrink: 0;
        }
        .toolbar-left {
          flex: 1;
          min-width: 0;
          max-width: 360px;
        }
        .search-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon {
          position: absolute;
          left: 10px;
          color: var(--muted);
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          padding: 7px 32px 7px 32px;
          background: #fff;
          border: 1px solid var(--bdr);
          border-radius: 5px;
          font-size: 12px;
          color: var(--ink);
          transition: border-color 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .search-input:focus {
          outline: none;
          border-color: var(--gold);
        }
        .search-input::placeholder {
          color: var(--muted);
          font-size: 11px;
        }
        .search-clear {
          position: absolute;
          right: 8px;
          background: none;
          border: none;
          color: var(--muted);
          padding: 2px;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: color 0.15s;
        }
        .search-clear:hover { color: var(--ink); }
        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .toolbar-count {
          font-size: 12px;
          color: var(--muted);
          white-space: nowrap;
        }
        .sort-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .sort-select {
          background: #fff;
          border: 1px solid var(--bdr);
          border-radius: 4px;
          padding: 6px 8px;
          font-size: 12px;
          color: var(--ink);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.15s;
        }
        .sort-select:focus {
          outline: none;
          border-color: var(--gold);
        }
        .col-toggle-wrap {
          position: relative;
        }
        .col-toggle-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 10px;
          background: #fff;
          border: 1px solid var(--bdr);
          border-radius: 4px;
          font-size: 12px;
          color: var(--muted);
          font-family: 'DM Sans', sans-serif;
          transition: color 0.15s, border-color 0.15s;
          white-space: nowrap;
        }
        .col-toggle-btn:hover, .col-toggle-btn.open {
          color: var(--gold);
          border-color: rgba(200,169,81,0.5);
        }
        .col-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 6px);
          background: #fff;
          border: 1px solid var(--bdr);
          border-radius: 6px;
          padding: 8px 0;
          min-width: 180px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          z-index: 200;
          animation: fadeIn 0.1s ease;
        }
        .col-dropdown-header {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          padding: 4px 14px 8px;
          border-bottom: 1px solid var(--bdr2);
          margin-bottom: 4px;
        }
        .col-option {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          cursor: pointer;
          font-size: 12px;
          color: var(--ink);
          transition: background 0.1s;
        }
        .col-option:hover { background: var(--gdim); }
        .col-option input[type=checkbox] {
          accent-color: var(--gold);
          width: 13px;
          height: 13px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
