// 'use client';

// import { useState, useEffect } from 'react';
// import ProductCard from './ProductCard';
// import ComparisonMatrix from './ComparisonMatrix';
// import FilterPanel from './FilterPanel';
// import ArchitectureDiagram from './ArchitectureDiagram';
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

// const mockProducts: Product[] = [
//   {
//     id: 'uss-mdm',
//     name: 'USS MDM',
//     tagline: 'Secure Device Management at Scale',
//     description:
//       'Enterprise-grade Mobile Device Management platform designed to centrally manage, secure, and monitor devices across global teams with minimal operational overhead.',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_mdm.png',
//     alt: 'Clean dashboard showing managed mobile and desktop devices',
//     category: 'Device Management',
//     features: [
//       {
//         name: 'Centralized Device Control',
//         description: 'Manage all enrolled devices from a single, unified console',
//       },
//       {
//         name: 'Policy Enforcement',
//         description: 'Apply security, access, and compliance policies in real time',
//       },
//       {
//         name: 'Remote Actions',
//         description: 'Lock, wipe, or reset devices instantly from anywhere',
//       },
//       {
//         name: 'Compliance Monitoring',
//         description: 'Track device health and compliance status continuously',
//       },
//     ],
//     specs: [
//       { label: 'Supported Devices', value: 'Android, iOS, Windows' },
//       { label: 'Policy Sync', value: 'Real-time' },
//       { label: 'Encryption', value: 'AES-256' },
//       { label: 'Deployment', value: 'Cloud-based' },
//     ],
//     integrations: ['Google Workspace', 'Microsoft Entra ID', 'Apple Business Manager'],
//     complexity: 'Medium',
//     documentation: 'https://docs.uss.example/mdm',
//     apiEndpoint: '/api/v1/mdm',
//   },
//   {
//     id: 'uss-video-sdk',
//     name: 'USS Video SDK',
//     tagline: 'Real-Time Video, Built In',
//     description:
//       'Developer-friendly video SDK for embedding secure, low-latency video communication directly into web and mobile applications with global reliability.',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_video.png',
//     alt: 'Minimal video call interface with multiple participants',
//     category: 'Video Infrastructure',
//     features: [
//       {
//         name: 'Real-Time Video & Audio',
//         description: 'Low-latency video streaming optimized for global networks',
//       },
//       {
//         name: 'Scalable Sessions',
//         description: 'Support 1:1 calls or multi-participant rooms with ease',
//       },
//       { name: 'Secure by Default', description: 'End-to-end encrypted media transport' },
//       {
//         name: 'Easy SDK Integration',
//         description: 'Simple APIs and clear documentation for fast adoption',
//       },
//     ],
//     specs: [
//       { label: 'Latency (Avg)', value: '<200ms' },
//       { label: 'Max Participants', value: '100+' },
//       { label: 'Encryption', value: 'DTLS-SRTP' },
//       { label: 'Platforms', value: 'Web, Android, iOS' },
//     ],
//     integrations: ['WebRTC', 'React', 'Android SDK', 'iOS SDK'],
//     complexity: 'Low',
//     documentation: 'https://docs.uss.example/video-sdk',
//     apiEndpoint: '/api/v1/video',
//   },
// ];

// export default function ProductsInteractive() {
//   const [isHydrated, setIsHydrated] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedComplexity, setSelectedComplexity] = useState('All');
//   const [comparedProducts, setComparedProducts] = useState<string[]>([]);
//   const [showComparison, setShowComparison] = useState(false);
//   const [showArchitecture, setShowArchitecture] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     setIsHydrated(true);
//   }, []);

//   if (!isHydrated) {
//     return (
//       <div className="min-h-screen bg-background pt-[72px]">
//         <div className="w-full px-6 lg:px-8 py-12">
//           <div className="max-w-7xl mx-auto">
//             <div className="h-32 bg-muted rounded animate-pulse mb-8" />
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//               <div className="lg:col-span-1">
//                 <div className="h-96 bg-muted rounded animate-pulse" />
//               </div>
//               <div className="lg:col-span-3">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {[1, 2, 3, 4].map((i) => (
//                     <div key={i} className="h-96 bg-muted rounded animate-pulse" />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const categories = ['All', ...Array.from(new Set(mockProducts.map((p) => p.category)))];
//   const complexities = ['All', 'Low', 'Medium', 'High'];

