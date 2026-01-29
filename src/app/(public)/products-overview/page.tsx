import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ProductsInteractive from './components/ProductsInteractive';

export const metadata: Metadata = {
  title: 'Products Overview - USS',
  description:
    'Explore USS comprehensive suite of enterprise-grade products including Core Platform, Analytics Engine, Security Suite, API Gateway, Global CDN, and Managed Database. Built for global infrastructure with technical excellence and scalability.',
};

export default function ProductsOverviewPage() {
  return (
    <div className="min-h-screen">
      <ProductsInteractive />
    </div>
  );
}
