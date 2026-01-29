import Icon from "@/components/ui/AppIcon";

interface StatusDashboardProps {
  currentLanguage: string;
}

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "outage";
  uptime: string;
  responseTime: string;
}

export default function StatusDashboard({
  currentLanguage,
}: StatusDashboardProps) {
  const content = {
    en: {
      title: "Global Infrastructure Status",
      subtitle: "Real-time monitoring of our services across all regions",
      lastUpdated: "Last updated: 2 minutes ago",
      allSystemsOperational: "All Systems Operational",
      services: [
        {
          name: "API Gateway",
          status: "operational" as const,
          uptime: "99.99%",
          responseTime: "45ms",
        },
        {
          name: "Database Cluster",
          status: "operational" as const,
          uptime: "99.98%",
          responseTime: "12ms",
        },
        {
          name: "CDN Network",
          status: "operational" as const,
          uptime: "99.99%",
          responseTime: "8ms",
        },
        {
          name: "Authentication Service",
          status: "operational" as const,
          uptime: "99.97%",
          responseTime: "32ms",
        },
        {
          name: "Storage Service",
          status: "operational" as const,
          uptime: "99.99%",
          responseTime: "18ms",
        },
        {
          name: "Analytics Engine",
          status: "operational" as const,
          uptime: "99.96%",
          responseTime: "156ms",
        },
      ],
      regions: [
        {
          name: "North America",
          status: "operational" as const,
          latency: "45ms",
        },
        { name: "Europe", status: "operational" as const, latency: "38ms" },
        {
          name: "Asia Pacific",
          status: "operational" as const,
          latency: "52ms",
        },
        {
          name: "Middle East",
          status: "operational" as const,
          latency: "41ms",
        },
        {
          name: "South America",
          status: "operational" as const,
          latency: "67ms",
        },
      ],
      statusLabels: {
        operational: "Operational",
        degraded: "Degraded Performance",
        outage: "Service Outage",
      },
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
        {
          name: "API गेटवे",
          status: "operational" as const,
          uptime: "99.99%",
          responseTime: "45ms",
        },
        {
          name: "डेटाबेस क्लस्टर",
          status: "operational" as const,
          uptime: "99.98%",
          responseTime: "12ms",
        },
        {
          name: "CDN नेटवर्क",
          status: "operational" as const,
          uptime: "99.99%",
          responseTime: "8ms",
        },
        {
          name: "प्रमाणीकरण सेवा",
          status: "operational" as const,
          uptime: "99.97%",
          responseTime: "32ms",
        },
        {
          name: "स्टोरेज सेवा",
          status: "operational" as const,
          uptime: "99.99%",
          responseTime: "18ms",
        },
        {
          name: "एनालिटिक्स इंजन",
          status: "operational" as const,
          uptime: "99.96%",
          responseTime: "156ms",
        },
      ],
      regions: [
        {
          name: "उत्तरी अमेरिका",
          status: "operational" as const,
          latency: "45ms",
        },
        { name: "यूरोप", status: "operational" as const, latency: "38ms" },
        {
          name: "एशिया प्रशांत",
          status: "operational" as const,
          latency: "52ms",
        },
        { name: "मध्य पूर्व", status: "operational" as const, latency: "41ms" },
        {
          name: "दक्षिण अमेरिका",
          status: "operational" as const,
          latency: "67ms",
        },
      ],
      statusLabels: {
        operational: "परिचालन",
        degraded: "खराब प्रदर्शन",
        outage: "सेवा आउटेज",
      },
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
        {
          name: "بوابة API",
          status: "operational" as const,
          uptime: "99.99%",
          responseTime: "45ms",
        },
        {
          name: "مجموعة قواعد البيانات",
          status: "operational" as const,
          uptime: "99.98%",
          responseTime: "12ms",
        },
        {
          name: "شبكة CDN",
          status: "operational" as const,
          uptime: "99.99%",
          responseTime: "8ms",
        },
        {
          name: "خدمة المصادقة",
          status: "operational" as const,
          uptime: "99.97%",
          responseTime: "32ms",
        },
        {
          name: "خدمة التخزين",
          status: "operational" as const,
          uptime: "99.99%",
          responseTime: "18ms",
        },
        {
          name: "محرك التحليلات",
          status: "operational" as const,
          uptime: "99.96%",
          responseTime: "156ms",
        },
      ],
      regions: [
        {
          name: "أمريكا الشمالية",
          status: "operational" as const,
          latency: "45ms",
        },
        { name: "أوروبا", status: "operational" as const, latency: "38ms" },
        {
          name: "آسيا والمحيط الهادئ",
          status: "operational" as const,
          latency: "52ms",
        },
        {
          name: "الشرق الأوسط",
          status: "operational" as const,
          latency: "41ms",
        },
        {
          name: "أمريكا الجنوبية",
          status: "operational" as const,
          latency: "67ms",
        },
      ],
      statusLabels: {
        operational: "تعمل",
        degraded: "أداء متدهور",
        outage: "انقطاع الخدمة",
      },
      uptimeLabel: "وقت التشغيل",
      responseTimeLabel: "متوسط الاستجابة",
      latencyLabel: "الكمون",
    },
  };

  const currentContent = content[currentLanguage as keyof typeof content];
  const isRTL = currentLanguage === "ar";

  const getStatusColor = (status: "operational" | "degraded" | "outage") => {
    switch (status) {
      case "operational":
        return "text-success bg-success/10";
      case "degraded":
        return "text-warning bg-warning/10";
      case "outage":
        return "text-error bg-error/10";
    }
  };

  const getStatusIcon = (status: "operational" | "degraded" | "outage") => {
    switch (status) {
      case "operational":
        return "CheckCircleIcon";
      case "degraded":
        return "ExclamationTriangleIcon";
      case "outage":
        return "XCircleIcon";
    }
  };

  return (
    <section className={`py-16 bg-surface ${isRTL ? "rtl" : "ltr"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {currentContent.title}
          </h2>
          <p className="text-muted-foreground mb-4">
            {currentContent.subtitle}
          </p>
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full">
            <Icon name="CheckCircleIcon" size={20} />
            <span className="font-medium">
              {currentContent.allSystemsOperational}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {currentContent.lastUpdated}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-lg p-6 shadow-md border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Services Status
            </h3>
            <div className="space-y-4">
              {currentContent.services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-background rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      name={getStatusIcon(service.status) as any}
                      size={20}
                      className="text-success"
                    />
                    <span className="font-medium text-foreground">
                      {service.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs mb-1">
                        {currentContent.uptimeLabel}
                      </p>
                      <p className="font-semibold text-foreground">
                        {service.uptime}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs mb-1">
                        {currentContent.responseTimeLabel}
                      </p>
                      <p className="font-semibold text-foreground">
                        {service.responseTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-md border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Regional Status
            </h3>
            <div className="space-y-4">
              {currentContent.regions.map((region, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-background rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      name="GlobeAltIcon"
                      size={20}
                      className="text-accent"
                    />
                    <span className="font-medium text-foreground">
                      {region.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs mb-1">
                        {currentContent.latencyLabel}
                      </p>
                      <p className="font-semibold text-foreground">
                        {region.latency}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(region.status)}`}
                    >
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
