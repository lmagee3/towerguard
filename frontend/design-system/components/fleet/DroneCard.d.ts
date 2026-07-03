import * as React from 'react';

interface LatLng { lat: number; lng: number }
export interface Drone {
  id: string;
  status: 'PATROLLING' | 'READY' | 'CHARGING' | 'RTN' | 'MAINTENANCE';
  battery_pct: number;
  position?: LatLng;
}

/**
 * Fleet member card — ID, status, battery, GPS, and control row for airborne
 * drones (progressive disclosure). Composes StatusPill, BatteryMeter, Button.
 *
 * @startingPoint section="Fleet" subtitle="Drone fleet card with live controls" viewport="700x260"
 */
export interface DroneCardProps extends React.HTMLAttributes<HTMLDivElement> {
  drone: Drone;
  onFeed?: (id: string) => void;
  onTakeover?: (id: string) => void;
  onReturn?: (id: string) => void;
}

export function DroneCard(props: DroneCardProps): JSX.Element;
