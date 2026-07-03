One event in the live alert feed — a severity-colored left rule, mono type + timestamp, sans message, and an optional source-drone tag. Unacknowledged rows sit on the elevated surface; acknowledged rows fade back.

```jsx
<AlertRow alert={{ type: 'MOTION_DETECTED', severity: 'HIGH', message: 'Movement near East Gate', time: '03:17:42Z', source_drone: 'WT-01' }} />
```

Severity → color: `CRITICAL` red, `HIGH` orange, `MEDIUM` amber, `LOW` grey. Stack inside a `Panel label="Live Alerts"` with 10px gap, newest first.
