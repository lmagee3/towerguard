The core surface — every section of the dashboard sits in a Panel. Hairline border, 24px padding, optional uppercase label header with a right-aligned action slot. Never carries a shadow; depth comes from the background layer.

```jsx
<Panel label="Fleet Status" action={<ThreatBadge state="clear" />}>
  …cards…
</Panel>
<Panel label="Live Feed" inset pad={0}>…</Panel>
```

Use `inset` for feed frames / maps / code wells. Set `pad={0}` when the child is full-bleed (an image or map).
