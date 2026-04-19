import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'terracotta' | 'ghost' | 'link';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
}

const variants: Record<Variant, string> = {
  primary: 'bg-forest text-cream hover:bg-forest-dark',
  terracotta: 'text-cream hover:brightness-95',
  ghost: 'bg-transparent text-forest border border-border hover:bg-cream-warm',
  link: 'bg-transparent text-lake underline-offset-4 hover:underline px-0 py-0',
};

const sizes = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', style, ...props }, ref) => {
    const terracotta = variant === 'terracotta' ? { backgroundColor: 'var(--color-terracotta)' } : {};
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lake',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variant !== 'link' && sizes[size],
          variants[variant],
          className
        )}
        style={{ ...terracotta, ...style }}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
