import { Resend } from 'resend';
import type { Inquiry, PartnerApplication } from '@/types';
import type { Partner } from '@/types';
import { platform } from '@/config/platform';
import { serviceLabels } from './taxonomy';

const resendClient = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = process.env.EMAIL_FROM ?? 'Gipfelnaht <hallo@gipfelnaht.ch>';
const PLATFORM_CC = process.env.EMAIL_PLATFORM ?? 'hallo@gipfelnaht.ch';

/**
 * Phase 1: verschickt E-Mails via Resend.
 * Phase 2: legt zusätzlich einen Supabase-Record an und verschickt weiter.
 */
export async function sendInquiry(inquiry: Inquiry, partner: Partner): Promise<void> {
  if (!resendClient) {
    console.warn('[inquiries] RESEND_API_KEY fehlt — Mail-Versand wird geloggt statt gesendet.');
    console.log('[inquiries] Inquiry:', inquiry);
    return;
  }

  const customerSubject = `Neue Anfrage: ${inquiry.item.category} — ${inquiry.customer.name}`;
  const serviceLabel = serviceLabels[inquiry.preferredService];

  const partnerBody = [
    `Neue Reparatur-Anfrage über Gipfelnaht`,
    ``,
    `Kund:in: ${inquiry.customer.name}`,
    `E-Mail: ${inquiry.customer.email}`,
    `Telefon: ${inquiry.customer.phone}`,
    ``,
    `Produkt: ${inquiry.item.category}`,
    `Schaden: ${inquiry.item.description}`,
    ``,
    `Gewünschter Service: ${serviceLabel}`,
    inquiry.preferredDate ? `Wunsch-Termin: ${inquiry.preferredDate}` : '',
    inquiry.hasPhotos ? `Fotos folgen per WhatsApp / Mail.` : '',
    ``,
    `Bitte melde dich direkt bei der Kundin / dem Kunden — innerhalb 12 Stunden.`,
    ``,
    `— Gipfelnaht`,
  ]
    .filter(Boolean)
    .join('\n');

  const customerBody = [
    `Hoi ${inquiry.customer.name}`,
    ``,
    `Danke für deine Anfrage bei ${partner.businessName} (${partner.location.town}).`,
    ``,
    `Wir haben deine Nachricht weitergeleitet. Der Partner meldet sich bei dir innerhalb 12 Stunden mit einer Einschätzung und dem weiteren Vorgehen.`,
    ``,
    `Deine Angaben:`,
    `– Produkt: ${inquiry.item.category}`,
    `– Service: ${serviceLabel}`,
    inquiry.preferredDate ? `– Wunsch-Termin: ${inquiry.preferredDate}` : '',
    ``,
    `Falls du nach 12 Stunden nichts gehört hast, schreib uns: ${PLATFORM_CC}`,
    ``,
    `Liebe Grüsse`,
    `Das Gipfelnaht-Team`,
  ]
    .filter(Boolean)
    .join('\n');

  await Promise.all([
    resendClient.emails.send({
      from: FROM,
      to: partner.contact.email,
      cc: PLATFORM_CC,
      replyTo: inquiry.customer.email,
      subject: customerSubject,
      text: partnerBody,
    }),
    resendClient.emails.send({
      from: FROM,
      to: inquiry.customer.email,
      subject: `Deine Anfrage bei ${partner.businessName}`,
      text: customerBody,
    }),
  ]);
}

export async function sendPartnerApplication(app: PartnerApplication): Promise<void> {
  if (!resendClient) {
    console.warn('[inquiries] RESEND_API_KEY fehlt — Mail-Versand wird geloggt statt gesendet.');
    console.log('[inquiries] Application:', app);
    return;
  }

  const body = [
    `Neue Partner-Bewerbung`,
    ``,
    `Name: ${app.name}`,
    `E-Mail: ${app.email}`,
    app.phone ? `Telefon: ${app.phone}` : '',
    `Ort: ${app.location}`,
    ``,
    `Vorerfahrung:`,
    app.experience,
    ``,
    `Motivation:`,
    app.motivation,
    ``,
    app.portfolioUrl ? `Portfolio: ${app.portfolioUrl}` : '',
    ``,
    `— Gipfelnaht`,
  ]
    .filter(Boolean)
    .join('\n');

  await resendClient.emails.send({
    from: FROM,
    to: platform.contact.email,
    replyTo: app.email,
    subject: `Partner-Bewerbung: ${app.name} (${app.location})`,
    text: body,
  });
}

export { resendClient };
