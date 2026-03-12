import Icon from "@/components/ui/AppIcon";

interface Feature {
  icon: string;
  title: string;
  description: string;
  benefits: string[];
}

const features: Feature[] = [
  {
    icon: "ServerStackIcon",
    title: "Global Infrastructure",
    description:
      "Deploy across 150+ countries with multi-region redundancy and automatic failover capabilities.",
    benefits: [
      "99.99% uptime SLA with financial backing",
      "Sub-50ms latency in major markets",
      "Automatic geographic load balancing",
    ],
  },
  {
    icon: "UserGroupIcon",
    title: "Advanced Access Control",
    description:
      "Enterprise-grade identity management with SSO, SAML 2.0, and granular permission systems.",
    benefits: [
      "Single Sign-On with major providers",
      "Role-based access control (RBAC)",
      "Audit logs for compliance tracking",
    ],
  },
  {
    icon: "ChartBarIcon",
    title: "Enterprise Analytics",
    description:
      "Comprehensive insights into usage patterns, performance metrics, and cost optimization opportunities.",
    benefits: [
      "Real-time performance dashboards",
      "Custom reporting and data exports",
      "Predictive capacity planning",
    ],
  },
  {
    icon: "CogIcon",
    title: "API & Integration",
    description:
      "Robust APIs and pre-built integrations with enterprise tools for seamless workflow automation.",
    benefits: [
      "RESTful and GraphQL APIs",
      "Webhook support for real-time events",
      "Integration with 200+ enterprise tools",
    ],
  },
  {
    icon: "ShieldCheckIcon",
    title: "Data Sovereignty",
    description:
      "Control where your data resides with region-specific deployments and compliance guarantees.",
    benefits: [
      "Choose specific geographic regions",
      "Data residency compliance",
      "Local encryption key management",
    ],
  },
  {
    icon: "ClockIcon",
    title: "24/7 Premium Support",
    description:
      "Dedicated support team with guaranteed response times and direct access to engineering.",
    benefits: [
      "15-minute critical issue response",
      "Named technical account manager",
      "Quarterly business reviews",
    ],
  },
];

export default function EnterpriseFeatures() {
  return (
    <section className="bg-[#08111f] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 mb-6">
            <Icon name="SparklesIcon" size={16} className="text-[#0EA5E9]" />
            <span className="text-sm font-medium text-[#0EA5E9]">Enterprise Features</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Everything Your Enterprise Needs
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Built for scale, security, and global operations. USS provides the foundation for
            mission-critical infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl p-8 border border-white/10 hover:border-[#0EA5E9]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#0EA5E9]/10"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative w-14 h-14 bg-gradient-to-br from-[#0EA5E9]/20 to-[#1B365D]/30 rounded-xl flex items-center justify-center mb-6 border border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/50 transition-colors duration-300">
                <Icon name={feature.icon as any} size={26} className="text-[#0EA5E9]" />
              </div>

              <h3 className="relative text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="relative text-white/60 mb-6 text-sm leading-relaxed">
                {feature.description}
              </p>

              <ul className="relative space-y-2.5">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Icon
                      name="CheckCircleIcon"
                      size={18}
                      className="text-green-400 flex-shrink-0 mt-0.5"
                      variant="solid"
                    />
                    <span className="text-sm text-white/70">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
