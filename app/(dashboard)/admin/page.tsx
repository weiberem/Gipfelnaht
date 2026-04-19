import { Phase2Placeholder } from '@/components/common/Phase2Placeholder';

export const metadata = { title: 'Admin', robots: { index: false } };

export default function AdminPage() {
  return (
    <Phase2Placeholder
      title="Admin-Bereich — Phase 2"
      description="Partner-Verwaltung, Auftragsmonitoring, Reporting. Startet mit Supabase + Role-based Access."
    />
  );
}
