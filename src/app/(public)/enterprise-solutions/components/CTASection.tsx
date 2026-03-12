import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

export default function CTASection() {
  return (
    <section className="relative bg-[#08111f] py-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/5 via-transparent to-[#1B365D]/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0EA5E9]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-3xl backdrop-blur-xl bg-gradient-to-br from-[#1B365D]/40 to-[#0B1220]/60 border border-white/10 p-12 lg:p-16 text-center shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/10 via-transparent to-[#1B365D]/10 pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
              <span className="text-sm font-medium text-[#0EA5E9]">Ready to Scale Globally?</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Enterprise Infrastructure?
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-3xl mx-auto">
              Join hundreds of global enterprises that trust USS for their mission-critical
              infrastructure. Start your journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/pricing-plans"
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white overflow-hidden shadow-lg shadow-[#0EA5E9]/25 hover:shadow-[#0EA5E9]/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D]" />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Start Free Trial
                  <Icon name="ArrowRightIcon" size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/global-support"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold border-2 border-white/20 text-white hover:bg-white/5 hover:border-[#0EA5E9]/50 transition-all duration-300"
              >
                Contact Sales Team
                <Icon name="ChatBubbleLeftRightIcon" size={18} className="ml-2" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: 'ShieldCheckIcon', title: 'Enterprise Security', desc: 'SOC 2, ISO 27001, and GDPR compliant' },
                { icon: 'GlobeAltIcon', title: 'Global Scale', desc: '150+ countries with 99.99% uptime' },
                { icon: 'UserGroupIcon', title: '24/7 Support', desc: 'Dedicated account management' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0EA5E9]/20 to-[#1B365D]/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#0EA5E9]/20">
                    <Icon name={item.icon as any} size={26} className="text-[#0EA5E9]" variant="solid" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
