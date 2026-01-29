import Icon from "@/components/ui/AppIcon";

interface Resource {
  title: string;
  description: string;
  icon: string;
  fileType: string;
  fileSize: string;
}

const resources: Resource[] = [
  {
    title: "Enterprise Contract Template",
    description:
      "Standard enterprise agreement with customizable terms and SLA guarantees",
    icon: "DocumentTextIcon",
    fileType: "PDF",
    fileSize: "2.4 MB",
  },
  {
    title: "Security & Compliance Package",
    description:
      "Complete documentation of security controls, certifications, and audit reports",
    icon: "ShieldCheckIcon",
    fileType: "ZIP",
    fileSize: "15.8 MB",
  },
  {
    title: "Technical Architecture Guide",
    description:
      "Detailed infrastructure specifications, integration patterns, and deployment options",
    icon: "CpuChipIcon",
    fileType: "PDF",
    fileSize: "8.2 MB",
  },
  {
    title: "Pricing & Licensing Guide",
    description:
      "Transparent pricing models, volume discounts, and licensing options",
    icon: "CurrencyDollarIcon",
    fileType: "PDF",
    fileSize: "1.8 MB",
  },
  {
    title: "Data Processing Agreement",
    description: "GDPR-compliant DPA with standard contractual clauses",
    icon: "DocumentCheckIcon",
    fileType: "PDF",
    fileSize: "1.2 MB",
  },
  {
    title: "Service Level Agreement",
    description:
      "Detailed SLA terms with uptime guarantees and support commitments",
    icon: "ClockIcon",
    fileType: "PDF",
    fileSize: "980 KB",
  },
];

export default function ProcurementPortal() {
  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Icon name="BriefcaseIcon" size={20} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              Procurement Resources
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Streamlined Procurement Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Access all the documentation and resources your procurement team
            needs to evaluate and approve USS.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-border group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon
                    name={resource.icon as any}
                    size={24}
                    className="text-primary"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-muted-foreground bg-surface px-2 py-1 rounded">
                    {resource.fileType}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {resource.fileSize}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {resource.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {resource.description}
              </p>

              <button className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-300">
                Download
                <Icon name="ArrowDownTrayIcon" size={16} className="ml-1" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-4">
                Need Help with Procurement?
              </h3>
              <p className="text-white/90 mb-6">
                Our enterprise team is ready to assist with vendor
                questionnaires, security reviews, and contract negotiations. We
                understand enterprise procurement processes and work to make
                yours as smooth as possible.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Icon
                    name="CheckCircleIcon"
                    size={20}
                    className="flex-shrink-0 mt-0.5"
                    variant="solid"
                  />
                  <span className="text-sm">
                    Dedicated procurement specialist assigned
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon
                    name="CheckCircleIcon"
                    size={20}
                    className="flex-shrink-0 mt-0.5"
                    variant="solid"
                  />
                  <span className="text-sm">
                    Fast-track security questionnaire responses
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon
                    name="CheckCircleIcon"
                    size={20}
                    className="flex-shrink-0 mt-0.5"
                    variant="solid"
                  />
                  <span className="text-sm">
                    Flexible contract terms and MSA options
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon
                    name="CheckCircleIcon"
                    size={20}
                    className="flex-shrink-0 mt-0.5"
                    variant="solid"
                  />
                  <span className="text-sm">
                    Legal team support for contract review
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h4 className="text-xl font-semibold mb-6">
                Contact Procurement Team
              </h4>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your company name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 text-white placeholder-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 text-white placeholder-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Procurement Stage
                  </label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 text-white">
                    <option value="" className="text-foreground">
                      Select stage
                    </option>
                    <option value="initial" className="text-foreground">
                      Initial evaluation
                    </option>
                    <option value="security" className="text-foreground">
                      Security review
                    </option>
                    <option value="legal" className="text-foreground">
                      Legal review
                    </option>
                    <option value="negotiation" className="text-foreground">
                      Contract negotiation
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-cta text-cta-foreground rounded-lg font-semibold hover:bg-cta/90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Request Procurement Support
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