//   const filteredProducts = mockProducts.filter((product) => {
//     const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
//     const matchesComplexity =
//       selectedComplexity === 'All' || product.complexity === selectedComplexity;
//     const matchesSearch =
//       searchQuery === '' ||
//       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesComplexity && matchesSearch;
//   });

//   const handleCompareToggle = (productId: string) => {
//     setComparedProducts((prev) => {
//       if (prev.includes(productId)) {
//         return prev.filter((id) => id !== productId);
//       }
//       if (prev.length >= 4) {
//         return prev;
//       }
//       return [...prev, productId];
//     });
//   };

//   const handleResetFilters = () => {
//     setSelectedCategory('All');
//     setSelectedComplexity('All');
//     setSearchQuery('');
//   };

//   return (
//     <div className="min-h-screen bg-background pt-[72px]">
//       <div className="w-full px-6 lg:px-8 py-12">
//         <div className="max-w-7xl mx-auto">
//           {/* Hero Section */}
//           <div className="mb-12">
//             <div className="flex items-center space-x-2 mb-4">
//               <Icon name="CubeIcon" size={32} className="text-accent" />
//               <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
//                 Product Ecosystem
//               </h1>
//             </div>
//             <p className="text-lg text-muted-foreground max-w-3xl">
//               Explore our comprehensive suite of enterprise-grade products designed for global
//               infrastructure. Each product is built with technical excellence, security, and
//               scalability at its core.
//             </p>
//           </div>

//           {/* Search and Actions Bar */}
//           <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div className="relative flex-1 max-w-md">
//               <Icon
//                 name="MagnifyingGlassIcon"
//                 size={20}
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//               />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
//               />
//             </div>
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={() => setShowArchitecture(true)}
//                 className="flex items-center space-x-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300"
//               >
//                 <Icon name="ChartBarIcon" size={20} />
//                 <span className="text-sm font-medium">View Architecture</span>
//               </button>
//               {comparedProducts.length > 0 && (
//                 <button
//                   onClick={() => setShowComparison(true)}
//                   className="flex items-center space-x-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-300"
//                 >
//                   <Icon name="ScaleIcon" size={20} />
//                   <span className="text-sm font-medium">Compare ({comparedProducts.length})</span>
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//             {/* Filter Panel */}
//             <div className="lg:col-span-1">
//               <FilterPanel
//                 categories={categories}
//                 complexities={complexities}
//                 selectedCategory={selectedCategory}
//                 selectedComplexity={selectedComplexity}
//                 onCategoryChange={setSelectedCategory}
//                 onComplexityChange={setSelectedComplexity}
//                 onReset={handleResetFilters}
//               />
//             </div>

