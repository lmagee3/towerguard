import { useEffect, useRef, useState } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface LatLng { lat: number; lng: number }
interface DroneState {
  id: string;
  status: string;
  battery_pct: number;
  position: LatLng;
  mission_id: string | null;
  last_seen: string;
}
interface NestState {
  id: string;
  status: string;
  active_mission: string | null;
  drones: DroneState[];
}
interface Alert {
  id: string;
  type: string;
  severity: string;
  source_drone: string;
  position: LatLng | null;
  timestamp: string;
  acknowledged: boolean;
  message: string;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const API = 'http://127.0.0.1:8000';
const WS_BASE = 'ws://127.0.0.1:8000';

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  PATROLLING:  { bg: 'rgba(59,130,246,0.2)',  text: '#60a5fa' },
  READY:       { bg: 'rgba(16,185,129,0.2)',  text: '#34d399' },
  CHARGING:    { bg: 'rgba(245,158,11,0.2)',  text: '#fbbf24' },
  RTN:         { bg: 'rgba(168,85,247,0.2)',   text: '#c084fc' },
  MAINTENANCE: { bg: 'rgba(100,116,139,0.3)', text: '#94a3b8' },
};

const SEVERITY_BORDER: Record<string, string> = {
  CRITICAL: '#ef4444',
  HIGH:     '#f97316',
  MEDIUM:   '#eab308',
  LOW:      '#6b7280',
};

