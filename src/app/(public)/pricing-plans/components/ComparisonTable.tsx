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
        {
          name: 'API Access',
          starter: 'Basic',
          professional: 'Advanced',
          enterprise: 'Unlimited',
        },
        {
          name: 'Data Storage',
          starter: '100 GB',
          professional: '1 TB',
          enterprise: 'Custom',
        },
        {
          name: 'Bandwidth',
          starter: '500 GB/mo',
          professional: '5 TB/mo',
          enterprise: 'Unlimited',
        },
        {
          name: 'Active Users',
          starter: '10',
          professional: '100',
          enterprise: 'Unlimited',
        },
        {
          name: 'Uptime SLA',
          starter: '99.5%',
          professional: '99.9%',
          enterprise: '99.99%',
        },
      ],
    },
    {
      category: 'Security & Compliance',
      features: [
        {
          name: 'SSL/TLS Encryption',
          starter: true,
          professional: true,
          enterprise: true,
        },
        {
          name: 'Two-Factor Authentication',
          starter: true,
          professional: true,
          enterprise: true,
        },
        {
          name: 'SOC 2 Type II Compliance',
          starter: false,
          professional: true,
          enterprise: true,
        },
        {
          name: 'GDPR Compliance',
          starter: false,
          professional: true,
          enterprise: true,
        },
        {
          name: 'Custom Security Policies',
          starter: false,
          professional: false,
          enterprise: true,
        },
        {
          name: 'Dedicated Security Team',
          starter: false,
          professional: false,
          enterprise: true,
        },
      ],
    },
    {
      category: 'Support & Services',
      features: [
        {
          name: 'Email Support',
          starter: 'Business Hours',
          professional: '24/7',
          enterprise: '24/7 Priority',
        },
        {
          name: 'Response Time',
          starter: '48 hours',
          professional: '4 hours',
          enterprise: '1 hour',
        },
        {
          name: 'Dedicated Account Manager',
          starter: false,
          professional: false,
          enterprise: true,
        },
        {
          name: 'Onboarding Assistance',
          starter: 'Self-Service',
          professional: 'Guided',
          enterprise: 'White-Glove',
        },
        {
          name: 'Training Sessions',
          starter: false,
          professional: 'Quarterly',
          enterprise: 'Monthly',
        },
      ],
    },
    {
      category: 'Advanced Features',
      features: [
        {
          name: 'Custom Integrations',
          starter: false,
          professional: '5',
          enterprise: 'Unlimited',
        },
        {
          name: 'Advanced Analytics',
          starter: false,
          professional: true,
          enterprise: true,
        },
        {
          name: 'Multi-Region Deployment',
          starter: false,
          professional: false,
          enterprise: true,
        },
        {
          name: 'Custom Branding',
          starter: false,
          professional: 'Limited',
          enterprise: 'Full',
        },
        {
          name: 'API Rate Limits',
          starter: '1,000/hour',
          professional: '10,000/hour',
          enterprise: 'Custom',
        },
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
        <Icon name="CheckCircleIcon" size={24} variant="solid" className="text-success mx-auto" />
      ) : (
        <Icon
          name="XCircleIcon"
          size={24}
          variant="solid"
          className="text-muted-foreground opacity-40 mx-auto"
        />
      );
    }
    return <span className="text-sm font-medium text-foreground">{value}</span>;
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground min-w-[250px]">
                Features
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-foreground min-w-[150px]">
                Starter
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-foreground min-w-[150px] bg-accent/10">
                Professional
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-foreground min-w-[150px]">
                Enterprise
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((category, categoryIndex) => (
              <React.Fragment key={category.category}>
                <tr
                  className="border-b border-border bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors duration-200"
                  onClick={() => toggleCategory(category.category)}
                >
                  <td colSpan={4} className="px-6 py-4 text-sm font-semibold text-foreground">
                    <div className="flex items-center justify-between">
                      <span>{category.category}</span>
                      <Icon
                        name="ChevronDownIcon"
                        size={20}
                        className={`transition-transform duration-300 ${
                          expandedCategories.has(category.category) ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </td>
                </tr>
                {expandedCategories.has(category.category) &&
                  category.features.map((feature, featureIndex) => (
                    <tr
                      key={`${categoryIndex}-${featureIndex}`}
                      className="border-b border-border hover:bg-muted/20 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-foreground">{feature.name}</td>
                      <td className="px-6 py-4 text-center">
                        {renderFeatureValue(feature.starter)}
                      </td>
                      <td className="px-6 py-4 text-center bg-accent/5">
                        {renderFeatureValue(feature.professional)}
                      </td>
                      <td className="px-6 py-4 text-center">
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
