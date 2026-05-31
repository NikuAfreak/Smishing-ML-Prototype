import { useState, useRef } from 'react';
import './App.css';
import { BarChart3, Home, MessageSquare } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { Inbox } from './components/Inbox';
import { MessageDetail } from './components/MessageDetail';
import { AnalyticsPage } from './components/AnalyticsPage';

// Generate a large mock dataset
const generateMockData = () => {
  const baseMessages = [
    { id: 1, sender: '+1 (555) 019-8372', text: 'URGENT: Your package delivery has been suspended. Please confirm your details here to resume delivery: https://usps-tracking-portal-info.com/update', time: 'Just now', unread: true, isPhishing: true },
    { id: 2, sender: 'Bank Alert', text: 'Your account has been locked due to suspicious activity. Verify your identity immediately at https://secure-bank-login-update.net', time: '10:42 AM', unread: true, isPhishing: true },
    { id: 3, sender: 'Mom', text: 'Hey honey, are you coming over for dinner tonight?', time: 'Yesterday', unread: false, isPhishing: false },
    { id: 4, sender: 'Google Security', text: 'New sign-in from Chrome on Windows. If this was you, you can ignore this. Learn more at https://myaccount.google.com/notifications', time: 'Yesterday', unread: false, isPhishing: false },
    { id: 5, sender: 'Netflix', text: 'Your payment was declined. Please update your billing info to continue watching: https://netflix-billing-update-center.com', time: 'Tuesday', unread: false, isPhishing: true },
    { id: 6, sender: 'DHL Express', text: 'Your shipment is on hold. Track your package status here: https://dhl-tracking-info.com/status', time: 'Monday', unread: true, isPhishing: 'suspicious' },
    { id: 7, sender: 'IT Department', text: 'Please review the updated security policy at https://company-portal-security.net/policy', time: 'Last Week', unread: false, isPhishing: 'suspicious' },
  ];

  const fakeSenders = ['Alice', 'Bob', 'Charlie', 'Delivery Services', 'Amazon Alerts', 'PayPal Info', 'Uber', 'Lyft', 'IRS Notice', 'Apple Support'];
  const fakeSafeLinks = ['https://google.com', 'https://wikipedia.org', 'https://amazon.com', 'https://apple.com', 'https://paypal.com'];
  const fakePhishLinks = ['https://amaz0n-security-update.com', 'https://paypal-auth-secure.net', 'https://apple-id-recovery-link.info', 'https://irs-tax-refund-portal.org'];
  const fakeSuspiciousLinks = ['https://promo-deals-store.com', 'https://survey-rewards-claim.net', 'https://cloud-document-share.info'];

  const extra = Array.from({ length: 18 }).map((_, i) => {
    const rand = Math.random();
    const hasLink = Math.random() > 0.3;
    let threatLevel;
    if (!hasLink) {
      threatLevel = false;
    } else if (rand < 0.4) {
      threatLevel = true;
    } else if (rand < 0.6) {
      threatLevel = 'suspicious';
    } else {
      threatLevel = false;
    }

    const isSuspicious = threatLevel === 'suspicious';
    const isPhish = threatLevel === true;
    let text = isPhish ? 'Action required on your account. ' : isSuspicious ? 'You have a pending notification. ' : 'Hey, just checking in about our meeting. ';
    
    if (hasLink) {
      if (isPhish) text += `Click here: ${fakePhishLinks[Math.floor(Math.random() * fakePhishLinks.length)]}`;
      else if (isSuspicious) text += `Review here: ${fakeSuspiciousLinks[Math.floor(Math.random() * fakeSuspiciousLinks.length)]}`;
      else text += `Check out this link: ${fakeSafeLinks[Math.floor(Math.random() * fakeSafeLinks.length)]}`;
    }

    return {
      id: 10 + i,
      sender: fakeSenders[Math.floor(Math.random() * fakeSenders.length)],
      text,
      time: `Oct ${20 - i}`,
      unread: false,
      isPhishing: threatLevel
    };
  });

  return [...baseMessages, ...extra];
};

