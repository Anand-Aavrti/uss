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
      <div className="backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-7 bg-[#1B365D]/40 rounded w-1/3"></div>
          <div className="h-12 bg-[#1B365D]/30 rounded-xl"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-4 bg-[#1B365D]/30 rounded"></div>)}
          </div>
        </div>
      </div>
    );
  }

  const currentRegion = regionalData[selectedRegion];

  return (
    <div className="backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Regional Pricing &amp; Tax Information</h3>
        <p className="text-sm text-white/50">Select your region to view localized pricing and compliance details</p>
      </div>

      {/* Region selector */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-white/70 mb-3">Select Your Region</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(regionalData).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setSelectedRegion(key)}
              className={`px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-300 ${
                selectedRegion === key
                  ? 'border-[#0EA5E9] bg-[#0EA5E9]/10 shadow-lg shadow-[#0EA5E9]/15'
                  : 'border-white/10 bg-white/5 hover:border-[#0EA5E9]/30 hover:bg-[#0EA5E9]/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">{data.region}</div>
                  <div className="text-xs text-white/50 mt-0.5">{data.currency}</div>
                </div>
                {selectedRegion === key && (
                  <Icon name="CheckCircleIcon" size={18} variant="solid" className="text-[#0EA5E9]" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Pricing breakdown */}
      <div className="bg-[#1B365D]/30 rounded-xl p-6 mb-5 border border-white/10">
        <h4 className="text-base font-semibold text-white mb-4">
          Example Pricing for {currentRegion.region}
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-sm text-white/60">Professional Plan (Base)</span>
            <span className="text-lg font-bold text-white">
              {calculatePrice(99, selectedRegion)}/month
            </span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-sm text-white/60">
              {currentRegion.taxName} ({currentRegion.taxRate}%)
            </span>
            <span className="text-base font-semibold text-white/70">
              {calculatePrice(99 * (currentRegion.taxRate / 100), selectedRegion)}
            </span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-base font-semibold text-white">
              Total (incl. {currentRegion.taxName})
            </span>
            <span className="text-2xl font-bold text-[#0EA5E9]">
              {calculateWithTax(99, selectedRegion)}/month
            </span>
          </div>
        </div>
      </div>

      {/* Compliance notes */}
      <div className="bg-[#0EA5E9]/10 rounded-xl p-5 border border-[#0EA5E9]/20 mb-6">
        <div className="flex items-start gap-3">
          <Icon name="InformationCircleIcon" size={20} variant="solid" className="text-[#0EA5E9] flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="text-sm font-semibold text-white mb-2">Compliance &amp; Tax Notes</h5>
            <ul className="space-y-1.5">
              {currentRegion.complianceNotes.map((note, index) => (
                <li key={index} className="text-xs text-white/60 flex items-start gap-2">
                  <span className="text-[#0EA5E9] mt-0.5 flex-shrink-0">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-white/40 mb-4">
          Need help with international billing or have questions about compliance?
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white rounded-xl font-semibold shadow-lg shadow-[#0EA5E9]/25 hover:shadow-[#0EA5E9]/40 transition-all duration-300">
          Contact Sales Team
        </button>
      </div>
    </div>
  );
}
