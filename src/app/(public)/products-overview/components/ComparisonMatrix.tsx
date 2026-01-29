// 'use client';

// import { useState, useEffect } from 'react';
// import Icon from '@/components/ui/AppIcon';

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   complexity: string;
//   features: { name: string; description: string }[];
//   specs: { label: string; value: string }[];
// }

// interface ComparisonMatrixProps {
//   products: Product[];
//   selectedProducts: string[];
//   onClose: () => void;
// }

// export default function ComparisonMatrix({
//   products,
//   selectedProducts,
//   onClose,
// }: ComparisonMatrixProps) {
//   const [isHydrated, setIsHydrated] = useState(false);

//   useEffect(() => {
//     setIsHydrated(true);
//   }, []);

//   if (!isHydrated) {
//     return (
//       <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//         <div className="bg-card rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
//           <div className="p-6 border-b border-border">
//             <div className="h-8 bg-muted rounded animate-pulse" />
//           </div>
//           <div className="p-6">
//             <div className="space-y-4">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="h-16 bg-muted rounded animate-pulse" />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const comparedProducts = products.filter((p) => selectedProducts.includes(p.id));

//   if (comparedProducts.length === 0) {
//     return null;
//   }

//   const allFeatures = Array.from(
//     new Set(comparedProducts.flatMap((p) => p.features.map((f) => f.name)))
//   );

//   const allSpecs = Array.from(
//     new Set(comparedProducts.flatMap((p) => p.specs.map((s) => s.label)))
//   );

//   return (
//     <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-card rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
//         {/* Header */}
//         <div className="p-6 border-b border-border flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-heading font-semibold text-foreground">
//               Product Comparison
//             </h2>
//             <p className="text-sm text-muted-foreground mt-1">
//               Comparing {comparedProducts.length} product{comparedProducts.length !== 1 ? 's' : ''}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-lg hover:bg-muted transition-colors duration-300"
//             aria-label="Close comparison"
//           >
//             <Icon name="XMarkIcon" size={24} className="text-foreground" />
//           </button>
//         </div>

//         {/* Comparison Table */}
//         <div className="flex-1 overflow-auto p-6">
//           <div className="min-w-max">
//             {/* Product Headers */}
//             <div
//               className="grid gap-4 mb-6"
//               style={{ gridTemplateColumns: `200px repeat(${comparedProducts.length}, 1fr)` }}
//             >
//               <div className="font-medium text-foreground"></div>
//               {comparedProducts.map((product) => (
//                 <div key={product.id} className="bg-muted rounded-lg p-4">
//                   <h3 className="font-heading font-semibold text-foreground mb-1">
//                     {product.name}
//                   </h3>
//                   <p className="text-xs text-muted-foreground">{product.category}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Basic Info */}
//             <div className="mb-6">
//               <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
//                 Basic Information
//               </h3>
//               <div className="space-y-2">
//                 <div
//                   className="grid gap-4"
//                   style={{ gridTemplateColumns: `200px repeat(${comparedProducts.length}, 1fr)` }}
//                 >
//                   <div className="text-sm font-medium text-muted-foreground py-3">Complexity</div>
//                   {comparedProducts.map((product) => (
//                     <div key={product.id} className="py-3">
//                       <span
//                         className={`px-3 py-1 text-xs font-medium rounded-full ${
//                           product.complexity === 'Low'
//                             ? 'bg-trust-builder/10 text-trust-builder'
//                             : product.complexity === 'Medium'
//                               ? 'bg-warning/10 text-warning'
//                               : 'bg-error/10 text-error'
//                         }`}
//                       >
//                         {product.complexity}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Features Comparison */}
//             <div className="mb-6">
//               <h3 className="text-lg font-heading font-semibold text-foreground mb-3">Features</h3>
//               <div className="space-y-2">
//                 {allFeatures.map((featureName) => (
//                   <div
//                     key={featureName}
//                     className="grid gap-4 border-b border-border last:border-0"
//                     style={{ gridTemplateColumns: `200px repeat(${comparedProducts.length}, 1fr)` }}
//                   >
//                     <div className="text-sm font-medium text-muted-foreground py-3">
//                       {featureName}
//                     </div>
//                     {comparedProducts.map((product) => {
//                       const hasFeature = product.features.some((f) => f.name === featureName);
//                       return (
//                         <div key={product.id} className="py-3 flex items-center">
//                           {hasFeature ? (
//                             <Icon name="CheckCircleIcon" size={20} className="text-trust-builder" />
//                           ) : (
//                             <Icon name="XCircleIcon" size={20} className="text-muted-foreground" />
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Specifications Comparison */}
//             <div>
//               <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
//                 Technical Specifications
//               </h3>
//               <div className="space-y-2">
//                 {allSpecs.map((specLabel) => (
//                   <div
//                     key={specLabel}
//                     className="grid gap-4 border-b border-border last:border-0"
//                     style={{ gridTemplateColumns: `200px repeat(${comparedProducts.length}, 1fr)` }}
//                   >
//                     <div className="text-sm font-medium text-muted-foreground py-3">
//                       {specLabel}
//                     </div>
//                     {comparedProducts.map((product) => {
//                       const spec = product.specs.find((s) => s.label === specLabel);
//                       return (
//                         <div key={product.id} className="py-3">
//                           <span className="text-sm text-foreground">{spec ? spec.value : '—'}</span>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="p-6 border-t border-border flex items-center justify-between">
//           <p className="text-sm text-muted-foreground">
//             Select products from the grid above to compare their features and specifications
//           </p>
//           <button
//             onClick={onClose}
//             className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300"
//           >
//             Close Comparison
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: string;
  name: string;
  category: string;
  complexity: string;
  features: { name: string; description: string }[];
  specs: { label: string; value: string }[];
}

