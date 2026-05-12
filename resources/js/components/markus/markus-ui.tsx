import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
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
