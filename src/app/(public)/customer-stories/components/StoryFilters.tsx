"use client";

import { useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface StoryFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  industry: string;
  region: string;
  useCase: string;
}

const StoryFilters = ({ onFilterChange }: StoryFiltersProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    industry: "all",
    region: "all",
    useCase: "all",
  });
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useState(() => {
    setIsHydrated(true);
  });

  const industries: FilterOption[] = [
    { id: "all", label: "All Industries", count: 48 },
    { id: "finance", label: "Financial Services", count: 12 },
    { id: "healthcare", label: "Healthcare", count: 8 },
    { id: "retail", label: "Retail & E-commerce", count: 10 },
    { id: "technology", label: "Technology", count: 9 },
    { id: "manufacturing", label: "Manufacturing", count: 5 },
    { id: "education", label: "Education", count: 4 },
  ];

  const regions: FilterOption[] = [
    { id: "all", label: "All Regions", count: 48 },
    { id: "north-america", label: "North America", count: 15 },
    { id: "europe", label: "Europe", count: 12 },
    { id: "asia-pacific", label: "Asia Pacific", count: 11 },
    { id: "middle-east", label: "Middle East", count: 6 },
    { id: "latin-america", label: "Latin America", count: 4 },
  ];

  const useCases: FilterOption[] = [
    { id: "all", label: "All Use Cases", count: 48 },
    { id: "infrastructure", label: "Infrastructure Modernization", count: 14 },
    { id: "security", label: "Security & Compliance", count: 10 },
    { id: "scalability", label: "Scalability & Performance", count: 12 },
    { id: "integration", label: "System Integration", count: 8 },
    { id: "migration", label: "Cloud Migration", count: 4 },
  ];

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    if (!isHydrated) return;

    const newFilters = {
      ...activeFilters,
      [category]: value,
    };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleSection = (section: string) => {
    if (!isHydrated) return;
    setExpandedSection(expandedSection === section ? null : section);
  };

  const resetFilters = () => {
    if (!isHydrated) return;

    const resetState = {
      industry: "all",
      region: "all",
      useCase: "all",
    };
    setActiveFilters(resetState);
    onFilterChange(resetState);
  };

  const activeFilterCount = Object.values(activeFilters).filter(
    (v) => v !== "all",
  ).length;

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        </div>
        <div className="space-y-4">
          <div className="h-10 bg-muted rounded animate-pulse"></div>
          <div className="h-10 bg-muted rounded animate-pulse"></div>
          <div className="h-10 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-accent hover:text-accent/80 font-medium transition-colors duration-300"
          >
            Reset All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Industry Filter */}
        <div className="border-b border-border pb-4">
          <button
            onClick={() => toggleSection("industry")}
            className="w-full flex items-center justify-between text-left mb-3"
          >
            <span className="text-sm font-semibold text-foreground">
              Industry
            </span>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className={`text-muted-foreground transition-transform duration-300 ${
                expandedSection === "industry" ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSection === "industry" && (
            <div className="space-y-2 animate-slide-in-from-top">
              {industries.map((industry) => (
                <label
                  key={industry.id}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="industry"
                      value={industry.id}
                      checked={activeFilters.industry === industry.id}
                      onChange={(e) =>
                        handleFilterChange("industry", e.target.value)
                      }
                      className="w-4 h-4 text-accent border-border focus:ring-accent focus:ring-2"
                    />
                    <span className="text-sm text-foreground group-hover:text-accent transition-colors duration-300">
                      {industry.label}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {industry.count}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Region Filter */}
        <div className="border-b border-border pb-4">
          <button
            onClick={() => toggleSection("region")}
            className="w-full flex items-center justify-between text-left mb-3"
          >
            <span className="text-sm font-semibold text-foreground">
              Region
            </span>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className={`text-muted-foreground transition-transform duration-300 ${
                expandedSection === "region" ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSection === "region" && (
            <div className="space-y-2 animate-slide-in-from-top">
              {regions.map((region) => (
                <label
                  key={region.id}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="region"
                      value={region.id}
                      checked={activeFilters.region === region.id}
                      onChange={(e) =>
                        handleFilterChange("region", e.target.value)
                      }
                      className="w-4 h-4 text-accent border-border focus:ring-accent focus:ring-2"
                    />
                    <span className="text-sm text-foreground group-hover:text-accent transition-colors duration-300">
                      {region.label}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {region.count}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Use Case Filter */}
        <div>
          <button
            onClick={() => toggleSection("useCase")}
            className="w-full flex items-center justify-between text-left mb-3"
          >
            <span className="text-sm font-semibold text-foreground">
              Use Case
            </span>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className={`text-muted-foreground transition-transform duration-300 ${
                expandedSection === "useCase" ? "rotate-180" : ""
              }`}
            />
          </button>
          {expandedSection === "useCase" && (
            <div className="space-y-2 animate-slide-in-from-top">
              {useCases.map((useCase) => (
                <label
                  key={useCase.id}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="useCase"
                      value={useCase.id}
                      checked={activeFilters.useCase === useCase.id}
                      onChange={(e) =>
                        handleFilterChange("useCase", e.target.value)
                      }
                      className="w-4 h-4 text-accent border-border focus:ring-accent focus:ring-2"
                    />
                    <span className="text-sm text-foreground group-hover:text-accent transition-colors duration-300">
                      {useCase.label}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {useCase.count}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryFilters;
