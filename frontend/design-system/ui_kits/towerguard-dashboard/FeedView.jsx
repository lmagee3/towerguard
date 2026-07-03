// TowerGuard — live feed surfaces. FeedPanel (inline, inset) + FeedModal (overlay).
// Both wrap the drone-feed mock with a HUD overlay built from mono caps.

function HudCorner({ pos }) {
  const base = { position: 'absolute', width: 18, height: 18, borderColor: 'var(--tg-text-secondary)', opacity: 0.6 };
  const map = {
    tl: { top: 10, left: 10, borderTop: '1px solid', borderLeft: '1px solid' },
    tr: { top: 10, right: 10, borderTop: '1px solid', borderRight: '1px solid' },
    bl: { bottom: 10, left: 10, borderBottom: '1px solid', borderLeft: '1px solid' },
    br: { bottom: 10, right: 10, borderBottom: '1px solid', borderRight: '1px solid' },
  };
  return <span style={{ ...base, ...map[pos] }} />;
}

function FeedHud({ drone, big }) {
  return (
    <React.Fragment>
      <HudCorner pos="tl" /><HudCorner pos="tr" /><HudCorner pos="bl" /><HudCorner pos="br" />
      <div style={{ position: 'absolute', top: 14, left: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span className="tg-mono" style={{ fontSize: big ? 13 : 11, color: 'var(--tg-text-primary)', letterSpacing: '0.1em' }}>{drone} · 145FT AGL</span>
        <span className="tg-hud" style={{ fontSize: big ? 11 : 9 }}>GPS 40°37'51"N 74°12'29"W</span>
      </div>
      <div style={{ position: 'absolute', top: 14, right: 18, display: 'flex', alignItems: 'center', gap: 7 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--tg-active)' }} />
        <span className="tg-mono" style={{ fontSize: big ? 12 : 10, color: 'var(--tg-active)', letterSpacing: '0.12em' }}>REC</span>
      </div>
      <div style={{ position: 'absolute', bottom: 14, right: 18 }}>
        <span className="tg-hud" style={{ fontSize: big ? 10 : 9 }}>IR / LOW-LIGHT · ZOOM 2.8X · BAT 78%</span>
      </div>
    </React.Fragment>
  );
}

function FeedPanel({ drone, onExpand }) {
  const { Panel, Button } = window.DesignSystem_91a397;
  return (
    <Panel
      label="Live Feed"
      action={<Button variant="ghost" size="sm" onClick={onExpand}>EXPAND</Button>}
      inset pad={0}
    >
      <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', borderBottomLeftRadius: 'var(--tg-radius-md)', borderBottomRightRadius: 'var(--tg-radius-md)' }}>
        <img src="../../assets/imagery/drone-feed-mock.jpg" alt="Drone feed" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <FeedHud drone={drone} />
      </div>
    </Panel>
  );
}

function FeedModal({ drone, onClose }) {
  if (!drone) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(5,5,9,0.82)', backdropFilter: 'blur(3px)', padding: 32,
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{
        background: 'var(--tg-bg-surface)', border: '1px solid var(--tg-border-strong)',
        borderRadius: 'var(--tg-radius-lg)', overflow: 'hidden', maxWidth: 940, width: '100%',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderBottom: '1px solid var(--tg-border)' }}>
          <span className="tg-mono" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--tg-text-primary)' }}>LIVE FEED · {drone}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--tg-text-secondary)', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ position: 'relative', aspectRatio: '16 / 9', background: '#000' }}>
          <img src="../../assets/imagery/drone-feed-mock.jpg" alt="Drone feed" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <FeedHud drone={drone} big />
        </div>
      </div>
    </div>
  );
}

window.FeedPanel = FeedPanel;
window.FeedModal = FeedModal;
