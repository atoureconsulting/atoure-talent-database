import React from 'react';

const STATUS_ORDER = ['New', 'Contacted', 'Partner', 'Archived'];

function statusBadgeClass(status) {
  switch (status) {
    case 'New': return 'badge badge-status-new';
    case 'Contacted': return 'badge badge-status-contacted';
    case 'Partner': return 'badge badge-status-partner';
    case 'Archived': return 'badge badge-status-archived';
    default: return 'badge';
  }
}

function priorityBadgeClass(priority) {
  return priority === 'High' ? 'badge badge-priority-high' : 'badge badge-priority-medium';
}

function formatPhone(phone) {
  return phone ? phone.replace(/\s+/g, ' ') : '—';
}

function waLink(phone) {
  if (!phone) return null;
  const clean = phone.replace(/[\s\-\(\)]/g, '');
  return `https://wa.me/${clean.startsWith('+') ? clean.slice(1) : clean}`;
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-CI', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name[0].toUpperCase();
}

function avatarColor(name) {
  const colors = ['#1A5276', '#1E7A4A', '#7D3C98', '#884EA0', '#17618c', '#1a6b36'];
  let h = 0;
  for (let i = 0; i < (name || '').length; i++) h = (h * 31 + name.charCodeAt(i)) % colors.length;
  return colors[h];
}

