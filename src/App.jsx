import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ExpenseModal from './components/ExpenseModal';
import CarmineDashboard from './components/dashboard/CarmineDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  const [trackerOpen, setTrackerOpen] = useState(false);

  // Dashboard page
  if (currentView === 'dashboard') {
    return (
      <CarmineDashboard onBackToLanding={() => setCurrentView('landing')} />
    );
  }

  // Landing page
  return (
    <div className="relative min-h-screen bg-offwhite text-dark selection:bg-signal selection:text-white">
      <Navbar
        onOpenTracker={() => setTrackerOpen(true)}
        onOpenDashboard={() => setCurrentView('dashboard')}
      />

      <main>
        <Hero onOpenTracker={() => setCurrentView('dashboard')} />
        <Features />
        <Philosophy />
        <Protocol />
        <Pricing onOpenTracker={() => setCurrentView('dashboard')} />
      </main>

      <Footer onOpenTracker={() => setCurrentView('dashboard')} />

      <ExpenseModal
        isOpen={trackerOpen}
        onClose={() => setTrackerOpen(false)}
      />
    </div>
  );
}
