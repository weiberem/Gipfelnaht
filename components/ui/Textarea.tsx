import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full rounded-md border bg-white px-3 py-2.5 text-sm text-forest placeholder:text-stone/70',
        'border-border focus:border-lake focus:outline-none focus:ring-2 focus:ring-lake/20',
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';
