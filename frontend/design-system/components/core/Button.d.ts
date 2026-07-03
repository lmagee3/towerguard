import * as React from 'react';

/**
 * TowerGuard primary button. Monochrome by default; `accent` tracks the live
 * threat color. Use `danger` for destructive / lockdown actions.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  /** Visual treatment. @default 'secondary' */
  variant?: 'accent' | 'secondary' | 'ghost' | 'danger';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Optional leading icon node. */
  icon?: React.ReactNode;
  /** Stretch to container width. @default false */
  full?: boolean;
  disabled?: boolean;
}

export function Button(props: ButtonProps): JSX.Element;
