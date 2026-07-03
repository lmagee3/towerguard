import * as React from 'react';

export interface AlertItem {
  type: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  message: string;
  time?: string;
  source_drone?: string;
  acknowledged?: boolean;
}

/**
 * One row in the live alert feed — severity left-rule, mono type + timestamp,
 * sans message. Acknowledged rows recede.
 *
 * @startingPoint section="Fleet" subtitle="Live alert feed row" viewport="700x120"
 */
export interface AlertRowProps extends React.HTMLAttributes<HTMLDivElement> {
  alert: AlertItem;
  onClick?: () => void;
}

export function AlertRow(props: AlertRowProps): JSX.Element;
