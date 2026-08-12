// 'use client';

// import { useState } from 'react';
// import AppImage from '@/components/ui/AppImage';
// import Icon from '@/components/ui/AppIcon';

// interface ProductFeature {
//   name: string;
//   description: string;
// }

// interface ProductSpec {
//   label: string;
//   value: string;
// }

// interface Product {
//   id: string;
//   name: string;
//   tagline: string;
//   description: string;
//   image: string;
//   alt: string;
//   category: string;
//   features: ProductFeature[];
//   specs: ProductSpec[];
//   integrations: string[];
//   complexity: 'Low' | 'Medium' | 'High';
//   documentation: string;
//   apiEndpoint: string;
// }

// interface ProductCardProps {
//   product: Product;
//   onCompare: (productId: string) => void;
//   isComparing: boolean;
// }

// export default function ProductCard({ product, onCompare, isComparing }: ProductCardProps) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'integrations'>('features');

//   const complexityColors = {
//     Low: 'bg-trust-builder/10 text-trust-builder border-trust-builder/20',
//     Medium: 'bg-warning/10 text-warning border-warning/20',
//     High: 'bg-error/10 text-error border-error/20',
//   };

//   return (
//     <div className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300">
//       {/* Card Header */}
//       <div className="relative h-48 overflow-hidden rounded-t-xl">
//         <AppImage src={product.image} alt={product.alt} className="w-full h-full object-cover" />
//         <div className="absolute top-4 right-4 flex items-center space-x-2">
//           <span
//             className={`px-3 py-1 text-xs font-medium rounded-full border ${complexityColors[product.complexity]}`}
//           >
//             {product.complexity} Complexity
//           </span>
//         </div>
//       </div>

//       {/* Card Content */}
//       <div className="p-6">
//         <div className="flex items-start justify-between mb-3">
//           <div className="flex-1">
//             <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
//               {product.name}
//             </h3>
//             <p className="text-sm text-accent font-medium">{product.tagline}</p>
//           </div>
//           <button
//             onClick={() => onCompare(product.id)}
//             className={`p-2 rounded-lg transition-colors duration-300 ${
//               isComparing
//                 ? 'bg-accent text-accent-foreground'
//                 : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
//             }`}
//             aria-label={isComparing ? 'Remove from comparison' : 'Add to comparison'}
//           >
//             <Icon name="ScaleIcon" size={20} />
//           </button>
//         </div>

//         <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

//         {/* Category Badge */}
//         <div className="flex items-center space-x-2 mb-4">
//           <Icon name="TagIcon" size={16} className="text-muted-foreground" />
//           <span className="text-xs text-muted-foreground font-medium">{product.category}</span>
//         </div>

//         {/* Expand/Collapse Button */}
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="w-full flex items-center justify-between px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-300"
//         >
//           <span className="text-sm font-medium text-foreground">
//             {isExpanded ? 'Hide Details' : 'View Details'}
//           </span>
//           <Icon
//             name="ChevronDownIcon"
//             size={20}
//             className={`text-foreground transition-transform duration-300 ${
//               isExpanded ? 'rotate-180' : ''
//             }`}
//           />
//         </button>

//         {/* Expanded Content */}
//         {isExpanded && (
//           <div className="mt-4 pt-4 border-t border-border animate-slide-in-from-top">
//             {/* Tabs */}
//             <div className="flex items-center space-x-1 mb-4 bg-muted rounded-lg p-1">
//               {(['features', 'specs', 'integrations'] as const).map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors duration-300 ${
//                     activeTab === tab
//                       ? 'bg-card text-foreground shadow-sm'
//                       : 'text-muted-foreground hover:text-foreground'
//                   }`}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>

//             {/* Tab Content */}
//             <div className="space-y-3">
//               {activeTab === 'features' && (
//                 <div className="space-y-2">
//                   {product.features.map((feature, index) => (
//                     <div key={index} className="flex items-start space-x-2">
//                       <Icon
//                         name="CheckCircleIcon"
//                         size={16}
//                         className="text-trust-builder mt-0.5 flex-shrink-0"
//                       />
//                       <div>
//                         <p className="text-sm font-medium text-foreground">{feature.name}</p>
//                         <p className="text-xs text-muted-foreground">{feature.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {activeTab === 'specs' && (
//                 <div className="space-y-2">
//                   {product.specs.map((spec, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between py-2 border-b border-border last:border-0"
//                     >
//                       <span className="text-sm text-muted-foreground">{spec.label}</span>
//                       <span className="text-sm font-medium text-foreground">{spec.value}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {activeTab === 'integrations' && (
//                 <div className="flex flex-wrap gap-2">
//                   {product.integrations.map((integration, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 text-xs font-medium bg-muted text-foreground rounded-full"
//                     >
//                       {integration}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
//               <a
//                 href={product.documentation}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300"
//               >
//                 <Icon name="DocumentTextIcon" size={16} />
//                 <span className="text-sm font-medium">Documentation</span>
//               </a>
//               <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-300">
//                 <Icon name="CodeBracketIcon" size={16} />
//                 <span className="text-sm font-medium">API Explorer</span>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface ProductFeature {
  name: string;
  description: string;
}

