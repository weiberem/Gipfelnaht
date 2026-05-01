import Link from 'next/link';

export const metadata = { title: '404 — Seite nicht gefunden' };

export default function NotFound() {
  return (
    <div className="section container-narrow text-center">
      <p className="text-xs uppercase tracking-widest text-stone">404</p>
      <h1 className="mt-3 font-serif text-5xl text-forest-dark">
        Diese Seite ist nicht auf der Karte.
      </h1>
      <p className="mt-4 text-stone">
        Vielleicht hilft ein Schritt zurück zur Startseite oder direkt eine Anfrage.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Zur Startseite
        </Link>
        <Link href="/kontakt" className="btn-ghost">
          Anfrage stellen
        </Link>
      </div>
    </div>
  );
}
