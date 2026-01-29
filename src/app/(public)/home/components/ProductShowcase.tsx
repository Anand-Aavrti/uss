import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface ProductShowcaseProps {
  currentLanguage: string;
}

interface Product {
  icon: string;
  title: string;
  description: string;
  features: string[];
  link: string;
}

const ProductShowcase = ({ currentLanguage }: ProductShowcaseProps) => {
  const content: Record<
    string,
    { heading: string; subheading: string; products: Product[]; cta: string }
  > = {
    en: {
      heading: 'Focused Platform Capabilities',
      subheading: 'Device management and real-time video, built for secure global use',
      cta: 'Explore Products',
      products: [
        {
          icon: 'DevicePhoneMobileIcon',
          title: 'USS MDM',
          description:
            'Enterprise-grade mobile device management for secure control and compliance across distributed teams',
          features: ['Remote lock & wipe', 'Policy enforcement', 'Device compliance monitoring'],
          link: '/products/mdm',
        },
        {
          icon: 'VideoCameraIcon',
          title: 'USS Video SDK',
          description:
            'Developer-friendly SDK for embedding secure, low-latency video into your applications',
          features: [
            'Real-time video & audio',
            'Multi-participant sessions',
            'End-to-end encryption',
          ],
          link: '/products/video-sdk',
        },
      ],
    },

    hi: {
      heading: 'केंद्रित प्लेटफ़ॉर्म क्षमताएँ',
      subheading: 'सुरक्षित और वैश्विक उपयोग के लिए डिवाइस प्रबंधन और रियल-टाइम वीडियो',
      cta: 'उत्पाद देखें',
      products: [
        {
          icon: 'DevicePhoneMobileIcon',
          title: 'USS MDM',
          description:
            'वितरित टीमों के लिए सुरक्षित नियंत्रण और अनुपालन हेतु एंटरप्राइज मोबाइल डिवाइस प्रबंधन',
          features: ['रिमोट लॉक और वाइप', 'नीति प्रवर्तन', 'डिवाइस अनुपालन निगरानी'],
          link: '/products/mdm',
        },
        {
          icon: 'VideoCameraIcon',
          title: 'USS वीडियो SDK',
          description:
            'अपने एप्लिकेशन में सुरक्षित और कम विलंबता वाला वीडियो जोड़ने के लिए डेवलपर-फ्रेंडली SDK',
          features: [
            'रियल-टाइम वीडियो और ऑडियो',
            'मल्टी-पार्टिसिपेंट सेशन',
            'एंड-टू-एंड एन्क्रिप्शन',
          ],
          link: '/products/video-sdk',
        },
      ],
    },

    ar: {
      heading: 'قدرات منصة مركزة',
      subheading: 'إدارة الأجهزة وبث الفيديو في الوقت الفعلي للاستخدام الآمن عالميًا',
      cta: 'استكشف المنتجات',
      products: [
        {
          icon: 'DevicePhoneMobileIcon',
          title: 'USS MDM',
          description:
            'إدارة أجهزة محمولة على مستوى المؤسسات للتحكم الآمن والامتثال عبر الفرق الموزعة',
          features: ['القفل والمسح عن بُعد', 'تطبيق السياسات', 'مراقبة الامتثال'],
          link: '/products/mdm',
        },
        {
          icon: 'VideoCameraIcon',
          title: 'USS Video SDK',
          description: 'SDK سهل للمطورين لدمج اتصالات فيديو آمنة ومنخفضة الكمون داخل التطبيقات',
          features: ['فيديو وصوت في الوقت الفعلي', 'جلسات متعددة المشاركين', 'تشفير شامل'],
          link: '/products/video-sdk',
        },
      ],
    },
  };

  const currentContent = content[currentLanguage] || content.en;
  const isRTL = currentLanguage === 'ar';

  return (
    <section className={`py-20 lg:py-28 bg-background ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 ${isRTL ? 'text-right' : 'text-left'} lg:text-center`}
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            {currentContent.heading}
          </h2>
          <p className="text-lg text-muted-foreground">{currentContent.subheading}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {currentContent.products.map((product, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-8 border border-border hover:border-accent transition-all duration-300 hover:shadow-xl group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name={product.icon as any} size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-foreground mb-3">
                {product.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>
              <ul className="space-y-3 mb-6">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-sm text-foreground">
                    <Icon
                      name="CheckCircleIcon"
                      size={18}
                      className="text-accent flex-shrink-0"
                      variant="solid"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={product.link}
                className="inline-flex items-center space-x-2 text-accent font-semibold hover:text-accent/80 transition-colors duration-300"
              >
                <span>
                  {currentLanguage === 'en'
                    ? 'Learn More'
                    : currentLanguage === 'hi'
                      ? 'और जानें'
                      : 'اعرف المزيد'}
                </span>
                <Icon name="ArrowRightIcon" size={16} className={isRTL ? 'rotate-180' : ''} />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/products-overview"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span>{currentContent.cta}</span>
            <Icon name="ArrowRightIcon" size={20} className={isRTL ? 'rotate-180' : ''} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
