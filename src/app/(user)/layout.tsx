import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Header /> */}
      <main>{children}</main>
      {/* <Footer currentLanguage="en" /> */}
    </>
  );
}
