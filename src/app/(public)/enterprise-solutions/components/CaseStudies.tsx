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
    <section className="bg-surface py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 px-4 py-2 rounded-full mb-6">
            <Icon name="TrophyIcon" size={20} className="text-success" />
            <span className="text-sm font-medium text-success">
              Customer Success Stories
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Proven Results Across Industries
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how global enterprises achieve measurable business outcomes with
            USS infrastructure.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {caseStudies.map((study, index) => (
            <button
              key={study.id}
              onClick={() => setActiveStudy(index)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeStudy === index
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground hover:bg-muted border border-border"
              }`}
            >
              {study.company}
            </button>
          ))}
        </div>

        <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-64 lg:h-auto">
              <AppImage
                src={currentStudy.image}
                alt={currentStudy.imageAlt}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-6 left-6 bg-white rounded-lg shadow-md p-3">
                <AppImage
                  src={currentStudy.logo}
                  alt={`${currentStudy.company} company logo`}
                  className="h-8 w-auto"
                />
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-6">
                <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {currentStudy.industry}
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                  <Icon name="GlobeAltIcon" size={16} className="mr-1" />
                  {currentStudy.region}
                </span>
              </div>

              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                {currentStudy.company}
              </h3>

              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Challenge
                  </h4>
                  <p className="text-foreground">{currentStudy.challenge}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Solution
                  </h4>
                  <p className="text-foreground">{currentStudy.solution}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-border">
                {currentStudy.results.map((result, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {result.metric}
                    </div>
                    <div className="text-sm font-semibold text-foreground mb-1">
                      {result.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {result.description}
                    </div>
                  </div>
                ))}
              </div>

              <blockquote className="relative">
                <Icon
                  name="ChatBubbleLeftIcon"
                  size={32}
                  className="text-accent/20 absolute -top-2 -left-2"
                  variant="solid"
                />
                <p className="text-lg text-foreground italic mb-4 pl-6">
                  &quot;{currentStudy.quote}&quot;
                </p>
                <footer className="flex items-center space-x-3 pl-6">
                  <div>
                    <div className="font-semibold text-foreground">
                      {currentStudy.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {currentStudy.role}
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg">
            View All Case Studies
            <Icon name="ArrowRightIcon" size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
