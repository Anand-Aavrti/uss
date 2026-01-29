// 'use client';

// import { useState, useEffect } from 'react';
// import Icon from '@/components/ui/AppIcon';

// interface FilterPanelProps {
//   categories: string[];
//   complexities: string[];
//   selectedCategory: string;
//   selectedComplexity: string;
//   onCategoryChange: (category: string) => void;
//   onComplexityChange: (complexity: string) => void;
//   onReset: () => void;
// }

// export default function FilterPanel({
//   categories,
//   complexities,
//   selectedCategory,
//   selectedComplexity,
//   onCategoryChange,
//   onComplexityChange,
//   onReset,
// }: FilterPanelProps) {
//   const [isHydrated, setIsHydrated] = useState(false);

//   useEffect(() => {
//     setIsHydrated(true);
//   }, []);

//   if (!isHydrated) {
//     return (
//       <div className="bg-card rounded-xl border border-border p-6">
//         <div className="space-y-6">
//           <div className="h-8 bg-muted rounded animate-pulse" />
//           <div className="space-y-2">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="h-10 bg-muted rounded animate-pulse" />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const hasActiveFilters = selectedCategory !== 'All' || selectedComplexity !== 'All';

//   return (
//     <div className="bg-card rounded-xl border border-border p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-lg font-heading font-semibold text-foreground">Filters</h3>
//         {hasActiveFilters && (
//           <button
//             onClick={onReset}
//             className="text-sm text-accent hover:text-accent/80 font-medium transition-colors duration-300"
//           >
//             Reset All
//           </button>
//         )}
//       </div>

//       {/* Category Filter */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-foreground mb-3">Category</label>
//         <div className="space-y-2">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => onCategoryChange(category)}
//               className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
//                 selectedCategory === category
//                   ? 'bg-primary text-primary-foreground shadow-sm'
//                   : 'bg-muted text-foreground hover:bg-muted/80'
//               }`}
//             >
//               <span className="text-sm font-medium">{category}</span>
//               {selectedCategory === category && <Icon name="CheckIcon" size={16} />}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Complexity Filter */}
//       {/* <div>
//         <label className="block text-sm font-medium text-foreground mb-3">
//           Integration Complexity
//         </label>
//         <div className="space-y-2">
//           {complexities.map((complexity) => (
//             <button
//               key={complexity}
//               onClick={() => onComplexityChange(complexity)}
//               className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
//                 selectedComplexity === complexity
//                   ? 'bg-primary text-primary-foreground shadow-sm'
//                   : 'bg-muted text-foreground hover:bg-muted/80'
//               }`}
//             >
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm font-medium">{complexity}</span>
//                 {complexity !== 'All' && (
//                   <span
//                     className={`w-2 h-2 rounded-full ${
//                       complexity === 'Low'
//                         ? 'bg-trust-builder'
//                         : complexity === 'Medium'
//                           ? 'bg-warning'
//                           : 'bg-error'
//                     }`}
//                   />
//                 )}
//               </div>
//               {selectedComplexity === complexity && <Icon name="CheckIcon" size={16} />}
//             </button>
//           ))}
//         </div>
//       </div> */}

//       {/* Info Box */}
//       <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
//         <div className="flex items-start space-x-3">
//           <Icon
//             name="InformationCircleIcon"
//             size={20}
//             className="text-accent flex-shrink-0 mt-0.5"
//           />
//           <div>
//             <p className="text-xs text-foreground font-medium mb-1">Filter Tips</p>
//             <p className="text-xs text-muted-foreground">
//               Use filters to narrow down products based on your technical requirements and
//               integration complexity needs.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterPanelProps {
  categories: string[];
  complexities: string[];
  selectedCategory: string;
  selectedComplexity: string;
  onCategoryChange: (category: string) => void;
  onComplexityChange: (complexity: string) => void;
  onReset: () => void;
}

export default function FilterPanel({
  categories,
  complexities,
  selectedCategory,
  selectedComplexity,
  onCategoryChange,
  onComplexityChange,
  onReset,
}: FilterPanelProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
        <div className="space-y-6">
          <div className="h-8 bg-white/5 rounded animate-pulse" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-white/5 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const hasActiveFilters = selectedCategory !== 'All' || selectedComplexity !== 'All';

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-5 sm:p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Icon name="AdjustmentsHorizontalIcon" size={20} className="text-[#0EA5E9]" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-semibold transition-colors duration-300"
          >
            Reset
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-white mb-3">Category</label>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white shadow-lg'
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <span className="text-sm font-medium">{category}</span>
              {selectedCategory === category && <Icon name="CheckIcon" size={16} />}
            </button>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 rounded-xl backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <Icon
            name="InformationCircleIcon"
            size={20}
            className="text-[#0EA5E9] flex-shrink-0 mt-0.5"
          />
          <div>
            <p className="text-xs text-white font-semibold mb-1">Filter Tips</p>
            <p className="text-xs text-white/70">
              Use filters to narrow down products based on your technical requirements and
              integration complexity needs.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl font-bold text-[#0EA5E9]">2</div>
            <div className="text-xs text-white/60 mt-1">Products</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
            <div className="text-2xl font-bold text-[#0EA5E9]">85+</div>
            <div className="text-xs text-white/60 mt-1">Countries</div>
          </div>
        </div>
      </div>
    </div>
  );
}
