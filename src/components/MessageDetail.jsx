import { ArrowLeft, ShieldAlert, User } from 'lucide-react';

export function MessageDetail({ message, onBack, onScan }) {
  if (!message) return null;

  // Simple URL extractor
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = message.text.split(urlRegex);
  const hasUrl = urlRegex.test(message.text);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="app-header">
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="header-title" style={{ fontSize: '1rem' }}>{message.sender}</h1>
        <div style={{ width: '36px' }}></div> {/* Spacer */}
      </div>

      <div className="app-content" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Contact Info Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
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

        {/* Message Bubble */}
        <div className="glass-panel" style={{ 
          background: 'rgba(14, 165, 233, 0.05)', 
          border: '1px solid var(--border-highlight)',
          borderBottomLeftRadius: '4px',
          alignSelf: 'flex-start',
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

        {/* Scan Action Area */}
        {hasUrl && (
          <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
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
                  <p className="text-xs text-muted">This message contains a URL. We recommend scanning it with our ML engine and VirusTotal before clicking.</p>
                </div>
              </div>
              <button className="btn-primary" onClick={onScan}>
                Scan Link Security
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
