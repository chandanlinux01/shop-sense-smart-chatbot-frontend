"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { loginAction } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import { LoginRequest } from "@/types/auth";
import { GlobalClientLoader } from "@/components/ui/Loading";

import { toast } from "sonner";

const ForgotPasswordPage = () => {
    const router = useRouter();
    const [agree, setAgree] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [loginDetails, setLoginDetails] = useState<LoginRequest>({
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!loginDetails.email || !loginDetails.password) {
            toast.error("Please fill in all fields");
            return;
        }

        if (!agree) {
            toast.error("You must agree to the Terms and Conditions");
            return;
        }

        setLoading(true);
        try {
            const result = await loginAction(loginDetails);

            if (result.success) {
                toast.success("Welcome back! Login successful.");
                // Token is already securely stored in http-only cookie by server action
                // No need to store it in localStorage anymore.
                router.push('/');
                router.refresh(); // Refresh to ensure Server Components pick up the new cookie
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error("Network error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background antialiased">
            {/* Visual Side (Hidden on Mobile) */}
            <div className="hidden md:flex w-1/2 items-center justify-center p-12 relative overflow-hidden">
                <div className="relative w-full max-w-md aspect-square">
                    <Image
                        src="/images/login_image.png"
                        alt="ShopSense AI Visual"
                        fill
                        priority
                        className="rounded-2xl object-contain"
                    />
                </div>
            </div>


            {/* Form Side */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-20 bg-white dark:bg-zinc-950">
                <div className="w-full max-w-[500px] space-y-6 p-6 card-border-shadow">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground text-center">
                        Forgot your password
                    </h1>
                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Input
                                label="Check your email"
                                name="email"
                                placeholder="name@company.com"
                                type="number"
                                required
                                value={loginDetails.email}
                                onChange={handleInputChange}
                                className="h-12"
                            />
                        </div>

                        <div className="flex gap-4 text-foreground flex items-center justify-end">
                            <Link href="/login" className="text-sm font-medium text-primary hover:underline">
                                Login
                            </Link>
                            <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                                Resend code
                            </Link>
                        </div>

                        <div className="space-y-3 pt-2">
                            <Button
                                variant="primary"
                                shape="pill"
                                className="w-full h-12 text-base font-bold shadow-teal-500/20 shadow-lg hover:shadow-xl transition-all"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <GlobalClientLoader message="Sending OTP..." />
                                ) : (
                                    "Send email"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;