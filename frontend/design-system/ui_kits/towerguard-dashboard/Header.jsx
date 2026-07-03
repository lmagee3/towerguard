// TowerGuard — Command Dashboard header. Logo lockup, site, live clock,
// connection state, and the master ThreatBadge.
function Header({ threat, nestStatus, connected, clock }) {
  const { ThreatBadge } = window.DesignSystem_91a397;
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 28px', borderBottom: '1px solid var(--tg-border)',
      background: 'var(--tg-bg-surface)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <img src="../../assets/logos/towerguard-mark.png" alt="" style={{ width: 38, height: 38 }} />
        <div>
          <div style={{ fontFamily: 'var(--tg-font-sans)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--tg-text-primary)' }}>
            TOWERGUARD
          </div>
          <div style={{ fontFamily: 'var(--tg-font-mono)', fontSize: 11, color: 'var(--tg-text-secondary)', letterSpacing: '0.06em' }}>
            SITE · DEMO TEST RANGE
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <div style={{ textAlign: 'right' }}>
          <div className="tg-label" style={{ fontSize: 10 }}>NEST STATUS</div>
          <div style={{ fontFamily: 'var(--tg-font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--tg-accent)', letterSpacing: '0.04em', marginTop: 2 }}>
            {nestStatus}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="tg-label" style={{ fontSize: 10 }}>UTC</div>
          <div className="tg-mono" style={{ fontSize: 13, color: 'var(--tg-text-primary)', marginTop: 2 }}>{clock}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: connected ? 'var(--tg-clear)' : 'var(--tg-lockdown)' }} />
          <span className="tg-hud" style={{ fontSize: 10 }}>{connected ? 'LINK OK' : 'NO LINK'}</span>
        </div>
        <ThreatBadge state={threat} solid={threat === 'lockdown'} size="lg" />
      </div>
    </header>
  );
}
window.Header = Header;
