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
    <section className="relative bg-[#08111f] py-20 overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0EA5E9]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 mb-6">
            <Icon name="ShieldCheckIcon" size={16} className="text-[#0EA5E9]" />
            <span className="text-sm font-medium text-[#0EA5E9]">
              Trust &amp; Compliance
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Trusted by Regulated Industries Worldwide
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Our comprehensive compliance certifications ensure your data meets
            the highest security and privacy standards across all jurisdictions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl p-6 border border-white/10 hover:border-[#0EA5E9]/40 hover:shadow-xl hover:shadow-[#0EA5E9]/10 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9]/20 to-[#1B365D]/30 rounded-xl flex items-center justify-center border border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/50 transition-colors">
                    <Icon
                      name={badge.icon as any}
                      size={24}
                      className="text-[#0EA5E9]"
                      variant="solid"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-sm text-white/60">{badge.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-white/50 mb-4">
            View our complete compliance documentation and security reports
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white rounded-xl font-semibold shadow-lg shadow-[#0EA5E9]/25 hover:shadow-[#0EA5E9]/40 hover:scale-[1.02] transition-all duration-300">
            Access Trust Center
            <Icon name="ArrowRightIcon" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
