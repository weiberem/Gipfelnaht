import { Resend } from 'resend';
import type { Inquiry } from '@/types';
import { atelier } from '@/content/atelier';
import { serviceLabels, productCategoryLabels } from './taxonomy';

const resendClient = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = process.env.EMAIL_FROM ?? `${atelier.name} <hallo@${new URL(atelier.siteUrl).hostname}>`;
const ATELIER_INBOX = process.env.EMAIL_PLATFORM ?? atelier.contact.email;

/**
 * Verschickt eine Anfrage:
 *   1. Mail an das Atelier-Postfach (Reply-To = Kunde)
 *   2. Bestätigung an Kunde
 *
 * Wenn RESEND_API_KEY fehlt, wird die Anfrage nur ins Server-Log geschrieben —
 * die UI zeigt dem Kunden trotzdem ein Erfolgs-Feedback. Auf diese Weise kann
 * die Site lokal ohne Mail-Setup getestet werden.
 */
export async function sendInquiry(inquiry: Inquiry): Promise<void> {
  const serviceLabel = serviceLabels[inquiry.preferredService];
  const productLabel = productCategoryLabels[inquiry.product];

  if (!resendClient) {
    console.warn('[inquiries] RESEND_API_KEY fehlt — Mailversand wird übersprungen.');
    console.log('[inquiries] Anfrage:', { ...inquiry, productLabel, serviceLabel });
    return;
  }

  const atelierBody = [
    `Neue Reparatur-Anfrage`,
    ``,
    `Kund:in: ${inquiry.customer.name}`,
    `E-Mail: ${inquiry.customer.email}`,
    `Telefon: ${inquiry.customer.phone}`,
    ``,
    `Produkt: ${productLabel}`,
    `Schaden: ${inquiry.description}`,
    ``,
    `Gewünschter Service: ${serviceLabel}`,
    inquiry.preferredDate ? `Wunsch-Termin: ${inquiry.preferredDate}` : '',
    ``,
    `Auf Antwort innerhalb 12 Stunden warten — Reply geht direkt an die Kund:in.`,
    ``,
    `— ${atelier.name}`,
  ]
    .filter(Boolean)
    .join('\n');

  const customerBody = [
    `Hoi ${inquiry.customer.name}`,
    ``,
    `Danke für deine Anfrage bei ${atelier.name}. Ich habe deine Nachricht erhalten und melde mich innerhalb von 12 Stunden mit einer Einschätzung und dem Preisrahmen.`,
    ``,
    `Deine Angaben:`,
    `– Produkt: ${productLabel}`,
    `– Schaden: ${inquiry.description}`,
    `– Service: ${serviceLabel}`,
    inquiry.preferredDate ? `– Wunsch-Termin: ${inquiry.preferredDate}` : '',
    ``,
    `Falls du Fotos hast, schick sie mir per WhatsApp (${atelier.contact.whatsapp}) oder direkt als Antwort auf diese Mail. Je mehr Details, desto präziser kann ich den Aufwand abschätzen.`,
    ``,
    `Wenn du nach 12 Stunden nichts gehört hast, ruf einfach durch: ${atelier.contact.phoneDisplay}.`,
    ``,
    `Liebe Grüsse`,
    `${atelier.owner}`,
    `${atelier.name} · ${atelier.location.town}`,
  ]
    .filter(Boolean)
    .join('\n');

  await Promise.all([
    resendClient.emails.send({
      from: FROM,
      to: ATELIER_INBOX,
      replyTo: inquiry.customer.email,
      subject: `Neue Anfrage: ${productLabel} — ${inquiry.customer.name}`,
      text: atelierBody,
    }),
    resendClient.emails.send({
      from: FROM,
      to: inquiry.customer.email,
      subject: `Deine Anfrage bei ${atelier.name}`,
      text: customerBody,
    }),
  ]);
}

export { resendClient };
