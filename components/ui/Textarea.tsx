import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, helperText, ...props }, ref) => {
        const id = React.useId();
        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        htmlFor={props.id || id}
                        className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    className={cn(
                        'flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
Textarea.displayName = 'Textarea';

export { Textarea };
