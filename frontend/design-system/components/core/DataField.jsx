import React from 'react';

/**
 * DataField — a labeled telemetry value. Uppercase sans label, mono value.
 * The canonical way to render any live number (GPS, altitude, heading, temp).
 */
export function DataField({ label, value, color = 'var(--tg-text-primary)', align = 'left', style = {}, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: align === 'right' ? 'flex-end' : 'flex-start', ...style }} {...rest}>
      <span style={{
        fontFamily: 'var(--tg-font-sans)', fontSize: 10, fontWeight: 600,
        letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--tg-text-secondary)',
      }}>{label}</span>
      <span style={{
        fontFamily: 'var(--tg-font-mono)', fontSize: 14, fontVariantNumeric: 'tabular-nums',
        letterSpacing: '0.02em', color,
      }}>{value}</span>
    </div>
  );
}
