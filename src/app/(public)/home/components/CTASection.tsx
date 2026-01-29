'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CTASectionProps {
  currentLanguage: string;
}

const CTASection = ({ currentLanguage }: CTASectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Animated background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
    }));

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const content: Record<
    string,
    {
      heading: string;
      subheading: string;
      primaryCTA: string;
      secondaryCTA: string;
      badge: string;
      stats: { value: string; label: string }[];
      features: string[];
    }
  > = {
    en: {
      badge: '🚀 Start Building Today',
      heading: 'Ready to Build on Global Infrastructure?',
      subheading:
        'Join thousands of teams deploying with confidence across 85+ countries. Get started in minutes, scale to millions.',
      primaryCTA: 'Start Free Trial',
      secondaryCTA: 'Talk to Sales',
      stats: [
        { value: '150+', label: 'Global Deployments' },
        { value: '85', label: 'Countries' },
        { value: '99.99%', label: 'Uptime SLA' },
      ],
      features: [
        'No credit card required',
        '14-day free trial',
        'Cancel anytime',
        '24/7 support included',
      ],
    },
    hi: {
      badge: '🚀 आज ही निर्माण शुरू करें',
      heading: 'वैश्विक बुनियादी ढांचे पर निर्माण के लिए तैयार हैं?',
      subheading:
        '85+ देशों में विश्वास के साथ तैनाती करने वाली हजारों टीमों में शामिल हों। मिनटों में शुरू करें, लाखों तक पहुंचें।',
      primaryCTA: 'निःशुल्क परीक्षण शुरू करें',
      secondaryCTA: 'बिक्री से बात करें',
      stats: [
        { value: '150+', label: 'वैश्विक तैनाती' },
        { value: '85', label: 'देश' },
        { value: '99.99%', label: 'अपटाइम SLA' },
      ],
      features: [
        'क्रेडिट कार्ड की आवश्यकता नहीं',
        '14-दिन का निःशुल्क परीक्षण',
        'कभी भी रद्द करें',
        '24/7 सहायता शामिल',
      ],
    },
    ar: {
      badge: '🚀 ابدأ البناء اليوم',
      heading: 'هل أنت مستعد للبناء على البنية التحتية العالمية؟',
      subheading:
        'انضم إلى آلاف الفرق التي تنشر بثقة في أكثر من 85 دولة. ابدأ في دقائق، توسع إلى الملايين.',
      primaryCTA: 'ابدأ النسخة التجريبية المجانية',
      secondaryCTA: 'تحدث إلى المبيعات',
      stats: [
        { value: '150+', label: 'عمليات نشر عالمية' },
        { value: '85', label: 'دولة' },
        { value: '99.99%', label: 'SLA وقت التشغيل' },
      ],
      features: [
        'لا حاجة لبطاقة ائتمان',
        'تجربة مجانية لمدة 14 يومًا',
        'إلغاء في أي وقت',
        'دعم 24/7 متضمن',
      ],
    },
  };

  const currentContent = content[currentLanguage] || content.en;
  const isRTL = currentLanguage === 'ar';

  return (
    <section
      className={`relative py-16 sm:py-20 lg:py-32 bg-[#0B1220] overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
    >
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#0EA5E9]/30 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#1B365D]/40 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/10 via-transparent to-[#1B365D]/10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-8 sm:mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6 sm:mb-8">
              <span className="text-sm sm:text-base text-white font-semibold">
                {currentContent.badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {currentContent.heading}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto">
              {currentContent.subheading}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-10 sm:mb-12 max-w-2xl mx-auto">
              {currentContent.stats.map((stat, index) => (
                <div
                  key={index}
                  className="backdrop-blur-sm bg-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-white/20"
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            {isHydrated && (
              <div
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
              >
                <Link
                  href="/pricing-plans"
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-white" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-white/90 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-[#0EA5E9] flex items-center gap-2">
                    {currentContent.primaryCTA}
                    <Icon
                      name="RocketLaunchIcon"
                      size={20}
                      className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </span>
                </Link>

                <Link
                  href="/pricing-plans"
                  className="group relative inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3.5 sm:py-4 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl border-2 border-white/40 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="flex items-center gap-2">
                    {currentContent.secondaryCTA}
                    <Icon
                      name="ChatBubbleLeftRightIcon"
                      size={20}
                      className="transform group-hover:scale-110 transition-transform"
                    />
                  </span>
                </Link>
              </div>
            )}

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {currentContent.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl backdrop-blur-sm bg-white/10 border border-white/20"
                >
                  <Icon
                    name="CheckCircleIcon"
                    size={18}
                    variant="solid"
                    className="text-white flex-shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-white font-medium text-left">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Visual Element */}
          <div className="relative mt-12 sm:mt-16">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl sm:rounded-3xl border border-white/20 p-6 sm:p-8 lg:p-10">
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                {/* Feature 1 */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="BoltIcon" size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">
                      {currentLanguage === 'en'
                        ? 'Deploy in Minutes'
                        : currentLanguage === 'hi'
                          ? 'मिनटों में तैनात करें'
                          : 'النشر في دقائق'}
                    </h4>
                    <p className="text-white/70 text-xs sm:text-sm">
                      {currentLanguage === 'en'
                        ? 'Quick setup with zero configuration'
                        : currentLanguage === 'hi'
                          ? 'शून्य कॉन्फ़िगरेशन के साथ त्वरित सेटअप'
                          : 'إعداد سريع بدون تكوين'}
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="ShieldCheckIcon" size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">
                      {currentLanguage === 'en'
                        ? 'Enterprise Security'
                        : currentLanguage === 'hi'
                          ? 'एंटरप्राइज़ सुरक्षा'
                          : 'أمان المؤسسات'}
                    </h4>
                    <p className="text-white/70 text-xs sm:text-sm">
                      {currentLanguage === 'en'
                        ? 'SOC 2 compliant, GDPR ready'
                        : currentLanguage === 'hi'
                          ? 'SOC 2 अनुपालन, GDPR तैयार'
                          : 'متوافق مع SOC 2، جاهز لـ GDPR'}
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="GlobeAltIcon" size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">
                      {currentLanguage === 'en'
                        ? 'Global Scale'
                        : currentLanguage === 'hi'
                          ? 'वैश्विक स्केल'
                          : 'نطاق عالمي'}
                    </h4>
                    <p className="text-white/70 text-xs sm:text-sm">
                      {currentLanguage === 'en'
                        ? 'Distributed across 85+ countries'
                        : currentLanguage === 'hi'
                          ? '85+ देशों में वितरित'
                          : 'موزعة في أكثر من 85 دولة'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Trust Indicator */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/70 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="UserGroupIcon" size={16} />
                  <span>
                    {currentLanguage === 'en'
                      ? 'Trusted by 500+ companies'
                      : currentLanguage === 'hi'
                        ? '500+ कंपनियों द्वारा विश्वसनीय'
                        : 'موثوق به من قبل 500+ شركة'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="StarIcon" size={16} variant="solid" />
                  <span>
                    {currentLanguage === 'en'
                      ? '4.9/5 customer rating'
                      : currentLanguage === 'hi'
                        ? '4.9/5 ग्राहक रेटिंग'
                        : 'تقييم العملاء 4.9/5'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="ChatBubbleLeftEllipsisIcon" size={16} />
                  <span>
                    {currentLanguage === 'en'
                      ? 'Response time <2 hours'
                      : currentLanguage === 'hi'
                        ? 'प्रतिक्रिया समय <2 घंटे'
                        : 'وقت الاستجابة <2 ساعة'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
