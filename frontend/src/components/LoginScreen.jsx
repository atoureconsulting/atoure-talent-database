import React, { useState, useRef, useEffect } from 'react';
import { login, setToken } from '../api.js';

export default function LoginScreen({ onAuthenticated }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError('');
    try {
      const { token } = await login(code.trim());
      setToken(token);
      onAuthenticated();
    } catch {
      setError('Incorrect access code. Please try again.');
      setCode('');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      inputRef.current?.focus();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#0D0C0A',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Subtle gold grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'repeating-linear-gradient(0deg, #C8A951 0, #C8A951 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C8A951 0, #C8A951 1px, transparent 1px, transparent 60px)',
        pointerEvents: 'none',
      }} />

      <form onSubmit={handleSubmit} style={{ position: 'relative', width: '100%', maxWidth: 380, padding: '0 1.5rem' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '3rem', fontWeight: 600,
            color: '#C8A951', letterSpacing: '0.08em', lineHeight: 1,
          }}>
            AToure
          </div>
          <div style={{
            fontSize: '8.5px', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(200,169,81,0.35)', marginTop: '6px',
          }}>
            Management &amp; Consulting
          </div>
          <div style={{
            width: 40, height: 1, background: 'rgba(200,169,81,0.25)',
            margin: '1.4rem auto 0',
          }} />
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(200,169,81,0.15)',
          borderRadius: 10, padding: '2rem',
          animation: shake ? 'loginShake 0.45s ease' : 'none',
        }}>
          <div style={{
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'rgba(200,169,81,0.5)',
            textAlign: 'center', marginBottom: '1.25rem',
          }}>
            Enter Access Code
          </div>

          <input
            ref={inputRef}
            type="text"
            value={code}
            onChange={e => { setCode(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
            maxLength={20}
            autoComplete="off"
            placeholder="· · · · · ·"
            style={{
              width: '100%', padding: '14px 16px',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${error ? 'rgba(176,58,46,0.5)' : 'rgba(200,169,81,0.2)'}`,
              borderRadius: 6, outline: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '18px', fontWeight: 400,
              color: '#FAF6EE', textAlign: 'center',
              letterSpacing: '0.35em',
              transition: 'border-color 0.15s',
              boxSizing: 'border-box',
            }}
            onFocus={e => { if (!error) e.target.style.borderColor = 'rgba(200,169,81,0.5)'; }}
            onBlur={e => { if (!error) e.target.style.borderColor = 'rgba(200,169,81,0.2)'; }}
          />

          {error && (
            <div style={{
              marginTop: '0.6rem', fontSize: '11px',
              color: '#e05a4a', textAlign: 'center', letterSpacing: '0.02em',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !code.trim()}
            style={{
              marginTop: '1.1rem', width: '100%',
              padding: '12px', borderRadius: 6, border: 'none',
              background: loading || !code.trim() ? 'rgba(200,169,81,0.35)' : '#C8A951',
              color: '#0D0C0A', fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', cursor: loading || !code.trim() ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s, transform 0.1s',
            }}
            onMouseEnter={e => { if (!loading && code.trim()) e.target.style.background = '#E8CC7A'; }}
            onMouseLeave={e => { if (!loading && code.trim()) e.target.style.background = '#C8A951'; }}
          >
            {loading ? 'Verifying…' : 'Enter'}
          </button>
        </div>

        <div style={{
          textAlign: 'center', marginTop: '1.5rem',
          fontSize: '9px', letterSpacing: '0.1em',
          color: 'rgba(200,169,81,0.2)', textTransform: 'uppercase',
        }}>
          IShowSpeed Côte d'Ivoire Campaign
        </div>
      </form>

      <style>{`
        @keyframes loginShake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
