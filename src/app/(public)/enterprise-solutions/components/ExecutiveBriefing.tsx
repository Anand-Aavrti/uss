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
    <section className="bg-surface py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
            <Icon name="VideoCameraIcon" size={20} className="text-accent" />
            <span className="text-sm font-medium text-accent">
              Executive Briefing Center
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Schedule Your Executive Demo
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get a personalized demonstration tailored to your
            organization&apos;s specific needs and decision-making criteria.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
              What to Expect
            </h3>
            <div className="space-y-4">
              {briefingTopics.map((topic, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon
                          name={topic.icon as any}
                          size={20}
                          className="text-primary"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-semibold text-foreground">
                          {topic.title}
                        </h4>
                        <span className="text-xs font-medium text-muted-foreground bg-surface px-2 py-1 rounded">
                          {topic.duration}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {topic.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-accent/10 rounded-xl p-6 border border-accent/20">
              <div className="flex items-start space-x-3">
                <Icon
                  name="InformationCircleIcon"
                  size={24}
                  className="text-accent flex-shrink-0 mt-0.5"
                />
                <div>
                  <h4 className="text-base font-semibold text-foreground mb-2">
                    Customizable Agenda
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We tailor each briefing to your specific interests and
                    concerns. Let us know your priorities when scheduling, and
                    we&apos;ll adjust the agenda accordingly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
              <div className="relative h-48 bg-gradient-to-br from-primary to-secondary">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon
                    name="VideoCameraIcon"
                    size={64}
                    className="text-white/30"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-xl font-semibold text-white">
                    Schedule Your Demo
                  </h3>
                </div>
              </div>

              <div className="p-8">
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      placeholder="john.doe@company.com"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Company"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      placeholder="CTO, VP Engineering, etc."
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company Size
                    </label>
                    <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300">
                      <option value="">Select company size</option>
                      <option value="1-50">1-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1,000 employees</option>
                      <option value="1001-5000">1,001-5,000 employees</option>
                      <option value="5001+">5,001+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Primary Interest
                    </label>
                    <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300">
                      <option value="">Select primary interest</option>
                      <option value="security">Security & Compliance</option>
                      <option value="scalability">
                        Scalability & Performance
                      </option>
                      <option value="integration">
                        Integration & Migration
                      </option>
                      <option value="cost">Cost Optimization</option>
                      <option value="support">Support & Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your specific requirements or questions..."
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-cta text-cta-foreground rounded-lg font-semibold hover:bg-cta/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
                  >
                    Schedule Executive Demo
                    <Icon name="CalendarIcon" size={20} className="ml-2" />
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy and
                    terms of service.
                  </p>
                </form>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  1-2 hrs
                </div>
                <div className="text-xs text-muted-foreground">
                  Demo Duration
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  24 hrs
                </div>
                <div className="text-xs text-muted-foreground">
                  Response Time
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  Custom
                </div>
                <div className="text-xs text-muted-foreground">
                  Tailored Agenda
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_124b761b2-1763293403636.png"
                  alt="Professional headshot of enterprise sales director in navy suit with confident smile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Meet Your Enterprise Team
              </h4>
              <p className="text-muted-foreground mb-4">
                Our enterprise specialists have helped hundreds of organizations
                successfully deploy USS infrastructure. They understand the
                complexities of enterprise decision-making and are here to
                support you throughout the evaluation process.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Icon
                    name="CheckCircleIcon"
                    size={20}
                    className="text-success"
                    variant="solid"
                  />
                  <span className="text-sm text-foreground">
                    Technical expertise
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon
                    name="CheckCircleIcon"
                    size={20}
                    className="text-success"
                    variant="solid"
                  />
                  <span className="text-sm text-foreground">
                    Procurement support
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon
                    name="CheckCircleIcon"
                    size={20}
                    className="text-success"
                    variant="solid"
                  />
                  <span className="text-sm text-foreground">
                    Post-sale success
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
