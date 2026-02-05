import * as React from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, helperText, ...props }, ref) => {
        const id = React.useId();
        const [showPassword, setShowPassword] = React.useState(false);

        const isPassword = type === 'password';

        return (
            <div className="w-full space-y-2.5">
                {label && (
                    <label
                        htmlFor={props.id || id}
                        className="text-foreground text-sm font-medium"
                    >
                        {label}
                    </label>
                )}

                <div className="relative">
                    <input
                        id={props.id || id}
                        ref={ref}
                        type={isPassword && showPassword ? 'text' : type}
                        className={cn(
                            'flex h-10 w-full rounded-lg border border-input px-3 py-2 pr-10 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                            error && 'border-destructive focus-visible:ring-destructive',
                            className
                        )}
                        {...props}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
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

Input.displayName = 'Input';
export { Input };
