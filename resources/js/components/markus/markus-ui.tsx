import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ComponentProps } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

/* ---------------- Card ---------------- */

export const MarkusCard = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'rounded-xl border border-[#1F1F23] bg-[#111114] text-[#E0E0E1]',
            className,
        )}
        {...props}
    />
));
MarkusCard.displayName = 'MarkusCard';

export function MarkusCardHeader({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('flex flex-col space-y-1.5 p-6', className)}
            {...props}
        />
    );
}

export function MarkusCardTitle({
    className,
    ...props
}: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn(
                'leading-none font-semibold tracking-tight text-[#E0E0E1]',
                className,
            )}
            {...props}
        />
    );
}

export function MarkusCardDescription({
    className,
    ...props
}: HTMLAttributes<HTMLParagraphElement>) {
    return <p className={cn('text-xs text-[#6B6B76]', className)} {...props} />;
}

export function MarkusCardContent({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('p-6 pt-0', className)} {...props} />;
}

export function MarkusCardFooter({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('flex items-center p-6 pt-0', className)}
            {...props}
        />
    );
}

/* ---------------- Button ---------------- */

type MarkusButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive';
    size?: 'default' | 'sm' | 'lg' | 'icon';
};

const variantClasses: Record<
    NonNullable<MarkusButtonProps['variant']>,
    string
> = {
    default: 'bg-[#D4AF37] text-black hover:bg-[#A67C00]',
    outline:
        'bg-[#1F1F23] text-[#E0E0E1] border border-white/5 hover:bg-[#2A2A30]',
    secondary:
        'bg-[#1C1C21] text-[#E0E0E1] border border-[#1F1F23] hover:bg-[#2A2A30]',
    ghost: 'hover:bg-[#15151A] text-[#9A9A9E]',
    destructive:
        'bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500/30',
};

const sizeClasses: Record<NonNullable<MarkusButtonProps['size']>, string> = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-10 rounded-md px-8',
    icon: 'h-9 w-9',
};

export const MarkusButton = forwardRef<HTMLButtonElement, MarkusButtonProps>(
    ({ className, variant = 'default', size = 'default', ...props }, ref) => (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:ring-[#D4AF37] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
                variantClasses[variant],
                sizeClasses[size],
                className,
            )}
            {...props}
        />
    ),
);
MarkusButton.displayName = 'MarkusButton';

/* ---------------- Badge ---------------- */

type MarkusBadgeProps = HTMLAttributes<HTMLDivElement> & {
    variant?:
        | 'default'
        | 'secondary'
        | 'destructive'
        | 'outline'
        | 'success'
        | 'warning';
};

const badgeVariants: Record<
    NonNullable<MarkusBadgeProps['variant']>,
    string
> = {
    default: 'border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]',
    secondary: 'border-white/5 bg-[#1F1F23] text-[#E0E0E1] hover:bg-[#2A2A30]',
    destructive: 'bg-red-500/10 text-red-500 border-red-500/20',
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    outline: 'text-[#9A9A9E] border-[#1F1F23]',
};

export function MarkusBadge({
    className,
    variant = 'default',
    ...props
}: MarkusBadgeProps) {
    return (
        <div
            className={cn(
                'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors',
                badgeVariants[variant],
                className,
            )}
            {...props}
        />
    );
}

/* ---------------- Form Primitives ---------------- */

export function MarkusLabel({
    className,
    ...props
}: HTMLAttributes<HTMLLabelElement> & { htmlFor?: string }) {
    return (
        <label
            className={cn('text-sm font-medium text-[#9A9A9E]', className)}
            {...props}
        />
    );
}

export const MarkusInput = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
    <input
        ref={ref}
        className={cn(
            'flex h-9 w-full rounded-md border border-[#1F1F23] bg-[#0E0E11] px-3 py-2 text-sm text-[#E0E0E1] placeholder-[#4B4B52] transition-colors focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
        )}
        {...props}
    />
));
MarkusInput.displayName = 'MarkusInput';

export const MarkusPasswordInput = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <MarkusInput
                ref={ref}
                type={show ? 'text' : 'password'}
                className={cn('pr-10', className)}
                {...props}
            />
            <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-3 text-[#6B6B76] hover:text-[#E0E0E1]"
                tabIndex={-1}
                aria-label={show ? 'Hide password' : 'Show password'}
            >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
        </div>
    );
});
MarkusPasswordInput.displayName = 'MarkusPasswordInput';

export function MarkusInputError({
    message,
    className,
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    if (!message) return null;

    return (
        <p
            className={cn('text-sm text-red-400', className)}
            {...props}
        >
            {message}
        </p>
    );
}

export function MarkusTextLink({
    className,
    ...props
}: ComponentProps<typeof Link>) {
    return (
        <Link
            className={cn(
                'text-[#D4AF37] underline decoration-[#D4AF37]/30 underline-offset-4 transition-colors hover:decoration-[#D4AF37]',
                className,
            )}
            {...props}
        />
    );
}

export function MarkusSpinner() {
    return (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    );
}
