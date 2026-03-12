import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import PricingInteractive from './components/PricingInteractive';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export const metadata: Metadata = {
  title: 'Pricing Plans - USS',
  description:
    'Transparent pricing for global infrastructure solutions. Choose from Starter, Professional, or Enterprise plans with flexible billing options and comprehensive features for teams of all sizes.',
};

export default function PricingPlansPage() {
  return (
    <div className="min-h-screen bg-[#0B1220]">
      <main className="pt-[74px]">
        {/* Hero Section */}
        <section className="relative bg-[#0B1220] overflow-hidden py-20 px-6">
          <div className="absolute -top-20 left-1/4 w-96 h-96 bg-[#0EA5E9]/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-[#1B365D]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-7xl mx-auto text-center z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
              <span className="text-sm font-medium text-[#0EA5E9]">Flexible Plans for Every Team</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg md:text-xl text-white/65 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your team. Scale as you grow with flexible options
              designed for global infrastructure needs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
              {['14-day free trial', 'No credit card required', 'Cancel anytime'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Icon name="CheckCircleIcon" size={18} variant="solid" className="text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Pricing Content */}
        <section className="py-16 px-6 bg-[#08111f]">
          <div className="max-w-7xl mx-auto">
            <PricingInteractive />
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-20 px-6 bg-[#0B1220]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">Trusted by Teams Worldwide</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Join thousands of organizations that rely on USS for their global infrastructure
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: 'ShieldCheckIcon', title: 'Enterprise Security', desc: 'SOC 2 Type II certified with GDPR compliance and advanced security features' },
                { icon: 'ClockIcon', title: '99.99% Uptime', desc: 'Industry-leading reliability with multi-region deployment and redundancy' },
                { icon: 'UserGroupIcon', title: '24/7 Support', desc: 'Global support team available around the clock in multiple languages' },
              ].map((item, i) => (
                <div key={i} className="group backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl p-8 text-center border border-white/10 hover:border-[#0EA5E9]/30 hover:shadow-xl hover:shadow-[#0EA5E9]/10 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0EA5E9]/20 to-[#1B365D]/30 rounded-full flex items-center justify-center mx-auto mb-5 border border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/50 transition-colors">
                    <Icon name={item.icon as any} size={28} variant="solid" className="text-[#0EA5E9]" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/55">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-6 bg-[#08111f] overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-[#0EA5E9]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-4xl mx-auto">
            <div className="relative rounded-3xl backdrop-blur-xl bg-gradient-to-br from-[#1B365D]/40 to-[#0B1220]/60 border border-white/10 p-10 md:p-14 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/8 via-transparent to-[#1B365D]/8 pointer-events-none" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-lg text-white/65 mb-8 max-w-2xl mx-auto">
                  Start your 14-day free trial today. No credit card required. Experience the power
                  of global infrastructure.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/pricing-plans"
                    className="group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden shadow-lg shadow-[#0EA5E9]/25 hover:shadow-[#0EA5E9]/40 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D]" />
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">Start Free Trial</span>
                    <Icon name="ArrowRightIcon" size={18} className="relative group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/global-support"
                    className="px-8 py-4 rounded-xl font-semibold border-2 border-white/20 text-white hover:bg-white/5 hover:border-[#0EA5E9]/50 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <span>Contact Sales</span>
                    <Icon name="ChatBubbleLeftRightIcon" size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#08111f] border-t border-white/10 py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {[
                { title: 'Product', links: [{ label: 'Features', href: '/products-overview' }, { label: 'Pricing', href: '/pricing-plans' }, { label: 'Enterprise', href: '/enterprise-solutions' }] },
                { title: 'Resources', links: [{ label: 'Case Studies', href: '/customer-stories' }, { label: 'Support', href: '/global-support' }] },
                { title: 'Company', links: [{ label: 'About', href: '/home' }, { label: 'Contact', href: '/global-support' }] },
                { title: 'Legal', links: [{ label: 'Privacy Policy', href: '/home' }, { label: 'Terms of Service', href: '/home' }] },
              ].map((col) => (
                <div key={col.title}>
                  <h3 className="text-sm font-semibold text-white mb-4">{col.title}</h3>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/50 hover:text-[#0EA5E9] transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-8 text-center">
              <p className="text-sm text-white/40">
                © {new Date().getFullYear()} USS Global Infrastructure. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
