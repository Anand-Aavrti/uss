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
    <div className="min-h-screen bg-background">
      <main className="pt-[72px]">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your team. Scale as you grow with flexible options
              designed for global infrastructure needs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Pricing Content */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <PricingInteractive />
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Trusted by Teams Worldwide
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join thousands of organizations that rely on USS for their global infrastructure
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 text-center border border-border shadow-sm">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="ShieldCheckIcon" size={32} variant="solid" className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Enterprise Security</h3>
                <p className="text-sm text-muted-foreground">
                  SOC 2 Type II certified with GDPR compliance and advanced security features
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 text-center border border-border shadow-sm">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="ClockIcon" size={32} variant="solid" className="text-success" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">99.99% Uptime</h3>
                <p className="text-sm text-muted-foreground">
                  Industry-leading reliability with multi-region deployment and redundancy
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 text-center border border-border shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="UserGroupIcon" size={32} variant="solid" className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Global support team available around the clock in multiple languages
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Start your 14-day free trial today. No credit card required. Experience the power of
              global infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pricing-plans"
                className="px-8 py-4 bg-card text-primary rounded-lg font-semibold text-base hover:bg-card/90 transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <Icon name="ArrowRightIcon" size={20} />
              </Link>
              <Link
                href="/global-support"
                className="px-8 py-4 bg-transparent border-2 border-primary-foreground text-primary-foreground rounded-lg font-semibold text-base hover:bg-primary-foreground/10 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>Contact Sales</span>
                <Icon name="ChatBubbleLeftRightIcon" size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/products-overview"
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing-plans"
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/enterprise-solutions"
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                    >
                      Enterprise
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/customer-stories"
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                    >
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/global-support"
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/home"
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/global-support"
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/home"
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/home"
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-primary-foreground/20 pt-8 text-center">
              <p className="text-sm text-primary-foreground/80">
                © {new Date().getFullYear()} USS Global Infrastructure. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
