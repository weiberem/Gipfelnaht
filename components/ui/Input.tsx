import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-md border bg-white px-3 py-2.5 text-sm text-forest placeholder:text-stone/70',
          'border-border focus:border-lake focus:outline-none focus:ring-2 focus:ring-lake/20',
          'disabled:bg-cream-warm disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
