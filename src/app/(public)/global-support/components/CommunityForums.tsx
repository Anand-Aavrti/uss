import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface CommunityForumsProps {
  currentLanguage: string;
}

export default function CommunityForums({ currentLanguage }: CommunityForumsProps) {
  const content = {
    en: {
      title: "Community Forums",
      subtitle: "Join thousands of developers and experts sharing knowledge and solving problems together",
      joinButton: "Join Community",
      categories: [
        { name: "General Discussion", count: 1248, icon: "ChatBubbleLeftRightIcon" },
        { name: "Technical Support", count: 856, icon: "WrenchScrewdriverIcon" },
        { name: "Feature Requests", count: 432, icon: "LightBulbIcon" },
        { name: "Best Practices", count: 624, icon: "AcademicCapIcon" },
      ],
      topics: [
        { id: 1, title: "How to implement multi-region failover with USS?", author: "Sarah Chen", authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_18a713e78-1763297858426.png", authorAlt: "Professional headshot of Asian woman with long black hair in white blouse", category: "Technical Support", replies: 24, views: 1842, lastActivity: "2 hours ago", badges: ["Expert", "Top Contributor"], isAnswered: true },
        { id: 2, title: "Best practices for API rate limiting in production", author: "Mohammed Al-Rashid", authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1c7263203-1763291891265.png", authorAlt: "Professional headshot of Middle Eastern man with short dark hair in navy suit", category: "Best Practices", replies: 18, views: 1256, lastActivity: "4 hours ago", badges: ["Verified User"], isAnswered: true },
        { id: 3, title: "Feature request: Support for GraphQL subscriptions", author: "Priya Sharma", authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_159c3e52f-1763295839833.png", authorAlt: "Professional headshot of Indian woman with shoulder-length black hair in blue blazer", category: "Feature Requests", replies: 42, views: 3124, lastActivity: "6 hours ago", badges: ["Beta Tester", "Early Adopter"], isAnswered: false },
        { id: 4, title: "Troubleshooting connection timeout issues", author: "James Wilson", authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e401fe88-1763298703938.png", authorAlt: "Professional headshot of Caucasian man with short brown hair in gray suit", category: "Technical Support", replies: 15, views: 892, lastActivity: "8 hours ago", badges: ["Community Helper"], isAnswered: true },
      ],
      repliesLabel: "replies",
      viewsLabel: "views",
      answeredLabel: "Answered",
    },
    hi: {
      title: "समुदाय मंच",
      subtitle: "हजारों डेवलपर्स और विशेषज्ञों के साथ जुड़ें जो ज्ञान साझा कर रहे हैं और समस्याओं को एक साथ हल कर रहे हैं",
      joinButton: "समुदाय में शामिल हों",
      categories: [
        { name: "सामान्य चर्चा", count: 1248, icon: "ChatBubbleLeftRightIcon" },
        { name: "तकनीकी सहायता", count: 856, icon: "WrenchScrewdriverIcon" },
        { name: "फीचर अनुरोध", count: 432, icon: "LightBulbIcon" },
        { name: "सर्वोत्तम प्रथाएं", count: 624, icon: "AcademicCapIcon" },
      ],
      topics: [
        { id: 1, title: "USS के साथ मल्टी-रीजन फेलओवर कैसे लागू करें?", author: "सारा चेन", authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_18a713e78-1763297858426.png", authorAlt: "सफेद ब्लाउज में लंबे काले बालों वाली एशियाई महिला का पेशेवर हेडशॉट", category: "तकनीकी सहायता", replies: 24, views: 1842, lastActivity: "2 घंटे पहले", badges: ["विशेषज्ञ", "शीर्ष योगदानकर्ता"], isAnswered: true },
        { id: 2, title: "प्रोडक्शन में API रेट लिमिटिंग के लिए सर्वोत्तम प्रथाएं", author: "मोहम्मद अल-रशीद", authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1a6268e58-1763292924390.png", authorAlt: "नेवी सूट में छोटे काले बालों वाले मध्य पूर्वी पुरुष का पेशेवर हेडशॉट", category: "सर्वोत्तम प्रथाएं", replies: 18, views: 1256, lastActivity: "4 घंटे पहले", badges: ["सत्यापित उपयोगकर्ता"], isAnswered: true },
        { id: 3, title: "फीचर अनुरोध: GraphQL सब्सक्रिप्शन के लिए समर्थन", author: "प्रिया शर्मा", authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_159c3e52f-1763295839833.png", authorAlt: "नीले ब्लेज़र में कंधे की लंबाई के काले बालों वाली भारतीय महिला का पेशेवर हेडशॉट", category: "फीचर अनुरोध", replies: 42, views: 3124, lastActivity: "6 घंटे पहले", badges: ["बीटा टेस्टर", "प्रारंभिक अपनाने वाला"], isAnswered: false },
        { id: 4, title: "कनेक्शन टाइमआउट समस्याओं का समस्या निवारण", author: "जेम्स विल्सन", authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_173325233-1763293127367.png", authorAlt: "ग्रे सूट में छोटे भूरे बालों वाले कोकेशियान पुरुष का पेशेवर हेडशॉट", category: "तकनीकी सहायता", replies: 15, views: 892, lastActivity: "8 घंटे पहले", badges: ["समुदाय सहायक"], isAnswered: true },
      ],
      repliesLabel: "उत्तर",
      viewsLabel: "दृश्य",
      answeredLabel: "उत्तर दिया गया",
    },
    ar: {
      title: "منتديات المجتمع",
      subtitle: "انضم إلى آلاف المطورين والخبراء الذين يشاركون المعرفة ويحلون المشكلات معًا",
      joinButton: "انضم إلى المجتمع",
      categories: [
        { name: "النقاش العام", count: 1248, icon: "ChatBubbleLeftRightIcon" },
        { name: "الدعم الفني", count: 856, icon: "WrenchScrewdriverIcon" },
        { name: "طلبات الميزات", count: 432, icon: "LightBulbIcon" },
        { name: "أفضل الممارسات", count: 624, icon: "AcademicCapIcon" },
      ],
      topics: [
        { id: 1, title: "كيفية تنفيذ التبديل الاحتياطي متعدد المناطق مع USS؟", author: "سارة تشين", authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1438c87e8-1763295755784.png", authorAlt: "صورة احترافية لامرأة آسيوية ذات شعر أسود طويل في بلوزة بيضاء", category: "الدعم الفني", replies: 24, views: 1842, lastActivity: "منذ ساعتين", badges: ["خبير", "أفضل مساهم"], isAnswered: true },
        { id: 2, title: "أفضل الممارسات لتحديد معدل API في الإنتاج", author: "محمد الرشيد", authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1c7263203-1763291891265.png", authorAlt: "صورة احترافية لرجل شرق أوسطي ذو شعر داكن قصير في بدلة كحلية", category: "أفضل الممارسات", replies: 18, views: 1256, lastActivity: "منذ 4 ساعات", badges: ["مستخدم موثق"], isAnswered: true },
        { id: 3, title: "طلب ميزة: دعم اشتراكات GraphQL", author: "بريا شارما", authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_159c3e52f-1763295839833.png", authorAlt: "صورة احترافية لامرأة هندية ذات شعر أسود بطول الكتف في سترة زرقاء", category: "طلبات الميزات", replies: 42, views: 3124, lastActivity: "منذ 6 ساعات", badges: ["مختبر بيتا", "متبني مبكر"], isAnswered: false },
        { id: 4, title: "استكشاف مشكلات انتهاء مهلة الاتصال", author: "جيمس ويلسون", authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_152f6cb30-1763294681685.png", authorAlt: "صورة احترافية لرجل قوقازي ذو شعر بني قصير في بدلة رمادية", category: "الدعم الفني", replies: 15, views: 892, lastActivity: "منذ 8 ساعات", badges: ["مساعد المجتمع"], isAnswered: true },
      ],
      repliesLabel: "الردود",
      viewsLabel: "المشاهدات",
      answeredLabel: "تمت الإجابة",
    },
  };

  const currentContent = content[currentLanguage as keyof typeof content];
  const isRTL = currentLanguage === "ar";

  return (
    <section className={`relative py-20 bg-[#0B1220] overflow-hidden ${isRTL ? "rtl" : "ltr"}`}>
      <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-[#0EA5E9]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 mb-6">
            <Icon name="UserGroupIcon" size={16} className="text-[#0EA5E9]" />
            <span className="text-sm font-medium text-[#0EA5E9]">Community</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{currentContent.title}</h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">{currentContent.subtitle}</p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white rounded-xl font-semibold shadow-lg shadow-[#0EA5E9]/25 hover:shadow-[#0EA5E9]/40 hover:scale-[1.02] transition-all duration-300">
            <Icon name="UserPlusIcon" size={18} />
            {currentContent.joinButton}
          </button>
        </div>

        {/* Category stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {currentContent.categories.map((category, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl p-6 text-center border border-white/10 hover:border-[#0EA5E9]/40 hover:shadow-xl hover:shadow-[#0EA5E9]/10 transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9]/20 to-[#1B365D]/30 rounded-full flex items-center justify-center border border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/50 transition-colors">
                    <Icon name={category.icon as any} size={22} className="text-[#0EA5E9]" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white/80 mb-2">{category.name}</h3>
                <p className="text-2xl font-bold text-[#0EA5E9]">{category.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Forum topics */}
        <div className="space-y-4">
          {currentContent.topics.map((topic) => (
            <div
              key={topic.id}
              className="group relative backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl p-6 border border-white/10 hover:border-[#0EA5E9]/40 hover:shadow-xl hover:shadow-[#0EA5E9]/10 transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0">
                  <AppImage
                    src={topic.authorImage}
                    alt={topic.authorAlt}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white/10"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                    <h3 className="text-base font-semibold text-white group-hover:text-[#0EA5E9] transition-colors duration-300 leading-snug">
                      {topic.title}
                    </h3>
                    {topic.isAnswered && (
                      <span className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
                        <Icon name="CheckCircleIcon" size={13} />
                        {currentContent.answeredLabel}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-white/50 mb-3 flex-wrap">
                    <span className="font-medium text-white/70">{topic.author}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-[#0EA5E9]/80 text-xs bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 px-2 py-0.5 rounded-full">{topic.category}</span>
                    <span className="text-white/20">•</span>
                    <span>{topic.lastActivity}</span>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap">
                    {topic.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="text-xs font-medium text-white/50 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                    <div className="flex items-center gap-4 ml-auto text-xs text-white/40">
                      <div className="flex items-center gap-1.5">
                        <Icon name="ChatBubbleLeftIcon" size={14} />
                        <span>{topic.replies} {currentContent.repliesLabel}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Icon name="EyeIcon" size={14} />
                        <span>{topic.views} {currentContent.viewsLabel}</span>
                      </div>
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
