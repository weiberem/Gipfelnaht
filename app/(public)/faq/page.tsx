import type { Metadata } from 'next';
import faqData from '@/content/pages/faq.json';

export const metadata: Metadata = {
  title: 'Häufige Fragen',
  description: 'Antworten zu Gipfelnaht, Reparatur-Ablauf, Nightrepair und zum Partner-Werden.',
};

export default function FaqPage() {
  return (
    <section className="section container-page">
      <h1 className="font-serif text-4xl md:text-5xl text-forest-dark">Häufige Fragen</h1>
      <p className="mt-3 text-stone">Falls deine Frage nicht dabei ist: schreib uns.</p>

      <div className="mt-10 grid gap-10 md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block">
          <nav aria-label="FAQ-Bereiche" className="sticky top-24 space-y-1 text-sm">
            {faqData.groups.map((g) => (
              <a
                key={g.title}
                href={`#${encodeURIComponent(g.title.toLowerCase())}`}
                className="block rounded px-3 py-2 text-forest hover:bg-cream-warm"
              >
                {g.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className="space-y-10">
          {faqData.groups.map((g) => (
            <section key={g.title} id={g.title.toLowerCase()}>
              <h2 className="font-serif text-2xl text-forest-dark">{g.title}</h2>
              <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-white">
                {g.items.map((item) => (
                  <details key={item.q} className="group p-5 open:bg-cream-warm/40">
                    <summary className="cursor-pointer list-none text-base font-medium text-forest-dark">
                      {item.q}
                    </summary>
                    <p className="mt-2 text-sm text-stone">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
