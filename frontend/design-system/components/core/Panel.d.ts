import * as React from 'react';

/**
 * Core surface panel — hairline border, 24px pad, optional uppercase label
 * header + right-aligned action slot. Depth without shadow.
 */
export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  /** Uppercase section label in the header. */
  label?: string;
  /** Right-aligned node in the header (button, badge, meta). */
  action?: React.ReactNode;
  children?: React.ReactNode;
  /** Use the darker inset background (feeds, maps, code). @default false */
  inset?: boolean;
  /** Interior padding in px. @default 24 */
  pad?: number;
  bodyStyle?: React.CSSProperties;
}

export function Panel(props: PanelProps): JSX.Element;
