'use client';

import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  onDemoClick: () => void;
  onContactClick: () => void;
}

export default function HeroSection({ onDemoClick, onContactClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-[#0B1220] overflow-hidden pt-[74px]">
      {/* Decorative orbs */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-[#0EA5E9]/15 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div
        className="absolute -bottom-32 -right-20 w-96 h-96 bg-[#1B365D]/25 rounded-full blur-3xl animate-pulse pointer-events-none"
        style={{ animationDelay: '1.5s' }}
      />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#0EA5E9]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text + CTA */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
              <Icon name="ShieldCheckIcon" size={16} className="text-[#0EA5E9]" variant="solid" />
              <span className="text-sm font-medium text-[#0EA5E9]">
                Enterprise-Grade Security &amp; Compliance
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight">
              Infrastructure Built for{' '}
              <span className="bg-gradient-to-r from-[#0EA5E9] to-[#38bdf8] bg-clip-text text-transparent">
                Global Enterprise
              </span>{' '}
              Scale
            </h1>

            <p className="text-lg lg:text-xl text-white/75 leading-relaxed">
              Deploy with confidence across continents. USS delivers the security, compliance, and
              reliability that enterprise teams demand, with the cultural intelligence that global
              organizations require.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onDemoClick}
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white overflow-hidden shadow-lg shadow-[#0EA5E9]/25 hover:shadow-[#0EA5E9]/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D]" />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  Schedule Enterprise Demo
                  <Icon
                    name="ArrowRightIcon"
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </button>
              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold border-2 border-white/20 text-white hover:bg-white/5 hover:border-[#0EA5E9]/50 transition-all duration-300"
              >
                Contact Sales
                <Icon name="ChatBubbleLeftRightIcon" size={18} className="ml-2" />
              </button>
            </div>

            <div className="flex items-center gap-10 pt-4">
              {[
                { value: '99.99%', label: 'Uptime SLA' },
                { value: '150+', label: 'Countries' },
                { value: '24/7', label: 'Support' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-[#0EA5E9]">{stat.value}</div>
                  <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Glassmorphism dashboard card */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative rounded-2xl backdrop-blur-xl bg-gradient-to-br from-[#1B365D]/40 to-[#0B1220]/60 border border-white/10 shadow-2xl p-8">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0EA5E9]/5 via-transparent to-[#1B365D]/10 pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] flex items-center justify-center">
                      <Icon name="ServerStackIcon" size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">Global Infrastructure</div>
                      <div className="text-white/50 text-xs">150+ regions active</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-medium">All Systems Operational</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Uptime', value: '99.99%', color: 'text-green-400' },
                    { label: 'Latency', value: '<50ms', color: 'text-[#0EA5E9]' },
                    { label: 'Incidents', value: '0', color: 'text-green-400' },
                    { label: 'Users', value: '50K+', color: 'text-[#0EA5E9]' },
                    { label: 'Regions', value: '150+', color: 'text-[#0EA5E9]' },
                    { label: 'SLA Met', value: '100%', color: 'text-green-400' },
                  ].map((m, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-[#1B365D]/30 border border-white/10 p-3 hover:border-[#0EA5E9]/40 transition-colors"
                    >
                      <div className={`text-lg font-bold ${m.color}`}>{m.value}</div>
                      <div className="text-white/50 text-xs mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="relative rounded-xl bg-gradient-to-r from-[#0EA5E9]/15 to-[#1B365D]/20 border border-[#0EA5E9]/30 p-4 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/5 to-transparent animate-pulse pointer-events-none" />
                  <div className="relative flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] flex items-center justify-center flex-shrink-0">
                      <Icon name="ShieldCheckIcon" size={18} className="text-white" variant="solid" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">SOC 2 Type II Certified</div>
                      <div className="text-white/60 text-xs">GDPR · ISO 27001 · HIPAA · PCI DSS</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-6 px-4 py-3 rounded-xl bg-gradient-to-r from-[#1B365D]/90 to-[#0EA5E9]/90 backdrop-blur-lg border border-white/20 shadow-2xl">
              <div className="flex items-center gap-3">
                <Icon name="BoltIcon" size={18} className="text-white" variant="solid" />
                <div>
                  <div className="font-semibold text-white text-sm">Sub-50ms Latency</div>
                  <div className="text-white/70 text-xs">Globally distributed edge</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
