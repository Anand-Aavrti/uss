import type { Metadata } from 'next';
import GlobalSupportInteractive from './components/GlobalSupportInteractive';

export const metadata: Metadata = {
  title: 'Global Support - USS',
  description:
    'Access 24/7 multilingual support, comprehensive documentation, and an active community of experts across all time zones. Get help with USS platform through live chat, support tickets, knowledge base, and community forums.',
};

export default function GlobalSupportPage() {
  return (
    <div className="pt-[72px]">
      <GlobalSupportInteractive />;
    </div>
  );
}
