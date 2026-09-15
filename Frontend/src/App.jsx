import React, { useState } from 'react';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import DashboardPage from './pages/DashboardPage';
import SectionReviewPage from './pages/SectionReviewPage';
import { sampleBusinessPlans } from './data/sampleAudits';
import { ThemeProvider } from './context/ThemeContext';

function PlanLensApp() {
  // Initially show the Sign In page as requested
  const [currentScreen, setCurrentScreen] = useState('signin');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [activePlanId, setActivePlanId] = useState('campusbite');
  const [selectedPillarId, setSelectedPillarId] = useState('market-analysis');
  const [plans, setPlans] = useState(sampleBusinessPlans);

  const activePlan = plans[activePlanId] || plans['campusbite'];
  const activePillar = activePlan.pillars.find(p => p.id === selectedPillarId) || activePlan.pillars[2]; // Market Analysis default

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called upon successful sign in -> directly shows the main dashboard!
  const handleSignInSuccess = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    setCurrentScreen('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentScreen('signin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSample = (sampleKey) => {
    setActivePlanId(sampleKey);
  };

  const handleStartAudit = (fileName) => {
    if (fileName && fileName !== activePlan.fileName) {
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
      {/* Initial Sign In Page */}
      {currentScreen === 'signin' && (
        <SignInPage 
          onSignInSuccess={handleSignInSuccess}
          onNavigateToHome={() => handleNavigate('home')}
        />
      )}

      {/* Landing Page */}
      {currentScreen === 'home' && (
        <HomePage 
          onNavigate={handleNavigate}
          onSelectSample={handleSelectSample}
          isAuthenticated={isAuthenticated}
          onSignOut={handleSignOut}
        />
      )}

      {/* Upload & Analyze Studio */}
      {currentScreen === 'upload' && (
        <UploadPage 
          onNavigate={handleNavigate}
          onStartAudit={handleStartAudit}
          activePlan={activePlan}
          currentUser={currentUser}
          onSignOut={handleSignOut}
        />
      )}

      {/* Main Analysis Dashboard */}
      {currentScreen === 'dashboard' && (
        <DashboardPage 
          plan={activePlan}
          onNavigate={handleNavigate}
          onSelectPillar={handleSelectPillar}
          currentUser={currentUser}
          onSignOut={handleSignOut}
        />
      )}

      {/* Detailed Section Review */}
      {currentScreen === 'section-review' && (
        <SectionReviewPage 
          pillar={activePillar}
          plan={activePlan}
          onNavigate={handleNavigate}
          onSelectPillar={handleSelectPillar}
          onToggleRemediation={handleToggleRemediation}
          onMarkReviewed={handleMarkReviewed}
          currentUser={currentUser}
          onSignOut={handleSignOut}
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
