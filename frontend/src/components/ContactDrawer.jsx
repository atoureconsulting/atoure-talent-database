import React, { useState, useEffect, useRef, useCallback } from 'react';

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name[0].toUpperCase();
}

function avatarColor(priority) {
  return priority === 'High' ? '#1E7A4A' : '#1A5276';
}

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

function waLink(phone) {
  if (!phone) return null;
  const clean = phone.replace(/[\s\-\(\)]/g, '');
  return `https://wa.me/${clean.startsWith('+') ? clean.slice(1) : clean}`;
}

function formatTimestamp(ts) {
  if (!ts) return '';
  try {
    const d = new Date(ts);
    return d.toLocaleString('fr-CI', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  } catch {
    return ts;
  }
}

export default function ContactDrawer({ contact, activity, onClose, onUpdate, onAddActivity, onEdit, onDelete, showToast }) {
  const [followUpDate, setFollowUpDate] = useState(contact.followUpDate || '');
  const [savingFollowUp, setSavingFollowUp] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [loggingNote, setLoggingNote] = useState(false);
  const drawerRef = useRef(null);

  // Sync followUpDate if contact changes
  useEffect(() => {
    setFollowUpDate(contact.followUpDate || '');
  }, [contact.id, contact.followUpDate]);

  // Escape key closes
  useEffect(() => {
    function handler(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  async function handleSaveFollowUp() {
    setSavingFollowUp(true);
    try {
      await onUpdate(contact.id, { followUpDate: followUpDate || null });
      showToast('Follow-up date saved');
    } catch {}
    setSavingFollowUp(false);
  }

  async function handleLogNote() {
    if (!noteText.trim()) return;
    setLoggingNote(true);
    try {
      await onAddActivity(contact.id, `Note: ${noteText.trim()}`, '');
      setNoteText('');
    } catch {}
    setLoggingNote(false);
  }

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  const tags = Array.isArray(contact.tags) ? contact.tags : [];

  return (
    <>
      <div className="drawer-overlay" onClick={handleOverlayClick} />
      <div className="drawer" ref={drawerRef}>
        <div className="drawer-header">
          <div className="drawer-identity">
            <div className="drawer-avatar" style={{ background: avatarColor(contact.priority) }}>
              {getInitials(contact.name)}
            </div>
            <div className="drawer-identity-info">
              <div className="drawer-name">{contact.name}</div>
              {contact.company && <div className="drawer-company">{contact.company}</div>}
              <div className="drawer-badges">
                <span className={statusBadgeClass(contact.status)}>{contact.status}</span>
                <span className={priorityBadgeClass(contact.priority)}>{contact.priority}</span>
                {contact.profile && (
                  <span className="badge badge-profile">{contact.profile}</span>
                )}
              </div>
            </div>
          </div>
          <div className="drawer-header-right">
            <div className="drawer-score-box">
              <div className="drawer-score-val">{contact.combinedScore ?? 0}</div>
              <div className="drawer-score-lbl">score</div>
            </div>
            <button className="drawer-close" onClick={onClose} title="Close (Esc)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="drawer-body">
          <div className="drawer-section">
            <div className="drawer-section-title">Contact Details</div>
            <div className="drawer-details-grid">
              {contact.phone && (
                <div className="detail-row">
                  <div className="detail-label">Phone</div>
                  <div className="detail-value">
                    <a className="detail-link" href={waLink(contact.phone)} target="_blank" rel="noopener noreferrer">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              )}
              {contact.email && (
                <div className="detail-row">
                  <div className="detail-label">Email</div>
                  <div className="detail-value">
                    <a className="detail-link" href={`mailto:${contact.email}`}>{contact.email}</a>
                  </div>
                </div>
              )}
              {contact.city && (
                <div className="detail-row">
                  <div className="detail-label">City</div>
                  <div className="detail-value">{contact.city}</div>
                </div>
              )}
              {contact.sector && (
                <div className="detail-row">
                  <div className="detail-label">Sector</div>
                  <div className="detail-value">{contact.sector}</div>
                </div>
              )}
              {contact.profile && (
                <div className="detail-row">
                  <div className="detail-label">Profile</div>
                  <div className="detail-value">{contact.profile}</div>
                </div>
              )}
              {(contact.companyScore !== null && contact.companyScore !== undefined) && (
                <div className="detail-row">
                  <div className="detail-label">Score breakdown</div>
                  <div className="detail-value score-breakdown">
                    <span>Company: {contact.companyScore}</span>
                    <span className="score-sep">·</span>
                    <span>Person: {contact.personScore}</span>
                    <span className="score-sep">·</span>
                    <span className="score-combined">Total: {contact.combinedScore}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {contact.message && (
            <div className="drawer-section">
              <div className="drawer-section-title">Message</div>
              <div className="drawer-message">{contact.message}</div>
            </div>
          )}

          {contact.notes && (
            <div className="drawer-section">
              <div className="drawer-section-title">Notes</div>
              <div className="drawer-message">{contact.notes}</div>
            </div>
          )}

          {tags.length > 0 && (
            <div className="drawer-section">
              <div className="drawer-section-title">Tags</div>
              <div className="drawer-tags">
                {tags.map((tag, i) => (
                  <span key={i} className="drawer-tag">{tag}</span>
                ))}
              </div>
            </div>
          )}

          <div className="drawer-section">
            <div className="drawer-section-title">Follow-up Date</div>
            <div className="followup-row">
              <input
                type="date"
                className="followup-input"
                value={followUpDate}
                onChange={e => setFollowUpDate(e.target.value)}
              />
              <button
                className="followup-save-btn"
                onClick={handleSaveFollowUp}
                disabled={savingFollowUp}
              >
                {savingFollowUp ? 'Saving…' : 'Save'}
              </button>
              {followUpDate && (
                <button
                  className="followup-clear-btn"
                  onClick={() => {
                    setFollowUpDate('');
                    onUpdate(contact.id, { followUpDate: null });
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="drawer-section">
            <div className="drawer-section-title">Activity Log</div>
            <div className="note-add-row">
              <textarea
                className="note-textarea"
                placeholder="Add a note…"
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                rows={2}
                onKeyDown={e => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleLogNote();
                }}
              />
              <button
                className="note-log-btn"
                onClick={handleLogNote}
                disabled={loggingNote || !noteText.trim()}
              >
                {loggingNote ? '…' : 'Log Note'}
              </button>
            </div>
            <div className="activity-list">
              {activity.length === 0 && (
                <div className="activity-empty">No activity yet</div>
              )}
              {activity.map(entry => (
                <div key={entry.id} className="activity-entry">
                  <div className="activity-dot" />
                  <div className="activity-content">
                    <div className="activity-action">{entry.action}</div>
                    {entry.detail && <div className="activity-detail">{entry.detail}</div>}
                    <div className="activity-time">{formatTimestamp(entry.timestamp)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <button className="drawer-edit-btn" onClick={() => onEdit(contact)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit Contact
          </button>
          <button className="drawer-delete-btn" onClick={() => { onDelete(contact.id); }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
              <path d="M10 11v6"/>
              <path d="M14 11v6"/>
            </svg>
            Delete
          </button>
        </div>

        <style>{`
          .drawer-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.35);
            z-index: 100;
          }
          .drawer {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 400px;
            background: var(--ink);
            border-left: 1px solid rgba(200,169,81,0.15);
            display: flex;
            flex-direction: column;
            z-index: 101;
            animation: slideInRight 0.22s cubic-bezier(0.22,1,0.36,1);
            overflow: hidden;
          }
          .drawer-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            padding: 20px 20px 16px;
            border-bottom: 1px solid rgba(200,169,81,0.1);
            flex-shrink: 0;
            gap: 12px;
          }
          .drawer-identity {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            flex: 1;
            min-width: 0;
          }
          .drawer-avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            font-weight: 600;
            color: #fff;
            flex-shrink: 0;
          }
          .drawer-identity-info {
            flex: 1;
            min-width: 0;
          }
          .drawer-name {
            font-size: 15px;
            font-weight: 500;
            color: var(--cream);
            margin-bottom: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .drawer-company {
            font-size: 12px;
            color: var(--muted);
            margin-bottom: 6px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .drawer-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
          }
          .badge-profile {
            background: rgba(200,169,81,0.1);
            color: var(--muted);
          }
          .drawer-header-right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 8px;
            flex-shrink: 0;
          }
          .drawer-score-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1px;
          }
          .drawer-score-val {
            font-family: 'Cormorant Garamond', serif;
            font-size: 26px;
            font-weight: 600;
            color: var(--gold);
            line-height: 1;
          }
          .drawer-score-lbl {
            font-size: 9px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: rgba(200,169,81,0.5);
          }
          .drawer-close {
            background: none;
            border: none;
            color: var(--muted);
            cursor: pointer;
            padding: 3px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            transition: color 0.15s, background 0.15s;
          }
          .drawer-close:hover { color: var(--cream); background: rgba(255,255,255,0.08); }
          .drawer-body {
            flex: 1;
            overflow-y: auto;
            padding: 4px 0;
          }
          .drawer-section {
            padding: 14px 20px;
            border-bottom: 1px solid rgba(200,169,81,0.06);
          }
          .drawer-section:last-child { border-bottom: none; }
          .drawer-section-title {
            font-size: 9px;
            font-weight: 500;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: rgba(200,169,81,0.45);
            margin-bottom: 10px;
          }
          .drawer-details-grid {
            display: flex;
            flex-direction: column;
            gap: 7px;
          }
          .detail-row {
            display: flex;
            align-items: baseline;
            gap: 10px;
          }
          .detail-label {
            font-size: 11px;
            color: var(--muted);
            width: 100px;
            flex-shrink: 0;
          }
          .detail-value {
            font-size: 12.5px;
            color: var(--cream);
            flex: 1;
            min-width: 0;
          }
          .detail-link {
            color: var(--gold2);
            text-decoration: none;
          }
          .detail-link:hover { text-decoration: underline; }
          .score-breakdown {
            font-size: 11.5px;
            color: var(--muted);
            display: flex;
            align-items: center;
            gap: 6px;
            flex-wrap: wrap;
          }
          .score-sep { opacity: 0.4; }
          .score-combined { color: var(--gold); font-weight: 500; }
          .drawer-message {
            font-size: 12px;
            color: rgba(250,246,238,0.7);
            line-height: 1.6;
            max-height: 120px;
            overflow-y: auto;
            white-space: pre-wrap;
            background: rgba(255,255,255,0.04);
            padding: 10px 12px;
            border-radius: 5px;
            border: 1px solid rgba(200,169,81,0.08);
          }
          .drawer-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }
          .drawer-tag {
            font-size: 11px;
            padding: 3px 9px;
            background: rgba(200,169,81,0.12);
            color: var(--gold2);
            border-radius: 3px;
          }
          .followup-row {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .followup-input {
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(200,169,81,0.2);
            border-radius: 4px;
            color: var(--cream);
            padding: 6px 10px;
            font-size: 12px;
            font-family: 'DM Sans', sans-serif;
            transition: border-color 0.15s;
            flex: 1;
          }
          .followup-input:focus {
            outline: none;
            border-color: var(--gold);
          }
          .followup-save-btn {
            padding: 6px 14px;
            background: var(--gold);
            color: var(--ink);
            border: none;
            border-radius: 4px;
            font-size: 12px;
            font-family: 'DM Sans', sans-serif;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.15s;
            white-space: nowrap;
          }
          .followup-save-btn:hover { background: var(--gold2); }
          .followup-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
          .followup-clear-btn {
            background: none;
            border: none;
            font-size: 11px;
            font-family: 'DM Sans', sans-serif;
            color: var(--muted);
            cursor: pointer;
            text-decoration: underline;
            text-underline-offset: 2px;
          }
          .followup-clear-btn:hover { color: var(--red); }
          .note-add-row {
            display: flex;
            gap: 8px;
            margin-bottom: 12px;
            align-items: flex-start;
          }
          .note-textarea {
            flex: 1;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(200,169,81,0.2);
            border-radius: 4px;
            color: var(--cream);
            padding: 7px 10px;
            font-size: 12px;
            font-family: 'DM Sans', sans-serif;
            resize: vertical;
            transition: border-color 0.15s;
          }
          .note-textarea:focus { outline: none; border-color: var(--gold); }
          .note-textarea::placeholder { color: var(--muted); }
          .note-log-btn {
            padding: 6px 12px;
            background: rgba(200,169,81,0.15);
            color: var(--gold);
            border: 1px solid rgba(200,169,81,0.2);
            border-radius: 4px;
            font-size: 12px;
            font-family: 'DM Sans', sans-serif;
            cursor: pointer;
            white-space: nowrap;
            transition: background 0.15s;
            flex-shrink: 0;
          }
          .note-log-btn:hover { background: rgba(200,169,81,0.25); }
          .note-log-btn:disabled { opacity: 0.5; cursor: not-allowed; }
          .activity-list {
            display: flex;
            flex-direction: column;
            gap: 0;
          }
          .activity-empty {
            font-size: 12px;
            color: var(--muted);
            font-style: italic;
          }
          .activity-entry {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding: 7px 0;
            border-bottom: 1px solid rgba(200,169,81,0.05);
          }
          .activity-entry:last-child { border-bottom: none; }
          .activity-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: rgba(200,169,81,0.35);
            flex-shrink: 0;
            margin-top: 4px;
          }
          .activity-content {
            flex: 1;
            min-width: 0;
          }
          .activity-action {
            font-size: 12px;
            color: var(--cream);
            line-height: 1.4;
          }
          .activity-detail {
            font-size: 11.5px;
            color: var(--muted);
            margin-top: 2px;
          }
          .activity-time {
            font-size: 10.5px;
            color: rgba(138,134,124,0.6);
            margin-top: 3px;
          }
          .drawer-footer {
            display: flex;
            gap: 10px;
            padding: 14px 20px;
            border-top: 1px solid rgba(200,169,81,0.1);
            flex-shrink: 0;
          }
          .drawer-edit-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            flex: 1;
            justify-content: center;
            padding: 8px;
            background: rgba(200,169,81,0.12);
            color: var(--gold);
            border: 1px solid rgba(200,169,81,0.2);
            border-radius: 5px;
            font-size: 12px;
            font-family: 'DM Sans', sans-serif;
            cursor: pointer;
            transition: background 0.15s;
          }
          .drawer-edit-btn:hover { background: rgba(200,169,81,0.22); }
          .drawer-delete-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 14px;
            background: rgba(176,58,46,0.1);
            color: var(--red);
            border: 1px solid rgba(176,58,46,0.2);
            border-radius: 5px;
            font-size: 12px;
            font-family: 'DM Sans', sans-serif;
            cursor: pointer;
            transition: background 0.15s;
          }
          .drawer-delete-btn:hover { background: rgba(176,58,46,0.2); }
        `}</style>
      </div>
    </>
  );
}