export default function ContactTable({
  contacts, total, loading, page, pageSize,
  visibleColumns, selectedIds,
  onRowClick, onSelectAll, onToggleSelect,
  onStatusCycle, onEdit, onDelete, onPageChange,
}) {
  const totalPages = Math.ceil(total / pageSize);
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const allSelected = contacts.length > 0 && contacts.every(c => selectedIds.has(c.id));
  const someSelected = contacts.some(c => selectedIds.has(c.id)) && !allSelected;

  function stopProp(e) { e.stopPropagation(); }

  function pageRange() {
    const pages = [];
    const delta = 2;
    const left = Math.max(1, page - delta);
    const right = Math.min(totalPages, page + delta);
    if (left > 1) { pages.push(1); if (left > 2) pages.push('…'); }
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages) { if (right < totalPages - 1) pages.push('…'); pages.push(totalPages); }
    return pages;
  }

  const show = col => visibleColumns.includes(col);

  return (
    <div className="table-wrap">
      <div className="table-scroll">
        <table className="contact-table">
          <thead>
            <tr>
              <th className="col-check">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={el => { if (el) el.indeterminate = someSelected; }}
                  onChange={e => onSelectAll(e.target.checked)}
                />
              </th>
              <th className="col-name">Name</th>
              {show('sector') && <th className="col-sector">Sector</th>}
              {show('phone') && <th className="col-phone">Phone</th>}
              {show('score') && <th className="col-score">Score</th>}
              {show('priority') && <th className="col-priority">Priority</th>}
              {show('status') && <th className="col-status">Status</th>}
              {show('followUpDate') && <th className="col-followup">Follow-up</th>}
              {show('actions') && <th className="col-actions">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading && contacts.length === 0 && (
              <tr>
                <td colSpan={9} className="empty-cell">
                  <div className="loading-dots">
                    <span /><span /><span />
                  </div>
                </td>
              </tr>
            )}
            {!loading && contacts.length === 0 && (
              <tr>
                <td colSpan={9} className="empty-cell">
                  No contacts found
                </td>
              </tr>
            )}
            {contacts.map(contact => (
              <tr
                key={contact.id}
                className={`contact-row ${selectedIds.has(contact.id) ? 'selected' : ''}`}
                onClick={() => onRowClick(contact)}
              >
                <td className="col-check" onClick={stopProp}>
                  <input
                    type="checkbox"
                    checked={selectedIds.has(contact.id)}
                    onChange={() => onToggleSelect(contact.id)}
                  />
                </td>
                <td className="col-name">
                  <div className="name-cell">
                    <div
                      className="avatar"
                      style={{ background: avatarColor(contact.name) }}
                    >
                      {getInitials(contact.name)}
                    </div>
                    <div className="name-info">
                      <div className="name-primary">{contact.name || '—'}</div>
                      {contact.company && (
                        <div className="name-secondary">{contact.company}</div>
                      )}
                    </div>
                  </div>
                </td>
                {show('sector') && (
                  <td className="col-sector">
                    <span className="sector-tag">{contact.sector || '—'}</span>
                  </td>
                )}
                {show('phone') && (
                  <td className="col-phone">
                    {contact.phone ? (
                      <span className="phone-text">{formatPhone(contact.phone)}</span>
                    ) : '—'}
                  </td>
                )}
                {show('score') && (
                  <td className="col-score">
                    <span className="score-value">{contact.combinedScore ?? '—'}</span>
                  </td>
                )}
                {show('priority') && (
                  <td className="col-priority">
                    <span className={priorityBadgeClass(contact.priority)}>
                      {contact.priority}
                    </span>
                  </td>
                )}
                {show('status') && (
                  <td className="col-status" onClick={stopProp}>
                    <button
                      className={`${statusBadgeClass(contact.status)} status-cycle-btn`}
                      onClick={() => onStatusCycle(contact)}
                      title="Click to cycle status"
                    >
                      {contact.status}
                    </button>
                  </td>
                )}
                {show('followUpDate') && (
                  <td className="col-followup">
                    {contact.followUpDate ? (
                      <span className="followup-date">{formatDate(contact.followUpDate)}</span>
                    ) : '—'}
                  </td>
                )}
                {show('actions') && (
                  <td className="col-actions" onClick={stopProp}>
                    <div className="action-btns">
                      {contact.phone && (
                        <a
                          className="action-btn wa-btn"
                          href={waLink(contact.phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp"
                          onClick={stopProp}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </a>
                      )}
                      <button
                        className="action-btn edit-btn"
                        onClick={() => onEdit(contact)}
                        title="Edit"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => onDelete(contact.id)}
                        title="Delete"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                          <path d="M10 11v6"/>
                          <path d="M14 11v6"/>
                          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <span className="pagination-info">
            {start}–{end} of {total.toLocaleString()}
          </span>
          <div className="pagination-btns">
            <button
              className="page-btn"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            >
              ‹
            </button>
            {pageRange().map((p, i) =>
              p === '…' ? (
                <span key={`e${i}`} className="page-ellipsis">…</span>
              ) : (
                <button
                  key={p}
                  className={`page-btn ${p === page ? 'active' : ''}`}
                  onClick={() => onPageChange(p)}
                >
                  {p}
                </button>
              )
            )}
            <button
              className="page-btn"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              ›
            </button>
          </div>
        </div>
      )}

      <style>{`
        .table-wrap {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: #fff;
        }
        .table-scroll {
          flex: 1;
          overflow: auto;
        }
        .contact-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
        }
        .contact-table thead tr {
          background: #f7f4ef;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .contact-table th {
          padding: 9px 12px;
          text-align: left;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          border-bottom: 1px solid var(--bdr2);
          white-space: nowrap;
        }
        .contact-table td {
          padding: 9px 12px;
          border-bottom: 1px solid rgba(200,169,81,0.06);
          vertical-align: middle;
        }
        .contact-row {
          cursor: pointer;
          transition: background 0.1s;
        }
        .contact-row:hover {
          background: var(--gdim);
        }
        .contact-row.selected {
          background: rgba(200,169,81,0.07);
        }
        .col-check {
          width: 36px;
          padding-left: 14px !important;
        }
        .col-check input[type=checkbox] {
          accent-color: var(--gold);
          width: 13px;
          height: 13px;
          cursor: pointer;
        }
        .name-cell {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 180px;
        }
        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          color: #fff;
          flex-shrink: 0;
          letter-spacing: 0.04em;
        }
        .name-info {
          min-width: 0;
        }
        .name-primary {
          font-weight: 500;
          color: var(--ink);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }
        .name-secondary {
          font-size: 11px;
          color: var(--muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }
        .sector-tag {
          font-size: 11px;
          color: var(--muted);
          background: rgba(200,169,81,0.07);
          padding: 2px 7px;
          border-radius: 3px;
          white-space: nowrap;
        }
        .phone-text {
          font-size: 12px;
          color: var(--ink);
          font-variant-numeric: tabular-nums;
        }
        .score-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 600;
          color: var(--gold);
        }
        .status-cycle-btn {
          cursor: pointer;
          border: none;
          font-family: 'DM Sans', sans-serif;
          transition: opacity 0.15s, transform 0.1s;
        }
        .status-cycle-btn:hover {
          opacity: 0.8;
          transform: scale(1.04);
        }
        .followup-date {
          font-size: 11.5px;
          color: var(--muted);
        }
        .action-btns {
          display: flex;
          align-items: center;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .contact-row:hover .action-btns {
          opacity: 1;
        }
        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 4px;
          border: none;
          background: transparent;
          color: var(--muted);
          text-decoration: none;
          transition: background 0.12s, color 0.12s;
        }
        .action-btn:hover { background: var(--gdim); color: var(--ink); }
        .wa-btn:hover { color: #25D366; }
        .edit-btn:hover { color: var(--gold); }
        .delete-btn:hover { color: var(--red); }

        .bulk-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--gdim);
          border-bottom: 1px solid var(--bdr);
          flex-shrink: 0;
        }
        .bulk-count {
          font-weight: 500;
          font-size: 12px;
          color: var(--gold);
          margin-right: 4px;
        }
        .bulk-label {
          font-size: 12px;
          color: var(--muted);
        }
        .bulk-status-btn {
          padding: 4px 10px;
          border: 1px solid var(--bdr);
          border-radius: 3px;
          background: #fff;
          font-size: 11px;
          font-family: 'DM Sans', sans-serif;
          color: var(--ink);
          cursor: pointer;
          transition: background 0.12s, border-color 0.12s;
        }
        .bulk-status-btn:hover {
          background: var(--gold);
          color: var(--ink);
          border-color: var(--gold);
        }
        .bulk-clear-btn {
          margin-left: auto;
          background: none;
          border: none;
          font-size: 11px;
          font-family: 'DM Sans', sans-serif;
          color: var(--muted);
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .bulk-clear-btn:hover { color: var(--red); }

        .empty-cell {
          text-align: center;
          padding: 48px !important;
          color: var(--muted);
          font-size: 13px;
        }
        .loading-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
        }
        .loading-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          animation: dotPulse 1.2s infinite ease-in-out;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }

        .pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-top: 1px solid var(--bdr2);
          background: #faf8f4;
          flex-shrink: 0;
        }
        .pagination-info {
          font-size: 11.5px;
          color: var(--muted);
        }
        .pagination-btns {
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .page-btn {
          min-width: 28px;
          height: 28px;
          padding: 0 6px;
          border: 1px solid var(--bdr2);
          border-radius: 4px;
          background: #fff;
          font-size: 12px;
          font-family: 'DM Sans', sans-serif;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.12s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .page-btn:hover:not(:disabled) {
          border-color: var(--gold);
          color: var(--gold);
        }
        .page-btn.active {
          background: var(--gold);
          color: var(--ink);
          border-color: var(--gold);
          font-weight: 500;
        }
        .page-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .page-ellipsis {
          font-size: 12px;
          color: var(--muted);
          padding: 0 4px;
        }
      `}</style>
    </div>
  );
}
