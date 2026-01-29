import { useState } from "react";
import Icon from "@/components/ui/AppIcon";

interface KnowledgeBaseProps {
  currentLanguage: string;
}

interface Article {
  id: number;
  title: string;
  category: string;
  views: string;
  lastUpdated: string;
  icon: string;
}

export default function KnowledgeBase({ currentLanguage }: KnowledgeBaseProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const content = {
    en: {
      title: "Knowledge Base",
      subtitle:
        "Find answers to common questions and explore our comprehensive documentation",
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
        {
          id: 1,
          title: "Getting Started with USS Platform",
          category: "Getting Started",
          views: "12.5K",
          lastUpdated: "19/01/2026",
          icon: "RocketLaunchIcon",
        },
        {
          id: 2,
          title: "API Authentication and Authorization Guide",
          category: "API Documentation",
          views: "8.3K",
          lastUpdated: "18/01/2026",
          icon: "KeyIcon",
        },
        {
          id: 3,
          title: "Security Best Practices for Enterprise Deployments",
          category: "Security & Compliance",
          views: "6.7K",
          lastUpdated: "17/01/2026",
          icon: "ShieldCheckIcon",
        },
        {
          id: 4,
          title: "Troubleshooting Common Integration Issues",
          category: "Troubleshooting",
          views: "9.2K",
          lastUpdated: "16/01/2026",
          icon: "WrenchScrewdriverIcon",
        },
        {
          id: 5,
          title: "Performance Optimization Strategies",
          category: "Best Practices",
          views: "5.4K",
          lastUpdated: "15/01/2026",
          icon: "BoltIcon",
        },
        {
          id: 6,
          title: "Multi-Region Deployment Configuration",
          category: "Getting Started",
          views: "4.8K",
          lastUpdated: "14/01/2026",
          icon: "GlobeAltIcon",
        },
      ],
      viewsLabel: "views",
      updatedLabel: "Updated",
    },
    hi: {
      title: "ज्ञान आधार",
      subtitle:
        "सामान्य प्रश्नों के उत्तर खोजें और हमारे व्यापक दस्तावेज़ीकरण का अन्वेषण करें",
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
        {
          id: 1,
          title: "USS प्लेटफॉर्म के साथ शुरुआत करना",
          category: "शुरुआत करना",
          views: "12.5K",
          lastUpdated: "19/01/2026",
          icon: "RocketLaunchIcon",
        },
        {
          id: 2,
          title: "API प्रमाणीकरण और प्राधिकरण गाइड",
          category: "API दस्तावेज़ीकरण",
          views: "8.3K",
          lastUpdated: "18/01/2026",
          icon: "KeyIcon",
        },
        {
          id: 3,
          title: "एंटरप्राइज़ परिनियोजन के लिए सुरक्षा सर्वोत्तम प्रथाएं",
          category: "सुरक्षा और अनुपालन",
          views: "6.7K",
          lastUpdated: "17/01/2026",
          icon: "ShieldCheckIcon",
        },
        {
          id: 4,
          title: "सामान्य एकीकरण समस्याओं का समस्या निवारण",
          category: "समस्या निवारण",
          views: "9.2K",
          lastUpdated: "16/01/2026",
          icon: "WrenchScrewdriverIcon",
        },
        {
          id: 5,
          title: "प्रदर्शन अनुकूलन रणनीतियाँ",
          category: "सर्वोत्तम प्रथाएं",
          views: "5.4K",
          lastUpdated: "15/01/2026",
          icon: "BoltIcon",
        },
        {
          id: 6,
          title: "बहु-क्षेत्र परिनियोजन कॉन्फ़िगरेशन",
          category: "शुरुआत करना",
          views: "4.8K",
          lastUpdated: "14/01/2026",
          icon: "GlobeAltIcon",
        },
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
        {
          id: 1,
          title: "البدء مع منصة USS",
          category: "البدء",
          views: "12.5K",
          lastUpdated: "19/01/2026",
          icon: "RocketLaunchIcon",
        },
        {
          id: 2,
          title: "دليل مصادقة وتفويض API",
          category: "وثائق API",
          views: "8.3K",
          lastUpdated: "18/01/2026",
          icon: "KeyIcon",
        },
        {
          id: 3,
          title: "أفضل ممارسات الأمان لنشر المؤسسات",
          category: "الأمن والامتثال",
          views: "6.7K",
          lastUpdated: "17/01/2026",
          icon: "ShieldCheckIcon",
        },
        {
          id: 4,
          title: "استكشاف مشكلات التكامل الشائعة",
          category: "استكشاف الأخطاء",
          views: "9.2K",
          lastUpdated: "16/01/2026",
          icon: "WrenchScrewdriverIcon",
        },
        {
          id: 5,
          title: "استراتيجيات تحسين الأداء",
          category: "أفضل الممارسات",
          views: "5.4K",
          lastUpdated: "15/01/2026",
          icon: "BoltIcon",
        },
        {
          id: 6,
          title: "تكوين النشر متعدد المناطق",
          category: "البدء",
          views: "4.8K",
          lastUpdated: "14/01/2026",
          icon: "GlobeAltIcon",
        },
      ],
      viewsLabel: "المشاهدات",
      updatedLabel: "تم التحديث",
    },
  };

  const currentContent = content[currentLanguage as keyof typeof content];
  const isRTL = currentLanguage === "ar";

  return (
    <section className={`py-16 bg-surface ${isRTL ? "rtl" : "ltr"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {currentContent.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Icon
              name="MagnifyingGlassIcon"
              size={20}
              className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${isRTL ? "right-4" : "left-4"}`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentContent.searchPlaceholder}
              className={`w-full py-3 ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"} border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-card text-foreground`}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {currentContent.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground border border-border hover:border-accent"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentContent.articles.map((article) => (
            <div
              key={article.id}
              className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-border hover:border-accent group"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon
                    name={article.icon as any}
                    size={24}
                    className="text-accent"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {article.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="EyeIcon" size={16} />
                  <span>
                    {article.views} {currentContent.viewsLabel}
                  </span>
                </div>
                <span>
                  {currentContent.updatedLabel}: {article.lastUpdated}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
