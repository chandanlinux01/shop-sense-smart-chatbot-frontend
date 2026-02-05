import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/Loading';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:cursor-pointer',
    {
        variants: {
            variant: {
                primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
                secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
                outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                gradient: 'bg-gradient-primary text-primary-foreground shadow hover:opacity-90',
                black: 'bg-black text-white hover:bg-black/90',
                success: 'bg-success text-success-foreground hover:bg-success/90 shadow-sm !text-success-foreground',
            },
            size: {
                default: 'h-10 px-2 py-2',
                sm: 'h-8 px-3 text-xs',
                md: 'h-9 px-4 text-sm',
                lg: 'h-11 px-8',
                icon: 'h-10 w-10',
            },
            shape: {
                default: 'rounded-md',
                rounded: 'rounded-lg',
                pill: 'rounded-full px-6',
                circle: 'rounded-full p-0 aspect-square',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default',
            shape: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
    loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, shape, asChild = false, isLoading, loadingText, children, disabled, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, shape, className }))}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <Spinner size="sm" variant="current" />
                        {loadingText ? <span>{loadingText}</span> : children}
                    </>
                ) : (
                    children
                )}
            </Comp>
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };