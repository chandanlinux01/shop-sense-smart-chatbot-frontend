import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, helperText, ...props }, ref) => {
        const id = React.useId();
        return (
            <div className="w-full space-y-2.5">
                {label && (
                    <label
                        htmlFor={props.id || id}
                        className="text-foreground text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    className={cn(
                        'flex h-10 w-full rounded-lg border border-input px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                        error && 'border-destructive focus-visible:ring-destructive',
                        className
                    )}
                    id={props.id || id}
                    ref={ref}
                    {...props}
                />
                {error ? (
                    <p className="text-xs font-medium text-destructive">{error}</p>
                ) : (
                    helperText && (
                        <p className="text-xs text-muted-foreground">{helperText}</p>
                    )
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
