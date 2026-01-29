import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HomepageInteractive from './components/HomepageInteractive';

export const metadata: Metadata = {
  title: 'USS - Global Infrastructure You Can Trust',
  description:
    'USS provides enterprise-grade global infrastructure for teams worldwide. Deploy with confidence across 85+ countries with 99.99% uptime, multi-region deployment, and comprehensive security compliance.',
};

export default function Homepage() {
  return (
    <main className="min-h-screen">
      <HomepageInteractive />
    </main>
  );
}
