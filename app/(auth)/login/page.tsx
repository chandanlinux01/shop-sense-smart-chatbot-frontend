// "use client";

// import * as React from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/Button";
// import { Input } from "@/components/ui/Input";
// import { Checkbox } from "@/components/ui/Checkbox";
// import { useState } from "react";
// import { loginAction } from "@/actions/auth.actions";
// import { useRouter } from "next/navigation";
// import { LoginRequest } from "@/types/auth";
// import { useLoadingStore } from "@/store/useLoadingStore";
// import { handleApiError } from "@/lib/handle-error";

// import { toast } from "sonner";
// import { CustomLink } from "@/components/ui/CustomLink";
// import { useUserStore } from "@/store/useUserStore";

// const LoginPage = () => {
//     const router = useRouter();
//     const { startLoading, stopLoading } = useLoadingStore();
//     const setUser = useUserStore((state) => state.setUser);
//     const [agree, setAgree] = useState<boolean>(false);

//     const [loginDetails, setLoginDetails] = useState<LoginRequest>({
//         email: "",
//         password: "",
//     });

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setLoginDetails((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!loginDetails.email || !loginDetails.password) {
//             toast.error("Please fill in all fields");
//             return;
//         }

//         if (!agree) {
//             toast.error("You must agree to the Terms and Conditions");
//             return;
//         }

//         startLoading("Authenticating...");
//         try {
//             const result = await loginAction(loginDetails);

//             if (result.success && result.data?.user_details) {
//                 setUser(result.data.user_details);
//                 toast.success(result.message);
//                 router.refresh();
//                 const plan = result.data.user_details?.pricing_plan;
//                 if (plan === "free" || plan === "expired") {
//                     router.push('/pricing-plans');
//                 } else {
//                     router.push('/dashboard');
//                 }
//             } else {
//                 toast.error(result.message);
//             }
//         } catch (err) {
//             toast.error(handleApiError(err));
//         } finally {
//             stopLoading();
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col md:flex-row bg-background antialiased">
//             {/* Visual Side (Hidden on Mobile) */}
//             <div className="hidden md:flex w-1/2 items-center justify-center px-12 relative overflow-hidden">
//                 <div className="relative w-full max-w-md aspect-square">
//                     <Image
//                         src="/images/login_image.png"
//                         alt="ShopSense AI Visual"
//                         fill
//                         priority
//                         className="rounded-xl object-contain"
//                     />
//                 </div>
//             </div>


//             {/* Form Side */}
//             <div className="flex-1 flex flex-col items-center justify-center px-12 bg-background">
//                 <div className="w-full max-w-[440px] space-y-6">
//                     {/* Header */}
//                     <div className="flex flex-col items-center text-center md:text-left space-y-2">
//                         <div className="relative w-10 h-10 mb-2">
//                             <Image
//                                 src="/images/shop_sense_logo.png"
//                                 alt="Logo"
//                                 fill
//                                 className="object-contain"
//                             />
//                         </div>

//                         <h1 className="flex flex-wrap items-baseline justify-center gap-1">
//                             <span>Login with</span>

//                             <span className="shop-sense-text">
//                                 ShopSense AI
//                             </span>
//                         </h1>
//                     </div>


//                     {/* Form */}
//                     <form className="space-y-4 border border-border rounded-[var(--radius-lg)] p-6 bg-card shadow-md" onSubmit={handleSubmit}>
//                         <div className="space-y-2">
//                             <Input
//                                 label="Email"
//                                 name="email"
//                                 placeholder="name@company.com"
//                                 type="email"
//                                 required
//                                 value={loginDetails.email}
//                                 onChange={handleInputChange}
//                                 className="h-12"
//                             />
//                             <Input
//                                 label="Password"
//                                 name="password"
//                                 placeholder="••••••••"
//                                 type="password"
//                                 required
//                                 value={loginDetails.password}
//                                 onChange={handleInputChange}
//                                 className="h-12"
//                             />
//                         </div>

//                         <div className="text-foreground flex items-center justify-end">
//                             <CustomLink href="/forgot-password">
//                                 Forgot password?
//                             </CustomLink>
//                         </div>

//                         <div className="space-y-3 pt-2">
//                             <div className="flex items-start space-x-2">
//                                 <Checkbox
//                                     id="terms-check"
//                                     checked={agree}
//                                     onCheckedChange={(checked) => setAgree(checked as boolean)}
//                                     label="By creating an account, you agree to our Terms and Conditions"
//                                     className="mt-1"
//                                 />
//                             </div>
//                             <Button
//                                 variant="primary"
//                                 shape="pill"
//                                 className="w-full h-12 text-base font-bold shadow-lg hover:shadow-md transition-fast"
//                                 type="submit"
//                             >
//                                 Log in
//                             </Button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;



"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { useState } from "react";
import { loginAction } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import { LoginRequest } from "@/types/auth";
import { toast } from "sonner";
import { CustomLink } from "@/components/ui/CustomLink";
import { useUserStore } from "@/store/useUserStore";
import { handleApiError } from "@/lib/handle-error";

const LoginPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const setUser = useUserStore((state) => state.setUser);
    const [agree, setAgree] = useState<boolean>(false);

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

        setIsLoading(true); // Start Spinner

        try {
            const result = await loginAction(loginDetails);

            if (result.success && result.data?.user_details) {
                console.log(result.data.user_details);
                setUser(result.data.user_details);
                toast.success(result.message);
                router.refresh();

                const plan = result.data.user_details?.pricing_plan;
                if (plan === "free" || plan === "expired") {
                    router.push('/pricing-plans');
                } else {
                    router.push('/dashboard');
                }
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
        <div className="min-h-screen flex flex-col md:flex-row bg-background antialiased">
            <div className="hidden md:flex w-1/2 items-center justify-center px-12 relative overflow-hidden">
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
            <div className="flex-1 flex flex-col items-center justify-center px-12 bg-background">
                <div className="w-full max-w-[440px] space-y-6">
                    <div className="flex flex-col items-center text-center md:text-left space-y-2">
                        <div className="relative w-10 h-10 mb-2">
                            <Image
                                src="/images/shop_sense_logo.png"
                                alt="Logo"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <h1 className="flex flex-wrap items-baseline justify-center gap-1">
                            <span>Login with</span>

                            <span className="shop-sense-text">
                                ShopSense AI
                            </span>
                        </h1>
                    </div>

                    <fieldset disabled={isLoading} className="group space-y-4 border border-border rounded-[var(--radius-lg)] p-6 bg-card shadow-md disabled:opacity-70">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    required
                                    value={loginDetails.email}
                                    onChange={handleInputChange}
                                    className="h-12"
                                />
                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    required
                                    value={loginDetails.password}
                                    onChange={handleInputChange}
                                    className="h-12"
                                />
                            </div>

                            <div className="text-foreground flex items-center justify-end">
                                <CustomLink href="/forgot-password">Forgot password?</CustomLink>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="terms-check"
                                        checked={agree}
                                        onCheckedChange={(c) => setAgree(!!c)}
                                        label="By creating an account, you agree to our Terms"
                                        className="mt-1"
                                    />
                                </div>

                                <Button
                                    variant="primary"
                                    shape="pill"
                                    className="w-full h-12 text-base font-bold shadow-lg"
                                    type="submit"
                                    isLoading={isLoading}
                                    loadingText="Authenticating..."
                                >
                                    Log in
                                </Button>
                            </div>
                        </form>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;