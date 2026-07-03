import React from 'react';

const SEVERITY = {
  CRITICAL: 'var(--tg-lockdown)',
  HIGH:     'var(--tg-active)',
  MEDIUM:   'var(--tg-elevated)',
  LOW:      'var(--tg-text-secondary)',
};

/**
 * AlertRow — one event in the live feed. Severity is a left rule (3px), the
 * type + timestamp are mono, the message is sans. Unacknowledged rows sit on
 * the elevated surface; acknowledged ones recede.
 */
export function AlertRow({ alert, onClick, style = {}, ...rest }) {
  const a = alert || {};
  const color = SEVERITY[a.severity] || SEVERITY.LOW;
  return (
    <div
      onClick={onClick}
      style={{
        padding: '10px 14px',
        borderRadius: 'var(--tg-radius-sm)',
        borderLeft: `3px solid ${color}`,
        background: a.acknowledged ? 'transparent' : 'var(--tg-bg-elevated)',
        border: '1px solid var(--tg-border)',
        borderLeftWidth: 3,
        borderLeftColor: color,
        cursor: onClick ? 'pointer' : 'default',
        opacity: a.acknowledged ? 0.55 : 1,
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--tg-font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: 'var(--tg-text-primary)' }}>{a.type || 'EVENT'}</span>
        <span style={{ fontFamily: 'var(--tg-font-mono)', fontSize: 10, color: 'var(--tg-text-muted)' }}>{a.time || '—'}</span>
      </div>
      <p style={{ fontFamily: 'var(--tg-font-sans)', fontSize: 13, color: 'var(--tg-text-secondary)', margin: 0, lineHeight: 1.45 }}>{a.message}</p>
      {a.source_drone && (
        <span style={{ fontFamily: 'var(--tg-font-mono)', fontSize: 10, color: color, marginTop: 6, display: 'inline-block', letterSpacing: '0.04em' }}>SRC · {a.source_drone}</span>
      )}
    </div>
  );
}
