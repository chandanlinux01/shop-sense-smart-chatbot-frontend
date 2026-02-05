import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    options: { label: string; value: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, helperText, options, ...props }, ref) => {
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
                <div className="relative">
                    <select
                        className={cn(
                            'flex h-10 w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                            error && 'border-destructive focus-visible:ring-destructive',
                            className
                        )}
                        id={props.id || id}
                        ref={ref}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
                </div>
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
Select.displayName = 'Select';

export { Select };