interface ProductSpec {
  label: string;
  value: string;
}

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  category: string;
  features: ProductFeature[];
  specs: ProductSpec[];
  integrations: string[];
  complexity: 'Low' | 'Medium' | 'High';
  documentation: string;
  apiEndpoint: string;
  appUrl: string;
}

interface ProductCardProps {
  product: Product;
  onCompare: (productId: string) => void;
  isComparing: boolean;
}

type SessionUser = {
  email?: string;
  services?: string[];
};

export default function ProductCard({ product, onCompare, isComparing }: ProductCardProps) {
  const [isExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'integrations'>('features');
  const [session, setSession] = useState<SessionUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const ussUser = localStorage.getItem('uss_user');
    if (!ussUser) return;

    try {
      const parsed = JSON.parse(ussUser) as SessionUser;
      if (parsed?.email) setSession(parsed);
    } catch {
      localStorage.removeItem('uss_user');
    }
  }, []);

  const openApp = (url: string) => {
    // Apps hosted on a sibling subdomain need a real navigation — next/router
    // only handles in-app routes. The shared session cookies travel with it.
    if (/^https?:\/\//.test(url)) {
      window.location.assign(url);
      return;
    }
    router.push(url);
  };

  const handleOpenApp = () => {
    // No session yet — sign in first, then land back on the products page.
    if (!session) {
      router.push(`/auth?redirect=/products-overview`);
      return;
    }

    // Signed in — go straight to the app. The session travels with the user:
    // in-app routes read localStorage, and the standalone MDM app picks up the
    // shared parent-domain cookies written by lib/ssoHandoff.ts.
    //
    // Deliberately NOT gated on enrollment: the only source of "is enrolled" is
    // a services[] array written locally after an enrollment POST, so it is
    // empty on every fresh login and would wrongly divert enrolled users to the
    // signup form. Re-add a gate here only once the backend reports enrolled
    // services at login.
    openApp(product.appUrl);
  };

  const complexityColors = {
    Low: 'bg-[#0EA5E9]/10 text-[#0EA5E9] border-[#0EA5E9]/30',
    Medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    High: 'bg-red-500/10 text-red-400 border-red-500/30',
  };

  return (
    <div className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-[#0EA5E9]/10 hover:border-[#0EA5E9]/30 transition-all duration-500 overflow-hidden">
      {/* Card Header with Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#1B365D] to-[#0B1220]">
        <AppImage
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent" />
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span
            className={`px-3 py-1.5 text-xs font-semibold rounded-full border backdrop-blur-sm ${complexityColors[product.complexity]}`}
          >
            {product.complexity}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-[#0EA5E9] transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-[#0EA5E9] font-medium">{product.tagline}</p>
          </div>
          <button
            onClick={() => onCompare(product.id)}
            className={`p-2.5 rounded-xl transition-all duration-300 ${
              isComparing
                ? 'bg-[#0EA5E9] text-white shadow-lg shadow-[#0EA5E9]/30'
                : 'bg-white/5 text-white/70 hover:bg-[#0EA5E9] hover:text-white border border-white/10'
            }`}
            aria-label={isComparing ? 'Remove from comparison' : 'Add to comparison'}
          >
            <Icon name="ScaleIcon" size={20} />
          </button>
        </div>

        <p className="text-sm text-white/70 mb-4 line-clamp-2">{product.description}</p>

        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-white/5 border border-white/10 w-fit">
          <Icon name="TagIcon" size={16} className="text-[#0EA5E9]" />
          <span className="text-xs text-white/80 font-medium">{product.category}</span>
        </div>

        {/* Open App / Enroll Button */}
        <button
          onClick={handleOpenApp}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 text-white rounded-xl hover:bg-white/10 border border-white/10 transition-all duration-300"
        >
          <Icon name="ArrowTopRightOnSquareIcon" size={16} />
          <span className="text-sm font-semibold">Open App</span>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/10 animate-slide-in">
            {/* Tabs */}
            <div className="flex items-center gap-1 mb-4 bg-white/5 rounded-xl p-1 border border-white/10">
              {(['features', 'specs', 'integrations'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-3 min-h-[200px]">
              {activeTab === 'features' && (
                <div className="space-y-3">
                  {product.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#0EA5E9]/30 transition-all"
                    >
                      <Icon
                        name="CheckCircleIcon"
                        size={18}
                        className="text-[#0EA5E9] mt-0.5 flex-shrink-0"
                        variant="solid"
                      />
                      <div>
                        <p className="text-sm font-semibold text-white mb-1">{feature.name}</p>
                        <p className="text-xs text-white/60">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-2">
                  {product.specs.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <span className="text-sm text-white/70">{spec.label}</span>
                      <span className="text-sm font-semibold text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'integrations' && (
                <div className="flex flex-wrap gap-2">
                  {product.integrations.map((integration, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-xs font-semibold bg-gradient-to-r from-[#0EA5E9]/10 to-[#1B365D]/10 text-white rounded-lg border border-[#0EA5E9]/30"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
              <a
                href={product.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg"
              >
                <Icon name="DocumentTextIcon" size={16} />
                <span className="text-sm font-semibold">Docs</span>
              </a>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 text-white rounded-xl hover:bg-white/10 border border-white/10 transition-all duration-300">
                <Icon name="CodeBracketIcon" size={16} />
                <span className="text-sm font-semibold">API</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
