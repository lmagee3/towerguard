import React from 'react';

const STATES = {
  clear:    { label: 'CLEAR',    color: 'var(--tg-clear)',    fill: 'var(--tg-clear-fill)',    line: 'var(--tg-clear-line)' },
  elevated: { label: 'ELEVATED', color: 'var(--tg-elevated)', fill: 'var(--tg-elevated-fill)', line: 'var(--tg-elevated-line)' },
  active:   { label: 'ACTIVE',   color: 'var(--tg-active)',   fill: 'var(--tg-active-fill)',   line: 'var(--tg-active-line)' },
  lockdown: { label: 'LOCKDOWN', color: 'var(--tg-lockdown)', fill: 'var(--tg-lockdown-fill)', line: 'var(--tg-lockdown-line)' },
};

/**
 * Threat state badge. Mono caps, tinted flat fill + hairline — never glows.
 * `solid` fills it for the highest-emphasis placement (header chip in LOCKDOWN).
 */
export function ThreatBadge({ state = 'clear', solid = false, dot = true, size = 'md', style = {}, ...rest }) {
  const s = STATES[state] || STATES.clear;
  const sizes = {
    sm: { fontSize: 10, padding: '3px 8px', dot: 6 },
    md: { fontSize: 11, padding: '4px 10px', dot: 7 },
    lg: { fontSize: 13, padding: '6px 14px', dot: 8 },
  };
  const z = sizes[size] || sizes.md;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: z.dot,
        padding: z.padding,
        borderRadius: 'var(--tg-radius-xs)',
        fontFamily: 'var(--tg-font-mono)',
        fontSize: z.fontSize,
        fontWeight: 700,
        letterSpacing: '0.08em',
        background: solid ? s.color : s.fill,
        color: solid ? (state === 'lockdown' ? '#fff' : '#050509') : s.color,
        border: `1px solid ${solid ? s.color : s.line}`,
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span style={{
          width: z.dot, height: z.dot, borderRadius: '50%',
          background: solid ? (state === 'lockdown' ? '#fff' : '#050509') : s.color,
          flex: 'none',
        }} />
      )}
      {s.label}
    </span>
  );
}
