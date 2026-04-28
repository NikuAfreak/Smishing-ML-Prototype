import { MessageSquare, MoreVertical, Search } from 'lucide-react';

export function Inbox({ messages, onSelect }) {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="app-header">
        <h1 className="header-title">Messages</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="icon-btn"><Search size={20} /></button>
          <button className="icon-btn"><MoreVertical size={20} /></button>
        </div>
      </div>
      
      <div className="app-content" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className="glass-panel"
              onClick={() => onSelect(msg)}
              style={{ 
                cursor: 'pointer', 
                transition: 'all 0.2s',
                borderLeft: msg.unread ? '3px solid var(--primary-blue)' : '1px solid var(--border-color)',
                position: 'relative',
                overflow: 'hidden'
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
              {msg.unread && (
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(34, 211, 238, 0.1))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-blue)'
                }}>
                  <MessageSquare size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className="font-semibold" style={{ color: msg.unread ? 'var(--text-main)' : 'var(--text-muted)' }}>
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
                paddingLeft: '52px'
              }}>
                {msg.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
