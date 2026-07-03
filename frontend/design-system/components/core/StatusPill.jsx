import React from 'react';

const STATUS = {
  PATROLLING:  'var(--tg-status-patrol)',
  READY:       'var(--tg-status-ready)',
  CHARGING:    'var(--tg-status-charge)',
  RTN:         'var(--tg-status-rtn)',
  MAINTENANCE: 'var(--tg-status-maint)',
};

/**
 * Fleet status pill — operational drone state (distinct from threat accents).
 * A small dot + mono caps on the elevated surface.
 */
export function StatusPill({ status = 'READY', style = {}, ...rest }) {
  const color = STATUS[status] || 'var(--tg-text-secondary)';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '4px 10px',
        borderRadius: 'var(--tg-radius-xs)',
        background: 'var(--tg-bg-elevated)',
        border: '1px solid var(--tg-border)',
        fontFamily: 'var(--tg-font-mono)',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.05em',
        color: 'var(--tg-text-primary)',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, flex: 'none' }} />
      {status}
    </span>
  );
}
