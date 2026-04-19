import Link from 'next/link';
import { Lock, Sparkles } from 'lucide-react';

interface Props {
  title: string;
  description?: string;
}

export function Phase2Placeholder({ title, description }: Props) {
  return (
    <section className="section container-narrow">
      <div className="rounded-xl border border-border bg-cream-warm p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream">
          <Lock size={20} />
        </div>
        <h1 className="mt-6 font-serif text-3xl text-forest-dark">{title}</h1>
        <p className="mt-3 text-stone">
          {description ?? 'Dieser Bereich kommt in Phase 2 — mit Login, Auftragshistorie und Zahlungen über Stripe (inkl. Twint).'}
        </p>
        <p className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-terracotta">
          <Sparkles size={12} /> Phase 2
        </p>
        <Link href="/" className="mt-8 inline-flex btn-primary">
          Zurück zur Startseite
        </Link>
      </div>
    </section>
  );
}
