Primary action button — sharp, technical; monochrome by default, `accent` tracks the live threat color. Use for fleet controls (TAKEOVER, RTN, FEED), dispatch, and dialog actions.

```jsx
<Button variant="accent" size="md">Take Control</Button>
<Button variant="secondary" icon={<i data-lucide="video" />}>Feed</Button>
<Button variant="danger">Lockdown</Button>
<Button variant="ghost" size="sm">Dismiss</Button>
```

Variants: `accent` (filled, threat-colored — one per view), `secondary` (default, elevated surface + border), `ghost` (text-only, hover fills), `danger` (red, destructive). Sizes `sm | md | lg`. `full` stretches to container. Place inside a `[data-threat]` scope so `accent` picks up the active state color.
