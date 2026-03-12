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
      <section className="bg-[#0B1220] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 p-8 animate-pulse">
            <div className="h-8 bg-[#1B365D]/40 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-[#1B365D]/30 rounded w-2/3 mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-20 bg-[#1B365D]/30 rounded-xl"></div>
                ))}
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-[#1B365D]/30 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-[#0B1220] py-20 overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute -top-20 right-0 w-96 h-96 bg-[#0EA5E9]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#1B365D]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 mb-6">
            <Icon name="CalculatorIcon" size={16} className="text-[#0EA5E9]" />
            <span className="text-sm font-medium text-[#0EA5E9]">
              ROI Calculator
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Calculate Your Enterprise Savings
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            See how much your organization can save by switching to USS
            infrastructure.
          </p>
        </div>

        <div className="backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Input panel */}
            <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">
                Your Current Setup
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Annual Infrastructure Cost
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-medium">
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
                      className="w-full pl-8 pr-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Number of Servers
                  </label>
                  <input
                    type="number"
                    value={inputs.numberOfServers}
                    onChange={(e) =>
                      handleInputChange("numberOfServers", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Downtime Hours Per Year
                  </label>
                  <input
                    type="number"
                    value={inputs.downtimeHoursPerYear}
                    onChange={(e) =>
                      handleInputChange("downtimeHoursPerYear", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Average Revenue Per Hour
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-medium">
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
                      className="w-full pl-8 pr-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Engineering Team Size
                  </label>
                  <input
                    type="number"
                    value={inputs.engineeringTeamSize}
                    onChange={(e) =>
                      handleInputChange("engineeringTeamSize", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Results panel */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-[#0EA5E9]/10 to-[#1B365D]/30">
              <h3 className="text-xl font-semibold text-white mb-6">
                Your Projected Savings
              </h3>

              <div className="space-y-4">
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/70">
                      Infrastructure Savings
                    </span>
                    <Icon
                      name="ServerStackIcon"
                      size={18}
                      className="text-white/40"
                    />
                  </div>
                  <div className="text-3xl font-bold text-[#0EA5E9]">
                    {formatCurrency(results.annualSavings)}
                  </div>
                  <div className="text-xs text-white/50 mt-1">
                    40% reduction in infrastructure costs
                  </div>
                </div>

                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/70">
                      Downtime Reduction
                    </span>
                    <Icon
                      name="ShieldCheckIcon"
                      size={18}
                      className="text-white/40"
                    />
                  </div>
                  <div className="text-3xl font-bold text-[#0EA5E9]">
                    {formatCurrency(results.downtimeReduction)}
                  </div>
                  <div className="text-xs text-white/50 mt-1">
                    95% reduction in downtime costs
                  </div>
                </div>

                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/70">
                      Productivity Gains
                    </span>
                    <Icon
                      name="ChartBarIcon"
                      size={18}
                      className="text-white/40"
                    />
                  </div>
                  <div className="text-3xl font-bold text-[#0EA5E9]">
                    {formatCurrency(results.productivityGains)}
                  </div>
                  <div className="text-xs text-white/50 mt-1">
                    30% increase in team efficiency
                  </div>
                </div>

                <div className="border-t border-white/10 pt-5 mt-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-semibold text-white">
                      Total Annual ROI
                    </span>
                    <Icon
                      name="TrophyIcon"
                      size={22}
                      className="text-[#0EA5E9]"
                      variant="solid"
                    />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {formatCurrency(results.totalROI)}
                  </div>
                  <div className="text-sm text-white/60">
                    Payback period:{" "}
                    <span className="font-semibold text-white">
                      {results.paybackPeriod.toFixed(1)} months
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-white/40 mb-4">
            These calculations are estimates based on industry averages and
            typical USS customer outcomes.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white rounded-xl font-semibold shadow-lg shadow-[#0EA5E9]/25 hover:shadow-[#0EA5E9]/40 hover:scale-[1.02] transition-all duration-300">
            Get Detailed ROI Analysis
            <Icon name="ArrowRightIcon" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
