import { useState } from 'react';
import './App.css';
import { Inbox } from './components/Inbox';
import { MessageDetail } from './components/MessageDetail';
import { AnalysisLoader } from './components/AnalysisLoader';
import { AnalysisResult } from './components/AnalysisResult';

// Mock Data
const MOCK_MESSAGES = [
  {
    id: 1,
    sender: '+1 (555) 019-8372',
    text: 'URGENT: Your package delivery has been suspended. Please confirm your details here to resume delivery: https://usps-tracking-portal-info.com/update',
    time: 'Just now',
    unread: true,
  },
  {
    id: 2,
    sender: 'Bank Alert',
    text: 'Your account has been locked due to suspicious activity. Verify your identity immediately at https://secure-bank-login-update.net',
    time: '10:42 AM',
    unread: true,
  },
  {
    id: 3,
    sender: 'Mom',
    text: 'Hey honey, are you coming over for dinner tonight?',
    time: 'Yesterday',
    unread: false,
  }
];

function App() {
  const [currentView, setCurrentView] = useState('inbox'); // 'inbox', 'detail', 'loading', 'result'
  const [selectedMessage, setSelectedMessage] = useState(null);

  const navigateTo = (view, data = null) => {
    if (data) setSelectedMessage(data);
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'inbox':
        return <Inbox messages={MOCK_MESSAGES} onSelect={(msg) => navigateTo('detail', msg)} />;
      case 'detail':
        return <MessageDetail message={selectedMessage} onBack={() => navigateTo('inbox')} onScan={() => navigateTo('loading')} />;
      case 'loading':
        return <AnalysisLoader onComplete={() => navigateTo('result')} />;
      case 'result':
        return <AnalysisResult message={selectedMessage} onDone={() => navigateTo('inbox')} />;
      default:
        return <Inbox messages={MOCK_MESSAGES} onSelect={(msg) => navigateTo('detail', msg)} />;
    }
  };

  return (
    <div className="app-container">
      {renderView()}
    </div>
  );
}

export default App;
