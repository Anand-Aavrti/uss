import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface HeroSectionProps {
  onDemoClick: () => void;
  onContactClick: () => void;
}

export default function HeroSection({
  onDemoClick,
  onContactClick,
}: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-400 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Icon
                name="ShieldCheckIcon"
                size={20}
                className="text-accent"
                variant="solid"
              />
              <span className="text-sm font-medium text-white">
                Enterprise-Grade Security & Compliance
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white leading-tight">
              Infrastructure Built for Global Enterprise Scale
            </h1>

            <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
              Deploy with confidence across continents. USS delivers the
              security, compliance, and reliability that enterprise teams
              demand, with the cultural intelligence that global organizations
              require.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onDemoClick}
                className="inline-flex items-center justify-center px-8 py-4 bg-cta text-cta-foreground rounded-lg font-semibold hover:bg-cta/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Schedule Enterprise Demo
                <Icon name="ArrowRightIcon" size={20} className="ml-2" />
              </button>
              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Contact Sales
                <Icon
                  name="ChatBubbleLeftRightIcon"
                  size={20}
                  className="ml-2"
                />
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">99.99%</div>
                <div className="text-sm text-white/80">Uptime SLA</div>
              </div>
              <div className="h-12 w-px bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">150+</div>
                <div className="text-sm text-white/80">Countries</div>
              </div>
              <div className="h-12 w-px bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-white/80">Support</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1774d8558-1765112858507.png"
                alt="Diverse enterprise team collaborating in modern office with digital screens showing global infrastructure dashboard"
                className="w-full h-auto"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Icon
                    name="CheckBadgeIcon"
                    size={32}
                    className="text-success"
                    variant="solid"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    SOC 2 Type II Certified
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Independently verified security controls
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
