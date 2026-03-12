'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { useTranslation } from 'react-i18next';
import { useAuthUser } from '@/hooks/useAuthUser';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { i18n } = useTranslation();

  const { user, loading, logout } = useAuthUser();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    router.push('/home');
  };

  const navigationItems = [
    { label: 'Home', href: '/home', icon: 'HomeIcon' },
    { label: 'Products', href: '/products-overview', icon: 'CubeIcon' },
    { label: 'Enterprise', href: '/enterprise-solutions', icon: 'BuildingOfficeIcon' },
    { label: 'Customers', href: '/customer-stories', icon: 'UserGroupIcon' },
    { label: 'Pricing', href: '/pricing-plans', icon: 'CurrencyDollarIcon' },
  ];
  const authenticatedProductsNavItems = [
    { label: 'Products', href: '/products-overview', icon: 'CubeIcon' },
    { label: 'Enterprise', href: '/enterprise-solutions', icon: 'BuildingOfficeIcon' },
    { label: 'Pricing', href: '/pricing-plans', icon: 'CurrencyDollarIcon' },
    { label: 'Support', href: '/global-support', icon: 'LifebuoyIcon' },
  ];

  const moreItems = [{ label: 'Support', href: '/global-support', icon: 'LifebuoyIcon' }];
  const isActivePath = (href: string) => pathname === href;
  const authenticatedRoutes = [
    '/products-overview',
    '/enterprise-solutions',
    '/pricing-plans',
    '/global-support',
  ];
  const isProductsContext = authenticatedRoutes.some((route) => pathname.startsWith(route));
  const isAuthenticatedProductsView = isProductsContext && !loading && !!user;
  const activeNavigationItems = isAuthenticatedProductsView
    ? authenticatedProductsNavItems
    : navigationItems;
  const avatarName = (user?.displayName || user?.email || 'User').toString().trim();
  const avatarInitial = avatarName ? avatarName.charAt(0).toUpperCase() : 'U';
  const avatarSrc = (user as any)?.avatar || (user as any)?.avatarUrl || (user as any)?.image || null;

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50">
        <div
          className={`transition-all duration-500 ${
            isAuthenticatedProductsView
              ? 'px-0 pt-0'
              : isScrolled
                ? 'px-4 lg:px-8 pt-4'
                : 'pt-4 px-4 lg:px-8'
          }`}
        >
          <div className={isAuthenticatedProductsView ? 'w-full' : 'max-w-7xl mx-auto'}>
            <div
              className={`relative transition-all duration-500 ${
                isAuthenticatedProductsView
                  ? 'backdrop-blur-xl bg-[#08111f]/95 border-b border-[#0EA5E9]/30 rounded-none shadow-xl shadow-[#0EA5E9]/10'
                  : isScrolled
                    ? 'backdrop-blur-2xl bg-[#0B1220]/80 border border-white/10 rounded-full shadow-2xl shadow-[#0EA5E9]/10'
                    : 'backdrop-blur-xl bg-[#0B1220]/60 border border-white/5 rounded-2xl'
              }`}
            >
              {/* Animated gradient border effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0EA5E9]/20 via-[#1B365D]/20 to-[#0EA5E9]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Glowing effect on scroll */}
              {isScrolled && (
                <>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0EA5E9]/10 via-transparent to-[#0EA5E9]/10 animate-pulse" />
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#0EA5E9]/5 to-[#1B365D]/5 blur-xl" />
                </>
              )}

              <div
                className={`relative flex items-center justify-between ${
                  isAuthenticatedProductsView
                    ? 'h-[74px] px-4 sm:px-6 lg:px-10'
                    : 'h-[72px] px-6 lg:px-8'
                }`}
              >
                {/* Logo with enhanced design */}
                <Link
                  href={isAuthenticatedProductsView ? '/products-overview' : '/home'}
                  className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''} group`}
                >
                  <div className="relative">
                    {/* Glowing background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />

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
                    <span className="text-xl font-heading font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-[#0EA5E9] group-hover:to-white transition-all duration-300">
                      USS
                    </span>
                 
                  </div>
                </Link>

                {/* DESKTOP NAV with icons */}
                <nav
                  className={`hidden lg:flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {activeNavigationItems.map((item) => {
                    const isActive = isActivePath(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`group relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-full overflow-hidden ${
                          isActive ? 'text-white' : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {/* Active background with gradient */}
                        {isActive && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D]" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/50 to-[#1B365D]/50 animate-pulse" />
                          </>
                        )}

                        {/* Hover effect */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}

                        <span className="relative flex items-center gap-2">
                          <Icon
                            name={item.icon}
                            size={16}
                            className={isActive ? '' : 'opacity-60 group-hover:opacity-100'}
                          />
                          {item.label}
                        </span>

                        {/* Active indicator dot */}
                        {isActive && (
                          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                        )}
                      </Link>
                    );
                  })}

                  {/* MORE DROPDOWN with enhanced design */}
                  {!isAuthenticatedProductsView && (
                    <div className="relative group">
                      <button className="px-4 py-2.5 flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-all duration-300 rounded-full hover:bg-white/5">
                        <Icon name="EllipsisHorizontalIcon" size={16} />
                        <span>More</span>
                        <Icon
                          name="ChevronDownIcon"
                          size={14}
                          className="transition-transform group-hover:rotate-180"
                        />
                      </button>

                      <div
                        className={`absolute top-full mt-3 w-56 backdrop-blur-2xl bg-[#0B1220]/90 border border-white/10 rounded-2xl shadow-2xl shadow-[#0EA5E9]/10 overflow-hidden
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300
                        ${isRTL ? 'left-0' : 'right-0'}`}
                      >
                        {moreItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
                          >
                            <Icon name={item.icon} size={18} />
                            <span>{item.label}</span>
                            <Icon
                              name="ArrowRightIcon"
                              size={14}
                              className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </nav>

                {/* DESKTOP ACTIONS with enhanced buttons */}
                <div
                  className={`hidden lg:flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {!loading && !user && (
                    <>
                      {/* Login Button */}
                      <Link
                        href="/auth?mode=login&redirect=/home"
                        className="relative group px-6 py-2.5 text-sm font-medium text-white/90 rounded-full border border-white/20 hover:border-[#0EA5E9]/50 transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative">Login</span>
                      </Link>

                      {/* Sign Up Button */}
                      <Link
                        href="/auth?mode=signup&redirect=/home"
                        className="relative group px-6 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D]" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative flex items-center gap-2">
                          Sign up
                          <Icon
                            name="ArrowRightIcon"
                            size={16}
                            className="transform group-hover:translate-x-1 transition-transform"
                          />
                        </span>
                      </Link>
                    </>
                  )}

                  {!loading && user && !isAuthenticatedProductsView && (
                    <button
                      onClick={() => setShowLogoutConfirm(true)}
                      className="relative group px-6 py-2.5 text-sm font-medium text-red-400 rounded-full border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        <Icon name="ArrowRightOnRectangleIcon" size={16} />
                        Sign out
                      </span>
                    </button>
                  )}

                  {!loading && user && isAuthenticatedProductsView && (
                    <div className="relative group">
                      <button className="flex items-center gap-3 rounded-full border border-[#0EA5E9]/30 bg-[#0B1220]/60 px-2 py-1.5 hover:border-[#0EA5E9]/60 transition-colors">
                        <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#0EA5E9]/50 bg-gradient-to-br from-[#0EA5E9] to-[#1B365D] text-sm font-bold text-white">
                          {avatarSrc ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={avatarSrc}
                              alt={avatarName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            avatarInitial
                          )}
                        </span>
                        <span className="max-w-[140px] truncate text-sm font-medium text-white/90">
                          {avatarName}
                        </span>
                        <Icon name="ChevronDownIcon" size={14} className="text-white/70" />
                      </button>

                      <div
                        className={`absolute top-full mt-3 min-w-[180px] rounded-xl border border-white/10 bg-[#0B1220]/95 p-1 opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible ${
                          isRTL ? 'left-0' : 'right-0'
                        }`}
                      >
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                        >
                          <Icon name="UserCircleIcon" size={16} />
                          Profile
                        </Link>
                        <button
                          onClick={() => setShowLogoutConfirm(true)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-300 hover:bg-red-500/10 hover:text-red-200"
                        >
                          <Icon name="ArrowRightOnRectangleIcon" size={16} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}

                  {/* LANGUAGE SELECTOR with enhanced dropdown */}
                  {!isAuthenticatedProductsView && (
                    <div className="relative group">
                      <button
                        onClick={() => setIsLangOpen((v) => !v)}
                        className="p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
                      >
                        <Icon name="GlobeAltIcon" size={20} />
                      </button>

                      {isLangOpen && (
                        <div
                          className={`absolute top-full mt-3 min-w-[180px] backdrop-blur-2xl bg-[#0B1220]/90 border border-white/10 rounded-2xl shadow-2xl shadow-[#0EA5E9]/10 overflow-hidden z-50
                        ${isRTL ? 'left-0' : 'right-0'}`}
                        >
                          {[
                            { code: 'en', label: 'English', flag: '🇺🇸' },
                            { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
                            { code: 'ar', label: 'العربية', flag: '🇦🇪' },
                          ].map((l) => (
                            <button
                              key={l.code}
                              onClick={() => {
                                changeLanguage(l.code);
                                setIsLangOpen(false);
                              }}
                              className={`w-full px-5 py-3 text-sm flex items-center gap-3 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 ${
                                i18n.language === l.code ? 'bg-white/5 text-white' : ''
                              }`}
                            >
                              <span className="text-lg">{l.flag}</span>
                              <span className="flex-1 text-left">{l.label}</span>
                              {i18n.language === l.code && (
                                <Icon name="CheckIcon" size={16} className="text-[#0EA5E9]" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* MOBILE TOGGLE with enhanced animation */}
                <button
                  onClick={() => setIsMobileMenuOpen((v) => !v)}
                  className="lg:hidden p-2.5 rounded-full text-white/90 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="relative w-6 h-6">
                    <span
                      className={`absolute top-1 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                        isMobileMenuOpen ? 'rotate-45 top-2.5' : ''
                      }`}
                    />
                    <span
                      className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                        isMobileMenuOpen ? 'opacity-0' : ''
                      }`}
                    />
                    <span
                      className={`absolute top-4 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                        isMobileMenuOpen ? '-rotate-45 top-2.5' : ''
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* MOBILE MENU with enhanced glassmorphism */}
            {isMobileMenuOpen && (
              <div className="lg:hidden mt-4 backdrop-blur-2xl bg-[#0B1220]/80 border border-white/10 rounded-2xl shadow-2xl shadow-[#0EA5E9]/10 overflow-hidden animate-fadeIn">
                <nav className="px-4 py-4 space-y-1">
                  {activeNavigationItems.map((item) => {
                    const isActive = isActivePath(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white shadow-lg shadow-[#0EA5E9]/20'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon name={item.icon} size={18} />
                        <span>{item.label}</span>
                        {isActive && (
                          <Icon
                            name="CheckCircleIcon"
                            size={16}
                            className="ml-auto"
                            variant="solid"
                          />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile Auth Buttons */}
                {!loading && !user && (
                  <div className="px-4 pb-4 pt-2 space-y-2">
                    <Link
                      href="/auth?mode=login&redirect=/home"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-sm font-medium text-center text-white/90 rounded-xl border border-white/20 hover:bg-white/5 transition-all duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth?mode=signup&redirect=/home"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-sm font-semibold text-center text-white rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] shadow-lg shadow-[#0EA5E9]/20 transition-all duration-300"
                    >
                      Sign up
                    </Link>
                  </div>
                )}

                {!loading && user && !isAuthenticatedProductsView && (
                  <div className="px-4 pb-4 pt-2">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="block w-full px-4 py-3 text-sm font-medium text-center text-red-400 rounded-xl border border-red-500/30 hover:bg-red-500/10 transition-all duration-300"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Icon name="ArrowRightOnRectangleIcon" size={16} />
                        Sign out
                      </span>
                    </button>
                  </div>
                )}

                {!loading && user && isAuthenticatedProductsView && (
                  <div className="px-4 pb-4 pt-2 space-y-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-4 py-3 text-sm font-medium text-center text-white rounded-xl border border-white/20 hover:bg-white/5 transition-all duration-300"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="block w-full px-4 py-3 text-sm font-medium text-center text-red-400 rounded-xl border border-red-500/30 hover:bg-red-500/10 transition-all duration-300"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Icon name="ArrowRightOnRectangleIcon" size={16} />
                        Logout
                      </span>
                    </button>
                  </div>
                )}

                {/* MOBILE LANGUAGE SWITCHER */}
                {!isAuthenticatedProductsView && (
                  <div className="px-4 py-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-white/60 font-medium">Language</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { code: 'en', label: 'EN', flag: '🇺🇸' },
                        { code: 'hi', label: 'HI', flag: '🇮🇳' },
                        { code: 'ar', label: 'AR', flag: '🇦🇪' },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all duration-300 ${
                            i18n.language === lang.code
                              ? 'bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white border-transparent'
                              : 'text-white/70 border-white/20 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-base">{lang.flag}</span>
                            <span>{lang.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </header>

      <ConfirmDialog
        open={showLogoutConfirm}
        title="Sign out"
        description="Are you sure you want to sign out?"
        confirmText="Sign out"
        cancelText="Cancel"
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Header;
