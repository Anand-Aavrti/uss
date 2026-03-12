import Icon from "@/components/ui/AppIcon";

interface SupportHeroProps {
  onLanguageChange: (lang: string) => void;
  currentLanguage: string;
}

export default function SupportHero({
  onLanguageChange,
  currentLanguage,
}: SupportHeroProps) {
  const content = {
    en: {
      title: "Global Support",
      subtitle: "We're here to help you succeed, wherever you are in the world",
      description:
        "Access 24/7 multilingual support, comprehensive documentation, and an active community of experts across all time zones.",
      features: [
        { icon: "ClockIcon", text: "24/7 Support Coverage" },
        { icon: "GlobeAltIcon", text: "Multi-Language Assistance" },
        { icon: "UserGroupIcon", text: "Active Community Forums" },
        { icon: "DocumentTextIcon", text: "Extensive Knowledge Base" },
      ],
    },
    hi: {
      title: "वैश्विक सहायता",
      subtitle:
        "हम आपकी सफलता में मदद के लिए यहां हैं, चाहे आप दुनिया में कहीं भी हों",
      description:
        "24/7 बहुभाषी सहायता, व्यापक दस्तावेज़ीकरण, और सभी समय क्षेत्रों में विशेषज्ञों के सक्रिय समुदाय तक पहुंच प्राप्त करें।",
      features: [
        { icon: "ClockIcon", text: "24/7 सहायता कवरेज" },
        { icon: "GlobeAltIcon", text: "बहु-भाषा सहायता" },
        { icon: "UserGroupIcon", text: "सक्रिय समुदाय मंच" },
        { icon: "DocumentTextIcon", text: "व्यापक ज्ञान आधार" },
      ],
    },
    ar: {
      title: "الدعم العالمي",
      subtitle: "نحن هنا لمساعدتك على النجاح، أينما كنت في العالم",
      description:
        "احصل على دعم متعدد اللغات على مدار الساعة طوال أيام الأسبوع، ووثائق شاملة، ومجتمع نشط من الخبراء عبر جميع المناطق الزمنية.",
      features: [
        { icon: "ClockIcon", text: "تغطية الدعم على مدار الساعة" },
        { icon: "GlobeAltIcon", text: "المساعدة متعددة اللغات" },
        { icon: "UserGroupIcon", text: "منتديات المجتمع النشطة" },
        { icon: "DocumentTextIcon", text: "قاعدة معرفية واسعة" },
      ],
    },
  };

  const currentContent = content[currentLanguage as keyof typeof content];
  const isRTL = currentLanguage === "ar";

  return (
    <section
      className={`relative bg-[#0B1220] overflow-hidden pt-[74px] pb-20 ${isRTL ? 'rtl' : 'ltr'}`}
    >
      {/* Decorative orbs */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-[#0EA5E9]/12 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div
        className="absolute -bottom-24 -right-20 w-96 h-96 bg-[#1B365D]/20 rounded-full blur-3xl animate-pulse pointer-events-none"
        style={{ animationDelay: '1.5s' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 z-10">
        <div className="text-center mb-12">
          {/* Language switcher */}
          <div className="flex justify-center items-center gap-3 mb-8">
            {[
              { code: 'en', label: 'English' },
              { code: 'hi', label: 'हिंदी' },
              { code: 'ar', label: 'العربية' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentLanguage === lang.code
                    ? 'bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white shadow-lg shadow-[#0EA5E9]/25'
                    : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
            <span className="text-sm font-medium text-[#0EA5E9]">24/7 Worldwide Coverage</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            {currentContent.title}
          </h1>
          <p className="text-xl text-white/70 mb-4 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
          <p className="text-base text-white/55 max-w-2xl mx-auto">
            {currentContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {currentContent.features.map((feature, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl p-6 text-center border border-white/10 hover:border-[#0EA5E9]/40 hover:shadow-lg hover:shadow-[#0EA5E9]/10 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9]/20 to-[#1B365D]/30 rounded-full flex items-center justify-center border border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/50 transition-colors">
                  <Icon name={feature.icon as any} size={22} className="text-[#0EA5E9]" />
                </div>
              </div>
              <p className="relative text-white/80 font-medium text-sm">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
