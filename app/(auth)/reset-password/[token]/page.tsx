import { changePasswordAction } from "@/actions/auth.actions";
import { ErrorDisplay } from "@/components/ui/ErrorDisplay";
import ResetPasswordPage from "./ResetPasswordPage";

interface PageProps {
    params: Promise<{ token: string }>;
}

export default async function Page({ params }: PageProps) {
    const { token } = await params;

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-6">
                <ErrorDisplay
                    title="Missing Token"
                    description="No reset token was provided. Please check your email link or request a new one."
                    actionLabel="Request New Link"
                    actionHref="/forgot-password"
                    secondaryActionLabel="Back to Login"
                    secondaryActionHref="/login"
                    homeAction={false}
                />
            </div>
        );
    }

    const result = await changePasswordAction({ new_password: "", token: token });

    if (!result.success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-6">
                <ErrorDisplay
                    title="Invalid or Expired Link"
                    description={result.message || "This password reset link is no longer valid. Standard links expire after 15 minutes."}
                    actionLabel="Request New Link"
                    actionHref="/forgot-password"
                    secondaryActionLabel="Back to Login"
                    secondaryActionHref="/login"
                    homeAction={false}
                />
            </div>
        );
    }

    return <ResetPasswordPage token={token} />;
}
