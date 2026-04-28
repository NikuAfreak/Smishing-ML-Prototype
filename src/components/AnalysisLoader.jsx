import { useEffect, useState } from 'react';
import { Activity, Shield, Cpu, CheckCircle } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Extracting destination URL...', icon: Activity },
  { id: 2, label: 'Running Local ML Analysis...', icon: Cpu },
  { id: 3, label: 'Querying VirusTotal API...', icon: Shield },
  { id: 4, label: 'Generating Security Report...', icon: CheckCircle }
];

export function AnalysisLoader({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Simulate loading sequence
    const intervals = [1200, 2500, 2000, 1000];
    
    let timeoutId;
    const runStep = (stepIndex) => {
      if (stepIndex >= STEPS.length) {
        onComplete();
        return;
      }
      
      setCurrentStep(stepIndex);
      timeoutId = setTimeout(() => {
        runStep(stepIndex + 1);
      }, intervals[stepIndex]);
    };

    runStep(0);

    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <div className="animate-fade-in" style={{ 
      display: 'flex', flexDirection: 'column', height: '100%', 
      alignItems: 'center', justifyContent: 'center', padding: '24px' 
    }}>
      
      {/* Radar / Scanning Animation Centerpiece */}
      <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '48px' }}>
        <div style={{
          position: 'absolute', inset: 0,
          border: '2px solid var(--primary-blue)',
          borderRadius: '50%',
          opacity: 0.2
        }}></div>
        <div style={{
          position: 'absolute', inset: '10px',
          border: '2px dashed var(--accent-cyan)',
          borderRadius: '50%',
          animation: 'spin 8s linear infinite'
        }}></div>
        <div style={{
          position: 'absolute', inset: '25px',
          backgroundColor: 'var(--primary-blue-glow)',
          borderRadius: '50%',
          animation: 'pulse-glow 2s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--primary-blue)'
        }}>
          <Shield size={40} />
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '300px' }}>
        <h2 className="font-semibold" style={{ textAlign: 'center', marginBottom: '32px', fontSize: '1.25rem' }}>
          Analyzing Link
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div key={step.id} style={{ 
                display: 'flex', alignItems: 'center', gap: '16px',
                opacity: isPending ? 0.3 : 1,
                transition: 'all 0.4s ease'
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: isCompleted ? 'rgba(16, 185, 129, 0.2)' : isActive ? 'var(--primary-blue-glow)' : 'transparent',
                  border: `1px solid ${isCompleted ? 'var(--safe-green)' : isActive ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                  color: isCompleted ? 'var(--safe-green)' : isActive ? 'var(--primary-blue)' : 'var(--text-muted)'
                }}>
                  {isCompleted ? <CheckCircle size={16} /> : <Icon size={16} className={isActive ? 'animate-pulse' : ''} />}
                </div>
                <span className={`text-sm ${isActive ? 'font-semibold' : ''}`} style={{ 
                  color: isActive ? 'var(--text-main)' : 'var(--text-muted)'
                }}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
