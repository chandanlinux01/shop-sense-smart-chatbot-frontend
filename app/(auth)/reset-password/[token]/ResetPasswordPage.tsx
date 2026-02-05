"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { changePasswordAction, logoutAction } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import { ChangePasswordRequest } from "@/types/auth";
import { handleApiError } from "@/lib/handle-error";
import { toast } from "sonner";
import { CustomLink } from "@/components/ui/CustomLink";
import { useUserStore } from "@/store/useUserStore";

interface ResetPasswordPageProps {
    token: string;
}

export default function ResetPasswordPage({ token }: ResetPasswordPageProps) {
    const router = useRouter();
    const clearUser = useUserStore((state) => state.clearUser);
    const [changePassword, setChangePassword] = useState<ChangePasswordRequest>({
        new_password: "",
        confirm_password: "",
        token: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChangePassword((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            toast.error("Invalid or expired session. Please request a new link.");
            return;
        }

        if (!changePassword.new_password || !changePassword.confirm_password) {
            toast.error("Please fill in all fields");
            return;
        }

        if (changePassword.new_password !== changePassword.confirm_password) {
            toast.error("Passwords do not match");
            return;
        }

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(changePassword.new_password)) {
            toast.error(
                "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
            );
            return;
        }

        setIsLoading(true);
        try {
            const result = await changePasswordAction({
                new_password: changePassword.new_password,
                token: token
            });

            if (result.success) {
                await logoutAction();
                clearUser();
                setChangePassword({
                    new_password: "",
                    confirm_password: "",
                    token: ""
                });
                toast.success(result.message);
                router.refresh();
                router.push('/login');
            } else {
                toast.error(result.message);
                setIsLoading(false);
            }
        } catch (err) {
            toast.error(handleApiError(err));
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background antialiased" >
            {/* Visual Side (Hidden on Mobile) */}
            < div className="hidden md:flex w-1/2 items-center justify-center px-12 relative overflow-hidden" >
                <div className="relative w-full max-w-md aspect-square" >
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
            <div className="flex-1 flex flex-col items-center justify-center px-12 bg-background" >
                <div className="w-full max-w-[440px] space-y-6 border border-border rounded-lg p-6 bg-card shadow-md" >
                    <h1 className="text-center" >
                        Reset Password
                    </h1>
                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleSubmit} >
                        <div className="space-y-2" >
                            <Input
                                label="New Password"
                                name="new_password"
                                placeholder="••••••••"
                                type="password"
                                required
                                value={changePassword.new_password}
                                onChange={handleInputChange}
                                className="h-12"
                            />
                            <Input
                                label="Confirm Password"
                                name="confirm_password"
                                placeholder="••••••••"
                                type="password"
                                required
                                value={changePassword.confirm_password}
                                onChange={handleInputChange}
                                className="h-12"
                            />
                        </div>

                        < div className="text-foreground flex items-center justify-end" >
                            <CustomLink href="/login" >
                                Login
                            </CustomLink>
                        </div>

                        < div className="space-y-3 pt-2" >
                            <Button
                                variant="primary"
                                shape="pill"
                                className="w-full h-12 text-base font-bold shadow-lg hover:shadow-md transition-fast"
                                type="submit"
                            >
                                Change password
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

