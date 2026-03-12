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
            className="text-green-400"
            variant="solid"
          />
        );
      case "in-progress":
        return (
          <Icon
            name="ClockIcon"
            size={20}
            className="text-yellow-400"
            variant="solid"
          />
        );
      case "planned":
        return (
          <Icon
            name="CalendarIcon"
            size={20}
            className="text-white/40"
          />
        );
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "certified":
        return <span className="text-green-400">Certified</span>;
      case "in-progress":
        return <span className="text-yellow-400">In Progress</span>;
      case "planned":
        return <span className="text-white/40">Planned</span>;
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
    <section className="relative bg-[#08111f] py-20 overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-[#0EA5E9]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 mb-6">
            <Icon name="DocumentCheckIcon" size={16} className="text-[#0EA5E9]" />
            <span className="text-sm font-medium text-[#0EA5E9]">
              Compliance Matrix
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Global Compliance Coverage
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            View our comprehensive compliance certifications across all major
            regions and standards.
          </p>
        </div>

        {/* Region filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedRegion("all")}
            className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
              selectedRegion === "all"
                ? "bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white shadow-lg shadow-[#0EA5E9]/20"
                : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            All Regions
          </button>
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                selectedRegion === region
                  ? "bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white shadow-lg shadow-[#0EA5E9]/20"
                  : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Compliance table */}
        <div className="backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1B365D]/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">
                    Compliance Standard
                  </th>
                  {(selectedRegion === "all" ? regions : [selectedRegion]).map(
                    (region) => (
                      <th
                        key={region}
                        className="px-6 py-4 text-center text-sm font-semibold text-white/80"
                      >
                        {region}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#0EA5E9]/5 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white mb-1">
                        {item.standard}
                      </div>
                      <div className="text-sm text-white/50">
                        {item.description}
                      </div>
                    </td>
                    {item.regions.map((region, idx) => (
                      <td key={idx} className="px-6 py-4 text-center">
                        <div className="inline-flex flex-col items-center gap-1">
                          {getStatusIcon(region.status)}
                          <span className="text-xs font-medium">
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

        {/* Legend */}
        <div className="mt-6 backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Icon
                name="InformationCircleIcon"
                size={22}
                className="text-[#0EA5E9]"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-white mb-3">
                Legend
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Icon
                    name="CheckCircleIcon"
                    size={18}
                    className="text-green-400"
                    variant="solid"
                  />
                  <span className="text-sm text-white/70">
                    Certified — Active compliance
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    name="ClockIcon"
                    size={18}
                    className="text-yellow-400"
                    variant="solid"
                  />
                  <span className="text-sm text-white/70">
                    In Progress — Audit underway
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon
                    name="CalendarIcon"
                    size={18}
                    className="text-white/40"
                  />
                  <span className="text-sm text-white/70">
                    Planned — Scheduled for certification
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
