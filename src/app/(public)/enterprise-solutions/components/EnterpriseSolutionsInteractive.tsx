'use client';

import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import TrustBadges from './TrustBadges';
import EnterpriseFeatures from './EnterpriseFeatures';
import CaseStudies from './CaseStudies';
import ComplianceMatrix from './ComplianceMatrix';
import ROICalculator from './ROICalculator';
import ProcurementPortal from './ProcurementPortal';
import ExecutiveBriefing from './ExecutiveBriefing';
import CTASection from './CTASection';

export default function EnterpriseSolutionsInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleDemoClick = () => {
    if (!isHydrated) return;
    const briefingSection = document.getElementById('executive-briefing');
    if (briefingSection) {
      briefingSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    if (!isHydrated) return;
    const procurementSection = document.getElementById('procurement-portal');
    if (procurementSection) {
      procurementSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background ">
        <div className="animate-pulse">
          <div className="h-96 bg-muted"></div>
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="space-y-8">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3]?.map((i) => (
                  <div key={i} className="h-48 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection onDemoClick={handleDemoClick} onContactClick={handleContactClick} />
      <TrustBadges />
      <EnterpriseFeatures />
      <CaseStudies />
      <ComplianceMatrix />
      <ROICalculator />
      <div id="procurement-portal">
        <ProcurementPortal />
      </div>
      <div id="executive-briefing">
        <ExecutiveBriefing />
      </div>
      <CTASection />
    </>
  );
}