//             {/* Products Grid */}
//             <div className="lg:col-span-3">
//               {filteredProducts.length === 0 ? (
//                 <div className="bg-card rounded-xl border border-border p-12 text-center">
//                   <Icon
//                     name="FolderOpenIcon"
//                     size={48}
//                     className="text-muted-foreground mx-auto mb-4"
//                   />
//                   <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
//                     No Products Found
//                   </h3>
//                   <p className="text-sm text-muted-foreground mb-4">
//                     Try adjusting your filters or search query to find what you're looking for.
//                   </p>
//                   <button
//                     onClick={handleResetFilters}
//                     className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300"
//                   >
//                     Reset Filters
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <div className="mb-4 flex items-center justify-between">
//                     <p className="text-sm text-muted-foreground">
//                       Showing {filteredProducts.length} of {mockProducts.length} products
//                     </p>
//                     {comparedProducts.length > 0 && (
//                       <button
//                         onClick={() => setComparedProducts([])}
//                         className="text-sm text-accent hover:text-accent/80 font-medium transition-colors duration-300"
//                       >
//                         Clear Selection
//                       </button>
//                     )}
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {filteredProducts.map((product) => (
//                       <ProductCard
//                         key={product.id}
//                         product={product}
//                         onCompare={handleCompareToggle}
//                         isComparing={comparedProducts.includes(product.id)}
//                       />
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Info Banner */}
//           <div className="mt-12 bg-accent/10 border border-accent/20 rounded-xl p-6">
//             <div className="flex items-start space-x-4">
//               <Icon name="LightBulbIcon" size={24} className="text-accent flex-shrink-0 mt-1" />
//               <div>
//                 <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
//                   Need Help Choosing?
//                 </h3>
//                 <p className="text-sm text-muted-foreground mb-4">
//                   Our technical team can help you select the right products for your infrastructure
//                   needs. Schedule a consultation to discuss your requirements and get personalized
//                   recommendations.
//                 </p>
//                 <div className="flex items-center space-x-3">
//                   <a
//                     href="/pricing-plans"
//                     className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 text-sm font-medium"
//                   >
//                     Schedule Demo
//                   </a>
//                   <a
//                     href="/global-support"
//                     className="px-6 py-2 bg-card text-foreground border border-border rounded-lg hover:bg-muted transition-colors duration-300 text-sm font-medium"
//                   >
//                     Contact Support
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       {showComparison && (
//         <ComparisonMatrix
//           products={mockProducts}
//           selectedProducts={comparedProducts}
//           onClose={() => setShowComparison(false)}
//         />
//       )}

//       {showArchitecture && <ArchitectureDiagram onClose={() => setShowArchitecture(false)} />}
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import ComparisonMatrix from './ComparisonMatrix';
import FilterPanel from './FilterPanel';
import ArchitectureDiagram from './ArchitectureDiagram';
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

const mockProducts: Product[] = [
  {
    id: 'uss-mdm',
    name: 'USS MDM',
    tagline: 'Secure Device Management at Scale',
    description:
      'Enterprise-grade Mobile Device Management platform designed to centrally manage, secure, and monitor devices across global teams with minimal operational overhead.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_mdm.png',
    alt: 'Clean dashboard showing managed mobile and desktop devices',
    category: 'Device Management',
    appUrl: '/apps/mdm',
    features: [
      {
        name: 'Centralized Device Control',
        description: 'Manage all enrolled devices from a single, unified console',
      },
      {
        name: 'Policy Enforcement',
        description: 'Apply security, access, and compliance policies in real time',
      },
      {
        name: 'Remote Actions',
        description: 'Lock, wipe, or reset devices instantly from anywhere',
      },
      {
        name: 'Compliance Monitoring',
        description: 'Track device health and compliance status continuously',
      },
    ],
    specs: [
      { label: 'Supported Devices', value: 'Android, iOS, Windows' },
      { label: 'Policy Sync', value: 'Real-time' },
      { label: 'Encryption', value: 'AES-256' },
      { label: 'Deployment', value: 'Cloud-based' },
    ],
    integrations: ['Google Workspace', 'Microsoft Entra ID', 'Apple Business Manager'],
    complexity: 'Medium',
    documentation: 'https://docs.uss.example/mdm',
    apiEndpoint: '/api/v1/mdm',
  },
  {
    id: 'uss-video-sdk',
    name: 'USS Video SDK',
    tagline: 'Real-Time Video, Built In',
    description:
      'Developer-friendly video SDK for embedding secure, low-latency video communication with live translation directly into web and mobile applications.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_video.png',
    alt: 'Minimal video call interface with multiple participants',
    category: 'Video Infrastructure',
    appUrl: '/apps/video-sdk',

    features: [
      {
        name: 'Real-Time Video & Audio',
        description: 'Low-latency video streaming optimized for global networks',
      },
      {
        name: 'Scalable Sessions',
        description: 'Support 1:1 calls or multi-participant rooms with ease',
      },
      { name: 'Secure by Default', description: 'End-to-end encrypted media transport' },
      {
        name: 'Easy SDK Integration',
        description: 'Simple APIs and clear documentation for fast adoption',
      },
    ],
    specs: [
      { label: 'Latency (Avg)', value: '<50ms' },
      { label: 'Max Participants', value: '100+' },
      { label: 'Encryption', value: 'DTLS-SRTP' },
      { label: 'Platforms', value: 'Web, Android, iOS' },
    ],
    integrations: ['WebRTC', 'React', 'Android SDK', 'iOS SDK'],
    complexity: 'Low',
    documentation: 'https://docs.uss.example/video-sdk',
    apiEndpoint: '/api/v1/video',
  },
];

export default function ProductsInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedComplexity, setSelectedComplexity] = useState('All');
  const [comparedProducts, setComparedProducts] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Animated background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
    }));

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(14, 165, 233, 0.3)';

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = 'rgba(14, 165, 233, 0.1)';
      ctx.lineWidth = 1;
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#0B1220] pt-[72px]">
        <div className="w-full px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="h-32 bg-white/5 rounded animate-pulse mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <div className="h-96 bg-white/5 rounded animate-pulse" />
              </div>
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-96 bg-white/5 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const categories = ['All', ...Array.from(new Set(mockProducts.map((p) => p.category)))];
  const complexities = ['All', 'Low', 'Medium', 'High'];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesComplexity =
      selectedComplexity === 'All' || product.complexity === selectedComplexity;
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesComplexity && matchesSearch;
  });

  const handleCompareToggle = (productId: string) => {
    setComparedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, productId];
    });
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedComplexity('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#0B1220] pt-[72px] relative overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
      />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-[#0EA5E9]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-[#1B365D]/30 rounded-full blur-3xl animate-pulse pointer-events-none"
        style={{ animationDelay: '1s' }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 backdrop-blur-sm mb-4 sm:mb-6">
              <Icon name="SparklesIcon" size={16} className="text-[#0EA5E9]" />
              <span className="text-sm text-[#0EA5E9] font-medium">Product Ecosystem</span>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Icon name="CubeIcon" size={32} className="text-[#0EA5E9] mt-1 hidden sm:block" />
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-3 sm:mb-4">
                  Product Ecosystem
                </h1>
                <p className="text-base sm:text-lg text-white/70 max-w-3xl">
                  Explore our comprehensive suite of enterprise-grade products designed for global
                  infrastructure. Each product is built with technical excellence, security, and
                  scalability at its core.
                </p>
              </div>
            </div>
          </div>

          {/* Search and Actions Bar */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="relative flex-1 w-full max-w-md">
              <Icon
                name="MagnifyingGlassIcon"
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filter Panel */}
            <div className="lg:col-span-1">
              <FilterPanel
                categories={categories}
                complexities={complexities}
                selectedCategory={selectedCategory}
                selectedComplexity={selectedComplexity}
                onCategoryChange={setSelectedCategory}
                onComplexityChange={setSelectedComplexity}
                onReset={handleResetFilters}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 sm:p-12 text-center">
                  <Icon name="FolderOpenIcon" size={48} className="text-white/40 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">No Products Found</h3>
                  <p className="text-sm text-white/60 mb-4">
                    Try adjusting your filters or search query to find what you're looking for.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white rounded-xl hover:opacity-90 transition-all duration-300"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-white/60">
                      Showing {filteredProducts.length} of {mockProducts.length} products
                    </p>
                    {comparedProducts.length > 0 && (
                      <button
                        onClick={() => setComparedProducts([])}
                        className="text-sm text-[#0EA5E9] hover:text-[#0EA5E9]/80 font-medium transition-colors duration-300"
                      >
                        Clear Selection
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onCompare={handleCompareToggle}
                        isComparing={comparedProducts.includes(product.id)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-8 sm:mt-12 backdrop-blur-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 rounded-2xl p-5 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <Icon name="LightBulbIcon" size={24} className="text-[#0EA5E9] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  Need Help Choosing?
                </h3>
                <p className="text-sm text-white/70 mb-4">
                  Our technical team can help you select the right products for your infrastructure
                  needs. Schedule a consultation to discuss your requirements and get personalized
                  recommendations.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <a
                    href="/pricing-plans"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white rounded-xl hover:opacity-90 transition-all duration-300 text-sm font-medium text-center"
                  >
                    Schedule Demo
                  </a>
                  <a
                    href="/global-support"
                    className="px-6 py-2.5 bg-white/5 text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300 text-sm font-medium text-center"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showComparison && (
        <ComparisonMatrix
          products={mockProducts}
          selectedProducts={comparedProducts}
          onClose={() => setShowComparison(false)}
        />
      )}

      {showArchitecture && <ArchitectureDiagram onClose={() => setShowArchitecture(false)} />}
    </div>
  );
}
