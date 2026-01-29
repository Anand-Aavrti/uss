import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TechnicalCapabilitiesProps {
  currentLanguage: string;
}

interface Capability {
  icon: string;
  title: string;
  description: string;
  features: string[];
  stats?: { value: string; label: string };
  gradient: string;
}

const TechnicalCapabilities = ({ currentLanguage }: TechnicalCapabilitiesProps) => {
  const [activeTab, setActiveTab] = useState<'mdm' | 'video'>('mdm');

  const content: Record<
    string,
    {
      heading: string;
      subheading: string;
      tabs: { mdm: string; video: string };
      capabilities: Capability[];
      mdmCapabilities: Capability[];
      videoCapabilities: Capability[];
    }
  > = {
    en: {
      heading: 'Built for Secure, Global Operations',
      subheading:
        'Enterprise-grade capabilities designed for device management and real-time video at scale',
      tabs: {
        mdm: 'Mobile Device Management',
        video: 'Video SDK',
      },
      capabilities: [
        {
          icon: 'DevicePhoneMobileIcon',
          title: 'Mobile Device Management',
          description:
            'Centrally manage, secure, and monitor devices across distributed teams with real-time visibility',
          features: [
            'Remote lock & wipe',
            'Policy enforcement',
            'Device compliance monitoring',
            'App distribution',
          ],
          stats: { value: '10K+', label: 'Devices Managed' },
          gradient: 'from-[#0EA5E9] to-[#1B365D]',
        },
        {
          icon: 'VideoCameraIcon',
          title: 'Real-Time Video SDK',
          description:
            'Embed secure, ultra-low-latency video communication with live translation into your applications',
          features: [
            'WebRTC-based streaming',
            'Multi-participant support',
            'Adaptive network handling',
            'Live translation (85+ languages)',
          ],
          stats: { value: '<50ms', label: 'Latency' },
          gradient: 'from-[#1B365D] to-[#0EA5E9]',
        },
        {
          icon: 'ShieldCheckIcon',
          title: 'Security by Design',
          description:
            'Military-grade security controls to protect devices, data, and communication channels',
          features: [
            'End-to-end encryption',
            'Role-based access control',
            'Audit logging',
            'Compliance ready (SOC 2, GDPR)',
          ],
          stats: { value: '99.99%', label: 'Uptime SLA' },
          gradient: 'from-[#0EA5E9] to-[#1B365D]',
        },
        {
          icon: 'CodeBracketIcon',
          title: 'Developer-First Integration',
          description:
            'Clean APIs, comprehensive SDKs, and detailed documentation for fast and predictable integration',
          features: ['REST APIs', 'SDKs for Web & Mobile', 'Clear versioning', 'Webhook support'],
          stats: { value: '5min', label: 'Setup Time' },
          gradient: 'from-[#1B365D] to-[#0EA5E9]',
        },
      ],
      mdmCapabilities: [
        {
          icon: 'LockClosedIcon',
          title: 'Remote Security',
          description: 'Lock, wipe, or reset devices remotely',
          features: ['Instant remote lock', 'Selective data wipe', 'Factory reset'],
          gradient: 'from-[#0EA5E9] to-[#1B365D]',
        },
        {
          icon: 'DocumentCheckIcon',
          title: 'Policy Management',
          description: 'Define and enforce security policies',
          features: ['Custom policies', 'Automated enforcement', 'Compliance tracking'],
          gradient: 'from-[#1B365D] to-[#0EA5E9]',
        },
        {
          icon: 'ChartBarIcon',
          title: 'Analytics & Reporting',
          description: 'Real-time insights into device health',
          features: ['Live dashboards', 'Custom reports', 'Alert system'],
          gradient: 'from-[#0EA5E9] to-[#1B365D]',
        },
        {
          icon: 'CpuChipIcon',
          title: 'App Management',
          description: 'Deploy and manage applications',
          features: ['App distribution', 'Version control', 'Silent updates'],
          gradient: 'from-[#1B365D] to-[#0EA5E9]',
        },
      ],
      videoCapabilities: [
        {
          icon: 'GlobeAltIcon',
          title: 'Live Translation',
          description: '85+ languages translated in real-time',
          features: ['Instant translation', 'Auto-detect language', 'Subtitle support'],
          gradient: 'from-[#0EA5E9] to-[#1B365D]',
        },
        {
          icon: 'SignalIcon',
          title: 'Network Optimization',
          description: 'Adaptive streaming for any connection',
          features: ['Auto quality adjust', 'Bandwidth optimization', 'Packet loss recovery'],
          gradient: 'from-[#1B365D] to-[#0EA5E9]',
        },
        {
          icon: 'UserGroupIcon',
          title: 'Scalable Rooms',
          description: 'Support for large-scale meetings',
          features: ['100+ participants', 'Breakout rooms', 'Screen sharing'],
          gradient: 'from-[#0EA5E9] to-[#1B365D]',
        },
        {
          icon: 'CloudIcon',
          title: 'Cloud Recording',
          description: 'Secure cloud storage for sessions',
          features: ['Auto recording', 'Transcription', 'Searchable archive'],
          gradient: 'from-[#1B365D] to-[#0EA5E9]',
        },
      ],
    },

    hi: {
      heading: 'सुरक्षित और वैश्विक संचालन के लिए निर्मित',
      subheading: 'डिवाइस प्रबंधन और रियल-टाइम वीडियो के लिए एंटरप्राइज-ग्रेड क्षमताएँ',
      tabs: {
        mdm: 'मोबाइल डिवाइस प्रबंधन',
        video: 'वीडियो SDK',
      },
      capabilities: [
        {
          icon: 'DevicePhoneMobileIcon',
          title: 'मोबाइल डिवाइस प्रबंधन',
          description: 'वितरित टीमों के लिए डिवाइस का केंद्रीकृत प्रबंधन और सुरक्षा',
          features: ['रिमोट लॉक और वाइप', 'नीति प्रवर्तन', 'डिवाइस अनुपालन निगरानी', 'ऐप वितरण'],
          stats: { value: '10K+', label: 'डिवाइस प्रबंधित' },
          gradient: 'from-[#0EA5E9] to-[#1B365D]',
        },
        {
          icon: 'VideoCameraIcon',
          title: 'रियल-टाइम वीडियो SDK',
          description: 'लाइव अनुवाद के साथ सुरक्षित वीडियो संचार जोड़ें',
          features: [
            'WebRTC स्ट्रीमिंग',
            'मल्टी-पार्टिसिपेंट सपोर्ट',
            'एडैप्टिव नेटवर्क',
            'लाइव अनुवाद (85+ भाषाएं)',
          ],
          stats: { value: '<50ms', label: 'विलंबता' },
          gradient: 'from-[#1B365D] to-[#0EA5E9]',
        },
        {
          icon: 'ShieldCheckIcon',
          title: 'डिज़ाइन द्वारा सुरक्षा',
          description: 'डिवाइस, डेटा और संचार की सुरक्षा के लिए मिलिट्री-ग्रेड नियंत्रण',
          features: ['एंड-टू-एंड एन्क्रिप्शन', 'रोल-आधारित एक्सेस', 'ऑडिट लॉगिंग', 'SOC 2, GDPR'],
          stats: { value: '99.99%', label: 'अपटाइम SLA' },
          gradient: 'from-[#0EA5E9] to-[#1B365D]',
        },
        {
          icon: 'CodeBracketIcon',
          title: 'डेवलपर-फर्स्ट एकीकरण',
          description: 'तेज़ और विश्वसनीय एकीकरण के लिए साफ APIs और SDKs',
          features: ['REST APIs', 'वेब और मोबाइल SDKs', 'स्पष्ट वर्ज़निंग', 'Webhook सपोर्ट'],
          stats: { value: '5min', label: 'सेटअप समय' },
          gradient: 'from-[#1B365D] to-[#0EA5E9]',
        },
      ],
      mdmCapabilities: [],
      videoCapabilities: [],
    },

    ar: {
      heading: 'مصمم للعمليات الآمنة على نطاق عالمي',
      subheading: 'قدرات مؤسسية لإدارة الأجهزة وبث الفيديو في الوقت الفعلي',
      tabs: {
        mdm: 'إدارة الأجهزة المحمولة',
        video: 'SDK للفيديو',
      },
      capabilities: [
        {
          icon: 'DevicePhoneMobileIcon',
          title: 'إدارة الأجهزة المحمولة',
          description: 'إدارة وتأمين الأجهزة مركزيًا عبر الفرق الموزعة',
          features: [
            'القفل والمسح عن بُعد',
            'تطبيق السياسات',
            'مراقبة الامتثال',
            'توزيع التطبيقات',
          ],
          stats: { value: '10K+', label: 'أجهزة مُدارة' },
          gradient: 'from-[#0EA5E9] to-[#1B365D]',
        },
        {
          icon: 'VideoCameraIcon',
          title: 'SDK للفيديو في الوقت الفعلي',
          description: 'دمج اتصالات فيديو آمنة مع ترجمة مباشرة',
          features: ['بث WebRTC', 'دعم عدة مشاركين', 'إدارة الشبكة', 'ترجمة مباشرة (85+ لغة)'],
          stats: { value: '<50ms', label: 'الكمون' },
          gradient: 'from-[#1B365D] to-[#0EA5E9]',
        },
        {
          icon: 'ShieldCheckIcon',
          title: 'الأمان حسب التصميم',
          description: 'عناصر تحكم عسكرية لحماية الأجهزة والبيانات',
          features: ['تشفير شامل', 'التحكم في الوصول', 'سجلات التدقيق', 'SOC 2, GDPR'],
          stats: { value: '99.99%', label: 'وقت التشغيل' },
          gradient: 'from-[#0EA5E9] to-[#1B365D]',
        },
        {
          icon: 'CodeBracketIcon',
          title: 'تكامل يركز على المطور',
          description: 'واجهات برمجة واضحة وSDKs شاملة',
          features: ['REST APIs', 'SDKs للويب والجوال', 'إدارة إصدارات', 'دعم Webhook'],
          stats: { value: '5min', label: 'وقت الإعداد' },
          gradient: 'from-[#1B365D] to-[#0EA5E9]',
        },
      ],
      mdmCapabilities: [],
      videoCapabilities: [],
    },
  };

  const currentContent = content[currentLanguage] || content.en;
  const isRTL = currentLanguage === 'ar';

  return (
    <section
      className={`py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-[#0B1220] to-[#1B365D]/20 relative overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0EA5E9]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1B365D]/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center max-w-4xl mx-auto mb-12 sm:mb-16 ${isRTL ? 'text-right' : 'text-left'} lg:text-center`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 backdrop-blur-sm mb-6">
            <Icon name="SparklesIcon" size={16} className="text-[#0EA5E9]" />
            <span className="text-sm text-[#0EA5E9] font-medium">Technical Excellence</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-4 sm:mb-6">
            {currentContent.heading}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto">
            {currentContent.subheading}
          </p>
        </div>

        {/* Main Capabilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20">
          {currentContent.capabilities.map((capability, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-xl bg-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-white/10 hover:border-[#0EA5E9]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#0EA5E9]/20 hover:-translate-y-1"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${capability.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              {/* Icon with gradient background */}
              <div className="relative">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${capability.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                >
                  <Icon name={capability.icon as any} size={28} className="text-white" />
                </div>

                {/* Stats Badge */}
                {capability.stats && (
                  <div className="absolute -top-2 -right-2 px-3 py-1.5 rounded-full bg-[#0EA5E9] text-white text-xs font-bold shadow-lg">
                    {capability.stats.value}
                  </div>
                )}
              </div>

              <h3 className="relative text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                {capability.title}
              </h3>
              <p className="relative text-sm sm:text-base text-white/70 mb-4 sm:mb-6 leading-relaxed">
                {capability.description}
              </p>

              {/* Features list */}
              <ul className="relative space-y-2 sm:space-y-3">
                {capability.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-white/80">
                    <Icon
                      name="CheckCircleIcon"
                      size={16}
                      className="text-[#0EA5E9] flex-shrink-0 mt-0.5"
                      variant="solid"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Stats label at bottom */}
              {capability.stats && (
                <div className="relative mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
                  <p className="text-xs text-white/50 font-medium">{capability.stats.label}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Deep Dive Tabs Section */}
        {currentLanguage === 'en' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Deep Dive Into Our Products
              </h3>
              <p className="text-white/70 text-sm sm:text-base">
                Explore detailed features for each solution
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              <button
                onClick={() => setActiveTab('mdm')}
                className={`relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                  activeTab === 'mdm' ? 'text-white' : 'text-white/60 hover:text-white/80'
                }`}
              >
                {activeTab === 'mdm' && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] rounded-xl sm:rounded-2xl" />
                    <div className="absolute inset-0 bg-white/10 rounded-xl sm:rounded-2xl animate-pulse" />
                  </>
                )}
                <span className="relative flex items-center gap-2">
                  <Icon name="DevicePhoneMobileIcon" size={20} />
                  {currentContent.tabs.mdm}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('video')}
                className={`relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                  activeTab === 'video' ? 'text-white' : 'text-white/60 hover:text-white/80'
                }`}
              >
                {activeTab === 'video' && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] rounded-xl sm:rounded-2xl" />
                    <div className="absolute inset-0 bg-white/10 rounded-xl sm:rounded-2xl animate-pulse" />
                  </>
                )}
                <span className="relative flex items-center gap-2">
                  <Icon name="VideoCameraIcon" size={20} />
                  {currentContent.tabs.video}
                </span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {(activeTab === 'mdm'
                ? currentContent.mdmCapabilities
                : currentContent.videoCapabilities
              ).map((cap, index) => (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-[#0EA5E9]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#0EA5E9]/10"
                  style={{
                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${cap.gradient} rounded-xl flex items-center justify-center mb-4 sm:mb-5`}
                  >
                    <Icon name={cap.icon as any} size={24} className="text-white" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">
                    {cap.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70 mb-3 sm:mb-4">{cap.description}</p>
                  <ul className="space-y-2">
                    {cap.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-white/80"
                      >
                        <Icon
                          name="CheckIcon"
                          size={14}
                          className="text-[#0EA5E9] flex-shrink-0 mt-0.5"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default TechnicalCapabilities;
