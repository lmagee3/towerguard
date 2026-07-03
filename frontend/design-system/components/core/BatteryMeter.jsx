import React from 'react';

/**
 * Battery meter — mono % with threshold coloring (>50 teal, 20–50 amber,
 * <20 red) and a flat bar. The number is always JetBrains Mono / tabular.
 */
export function BatteryMeter({ value = 100, label = 'Battery', showLabel = true, style = {}, ...rest }) {
  const v = Math.max(0, Math.min(100, value));
  const color = v < 20 ? 'var(--tg-lockdown)' : v < 50 ? 'var(--tg-elevated)' : 'var(--tg-clear)';
  return (
    <div style={{ ...style }} {...rest}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--tg-font-sans)', fontSize: 11, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--tg-text-secondary)' }}>{label}</span>
          <span style={{ fontFamily: 'var(--tg-font-mono)', fontSize: 13, fontVariantNumeric: 'tabular-nums', color }}>{v}%</span>
        </div>
      )}
      <div style={{ height: 4, background: 'var(--tg-bg-inset)', borderRadius: 'var(--tg-radius-xs)', overflow: 'hidden' }}>
        <div style={{ width: `${v}%`, height: '100%', background: color, borderRadius: 'var(--tg-radius-xs)', transition: 'width var(--tg-dur-base) var(--tg-ease)' }} />
      </div>
    </div>
  );
}
