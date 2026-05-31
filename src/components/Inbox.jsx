import { MessageSquare, MoreVertical, Search, Plus, AlertTriangle, RotateCcw, ShieldCheck, HelpCircle } from 'lucide-react';

export function Inbox({ messages, onSelect, onAddRandom, onRestore, scannedResults }) {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="app-header">
        <h1 className="header-title">Messages</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="icon-btn" onClick={onRestore} title="Restore all messages">
            <RotateCcw size={20} />
          </button>
          <button className="icon-btn"><Search size={20} /></button>
          <button className="icon-btn"><MoreVertical size={20} /></button>
        </div>
      </div>
      
      <div className="app-content" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg) => {
            const scanResult = scannedResults[msg.id];
            const isFlaggedMalicious = scanResult === 'malicious';
            const isFlaggedSafe = scanResult === 'safe';
            const isFlaggedSuspicious = scanResult === 'suspicious';
            const hasBeenScanned = !!scanResult;

            const getBorderLeft = () => {
              if (isFlaggedMalicious) return '3px solid var(--malicious-red)';
              if (isFlaggedSafe) return '3px solid var(--safe-green)';
              if (isFlaggedSuspicious) return '3px solid var(--warning-orange)';
              if (msg.unread) return '3px solid var(--primary-blue)';
              return '1px solid var(--border-color)';
            };

            return (
              <div 
                key={msg.id} 
                className="glass-panel"
                onClick={() => onSelect(msg)}
                style={{ 
                  cursor: 'pointer', 
                  transition: 'all 0.2s',
                  borderLeft: getBorderLeft(),
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: isFlaggedMalicious ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-panel-hover)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                {/* Unread dot */}
                {msg.unread && !hasBeenScanned && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-blue)',
                    boxShadow: '0 0 10px var(--primary-blue-glow)'
                  }} />
                )}

                {/* Scan result tags */}
                {isFlaggedMalicious && (
                  <div className="inbox-malicious-tag">
                    <AlertTriangle size={10} />
                    <span>MALICIOUS</span>
                  </div>
                )}
                {isFlaggedSafe && (
                  <div className="inbox-safe-tag">
                    <ShieldCheck size={10} />
                    <span>SAFE</span>
                  </div>
                )}
                {isFlaggedSuspicious && (
                  <div className="inbox-suspicious-tag">
                    <HelpCircle size={10} />
                    <span>SUSPICIOUS</span>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    background: isFlaggedMalicious
                      ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))'
                      : 'linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(34, 211, 238, 0.1))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isFlaggedMalicious ? 'var(--malicious-red)' : 'var(--primary-blue)'
                  }}>
                    {isFlaggedMalicious ? <AlertTriangle size={20} /> : <MessageSquare size={20} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 className="font-semibold" style={{ 
                        color: isFlaggedMalicious 
                          ? 'var(--malicious-red)' 
                          : msg.unread ? 'var(--text-main)' : 'var(--text-muted)' 
                      }}>
                        {msg.sender}
                      </h3>
                      <span className="text-xs text-muted">{msg.time}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted" style={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  paddingLeft: '52px',
                  textDecoration: isFlaggedMalicious ? 'line-through' : 'none',
                }}>
                  {msg.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={onAddRandom}
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: '0 4px 14px var(--primary-blue-glow)',
          border: 'none',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        title="Simulate new message"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
