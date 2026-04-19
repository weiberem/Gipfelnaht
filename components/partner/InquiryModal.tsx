'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, Loader2 } from 'lucide-react';

import type { Partner, ServiceOption } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { NightrepairBadge } from '@/components/brand/NightrepairBadge';
import { specialtyLabels, serviceLabels } from '@/lib/taxonomy';

const schema = z.object({
  name: z.string().min(2, 'Bitte Name angeben'),
  email: z.string().email('Bitte gültige E-Mail'),
  phone: z.string().min(4, 'Bitte Telefonnummer angeben'),
  category: z.string().min(1, 'Bitte Produkt wählen'),
  description: z.string().min(10, 'Bitte etwas ausführlicher beschreiben'),
  preferredService: z.enum(['sammelbox', 'personal-dropoff', 'pickup', 'nightrepair']),
  preferredDate: z.string().optional(),
  hasPhotos: z.boolean(),
  acceptPrivacy: z.literal(true, {
    errorMap: () => ({ message: 'Bitte Datenschutz bestätigen' }),
  }),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  partner: Partner;
  trigger: React.ReactNode;
}

export function InquiryModal({ partner, trigger }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const availableServices: ServiceOption[] = [
    partner.services.sammelbox.available && 'sammelbox',
    partner.services.personalDropoff.available && 'personal-dropoff',
    partner.services.pickup.available && 'pickup',
    partner.services.nightrepair.available && 'nightrepair',
  ].filter((x): x is ServiceOption => Boolean(x));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      preferredService: availableServices[0] ?? 'sammelbox',
      hasPhotos: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, partnerSlug: partner.slug }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: 'Unbekannter Fehler' }));
        throw new Error(error || 'Anfrage konnte nicht gesendet werden');
      }
      setSubmitted(true);
      reset();
    } catch (e) {
      setServerError(e instanceof Error ? e.message : 'Unbekannter Fehler');
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setSubmitted(false);
          setServerError(null);
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream">
              <Check size={22} />
            </div>
            <h3 className="font-serif text-2xl text-forest-dark">Anfrage gesendet</h3>
            <p className="mt-2 text-sm text-stone">
              {partner.businessName} meldet sich bei dir innerhalb 12 Stunden — meist schneller.
              Du bekommst gleich noch eine Bestätigung per E-Mail.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Anfrage an {partner.businessName}</DialogTitle>
              <DialogDescription>
                Kurz beschreiben, was los ist — die/der Partner:in meldet sich mit Einschätzung und Preis.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" {...register('name')} />
                  {errors.name && <p className="mt-1 text-xs text-terracotta">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">E-Mail *</Label>
                  <Input id="email" type="email" {...register('email')} />
                  {errors.email && <p className="mt-1 text-xs text-terracotta">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Telefon / WhatsApp *</Label>
                <Input id="phone" type="tel" {...register('phone')} placeholder="+41 …" />
                {errors.phone && <p className="mt-1 text-xs text-terracotta">{errors.phone.message}</p>}
              </div>

              <div>
                <Label htmlFor="category">Produkt *</Label>
                <select
                  id="category"
                  {...register('category')}
                  className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm"
                >
                  <option value="">Bitte wählen</option>
                  {partner.specialties.map((s) => (
                    <option key={s} value={specialtyLabels[s]}>
                      {specialtyLabels[s]}
                    </option>
                  ))}
                  <option value="Anderes">Anderes</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-xs text-terracotta">{errors.category.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Schaden beschreiben *</Label>
                <Textarea
                  id="description"
                  rows={4}
                  {...register('description')}
                  placeholder="z.B. 8 cm Riss am rechten Ärmel, Aussenstoff durch — Innenfutter intakt."
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-terracotta">{errors.description.message}</p>
                )}
              </div>

              <div>
                <Label>Gewünschter Service *</Label>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  {availableServices.map((s) => (
                    <label
                      key={s}
                      className="flex cursor-pointer items-start gap-2 rounded-md border border-border bg-white px-3 py-2 hover:bg-cream-warm"
                    >
                      <input type="radio" value={s} {...register('preferredService')} className="mt-1" />
                      <span className="text-sm">
                        <span className="block font-medium text-forest">
                          {serviceLabels[s]}
                          {s === 'nightrepair' && (
                            <NightrepairBadge
                              surcharge={partner.services.nightrepair.surcharge}
                              className="ml-2"
                            />
                          )}
                        </span>
                        {s === 'pickup' && partner.services.pickup.minOrderValue && (
                          <span className="text-xs text-stone">
                            ab CHF {partner.services.pickup.minOrderValue} Auftragswert
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <Label htmlFor="preferredDate">Wunsch-Termin (optional)</Label>
                  <Input id="preferredDate" type="date" {...register('preferredDate')} />
                </div>
                <label className="mt-6 flex items-start gap-2 text-sm">
                  <input type="checkbox" {...register('hasPhotos')} className="mt-1 accent-forest" />
                  Ich schicke Fotos per WhatsApp / Mail nach.
                </label>
              </div>

              <label className="flex items-start gap-2 text-xs text-stone">
                <input type="checkbox" {...register('acceptPrivacy')} className="mt-0.5 accent-forest" />
                <span>
                  Ich stimme zu, dass Gipfelnaht meine Angaben an {partner.businessName} weiterleitet. Mehr dazu in der{' '}
                  <a href="/datenschutz" className="underline">Datenschutzerklärung</a>.
                </span>
              </label>
              {errors.acceptPrivacy && (
                <p className="text-xs text-terracotta">{errors.acceptPrivacy.message}</p>
              )}

              {serverError && (
                <p className="rounded-md bg-terracotta/10 px-3 py-2 text-sm text-terracotta">{serverError}</p>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button type="submit" variant="terracotta" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                  Anfrage senden
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
