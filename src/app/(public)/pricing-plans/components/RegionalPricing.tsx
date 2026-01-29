'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface RegionalInfo {
  region: string;
  currency: string;
  symbol: string;
  taxRate: number;
  taxName: string;
  complianceNotes: string[];
}

export default function RegionalPricing() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('us');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const regionalData: Record<string, RegionalInfo> = {
    us: {
      region: 'United States',
      currency: 'USD',
      symbol: '$',
      taxRate: 0,
      taxName: 'Sales Tax',
      complianceNotes: [
        'Prices shown exclude applicable state and local sales tax',
        'Tax rates vary by location and will be calculated at checkout',
        'SOC 2 Type II certified for US operations',
      ],
    },
    eu: {
      region: 'European Union',
      currency: 'EUR',
      symbol: '€',
      taxRate: 20,
      taxName: 'VAT',
      complianceNotes: [
        'Prices shown exclude VAT (typically 20%)',
        'GDPR compliant with data residency in EU regions',
        'VAT rates vary by member state',
        'Reverse charge mechanism available for B2B transactions',
      ],
    },
    uk: {
      region: 'United Kingdom',
      currency: 'GBP',
      symbol: '£',
      taxRate: 20,
      taxName: 'VAT',
      complianceNotes: [
        'Prices shown exclude 20% VAT',
        'UK GDPR and Data Protection Act 2018 compliant',
        'ICO registered data controller',
      ],
    },
    in: {
      region: 'India',
      currency: 'INR',
      symbol: '₹',
      taxRate: 18,
      taxName: 'GST',
      complianceNotes: [
        'Prices shown exclude 18% GST',
        'GSTIN provided on all invoices',
        'Compliant with IT Act 2000 and DPDP Act 2023',
        'Data localization options available',
      ],
    },
    ae: {
      region: 'United Arab Emirates',
      currency: 'AED',
      symbol: 'د.إ',
      taxRate: 5,
      taxName: 'VAT',
      complianceNotes: [
        'Prices shown exclude 5% VAT',
        'TRN provided on all invoices',
        'Compliant with UAE data protection regulations',
      ],
    },
  };

  const conversionRates: Record<string, number> = {
    us: 1,
    eu: 0.92,
    uk: 0.79,
    in: 83.5,
    ae: 3.67,
  };

  const calculatePrice = (basePrice: number, region: string): string => {
    if (!isHydrated) return basePrice.toString();

    const rate = conversionRates[region] || 1;
    const converted = basePrice * rate;
    const symbol = regionalData[region]?.symbol || '$';

    return `${symbol}${converted.toFixed(2)}`;
  };

  const calculateWithTax = (basePrice: number, region: string): string => {
    if (!isHydrated) return basePrice.toString();

    const rate = conversionRates[region] || 1;
    const converted = basePrice * rate;
    const taxRate = regionalData[region]?.taxRate || 0;
    const withTax = converted * (1 + taxRate / 100);
    const symbol = regionalData[region]?.symbol || '$';

    return `${symbol}${withTax.toFixed(2)}`;
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-xl border border-border p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-12 bg-muted rounded"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentRegion = regionalData[selectedRegion];

  return (
    <div className="bg-card rounded-xl border border-border p-8 shadow-md">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Regional Pricing & Tax Information
        </h3>
        <p className="text-sm text-muted-foreground">
          Select your region to view localized pricing and compliance details
        </p>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-foreground mb-3">Select Your Region</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(regionalData).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setSelectedRegion(key)}
              className={`px-4 py-3 rounded-lg border-2 text-left transition-all duration-300 ${
                selectedRegion === key
                  ? 'border-accent bg-accent/10 shadow-sm'
                  : 'border-border hover:border-accent/50 hover:bg-muted/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-foreground">{data.region}</div>
                  <div className="text-xs text-muted-foreground mt-1">{data.currency}</div>
                </div>
                {selectedRegion === key && (
                  <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-accent" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">
          Example Pricing for {currentRegion.region}
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="text-sm text-muted-foreground">Professional Plan (Base)</span>
            <span className="text-lg font-bold text-foreground">
              {calculatePrice(99, selectedRegion)}/month
            </span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="text-sm text-muted-foreground">
              {currentRegion.taxName} ({currentRegion.taxRate}%)
            </span>
            <span className="text-lg font-semibold text-foreground">
              {calculatePrice(99 * (currentRegion.taxRate / 100), selectedRegion)}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-base font-semibold text-foreground">
              Total (incl. {currentRegion.taxName})
            </span>
            <span className="text-2xl font-bold text-accent">
              {calculateWithTax(99, selectedRegion)}/month
            </span>
          </div>
        </div>
      </div>

      <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
        <div className="flex items-start space-x-3 mb-4">
          <Icon
            name="InformationCircleIcon"
            size={24}
            variant="solid"
            className="text-accent flex-shrink-0 mt-0.5"
          />
          <div>
            <h5 className="text-sm font-semibold text-foreground mb-2">Compliance & Tax Notes</h5>
            <ul className="space-y-2">
              {currentRegion.complianceNotes.map((note, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start">
                  <span className="mr-2">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground mb-4">
          Need help with international billing or have questions about compliance?
        </p>
        <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md">
          Contact Sales Team
        </button>
      </div>
    </div>
  );
}
