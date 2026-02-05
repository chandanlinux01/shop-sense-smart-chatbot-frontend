import * as React from 'react';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const linkVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:cursor-pointer',
    {
        variants: {
            variant: {
                default: 'text-primary underline-offset-4 hover:underline',
                primary: 'text-primary hover:text-primary/80',
                secondary: 'text-secondary hover:text-secondary/80',
                muted: 'text-muted-foreground hover:text-foreground',
                black: 'text-black hover:text-black/80',
                outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-1',
                ghost: 'hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-1',
            },
            size: {
                default: '',
                sm: 'text-xs',
                lg: 'text-base',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface LinkProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    NextLinkProps,
    VariantProps<typeof linkVariants> { }

const CustomLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <NextLink
                className={cn(linkVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

CustomLink.displayName = 'Link';

export { CustomLink, linkVariants };
