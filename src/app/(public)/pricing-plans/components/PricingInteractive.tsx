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
    <div className="space-y-16">
      {/* Billing Toggle */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-4 bg-muted/50 rounded-lg p-1.5">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
              billingCycle === 'monthly'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
              billingCycle === 'annual'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Annual
          </button>
        </div>
        {billingCycle === 'annual' && (
          <div className="flex items-center space-x-2 text-sm">
            <span className="px-3 py-1 bg-success/10 text-success rounded-full font-medium">
              Save {calculateSavings()}%
            </span>
            <span className="text-muted-foreground">with annual billing</span>
          </div>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          className="px-6 py-3 bg-muted text-foreground rounded-lg font-medium text-sm hover:bg-muted/80 transition-all duration-300 shadow-sm hover:shadow-md inline-flex items-center space-x-2"
        >
          <span>{showCalculator ? 'Hide' : 'Show'} Usage Calculator</span>
        </button>
      </div>

      {/* Pricing Calculator */}
      {showCalculator && (
        <div className="animate-slide-in-from-top">
          <PricingCalculator />
        </div>
      )}

      {/* Comparison Table */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-3">Detailed Feature Comparison</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare all features across our plans to find the perfect fit for your team
          </p>
        </div>
        <ComparisonTable />
      </div>

      {/* Regional Pricing */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-3">Global Pricing & Compliance</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing with regional tax information and compliance details
          </p>
        </div>
        <RegionalPricing />
      </div>

      {/* FAQ Section */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-3">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
