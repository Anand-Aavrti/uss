'use client';

import { useState } from 'react';
import StoryFilters from './StoryFilters';
import StoryCard from './StoryCard';
import MetricsDashboard from './MetricsDashboard';
import FeaturedTestimonial from './FeaturedTestimonial';
import Icon from '@/components/ui/AppIcon';

interface FilterState {
  industry: string;
  region: string;
  useCase: string;
}

interface Story {
  id: string;
  company: string;
  logo: string;
  logoAlt: string;
  industry: string;
  region: string;
  useCase: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  metrics: Array<{
    label: string;
    value: string;
    icon: string;
  }>;
  videoUrl?: string;
  pdfUrl?: string;
  featured: boolean;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  imageAlt: string;
  companyLogo: string;
  companyLogoAlt: string;
  rating: number;
}

const CustomerStoriesInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    industry: 'all',
    region: 'all',
    useCase: 'all',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useState(() => {
    setIsHydrated(true);
  });

  const featuredTestimonial: Testimonial = {
    quote:
      "USS transformed our global infrastructure deployment from months to weeks. Their platform's reliability and cultural awareness made expansion into new markets seamless.",
    author: 'Sarah Chen',
    role: 'Chief Technology Officer',
    company: 'GlobalTech Solutions',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_13dd7b4b8-1763293360912.png',
    imageAlt: 'Professional Asian woman with long dark hair in navy blazer smiling confidently',
    companyLogo:
      'https://img.rocket.new/generatedImages/rocket_gen_img_1304fcaee-1767513417779.png',
    companyLogoAlt: 'GlobalTech Solutions company logo with blue and white design',
    rating: 5,
  };

  const allStories: Story[] = [
    {
      id: 'globaltech-infrastructure',
      company: 'GlobalTech Solutions',
      logo: 'https://img.rocket.new/generatedImages/rocket_gen_img_186ea0748-1767721692308.png',
      logoAlt: 'GlobalTech Solutions logo with modern blue design',
      industry: 'Technology',
      region: 'Asia Pacific',
      useCase: 'Infrastructure Modernization',
      title: 'Scaling Infrastructure Across 15 Countries in 6 Months',
      excerpt:
        'GlobalTech Solutions leveraged USS to modernize their infrastructure across Asia Pacific, reducing deployment time by 75% while maintaining 99.99% uptime across all regions.',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d5a0d0f2-1767493194010.png',
      imageAlt: 'Modern data center with rows of blue-lit server racks and network cables',
      metrics: [
        { label: 'Deployment Time', value: '-75%', icon: 'ClockIcon' },
        { label: 'Uptime', value: '99.99%', icon: 'CheckCircleIcon' },
        { label: 'Cost Savings', value: '$2.4M', icon: 'CurrencyDollarIcon' },
      ],

      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      pdfUrl: '/case-studies/globaltech-infrastructure.pdf',
      featured: true,
    },
    {
      id: 'financebank-security',
      company: 'SecureBank International',
      logo: 'https://img.rocket.new/generatedImages/rocket_gen_img_16e2a72e7-1768804000301.png',
      logoAlt: 'SecureBank International logo with gold and navy design',
      industry: 'Financial Services',
      region: 'Europe',
      useCase: 'Security & Compliance',
      title: 'Achieving Multi-Region Compliance with Zero Security Incidents',
      excerpt:
        'SecureBank International implemented USS to meet stringent European banking regulations across 12 countries, achieving full compliance while reducing security audit time by 60%.',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_10819918a-1767802853673.png',
      imageAlt: 'Modern banking office interior with glass walls and security monitors',
      metrics: [
        { label: 'Compliance', value: '100%', icon: 'ShieldCheckIcon' },
        { label: 'Audit Time', value: '-60%', icon: 'ClockIcon' },
        { label: 'Incidents', value: '0', icon: 'LockClosedIcon' },
      ],

      pdfUrl: '/case-studies/securebank-security.pdf',
      featured: false,
    },
    {
      id: 'healthplus-scalability',
      company: 'HealthPlus Network',
      logo: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e315275d-1767688550354.png',
      logoAlt: 'HealthPlus Network logo with medical cross and green design',
      industry: 'Healthcare',
      region: 'North America',
      useCase: 'Scalability & Performance',
      title: 'Supporting 10x Patient Load Growth During Pandemic',
      excerpt:
        'HealthPlus Network scaled their telemedicine platform to handle 10x patient load increase during COVID-19, maintaining sub-second response times across all services.',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_12c789640-1764659114724.png',
      imageAlt:
        'Healthcare professional using tablet in modern medical facility with blue lighting',
      metrics: [
        { label: 'Load Capacity', value: '10x', icon: 'ArrowTrendingUpIcon' },
        { label: 'Response Time', value: '<1s', icon: 'BoltIcon' },
        { label: 'Availability', value: '99.98%', icon: 'CheckCircleIcon' },
      ],

      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      pdfUrl: '/case-studies/healthplus-scalability.pdf',
      featured: true,
    },
    {
      id: 'retailmax-integration',
      company: 'RetailMax Global',
      logo: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ab970bcb-1764663148981.png',
      logoAlt: 'RetailMax Global logo with shopping cart and orange design',
      industry: 'Retail & E-commerce',
      region: 'North America',
      useCase: 'System Integration',
      title: 'Unifying 50+ Legacy Systems into Single Platform',
      excerpt:
        'RetailMax Global consolidated 50+ legacy systems across their retail operations using USS, reducing operational complexity and improving data accuracy by 95%.',
      image: 'https://images.unsplash.com/photo-1650826125683-f4e9c4e62f16',
      imageAlt: 'Modern retail store interior with clothing displays and digital screens',
      metrics: [
        { label: 'Systems Unified', value: '50+', icon: 'ServerStackIcon' },
        { label: 'Data Accuracy', value: '+95%', icon: 'ChartBarIcon' },
        { label: 'Integration Time', value: '-70%', icon: 'ClockIcon' },
      ],

      pdfUrl: '/case-studies/retailmax-integration.pdf',
      featured: false,
    },
    {
      id: 'edulearn-migration',
      company: 'EduLearn Platform',
      logo: 'https://img.rocket.new/generatedImages/rocket_gen_img_12006a921-1764655048310.png',
      logoAlt: 'EduLearn Platform logo with graduation cap and blue design',
      industry: 'Education',
      region: 'Europe',
      useCase: 'Cloud Migration',
      title: 'Migrating 5 Million Student Records with Zero Downtime',
      excerpt:
        'EduLearn Platform migrated their entire infrastructure to USS cloud services, moving 5 million student records across 20 countries with zero downtime during peak exam season.',
      image: 'https://images.unsplash.com/photo-1719447001949-a1116c90c5fd',
      imageAlt: 'University students using laptops in modern library with natural lighting',
      metrics: [
        { label: 'Records Migrated', value: '5M', icon: 'DocumentTextIcon' },
        { label: 'Downtime', value: '0 hrs', icon: 'ClockIcon' },
        { label: 'Performance', value: '+40%', icon: 'RocketLaunchIcon' },
      ],

      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      pdfUrl: '/case-studies/edulearn-migration.pdf',
      featured: false,
    },
    {
      id: 'manufacturing-iot',
      company: 'SmartFactory Industries',
      logo: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d0f6181d-1765035422251.png',
      logoAlt: 'SmartFactory Industries logo with gear and circuit design',
      industry: 'Manufacturing',
      region: 'Asia Pacific',
      useCase: 'Infrastructure Modernization',
      title: 'Connecting 200+ Factories with Real-Time IoT Monitoring',
      excerpt:
        'SmartFactory Industries deployed USS IoT infrastructure across 200+ manufacturing facilities, enabling real-time monitoring and predictive maintenance that reduced downtime by 85%.',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_137603532-1767822152591.png',
      imageAlt: 'Modern automated factory floor with robotic arms and blue lighting',
      metrics: [
        {
          label: 'Factories Connected',
          value: '200+',
          icon: 'BuildingOfficeIcon',
        },
        {
          label: 'Downtime Reduced',
          value: '-85%',
          icon: 'ArrowTrendingDownIcon',
        },
        { label: 'Efficiency Gain', value: '+32%', icon: 'ChartBarIcon' },
      ],

      pdfUrl: '/case-studies/smartfactory-iot.pdf',
      featured: false,
    },
    {
      id: 'finance-middle-east',
      company: 'Al-Ameen Financial Group',
      logo: 'https://img.rocket.new/generatedImages/rocket_gen_img_136106b20-1768804000060.png',
      logoAlt: 'Al-Ameen Financial Group logo with Arabic calligraphy and gold design',
      industry: 'Financial Services',
      region: 'Middle East',
      useCase: 'Security & Compliance',
      title: 'Implementing Sharia-Compliant Infrastructure Across Gulf Region',
      excerpt:
        'Al-Ameen Financial Group deployed USS infrastructure meeting both international banking standards and Sharia compliance requirements across 6 Gulf countries.',
      image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1cbc88610-1767358601181.png',
      imageAlt: 'Modern Islamic banking office with traditional Arabic architectural elements',
      metrics: [
        { label: 'Countries', value: '6', icon: 'GlobeAltIcon' },
        { label: 'Compliance', value: '100%', icon: 'ShieldCheckIcon' },
        { label: 'Transaction Speed', value: '+45%', icon: 'BoltIcon' },
      ],

      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      pdfUrl: '/case-studies/alameen-compliance.pdf',
      featured: true,
    },
    {
      id: 'retail-latin-america',
      company: 'MercadoVivo',
      logo: 'https://img.rocket.new/generatedImages/rocket_gen_img_179c71df8-1768804000314.png',
      logoAlt: 'MercadoVivo logo with colorful marketplace design',
      industry: 'Retail & E-commerce',
      region: 'Latin America',
      useCase: 'Scalability & Performance',
      title: 'Handling Black Friday Traffic Surge Across South America',
      excerpt:
        'MercadoVivo scaled their e-commerce platform using USS to handle 50x normal traffic during Black Friday sales across 8 South American countries without performance degradation.',
      image: 'https://images.unsplash.com/photo-1496035961277-11cd005205fd',
      imageAlt: 'Busy Latin American marketplace with colorful stalls and shoppers',
      metrics: [
        { label: 'Traffic Handled', value: '50x', icon: 'ArrowTrendingUpIcon' },
        { label: 'Response Time', value: '<2s', icon: 'BoltIcon' },
        { label: 'Conversion Rate', value: '+28%', icon: 'ChartBarIcon' },
      ],

      pdfUrl: '/case-studies/mercadovivo-scalability.pdf',
      featured: false,
    },
  ];

  const filterStories = (stories: Story[], filters: FilterState): Story[] => {
    return stories.filter((story) => {
      const industryMatch =
        filters.industry === 'all' || story.industry.toLowerCase().includes(filters.industry);
      const regionMatch =
        filters.region === 'all' || story.region.toLowerCase().replace(' ', '-') === filters.region;
      const useCaseMatch =
        filters.useCase === 'all' ||
        story.useCase.toLowerCase().replace(' ', '-').includes(filters.useCase);

      return industryMatch && regionMatch && useCaseMatch;
    });
  };

  const filteredStories = filterStories(allStories, activeFilters);

  const handleFilterChange = (filters: FilterState) => {
    if (!isHydrated) return;
    setActiveFilters(filters);
  };

  const toggleViewMode = () => {
    if (!isHydrated) return;
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="h-64 bg-muted rounded-lg animate-pulse mb-12"></div>
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="h-96 bg-muted rounded-lg animate-pulse"></div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-96 bg-muted rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Featured Testimonial */}
      <section className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FeaturedTestimonial testimonial={featuredTestimonial} />
        </div>
      </section>

      {/* Metrics Dashboard */}
      <section className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <MetricsDashboard />
        </div>
      </section>

      {/* Stories Section */}
      <section className="bg-background py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <StoryFilters onFilterChange={handleFilterChange} />
              </div>
            </div>

            {/* Stories Grid */}
            <div className="lg:col-span-3">
              {/* View Controls */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Customer Success Stories</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Showing {filteredStories.length} of {allStories.length} stories
                  </p>
                </div>
                <button
                  onClick={toggleViewMode}
                  className="p-2 rounded-md border border-border hover:bg-muted transition-colors duration-300"
                  aria-label={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
                >
                  <Icon
                    name={viewMode === 'grid' ? 'ListBulletIcon' : 'Squares2X2Icon'}
                    size={20}
                    className="text-foreground"
                  />
                </button>
              </div>

              {/* Stories Display */}
              {filteredStories.length > 0 ? (
                <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-6'}>
                  {filteredStories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon
                    name="FolderOpenIcon"
                    size={48}
                    className="text-muted-foreground mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Stories Found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters to see more results
                  </p>
                  <button
                    onClick={() =>
                      handleFilterChange({
                        industry: 'all',
                        region: 'all',
                        useCase: 'all',
                      })
                    }
                    className="px-6 py-3 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors duration-300"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary to-secondary py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-lg text-primary-foreground/10 mb-8">
            Join thousands of companies worldwide who trust USS for their global infrastructure
            needs
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/pricing-plans"
              className="w-full sm:w-auto px-8 py-4 bg-white text-primary rounded-md font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Free Trial
            </a>
            <a
              href="/global-support"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-primary-foreground border-2 border-primary-foreground rounded-md font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerStoriesInteractive;
