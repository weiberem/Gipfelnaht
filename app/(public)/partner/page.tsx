import type { Metadata } from 'next';
import { getAllPartners } from '@/lib/partners';
import { PartnerExplorer } from '@/components/partner/PartnerExplorer';

export const metadata: Metadata = {
  title: 'Alle Partner',
  description:
    'Finde Näh-Spezialist:innen für Bergsport-Ausrüstung in den Schweizer Alpen. Filterbar nach Spezialisierung, Ort und Service.',
};

interface Props {
  searchParams: { town?: string; specialty?: string; nightrepair?: string };
}

export default async function PartnersPage({ searchParams }: Props) {
  const partners = await getAllPartners();
  const night = searchParams.nightrepair === '1';

  return <PartnerExplorer partners={partners} initialNightrepairOnly={night} />;
}
