import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

interface SupportFooterProps {
  currentLanguage: string;
}

export default function SupportFooter({ currentLanguage }: SupportFooterProps) {
  const content = {
    en: {
      title: "Need More Help?",
      description: "Our support team is available 24/7 to assist you with any questions or concerns.",
      contactOptions: [
        { icon: "EnvelopeIcon", title: "Email Support", value: "support@uss-global.com", description: "Response within 2 hours" },
        { icon: "PhoneIcon", title: "Phone Support", value: "+1-800-USS-HELP", description: "24/7 availability" },
        { icon: "MapPinIcon", title: "Global Offices", value: "15+ locations worldwide", description: "Find your nearest office" },
      ],
      copyright: `© ${new Date().getFullYear()} USS Global Infrastructure. All rights reserved.`,
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Security", href: "/security" },
      ],
    },
    hi: {
      title: "अधिक सहायता चाहिए?",
      description: "हमारी सहायता टीम किसी भी प्रश्न या चिंता में आपकी सहायता के लिए 24/7 उपलब्ध है।",
      contactOptions: [
        { icon: "EnvelopeIcon", title: "ईमेल सहायता", value: "support@uss-global.com", description: "2 घंटे के भीतर प्रतिक्रिया" },
        { icon: "PhoneIcon", title: "फोन सहायता", value: "+1-800-USS-HELP", description: "24/7 उपलब्धता" },
        { icon: "MapPinIcon", title: "वैश्विक कार्यालय", value: "दुनिया भर में 15+ स्थान", description: "अपना निकटतम कार्यालय खोजें" },
      ],
      copyright: `© ${new Date().getFullYear()} USS वैश्विक बुनियादी ढांचा। सर्वाधिकार सुरक्षित।`,
      links: [
        { label: "गोपनीयता नीति", href: "/privacy" },
        { label: "सेवा की शर्तें", href: "/terms" },
        { label: "सुरक्षा", href: "/security" },
      ],
    },
    ar: {
      title: "هل تحتاج إلى مزيد من المساعدة؟",
      description: "فريق الدعم لدينا متاح على مدار الساعة طوال أيام الأسبوع لمساعدتك في أي أسئلة أو مخاوف.",
      contactOptions: [
        { icon: "EnvelopeIcon", title: "دعم البريد الإلكتروني", value: "support@uss-global.com", description: "الرد في غضون ساعتين" },
        { icon: "PhoneIcon", title: "دعم الهاتف", value: "+1-800-USS-HELP", description: "متاح 24/7" },
        { icon: "MapPinIcon", title: "المكاتب العالمية", value: "أكثر من 15 موقعًا في جميع أنحاء العالم", description: "ابحث عن أقرب مكتب لك" },
      ],
      copyright: `© ${new Date().getFullYear()} USS البنية التحتية العالمية. جميع الحقوق محفوظة.`,
      links: [
        { label: "سياسة الخصوصية", href: "/privacy" },
        { label: "شروط الخدمة", href: "/terms" },
        { label: "الأمان", href: "/security" },
      ],
    },
  };

  const currentContent = content[currentLanguage as keyof typeof content];
  const isRTL = currentLanguage === "ar";

  return (
    <footer className={`relative bg-[#08111f] border-t border-white/10 py-20 overflow-hidden ${isRTL ? "rtl" : "ltr"}`}>
      {/* Decorative orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#0EA5E9]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#1B365D]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
            <span className="text-sm font-medium text-[#0EA5E9]">24/7 Support</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{currentContent.title}</h2>
          <p className="text-white/60 max-w-2xl mx-auto">{currentContent.description}</p>
        </div>

        {/* Contact option cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {currentContent.contactOptions.map((option, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl p-8 text-center border border-white/10 hover:border-[#0EA5E9]/40 hover:shadow-xl hover:shadow-[#0EA5E9]/10 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative">
                <div className="flex justify-center mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0EA5E9]/20 to-[#1B365D]/30 rounded-full flex items-center justify-center border border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/50 transition-colors">
                    <Icon name={option.icon as any} size={26} className="text-[#0EA5E9]" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-white/80 mb-2">{option.title}</h3>
                <p className="text-lg font-bold text-white mb-1">{option.value}</p>
                <p className="text-sm text-white/50">{option.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">{currentContent.copyright}</p>
            <div className="flex gap-6 flex-wrap justify-center">
              {currentContent.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-white/40 hover:text-[#0EA5E9] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
