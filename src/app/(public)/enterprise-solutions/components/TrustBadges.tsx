import Icon from "@/components/ui/AppIcon";

interface Badge {
  icon: string;
  title: string;
  description: string;
}

const badges: Badge[] = [
  {
    icon: "ShieldCheckIcon",
    title: "SOC 2 Type II",
    description: "Independently audited security controls",
  },
  {
    icon: "LockClosedIcon",
    title: "ISO 27001",
    description: "Information security management certified",
  },
  {
    icon: "DocumentCheckIcon",
    title: "GDPR Compliant",
    description: "European data protection standards",
  },
  {
    icon: "GlobeAltIcon",
    title: "HIPAA Ready",
    description: "Healthcare data security compliance",
  },
  {
    icon: "ShieldExclamationIcon",
    title: "PCI DSS",
    description: "Payment card industry data security",
  },
  {
    icon: "CheckBadgeIcon",
    title: "FedRAMP",
    description: "US federal government authorization",
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-surface py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Trusted by Regulated Industries Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive compliance certifications ensure your data meets
            the highest security and privacy standards across all jurisdictions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon
                      name={badge.icon as any}
                      size={24}
                      className="text-primary"
                      variant="solid"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            View our complete compliance documentation and security reports
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300">
            Access Trust Center
            <Icon name="ArrowRightIcon" size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
