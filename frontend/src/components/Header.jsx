import React, { useRef } from 'react';

export default function Header({ onAddContact, onImport, onExport, onLogout }) {
  const fileRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      onImport(file);
      e.target.value = '';
    }
  }

  return (
    <header className="header">
      <div className="header-left">
        <span className="header-brand">AToure</span>
        <span className="header-divider" />
        <span className="header-subtitle">Contact Database</span>
      </div>
      <div className="header-right">
        <button className="btn-ghost" onClick={onExport}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export CSV
        </button>
        <button className="btn-ghost" onClick={() => fileRef.current?.click()}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Import JSON
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button className="btn-ghost btn-lock" onClick={onLogout} title="Lock / Sign out">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
        </button>
        <button className="btn-gold" onClick={onAddContact}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Contact
        </button>
      </div>

      <style>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 52px;
          padding: 0 20px;
          background: var(--ink);
          border-bottom: 1px solid rgba(200,169,81,0.15);
          position: relative;
          z-index: 50;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .header-brand {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
          font-size: 22px;
          color: var(--gold);
          letter-spacing: 0.04em;
          line-height: 1;
        }
        .header-divider {
          width: 1px;
          height: 20px;
          background: rgba(200,169,81,0.25);
        }
        .header-subtitle {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-gold {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: var(--gold);
          color: var(--ink);
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.15s;
        }
        .btn-gold:hover {
          background: var(--gold2);
        }
        .btn-ghost {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: transparent;
          color: var(--muted);
          border: 1px solid rgba(200,169,81,0.2);
          border-radius: 4px;
          font-size: 12px;
          font-weight: 400;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.15s, border-color 0.15s;
        }
        .btn-ghost:hover {
          color: var(--gold);
          border-color: rgba(200,169,81,0.5);
        }
      `}</style>
    </header>
  );
}
