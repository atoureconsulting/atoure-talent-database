import React from 'react';

export default function StatsBar({ stats, contacts }) {
  const { total = 0, byStatus = {}, byPriority = {} } = stats;

  // Contacts with a followUpDate set but not Partner or Archived
  const needFollowUp = contacts
    ? contacts.filter(c => c.followUpDate && c.status !== 'Partner' && c.status !== 'Archived').length
    : 0;

  const cards = [
    {
      label: 'Total Contacts',
      value: total,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87"/>
          <path d="M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
      color: 'var(--gold)',
    },
    {
      label: 'High Priority',
      value: byPriority.High || 0,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
      color: '#27AE60',
    },
    {
      label: 'Partners',
      value: byStatus.Partner || 0,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      color: '#2ECC71',
    },
    {
      label: 'Need Follow-up',
      value: needFollowUp,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      color: '#E8CC7A',
    },
  ];

  return (
    <div className="stats-bar">
      {cards.map(card => (
        <div key={card.label} className="stats-card">
          <div className="stats-card-icon" style={{ color: card.color }}>
            {card.icon}
          </div>
          <div className="stats-card-body">
            <div className="stats-card-value" style={{ color: card.color }}>
              {card.value.toLocaleString()}
            </div>
            <div className="stats-card-label">{card.label}</div>
          </div>
        </div>
      ))}

      <style>{`
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          background: #fff;
          border-bottom: 1px solid var(--bdr2);
          flex-shrink: 0;
        }
        .stats-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          border-right: 1px solid var(--bdr2);
        }
        .stats-card:last-child {
          border-right: none;
        }
        .stats-card-icon {
          flex-shrink: 0;
          opacity: 0.85;
        }
        .stats-card-body {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .stats-card-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 600;
          line-height: 1;
        }
        .stats-card-label {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: var(--muted);
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}
