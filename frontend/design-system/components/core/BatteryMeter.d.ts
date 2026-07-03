import * as React from 'react';

/** Battery meter — mono tabular % + threshold-colored flat bar (>50 teal, 20–50 amber, <20 red). */
export interface BatteryMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100. @default 100 */
  value?: number;
  /** @default 'Battery' */
  label?: string;
  /** @default true */
  showLabel?: boolean;
}

export function BatteryMeter(props: BatteryMeterProps): JSX.Element;
