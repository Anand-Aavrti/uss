'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface FooterProps {
  currentLanguage: string;
}

const Footer = ({ currentLanguage }: FooterProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  const content: Record<string, any> = {
    en: {
      products: {
        title: 'Products',
        links: [
          { label: 'USS Cloud', href: '/products-overview' },
          { label: 'USS Database', href: '/products-overview' },
          { label: 'USS CDN', href: '/products-overview' },
          { label: 'Enterprise Solutions', href: '/enterprise-solutions' },
        ],
      },
      company: {
        title: 'Company',
        links: [
          { label: 'Customer Stories', href: '/customer-stories' },
          { label: 'Pricing', href: '/pricing-plans' },
          { label: 'Support', href: '/global-support' },
        ],
      },
      resources: {
        title: 'Resources',
        links: [
          { label: 'Documentation', href: '/global-support' },
          { label: 'API Reference', href: '/global-support' },
          { label: 'Community', href: '/global-support' },
        ],
      },
      tagline: 'Built for teams across the world',
      copyright: 'All rights reserved.',
    },
    hi: {
      products: {
        title: 'उत्पाद',
        links: [
          { label: 'USS क्लाउड', href: '/products-overview' },
          { label: 'USS डेटाबेस', href: '/products-overview' },
          { label: 'USS CDN', href: '/products-overview' },
          { label: 'एंटरप्राइज समाधान', href: '/enterprise-solutions' },
        ],
      },
      company: {
        title: 'कंपनी',
        links: [
          { label: 'ग्राहक कहानियां', href: '/customer-stories' },
          { label: 'मूल्य निर्धारण', href: '/pricing-plans' },
          { label: 'समर्थन', href: '/global-support' },
        ],
      },
      resources: {
        title: 'संसाधन',
        links: [
          { label: 'दस्तावेज़ीकरण', href: '/global-support' },
          { label: 'API संदर्भ', href: '/global-support' },
          { label: 'समुदाय', href: '/global-support' },
        ],
      },
      tagline: 'दुनिया भर की टीमों के लिए बनाया गया',
      copyright: 'सर्वाधिकार सुरक्षित।',
    },
    ar: {
      products: {
        title: 'المنتجات',
        links: [
          { label: 'USS السحابة', href: '/products-overview' },
          { label: 'USS قاعدة البيانات', href: '/products-overview' },
          { label: 'USS CDN', href: '/products-overview' },
          { label: 'حلول المؤسسات', href: '/enterprise-solutions' },
        ],
      },
      company: {
        title: 'الشركة',
        links: [
          { label: 'قصص العملاء', href: '/customer-stories' },
          { label: 'التسعير', href: '/pricing-plans' },
          { label: 'الدعم', href: '/global-support' },
        ],
      },
      resources: {
        title: 'الموارد',
        links: [
          { label: 'الوثائق', href: '/global-support' },
          { label: 'مرجع API', href: '/global-support' },
          { label: 'المجتمع', href: '/global-support' },
        ],
      },
      tagline: 'مصممة للفرق في جميع أنحاء العالم',
      copyright: 'جميع الحقوق محفوظة.',
    },
  };

  const currentContent = content[currentLanguage] || content.en;
  const isRTL = currentLanguage === 'ar';

  const socialLinks = [
    { name: 'Twitter', icon: 'XMarkIcon', href: '#' },
    { name: 'LinkedIn', icon: 'LinkedInIcon', href: '#' }, // assuming you have this icon
    { name: 'GitHub', icon: 'CodeBracketIcon', href: '#' },
  ];

  return (
    <footer
      className={`relative bg-gradient-to-b from-[#0B1220] to-[#1B365D]/30 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-[#0EA5E9]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-[#1B365D]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-16 lg:mb-20">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/home"
              className={`flex items-center gap-3 mb-6 group ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/40 to-[#1B365D]/40 rounded-xl blur-md opacity-60 group-hover:opacity-90 transition-opacity" />
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative transform group-hover:scale-110 transition-transform duration-300"
                >
                  <rect width="40" height="40" rx="8" fill="url(#logo-gradient)" />
                  <defs>
                    <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40">
                      <stop offset="0%" stopColor="#1B365D" />
                      <stop offset="100%" stopColor="#0EA5E9" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 20L18 14L24 20L30 14"
                    stroke="#0EA5E9"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-white transition-colors"
                  />
                  <path
                    d="M12 26L18 20L24 26L30 20"
                    stroke="#0EA5E9"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-white transition-colors"
                  />
                  <circle
                    cx="18"
                    cy="14"
                    r="2"
                    fill="#FFFFFF"
                    className="group-hover:fill-[#0EA5E9] transition-colors"
                  />
                  <circle
                    cx="24"
                    cy="20"
                    r="2"
                    fill="#FFFFFF"
                    className="group-hover:fill-[#0EA5E9] transition-colors"
                  />
                  <circle
                    cx="30"
                    cy="14"
                    r="2"
                    fill="#FFFFFF"
                    className="group-hover:fill-[#0EA5E9] transition-colors"
                  />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="text-2xl font-heading font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent group-hover:from-[#0EA5E9] group-hover:to-white transition-all duration-300">
                  USS
                </span>
                <span className="text-xs text-white/60 font-medium tracking-wide group-hover:text-[#0EA5E9] transition-colors">
                  Global Infrastructure
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              {currentContent.tagline}
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-5">
              {currentContent.products.title}
            </h3>
            <ul className="space-y-3">
              {currentContent.products.links.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group relative text-sm text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-5">
              {currentContent.company.title}
            </h3>
            <ul className="space-y-3">
              {currentContent.company.links.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group relative text-sm text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-5">
              {currentContent.resources.title}
            </h3>
            <ul className="space-y-3">
              {currentContent.resources.links.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group relative text-sm text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-white/60">
            {isHydrated && currentYear
              ? `© ${currentYear} USS. ${currentContent.copyright}`
              : `© USS. ${currentContent.copyright}`}
          </p>

          <div className="flex items-center gap-5">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="group p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#0EA5E9]/40 transition-all duration-300"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  name={social.icon as any}
                  size={18}
                  className="text-white/70 group-hover:text-[#0EA5E9] transition-colors"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
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
    </footer>
  );
};

export default Footer;
