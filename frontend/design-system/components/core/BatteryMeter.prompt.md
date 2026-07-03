Battery / charge meter — mono tabular percentage with automatic threshold color (>50 teal, 20–50 amber, <20 red) and a flat bar. Use on every drone card.

```jsx
<BatteryMeter value={87} />
<BatteryMeter value={18} label="Charge" />
```

The percentage is always JetBrains Mono. Pair with `StatusPill` inside a `DroneCard`.
