import * as React from 'react';

/** Operational fleet status pill (dot + mono caps). Distinct from threat accents. */
export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default 'READY' */
  status?: 'PATROLLING' | 'READY' | 'CHARGING' | 'RTN' | 'MAINTENANCE';
}

export function StatusPill(props: StatusPillProps): JSX.Element;
