"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { forgotPasswordAction } from "@/actions/auth.actions";
import { toast } from "sonner";
import { ForgotPasswordRequest } from "@/types/auth";
import { handleApiError } from "@/lib/handle-error";
import { CustomLink } from "@/components/ui/CustomLink";

const ForgotPasswordPage = () => {
    const [formData, setFormData] = useState<ForgotPasswordRequest>({
        email: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.email) {
            toast.error("Please enter your email address");
            return;
        }

        setIsLoading(true);
        try {
            const result = await forgotPasswordAction(formData);

            if (result.success) {
                toast.success(result.message);
                setFormData({ email: "" });
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error(handleApiError(err));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background antialiased">
            {/* Visual Side */}
            <div className="hidden md:flex w-1/2 items-center justify-center p-12 relative overflow-hidden">
                <div className="relative w-full max-w-md aspect-square">
                    <Image
                        src="/images/login_image.png"
                        alt="ShopSense AI Visual"
                        fill
                        priority
                        className="rounded-xl object-contain"
                    />
                </div>
            </div>

            {/* Form Side */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-20 ">
                <div className="w-full max-w-[440px] space-y-6 p-6 border border-border rounded-lg bg-card shadow-md">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground text-center">
                        Forgot password
                    </h1>

                    <fieldset disabled={isLoading}>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <Input
                                label="Email address"
                                name="email"
                                placeholder="name@company.com"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="h-12"
                            />

                            <div className="flex gap-4 justify-end">
                                <CustomLink href="/login">
                                    Login
                                </CustomLink>
                            </div>

                            <Button
                                variant="primary"
                                shape="pill"
                                className="w-full h-12 text-base font-bold shadow-lg"
                                type="submit"
                                isLoading={isLoading}
                                loadingText="Sending..."
                            >
                                Send email
                            </Button>
                        </form>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
