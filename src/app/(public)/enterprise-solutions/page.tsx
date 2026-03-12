import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import EnterpriseSolutionsInteractive from './components/EnterpriseSolutionsInteractive';

export const metadata: Metadata = {
  title: 'Enterprise Solutions - USS',
  description:
    'Enterprise-grade infrastructure with security, compliance, and global scale. Trusted by organizations worldwide for mission-critical deployments with 99.99% uptime SLA.',
};

export default function EnterpriseSolutionsPage() {
  return (
    <main className="min-h-screen bg-[#0B1220]">
      <EnterpriseSolutionsInteractive />
    </main>
  );
}
