"use client";

import { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/Button";

interface AsyncButtonProps extends ButtonProps {
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => Promise<any> | void;
}

export function AsyncButton({
    onClick,
    children,
    disabled,
    className,
    loadingText,
    ...props
}: AsyncButtonProps) {
    const [isInternalLoading, setIsInternalLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!onClick) return;

        try {
            setIsInternalLoading(true);
            await onClick(e);
        } catch (error) {
            console.error("Async Button Action Failed:", error);
        } finally {
            setIsInternalLoading(false);
        }
    };

    return (
        <Button
            {...props}
            isLoading={props.isLoading || isInternalLoading}
            loadingText={loadingText}
            disabled={disabled || props.isLoading || isInternalLoading}
            onClick={handleClick}
            className={className}
        >
            {children}
        </Button>
    );
}