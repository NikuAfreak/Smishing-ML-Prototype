import { useState, useEffect } from 'react';
import { Shield, Cpu, Search, ArrowRight, MessageSquare, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export function HomePage({ onEnter }) {
  const [mounted, setMounted] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    const timer = setTimeout(() => setStatsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-page" style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      overflow: 'hidden', position: 'relative'
    }}>

      {/* Animated background orbs */}
      <div className="home-orb home-orb-1"></div>
      <div className="home-orb home-orb-2"></div>
      <div className="home-orb home-orb-3"></div>

      {/* Scrollable content */}
      <div className="app-content" style={{ padding: '0', position: 'relative', zIndex: 1 }}>

        {/* Top Bar */}
        <div style={{
          padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="home-logo-ring">
              <Shield size={20} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.02em' }}>SmishGuard</span>
          </div>
          <div className="badge badge-safe" style={{ fontSize: '0.65rem' }}>v1.0 Beta</div>
        </div>

        {/* Hero Section */}
        <div style={{
          padding: '32px 24px 24px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ marginBottom: '8px' }}>
            <span className="badge" style={{
              background: 'rgba(14, 165, 233, 0.1)',
              border: '1px solid rgba(14, 165, 233, 0.3)',
              color: 'var(--accent-cyan)', fontSize: '0.7rem'
            }}>
              <Zap size={12} /> AI-Powered Protection
            </span>
          </div>

          <h1 style={{
            fontSize: '2rem', fontWeight: 800, lineHeight: 1.15,
            letterSpacing: '-0.04em', marginBottom: '16px'
          }}>
            <span>Stop </span>
            <span style={{
              background: 'linear-gradient(135deg, var(--malicious-red), #f97316)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>Smishing</span>
            <br />
            <span>Before It </span>
            <span style={{
              background: 'linear-gradient(135deg, var(--primary-blue), var(--accent-cyan))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>Starts</span>
          </h1>

          <p className="text-sm text-muted" style={{ lineHeight: 1.6, maxWidth: '320px' }}>
            Our AI engine and VirusTotal integration analyze every suspicious link in your texts — instantly.
          </p>
        </div>

        {/* Live Stats Strip */}
        <div style={{
          padding: '0 24px', marginBottom: '28px',
          opacity: statsVisible ? 1 : 0,
          transform: statsVisible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
        }}>
          <div className="home-stats-row">
            <div className="home-stat-item">
              <span className="home-stat-number">14.2K</span>
              <span className="text-xs text-muted">Threats Blocked</span>
            </div>
            <div className="home-stat-divider"></div>
            <div className="home-stat-item">
              <span className="home-stat-number">89</span>
              <span className="text-xs text-muted">Security Vendors</span>
            </div>
            <div className="home-stat-divider"></div>
            <div className="home-stat-item">
              <span className="home-stat-number">98%</span>
              <span className="text-xs text-muted">AI Accuracy</span>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              icon: <Cpu size={20} />,
              title: 'AI Analysis',
              desc: 'On-device phishing detection using trained neural networks.',
              color: 'var(--primary-blue)',
              bg: 'rgba(14, 165, 233, 0.08)',
              delay: 0
            },
            {
              icon: <Search size={20} />,
              title: 'VirusTotal Integration',
              desc: '89 security vendors scan every URL for known threats.',
              color: 'var(--accent-cyan)',
              bg: 'rgba(34, 211, 238, 0.08)',
              delay: 100
            },
            {
              icon: <MessageSquare size={20} />,
              title: 'Real-Time SMS Scanning',
              desc: 'Intercept and analyze text messages as they arrive.',
              color: 'var(--safe-green)',
              bg: 'rgba(16, 185, 129, 0.08)',
              delay: 200
            }
          ].map((feature, i) => (
            <div key={i} className="home-feature-card" style={{
              animationDelay: `${0.7 + feature.delay / 1000}s`
            }}>
              <div className="home-feature-icon" style={{
                background: feature.bg, color: feature.color,
                border: `1px solid ${feature.color}33`
              }}>
                {feature.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="font-semibold" style={{ fontSize: '0.9rem', marginBottom: '2px' }}>{feature.title}</h3>
                <p className="text-xs text-muted" style={{ lineHeight: 1.4 }}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Threat Preview Ticker */}
        <div style={{ padding: '24px 24px 0', overflow: 'hidden' }}>
          <p className="text-xs text-muted font-semibold" style={{
            textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px'
          }}>
            Recent Threats Detected
          </p>
          <div className="home-threat-ticker">
            <div className="home-threat-ticker-inner">
              {[
                'usps-tracking-portal.com',
                'secure-bank-login.net',
                'netflix-billing-update.com',
                'amaz0n-security.com',
                'paypal-auth-secure.net',
                'apple-id-recovery.info',
                'irs-tax-refund.org'
              ].map((domain, i) => (
                <span key={i} className="home-threat-chip">
                  <AlertTriangle size={10} /> {domain}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ padding: '28px 24px 32px' }}>
          <button className="btn-primary home-cta-btn" onClick={onEnter}>
            <span>Open Messages</span>
            <ArrowRight size={20} />
          </button>
          <p className="text-xs text-muted" style={{ textAlign: 'center', marginTop: '12px' }}>
            2 unread messages need your attention
          </p>
        </div>

      </div>
    </div>
  );
}
