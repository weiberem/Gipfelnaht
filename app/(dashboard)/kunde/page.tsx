import { Phase2Placeholder } from '@/components/common/Phase2Placeholder';

export const metadata = { title: 'Mein Bereich', robots: { index: false } };

export default function CustomerDashboardPage() {
  return (
    <Phase2Placeholder
      title="Kunden-Bereich — Phase 2"
      description="Auftragshistorie, Rechnungen, gespeicherte Lieblings-Werkstätten."
    />
  );
}
