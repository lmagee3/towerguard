A single fleet drone — mono ID, status pill, battery meter, GPS, and a FEED / TAKEOVER / RTN control row that only appears for airborne (`PATROLLING`/`RTN`) drones. Composes StatusPill, BatteryMeter and Button.

```jsx
<DroneCard
  drone={{ id: 'WT-01', status: 'PATROLLING', battery_pct: 87, position: { lat: 40.63167, lng: -74.20806 } }}
  onFeed={id => …} onTakeover={id => …} onReturn={id => …}
/>
```

Lay four in a 2-column grid inside a `Panel label="Fleet Status"`. Controls hide for READY / CHARGING / MAINTENANCE drones by design.
