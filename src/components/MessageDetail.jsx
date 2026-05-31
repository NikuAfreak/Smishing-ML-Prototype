import { useState, useEffect } from 'react';
import { ArrowLeft, ShieldAlert, User, Loader2, AlertTriangle, ShieldCheck, ChevronDown, HelpCircle, ThumbsUp, ThumbsDown, Trash2, Ban } from 'lucide-react';

export function MessageDetail({ message, onBack, onMarkScanned, onDelete, onBlock, scannedResult }) {
  const [scanState, setScanState] = useState('idle'); // 'idle', 'scanning', 'warning', 'results'
  const [showResults, setShowResults] = useState(false);
  const [userDecision, setUserDecision] = useState(null); // null, 'safe', 'malicious'

  // Reset state when a new message is opened — restore if already scanned, or auto-scan
  useEffect(() => {
    setUserDecision(null);
    setShowResults(false);

    if (scannedResult) {
      setScanState('warning');
      return;
    }

    // Check if message has a URL to auto-scan
    const msgHasUrl = message && /(https?:\/\/[^\s]+)/.test(message.text);
    if (msgHasUrl) {
      setScanState('scanning');
    } else {
      setScanState('idle');
    }
  }, [message, scannedResult]);

  // Run the simulated scan after entering 'scanning' state
  useEffect(() => {
    if (scanState !== 'scanning' || !message) return;
    const timer = setTimeout(() => {
      setScanState('warning');
      // Determine status inline since getStatus depends on render-time values
      let result;
      if (message.isPhishing === true) result = 'malicious';
      else if (message.isPhishing === 'suspicious') result = 'suspicious';
      else result = 'safe';
      onMarkScanned(message.id, result);
    }, 2500);
    return () => clearTimeout(timer);
  }, [scanState, message, onMarkScanned]);

  if (!message) return null;

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = message.text.split(urlRegex);
  const hasUrl = urlRegex.test(message.text);
  
  const isMalicious = message.isPhishing === true;
  const isSuspicious = message.isPhishing === 'suspicious';
  const isSafe = message.isPhishing === false;

  const resolvedMalicious = userDecision === 'malicious';
  const resolvedSafe = userDecision === 'safe';

  const getStatus = () => {
    if (isSuspicious && userDecision) {
      return userDecision === 'malicious' ? 'malicious' : 'safe';
    }
    if (isSuspicious) return 'suspicious';
    if (isMalicious) return 'malicious';
    return 'safe';
  };
  const status = getStatus();
  
  const handleScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('warning');
      // Report the scan result up to App
      onMarkScanned(message.id, status);
    }, 2500);
  };

  // When user decides on suspicious, also report up
  const handleUserDecision = (decision) => {
    setUserDecision(decision);
    onMarkScanned(message.id, decision);
  };

  const url = extractUrl(message.text);

  function extractUrl(text) {
    const match = text.match(/(https?:\/\/[^\s]+)/);
    return match ? match[0] : 'Unknown URL';
  }

  const statusConfig = {
    malicious: {
      bg: 'rgba(239, 68, 68, 0.15)',
      border: 'var(--malicious-red)',
      color: 'var(--malicious-red)',
      icon: <AlertTriangle size={24} style={{ color: 'var(--malicious-red)' }} />,
      title: 'Malicious Link Detected',
      badgeClass: 'badge badge-malicious',
      aiScore: '98.4% Phishing',
      aiBarWidth: '98.4%',
      aiBarColor: 'var(--malicious-red)',
      aiDesc: 'Detected patterns consistent with credential harvesting.',
      vtScore: '14 / 89 Flagged',
      vtDesc: '14 security vendors flagged this URL.',
    },
    safe: {
      bg: 'rgba(16, 185, 129, 0.15)',
      border: 'var(--safe-green)',
      color: 'var(--safe-green)',
      icon: <ShieldCheck size={24} style={{ color: 'var(--safe-green)' }} />,
      title: 'Link Appears Safe',
      badgeClass: 'badge badge-safe',
      aiScore: '1.2% Risk',
      aiBarWidth: '1.2%',
      aiBarColor: 'var(--safe-green)',
      aiDesc: 'No malicious patterns detected.',
      vtScore: '0 / 89 Flagged',
      vtDesc: 'No security vendors flagged this URL.',
    },
    suspicious: {
      bg: 'rgba(245, 158, 11, 0.15)',
      border: 'var(--warning-orange)',
      color: 'var(--warning-orange)',
      icon: <HelpCircle size={24} style={{ color: 'var(--warning-orange)' }} />,
      title: 'Inconclusive — Your Input Needed',
      badgeClass: 'badge badge-suspicious',
      aiScore: '52.1% Uncertain',
      aiBarWidth: '52.1%',
      aiBarColor: 'var(--warning-orange)',
      aiDesc: 'The AI could not confidently classify this link. Some patterns are ambiguous.',
      vtScore: '3 / 89 Flagged',
      vtDesc: '3 security vendors flagged this URL, which is below the definitive threshold.',
    },
  };

  const cfg = statusConfig[status];

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

        {/* Scanning indicator text */}
        {scanState === 'scanning' && (
          <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0' }}>
            <ShieldAlert style={{ color: 'var(--warning-orange)', flexShrink: 0 }} size={18} />
            <p className="text-xs text-muted">Scanning link for threats…</p>
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
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer',
                color: 'var(--text-main)',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {cfg.icon}
                <div style={{ textAlign: 'left' }}>
                  <h3 className="font-semibold" style={{ color: cfg.color }}>
                    {cfg.title}
                  </h3>
                  <p className="text-xs text-muted">
                    {status === 'suspicious' && !userDecision
                      ? 'Tap to review and provide your judgment'
                      : 'Click to view full security report'}
                  </p>
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

                {/* AI Analysis Engine */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="text-sm font-semibold">AI Analysis</span>
                    <span className={cfg.badgeClass}>
                      {cfg.aiScore}
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--bg-dark)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: cfg.aiBarWidth, 
                      height: '100%', 
                      background: cfg.aiBarColor 
                    }}></div>
                  </div>
                  <p className="text-xs text-muted">{cfg.aiDesc}</p>
                </div>

                {/* VirusTotal API integration */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="text-sm font-semibold">VirusTotal Consensus</span>
                    <span className={cfg.badgeClass}>
                      {cfg.vtScore}
                    </span>
                  </div>
                  <p className="text-xs text-muted">{cfg.vtDesc}</p>
                </div>

                {/* User Decision Buttons for Suspicious */}
                {status === 'suspicious' && !userDecision && (
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    <p className="text-sm font-semibold" style={{ marginBottom: '4px' }}>What do you think?</p>
                    <p className="text-xs text-muted" style={{ marginBottom: '14px' }}>
                      Our AI couldn't reach a confident verdict. Please help us by classifying this link.
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        className="suspicious-action-btn suspicious-action-safe"
                        onClick={() => handleUserDecision('safe')}
                      >
                        <ThumbsUp size={16} />
                        <span>Mark as Safe</span>
                      </button>
                      <button 
                        className="suspicious-action-btn suspicious-action-malicious"
                        onClick={() => handleUserDecision('malicious')}
                      >
                        <ThumbsDown size={16} />
                        <span>Mark as Malicious</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* User Decision Confirmation */}
                {status !== 'suspicious' && isSuspicious && userDecision && (
                  <div style={{ 
                    borderTop: '1px solid var(--border-color)', paddingTop: '12px',
                    display: 'flex', alignItems: 'center', gap: '8px'
                  }}>
                    {resolvedSafe ? <ShieldCheck size={16} style={{ color: 'var(--safe-green)' }} /> : <AlertTriangle size={16} style={{ color: 'var(--malicious-red)' }} />}
                    <p className="text-xs" style={{ color: resolvedSafe ? 'var(--safe-green)' : 'var(--malicious-red)' }}>
                      You classified this link as <strong>{userDecision}</strong>. Thank you for your input.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Delete / Block actions for malicious */}
            {(status === 'malicious') && (
              <div className="animate-fade-in" style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <button 
                  className="detail-action-btn detail-action-delete"
                  onClick={() => onDelete(message.id)}
                >
                  <Trash2 size={16} />
                  <span>Delete Message</span>
                </button>
                <button 
                  className="detail-action-btn detail-action-block"
                  onClick={() => onBlock(message)}
                >
                  <Ban size={16} />
                  <span>Block Sender</span>
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
