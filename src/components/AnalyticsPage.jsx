import { useState } from 'react';
import { BarChart3, ShieldCheck, AlertTriangle, TrendingUp, Clock, Globe, Activity } from 'lucide-react';

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('week');

  // Mock analytics data
  const stats = {
    week: { scanned: 47, threats: 12, safe: 35, accuracy: 98.4 },
    month: { scanned: 183, threats: 41, safe: 142, accuracy: 97.8 },
    all: { scanned: 1024, threats: 287, safe: 737, accuracy: 98.1 },
  };

  const current = stats[timeRange];
  const threatPercent = Math.round((current.threats / current.scanned) * 100);

  const recentScans = [
    { url: 'usps-tracking-portal-info.com', status: 'malicious', time: '2 min ago', vendors: '14/89' },
    { url: 'google.com', status: 'safe', time: '5 min ago', vendors: '0/89' },
    { url: 'secure-bank-login-update.net', status: 'malicious', time: '12 min ago', vendors: '23/89' },
    { url: 'wikipedia.org', status: 'safe', time: '18 min ago', vendors: '0/89' },
    { url: 'netflix-billing-update-center.com', status: 'malicious', time: '25 min ago', vendors: '9/89' },
    { url: 'amazon.com', status: 'safe', time: '31 min ago', vendors: '0/89' },
    { url: 'apple-id-recovery-link.info', status: 'malicious', time: '45 min ago', vendors: '18/89' },
  ];

  const topThreatTypes = [
    { type: 'Credential Harvesting', pct: 42, color: 'var(--malicious-red)' },
    { type: 'Fake Delivery', pct: 28, color: 'var(--warning-orange)' },
    { type: 'Account Takeover', pct: 18, color: '#a855f7' },
    { type: 'Malware Distribution', pct: 12, color: 'var(--primary-blue)' },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="app-header">
        <h1 className="header-title">Analytics</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Activity size={16} style={{ color: 'var(--safe-green)' }} />
          <span className="text-xs" style={{ color: 'var(--safe-green)' }}>Live</span>
        </div>
      </div>

      <div className="app-content" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Time Range Selector */}
        <div className="analytics-time-selector">
          {[
            { key: 'week', label: 'This Week' },
            { key: 'month', label: 'This Month' },
            { key: 'all', label: 'All Time' },
          ].map((t) => (
            <button
              key={t.key}
              className={`analytics-time-btn ${timeRange === t.key ? 'active' : ''}`}
              onClick={() => setTimeRange(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Summary Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="analytics-card">
            <div className="analytics-card-icon" style={{ background: 'rgba(14, 165, 233, 0.12)', color: 'var(--primary-blue)' }}>
              <Globe size={18} />
            </div>
            <span className="analytics-card-value">{current.scanned}</span>
            <span className="text-xs text-muted">URLs Scanned</span>
          </div>
          <div className="analytics-card">
            <div className="analytics-card-icon" style={{ background: 'rgba(239, 68, 68, 0.12)', color: 'var(--malicious-red)' }}>
              <AlertTriangle size={18} />
            </div>
            <span className="analytics-card-value" style={{ color: 'var(--malicious-red)' }}>{current.threats}</span>
            <span className="text-xs text-muted">Threats Found</span>
          </div>
          <div className="analytics-card">
            <div className="analytics-card-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: 'var(--safe-green)' }}>
              <ShieldCheck size={18} />
            </div>
            <span className="analytics-card-value" style={{ color: 'var(--safe-green)' }}>{current.safe}</span>
            <span className="text-xs text-muted">Safe Links</span>
          </div>
          <div className="analytics-card">
            <div className="analytics-card-icon" style={{ background: 'rgba(34, 211, 238, 0.12)', color: 'var(--accent-cyan)' }}>
              <TrendingUp size={18} />
            </div>
            <span className="analytics-card-value">{current.accuracy}%</span>
            <span className="text-xs text-muted">AI Accuracy</span>
          </div>
        </div>

        {/* Threat Breakdown Visual */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="font-semibold text-sm">Threat Categories</span>
            <span className="badge badge-malicious" style={{ fontSize: '0.65rem' }}>{threatPercent}% threat rate</span>
          </div>
          {topThreatTypes.map((t, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="text-xs">{t.type}</span>
                <span className="text-xs text-muted">{t.pct}%</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'var(--bg-dark)', borderRadius: '2px', overflow: 'hidden' }}>
                <div className="analytics-bar-fill" style={{
                  width: `${t.pct}%`, height: '100%', background: t.color, borderRadius: '2px'
                }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Scan Log */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="font-semibold text-sm">Recent Scans</span>
            <span className="text-xs text-muted"><Clock size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />Live Feed</span>
          </div>
          {recentScans.map((scan, i) => (
            <div key={i} className="analytics-scan-row">
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                background: scan.status === 'malicious' ? 'var(--malicious-red)' : 'var(--safe-green)',
                boxShadow: `0 0 8px ${scan.status === 'malicious' ? 'rgba(239,68,68,0.5)' : 'rgba(16,185,129,0.5)'}`
              }}></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="text-xs font-medium" style={{
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                }}>{scan.url}</p>
                <p className="text-xs text-muted">{scan.vendors} vendors • {scan.time}</p>
              </div>
              <span className={`badge ${scan.status === 'malicious' ? 'badge-malicious' : 'badge-safe'}`} style={{ fontSize: '0.6rem' }}>
                {scan.status === 'malicious' ? 'THREAT' : 'SAFE'}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
