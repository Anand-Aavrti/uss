"use client";

import { useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface ComplianceItem {
  standard: string;
  description: string;
  regions: {
    name: string;
    status: "certified" | "in-progress" | "planned";
  }[];
}

const complianceData: ComplianceItem[] = [
  {
    standard: "SOC 2 Type II",
    description: "Security, availability, and confidentiality controls",
    regions: [
      { name: "North America", status: "certified" },
      { name: "Europe", status: "certified" },
      { name: "Asia-Pacific", status: "certified" },
      { name: "Middle East", status: "certified" },
    ],
  },
  {
    standard: "ISO 27001",
    description: "Information security management system",
    regions: [
      { name: "North America", status: "certified" },
      { name: "Europe", status: "certified" },
      { name: "Asia-Pacific", status: "certified" },
      { name: "Middle East", status: "in-progress" },
    ],
  },
  {
    standard: "GDPR",
    description: "European data protection regulation",
    regions: [
      { name: "North America", status: "certified" },
      { name: "Europe", status: "certified" },
      { name: "Asia-Pacific", status: "certified" },
      { name: "Middle East", status: "certified" },
    ],
  },
  {
    standard: "HIPAA",
    description: "Healthcare data privacy and security",
    regions: [
      { name: "North America", status: "certified" },
      { name: "Europe", status: "certified" },
      { name: "Asia-Pacific", status: "in-progress" },
      { name: "Middle East", status: "planned" },
    ],
  },
  {
    standard: "PCI DSS",
    description: "Payment card industry data security",
    regions: [
      { name: "North America", status: "certified" },
      { name: "Europe", status: "certified" },
      { name: "Asia-Pacific", status: "certified" },
      { name: "Middle East", status: "certified" },
    ],
  },
  {
    standard: "FedRAMP",
    description: "US federal government authorization",
    regions: [
      { name: "North America", status: "certified" },
      { name: "Europe", status: "planned" },
      { name: "Asia-Pacific", status: "planned" },
      { name: "Middle East", status: "planned" },
    ],
  },
];

const regions = ["North America", "Europe", "Asia-Pacific", "Middle East"];

export default function ComplianceMatrix() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "certified":
        return (
          <Icon
            name="CheckCircleIcon"
            size={20}
            className="text-success"
            variant="solid"
          />
        );
      case "in-progress":
        return (
          <Icon
            name="ClockIcon"
            size={20}
            className="text-warning"
            variant="solid"
          />
        );
      case "planned":
        return (
          <Icon
            name="CalendarIcon"
            size={20}
            className="text-muted-foreground"
          />
        );
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "certified":
        return "Certified";
      case "in-progress":
        return "In Progress";
      case "planned":
        return "Planned";
      default:
        return "";
    }
  };

  const filteredData =
    selectedRegion === "all"
      ? complianceData
      : complianceData.map((item) => ({
          ...item,
          regions: item.regions.filter((r) => r.name === selectedRegion),
        }));

  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Icon name="DocumentCheckIcon" size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              Compliance Matrix
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Global Compliance Coverage
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            View our comprehensive compliance certifications across all major
            regions and standards.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedRegion("all")}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
              selectedRegion === "all"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-foreground hover:bg-muted border border-border"
            }`}
          >
            All Regions
          </button>
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                selectedRegion === region
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground hover:bg-muted border border-border"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Compliance Standard
                  </th>
                  {(selectedRegion === "all" ? regions : [selectedRegion]).map(
                    (region) => (
                      <th
                        key={region}
                        className="px-6 py-4 text-center text-sm font-semibold text-foreground"
                      >
                        {region}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-surface/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground mb-1">
                        {item.standard}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.description}
                      </div>
                    </td>
                    {item.regions.map((region, idx) => (
                      <td key={idx} className="px-6 py-4 text-center">
                        <div className="inline-flex flex-col items-center space-y-1">
                          {getStatusIcon(region.status)}
                          <span className="text-xs font-medium text-muted-foreground">
                            {getStatusText(region.status)}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex items-start space-x-6 bg-surface rounded-xl p-6">
          <div className="flex-shrink-0">
            <Icon
              name="InformationCircleIcon"
              size={24}
              className="text-accent"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Legend
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Icon
                  name="CheckCircleIcon"
                  size={20}
                  className="text-success"
                  variant="solid"
                />
                <span className="text-sm text-foreground">
                  Certified - Active compliance
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon
                  name="ClockIcon"
                  size={20}
                  className="text-warning"
                  variant="solid"
                />
                <span className="text-sm text-foreground">
                  In Progress - Audit underway
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon
                  name="CalendarIcon"
                  size={20}
                  className="text-muted-foreground"
                />
                <span className="text-sm text-foreground">
                  Planned - Scheduled for certification
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
