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
    <section className="relative bg-[#08111f] py-20 overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#0EA5E9]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1B365D]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 mb-6">
            <Icon name="BriefcaseIcon" size={16} className="text-[#0EA5E9]" />
            <span className="text-sm font-medium text-[#0EA5E9]">
              Procurement Resources
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Streamlined Procurement Process
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Access all the documentation and resources your procurement team
            needs to evaluate and approve USS.
          </p>
        </div>

        {/* Resource cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl p-6 border border-white/10 hover:border-[#0EA5E9]/40 hover:shadow-xl hover:shadow-[#0EA5E9]/10 transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9]/20 to-[#1B365D]/30 rounded-xl flex items-center justify-center border border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/50 transition-colors">
                    <Icon
                      name={resource.icon as any}
                      size={22}
                      className="text-[#0EA5E9]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-white/50 bg-[#1B365D]/40 border border-white/10 px-2 py-1 rounded-lg">
                      {resource.fileType}
                    </span>
                    <span className="text-xs text-white/40">
                      {resource.fileSize}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#0EA5E9] transition-colors duration-300">
                  {resource.title}
                </h3>
                <p className="text-sm text-white/60 mb-4">
                  {resource.description}
                </p>

                <button className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0EA5E9] hover:text-white transition-colors duration-300">
                  Download
                  <Icon name="ArrowDownTrayIcon" size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Procurement help section */}
        <div className="backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: info */}
            <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Need Help with Procurement?
              </h3>
              <p className="text-white/60 mb-8">
                Our enterprise team is ready to assist with vendor
                questionnaires, security reviews, and contract negotiations. We
                understand enterprise procurement processes and work to make
                yours as smooth as possible.
              </p>
              <ul className="space-y-4">
                {[
                  "Dedicated procurement specialist assigned",
                  "Fast-track security questionnaire responses",
                  "Flexible contract terms and MSA options",
                  "Legal team support for contract review",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon
                      name="CheckCircleIcon"
                      size={20}
                      className="flex-shrink-0 text-green-400 mt-0.5"
                      variant="solid"
                    />
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: contact form */}
            <div className="p-8 lg:p-12">
              <h4 className="text-xl font-semibold text-white mb-6">
                Contact Procurement Team
              </h4>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your company name"
                    className="w-full px-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Procurement Stage
                  </label>
                  <select className="w-full px-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300">
                    <option value="" className="bg-[#0B1220] text-white">
                      Select stage
                    </option>
                    <option value="initial" className="bg-[#0B1220] text-white">
                      Initial evaluation
                    </option>
                    <option value="security" className="bg-[#0B1220] text-white">
                      Security review
                    </option>
                    <option value="legal" className="bg-[#0B1220] text-white">
                      Legal review
                    </option>
                    <option value="negotiation" className="bg-[#0B1220] text-white">
                      Contract negotiation
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white rounded-xl font-semibold shadow-lg shadow-[#0EA5E9]/25 hover:shadow-[#0EA5E9]/40 hover:scale-[1.01] transition-all duration-300"
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
