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
      className={`relative bg-card rounded-xl border-2 transition-all duration-300 ${
        isPopular
          ? 'border-accent shadow-lg scale-105'
          : 'border-border hover:border-accent/50 hover:shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-semibold shadow-md">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="mb-8">
          <div className="flex items-baseline">
            <span className="text-5xl font-bold text-foreground">{price}</span>
            <span className="text-muted-foreground ml-2">/{period}</span>
          </div>
        </div>

        <button onClick={onCtaClick} className={getCtaClasses()}>
          {ctaText}
        </button>

        <div className="mt-8 space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {feature.included ? (
                  <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success" />
                ) : (
                  <Icon
                    name="XCircleIcon"
                    size={20}
                    variant="solid"
                    className="text-muted-foreground opacity-40"
                  />
                )}
              </div>
              <span
                className={`text-sm ${
                  feature.included ? 'text-foreground' : 'text-muted-foreground line-through'
                }`}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
