'use client';

import { useState } from 'react';
import PricingCard from './PricingCard';
import PricingCalculator from './PricingCalculator';
import ComparisonTable from './ComparisonTable';
import FAQSection from './FAQSection';
import RegionalPricing from './RegionalPricing';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: Array<{
    text: string;
    included: boolean;
  }>;
  isPopular: boolean;
  ctaText: string;
  ctaVariant: 'primary' | 'secondary' | 'accent';
}

export default function PricingInteractive() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [showCalculator, setShowCalculator] = useState(false);

  const pricingPlans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small teams getting started with global infrastructure',
      monthlyPrice: 29,
      annualPrice: 23,
      features: [
        { text: 'Up to 10 active users', included: true },
        { text: '100 GB storage', included: true },
        { text: '500 GB bandwidth per month', included: true },
        { text: 'Basic API access', included: true },
        { text: 'Email support (business hours)', included: true },
        { text: '99.5% uptime SLA', included: true },
        { text: 'SSL/TLS encryption', included: true },
        { text: 'Two-factor authentication', included: true },
        { text: 'Advanced analytics', included: false },
        { text: 'SOC 2 compliance', included: false },
        { text: 'Priority support', included: false },
        { text: 'Custom integrations', included: false },
      ],
      isPopular: false,
      ctaText: 'Start Free Trial',
      ctaVariant: 'secondary',
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Advanced features for growing teams with global reach',
      monthlyPrice: 99,
      annualPrice: 79,
      features: [
        { text: 'Up to 100 active users', included: true },
        { text: '1 TB storage', included: true },
        { text: '5 TB bandwidth per month', included: true },
        { text: 'Advanced API access', included: true },
        { text: '24/7 email support', included: true },
        { text: '99.9% uptime SLA', included: true },
        { text: 'SSL/TLS encryption', included: true },
        { text: 'Two-factor authentication', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'SOC 2 Type II compliance', included: true },
        { text: 'GDPR compliance', included: true },
        { text: 'Up to 5 custom integrations', included: true },
        { text: 'Quarterly training sessions', included: true },
        { text: 'Dedicated account manager', included: false },
        { text: 'Custom security policies', included: false },
      ],
      isPopular: true,
      ctaText: 'Start Free Trial',
      ctaVariant: 'accent',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Unlimited scale and premium support for global organizations',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        { text: 'Unlimited active users', included: true },
        { text: 'Custom storage allocation', included: true },
        { text: 'Unlimited bandwidth', included: true },
        { text: 'Unlimited API access', included: true },
        { text: '24/7 priority support (1-hour response)', included: true },
        { text: '99.99% uptime SLA', included: true },
        { text: 'SSL/TLS encryption', included: true },
        { text: 'Two-factor authentication', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'SOC 2 Type II compliance', included: true },
        { text: 'GDPR compliance', included: true },
        { text: 'Unlimited custom integrations', included: true },
        { text: 'Monthly training sessions', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Custom security policies', included: true },
        { text: 'Multi-region deployment', included: true },
        { text: 'White-glove onboarding', included: true },
        { text: 'Direct engineering access', included: true },
      ],
      isPopular: false,
      ctaText: 'Contact Sales',
      ctaVariant: 'primary',
    },
  ];

  const handleCtaClick = (planId: string) => {
    if (planId === 'enterprise') {
      console.log('Redirecting to enterprise contact form...');
    } else {
      console.log(`Starting free trial for ${planId} plan...`);
    }
  };

  const getDisplayPrice = (plan: PricingPlan): string => {
    if (plan.id === 'enterprise') {
      return 'Custom';
    }
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
    return `$${price}`;
  };

  const calculateSavings = (): number => {
    if (billingCycle === 'annual') {
      return 20;
    }
    return 0;
  };

  return (
    <div className="space-y-20">
      {/* Billing Toggle */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 bg-[#1B365D]/30 rounded-full p-1.5 border border-white/10">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              billingCycle === 'monthly'
                ? 'bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white shadow-lg shadow-[#0EA5E9]/20'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              billingCycle === 'annual'
                ? 'bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white shadow-lg shadow-[#0EA5E9]/20'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Annual
          </button>
        </div>
        {billingCycle === 'annual' && (
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full font-medium">
              Save {calculateSavings()}%
            </span>
            <span className="text-white/50">with annual billing</span>
          </div>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            name={plan.name}
            description={plan.description}
            price={getDisplayPrice(plan)}
            period={plan.id === 'enterprise' ? 'pricing' : 'month'}
            features={plan.features}
            isPopular={plan.isPopular}
            ctaText={plan.ctaText}
            ctaVariant={plan.ctaVariant}
            onCtaClick={() => handleCtaClick(plan.id)}
          />
        ))}
      </div>

      {/* Calculator Toggle */}
      <div className="text-center">
        <button
          onClick={() => setShowCalculator(!showCalculator)}
          className="px-6 py-3 rounded-full text-sm font-medium border border-white/20 text-white/70 hover:text-white hover:border-[#0EA5E9]/40 hover:bg-white/5 transition-all duration-300"
        >
          {showCalculator ? 'Hide' : 'Show'} Usage Calculator
        </button>
      </div>

      {showCalculator && (
        <div>
          <PricingCalculator />
        </div>
      )}

      {/* Comparison Table */}
      <div>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Detailed Feature Comparison</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Compare all features across our plans to find the perfect fit for your team
          </p>
        </div>
        <ComparisonTable />
      </div>

      {/* Regional Pricing */}
      <div>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Global Pricing &amp; Compliance</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Transparent pricing with regional tax information and compliance details
          </p>
        </div>
        <RegionalPricing />
      </div>

      {/* FAQ Section */}
      <div>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Frequently Asked Questions</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Find answers to common questions about our pricing and plans
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <FAQSection />
        </div>
      </div>
    </div>
  );
}
