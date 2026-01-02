"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { useState } from "react";

const LoginPage = () => {
    const [agree, setAgree] = useState<boolean>(false);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background antialiased">
            {/* Visual Side (Hidden on Mobile) */}
            <div className="hidden md:flex w-1/2 items-center justify-center p-12 relative overflow-hidden">
                <div className="relative z-10 text-center space-y-8 max-w-md">
                    <div className="flex justify-center">
                        <Image
                            src="/login/login-image.png"
                            alt="ShopSense AI Visual"
                            width={380}
                            height={380}
                            className="rounded-2xl object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-20 bg-white dark:bg-zinc-950">
                <div className="w-full max-w-[440px] space-y-6">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center md:text-left space-y-2">
                        <div className="mb-4">
                            <Image
                                src="/login/login-image.png"
                                alt="Logo"
                                width={60}
                                height={60}
                                className="rounded-xl shadow-lg"
                            />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                            Login with ShopSense AI
                        </h1>
                    </div>

                    {/* Form */}
                    <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <Input
                                label="Email"
                                placeholder="name@company.com"
                                type="email"
                                required
                                className="h-12 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                            />
                            <Input
                                label="Password"
                                placeholder="••••••••"
                                type="password"
                                required
                                className="h-12 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                            />
                        </div>

                        <div className="text-foreground flex items-center justify-end">
                            <Link
                                href="/forgot-password"
                                className="text-sm"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <div className="space-y-2 pt-2">
                            <div className="flex items-center space-x-2 py-2">
                                <Checkbox
                                    id="terms-check"
                                    checked={agree}
                                    onCheckedChange={(checked) => setAgree(checked as boolean)}
                                    label="By creating an account, you agree to our Terms and Conditions"
                                    className="border-zinc-300 dark:border-zinc-700"
                                />
                            </div>
                            <Button
                                variant="primary"
                                shape="pill"
                                className="w-full h-12 text-base font-bold shadow-teal-500/20 shadow-lg hover:shadow-xl transition-all"
                                type="submit"
                            >
                                Log in
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;