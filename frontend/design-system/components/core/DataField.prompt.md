Labeled telemetry field — uppercase sans label over a JetBrains Mono value. The canonical way to render any live number so it stays mono + tabular.

```jsx
<DataField label="GPS" value="40.63167, -74.20806" />
<DataField label="Battery" value="87%" color="var(--tg-clear)" align="right" />
```

Lay several in a grid for a telemetry block. Always pass numeric/coordinate/timestamp data through this rather than plain text.