// ─── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const [nest, setNest] = useState<NestState | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeTakeover, setActiveTakeover] = useState<string | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── WebSocket with auto-reconnect ──────────────────────────────────────

  useEffect(() => {
    let wsTelemetry: WebSocket | null = null;
    let wsAlerts: WebSocket | null = null;
    let dead = false;

    function connect() {
      if (dead) return;

      try {
        wsTelemetry = new WebSocket(`${WS_BASE}/ws/telemetry`);
        wsAlerts = new WebSocket(`${WS_BASE}/ws/alerts/live`);

        wsTelemetry.onopen = () => { setConnected(true); setError(null); };
        wsTelemetry.onmessage = (e) => {
          try { setNest(JSON.parse(e.data)); } catch {}
        };
        wsTelemetry.onerror = () => setError('WebSocket error — is the backend running on port 8000?');
        wsTelemetry.onclose = () => {
          setConnected(false);
          if (!dead) reconnectTimer.current = setTimeout(connect, 3000);
        };

        wsAlerts.onmessage = (e) => {
          try {
            const alert = JSON.parse(e.data);
            setAlerts((prev) => [alert, ...prev].slice(0, 20));
          } catch {}
        };
      } catch (err) {
        setError(`Connection failed: ${err}`);
        if (!dead) reconnectTimer.current = setTimeout(connect, 3000);
      }
    }

    // Also poll REST for initial state (WebSocket only pushes on sim update)
    fetch(`${API}/nest/status`)
      .then(r => r.json())
      .then(data => setNest(data))
      .catch(() => {});

    fetch(`${API}/alerts`)
      .then(r => r.json())
      .then(data => setAlerts(data.slice(0, 20)))
      .catch(() => {});

    connect();

    return () => {
      dead = true;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsTelemetry?.close();
      wsAlerts?.close();
    };
  }, []);

  // ── Actions ────────────────────────────────────────────────────────────

  async function takeover(id: string) {
    setActiveTakeover(id);
    await fetch(`${API}/drones/${id}/takeover`, { method: 'POST' }).catch(() => {});
  }

  async function returnToNest(id: string) {
    await fetch(`${API}/drones/${id}/return-to-nest`, { method: 'POST' }).catch(() => {});
  }

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f1f5f9',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      padding: '24px',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #1e293b',
        paddingBottom: '16px',
        marginBottom: '32px',
      }}>
        <div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span style={{ color: '#3b82f6', fontSize: '24px' }}>♜</span>
            TOWERGUARD
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>
            SITE: DEMO TEST RANGE
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>NEST STATUS</p>
          <p style={{
            fontSize: '14px',
            fontWeight: 600,
            color: nest ? '#34d399' : '#94a3b8',
            margin: '2px 0 0',
          }}>
            {nest ? nest.status : 'CONNECTING...'}
          </p>
          <div style={{
            display: 'inline-block',
            width: 8, height: 8,
            borderRadius: '50%',
            backgroundColor: connected ? '#34d399' : '#ef4444',
            marginTop: 4,
            animation: connected ? 'none' : undefined,
          }} />
        </div>
      </header>

      {/* Error banner */}
      {error && (
        <div style={{
          backgroundColor: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: 8,
          padding: '12px 16px',
          marginBottom: 24,
          fontSize: 13,
          color: '#fca5a5',
        }}>
          {error} — Retrying every 3s...
        </div>
      )}

      {/* Waiting state */}
      {!nest && !error && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60vh',
          gap: 16,
        }}>
          <div style={{
            width: 40, height: 4,
            backgroundColor: '#1e293b',
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            <div style={{
              width: '50%', height: '100%',
              backgroundColor: '#3b82f6',
              borderRadius: 4,
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
          </div>
          <p style={{ fontSize: 14, color: '#64748b' }}>Connecting to TowerGuard backend...</p>
          <p style={{ fontSize: 12, color: '#475569' }}>
            Make sure the backend is running: python3 -m uvicorn backend.api.main:app --port 8000
          </p>
        </div>
      )}

      {/* Main content */}
      {nest && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 24,
        }}>
          {/* Fleet */}
          <div>
            <h2 style={{
              fontSize: '15px',
              fontWeight: 600,
              borderBottom: '1px solid #1e293b',
              paddingBottom: 8,
              marginBottom: 16,
              letterSpacing: '0.05em',
            }}>FLEET STATUS</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}>
              {nest.drones.map((drone) => {
                const sc = STATUS_COLORS[drone.status] || STATUS_COLORS.MAINTENANCE;
                return (
                  <div key={drone.id} style={{
                    border: '1px solid #1e293b',
                    borderRadius: 10,
                    backgroundColor: 'rgba(30,41,59,0.5)',
                    padding: 16,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontWeight: 700, fontSize: 16, fontFamily: "'JetBrains Mono', monospace" }}>{drone.id}</span>
                      <span style={{
                        padding: '3px 10px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        backgroundColor: sc.bg,
                        color: sc.text,
                      }}>{drone.status}</span>
                    </div>

                    {/* Battery bar */}
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span style={{ color: '#94a3b8' }}>Battery</span>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          color: drone.battery_pct < 20 ? '#ef4444' : drone.battery_pct < 50 ? '#eab308' : '#34d399',
                        }}>{drone.battery_pct}%</span>
                      </div>
                      <div style={{ height: 4, backgroundColor: '#1e293b', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{
                          width: `${drone.battery_pct}%`,
                          height: '100%',
                          borderRadius: 2,
                          backgroundColor: drone.battery_pct < 20 ? '#ef4444' : drone.battery_pct < 50 ? '#eab308' : '#34d399',
                          transition: 'width 0.5s ease',
                        }} />
                      </div>
                    </div>

                    {/* GPS */}
                    <p style={{
                      fontSize: 11,
                      color: '#475569',
                      fontFamily: "'JetBrains Mono', monospace",
                      margin: '8px 0 0',
                    }}>
                      {drone.position.lat.toFixed(5)}, {drone.position.lng.toFixed(5)}
                    </p>

                    {/* Controls */}
                    {['PATROLLING', 'RTN'].includes(drone.status) && (
                      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                        <button onClick={() => setActiveVideo(drone.id)} style={{
                          flex: 1, padding: '8px 0', borderRadius: 6,
                          backgroundColor: '#334155', color: '#e2e8f0',
                          border: 'none', fontSize: 12, fontWeight: 500, cursor: 'pointer',
                        }}>FEED</button>
                        <button onClick={() => takeover(drone.id)} style={{
                          flex: 1, padding: '8px 0', borderRadius: 6,
                          backgroundColor: '#2563eb', color: '#ffffff',
                          border: 'none', fontSize: 12, fontWeight: 500, cursor: 'pointer',
                        }}>TAKEOVER</button>
                        {drone.status !== 'RTN' ? (
                          <button onClick={() => returnToNest(drone.id)} style={{
                            flex: 1, padding: '8px 0', borderRadius: 6,
                            backgroundColor: '#334155', color: '#e2e8f0',
                            border: 'none', fontSize: 12, fontWeight: 500, cursor: 'pointer',
                          }}>RTN</button>
                        ) : (
                          <div style={{
                            flex: 1, padding: '8px 0', borderRadius: 6,
                            backgroundColor: 'rgba(245,158,11,0.2)', color: '#fbbf24',
                            border: '1px solid rgba(245,158,11,0.5)', fontSize: 12, fontWeight: 700,
                            textAlign: 'center', animation: 'pulse 1.5s infinite'
                          }}>RETURNING...</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alerts */}
          <div>
            <h2 style={{
              fontSize: '15px',
              fontWeight: 600,
              borderBottom: '1px solid #1e293b',
              paddingBottom: 8,
              marginBottom: 16,
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{ color: '#f59e0b' }}>▲</span>
              LIVE ALERTS
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {alerts.length === 0 ? (
                <p style={{ fontSize: 13, color: '#475569', textAlign: 'center', padding: '32px 0' }}>
                  No recent alerts
                </p>
              ) : (
                alerts.map((alert, i) => (
                  <div key={`${alert.id}-${i}`} style={{
                    padding: '10px 12px',
                    borderRadius: 6,
                    borderLeft: `3px solid ${SEVERITY_BORDER[alert.severity] || '#6b7280'}`,
                    backgroundColor: 'rgba(30,41,59,0.4)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#cbd5e1', letterSpacing: '0.03em' }}>{alert.type}</span>
                      <span style={{ fontSize: 10, color: '#475569', fontFamily: "'JetBrains Mono', monospace" }}>
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>{alert.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Video modal */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(4px)',
            padding: 24,
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{
            backgroundColor: '#0f172a',
            border: '1px solid #334155',
            borderRadius: 12,
            overflow: 'hidden',
            maxWidth: 900,
            width: '100%',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              backgroundColor: '#1e293b', padding: '10px 16px',
              borderBottom: '1px solid #334155',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#ffffff' }}>
                  LIVE FEED : {activeVideo}
                </span>
              </div>
              <button onClick={() => setActiveVideo(null)} style={{
                background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18,
              }}>✕</button>
            </div>
            <div style={{
              aspectRatio: '16/9',
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url(/drone_feed.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.85
              }} />
              
              {/* Static Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'repeating-radial-gradient(#000 0 0.0001%,#ffffff 0 0.0002%) 50% 0/2500px 2500px, repeating-conic-gradient(#000 0 0.0001%,#ffffff 0 0.0002%) 50% 50%/2500px 2500px',
                backgroundBlendMode: 'difference',
                opacity: 0.06,
                animation: 'static 0.2s infinite alternate',
                pointerEvents: 'none'
              }} />

              {/* REC Indicator */}
              <div style={{
                position: 'absolute', top: 20, right: 24,
                display: 'flex', alignItems: 'center', gap: 8,
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: '4px 10px', borderRadius: 4,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12, color: '#fff', fontWeight: 600
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444', animation: 'pulse 2s infinite' }} />
                REC
              </div>

              <div style={{
                position: 'absolute',
                bottom: 20, left: 24,
                color: '#fff',
                textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: '4px 8px', borderRadius: 4
              }}>
                [ FEED — {activeVideo} — {nest?.drones.find(d => d.id === activeVideo)?.status === 'RTN' ? 'RETURNING TO NEST' : 'SIMULATED'} ]
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Takeover modal */}
      {activeTakeover && (
        <div
          onClick={() => setActiveTakeover(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 60,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(220,38,38,0.15)',
            backdropFilter: 'blur(8px)',
            padding: 24,
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{
            backgroundColor: '#0f172a',
            border: '2px solid #ef4444',
            boxShadow: '0 0 40px rgba(239,68,68,0.4)',
            borderRadius: 12,
            overflow: 'hidden',
            maxWidth: 1000,
            width: '100%',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              backgroundColor: '#7f1d1d', padding: '12px 20px',
              borderBottom: '2px solid #ef4444',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#fca5a5', animation: 'pulse 1s infinite' }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 800, letterSpacing: '0.15em', color: '#ffffff' }}>
                  MANUAL CONTROL OVERRIDE : {activeTakeover}
                </span>
              </div>
              <button onClick={() => setActiveTakeover(null)} style={{
                background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', fontSize: 24, fontWeight: 'bold'
              }}>✕</button>
            </div>
            <div style={{
              aspectRatio: '16/9',
              backgroundColor: '#000',
              display: 'flex',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url(/drone_feed.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.9,
                filter: 'sepia(1) hue-rotate(-50deg) saturate(3) brightness(0.8)' // Turns the green thermal red
              }} />
              
              {/* Static Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'repeating-radial-gradient(#000 0 0.0001%,#ffffff 0 0.0002%) 50% 0/2500px 2500px, repeating-conic-gradient(#000 0 0.0001%,#ffffff 0 0.0002%) 50% 50%/2500px 2500px',
                backgroundBlendMode: 'difference',
                opacity: 0.08,
                animation: 'static 0.15s infinite alternate',
                pointerEvents: 'none'
              }} />

              {/* HUD Elements */}
              <div style={{ position: 'absolute', inset: 30, border: '2px solid rgba(239,68,68,0.5)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: 60, height: 60, border: '2px solid #ef4444', borderRadius: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: 20, height: 2, backgroundColor: '#ef4444', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: 2, height: 20, backgroundColor: '#ef4444', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />

              <div style={{ position: 'absolute', bottom: 40, right: 40, color: '#fca5a5', fontFamily: "'JetBrains Mono', monospace", fontSize: 14, textAlign: 'right' }}>
                <div>THROTTLE: <span style={{ animation: 'flicker 2s infinite' }}>[=====   ]</span></div>
                <div>YAW: <span style={{ animation: 'flicker 1.5s infinite' }}>[   |    ]</span></div>
                <div>PITCH: <span style={{ animation: 'flicker 1.8s infinite' }}>[   |    ]</span></div>
                <div style={{ marginTop: 10, color: '#ef4444', fontWeight: 'bold' }}>MAVLINK CONNECTED</div>
              </div>

              <div style={{
                position: 'absolute',
                bottom: 40, left: 40,
                color: '#fff',
                fontSize: 18,
                fontFamily: "'JetBrains Mono', monospace",
                backgroundColor: 'rgba(239,68,68,0.8)',
                padding: '6px 12px', borderRadius: 4,
                fontWeight: 'bold',
                animation: 'pulse 1s infinite'
              }}>
                [ OPERATOR TAKEOVER ACTIVE ]
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes static {
          0% { background-position: 0% 0%; }
          10% { background-position: 5% 10%; }
          20% { background-position: -5% 5%; }
          30% { background-position: 10% -10%; }
          40% { background-position: -10% 20%; }
          50% { background-position: 15% -5%; }
          60% { background-position: -15% 15%; }
          70% { background-position: 5% -15%; }
          80% { background-position: -5% 25%; }
          90% { background-position: 10% -20%; }
          100% { background-position: -10% 10%; }
        }
      `}</style>
    </div>
  );
}
