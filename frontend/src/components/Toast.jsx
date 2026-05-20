import React from 'react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type || 'success'}`}>
          <div className="toast-icon">
            {(t.type === 'error') ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
          </div>
          <span className="toast-message">{t.message}</span>
          <button className="toast-dismiss" onClick={() => onDismiss(t.id)}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      ))}

      <style>{`
        .toast-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 500;
          pointer-events: none;
        }
        .toast {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 14px;
          background: var(--ink);
          border: 1px solid rgba(200,169,81,0.2);
          border-radius: 6px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.35);
          font-size: 12.5px;
          color: var(--cream);
          min-width: 220px;
          max-width: 340px;
          pointer-events: all;
          animation: fadeInUp 0.18s cubic-bezier(0.22,1,0.36,1);
        }
        .toast-success .toast-icon {
          color: var(--gold);
        }
        .toast-error {
          border-color: rgba(176,58,46,0.35);
        }
        .toast-error .toast-icon {
          color: var(--red);
        }
        .toast-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        .toast-message {
          flex: 1;
          line-height: 1.4;
        }
        .toast-dismiss {
          background: none;
          border: none;
          color: var(--muted);
          cursor: pointer;
          padding: 2px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }
        .toast-dismiss:hover { color: var(--cream); }
      `}</style>
    </div>
  );
}
