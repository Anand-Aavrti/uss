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
      className={`relative bg-gradient-to-br from-primary via-secondary to-primary py-20 ${isRTL ? "rtl" : "ltr"}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(14,165,233,0.1),transparent_50%)]"></div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <button
              onClick={() => onLanguageChange("en")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                currentLanguage === "en"
                  ? "bg-white text-primary shadow-md"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange("hi")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                currentLanguage === "hi"
                  ? "bg-white text-primary shadow-md"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageChange("ar")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                currentLanguage === "ar"
                  ? "bg-white text-primary shadow-md"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              العربية
            </button>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto">
            {currentContent.subtitle}
          </p>
          <p className="text-base text-white/80 max-w-2xl mx-auto">
            {currentContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentContent.features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Icon
                    name={feature.icon as any}
                    size={24}
                    className="text-white"
                  />
                </div>
              </div>
              <p className="text-white font-medium">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
