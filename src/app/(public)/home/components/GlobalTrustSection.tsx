import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface GlobalTrustSectionProps {
  currentLanguage: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  region: string;
  image: string;
  alt: string;
}

const GlobalTrustSection = ({ currentLanguage }: GlobalTrustSectionProps) => {
  const content: Record<
    string,
    { heading: string; subheading: string; testimonials: Testimonial[] }
  > = {
    en: {
      heading: "Trusted by Teams Worldwide",
      subheading:
        "Organizations across continents rely on USS for their critical infrastructure",
      testimonials: [
        {
          quote:
            "USS has transformed how we deploy globally. The reliability and performance are unmatched.",
          author: "Sarah Chen",
          role: "CTO",
          company: "TechVision Global",
          region: "Singapore",
          image:
            "https://img.rocket.new/generatedImages/rocket_gen_img_1abe8c93c-1763293838123.png",
          alt: "Professional Asian woman with long black hair in navy blazer smiling confidently in modern office",
        },
        {
          quote:
            "The security compliance and audit capabilities gave us confidence to migrate our entire infrastructure.",
          author: "Ahmed Al-Rashid",
          role: "Head of Infrastructure",
          company: "Emirates Digital",
          region: "Dubai",
          image:
            "https://img.rocket.new/generatedImages/rocket_gen_img_173f3b8a3-1763294935065.png",
          alt: "Middle Eastern man with short dark hair in white shirt and tie in professional business setting",
        },
        {
          quote:
            "Outstanding developer experience. Our team was productive from day one with excellent documentation.",
          author: "Priya Sharma",
          role: "Lead Developer",
          company: "InnovateTech India",
          region: "Mumbai",
          image:
            "https://img.rocket.new/generatedImages/rocket_gen_img_159c3e52f-1763295839833.png",
          alt: "Indian woman with shoulder-length black hair wearing glasses and blue top in tech workspace",
        },
      ],
    },
    hi: {
      heading: "दुनिया भर की टीमों द्वारा विश्वसनीय",
      subheading:
        "महाद्वीपों में संगठन अपने महत्वपूर्ण बुनियादी ढांचे के लिए USS पर भरोसा करते हैं",
      testimonials: [
        {
          quote:
            "USS ने वैश्विक स्तर पर हमारी तैनाती के तरीके को बदल दिया है। विश्वसनीयता और प्रदर्शन बेजोड़ हैं।",
          author: "सारा चेन",
          role: "सीटीओ",
          company: "टेकविज़न ग्लोबल",
          region: "सिंगापुर",
          image:
            "https://img.rocket.new/generatedImages/rocket_gen_img_1abe8c93c-1763293838123.png",
          alt: "आधुनिक कार्यालय में नेवी ब्लेज़र में आत्मविश्वास से मुस्कुराती लंबे काले बालों वाली पेशेवर एशियाई महिला",
        },
        {
          quote:
            "सुरक्षा अनुपालन और ऑडिट क्षमताओं ने हमें अपने पूरे बुनियादी ढांचे को माइग्रेट करने का विश्वास दिया।",
          author: "अहमद अल-रशीद",
          role: "बुनियादी ढांचा प्रमुख",
          company: "एमिरेट्स डिजिटल",
          region: "दुबई",
          image:
            "https://img.rocket.new/generatedImages/rocket_gen_img_173f3b8a3-1763294935065.png",
          alt: "पेशेवर व्यावसायिक सेटिंग में सफेद शर्ट और टाई में छोटे काले बालों वाला मध्य पूर्वी पुरुष",
        },
        {
          quote:
            "उत्कृष्ट डेवलपर अनुभव। उत्कृष्ट दस्तावेज़ीकरण के साथ हमारी टीम पहले दिन से उत्पादक थी।",
          author: "प्रिया शर्मा",
          role: "लीड डेवलपर",
          company: "इनोवेटटेक इंडिया",
          region: "मुंबई",
          image:
            "https://img.rocket.new/generatedImages/rocket_gen_img_12109ed8b-1763300875941.png",
          alt: "तकनीकी कार्यस्थल में चश्मा और नीला टॉप पहने कंधे की लंबाई के काले बालों वाली भारतीय महिला",
        },
      ],
    },
    ar: {
      heading: "موثوق به من قبل الفرق في جميع أنحاء العالم",
      subheading: "تعتمد المؤسسات عبر القارات على USS لبنيتها التحتية الحيوية",
      testimonials: [
        {
          quote:
            "لقد غيرت USS الطريقة التي ننشر بها عالميًا. الموثوقية والأداء لا مثيل لهما.",
          author: "سارة تشين",
          role: "المدير التنفيذي للتكنولوجيا",
          company: "تك فيجن جلوبال",
          region: "سنغافورة",
          image:
            "https://img.rocket.new/generatedImages/rocket_gen_img_1f1230b9d-1763294070661.png",
          alt: "امرأة آسيوية محترفة ذات شعر أسود طويل في سترة زرقاء داكنة تبتسم بثقة في مكتب حديث",
        },
        {
          quote:
            "أعطتنا قدرات الامتثال الأمني والتدقيق الثقة لترحيل بنيتنا التحتية بالكامل.",
          author: "أحمد الراشد",
          role: "رئيس البنية التحتية",
          company: "الإمارات الرقمية",
          region: "دبي",
          image:
            "https://img.rocket.new/generatedImages/rocket_gen_img_173f3b8a3-1763294935065.png",
          alt: "رجل من الشرق الأوسط بشعر داكن قصير في قميص أبيض وربطة عنق في بيئة عمل احترافية",
        },
        {
          quote:
            "تجربة مطور رائعة. كان فريقنا منتجًا من اليوم الأول مع وثائق ممتازة.",
          author: "بريا شارما",
          role: "مطور رئيسي",
          company: "إنوفيت تك الهند",
          region: "مومباي",
          image:
            "https://img.rocket.new/generatedImages/rocket_gen_img_159c3e52f-1763295839833.png",
          alt: "امرأة هندية بشعر أسود بطول الكتف ترتدي نظارات وقميص أزرق في مساحة عمل تقنية",
        },
      ],
    },
  };

  const currentContent = content[currentLanguage] || content.en;
  const isRTL = currentLanguage === "ar";

  const certifications = [
    { name: "ISO 27001", icon: "ShieldCheckIcon" },
    { name: "SOC 2 Type II", icon: "LockClosedIcon" },
    { name: "GDPR Compliant", icon: "CheckBadgeIcon" },
    { name: "HIPAA Ready", icon: "DocumentCheckIcon" },
  ];

  return (
    <section className={`py-20 lg:py-28 bg-surface ${isRTL ? "rtl" : "ltr"}`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 ${isRTL ? "text-right" : "text-left"} lg:text-center`}
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            {currentContent.heading}
          </h2>
          <p className="text-lg text-muted-foreground">
            {currentContent.subheading}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {currentContent.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={testimonial.image}
                    alt={testimonial.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-accent truncate">
                    {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4 italic">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="MapPinIcon" size={16} />
                <span>{testimonial.region}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-card rounded-xl p-8 border border-border">
          <h3 className="text-xl font-heading font-semibold text-foreground text-center mb-8">
            {currentLanguage === "en"
              ? "Security & Compliance Certifications"
              : currentLanguage === "hi"
                ? "सुरक्षा और अनुपालन प्रमाणपत्र"
                : "شهادات الأمن والامتثال"}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-muted transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-trust-builder/10 rounded-full flex items-center justify-center">
                  <Icon
                    name={cert.icon as any}
                    size={24}
                    className="text-trust-builder"
                  />
                </div>
                <span className="text-sm font-medium text-foreground text-center">
                  {cert.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalTrustSection;
