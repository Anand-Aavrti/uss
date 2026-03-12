import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";

interface BriefingTopic {
  title: string;
  duration: string;
  description: string;
  icon: string;
}

const briefingTopics: BriefingTopic[] = [
  {
    title: "Platform Overview & Value Proposition",
    duration: "15 min",
    description:
      "High-level introduction to USS capabilities and business value",
    icon: "PresentationChartLineIcon",
  },
  {
    title: "Security & Compliance Deep Dive",
    duration: "20 min",
    description:
      "Detailed review of security architecture and compliance certifications",
    icon: "ShieldCheckIcon",
  },
  {
    title: "Enterprise Architecture & Integration",
    duration: "25 min",
    description:
      "Technical architecture, scalability, and integration patterns",
    icon: "CpuChipIcon",
  },
  {
    title: "Customer Success Stories",
    duration: "15 min",
    description: "Real-world case studies from similar enterprises",
    icon: "UserGroupIcon",
  },
  {
    title: "Pricing & Commercial Terms",
    duration: "15 min",
    description: "Transparent pricing models and contract options",
    icon: "CurrencyDollarIcon",
  },
  {
    title: "Implementation & Support",
    duration: "10 min",
    description: "Onboarding process, training, and ongoing support",
    icon: "AcademicCapIcon",
  },
];

export default function ExecutiveBriefing() {
  return (
    <section className="relative bg-[#0B1220] py-20 overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0EA5E9]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1B365D]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 mb-6">
            <Icon name="VideoCameraIcon" size={16} className="text-[#0EA5E9]" />
            <span className="text-sm font-medium text-[#0EA5E9]">
              Executive Briefing Center
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Schedule Your Executive Demo
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Get a personalized demonstration tailored to your
            organization&apos;s specific needs and decision-making criteria.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: topics list */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              What to Expect
            </h3>
            <div className="space-y-3">
              {briefingTopics.map((topic, index) => (
                <div
                  key={index}
                  className="group relative backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl p-5 border border-white/10 hover:border-[#0EA5E9]/40 hover:shadow-lg hover:shadow-[#0EA5E9]/10 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0EA5E9]/20 to-[#1B365D]/30 rounded-xl flex items-center justify-center border border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/50 transition-colors">
                        <Icon
                          name={topic.icon as any}
                          size={18}
                          className="text-[#0EA5E9]"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-sm font-semibold text-white">
                          {topic.title}
                        </h4>
                        <span className="text-xs font-medium text-white/40 bg-[#1B365D]/40 border border-white/10 px-2 py-0.5 rounded-lg ml-2 flex-shrink-0">
                          {topic.duration}
                        </span>
                      </div>
                      <p className="text-sm text-white/60">{topic.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Customizable agenda note */}
            <div className="mt-6 backdrop-blur-xl bg-[#0EA5E9]/10 rounded-2xl p-5 border border-[#0EA5E9]/20">
              <div className="flex items-start gap-3">
                <Icon
                  name="InformationCircleIcon"
                  size={22}
                  className="text-[#0EA5E9] flex-shrink-0 mt-0.5"
                />
                <div>
                  <h4 className="text-base font-semibold text-white mb-1.5">
                    Customizable Agenda
                  </h4>
                  <p className="text-sm text-white/60">
                    We tailor each briefing to your specific interests and
                    concerns. Let us know your priorities when scheduling, and
                    we&apos;ll adjust the agenda accordingly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: demo form */}
          <div>
            <div className="backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 overflow-hidden">
              {/* Form header */}
              <div className="relative h-44 bg-gradient-to-br from-[#0EA5E9]/30 to-[#1B365D]/60 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon
                    name="VideoCameraIcon"
                    size={64}
                    className="text-white/15"
                  />
                </div>
                {/* Decorative orb inside header */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#0EA5E9]/20 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0B1220]/80 to-transparent">
                  <h3 className="text-xl font-semibold text-white">
                    Schedule Your Demo
                  </h3>
                </div>
              </div>

              <div className="p-8">
                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      placeholder="john.doe@company.com"
                      className="w-full px-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Company"
                      className="w-full px-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      placeholder="CTO, VP Engineering, etc."
                      className="w-full px-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Company Size
                    </label>
                    <select className="w-full px-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300">
                      <option value="" className="bg-[#0B1220] text-white">Select company size</option>
                      <option value="1-50" className="bg-[#0B1220] text-white">1-50 employees</option>
                      <option value="51-200" className="bg-[#0B1220] text-white">51-200 employees</option>
                      <option value="201-1000" className="bg-[#0B1220] text-white">201-1,000 employees</option>
                      <option value="1001-5000" className="bg-[#0B1220] text-white">1,001-5,000 employees</option>
                      <option value="5001+" className="bg-[#0B1220] text-white">5,001+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Primary Interest
                    </label>
                    <select className="w-full px-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300">
                      <option value="" className="bg-[#0B1220] text-white">Select primary interest</option>
                      <option value="security" className="bg-[#0B1220] text-white">Security &amp; Compliance</option>
                      <option value="scalability" className="bg-[#0B1220] text-white">Scalability &amp; Performance</option>
                      <option value="integration" className="bg-[#0B1220] text-white">Integration &amp; Migration</option>
                      <option value="cost" className="bg-[#0B1220] text-white">Cost Optimization</option>
                      <option value="support" className="bg-[#0B1220] text-white">Support &amp; Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your specific requirements or questions..."
                      className="w-full px-4 py-3 bg-[#1B365D]/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white rounded-xl font-semibold shadow-lg shadow-[#0EA5E9]/25 hover:shadow-[#0EA5E9]/40 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Schedule Executive Demo
                    <Icon name="CalendarIcon" size={20} />
                  </button>

                  <p className="text-xs text-white/30 text-center">
                    By submitting this form, you agree to our privacy policy and
                    terms of service.
                  </p>
                </form>
              </div>
            </div>

            {/* Quick stats */}
            <div className="mt-5 grid grid-cols-3 gap-4">
              {[
                { value: "1-2 hrs", label: "Demo Duration" },
                { value: "24 hrs", label: "Response Time" },
                { value: "Custom", label: "Tailored Agenda" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center backdrop-blur-xl bg-[#1B365D]/20 rounded-xl p-4 border border-white/10"
                >
                  <div className="text-xl font-bold text-[#0EA5E9] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enterprise team card */}
        <div className="backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 p-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#0EA5E9]/30">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_124b761b2-1763293403636.png"
                  alt="Professional headshot of enterprise sales director in navy suit with confident smile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-white mb-2">
                Meet Your Enterprise Team
              </h4>
              <p className="text-white/60 mb-4">
                Our enterprise specialists have helped hundreds of organizations
                successfully deploy USS infrastructure. They understand the
                complexities of enterprise decision-making and are here to
                support you throughout the evaluation process.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  "Technical expertise",
                  "Procurement support",
                  "Post-sale success",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Icon
                      name="CheckCircleIcon"
                      size={18}
                      className="text-green-400"
                      variant="solid"
                    />
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
