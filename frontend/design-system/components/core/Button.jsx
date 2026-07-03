import React from 'react';

/**
 * TowerGuard Button.
 * Sharp, technical, monochrome by default; the `accent` variant uses the live
 * threat accent so primary actions shift color with threat state.
 */
export function Button({
  children,
  variant = 'secondary', // 'accent' | 'secondary' | 'ghost' | 'danger'
  size = 'md',           // 'sm' | 'md' | 'lg'
  icon,                  // optional leading node (e.g. <i data-lucide>)
  full = false,
  disabled = false,
  type = 'button',
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '6px 12px', fontSize: 12, height: 30, gap: 6 },
    md: { padding: '8px 16px', fontSize: 13, height: 36, gap: 8 },
    lg: { padding: '11px 20px', fontSize: 14, height: 44, gap: 8 },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    accent: {
      background: 'var(--tg-accent)',
      color: 'var(--tg-accent-ink)',
      border: '1px solid var(--tg-accent)',
    },
    secondary: {
      background: 'var(--tg-bg-elevated)',
      color: 'var(--tg-text-primary)',
      border: '1px solid var(--tg-border-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--tg-text-secondary)',
      border: '1px solid transparent',
    },
    danger: {
      background: 'var(--tg-lockdown-fill)',
      color: 'var(--tg-lockdown)',
      border: '1px solid var(--tg-lockdown-line)',
    },
  };
  const v = variants[variant] || variants.secondary;

  return (
    <button
      type={type}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        width: full ? '100%' : 'auto',
        padding: s.padding,
        minHeight: s.height,
        fontFamily: 'var(--tg-font-sans)',
        fontSize: s.fontSize,
        fontWeight: 600,
        letterSpacing: '0.02em',
        borderRadius: 'var(--tg-radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        whiteSpace: 'nowrap',
        transition: 'background var(--tg-dur-fast) var(--tg-ease), border-color var(--tg-dur-fast) var(--tg-ease), opacity var(--tg-dur-fast)',
        ...v,
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled && variant === 'ghost') e.currentTarget.style.background = 'var(--tg-bg-elevated)'; }}
      onMouseLeave={(e) => { if (!disabled && variant === 'ghost') e.currentTarget.style.background = 'transparent'; }}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
