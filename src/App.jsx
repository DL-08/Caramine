import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CarmineDashboard from './components/dashboard/CarmineDashboard';
import Features from './components/Features';
import Philosophy from './components/Philosophy';
import Protocol from './components/Protocol';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ExpenseModal from './components/ExpenseModal';

export default function App() {
  const [trackerOpen, setTrackerOpen] = useState(false);

  const scrollToDashboard = () => {
    const el = document.getElementById('dashboard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-offwhite text-dark selection:bg-signal selection:text-white">
      {/* Floating Island Navigation */}
      <Navbar 
        onOpenTracker={() => setTrackerOpen(true)} 
        onOpenDashboard={scrollToDashboard} 
      />

      <main>
        {/* The Opening Shot */}
        <Hero 
          onOpenTracker={scrollToDashboard} 
        />

        {/* Live Carmine Cockpit & Functionality Dashboard */}
        <CarmineDashboard isEmbedded={true} />

        {/* Interactive Functional Artifacts */}
        <Features />

        {/* The Manifesto */}
        <Philosophy />

        {/* Sticky Stacking Archive */}
        <Protocol />

        {/* Membership / Pricing */}
        <Pricing onOpenTracker={scrollToDashboard} />
      </main>

      {/* Deep Footer with Operational Status */}
      <Footer onOpenTracker={scrollToDashboard} />

      {/* Interactive Expense Tracker Benchmark Modal */}
      <ExpenseModal
        isOpen={trackerOpen}
        onClose={() => setTrackerOpen(false)}
      />
    </div>
  );
}
