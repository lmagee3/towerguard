Threat-state badge — the single most important status element. Mono caps with a flat tinted fill and hairline; `solid` fills it for header / lockdown emphasis.

```jsx
<ThreatBadge state="clear" />
<ThreatBadge state="elevated" size="sm" />
<ThreatBadge state="lockdown" solid size="lg" />
```

States: `clear` (teal), `elevated` (amber), `active` (orange), `lockdown` (red). Use exactly one prominent threat badge per view — it names the condition the whole UI is colored for.
