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
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
            <Icon name="SparklesIcon" size={20} className="text-accent" />
            <span className="text-sm font-medium text-accent">
              Enterprise Features
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Everything Your Enterprise Needs
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Built for scale, security, and global operations. USS provides the
            foundation for mission-critical infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-border group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <Icon
                  name={feature.icon as any}
                  size={28}
                  className="text-primary"
                />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {feature.description}
              </p>

              <ul className="space-y-3">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <Icon
                      name="CheckCircleIcon"
                      size={20}
                      className="text-success flex-shrink-0 mt-0.5"
                      variant="solid"
                    />
                    <span className="text-sm text-foreground">{benefit}</span>
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
