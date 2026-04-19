import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = { title: '404 — Seite nicht gefunden' };

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="section container-narrow text-center">
        <p className="text-xs uppercase tracking-widest text-stone">404</p>
        <h1 className="mt-3 font-serif text-5xl text-forest-dark">
          Diese Seite ist nicht auf der Karte.
        </h1>
        <p className="mt-4 text-stone">
          Vielleicht hilft ein Schritt zurück zur Partner-Übersicht.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Zur Startseite
          </Link>
          <Link href="/partner" className="btn-ghost">
            Alle Partner
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