const INITIAL_MESSAGES = generateMockData();

function App() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [activeTab, setActiveTab] = useState('home');
  const [subView, setSubView] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  // Track which messages have been scanned: { [msgId]: 'malicious' | 'safe' | 'suspicious' }
  const [scannedResults, setScannedResults] = useState({});
  // Keep a snapshot for restore
  const initialMessagesRef = useRef(INITIAL_MESSAGES);

  const generateRandomMessage = () => {
    const rand = Math.random();
    let isPhishing, sender, text;
    if (rand < 0.35) {
      isPhishing = true;
      sender = 'Alert Center';
      text = `Unusual login attempt. Secure your account immediately: https://secure-login-attempt-${Math.floor(Math.random()*1000)}.com`;
    } else if (rand < 0.55) {
      isPhishing = 'suspicious';
      sender = 'Unknown Sender';
      text = `You have a pending reward. Claim it before it expires: https://reward-claim-portal-${Math.floor(Math.random()*1000)}.net`;
    } else {
      isPhishing = false;
      sender = 'Alice';
      text = `Hey, are we still on for lunch tomorrow? Let me know!`;
    }
    const newMsg = {
      id: Date.now(),
      sender,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: true,
      isPhishing
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    initialMessagesRef.current = updated;
  };

  const markScanned = (msgId, result) => {
    setScannedResults(prev => ({ ...prev, [msgId]: result }));
  };

  const deleteMessage = (msgId) => {
    setMessages(prev => prev.filter(m => m.id !== msgId));
    setSubView(null);
  };

  const blockSender = (msg) => {
    // Remove all messages from this sender
    setMessages(prev => prev.filter(m => m.sender !== msg.sender));
    setSubView(null);
  };

  const restoreMessages = () => {
    setMessages(initialMessagesRef.current);
    setScannedResults({});
  };

  const openMessage = (msg) => {
    // Mark as read
    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, unread: false } : m));
    setSelectedMessage(msg);
    setSubView('detail');
  };

  const backToInbox = () => {
    setSubView(null);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setSubView(null);
  };

  const unreadCount = messages.filter(m => m.unread).length;
  const showTabBar = subView !== 'detail';

  const renderContent = () => {
    if (subView === 'detail') {
      return (
        <MessageDetail 
          message={selectedMessage} 
          onBack={backToInbox}
          onMarkScanned={markScanned}
          onDelete={deleteMessage}
          onBlock={blockSender}
          scannedResult={selectedMessage ? scannedResults[selectedMessage.id] : null}
        />
      );
    }

    switch (activeTab) {
      case 'analytics':
        return <AnalyticsPage />;
      case 'home':
        return <HomePage onEnter={() => switchTab('messages')} />;
      case 'messages':
        return (
          <Inbox 
            messages={messages} 
            onSelect={openMessage} 
            onAddRandom={generateRandomMessage}
            onRestore={restoreMessages}
            scannedResults={scannedResults}
          />
        );
      default:
        return <HomePage onEnter={() => switchTab('messages')} />;
    }
  };

  return (
    <div className="app-container">
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {renderContent()}
      </div>

      {showTabBar && (
        <nav className="tab-bar">
          <button
            className={`tab-bar-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => switchTab('analytics')}
          >
            <span className="tab-bar-icon"><BarChart3 size={22} /></span>
            <span className="tab-bar-label">Analytics</span>
          </button>

          <button
            className={`tab-bar-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => switchTab('home')}
          >
            <span className="tab-bar-icon"><Home size={22} /></span>
            <span className="tab-bar-label">Home</span>
          </button>

          <button
            className={`tab-bar-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => switchTab('messages')}
          >
            <span className="tab-bar-icon">
              <MessageSquare size={22} />
              {unreadCount > 0 && <span className="tab-bar-badge">{unreadCount}</span>}
            </span>
            <span className="tab-bar-label">Messages</span>
          </button>
        </nav>
      )}
    </div>
  );
}

export default App;
