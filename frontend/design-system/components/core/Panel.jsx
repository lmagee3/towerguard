import React from 'react';

/**
 * Panel — the core surface. Hairline border, 24px interior padding, optional
 * uppercase label header with a right-aligned action/meta slot. No shadow.
 */
export function Panel({ label, action, children, inset = false, pad = 24, style = {}, bodyStyle = {}, ...rest }) {
  return (
    <section
      style={{
        background: inset ? 'var(--tg-bg-inset)' : 'var(--tg-bg-surface)',
        border: '1px solid var(--tg-border)',
        borderRadius: 'var(--tg-radius-md)',
        ...style,
      }}
      {...rest}
    >
      {(label || action) && (
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: `16px ${pad}px`,
          borderBottom: '1px solid var(--tg-border)',
        }}>
          <span style={{
            fontFamily: 'var(--tg-font-sans)', fontSize: 12, fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--tg-text-secondary)',
          }}>{label}</span>
          {action}
        </header>
      )}
      <div style={{ padding: pad, ...bodyStyle }}>{children}</div>
    </section>
  );
}
