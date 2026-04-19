import type { Metadata } from 'next';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { platform } from '@/config/platform';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktdaten zu Gipfelnaht.',
};

export default function KontaktPage() {
  return (
    <section className="section container-page">
      <h1 className="font-serif text-4xl md:text-5xl text-forest-dark">Kontakt</h1>
      <p className="mt-3 max-w-xl text-stone">
        Für Anfragen zu einzelnen Reparaturen wende dich direkt an den Partner.
        Allgemeine Fragen, Kritik, Kooperationen: wir lesen mit.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <a
          href={`mailto:${platform.contact.email}`}
          className="card flex items-center gap-4 p-6 transition-shadow hover:shadow-hover"
        >
          <Mail size={22} className="text-terracotta" />
          <div>
            <p className="font-serif text-lg text-forest-dark">E-Mail</p>
            <p className="text-sm text-stone">{platform.contact.email}</p>
          </div>
        </a>
        <a
          href={`tel:${platform.contact.phone}`}
          className="card flex items-center gap-4 p-6 transition-shadow hover:shadow-hover"
        >
          <Phone size={22} className="text-terracotta" />
          <div>
            <p className="font-serif text-lg text-forest-dark">Telefon</p>
            <p className="text-sm text-stone">{platform.contact.phone}</p>
          </div>
        </a>
        {platform.contact.whatsapp && (
          <a
            href={`https://wa.me/${platform.contact.whatsapp.replace(/[^\d]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-4 p-6 transition-shadow hover:shadow-hover"
          >
            <MessageCircle size={22} className="text-terracotta" />
            <div>
              <p className="font-serif text-lg text-forest-dark">WhatsApp</p>
              <p className="text-sm text-stone">{platform.contact.whatsapp}</p>
            </div>
          </a>
        )}
        <div className="card flex items-center gap-4 p-6">
          <MapPin size={22} className="text-terracotta" />
          <div>
            <p className="font-serif text-lg text-forest-dark">Büroadresse</p>
            <p className="text-sm text-stone">
              {platform.owner.address}, {platform.owner.postalCode} {platform.owner.town}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
