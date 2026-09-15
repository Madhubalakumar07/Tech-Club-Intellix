import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import DashboardPage from './pages/DashboardPage';
import SectionReviewPage from './pages/SectionReviewPage';
import { sampleBusinessPlans } from './data/sampleAudits';
import { ThemeProvider } from './context/ThemeContext';

function PlanLensApp() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [activePlanId, setActivePlanId] = useState('campusbite');
  const [selectedPillarId, setSelectedPillarId] = useState('market-analysis');
  const [plans, setPlans] = useState(sampleBusinessPlans);

  const activePlan = plans[activePlanId] || plans['campusbite'];
  const activePillar = activePlan.pillars.find(p => p.id === selectedPillarId) || activePlan.pillars[2]; // Market Analysis default

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSample = (sampleKey) => {
    setActivePlanId(sampleKey);
  };

  const handleStartAudit = (fileName) => {
    if (fileName && fileName !== activePlan.fileName) {
      // Create dynamically updated active plan
      setPlans(prev => ({
        ...prev,
        [activePlanId]: {
          ...prev[activePlanId],
          fileName: fileName,
          sessionName: `${fileName.replace(/\.[^/.]+$/, "")} • Business Plan Review`
        }
      }));
    }
  };

  const handleSelectPillar = (pillarId) => {
    setSelectedPillarId(pillarId);
    setCurrentScreen('section-review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Live checklist remediation toggle
  const handleToggleRemediation = (pillarId, remediationId) => {
    setPlans(prev => {
      const current = prev[activePlanId];
      const updatedPillars = current.pillars.map(p => {
        if (p.id === pillarId) {
          const updatedRemediations = p.remediations.map(r => {
            if (r.id === remediationId) {
              return { ...r, done: !r.done };
            }
            return r;
          });
          const completedCount = updatedRemediations.filter(r => r.done).length;
          const totalCount = updatedRemediations.length;
          // Calculate score adjustment
          const baseScore = p.id === 'market-analysis' ? 51 : p.id === 'financial-plan' ? 42 : p.id === 'marketing-sales' ? 48 : p.score;
          const newScore = Math.min(100, baseScore + Math.round((completedCount / totalCount) * 20));

          return {
            ...p,
            remediations: updatedRemediations,
            score: newScore,
            status: newScore >= 80 ? 'Strong' : newScore >= 65 ? 'Good' : newScore >= 50 ? 'Needs Imp.' : 'Weak'
          };
        }
        return p;
      });

      // Recalculate aggregate score
      const newAggregate = Math.round(
        updatedPillars.reduce((acc, curr) => acc + curr.score, 0) / updatedPillars.length
      );

      return {
        ...prev,
        [activePlanId]: {
          ...current,
          pillars: updatedPillars,
          aggregateScore: newAggregate,
          evaluationVerdict: newAggregate >= 75 ? 'Series A Ready' : 'Needs Improvement'
        }
      };
    });
  };

  const handleMarkReviewed = (pillarId, isReviewed) => {
    if (isReviewed) {
      handleToggleRemediation(pillarId, 'auto-reviewed');
    }
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'home' && (
        <HomePage 
          onNavigate={handleNavigate}
          onSelectSample={handleSelectSample}
        />
      )}

      {currentScreen === 'upload' && (
        <UploadPage 
          onNavigate={handleNavigate}
          onStartAudit={handleStartAudit}
          activePlan={activePlan}
        />
      )}

      {currentScreen === 'dashboard' && (
        <DashboardPage 
          plan={activePlan}
          onNavigate={handleNavigate}
          onSelectPillar={handleSelectPillar}
        />
      )}

      {currentScreen === 'section-review' && (
        <SectionReviewPage 
          pillar={activePillar}
          plan={activePlan}
          onNavigate={handleNavigate}
          onSelectPillar={handleSelectPillar}
          onToggleRemediation={handleToggleRemediation}
          onMarkReviewed={handleMarkReviewed}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PlanLensApp />
    </ThemeProvider>
  );
}
