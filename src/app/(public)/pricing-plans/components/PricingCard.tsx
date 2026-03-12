'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  period: string;
  features: PricingFeature[];
  isPopular?: boolean;
  ctaText: string;
  ctaVariant: 'primary' | 'secondary' | 'accent';
  onCtaClick: () => void;
}

export default function PricingCard({
  name,
  description,
  price,
  period,
  features,
  isPopular = false,
  ctaText,
  ctaVariant,
  onCtaClick,
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getCtaClasses = () => {
    const baseClasses =
      'w-full px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md';

    switch (ctaVariant) {
      case 'primary':
        return `${baseClasses} bg-primary text-primary-foreground hover:bg-primary/90`;
      case 'secondary':
        return `${baseClasses} bg-secondary text-secondary-foreground hover:bg-secondary/90`;
      case 'accent':
        return `${baseClasses} bg-cta text-cta-foreground hover:bg-cta/90`;
      default:
        return baseClasses;
    }
  };

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 backdrop-blur-xl h-full flex flex-col ${
        isPopular
          ? 'border-[#0EA5E9]/50 shadow-2xl shadow-[#0EA5E9]/20 ring-1 ring-[#0EA5E9]/20'
          : 'border-white/10 hover:border-[#0EA5E9]/30 hover:shadow-lg hover:shadow-[#0EA5E9]/10'
      }`}
      style={{
        background: isPopular
          ? 'linear-gradient(135deg, rgba(27,54,93,0.55) 0%, rgba(11,18,32,0.85) 100%)'
          : 'rgba(27,54,93,0.2)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPopular && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0EA5E9]/10 to-transparent pointer-events-none rounded-2xl" />
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10 whitespace-nowrap">
            <span className="bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg shadow-[#0EA5E9]/30">
              Most Popular
            </span>
          </div>
        </>
      )}

      <div className={`relative p-8 flex flex-col flex-1 ${isPopular ? 'pt-10' : ''}`}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="text-sm text-white/60">{description}</p>
        </div>

        <div className="mb-8">
          <div className="flex items-baseline gap-2">
            <span className={`text-5xl font-bold ${isPopular ? 'text-[#0EA5E9]' : 'text-white'}`}>
              {price}
            </span>
            <span className="text-white/50">/{period}</span>
          </div>
        </div>

        <button
          onClick={onCtaClick}
          className={`w-full px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
            isPopular
              ? 'bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white shadow-lg shadow-[#0EA5E9]/25 hover:shadow-[#0EA5E9]/40'
              : 'border-2 border-white/20 text-white hover:bg-white/5 hover:border-[#0EA5E9]/40'
          }`}
        >
          {ctaText}
        </button>

        <div className="mt-8 space-y-3.5 flex-1">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {feature.included ? (
                  <Icon name="CheckCircleIcon" size={18} variant="solid" className="text-green-400" />
                ) : (
                  <Icon name="XCircleIcon" size={18} variant="solid" className="text-white/20" />
                )}
              </div>
              <span className={`text-sm ${feature.included ? 'text-white/80' : 'text-white/30 line-through'}`}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
