import Icon from "@/components/ui/AppIcon";

interface QuickAccessCardsProps {
  currentLanguage: string;
  onChatOpen: () => void;
  onTicketOpen: () => void;
}

export default function QuickAccessCards({
  currentLanguage,
  onChatOpen,
  onTicketOpen,
}: QuickAccessCardsProps) {
  const content = {
    en: {
      title: "Quick Access",
      cards: [
        {
          icon: "ChatBubbleLeftRightIcon",
          title: "Live Chat Support",
          description:
            "Connect with our AI-powered chatbot or escalate to human agents instantly",
          action: "Start Chat",
          badge: "Available Now",
        },
        {
          icon: "TicketIcon",
          title: "Submit Support Ticket",
          description:
            "Create a detailed support request and track its progress in real-time",
          action: "Create Ticket",
          badge: "Response in 2 hours",
        },
        {
          icon: "PhoneIcon",
          title: "Emergency Hotline",
          description: "Critical issues? Call our 24/7 emergency support line",
          action: "+1-800-USS-HELP",
          badge: "24/7 Available",
        },
        {
          icon: "VideoCameraIcon",
          title: "Schedule Video Call",
          description:
            "Book a one-on-one video consultation with our technical experts",
          action: "Book Session",
          badge: "Next available: Today",
        },
      ],
    },
    hi: {
      title: "त्वरित पहुंच",
      cards: [
        {
          icon: "ChatBubbleLeftRightIcon",
          title: "लाइव चैट सहायता",
          description:
            "हमारे AI-संचालित चैटबॉट से जुड़ें या तुरंत मानव एजेंटों तक पहुंचें",
          action: "चैट शुरू करें",
          badge: "अभी उपलब्ध",
        },
        {
          icon: "TicketIcon",
          title: "सहायता टिकट सबमिट करें",
          description:
            "विस्तृत सहायता अनुरोध बनाएं और वास्तविक समय में इसकी प्रगति ट्रैक करें",
          action: "टिकट बनाएं",
          badge: "2 घंटे में प्रतिक्रिया",
        },
        {
          icon: "PhoneIcon",
          title: "आपातकालीन हॉटलाइन",
          description:
            "गंभीर समस्याएं? हमारी 24/7 आपातकालीन सहायता लाइन पर कॉल करें",
          action: "+1-800-USS-HELP",
          badge: "24/7 उपलब्ध",
        },
        {
          icon: "VideoCameraIcon",
          title: "वीडियो कॉल शेड्यूल करें",
          description:
            "हमारे तकनीकी विशेषज्ञों के साथ एक-पर-एक वीडियो परामर्श बुक करें",
          action: "सत्र बुक करें",
          badge: "अगला उपलब्ध: आज",
        },
      ],
    },
    ar: {
      title: "الوصول السريع",
      cards: [
        {
          icon: "ChatBubbleLeftRightIcon",
          title: "دعم الدردشة المباشرة",
          description:
            "اتصل بروبوت الدردشة المدعوم بالذكاء الاصطناعي أو قم بالتصعيد إلى وكلاء بشريين على الفور",
          action: "بدء الدردشة",
          badge: "متاح الآن",
        },
        {
          icon: "TicketIcon",
          title: "إرسال تذكرة الدعم",
          description: "إنشاء طلب دعم مفصل وتتبع تقدمه في الوقت الفعلي",
          action: "إنشاء تذكرة",
          badge: "الرد في ساعتين",
        },
        {
          icon: "PhoneIcon",
          title: "خط الطوارئ",
          description: "مشاكل حرجة؟ اتصل بخط الدعم الطارئ على مدار الساعة",
          action: "+1-800-USS-HELP",
          badge: "متاح 24/7",
        },
        {
          icon: "VideoCameraIcon",
          title: "جدولة مكالمة فيديو",
          description: "احجز استشارة فيديو فردية مع خبرائنا التقنيين",
          action: "حجز جلسة",
          badge: "التالي المتاح: اليوم",
        },
      ],
    },
  };

  const currentContent = content[currentLanguage as keyof typeof content];
  const isRTL = currentLanguage === "ar";

  const handleCardClick = (index: number) => {
    if (index === 0) {
      onChatOpen();
    } else if (index === 1) {
      onTicketOpen();
    }
  };

  return (
    <section className={`py-16 bg-[#08111f] ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">{currentContent.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {currentContent.cards.map((card, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              className="group relative backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl p-6 border border-white/10 hover:border-[#0EA5E9]/40 hover:shadow-xl hover:shadow-[#0EA5E9]/10 transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9]/20 to-[#1B365D]/30 rounded-xl flex items-center justify-center border border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/50 transition-colors">
                  <Icon name={card.icon as any} size={22} className="text-[#0EA5E9]" />
                </div>
                <span className="text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
                  {card.badge}
                </span>
              </div>
              <h3 className="relative text-base font-semibold text-white mb-2">{card.title}</h3>
              <p className="relative text-sm text-white/55 mb-5 leading-relaxed">{card.description}</p>
              <button className="relative w-full py-2.5 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white shadow-lg shadow-[#0EA5E9]/20 hover:shadow-[#0EA5E9]/35 transition-all duration-300">
                {card.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
