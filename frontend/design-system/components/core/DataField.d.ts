import * as React from 'react';

/** Labeled telemetry value — uppercase sans label over a mono tabular value. */
export interface DataFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  /** Value color (e.g. a threat token). @default primary */
  color?: string;
  /** @default 'left' */
  align?: 'left' | 'right';
}

export function DataField(props: DataFieldProps): JSX.Element;
