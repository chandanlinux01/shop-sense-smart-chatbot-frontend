import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";

const spinnerVariants = cva(
    "animate-spin",
    {
        variants: {
            size: {
                sm: "!h-4 !w-4",
                md: "!h-6 !w-6",
                lg: "!h-8 !w-8",
                xl: "!h-12 !w-12",
            },
            variant: {
                current: "text-current",
                primary: "text-primary",
                white: "text-white",
            }
        },
        defaultVariants: {
            size: "md",
            variant: "current",
        },
    }
);

export interface SpinnerProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'>,
    VariantProps<typeof spinnerVariants> { }

export function Spinner({ className, size, variant, ...props }: SpinnerProps) {
    return (
        <div className={cn("flex items-center justify-center", className)} {...props}>
            <Loader2 className={cn(spinnerVariants({ size, variant }))} />
        </div>
    );
}
