"use client";

import { useState } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface CaseStudy {
  id: number;
  company: string;
  industry: string;
  region: string;
  logo: string;
  image: string;
  imageAlt: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  quote: string;
  author: string;
  role: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    company: "GlobalBank International",
    industry: "Financial Services",
    region: "North America",
    logo: "https://images.unsplash.com/photo-1573740854079-c386181db986",
    image: "https://images.unsplash.com/photo-1573740854079-c386181db986",
    imageAlt:
      "Modern glass skyscraper financial district building reflecting blue sky with clouds",
    challenge:
      "Legacy infrastructure couldn't support real-time global transactions across 45 countries while maintaining regulatory compliance.",
    solution:
      "Deployed USS multi-region architecture with automated compliance monitoring and real-time data synchronization.",
    results: [
      {
        metric: "99.995%",
        value: "Uptime",
        description: "Achieved across all regions",
      },
      {
        metric: "60%",
        value: "Cost Reduction",
        description: "In infrastructure spend",
      },
      {
        metric: "3x",
        value: "Faster Deployment",
        description: "New market launches",
      },
    ],

    quote:
      "USS transformed our global operations. We now deploy to new markets in weeks instead of months, with complete confidence in security and compliance.",
    author: "Sarah Chen",
    role: "Chief Technology Officer",
  },
  {
    id: 2,
    company: "HealthTech Solutions",
    industry: "Healthcare",
    region: "Europe",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_14c968347-1764642437513.png",
    image:
      "https://img.rocket.new/generatedImages/rocket_gen_img_14c968347-1764642437513.png",
    imageAlt:
      "Medical professional in white coat using tablet in modern hospital corridor with natural lighting",
    challenge:
      "GDPR and HIPAA compliance requirements made it difficult to scale patient data management across European healthcare networks.",
    solution:
      "Implemented USS data sovereignty features with region-specific encryption and automated compliance reporting.",
    results: [
      {
        metric: "100%",
        value: "Compliance",
        description: "GDPR and HIPAA certified",
      },
      {
        metric: "5M+",
        value: "Patient Records",
        description: "Securely managed daily",
      },
      {
        metric: "40%",
        value: "Faster Access",
        description: "To critical patient data",
      },
    ],

    quote:
      "The combination of security, compliance, and performance has been game-changing for our healthcare network. Patient care has improved measurably.",
    author: "Dr. Michael Weber",
    role: "Director of Digital Health",
  },
  {
    id: 3,
    company: "RetailGlobal Corp",
    industry: "E-commerce",
    region: "Asia-Pacific",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_12a638202-1766959266777.png",
    image:
      "https://img.rocket.new/generatedImages/rocket_gen_img_12a638202-1766959266777.png",
    imageAlt:
      "Busy modern retail store interior with customers shopping and bright product displays",
    challenge:
      "Peak shopping events caused system crashes, resulting in millions in lost revenue and damaged customer trust.",
    solution:
      "Leveraged USS auto-scaling infrastructure with predictive load balancing and multi-region failover.",
    results: [
      { metric: "Zero", value: "Downtime", description: "During peak events" },
      {
        metric: "10x",
        value: "Traffic Handling",
        description: "Automatic scaling",
      },
      {
        metric: "$50M+",
        value: "Revenue Protected",
        description: "During major sales",
      },
    ],

    quote:
      "USS handles our biggest shopping events flawlessly. We've gone from dreading peak traffic to confidently planning even larger campaigns.",
    author: "Priya Sharma",
    role: "VP of Engineering",
  },
];

export default function CaseStudies() {
  const [activeStudy, setActiveStudy] = useState<number>(0);
  const currentStudy = caseStudies[activeStudy];

  return (
    <section className="relative bg-[#0B1220] py-20 overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#0EA5E9]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#1B365D]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/25 mb-6">
            <Icon name="TrophyIcon" size={16} className="text-green-400" />
            <span className="text-sm font-medium text-green-400">
              Customer Success Stories
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Proven Results Across Industries
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            See how global enterprises achieve measurable business outcomes with
            USS infrastructure.
          </p>
        </div>

        {/* Company selector tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {caseStudies.map((study, index) => (
            <button
              key={study.id}
              onClick={() => setActiveStudy(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeStudy === index
                  ? "bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white shadow-lg shadow-[#0EA5E9]/20"
                  : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {study.company}
            </button>
          ))}
        </div>

        {/* Case study card */}
        <div className="backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image panel */}
            <div className="relative h-64 lg:h-auto min-h-[280px]">
              <AppImage
                src={currentStudy.image}
                alt={currentStudy.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/60 via-transparent to-transparent" />
              <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-3 border border-white/20">
                <AppImage
                  src={currentStudy.logo}
                  alt={`${currentStudy.company} company logo`}
                  className="h-8 w-auto"
                />
              </div>
            </div>

            {/* Content panel */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="inline-flex items-center px-3 py-1 bg-[#0EA5E9]/10 text-[#0EA5E9] text-sm font-medium rounded-full border border-[#0EA5E9]/20">
                  {currentStudy.industry}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 text-white/70 text-sm font-medium rounded-full border border-white/10">
                  <Icon name="GlobeAltIcon" size={14} />
                  {currentStudy.region}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {currentStudy.company}
              </h3>

              <div className="space-y-5 mb-8">
                <div>
                  <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                    Challenge
                  </h4>
                  <p className="text-white/80">{currentStudy.challenge}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                    Solution
                  </h4>
                  <p className="text-white/80">{currentStudy.solution}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-white/10">
                {currentStudy.results.map((result, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-[#0EA5E9] mb-1">
                      {result.metric}
                    </div>
                    <div className="text-sm font-semibold text-white mb-1">
                      {result.value}
                    </div>
                    <div className="text-xs text-white/50">
                      {result.description}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="relative">
                <Icon
                  name="ChatBubbleLeftIcon"
                  size={28}
                  className="text-[#0EA5E9]/25 absolute -top-1 -left-1"
                  variant="solid"
                />
                <p className="text-base text-white/80 italic mb-4 pl-6">
                  &quot;{currentStudy.quote}&quot;
                </p>
                <footer className="pl-6">
                  <div className="font-semibold text-white">
                    {currentStudy.author}
                  </div>
                  <div className="text-sm text-white/50">{currentStudy.role}</div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white rounded-xl font-semibold shadow-lg shadow-[#0EA5E9]/25 hover:shadow-[#0EA5E9]/40 hover:scale-[1.02] transition-all duration-300">
            View All Case Studies
            <Icon name="ArrowRightIcon" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
