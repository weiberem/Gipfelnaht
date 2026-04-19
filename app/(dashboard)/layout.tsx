import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

/**
 * Geschützter Layout. In Phase 1 reicht das Layout hier alleine — die Kinder-Routen
 * sind Placeholder-Seiten. In Phase 2 wird hier Auth-Gating ergänzt (Middleware +
 * server-session) und die Seitenstruktur entsprechend aufgebaut.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-16rem)]">{children}</main>
      <Footer />
    </>
  );
}
