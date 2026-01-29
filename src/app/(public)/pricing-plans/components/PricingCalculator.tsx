'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CalculatorMetric {
  id: string;
  label: string;
  unit: string;
  baseValue: number;
  step: number;
  min: number;
  max: number;
  pricePerUnit: number;
}

export default function PricingCalculator() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [metrics, setMetrics] = useState<Record<string, number>>({
    users: 10,
    storage: 100,
    bandwidth: 500,
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const calculatorMetrics: CalculatorMetric[] = [
    {
      id: 'users',
      label: 'Active Users',
      unit: 'users',
      baseValue: 10,
      step: 5,
      min: 1,
      max: 1000,
      pricePerUnit: 5,
    },
    {
      id: 'storage',
      label: 'Storage',
      unit: 'GB',
      baseValue: 100,
      step: 50,
      min: 10,
      max: 10000,
      pricePerUnit: 0.1,
    },
    {
      id: 'bandwidth',
      label: 'Bandwidth',
      unit: 'GB/month',
      baseValue: 500,
      step: 100,
      min: 100,
      max: 50000,
      pricePerUnit: 0.05,
    },
  ];

  const calculateTotal = () => {
    if (!isHydrated) return 0;

    return calculatorMetrics.reduce((total, metric) => {
      const value = metrics[metric.id] || metric.baseValue;
      return total + value * metric.pricePerUnit;
    }, 0);
  };

  const handleMetricChange = (id: string, value: number) => {
    setMetrics((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleIncrement = (metric: CalculatorMetric) => {
    const currentValue = metrics[metric.id] || metric.baseValue;
    const newValue = Math.min(currentValue + metric.step, metric.max);
    handleMetricChange(metric.id, newValue);
  };

  const handleDecrement = (metric: CalculatorMetric) => {
    const currentValue = metrics[metric.id] || metric.baseValue;
    const newValue = Math.max(currentValue - metric.step, metric.min);
    handleMetricChange(metric.id, newValue);
  };

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-xl border border-border p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-8 shadow-md">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">Usage Calculator</h3>
        <p className="text-sm text-muted-foreground">
          Estimate your monthly costs based on your expected usage
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {calculatorMetrics.map((metric) => {
          const currentValue = metrics[metric.id] || metric.baseValue;

          return (
            <div key={metric.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">{metric.label}</label>
                <span className="text-sm font-semibold text-primary">
                  {currentValue} {metric.unit}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleDecrement(metric)}
                  disabled={currentValue <= metric.min}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                  aria-label={`Decrease ${metric.label}`}
                >
                  <Icon name="MinusIcon" size={20} />
                </button>

                <input
                  type="range"
                  min={metric.min}
                  max={metric.max}
                  step={metric.step}
                  value={currentValue}
                  onChange={(e) => handleMetricChange(metric.id, parseInt(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
                />

                <button
                  onClick={() => handleIncrement(metric)}
                  disabled={currentValue >= metric.max}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                  aria-label={`Increase ${metric.label}`}
                >
                  <Icon name="PlusIcon" size={20} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {metric.min} {metric.unit}
                </span>
                <span>
                  {metric.max} {metric.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-foreground">Estimated Monthly Cost</span>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-accent">${calculateTotal().toFixed(2)}</span>
            <span className="text-muted-foreground ml-2">/month</span>
          </div>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          {calculatorMetrics.map((metric) => {
            const currentValue = metrics[metric.id] || metric.baseValue;
            const cost = currentValue * metric.pricePerUnit;

            return (
              <div key={metric.id} className="flex items-center justify-between">
                <span>
                  {metric.label}: {currentValue} {metric.unit}
                </span>
                <span className="font-medium">${cost.toFixed(2)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="w-full px-6 py-3 bg-cta text-cta-foreground rounded-lg font-medium text-sm hover:bg-cta/90 transition-all duration-300 shadow-sm hover:shadow-md">
          Get Custom Quote
        </button>
      </div>
    </div>
  );
}
