import { ArrowLeft, AlertTriangle, ShieldCheck, ExternalLink, RefreshCw } from 'lucide-react';

export function AnalysisResult({ message, onDone }) {
  // Mock logic: if message ID is 1 or 2, it's malicious.
  const isMalicious = message?.id === 1 || message?.id === 2;
  
  const extractUrl = (text) => {
    const match = text.match(/(https?:\/\/[^\s]+)/);
    return match ? match[0] : 'Unknown URL';
  };
  const url = message ? extractUrl(message.text) : '';

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="app-header">
        <button className="icon-btn" onClick={onDone}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="header-title" style={{ fontSize: '1rem' }}>Scan Results</h1>
        <div style={{ width: '36px' }}></div> {/* Spacer */}
      </div>

      <div className="app-content" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Status Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
          <div style={{ 
            width: '80px', height: '80px', 
            borderRadius: '50%', 
            background: isMalicious ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            border: `2px solid ${isMalicious ? 'var(--malicious-red)' : 'var(--safe-green)'}`,
            boxShadow: `0 0 30px ${isMalicious ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: isMalicious ? 'var(--malicious-red)' : 'var(--safe-green)'
          }}>
            {isMalicious ? <AlertTriangle size={40} /> : <ShieldCheck size={40} />}
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px',
              color: isMalicious ? 'var(--malicious-red)' : 'var(--safe-green)' 
            }}>
              {isMalicious ? 'Malicious Link' : 'Safe Link'}
            </h2>
            <p className="text-sm text-muted">Analysis complete. Action recommended below.</p>
          </div>
        </div>

        {/* Target URL */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span className="text-xs text-muted font-semibold uppercase tracking-wider">Target URL</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', wordBreak: 'break-all' }}>
            <span style={{ color: 'var(--text-main)', fontSize: '0.875rem' }}>{url}</span>
          </div>
        </div>

        {/* ML Analysis Engine */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
              ? 'Our model detected patterns consistent with credential harvesting and deceptive domain formatting.'
              : 'Our model did not detect any known phishing patterns or malicious intent.'}
          </p>
        </div>

        {/* VirusTotal API integration */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="text-sm font-semibold">VirusTotal Consensus</span>
            <span className={isMalicious ? 'badge badge-malicious' : 'badge badge-safe'}>
              {isMalicious ? '14 / 89 Flagged' : '0 / 89 Flagged'}
            </span>
          </div>
          <p className="text-xs text-muted" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ExternalLink size={14} /> 
            {isMalicious ? '14 security vendors flagged this URL as malicious or phishing.' : 'No security vendors flagged this URL.'}
          </p>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
          <button 
            className="btn-primary" 
            style={{ 
              background: isMalicious ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-panel)',
              border: `1px solid ${isMalicious ? 'var(--malicious-red)' : 'var(--border-color)'}`,
              color: isMalicious ? 'var(--malicious-red)' : 'var(--text-main)',
              boxShadow: 'none'
            }}
            onClick={onDone}
          >
            {isMalicious ? 'Delete Message' : 'Return to Inbox'}
          </button>
        </div>

      </div>
    </div>
  );
}
