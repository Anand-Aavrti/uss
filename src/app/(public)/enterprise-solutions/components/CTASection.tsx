import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-primary via-secondary to-primary py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            Ready to Transform Your Enterprise Infrastructure?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Join hundreds of global enterprises that trust USS for their
            mission-critical infrastructure. Start your journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/pricing-plans"
              className="inline-flex items-center justify-center px-8 py-4 bg-cta text-cta-foreground rounded-lg font-semibold hover:bg-cta/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Free Trial
              <Icon name="ArrowRightIcon" size={20} className="ml-2" />
            </Link>
            <Link
              href="/global-support"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Contact Sales Team
              <Icon name="ChatBubbleLeftRightIcon" size={20} className="ml-2" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon
                  name="ShieldCheckIcon"
                  size={32}
                  className="text-white"
                  variant="solid"
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Enterprise Security
              </h3>
              <p className="text-sm text-white/80">
                SOC 2, ISO 27001, and GDPR compliant
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon
                  name="GlobeAltIcon"
                  size={32}
                  className="text-white"
                  variant="solid"
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Global Scale
              </h3>
              <p className="text-sm text-white/80">
                150+ countries with 99.99% uptime
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon
                  name="UserGroupIcon"
                  size={32}
                  className="text-white"
                  variant="solid"
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                24/7 Support
              </h3>
              <p className="text-sm text-white/80">
                Dedicated account management
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
