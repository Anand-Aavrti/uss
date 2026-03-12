import { useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface KnowledgeBaseProps {
  currentLanguage: string;
}

export default function KnowledgeBase({ currentLanguage }: KnowledgeBaseProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const content = {
    en: {
      title: "Knowledge Base",
      subtitle: "Find answers to common questions and explore our comprehensive documentation",
      searchPlaceholder: "Search articles, guides, and documentation...",
      categories: [
        { id: "all", name: "All Articles", count: 248 },
        { id: "getting-started", name: "Getting Started", count: 42 },
        { id: "api", name: "API Documentation", count: 86 },
        { id: "security", name: "Security & Compliance", count: 34 },
        { id: "troubleshooting", name: "Troubleshooting", count: 56 },
        { id: "best-practices", name: "Best Practices", count: 30 },
      ],
      articles: [
        { id: 1, title: "Getting Started with USS Platform", category: "Getting Started", views: "12.5K", lastUpdated: "19/01/2026", icon: "RocketLaunchIcon" },
        { id: 2, title: "API Authentication and Authorization Guide", category: "API Documentation", views: "8.3K", lastUpdated: "18/01/2026", icon: "KeyIcon" },
        { id: 3, title: "Security Best Practices for Enterprise Deployments", category: "Security & Compliance", views: "6.7K", lastUpdated: "17/01/2026", icon: "ShieldCheckIcon" },
        { id: 4, title: "Troubleshooting Common Integration Issues", category: "Troubleshooting", views: "9.2K", lastUpdated: "16/01/2026", icon: "WrenchScrewdriverIcon" },
        { id: 5, title: "Performance Optimization Strategies", category: "Best Practices", views: "5.4K", lastUpdated: "15/01/2026", icon: "BoltIcon" },
        { id: 6, title: "Multi-Region Deployment Configuration", category: "Getting Started", views: "4.8K", lastUpdated: "14/01/2026", icon: "GlobeAltIcon" },
      ],
      viewsLabel: "views",
      updatedLabel: "Updated",
    },
    hi: {
      title: "ज्ञान आधार",
      subtitle: "सामान्य प्रश्नों के उत्तर खोजें और हमारे व्यापक दस्तावेज़ीकरण का अन्वेषण करें",
      searchPlaceholder: "लेख, गाइड और दस्तावेज़ीकरण खोजें...",
      categories: [
        { id: "all", name: "सभी लेख", count: 248 },
        { id: "getting-started", name: "शुरुआत करना", count: 42 },
        { id: "api", name: "API दस्तावेज़ीकरण", count: 86 },
        { id: "security", name: "सुरक्षा और अनुपालन", count: 34 },
        { id: "troubleshooting", name: "समस्या निवारण", count: 56 },
        { id: "best-practices", name: "सर्वोत्तम प्रथाएं", count: 30 },
      ],
      articles: [
        { id: 1, title: "USS प्लेटफॉर्म के साथ शुरुआत करना", category: "शुरुआत करना", views: "12.5K", lastUpdated: "19/01/2026", icon: "RocketLaunchIcon" },
        { id: 2, title: "API प्रमाणीकरण और प्राधिकरण गाइड", category: "API दस्तावेज़ीकरण", views: "8.3K", lastUpdated: "18/01/2026", icon: "KeyIcon" },
        { id: 3, title: "एंटरप्राइज़ परिनियोजन के लिए सुरक्षा सर्वोत्तम प्रथाएं", category: "सुरक्षा और अनुपालन", views: "6.7K", lastUpdated: "17/01/2026", icon: "ShieldCheckIcon" },
        { id: 4, title: "सामान्य एकीकरण समस्याओं का समस्या निवारण", category: "समस्या निवारण", views: "9.2K", lastUpdated: "16/01/2026", icon: "WrenchScrewdriverIcon" },
        { id: 5, title: "प्रदर्शन अनुकूलन रणनीतियाँ", category: "सर्वोत्तम प्रथाएं", views: "5.4K", lastUpdated: "15/01/2026", icon: "BoltIcon" },
        { id: 6, title: "बहु-क्षेत्र परिनियोजन कॉन्फ़िगरेशन", category: "शुरुआत करना", views: "4.8K", lastUpdated: "14/01/2026", icon: "GlobeAltIcon" },
      ],
      viewsLabel: "दृश्य",
      updatedLabel: "अपडेट किया गया",
    },
    ar: {
      title: "قاعدة المعرفة",
      subtitle: "ابحث عن إجابات للأسئلة الشائعة واستكشف وثائقنا الشاملة",
      searchPlaceholder: "البحث في المقالات والأدلة والوثائق...",
      categories: [
        { id: "all", name: "جميع المقالات", count: 248 },
        { id: "getting-started", name: "البدء", count: 42 },
        { id: "api", name: "وثائق API", count: 86 },
        { id: "security", name: "الأمن والامتثال", count: 34 },
        { id: "troubleshooting", name: "استكشاف الأخطاء", count: 56 },
        { id: "best-practices", name: "أفضل الممارسات", count: 30 },
      ],
      articles: [
        { id: 1, title: "البدء مع منصة USS", category: "البدء", views: "12.5K", lastUpdated: "19/01/2026", icon: "RocketLaunchIcon" },
        { id: 2, title: "دليل مصادقة وتفويض API", category: "وثائق API", views: "8.3K", lastUpdated: "18/01/2026", icon: "KeyIcon" },
        { id: 3, title: "أفضل ممارسات الأمان لنشر المؤسسات", category: "الأمن والامتثال", views: "6.7K", lastUpdated: "17/01/2026", icon: "ShieldCheckIcon" },
        { id: 4, title: "استكشاف مشكلات التكامل الشائعة", category: "استكشاف الأخطاء", views: "9.2K", lastUpdated: "16/01/2026", icon: "WrenchScrewdriverIcon" },
        { id: 5, title: "استراتيجيات تحسين الأداء", category: "أفضل الممارسات", views: "5.4K", lastUpdated: "15/01/2026", icon: "BoltIcon" },
        { id: 6, title: "تكوين النشر متعدد المناطق", category: "البدء", views: "4.8K", lastUpdated: "14/01/2026", icon: "GlobeAltIcon" },
      ],
      viewsLabel: "المشاهدات",
      updatedLabel: "تم التحديث",
    },
  };

  const currentContent = content[currentLanguage as keyof typeof content];
  const isRTL = currentLanguage === "ar";

  return (
    <section className={`relative py-20 bg-[#08111f] overflow-hidden ${isRTL ? "rtl" : "ltr"}`}>
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#0EA5E9]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 mb-6">
            <Icon name="BookOpenIcon" size={16} className="text-[#0EA5E9]" />
            <span className="text-sm font-medium text-[#0EA5E9]">Documentation</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{currentContent.title}</h2>
          <p className="text-white/60 max-w-2xl mx-auto">{currentContent.subtitle}</p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Icon
              name="MagnifyingGlassIcon"
              size={20}
              className={`absolute top-1/2 -translate-y-1/2 text-white/40 z-10 ${isRTL ? "right-4" : "left-4"}`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentContent.searchPlaceholder}
              className={`w-full py-3.5 ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"} backdrop-blur-xl bg-[#1B365D]/20 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300`}
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {currentContent.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white shadow-lg shadow-[#0EA5E9]/20"
                  : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Article cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentContent.articles.map((article) => (
            <div
              key={article.id}
              className="group relative backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl p-6 border border-white/10 hover:border-[#0EA5E9]/40 hover:shadow-xl hover:shadow-[#0EA5E9]/10 transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-[#0EA5E9]/20 to-[#1B365D]/30 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#0EA5E9]/20 group-hover:border-[#0EA5E9]/50 transition-colors">
                    <Icon name={article.icon as any} size={20} className="text-[#0EA5E9]" />
                  </div>
                  <span className="text-xs font-medium text-[#0EA5E9] bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 px-2.5 py-1 rounded-full mt-0.5">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-4 group-hover:text-[#0EA5E9] transition-colors duration-300 leading-snug">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-white/40">
                  <div className="flex items-center gap-1.5">
                    <Icon name="EyeIcon" size={14} />
                    <span>{article.views} {currentContent.viewsLabel}</span>
                  </div>
                  <span>{currentContent.updatedLabel}: {article.lastUpdated}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
