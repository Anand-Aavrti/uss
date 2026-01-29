"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";

interface CalculatorInputs {
  currentInfrastructureCost: number;
  numberOfServers: number;
  downtimeHoursPerYear: number;
  averageRevenuePerHour: number;
  engineeringTeamSize: number;
}

interface CalculatorResults {
  annualSavings: number;
  downtimeReduction: number;
  productivityGains: number;
  totalROI: number;
  paybackPeriod: number;
}

export default function ROICalculator() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [inputs, setInputs] = useState<CalculatorInputs>({
    currentInfrastructureCost: 100000,
    numberOfServers: 50,
    downtimeHoursPerYear: 24,
    averageRevenuePerHour: 10000,
    engineeringTeamSize: 10,
  });

  const [results, setResults] = useState<CalculatorResults>({
    annualSavings: 0,
    downtimeReduction: 0,
    productivityGains: 0,
    totalROI: 0,
    paybackPeriod: 0,
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const infrastructureSavings = inputs.currentInfrastructureCost * 0.4;
    const downtimeReduction =
      inputs.downtimeHoursPerYear * 0.95 * inputs.averageRevenuePerHour;
    const productivityGains = inputs.engineeringTeamSize * 50000 * 0.3;
    const totalROI =
      infrastructureSavings + downtimeReduction + productivityGains;
    const ussCost = inputs.currentInfrastructureCost * 0.6;
    const paybackPeriod = ussCost / (totalROI / 12);

    setResults({
      annualSavings: infrastructureSavings,
      downtimeReduction,
      productivityGains,
      totalROI,
      paybackPeriod,
    });
  }, [inputs, isHydrated]);

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    if (!isHydrated) return;
    const numValue = parseFloat(value) || 0;
    setInputs((prev) => ({ ...prev, [field]: numValue }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (!isHydrated) {
    return (
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-card rounded-2xl shadow-xl p-8 animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-20 bg-muted rounded"></div>
                ))}
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
            <Icon name="CalculatorIcon" size={20} className="text-accent" />
            <span className="text-sm font-medium text-accent">
              ROI Calculator
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Calculate Your Enterprise Savings
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how much your organization can save by switching to USS
            infrastructure.
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-12 bg-surface/50">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Your Current Setup
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Annual Infrastructure Cost
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <input
                      type="number"
                      value={inputs.currentInfrastructureCost}
                      onChange={(e) =>
                        handleInputChange(
                          "currentInfrastructureCost",
                          e.target.value,
                        )
                      }
                      className="w-full pl-8 pr-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Number of Servers
                  </label>
                  <input
                    type="number"
                    value={inputs.numberOfServers}
                    onChange={(e) =>
                      handleInputChange("numberOfServers", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Downtime Hours Per Year
                  </label>
                  <input
                    type="number"
                    value={inputs.downtimeHoursPerYear}
                    onChange={(e) =>
                      handleInputChange("downtimeHoursPerYear", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Average Revenue Per Hour
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <input
                      type="number"
                      value={inputs.averageRevenuePerHour}
                      onChange={(e) =>
                        handleInputChange(
                          "averageRevenuePerHour",
                          e.target.value,
                        )
                      }
                      className="w-full pl-8 pr-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Engineering Team Size
                  </label>
                  <input
                    type="number"
                    value={inputs.engineeringTeamSize}
                    onChange={(e) =>
                      handleInputChange("engineeringTeamSize", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-12 bg-gradient-to-br from-primary to-secondary text-white">
              <h3 className="text-xl font-semibold mb-6">
                Your Projected Savings
              </h3>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm opacity-90">
                      Infrastructure Savings
                    </span>
                    <Icon
                      name="ServerStackIcon"
                      size={20}
                      className="opacity-70"
                    />
                  </div>
                  <div className="text-3xl font-bold">
                    {formatCurrency(results.annualSavings)}
                  </div>
                  <div className="text-xs opacity-70 mt-1">
                    40% reduction in infrastructure costs
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm opacity-90">
                      Downtime Reduction
                    </span>
                    <Icon
                      name="ShieldCheckIcon"
                      size={20}
                      className="opacity-70"
                    />
                  </div>
                  <div className="text-3xl font-bold">
                    {formatCurrency(results.downtimeReduction)}
                  </div>
                  <div className="text-xs opacity-70 mt-1">
                    95% reduction in downtime costs
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm opacity-90">
                      Productivity Gains
                    </span>
                    <Icon
                      name="ChartBarIcon"
                      size={20}
                      className="opacity-70"
                    />
                  </div>
                  <div className="text-3xl font-bold">
                    {formatCurrency(results.productivityGains)}
                  </div>
                  <div className="text-xs opacity-70 mt-1">
                    30% increase in team efficiency
                  </div>
                </div>

                <div className="border-t border-white/20 pt-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">
                      Total Annual ROI
                    </span>
                    <Icon
                      name="TrophyIcon"
                      size={24}
                      className="text-accent"
                      variant="solid"
                    />
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    {formatCurrency(results.totalROI)}
                  </div>
                  <div className="text-sm opacity-90">
                    Payback period:{" "}
                    <span className="font-semibold">
                      {results.paybackPeriod.toFixed(1)} months
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            These calculations are estimates based on industry averages and
            typical USS customer outcomes.
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-cta text-cta-foreground rounded-lg font-semibold hover:bg-cta/90 transition-all duration-300 shadow-md hover:shadow-lg">
            Get Detailed ROI Analysis
            <Icon name="ArrowRightIcon" size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
