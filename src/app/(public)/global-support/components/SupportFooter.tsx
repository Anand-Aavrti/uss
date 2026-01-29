import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

interface SupportFooterProps {
  currentLanguage: string;
}

export default function SupportFooter({ currentLanguage }: SupportFooterProps) {
  const content = {
    en: {
      title: "Need More Help?",
      description:
        "Our support team is available 24/7 to assist you with any questions or concerns.",
      contactOptions: [
        {
          icon: "EnvelopeIcon",
          title: "Email Support",
          value: "support@uss-global.com",
          description: "Response within 2 hours",
        },
        {
          icon: "PhoneIcon",
          title: "Phone Support",
          value: "+1-800-USS-HELP",
          description: "24/7 availability",
        },
        {
          icon: "MapPinIcon",
          title: "Global Offices",
          value: "15+ locations worldwide",
          description: "Find your nearest office",
        },
      ],
      socialTitle: "Connect With Us",
      copyright: `© ${new Date().getFullYear()} USS Global Infrastructure. All rights reserved.`,
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Security", href: "/security" },
      ],
    },
    hi: {
      title: "अधिक सहायता चाहिए?",
      description:
        "हमारी सहायता टीम किसी भी प्रश्न या चिंता में आपकी सहायता के लिए 24/7 उपलब्ध है।",
      contactOptions: [
        {
          icon: "EnvelopeIcon",
          title: "ईमेल सहायता",
          value: "support@uss-global.com",
          description: "2 घंटे के भीतर प्रतिक्रिया",
        },
        {
          icon: "PhoneIcon",
          title: "फोन सहायता",
          value: "+1-800-USS-HELP",
          description: "24/7 उपलब्धता",
        },
        {
          icon: "MapPinIcon",
          title: "वैश्विक कार्यालय",
          value: "दुनिया भर में 15+ स्थान",
          description: "अपना निकटतम कार्यालय खोजें",
        },
      ],
      socialTitle: "हमसे जुड़ें",
      copyright: `© ${new Date().getFullYear()} USS वैश्विक बुनियादी ढांचा। सर्वाधिकार सुरक्षित।`,
      links: [
        { label: "गोपनीयता नीति", href: "/privacy" },
        { label: "सेवा की शर्तें", href: "/terms" },
        { label: "सुरक्षा", href: "/security" },
      ],
    },
    ar: {
      title: "هل تحتاج إلى مزيد من المساعدة؟",
      description:
        "فريق الدعم لدينا متاح على مدار الساعة طوال أيام الأسبوع لمساعدتك في أي أسئلة أو مخاوف.",
      contactOptions: [
        {
          icon: "EnvelopeIcon",
          title: "دعم البريد الإلكتروني",
          value: "support@uss-global.com",
          description: "الرد في غضون ساعتين",
        },
        {
          icon: "PhoneIcon",
          title: "دعم الهاتف",
          value: "+1-800-USS-HELP",
          description: "متاح 24/7",
        },
        {
          icon: "MapPinIcon",
          title: "المكاتب العالمية",
          value: "أكثر من 15 موقعًا في جميع أنحاء العالم",
          description: "ابحث عن أقرب مكتب لك",
        },
      ],
      socialTitle: "تواصل معنا",
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
    <footer
      className={`bg-primary text-primary-foreground py-16 ${isRTL ? "rtl" : "ltr"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{currentContent.title}</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            {currentContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {currentContent.contactOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Icon
                    name={option.icon as any}
                    size={24}
                    className="text-white"
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
              <p className="text-xl font-bold mb-1">{option.value}</p>
              <p className="text-sm text-primary-foreground/70">
                {option.description}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary-foreground/70">
              {currentContent.copyright}
            </p>
            <div className="flex space-x-6">
              {currentContent.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
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