interface ComparisonMatrixProps {
  products: Product[];
  selectedProducts: string[];
  onClose: () => void;
}

export default function ComparisonMatrix({
  products,
  selectedProducts,
  onClose,
}: ComparisonMatrixProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="fixed inset-0 bg-[#0B1220]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white/5 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <div className="h-8 bg-white/5 rounded animate-pulse" />
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-white/5 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const comparedProducts = products.filter((p) => selectedProducts.includes(p.id));

  if (comparedProducts.length === 0) {
    return null;
  }

  const allFeatures = Array.from(
    new Set(comparedProducts.flatMap((p) => p.features.map((f) => f.name)))
  );

  const allSpecs = Array.from(
    new Set(comparedProducts.flatMap((p) => p.specs.map((s) => s.label)))
  );

  return (
    <div className="fixed inset-0 bg-[#0B1220]/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="backdrop-blur-2xl bg-white/5 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#0EA5E9]/10 to-[#1B365D]/10">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Icon name="ScaleIcon" size={24} className="text-[#0EA5E9]" />
              Product Comparison
            </h2>
            <p className="text-sm text-white/70 mt-1">
              Comparing {comparedProducts.length} product{comparedProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10"
            aria-label="Close comparison"
          >
            <Icon name="XMarkIcon" size={24} className="text-white" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="flex-1 overflow-auto p-5 sm:p-6">
          <div className="min-w-max">
            {/* Product Headers */}
            <div
              className="grid gap-3 sm:gap-4 mb-6"
              style={{ gridTemplateColumns: `200px repeat(${comparedProducts.length}, 1fr)` }}
            >
              <div className="font-medium text-white"></div>
              {comparedProducts.map((product) => (
                <div
                  key={product.id}
                  className="backdrop-blur-xl bg-gradient-to-br from-[#0EA5E9]/10 to-[#1B365D]/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#0EA5E9]/30"
                >
                  <h3 className="font-bold text-white mb-2 text-sm sm:text-base">{product.name}</h3>
                  <p className="text-xs text-[#0EA5E9]">{product.category}</p>
                </div>
              ))}
            </div>

            {/* Basic Info */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Icon name="InformationCircleIcon" size={20} className="text-[#0EA5E9]" />
                Basic Information
              </h3>
              <div className="space-y-2">
                <div
                  className="grid gap-3 sm:gap-4"
                  style={{ gridTemplateColumns: `200px repeat(${comparedProducts.length}, 1fr)` }}
                >
                  <div className="text-sm font-semibold text-white/70 py-3">Complexity</div>
                  {comparedProducts.map((product) => (
                    <div key={product.id} className="py-3">
                      <span
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
                          product.complexity === 'Low'
                            ? 'bg-[#0EA5E9]/10 text-[#0EA5E9] border border-[#0EA5E9]/30'
                            : product.complexity === 'Medium'
                              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                              : 'bg-red-500/10 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {product.complexity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Comparison */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Icon name="SparklesIcon" size={20} className="text-[#0EA5E9]" />
                Features
              </h3>
              <div className="space-y-2">
                {allFeatures.map((featureName) => (
                  <div
                    key={featureName}
                    className="grid gap-3 sm:gap-4 py-3 border-b border-white/10 last:border-0 hover:bg-white/5 rounded-lg transition-colors"
                    style={{ gridTemplateColumns: `200px repeat(${comparedProducts.length}, 1fr)` }}
                  >
                    <div className="text-sm font-medium text-white/80">{featureName}</div>
                    {comparedProducts.map((product) => {
                      const hasFeature = product.features.some((f) => f.name === featureName);
                      return (
                        <div key={product.id} className="flex items-center">
                          {hasFeature ? (
                            <Icon
                              name="CheckCircleIcon"
                              size={22}
                              className="text-[#0EA5E9]"
                              variant="solid"
                            />
                          ) : (
                            <Icon name="XCircleIcon" size={22} className="text-white/30" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Comparison */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Icon name="CpuChipIcon" size={20} className="text-[#0EA5E9]" />
                Technical Specifications
              </h3>
              <div className="space-y-2">
                {allSpecs.map((specLabel) => (
                  <div
                    key={specLabel}
                    className="grid gap-3 sm:gap-4 py-3 border-b border-white/10 last:border-0 hover:bg-white/5 rounded-lg transition-colors"
                    style={{ gridTemplateColumns: `200px repeat(${comparedProducts.length}, 1fr)` }}
                  >
                    <div className="text-sm font-medium text-white/80">{specLabel}</div>
                    {comparedProducts.map((product) => {
                      const spec = product.specs.find((s) => s.label === specLabel);
                      return (
                        <div key={product.id}>
                          <span className="text-sm text-white font-medium">
                            {spec ? spec.value : '—'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 sm:p-6 border-t border-white/10 bg-gradient-to-r from-[#0EA5E9]/5 to-[#1B365D]/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/70 text-center sm:text-left">
            Select products from the grid above to compare their features and specifications
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white rounded-xl hover:opacity-90 transition-all duration-300 font-semibold shadow-lg"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
