import * as React from 'react';

/**
 * Threat-state badge — CLEAR / ELEVATED / ACTIVE / LOCKDOWN. Mono caps, flat
 * tinted fill, never glows.
 */
export interface ThreatBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default 'clear' */
  state?: 'clear' | 'elevated' | 'active' | 'lockdown';
  /** Solid fill for highest-emphasis placement. @default false */
  solid?: boolean;
  /** Show the leading status dot. @default true */
  dot?: boolean;
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
}

export function ThreatBadge(props: ThreatBadgeProps): JSX.Element;
