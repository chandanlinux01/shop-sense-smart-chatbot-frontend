import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CustomLink } from "@/components/ui/CustomLink";

const errorDisplayVariants = cva(
  "flex flex-col items-center justify-center text-center antialiased",
  {
    variants: {
      variant: {
        card: "max-w-md w-full p-8 border border-border rounded-xl bg-card shadow-lg mx-auto",
        "full-page": "min-h-[80vh] w-full px-6",
        inline:
          "p-4 border border-destructive/20 rounded-lg bg-destructive/5 text-left items-start",
      },
    },
    defaultVariants: {
      variant: "card",
    },
  },
);

interface ErrorDisplayProps
  extends
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof errorDisplayVariants> {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  homeAction?: boolean;
  children?: React.ReactNode;
}

export const ErrorDisplay = React.forwardRef<HTMLDivElement, ErrorDisplayProps>(
  (
    {
      title = "Something went wrong",
      description = "An unexpected error has occurred. Please try again later.",
      actionLabel,
      onAction,
      actionHref,
      secondaryActionLabel,
      secondaryActionHref,
      homeAction = true,
      variant,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const hasPrimaryAction = onAction || actionHref;
    const hasSecondaryAction = secondaryActionHref && secondaryActionLabel;
    const showFooter =
      (hasPrimaryAction || hasSecondaryAction || homeAction) &&
      variant !== "inline";
    return (
      <div
        ref={ref}
        className={cn(errorDisplayVariants({ variant, className }))}
        {...props}
      >
        <div
          className={cn(
            "mb-4 flex items-center justify-center p-3 rounded-full",
            variant === "inline"
              ? "bg-destructive/10 text-destructive p-2"
              : "bg-destructive/10 text-destructive",
          )}
        >
          <AlertCircle
            className={cn(variant === "inline" ? "w-5 h-5" : "w-10 h-10")}
          />
        </div>

        <h2
          className={cn(
            "font-bold text-foreground",
            variant === "inline" ? "text-base mb-1" : "text-2xl mb-2",
          )}
        >
          {title}
        </h2>

        <p
          className={cn(
            "text-muted-foreground",
            variant === "inline" ? "text-sm" : "text-base mb-8 max-w-75",
          )}
        >
          {description}
        </p>

        {children}

        {showFooter && (
          <div className="flex flex-col gap-3 w-full justify-center">
            {hasPrimaryAction && (
              <Button
                asChild={!!actionHref}
                onClick={onAction}
                variant="outline"
                shape="pill"
                className="w-full"
              >
                {actionHref ? (
                  <CustomLink href={actionHref} variant={null}>
                    {actionLabel || "Try Again"}
                  </CustomLink>
                ) : (
                  <>
                    <RefreshCcw className="mr-2 w-4 h-4" />
                    {actionLabel || "Try Again"}
                  </>
                )}
              </Button>
            )}

            <div className="flex flex-wrap gap-3 justify-center">
              {hasSecondaryAction && (
                <Button
                  asChild
                  variant="outline"
                  shape="pill"
                  className="flex-1 min-w-35"
                >
                  <CustomLink
                    href={secondaryActionHref}
                    className="hover:no-underline"
                  >
                    {secondaryActionLabel}
                  </CustomLink>
                </Button>
              )}

              {homeAction && (
                <Button
                  asChild
                  variant="outline"
                  shape="pill"
                  className="flex-1 min-w-35"
                >
                  <CustomLink
                    href="/"
                    className="hover:no-underline flex items-center"
                  >
                    Go Home
                  </CustomLink>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);

ErrorDisplay.displayName = "ErrorDisplay";
