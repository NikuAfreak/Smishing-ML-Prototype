import { useState, useEffect } from 'react';
import { ArrowLeft, ShieldAlert, User, Loader2, AlertTriangle, ShieldCheck, ChevronDown } from 'lucide-react';

export function MessageDetail({ message, onBack }) {
  const [scanState, setScanState] = useState('idle'); // 'idle', 'scanning', 'warning', 'results'
  const [showResults, setShowResults] = useState(false);

  // Reset state when a new message is opened
  useEffect(() => {
    setScanState('idle');
    setShowResults(false);
  }, [message]);

  if (!message) return null;

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = message.text.split(urlRegex);
  const hasUrl = urlRegex.test(message.text);
  const isMalicious = message.isPhishing === true;
  
  const handleScan = () => {
    setScanState('scanning');
    // Simulate scan delay
    setTimeout(() => {
      setScanState('warning');
    }, 2500);
  };

  const url = extractUrl(message.text);

  function extractUrl(text) {
    const match = text.match(/(https?:\/\/[^\s]+)/);
    return match ? match[0] : 'Unknown URL';
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="app-header">
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="header-title" style={{ fontSize: '1rem' }}>{message.sender}</h1>
        <div style={{ width: '36px' }}></div>
      </div>

      <div className="app-content" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Contact Info Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ 
            width: '64px', height: '64px', 
            borderRadius: '50%', 
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--primary-blue)'
          }}>
            <User size={32} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 className="font-semibold">{message.sender}</h2>
            <p className="text-xs text-muted">Text Message • {message.time}</p>
          </div>
        </div>

        {/* Message Bubble + Inline Spinner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', alignSelf: 'flex-start', maxWidth: '100%' }}>
          <div className="glass-panel" style={{ 
            background: 'rgba(14, 165, 233, 0.05)', 
            border: '1px solid var(--border-highlight)',
            borderBottomLeftRadius: '4px',
            maxWidth: '90%'
          }}>
            <p style={{ lineHeight: '1.5' }}>
              {parts.map((part, i) => {
                if (part.match(urlRegex)) {
                  return (
                    <span key={i} style={{ 
                      color: 'var(--accent-cyan)', 
                      textDecoration: 'underline',
                      wordBreak: 'break-all'
                    }}>
                      {part}
                    </span>
                  );
                }
                return <span key={i}>{part}</span>;
              })}
            </p>
          </div>
          
          {/* Inline Loading Spinner */}
          {scanState === 'scanning' && (
            <div style={{ color: 'var(--primary-blue)' }}>
              <Loader2 className="animate-spin" size={24} style={{ animation: 'spin 1s linear infinite' }} />
            </div>
          )}
        </div>

        {/* Action / Warning Area */}
        {hasUrl && scanState === 'idle' && (
          <div className="animate-fade-in" style={{ marginTop: 'auto', paddingTop: '16px' }}>
            <div className="glass-panel" style={{ 
              background: 'rgba(7, 11, 25, 0.8)',
              border: '1px solid var(--primary-blue)',
              boxShadow: '0 0 20px rgba(14, 165, 233, 0.1)',
              display: 'flex', flexDirection: 'column', gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <ShieldAlert className="text-warning-orange" style={{ color: 'var(--warning-orange)', flexShrink: 0 }} size={24} />
                <div>
                  <h3 className="font-semibold" style={{ marginBottom: '4px' }}>Suspicious Link Detected</h3>
                  <p className="text-xs text-muted">We recommend scanning it before clicking.</p>
                </div>
              </div>
              <button className="btn-primary" onClick={handleScan}>
                Scan Link Security
              </button>
            </div>
          </div>
        )}

        {/* Warning Banner */}
        {(scanState === 'warning' || scanState === 'results') && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            <button 
              onClick={() => {
                setScanState('results');
                setShowResults(!showResults);
              }}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: isMalicious ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                border: `1px solid ${isMalicious ? 'var(--malicious-red)' : 'var(--safe-green)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer',
                color: 'var(--text-main)',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {isMalicious ? (
                  <AlertTriangle size={24} style={{ color: 'var(--malicious-red)' }} />
                ) : (
                  <ShieldCheck size={24} style={{ color: 'var(--safe-green)' }} />
                )}
                <div style={{ textAlign: 'left' }}>
                  <h3 className="font-semibold" style={{ color: isMalicious ? 'var(--malicious-red)' : 'var(--safe-green)' }}>
                    {isMalicious ? 'Malicious Link Detected' : 'Link Appears Safe'}
                  </h3>
                  <p className="text-xs text-muted">Click to view full security report</p>
                </div>
              </div>
              <ChevronDown size={20} style={{ 
                color: 'var(--text-muted)', 
                transform: showResults ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s'
              }} />
            </button>

            {/* Expandable Results */}
            {showResults && (
              <div className="animate-fade-in glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                
                {/* Target URL */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span className="text-xs text-muted font-semibold uppercase tracking-wider">Target URL</span>
                  <span style={{ fontSize: '0.875rem', wordBreak: 'break-all' }}>{url}</span>
                </div>

                {/* ML Analysis Engine */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="text-sm font-semibold">Local ML Engine</span>
                    <span className={isMalicious ? 'badge badge-malicious' : 'badge badge-safe'}>
                      {isMalicious ? '98.4% Phishing' : '1.2% Risk'}
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--bg-dark)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: isMalicious ? '98.4%' : '1.2%', 
                      height: '100%', 
                      background: isMalicious ? 'var(--malicious-red)' : 'var(--safe-green)' 
                    }}></div>
                  </div>
                  <p className="text-xs text-muted">
                    {isMalicious 
                      ? 'Detected patterns consistent with credential harvesting.'
                      : 'No malicious patterns detected.'}
                  </p>
                </div>

                {/* VirusTotal API integration */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="text-sm font-semibold">VirusTotal Consensus</span>
                    <span className={isMalicious ? 'badge badge-malicious' : 'badge badge-safe'}>
                      {isMalicious ? '14 / 89 Flagged' : '0 / 89 Flagged'}
                    </span>
                  </div>
                  <p className="text-xs text-muted">
                    {isMalicious ? '14 security vendors flagged this URL.' : 'No security vendors flagged this URL.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
