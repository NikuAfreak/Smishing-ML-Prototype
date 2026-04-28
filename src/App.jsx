import { useState } from 'react';
import './App.css';
import { Inbox } from './components/Inbox';
import { MessageDetail } from './components/MessageDetail';

// Generate a large mock dataset
const generateMockData = () => {
  const baseMessages = [
    { id: 1, sender: '+1 (555) 019-8372', text: 'URGENT: Your package delivery has been suspended. Please confirm your details here to resume delivery: https://usps-tracking-portal-info.com/update', time: 'Just now', unread: true, isPhishing: true },
    { id: 2, sender: 'Bank Alert', text: 'Your account has been locked due to suspicious activity. Verify your identity immediately at https://secure-bank-login-update.net', time: '10:42 AM', unread: true, isPhishing: true },
    { id: 3, sender: 'Mom', text: 'Hey honey, are you coming over for dinner tonight?', time: 'Yesterday', unread: false, isPhishing: false },
    { id: 4, sender: 'Google Security', text: 'New sign-in from Chrome on Windows. If this was you, you can ignore this. Learn more at https://myaccount.google.com/notifications', time: 'Yesterday', unread: false, isPhishing: false },
    { id: 5, sender: 'Netflix', text: 'Your payment was declined. Please update your billing info to continue watching: https://netflix-billing-update-center.com', time: 'Tuesday', unread: false, isPhishing: true },
  ];

  const fakeSenders = ['Alice', 'Bob', 'Charlie', 'Delivery Services', 'Amazon Alerts', 'PayPal Info', 'Uber', 'Lyft', 'IRS Notice', 'Apple Support'];
  const fakeSafeLinks = ['https://google.com', 'https://wikipedia.org', 'https://amazon.com', 'https://apple.com', 'https://paypal.com'];
  const fakePhishLinks = ['https://amaz0n-security-update.com', 'https://paypal-auth-secure.net', 'https://apple-id-recovery-link.info', 'https://irs-tax-refund-portal.org'];

  const extra = Array.from({ length: 18 }).map((_, i) => {
    const isPhish = Math.random() > 0.5;
    const hasLink = Math.random() > 0.3;
    let text = isPhish ? 'Action required on your account. ' : 'Hey, just checking in about our meeting. ';
    
    if (hasLink) {
      if (isPhish) text += `Click here: ${fakePhishLinks[Math.floor(Math.random() * fakePhishLinks.length)]}`;
      else text += `Check out this link: ${fakeSafeLinks[Math.floor(Math.random() * fakeSafeLinks.length)]}`;
    }

    return {
      id: 10 + i,
      sender: fakeSenders[Math.floor(Math.random() * fakeSenders.length)],
      text,
      time: `Oct ${20 - i}`,
      unread: false,
      isPhishing: isPhish && hasLink
    };
  });

  return [...baseMessages, ...extra];
};

const INITIAL_MESSAGES = generateMockData();

function App() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [currentView, setCurrentView] = useState('inbox'); // 'inbox', 'detail'
  const [selectedMessage, setSelectedMessage] = useState(null);

  const generateRandomMessage = () => {
    const isPhishing = Math.random() > 0.5;
    const newMsg = {
      id: Date.now(),
      sender: isPhishing ? 'Alert Center' : 'Alice',
      text: isPhishing 
        ? `Unusual login attempt. Secure your account immediately: https://secure-login-attempt-${Math.floor(Math.random()*1000)}.com`
        : `Hey, are we still on for lunch tomorrow? Let me know!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: true,
      isPhishing: isPhishing
    };
    setMessages([newMsg, ...messages]);
  };

  const navigateTo = (view, data = null) => {
    if (data) setSelectedMessage(data);
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'inbox':
        return <Inbox messages={messages} onSelect={(msg) => navigateTo('detail', msg)} onAddRandom={generateRandomMessage} />;
      case 'detail':
        return <MessageDetail message={selectedMessage} onBack={() => navigateTo('inbox')} />;
      default:
        return <Inbox messages={messages} onSelect={(msg) => navigateTo('detail', msg)} onAddRandom={generateRandomMessage} />;
    }
  };

  return (
    <div className="app-container">
      {renderView()}
    </div>
  );
}

export default App;
