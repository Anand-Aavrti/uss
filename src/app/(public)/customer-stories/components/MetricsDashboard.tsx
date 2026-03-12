"use client";

import { useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface MetricData {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
}

const MetricsDashboard = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useState(() => {
    setIsHydrated(true);
  });

  const metrics: MetricData[] = [
    {
      label: "Total Customers",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: "UserGroupIcon",
    },
    {
      label: "Global Deployments",
      value: "15,234",
      change: "+18.2%",
      trend: "up",
      icon: "GlobeAltIcon",
    },
    {
      label: "Average Uptime",
      value: "99.97%",
      change: "+0.03%",
      trend: "up",
      icon: "CheckCircleIcon",
    },
    {
      label: "Customer Satisfaction",
      value: "4.8/5.0",
      change: "+0.2",
      trend: "up",
      icon: "StarIcon",
    },
  ];

  if (!isHydrated) {
    return (
      <div className="backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-10 bg-[#1B365D]/30 rounded-xl animate-pulse"></div>
              <div className="h-8 bg-[#1B365D]/30 rounded-xl animate-pulse"></div>
              <div className="h-4 bg-[#1B365D]/30 rounded-xl animate-pulse w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 p-8 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#0EA5E9]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
              <span className="text-xs font-medium text-[#0EA5E9]">Live Data</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">Global Success Metrics</h3>
            <p className="text-sm text-white/60">
              Real-time performance indicators from our worldwide customer base
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="group backdrop-blur-xl bg-[#1B365D]/30 rounded-xl p-6 border border-white/10 hover:border-[#0EA5E9]/40 hover:shadow-lg hover:shadow-[#0EA5E9]/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 bg-gradient-to-br from-[#0EA5E9]/20 to-[#1B365D]/30 rounded-xl flex items-center justify-center border border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/40 transition-colors duration-300">
                  <Icon
                    name={metric.icon as any}
                    size={22}
                    className="text-[#0EA5E9]"
                  />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    metric.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  <Icon
                    name={
                      metric.trend === "up"
                        ? "ArrowTrendingUpIcon"
                        : "ArrowTrendingDownIcon"
                    }
                    size={16}
                  />
                  <span>{metric.change}</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{metric.value}</p>
              <p className="text-sm text-white/60">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-white/40">
            Data updated in real-time • Last refresh:{" "}
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
