'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    starter: boolean | string;
    professional: boolean | string;
    enterprise: boolean | string;
  }[];
}

export default function ComparisonTable() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['Core Features'])
  );

  const comparisonData: ComparisonFeature[] = [
    {
      category: 'Core Features',
      features: [
        { name: 'API Access', starter: 'Basic', professional: 'Advanced', enterprise: 'Unlimited' },
        { name: 'Data Storage', starter: '100 GB', professional: '1 TB', enterprise: 'Custom' },
        { name: 'Bandwidth', starter: '500 GB/mo', professional: '5 TB/mo', enterprise: 'Unlimited' },
        { name: 'Active Users', starter: '10', professional: '100', enterprise: 'Unlimited' },
        { name: 'Uptime SLA', starter: '99.5%', professional: '99.9%', enterprise: '99.99%' },
      ],
    },
    {
      category: 'Security & Compliance',
      features: [
        { name: 'SSL/TLS Encryption', starter: true, professional: true, enterprise: true },
        { name: 'Two-Factor Authentication', starter: true, professional: true, enterprise: true },
        { name: 'SOC 2 Type II Compliance', starter: false, professional: true, enterprise: true },
        { name: 'GDPR Compliance', starter: false, professional: true, enterprise: true },
        { name: 'Custom Security Policies', starter: false, professional: false, enterprise: true },
        { name: 'Dedicated Security Team', starter: false, professional: false, enterprise: true },
      ],
    },
    {
      category: 'Support & Services',
      features: [
        { name: 'Email Support', starter: 'Business Hours', professional: '24/7', enterprise: '24/7 Priority' },
        { name: 'Response Time', starter: '48 hours', professional: '4 hours', enterprise: '1 hour' },
        { name: 'Dedicated Account Manager', starter: false, professional: false, enterprise: true },
        { name: 'Onboarding Assistance', starter: 'Self-Service', professional: 'Guided', enterprise: 'White-Glove' },
        { name: 'Training Sessions', starter: false, professional: 'Quarterly', enterprise: 'Monthly' },
      ],
    },
    {
      category: 'Advanced Features',
      features: [
        { name: 'Custom Integrations', starter: false, professional: '5', enterprise: 'Unlimited' },
        { name: 'Advanced Analytics', starter: false, professional: true, enterprise: true },
        { name: 'Multi-Region Deployment', starter: false, professional: false, enterprise: true },
        { name: 'Custom Branding', starter: false, professional: 'Limited', enterprise: 'Full' },
        { name: 'API Rate Limits', starter: '1,000/hour', professional: '10,000/hour', enterprise: 'Custom' },
      ],
    },
  ];

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Icon name="CheckCircleIcon" size={22} variant="solid" className="text-green-400 mx-auto" />
      ) : (
        <Icon name="XCircleIcon" size={22} variant="solid" className="text-white/20 mx-auto" />
      );
    }
    return <span className="text-sm font-medium text-white/80">{value}</span>;
  };

  return (
    <div className="backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#1B365D]/30 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white min-w-[220px] lg:min-w-[260px]">
                Features
              </th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-white/70 min-w-[130px]">
                Starter
              </th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-[#0EA5E9] min-w-[130px] bg-[#0EA5E9]/5">
                Professional
              </th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-white/70 min-w-[130px]">
                Enterprise
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((category, categoryIndex) => (
              <React.Fragment key={category.category}>
                {/* Category header row */}
                <tr
                  className="border-b border-white/10 bg-[#1B365D]/10 cursor-pointer hover:bg-[#0EA5E9]/5 transition-colors duration-200"
                  onClick={() => toggleCategory(category.category)}
                >
                  <td colSpan={4} className="px-6 py-3.5 text-sm font-semibold text-white/90">
                    <div className="flex items-center justify-between">
                      <span>{category.category}</span>
                      <Icon
                        name="ChevronDownIcon"
                        size={18}
                        className={`text-white/50 transition-transform duration-300 ${
                          expandedCategories.has(category.category) ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </td>
                </tr>
                {/* Feature rows */}
                {expandedCategories.has(category.category) &&
                  category.features.map((feature, featureIndex) => (
                    <tr
                      key={`${categoryIndex}-${featureIndex}`}
                      className="border-b border-white/5 hover:bg-[#0EA5E9]/5 transition-colors duration-200"
                    >
                      <td className="px-6 py-3.5 text-sm text-white/70">{feature.name}</td>
                      <td className="px-4 py-3.5 text-center">
                        {renderFeatureValue(feature.starter)}
                      </td>
                      <td className="px-4 py-3.5 text-center bg-[#0EA5E9]/5">
                        {renderFeatureValue(feature.professional)}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {renderFeatureValue(feature.enterprise)}
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
