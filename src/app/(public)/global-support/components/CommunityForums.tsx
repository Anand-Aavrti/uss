import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface CommunityForumsProps {
  currentLanguage: string;
}

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  authorImage: string;
  authorAlt: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  badges: string[];
  isAnswered: boolean;
}

export default function CommunityForums({
  currentLanguage,
}: CommunityForumsProps) {
  const content = {
    en: {
      title: "Community Forums",
      subtitle:
        "Join thousands of developers and experts sharing knowledge and solving problems together",
      joinButton: "Join Community",
      categories: [
        {
          name: "General Discussion",
          count: 1248,
          icon: "ChatBubbleLeftRightIcon",
        },
        {
          name: "Technical Support",
          count: 856,
          icon: "WrenchScrewdriverIcon",
        },
        { name: "Feature Requests", count: 432, icon: "LightBulbIcon" },
        { name: "Best Practices", count: 624, icon: "AcademicCapIcon" },
      ],

      topics: [
        {
          id: 1,
          title: "How to implement multi-region failover with USS?",
          author: "Sarah Chen",
          authorImage:
            "https://img.rocket.new/generatedImages/rocket_gen_img_18a713e78-1763297858426.png",
          authorAlt:
            "Professional headshot of Asian woman with long black hair in white blouse",
          category: "Technical Support",
          replies: 24,
          views: 1842,
          lastActivity: "2 hours ago",
          badges: ["Expert", "Top Contributor"],
          isAnswered: true,
        },
        {
          id: 2,
          title: "Best practices for API rate limiting in production",
          author: "Mohammed Al-Rashid",
          authorImage:
            "https://img.rocket.new/generatedImages/rocket_gen_img_1c7263203-1763291891265.png",
          authorAlt:
            "Professional headshot of Middle Eastern man with short dark hair in navy suit",
          category: "Best Practices",
          replies: 18,
          views: 1256,
          lastActivity: "4 hours ago",
          badges: ["Verified User"],
          isAnswered: true,
        },
        {
          id: 3,
          title: "Feature request: Support for GraphQL subscriptions",
          author: "Priya Sharma",
          authorImage:
            "https://img.rocket.new/generatedImages/rocket_gen_img_159c3e52f-1763295839833.png",
          authorAlt:
            "Professional headshot of Indian woman with shoulder-length black hair in blue blazer",
          category: "Feature Requests",
          replies: 42,
          views: 3124,
          lastActivity: "6 hours ago",
          badges: ["Beta Tester", "Early Adopter"],
          isAnswered: false,
        },
        {
          id: 4,
          title: "Troubleshooting connection timeout issues",
          author: "James Wilson",
          authorImage:
            "https://img.rocket.new/generatedImages/rocket_gen_img_1e401fe88-1763298703938.png",
          authorAlt:
            "Professional headshot of Caucasian man with short brown hair in gray suit",
          category: "Technical Support",
          replies: 15,
          views: 892,
          lastActivity: "8 hours ago",
          badges: ["Community Helper"],
          isAnswered: true,
        },
      ],

      repliesLabel: "replies",
      viewsLabel: "views",
      answeredLabel: "Answered",
    },
    hi: {
      title: "समुदाय मंच",
      subtitle:
        "हजारों डेवलपर्स और विशेषज्ञों के साथ जुड़ें जो ज्ञान साझा कर रहे हैं और समस्याओं को एक साथ हल कर रहे हैं",
      joinButton: "समुदाय में शामिल हों",
      categories: [
        { name: "सामान्य चर्चा", count: 1248, icon: "ChatBubbleLeftRightIcon" },
        { name: "तकनीकी सहायता", count: 856, icon: "WrenchScrewdriverIcon" },
        { name: "फीचर अनुरोध", count: 432, icon: "LightBulbIcon" },
        { name: "सर्वोत्तम प्रथाएं", count: 624, icon: "AcademicCapIcon" },
      ],

      topics: [
        {
          id: 1,
          title: "USS के साथ मल्टी-रीजन फेलओवर कैसे लागू करें?",
          author: "सारा चेन",
          authorImage:
            "https://img.rocket.new/generatedImages/rocket_gen_img_18a713e78-1763297858426.png",
          authorAlt:
            "सफेद ब्लाउज में लंबे काले बालों वाली एशियाई महिला का पेशेवर हेडशॉट",
          category: "तकनीकी सहायता",
          replies: 24,
          views: 1842,
          lastActivity: "2 घंटे पहले",
          badges: ["विशेषज्ञ", "शीर्ष योगदानकर्ता"],
          isAnswered: true,
        },
        {
          id: 2,
          title: "प्रोडक्शन में API रेट लिमिटिंग के लिए सर्वोत्तम प्रथाएं",
          author: "मोहम्मद अल-रशीद",
          authorImage:
            "https://img.rocket.new/generatedImages/rocket_gen_img_1a6268e58-1763292924390.png",
          authorAlt:
            "नेवी सूट में छोटे काले बालों वाले मध्य पूर्वी पुरुष का पेशेवर हेडशॉट",
          category: "सर्वोत्तम प्रथाएं",
          replies: 18,
          views: 1256,
          lastActivity: "4 घंटे पहले",
          badges: ["सत्यापित उपयोगकर्ता"],
          isAnswered: true,
        },
        {
          id: 3,
          title: "फीचर अनुरोध: GraphQL सब्सक्रिप्शन के लिए समर्थन",
          author: "प्रिया शर्मा",
          authorImage:
            "https://img.rocket.new/generatedImages/rocket_gen_img_159c3e52f-1763295839833.png",
          authorAlt:
            "नीले ब्लेज़र में कंधे की लंबाई के काले बालों वाली भारतीय महिला का पेशेवर हेडशॉट",
          category: "फीचर अनुरोध",
          replies: 42,
          views: 3124,
          lastActivity: "6 घंटे पहले",
          badges: ["बीटा टेस्टर", "प्रारंभिक अपनाने वाला"],
          isAnswered: false,
        },
        {
          id: 4,
          title: "कनेक्शन टाइमआउट समस्याओं का समस्या निवारण",
          author: "जेम्स विल्सन",
          authorImage:
            "https://img.rocket.new/generatedImages/rocket_gen_img_173325233-1763293127367.png",
          authorAlt:
            "ग्रे सूट में छोटे भूरे बालों वाले कोकेशियान पुरुष का पेशेवर हेडशॉट",
          category: "तकनीकी सहायता",
          replies: 15,
          views: 892,
          lastActivity: "8 घंटे पहले",
          badges: ["समुदाय सहायक"],
          isAnswered: true,
        },
      ],

      repliesLabel: "उत्तर",
      viewsLabel: "दृश्य",
      answeredLabel: "उत्तर दिया गया",
    },
    ar: {
      title: "منتديات المجتمع",
      subtitle:
        "انضم إلى آلاف المطورين والخبراء الذين يشاركون المعرفة ويحلون المشكلات معًا",
      joinButton: "انضم إلى المجتمع",
      categories: [
        { name: "النقاش العام", count: 1248, icon: "ChatBubbleLeftRightIcon" },
        { name: "الدعم الفني", count: 856, icon: "WrenchScrewdriverIcon" },
        { name: "طلبات الميزات", count: 432, icon: "LightBulbIcon" },
        { name: "أفضل الممارسات", count: 624, icon: "AcademicCapIcon" },
      ],

      topics: [
        {
          id: 1,
          title: "كيفية تنفيذ التبديل الاحتياطي متعدد المناطق مع USS؟",
          author: "سارة تشين",
          authorImage:
            "https://img.rocket.new/generatedImages/rocket_gen_img_1438c87e8-1763295755784.png",
          authorAlt:
            "صورة احترافية لامرأة آسيوية ذات شعر أسود طويل في بلوزة بيضاء",
          category: "الدعم الفني",
          replies: 24,
          views: 1842,
          lastActivity: "منذ ساعتين",
          badges: ["خبير", "أفضل مساهم"],
          isAnswered: true,
        },
        {
          id: 2,
          title: "أفضل الممارسات لتحديد معدل API في الإنتاج",
          author: "محمد الرشيد",
          authorImage:
            "https://img.rocket.new/generatedImages/rocket_gen_img_1c7263203-1763291891265.png",
          authorAlt:
            "صورة احترافية لرجل شرق أوسطي ذو شعر داكن قصير في بدلة كحلية",
          category: "أفضل الممارسات",
          replies: 18,
          views: 1256,
          lastActivity: "منذ 4 ساعات",
          badges: ["مستخدم موثق"],
          isAnswered: true,
        },
        {
          id: 3,
          title: "طلب ميزة: دعم اشتراكات GraphQL",
          author: "بريا شارما",
          authorImage:
            "https://img.rocket.new/generatedImages/rocket_gen_img_159c3e52f-1763295839833.png",
          authorAlt:
            "صورة احترافية لامرأة هندية ذات شعر أسود بطول الكتف في سترة زرقاء",
          category: "طلبات الميزات",
          replies: 42,
          views: 3124,
          lastActivity: "منذ 6 ساعات",
          badges: ["مختبر بيتا", "متبني مبكر"],
          isAnswered: false,
        },
        {
          id: 4,
          title: "استكشاف مشكلات انتهاء مهلة الاتصال",
          author: "جيمس ويلسون",
          authorImage:
            "https://img.rocket.new/generatedImages/rocket_gen_img_152f6cb30-1763294681685.png",
          authorAlt: "صورة احترافية لرجل قوقازي ذو شعر بني قصير في بدلة رمادية",
          category: "الدعم الفني",
          replies: 15,
          views: 892,
          lastActivity: "منذ 8 ساعات",
          badges: ["مساعد المجتمع"],
          isAnswered: true,
        },
      ],

      repliesLabel: "الردود",
      viewsLabel: "المشاهدات",
      answeredLabel: "تمت الإجابة",
    },
  };

  const currentContent = content[currentLanguage as keyof typeof content];
  const isRTL = currentLanguage === "ar";

  return (
    <section className={`py-16 bg-background ${isRTL ? "rtl" : "ltr"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {currentContent.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {currentContent.subtitle}
          </p>
          <button className="px-6 py-3 bg-cta text-cta-foreground rounded-md hover:bg-cta/90 transition-colors duration-300 font-medium shadow-md">
            {currentContent.joinButton}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {currentContent.categories.map((category, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 text-center border border-border hover:border-accent transition-all duration-300 cursor-pointer group"
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon
                    name={category.icon as any}
                    size={24}
                    className="text-accent"
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {category.name}
              </h3>
              <p className="text-2xl font-bold text-accent">{category.count}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {currentContent.topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-border hover:border-accent"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AppImage
                    src={topic.authorImage}
                    alt={topic.authorAlt}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1 hover:text-accent transition-colors duration-300">
                        {topic.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span className="font-medium">{topic.author}</span>
                        <span>•</span>
                        <span>{topic.category}</span>
                        <span>•</span>
                        <span>{topic.lastActivity}</span>
                      </div>
                    </div>
                    {topic.isAnswered && (
                      <span className="flex items-center space-x-1 text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                        <Icon name="CheckCircleIcon" size={14} />
                        <span>{currentContent.answeredLabel}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mb-3">
                    {topic.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="ChatBubbleLeftIcon" size={16} />
                      <span>
                        {topic.replies} {currentContent.repliesLabel}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="EyeIcon" size={16} />
                      <span>
                        {topic.views} {currentContent.viewsLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
