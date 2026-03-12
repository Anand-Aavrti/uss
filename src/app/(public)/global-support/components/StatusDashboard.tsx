import Icon from "@/components/ui/AppIcon";

interface StatusDashboardProps {
  currentLanguage: string;
}

export default function StatusDashboard({ currentLanguage }: StatusDashboardProps) {
  const content = {
    en: {
      title: "Global Infrastructure Status",
      subtitle: "Real-time monitoring of our services across all regions",
      lastUpdated: "Last updated: 2 minutes ago",
      allSystemsOperational: "All Systems Operational",
      services: [
        { name: "API Gateway", status: "operational" as const, uptime: "99.99%", responseTime: "45ms" },
        { name: "Database Cluster", status: "operational" as const, uptime: "99.98%", responseTime: "12ms" },
        { name: "CDN Network", status: "operational" as const, uptime: "99.99%", responseTime: "8ms" },
        { name: "Authentication Service", status: "operational" as const, uptime: "99.97%", responseTime: "32ms" },
        { name: "Storage Service", status: "operational" as const, uptime: "99.99%", responseTime: "18ms" },
        { name: "Analytics Engine", status: "operational" as const, uptime: "99.96%", responseTime: "156ms" },
      ],
      regions: [
        { name: "North America", status: "operational" as const, latency: "45ms" },
        { name: "Europe", status: "operational" as const, latency: "38ms" },
        { name: "Asia Pacific", status: "operational" as const, latency: "52ms" },
        { name: "Middle East", status: "operational" as const, latency: "41ms" },
        { name: "South America", status: "operational" as const, latency: "67ms" },
      ],
      statusLabels: { operational: "Operational", degraded: "Degraded", outage: "Outage" },
      uptimeLabel: "Uptime",
      responseTimeLabel: "Avg Response",
      latencyLabel: "Latency",
    },
    hi: {
      title: "वैश्विक बुनियादी ढांचा स्थिति",
      subtitle: "सभी क्षेत्रों में हमारी सेवाओं की वास्तविक समय निगरानी",
      lastUpdated: "अंतिम अपडेट: 2 मिनट पहले",
      allSystemsOperational: "सभी सिस्टम परिचालन",
      services: [
        { name: "API गेटवे", status: "operational" as const, uptime: "99.99%", responseTime: "45ms" },
        { name: "डेटाबेस क्लस्टर", status: "operational" as const, uptime: "99.98%", responseTime: "12ms" },
        { name: "CDN नेटवर्क", status: "operational" as const, uptime: "99.99%", responseTime: "8ms" },
        { name: "प्रमाणीकरण सेवा", status: "operational" as const, uptime: "99.97%", responseTime: "32ms" },
        { name: "स्टोरेज सेवा", status: "operational" as const, uptime: "99.99%", responseTime: "18ms" },
        { name: "एनालिटिक्स इंजन", status: "operational" as const, uptime: "99.96%", responseTime: "156ms" },
      ],
      regions: [
        { name: "उत्तरी अमेरिका", status: "operational" as const, latency: "45ms" },
        { name: "यूरोप", status: "operational" as const, latency: "38ms" },
        { name: "एशिया प्रशांत", status: "operational" as const, latency: "52ms" },
        { name: "मध्य पूर्व", status: "operational" as const, latency: "41ms" },
        { name: "दक्षिण अमेरिका", status: "operational" as const, latency: "67ms" },
      ],
      statusLabels: { operational: "परिचालन", degraded: "खराब प्रदर्शन", outage: "सेवा आउटेज" },
      uptimeLabel: "अपटाइम",
      responseTimeLabel: "औसत प्रतिक्रिया",
      latencyLabel: "विलंबता",
    },
    ar: {
      title: "حالة البنية التحتية العالمية",
      subtitle: "المراقبة في الوقت الفعلي لخدماتنا عبر جميع المناطق",
      lastUpdated: "آخر تحديث: منذ دقيقتين",
      allSystemsOperational: "جميع الأنظمة تعمل",
      services: [
        { name: "بوابة API", status: "operational" as const, uptime: "99.99%", responseTime: "45ms" },
        { name: "مجموعة قواعد البيانات", status: "operational" as const, uptime: "99.98%", responseTime: "12ms" },
        { name: "شبكة CDN", status: "operational" as const, uptime: "99.99%", responseTime: "8ms" },
        { name: "خدمة المصادقة", status: "operational" as const, uptime: "99.97%", responseTime: "32ms" },
        { name: "خدمة التخزين", status: "operational" as const, uptime: "99.99%", responseTime: "18ms" },
        { name: "محرك التحليلات", status: "operational" as const, uptime: "99.96%", responseTime: "156ms" },
      ],
      regions: [
        { name: "أمريكا الشمالية", status: "operational" as const, latency: "45ms" },
        { name: "أوروبا", status: "operational" as const, latency: "38ms" },
        { name: "آسيا والمحيط الهادئ", status: "operational" as const, latency: "52ms" },
        { name: "الشرق الأوسط", status: "operational" as const, latency: "41ms" },
        { name: "أمريكا الجنوبية", status: "operational" as const, latency: "67ms" },
      ],
      statusLabels: { operational: "تعمل", degraded: "أداء متدهور", outage: "انقطاع الخدمة" },
      uptimeLabel: "وقت التشغيل",
      responseTimeLabel: "متوسط الاستجابة",
      latencyLabel: "الكمون",
    },
  };

  const currentContent = content[currentLanguage as keyof typeof content];
  const isRTL = currentLanguage === "ar";

  const getStatusDot = (status: "operational" | "degraded" | "outage") => {
    if (status === "operational") return "bg-green-400";
    if (status === "degraded") return "bg-yellow-400";
    return "bg-red-400";
  };

  const getStatusBadge = (status: "operational" | "degraded" | "outage") => {
    if (status === "operational") return "text-green-400 bg-green-500/10 border-green-500/20";
    if (status === "degraded") return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    return "text-red-400 bg-red-500/10 border-red-500/20";
  };

  return (
    <section className={`relative py-20 bg-[#08111f] overflow-hidden ${isRTL ? "rtl" : "ltr"}`}>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-[#0EA5E9]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 mb-6">
            <Icon name="SignalIcon" size={16} className="text-[#0EA5E9]" />
            <span className="text-sm font-medium text-[#0EA5E9]">Live Status</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{currentContent.title}</h2>
          <p className="text-white/60 mb-5">{currentContent.subtitle}</p>
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/25 text-green-400 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="font-medium text-sm">{currentContent.allSystemsOperational}</span>
          </div>
          <p className="text-xs text-white/40 mt-3">{currentContent.lastUpdated}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Services */}
          <div className="backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <Icon name="ServerStackIcon" size={18} className="text-[#0EA5E9]" />
              Services Status
            </h3>
            <div className="space-y-3">
              {currentContent.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#1B365D]/20 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${getStatusDot(service.status)}`}></span>
                    <span className="text-sm font-medium text-white/80">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-5 text-right">
                    <div>
                      <p className="text-white/40 text-xs mb-0.5">{currentContent.uptimeLabel}</p>
                      <p className="text-sm font-semibold text-green-400">{service.uptime}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-0.5">{currentContent.responseTimeLabel}</p>
                      <p className="text-sm font-semibold text-white/80">{service.responseTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regions */}
          <div className="backdrop-blur-xl bg-[#1B365D]/20 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <Icon name="GlobeAltIcon" size={18} className="text-[#0EA5E9]" />
              Regional Status
            </h3>
            <div className="space-y-3">
              {currentContent.regions.map((region, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#1B365D]/20 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon name="GlobeAltIcon" size={18} className="text-[#0EA5E9]/60" />
                    <span className="text-sm font-medium text-white/80">{region.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-white/40 text-xs mb-0.5">{currentContent.latencyLabel}</p>
                      <p className="text-sm font-semibold text-white/80">{region.latency}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(region.status)}`}>
                      {currentContent.statusLabels[region.status]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
