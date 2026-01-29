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
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-10 bg-muted rounded animate-pulse"></div>
              <div className="h-8 bg-muted rounded animate-pulse"></div>
              <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-8 text-primary-foreground">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Global Success Metrics</h3>
        <p className="text-primary-foreground/80">
          Real-time performance indicators from our worldwide customer base
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Icon
                  name={metric.icon as any}
                  size={24}
                  className="text-primary-foreground"
                />
              </div>
              <div
                className={`flex items-center space-x-1 text-sm font-medium ${
                  metric.trend === "up" ? "text-success" : "text-error"
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
            <p className="text-3xl font-bold mb-1">{metric.value}</p>
            <p className="text-sm text-primary-foreground/80">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/20">
        <p className="text-sm text-primary-foreground/80 text-center">
          Data updated in real-time • Last refresh:{" "}
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default MetricsDashboard;
