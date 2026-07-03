import React from 'react';
import { StatusPill } from '../core/StatusPill.jsx';
import { BatteryMeter } from '../core/BatteryMeter.jsx';
import { Button } from '../core/Button.jsx';

/**
 * DroneCard — a single fleet member. Mono ID, status pill, battery meter, GPS,
 * and (when airborne) the FEED / TAKEOVER / RTN control row. Progressive
 * disclosure: controls only render for PATROLLING / RTN drones.
 */
export function DroneCard({ drone, onFeed, onTakeover, onReturn, style = {}, ...rest }) {
  const d = drone || {};
  const live = ['PATROLLING', 'RTN'].includes(d.status);
  return (
    <div
      style={{
        background: 'var(--tg-bg-surface)',
        border: '1px solid var(--tg-border)',
        borderRadius: 'var(--tg-radius-md)',
        padding: 16,
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontFamily: 'var(--tg-font-mono)', fontSize: 16, fontWeight: 700, letterSpacing: '0.04em', color: 'var(--tg-text-primary)' }}>{d.id || 'WT-00'}</span>
        <StatusPill status={d.status || 'READY'} />
      </div>

      <BatteryMeter value={d.battery_pct ?? 0} />

      <p style={{ fontFamily: 'var(--tg-font-mono)', fontSize: 11, color: 'var(--tg-text-muted)', margin: '12px 0 0', letterSpacing: '0.02em' }}>
        {d.position ? `${d.position.lat?.toFixed(5)}, ${d.position.lng?.toFixed(5)}` : '— — —'}
      </p>

      {live && (
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <Button variant="secondary" size="sm" full onClick={() => onFeed?.(d.id)}>FEED</Button>
          <Button variant="accent" size="sm" full onClick={() => onTakeover?.(d.id)}>TAKEOVER</Button>
          {d.status !== 'RTN' && (
            <Button variant="ghost" size="sm" full onClick={() => onReturn?.(d.id)}>RTN</Button>
          )}
        </div>
      )}
    </div>
  );
}
