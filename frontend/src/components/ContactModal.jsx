import React, { useState, useEffect, useRef } from 'react';
import { createContact, updateContact } from '../api.js';

const SECTORS = [
  'Média / Visibilité',
  'Production audiovisuelle',
  'Accès lieux / expériences',
  'Restauration',
  'Hébergement',
  'Sécurité',
  'Logistique',
  'Autre',
];

function emptyForm() {
  return {
    firstName: '',
    lastName: '',
    company: '',
    sector: '',
    phone: '',
    email: '',
    city: '',
    profile: '',
    priority: 'Medium',
    status: 'New',
    notes: '',
    followUpDate: '',
    tags: [],
  };
}

function contactToForm(c) {
  return {
    firstName: c.firstName || '',
    lastName: c.lastName || '',
    company: c.company || '',
    sector: c.sector || '',
    phone: c.phone || '',
    email: c.email || '',
    city: c.city || '',
    profile: c.profile || '',
    priority: c.priority || 'Medium',
    status: c.status || 'New',
    notes: c.notes || '',
    followUpDate: c.followUpDate || '',
    tags: Array.isArray(c.tags) ? [...c.tags] : [],
  };
}

export default function ContactModal({ mode, contact, onClose, onSave, showToast }) {
  const [form, setForm] = useState(() => mode === 'edit' && contact ? contactToForm(contact) : emptyForm());
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState('');
  const firstRef = useRef(null);

  useEffect(() => {
    setTimeout(() => firstRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    function handler(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const errs = {};
    if (!form.firstName.trim() && !form.lastName.trim()) {
      errs.firstName = 'First or last name required';
    }
    return errs;
  }

  async function handleSave() {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        name: [form.firstName, form.lastName].filter(Boolean).join(' '),
        followUpDate: form.followUpDate || null,
        tags: form.tags,
      };
      if (mode === 'edit' && contact) {
        await updateContact(contact.id, payload);
      } else {
        await createContact(payload);
      }
      onSave();
    } catch (e) {
      showToast('Save failed: ' + e.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  function handleTagKeyDown(e) {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const tag = tagInput.trim().replace(/,$/, '');
      if (tag && !form.tags.includes(tag)) {
        set('tags', [...form.tags, tag]);
      }
      setTagInput('');
    } else if (e.key === 'Backspace' && !tagInput && form.tags.length > 0) {
      set('tags', form.tags.slice(0, -1));
    }
  }

  function removeTag(tag) {
    set('tags', form.tags.filter(t => t !== tag));
  }

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">
            {mode === 'edit' ? 'Edit Contact' : 'Add Contact'}
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-row two-col">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                ref={firstRef}
                className={`form-input ${errors.firstName ? 'error' : ''}`}
                type="text"
                value={form.firstName}
                onChange={e => set('firstName', e.target.value)}
                placeholder="Firstname"
              />
              {errors.firstName && <div className="form-error">{errors.firstName}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                className="form-input"
                type="text"
                value={form.lastName}
                onChange={e => set('lastName', e.target.value)}
                placeholder="Lastname"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Company</label>
            <input
              className="form-input"
              type="text"
              value={form.company}
              onChange={e => set('company', e.target.value)}
              placeholder="Company name"
            />
          </div>

          <div className="form-row two-col">
            <div className="form-group">
              <label className="form-label">Sector</label>
              <select
                className="form-input"
                value={form.sector}
                onChange={e => set('sector', e.target.value)}
              >
                <option value="">Select sector…</option>
                {SECTORS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                className="form-input"
                type="text"
                value={form.city}
                onChange={e => set('city', e.target.value)}
                placeholder="City"
              />
            </div>
          </div>

          <div className="form-row two-col">
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                className="form-input"
                type="tel"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
                placeholder="+225 XX XX XX XX"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="form-row two-col">
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                className="form-input"
                value={form.priority}
                onChange={e => set('priority', e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-input"
                value={form.status}
                onChange={e => set('status', e.target.value)}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Partner">Partner</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Follow-up Date</label>
            <input
              className="form-input"
              type="date"
              value={form.followUpDate}
              onChange={e => set('followUpDate', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              className="form-input form-textarea"
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="Internal notes…"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tags</label>
            <div className="tags-input-wrap">
              {form.tags.map(tag => (
                <span key={tag} className="tag-chip">
                  {tag}
                  <button className="tag-remove" onClick={() => removeTag(tag)}>×</button>
                </span>
              ))}
              <input
                className="tags-input"
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder={form.tags.length === 0 ? "Add tags — press Enter" : ""}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="modal-save-btn" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : mode === 'edit' ? 'Save Changes' : 'Add Contact'}
          </button>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.15s ease;
        }
        .modal {
          background: var(--ink);
          border: 1px solid rgba(200,169,81,0.15);
          border-radius: 8px;
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          animation: fadeInUp 0.18s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px 14px;
          border-bottom: 1px solid rgba(200,169,81,0.1);
          flex-shrink: 0;
        }
        .modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          color: var(--gold);
        }
        .modal-close {
          background: none;
          border: none;
          color: var(--muted);
          cursor: pointer;
          padding: 3px;
          border-radius: 4px;
          display: flex;
          transition: color 0.15s;
        }
        .modal-close:hover { color: var(--cream); }
        .modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 18px 22px;
          display: flex;
          flex-direction: column;
          gap: 13px;
        }
        .form-row.two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .form-label {
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(200,169,81,0.55);
        }
        .form-input {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(200,169,81,0.18);
          border-radius: 4px;
          color: var(--cream);
          padding: 7px 10px;
          font-size: 12.5px;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.15s;
          width: 100%;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--gold);
        }
        .form-input::placeholder { color: var(--muted); }
        .form-input.error { border-color: var(--red); }
        .form-textarea {
          resize: vertical;
          min-height: 70px;
        }
        .form-error {
          font-size: 11px;
          color: var(--red);
          margin-top: 2px;
        }
        /* Keep select options dark-ish */
        .form-input option {
          background: #1e1b17;
          color: var(--cream);
        }
        .tags-input-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          align-items: center;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(200,169,81,0.18);
          border-radius: 4px;
          padding: 5px 8px;
          min-height: 36px;
          transition: border-color 0.15s;
        }
        .tags-input-wrap:focus-within {
          border-color: var(--gold);
        }
        .tag-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(200,169,81,0.15);
          color: var(--gold2);
          padding: 2px 8px 2px 8px;
          border-radius: 3px;
          font-size: 11.5px;
        }
        .tag-remove {
          background: none;
          border: none;
          color: inherit;
          opacity: 0.6;
          cursor: pointer;
          font-size: 13px;
          padding: 0;
          line-height: 1;
          transition: opacity 0.1s;
        }
        .tag-remove:hover { opacity: 1; }
        .tags-input {
          background: none;
          border: none;
          outline: none;
          color: var(--cream);
          font-size: 12.5px;
          font-family: 'DM Sans', sans-serif;
          min-width: 80px;
          flex: 1;
          padding: 2px 2px;
        }
        .tags-input::placeholder { color: var(--muted); }
        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          padding: 14px 22px;
          border-top: 1px solid rgba(200,169,81,0.1);
          flex-shrink: 0;
        }
        .modal-cancel-btn {
          padding: 8px 16px;
          background: transparent;
          border: 1px solid rgba(200,169,81,0.2);
          border-radius: 4px;
          color: var(--muted);
          font-size: 12.5px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
        }
        .modal-cancel-btn:hover { color: var(--cream); border-color: rgba(200,169,81,0.4); }
        .modal-save-btn {
          padding: 8px 20px;
          background: var(--gold);
          color: var(--ink);
          border: none;
          border-radius: 4px;
          font-size: 12.5px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s;
        }
        .modal-save-btn:hover { background: var(--gold2); }
        .modal-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>
    </div>
  );
}
