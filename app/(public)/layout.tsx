import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="min-h-[calc(100vh-16rem)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
