import React from 'react';

const SECTOR_LABELS = {
  'Média / Visibilité': 'Média / Visibilité',
  'Production audiovisuelle': 'Production AV',
  'Accès lieux / expériences': 'Accès / Expériences',
  'Restauration': 'Restauration',
  'Hébergement': 'Hébergement',
  'Sécurité': 'Sécurité',
  'Logistique': 'Logistique',
  'Autre': 'Autre',
};

export default function Sidebar({ stats, filters, onFilterChange, onClearFilters }) {
  const hasFilters = filters.sector || filters.status || filters.priority;

  const { byStatus = {}, byPriority = {}, bySector = {}, total = 0 } = stats;

  const statusOrder = ['New', 'Contacted', 'Partner', 'Archived'];
  const priorityOrder = ['High', 'Medium'];

  const sectorEntries = Object.entries(bySector).sort((a, b) => b[1] - a[1]);

  return (
    <aside className="sidebar">
      <div className="sidebar-total">
        <span className="sidebar-total-num">{total}</span>
        <span className="sidebar-total-label">contacts</span>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">BY STATUS</div>
        <div className="sidebar-items">
          {statusOrder.map(s => (
            <button
              key={s}
              className={`sidebar-item ${filters.status === s ? 'active' : ''}`}
              onClick={() => onFilterChange('status', s)}
            >
              <span className="sidebar-item-label">{s}</span>
              <span className="sidebar-item-count">{byStatus[s] || 0}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">BY PRIORITY</div>
        <div className="sidebar-items">
          {priorityOrder.map(p => (
            <button
              key={p}
              className={`sidebar-item ${filters.priority === p ? 'active' : ''}`}
              onClick={() => onFilterChange('priority', p)}
            >
              <span className="sidebar-item-label">{p}</span>
              <span className="sidebar-item-count">{byPriority[p] || 0}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">BY SECTOR</div>
        <div className="sidebar-items">
          {sectorEntries.map(([sector, count]) => (
            <button
              key={sector}
              className={`sidebar-item ${filters.sector === sector ? 'active' : ''}`}
              onClick={() => onFilterChange('sector', sector)}
            >
              <span className="sidebar-item-label">{SECTOR_LABELS[sector] || sector}</span>
              <span className="sidebar-item-count">{count}</span>
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <div className="sidebar-footer">
          <button className="sidebar-clear" onClick={onClearFilters}>
            Clear filters
          </button>
        </div>
      )}

      <style>{`
        .sidebar {
          background: var(--surface);
          border-right: 1px solid rgba(200,169,81,0.1);
          display: flex;
          flex-direction: column;
          padding: 0 0 16px 0;
          overflow-y: auto;
        }
        .sidebar-total {
          padding: 24px 20px 18px;
          border-bottom: 1px solid rgba(200,169,81,0.08);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .sidebar-total-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          font-weight: 500;
          color: var(--gold);
          line-height: 1;
        }
        .sidebar-total-label {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .sidebar-section {
          padding: 16px 0 8px;
        }
        .sidebar-section-title {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(200,169,81,0.45);
          padding: 0 20px 8px;
        }
        .sidebar-items {
          display: flex;
          flex-direction: column;
        }
        .sidebar-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 20px;
          background: transparent;
          border: none;
          color: var(--muted);
          font-size: 12px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.12s, color 0.12s;
          text-align: left;
        }
        .sidebar-item:hover {
          background: rgba(200,169,81,0.07);
          color: var(--cream);
        }
        .sidebar-item.active {
          background: rgba(200,169,81,0.14);
          color: var(--gold);
        }
        .sidebar-item-label {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-right: 8px;
        }
        .sidebar-item-count {
          font-size: 11px;
          font-weight: 500;
          color: inherit;
          opacity: 0.7;
          min-width: 24px;
          text-align: right;
        }
        .sidebar-item.active .sidebar-item-count {
          opacity: 1;
        }
        .sidebar-footer {
          margin-top: auto;
          padding: 12px 20px 0;
          border-top: 1px solid rgba(200,169,81,0.08);
        }
        .sidebar-clear {
          background: none;
          border: none;
          color: var(--muted);
          font-size: 11px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.15s;
          padding: 0;
        }
        .sidebar-clear:hover {
          color: var(--gold);
        }
      `}</style>
    </aside>
  );
}
