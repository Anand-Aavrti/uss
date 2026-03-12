import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import CustomerStoriesInteractive from './components/CustomerStoriesInteractive';

export const metadata: Metadata = {
  title: 'Customer Stories - USS',
  description:
    'Discover how global companies across industries achieve success with USS infrastructure. Read case studies, testimonials, and measurable outcomes from customers worldwide.',
};

export default function CustomerStoriesPage() {
  return (
    <main className="bg-[#0B1220]">
      <CustomerStoriesInteractive />
    </main>
  );
}
