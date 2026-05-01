'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { atelier, availableServices } from '@/content/atelier';
import { productCategoryLabels, serviceLabels } from '@/lib/taxonomy';
import type { ProductCategory, ServiceOption } from '@/types';

const productKeys = Object.keys(productCategoryLabels) as ProductCategory[];

const schema = z.object({
  name: z.string().min(2, 'Bitte Namen angeben'),
  email: z.string().email('Bitte eine gültige E-Mail angeben'),
  phone: z.string().min(4, 'Bitte Telefonnummer angeben'),
  product: z.enum(productKeys as [ProductCategory, ...ProductCategory[]]),
  description: z.string().min(10, 'Mindestens 10 Zeichen — was ist kaputt?'),
  preferredService: z.enum(['sammelbox', 'personal-dropoff', 'pickup', 'nightrepair']),
  preferredDate: z.string().optional(),
  acceptPrivacy: z.literal(true, {
    errorMap: () => ({ message: 'Datenschutz muss bestätigt werden' }),
  }),
});

type FormValues = z.infer<typeof schema>;

export function InquiryForm() {
  const services = availableServices();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      preferredService: services[0] ?? 'sammelbox',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus('submitting');
    setErrorMsg(null);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Versand fehlgeschlagen');
      }
      setStatus('success');
      reset();
    } catch (e) {
      setStatus('error');
      setErrorMsg(e instanceof Error ? e.message : 'Etwas ist schiefgelaufen.');
    }
  };

  if (status === 'success') {
    return (
      <div className="card p-8 text-center">
        <CheckCircle2 className="mx-auto text-terracotta" size={36} />
        <h3 className="mt-4 font-serif text-2xl text-forest-dark">Danke!</h3>
        <p className="mt-3 text-stone">
          Deine Anfrage ist bei mir angekommen. Ich melde mich innerhalb 12 Stunden mit einer
          Einschätzung und dem nächsten Schritt zurück.
        </p>
        <p className="mt-2 text-sm text-stone">
          Du hast eine Bestätigungsmail an deine E-Mail-Adresse bekommen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name?.message}>
          <Input id="name" autoComplete="name" {...register('name')} />
        </Field>
        <Field label="Telefon / WhatsApp" htmlFor="phone" error={errors.phone?.message}>
          <Input id="phone" type="tel" autoComplete="tel" {...register('phone')} />
        </Field>
      </div>

      <Field label="E-Mail" htmlFor="email" error={errors.email?.message}>
        <Input id="email" type="email" autoComplete="email" {...register('email')} />
      </Field>

      <Field label="Was ist kaputt?" htmlFor="product" error={errors.product?.message}>
        <select
          id="product"
          {...register('product')}
          className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-forest focus:border-lake focus:outline-none focus:ring-2 focus:ring-lake/20"
          defaultValue=""
        >
          <option value="" disabled>
            Bitte wählen …
          </option>
          {productKeys.map((p) => (
            <option key={p} value={p}>
              {productCategoryLabels[p]}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Schadenbeschreibung"
        htmlFor="description"
        error={errors.description?.message}
        hint="Wo am Stück ist der Schaden? Wie gross? Material? Je mehr Details, desto präziser der Preis."
      >
        <Textarea id="description" rows={5} {...register('description')} />
      </Field>

      <fieldset>
        <legend className="block text-sm font-medium text-forest-dark">
          Gewünschter Service
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {services.map((s) => (
            <label
              key={s}
              className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-white p-3 text-sm hover:bg-cream-warm has-[input:checked]:border-forest has-[input:checked]:bg-cream-warm"
            >
              <input
                type="radio"
                value={s}
                {...register('preferredService')}
                className="mt-1 accent-forest"
              />
              <span>
                <span className="block font-medium text-forest-dark">
                  {serviceLabels[s]}
                </span>
                <span className="text-xs text-stone">{serviceHelper(s)}</span>
              </span>
            </label>
          ))}
        </div>
        {errors.preferredService?.message && (
          <p className="mt-2 text-xs text-terracotta">{errors.preferredService.message}</p>
        )}
      </fieldset>

      <Field
        label="Wunsch-Termin (optional)"
        htmlFor="preferredDate"
        error={errors.preferredDate?.message}
      >
        <Input id="preferredDate" type="date" {...register('preferredDate')} />
      </Field>

      <p className="rounded-md bg-cream-warm p-3 text-xs text-stone">
        Fotos sind hilfreich. Schick sie mir gern per WhatsApp ({atelier.contact.whatsapp})
        oder als Antwort auf die Bestätigungsmail.
      </p>

      <div>
        <label className="flex items-start gap-2 text-sm text-forest">
          <input
            type="checkbox"
            {...register('acceptPrivacy')}
            className="mt-1 accent-forest"
          />
          <span>
            Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung der Anfrage
            verwendet werden. Details unter{' '}
            <a href="/datenschutz" className="text-lake hover:underline">
              Datenschutz
            </a>
            .
          </span>
        </label>
        {errors.acceptPrivacy?.message && (
          <p className="mt-2 text-xs text-terracotta">{errors.acceptPrivacy.message}</p>
        )}
      </div>

      {status === 'error' && errorMsg && (
        <div className="flex items-start gap-2 rounded-md border border-terracotta/40 bg-terracotta/10 p-3 text-sm text-forest">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-terracotta" />
          <span>{errorMsg}. Versuch's nochmal — oder ruf direkt an: {atelier.contact.phoneDisplay}.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-terracotta w-full"
      >
        {status === 'submitting' ? 'Schicke ab …' : 'Anfrage senden'}
        <Send size={16} />
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <p className="mt-1 text-xs text-stone">{hint}</p>}
      {error && <p className="mt-1 text-xs text-terracotta">{error}</p>}
    </div>
  );
}

function serviceHelper(s: ServiceOption): string {
  switch (s) {
    case 'sammelbox':
      return atelier.services.sammelbox.accessHours
        ? `Sammelbox ${atelier.services.sammelbox.accessHours}`
        : 'Einwurf jederzeit';
    case 'personal-dropoff':
      return atelier.services.personalDropoff.hours ?? 'Persönliche Abgabe';
    case 'pickup':
      return 'Abholung in der Region';
    case 'nightrepair':
      return atelier.services.nightrepair.available
        ? `Bis ${atelier.services.nightrepair.acceptanceDeadline}, ab ${atelier.services.nightrepair.pickupFrom} (+CHF ${atelier.services.nightrepair.surcharge})`
        : '';
  }
}
