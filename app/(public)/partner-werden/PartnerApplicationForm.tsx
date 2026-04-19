'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().min(2),
  experience: z.string().min(20, 'Bitte etwas ausführlicher'),
  motivation: z.string().min(20, 'Bitte etwas ausführlicher'),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  acceptPrivacy: z.literal(true, {
    errorMap: () => ({ message: 'Bitte Datenschutz bestätigen' }),
  }),
});

type FormValues = z.infer<typeof schema>;

export function PartnerApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch('/api/partner-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Senden fehlgeschlagen');
      setSubmitted(true);
      reset();
    } catch (e) {
      setServerError(e instanceof Error ? e.message : 'Unbekannter Fehler');
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg bg-forest/5 p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream">
          <Check size={20} />
        </div>
        <h3 className="font-serif text-2xl text-forest-dark">Danke für deine Bewerbung!</h3>
        <p className="mt-2 text-sm text-stone">Wir melden uns innerhalb von 3 Tagen bei dir.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <Label htmlFor="pa-name">Name *</Label>
          <Input id="pa-name" {...register('name')} />
          {errors.name && <p className="mt-1 text-xs text-terracotta">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="pa-email">E-Mail *</Label>
          <Input id="pa-email" type="email" {...register('email')} />
          {errors.email && <p className="mt-1 text-xs text-terracotta">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="pa-phone">Telefon</Label>
          <Input id="pa-phone" type="tel" {...register('phone')} />
        </div>
        <div>
          <Label htmlFor="pa-loc">Ort *</Label>
          <Input id="pa-loc" {...register('location')} placeholder="z.B. Brienz, BE" />
          {errors.location && <p className="mt-1 text-xs text-terracotta">{errors.location.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="pa-exp">Nähvorerfahrung *</Label>
        <Textarea
          id="pa-exp"
          rows={4}
          {...register('experience')}
          placeholder="Wie lange, welche Materialien, welche Art Aufträge — was du gut kannst, und was nicht."
        />
        {errors.experience && (
          <p className="mt-1 text-xs text-terracotta">{errors.experience.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="pa-mot">Warum Gipfelnaht? *</Label>
        <Textarea
          id="pa-mot"
          rows={4}
          {...register('motivation')}
          placeholder="Was reizt dich an dem Projekt, was bringst du mit, was möchtest du nicht?"
        />
        {errors.motivation && (
          <p className="mt-1 text-xs text-terracotta">{errors.motivation.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="pa-port">Link zu Arbeiten (optional)</Label>
        <Input
          id="pa-port"
          type="url"
          {...register('portfolioUrl')}
          placeholder="Instagram, Website, Google Drive …"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-stone">
        <input type="checkbox" {...register('acceptPrivacy')} className="mt-0.5 accent-forest" />
        <span>
          Ich stimme zu, dass Gipfelnaht meine Angaben zum Zweck der Partner-Prüfung speichert. Mehr in der{' '}
          <a href="/datenschutz" className="underline">
            Datenschutzerklärung
          </a>
          .
        </span>
      </label>
      {errors.acceptPrivacy && (
        <p className="text-xs text-terracotta">{errors.acceptPrivacy.message}</p>
      )}

      {serverError && (
        <p className="rounded-md bg-terracotta/10 px-3 py-2 text-sm text-terracotta">{serverError}</p>
      )}

      <div className="flex justify-end">
        <Button type="submit" variant="terracotta" disabled={isSubmitting}>
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          Bewerbung absenden
        </Button>
      </div>
    </form>
  );
}
