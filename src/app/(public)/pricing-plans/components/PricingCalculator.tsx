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
    { id: 'users', label: 'Active Users', unit: 'users', baseValue: 10, step: 5, min: 1, max: 1000, pricePerUnit: 5 },
    { id: 'storage', label: 'Storage', unit: 'GB', baseValue: 100, step: 50, min: 10, max: 10000, pricePerUnit: 0.1 },
    { id: 'bandwidth', label: 'Bandwidth', unit: 'GB/month', baseValue: 500, step: 100, min: 100, max: 50000, pricePerUnit: 0.05 },
  ];

  const calculateTotal = () => {
    if (!isHydrated) return 0;
    return calculatorMetrics.reduce((total, metric) => {
      const value = metrics[metric.id] || metric.baseValue;
      return total + value * metric.pricePerUnit;
    }, 0);
  };

  const handleMetricChange = (id: string, value: number) => {
    setMetrics((prev) => ({ ...prev, [id]: value }));
  };

  const handleIncrement = (metric: CalculatorMetric) => {
    const currentValue = metrics[metric.id] || metric.baseValue;
    handleMetricChange(metric.id, Math.min(currentValue + metric.step, metric.max));
  };

  const handleDecrement = (metric: CalculatorMetric) => {
    const currentValue = metrics[metric.id] || metric.baseValue;
    handleMetricChange(metric.id, Math.max(currentValue - metric.step, metric.min));
  };

  if (!isHydrated) {
    return (
      <div className="backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-7 bg-[#1B365D]/40 rounded w-1/3"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-[#1B365D]/30 rounded-xl"></div>)}
          </div>
          <div className="h-28 bg-[#1B365D]/30 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Usage Calculator</h3>
        <p className="text-sm text-white/50">Estimate your monthly costs based on your expected usage</p>
      </div>

      <div className="space-y-7 mb-8">
        {calculatorMetrics.map((metric) => {
          const currentValue = metrics[metric.id] || metric.baseValue;
          const pct = ((currentValue - metric.min) / (metric.max - metric.min)) * 100;
          return (
            <div key={metric.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white/70">{metric.label}</label>
                <span className="text-sm font-semibold text-[#0EA5E9]">
                  {currentValue} {metric.unit}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDecrement(metric)}
                  disabled={currentValue <= metric.min}
                  className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl border border-white/10 bg-[#1B365D]/30 text-white/60 hover:bg-[#0EA5E9]/10 hover:border-[#0EA5E9]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label={`Decrease ${metric.label}`}
                >
                  <Icon name="MinusIcon" size={16} />
                </button>

                <input
                  type="range"
                  min={metric.min}
                  max={metric.max}
                  step={metric.step}
                  value={currentValue}
                  onChange={(e) => handleMetricChange(metric.id, parseInt(e.target.value))}
                  className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #0EA5E9 ${pct}%, rgba(27,54,93,0.5) ${pct}%)`,
                  }}
                />

                <button
                  onClick={() => handleIncrement(metric)}
                  disabled={currentValue >= metric.max}
                  className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl border border-white/10 bg-[#1B365D]/30 text-white/60 hover:bg-[#0EA5E9]/10 hover:border-[#0EA5E9]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label={`Increase ${metric.label}`}
                >
                  <Icon name="PlusIcon" size={16} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-white/30">
                <span>{metric.min} {metric.unit}</span>
                <span>{metric.max} {metric.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cost summary */}
      <div className="bg-gradient-to-br from-[#0EA5E9]/15 to-[#1B365D]/30 rounded-xl p-6 border border-[#0EA5E9]/20">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-white/70">Estimated Monthly Cost</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-bold text-[#0EA5E9]">${calculateTotal().toFixed(2)}</span>
            <span className="text-white/40 text-sm">/month</span>
          </div>
        </div>

        <div className="space-y-2 border-t border-white/10 pt-4">
          {calculatorMetrics.map((metric) => {
            const currentValue = metrics[metric.id] || metric.baseValue;
            const cost = currentValue * metric.pricePerUnit;
            return (
              <div key={metric.id} className="flex items-center justify-between text-xs text-white/50">
                <span>{metric.label}: {currentValue} {metric.unit}</span>
                <span className="font-medium text-white/70">${cost.toFixed(2)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <button className="w-full px-6 py-3.5 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white rounded-xl font-semibold shadow-lg shadow-[#0EA5E9]/25 hover:shadow-[#0EA5E9]/40 hover:scale-[1.01] transition-all duration-300">
          Get Custom Quote
        </button>
      </div>
    </div>
  );
}
