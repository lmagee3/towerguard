// TowerGuard — Command Dashboard. Interactive scenario: step the perimeter
// from CLEAR → ELEVATED → ACTIVE → LOCKDOWN; the whole UI recolors via the
// [data-threat] scope and progressively surfaces more (feed, dispatch).

const { useState, useEffect } = React;

const BASE_DRONES = [
  { id: 'WT-01', status: 'PATROLLING', battery_pct: 87, position: { lat: 40.63167, lng: -74.20806 } },
  { id: 'WT-02', status: 'READY',       battery_pct: 93, position: { lat: 40.63140, lng: -74.20770 } },
  { id: 'WT-03', status: 'CHARGING',    battery_pct: 42, position: { lat: 40.63102, lng: -74.20791 } },
  { id: 'WT-04', status: 'MAINTENANCE', battery_pct: 8,  position: { lat: 40.63120, lng: -74.20760 } },
];

// Each scenario step: threat, nest label, mission, drone overrides, new alert.
const STEPS = [
  {
    threat: 'clear', nest: 'SECURED', mission: 'PERIMETER SWEEP ALPHA',
    drones: BASE_DRONES,
    alert: { type: 'SYSTEM', severity: 'LOW', message: 'All sectors nominal. Fleet rotation on schedule.', source_drone: 'NEST', acknowledged: true },
  },
  {
    threat: 'elevated', nest: 'WATCH', mission: 'INVESTIGATE · EAST GATE',
    drones: BASE_DRONES,
    alert: { type: 'MOTION_DETECTED', severity: 'MEDIUM', message: 'Movement detected near East Gate perimeter.', source_drone: 'WT-01' },
  },
  {
    threat: 'active', nest: 'ENGAGING', mission: 'TRACK · 2 SUBJECTS',
    drones: BASE_DRONES.map(d => d.id === 'WT-02' ? { ...d, status: 'PATROLLING', battery_pct: 91 } : d),
    alert: { type: 'INTRUSION', severity: 'HIGH', message: 'Two subjects inside fence line. WT-02 launched to track.', source_drone: 'WT-01' },
  },
  {
    threat: 'lockdown', nest: 'BREACH', mission: 'CONTAIN · DISPATCH GUARD',
    drones: BASE_DRONES.map(d => d.id === 'WT-02' ? { ...d, status: 'PATROLLING', battery_pct: 88 } : d.id === 'WT-03' ? { ...d, status: 'RTN', battery_pct: 44 } : d),
    alert: { type: 'PERIMETER_BREACH', severity: 'CRITICAL', message: 'Confirmed breach — East Gate. Guard dispatch requested.', source_drone: 'WT-02' },
  },
];

function nowUTC() {
  return new Date().toISOString().slice(11, 19) + 'Z';
}

function App() {
  const { Panel, Button, DroneCard, AlertRow, ThreatBadge, DataField, StatusPill } = window.DesignSystem_91a397;
  const { FeedPanel, FeedModal, Header } = window;

  const [step, setStep] = useState(0);
  const [alerts, setAlerts] = useState([{ ...STEPS[0].alert, time: nowUTC() }]);
  const [feed, setFeed] = useState(null);
  const [clock, setClock] = useState(nowUTC());

  useEffect(() => {
    const t = setInterval(() => setClock(nowUTC()), 1000);
    return () => clearInterval(t);
  }, []);

  const cur = STEPS[step];
  const escalated = step >= 2; // ACTIVE+ surfaces the live feed inline

  function advance() {
    const next = (step + 1) % STEPS.length;
    setStep(next);
    if (next === 0) {
      setAlerts([{ ...STEPS[0].alert, time: nowUTC() }]);
    } else {
      setAlerts(prev => [{ ...STEPS[next].alert, time: nowUTC() }, ...prev].slice(0, 12));
    }
  }

  return (
    <div data-threat={cur.threat} style={{ minHeight: '100vh', background: 'var(--tg-bg-deep)' }}>
      <Header threat={cur.threat} nestStatus={cur.nest} connected clock={clock} />

      {/* Scenario control strip */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 28px', borderBottom: '1px solid var(--tg-border)', background: 'var(--tg-bg-surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="tg-label" style={{ fontSize: 10 }}>MISSION</span>
          <span className="tg-mono" style={{ fontSize: 13, color: 'var(--tg-accent)', letterSpacing: '0.04em' }}>{cur.mission}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="tg-hud" style={{ fontSize: 10 }}>SIM SCENARIO</span>
          <Button variant="accent" size="sm" onClick={advance}>
            {step === STEPS.length - 1 ? 'RESET → CLEAR' : 'ESCALATE →'}
          </Button>
        </div>
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, padding: 28, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Panel label="Fleet Status" action={<span className="tg-hud" style={{ fontSize: 10 }}>4 UNITS · 1 NEST</span>}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {cur.drones.map(d => (
                <DroneCard key={d.id} drone={d}
                  onFeed={setFeed}
                  onTakeover={() => setFeed(d.id)}
                  onReturn={() => {}}
                />
              ))}
            </div>
          </Panel>

          {escalated && <FeedPanel drone="WT-02" onExpand={() => setFeed('WT-02')} />}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Panel label="Live Alerts" action={<ThreatBadge state={cur.threat} size="sm" />}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {alerts.map((a, i) => <AlertRow key={i} alert={a} />)}
            </div>
            {cur.threat === 'lockdown' && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--tg-border)' }}>
                <Button variant="danger" full>DISPATCH GUARD · EAST GATE</Button>
              </div>
            )}
          </Panel>

          <Panel label="Nest · Rotation">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {cur.drones.map(d => (
                <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="tg-mono" style={{ fontSize: 13, color: 'var(--tg-text-primary)' }}>{d.id}</span>
                  <StatusPill status={d.status} />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <FeedModal drone={feed} onClose={() => setFeed(null)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
