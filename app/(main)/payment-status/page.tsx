"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, XCircle, ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function PaymentStatusPage() {
    const searchParams = useSearchParams();
    const status = searchParams.get("status");

    const isSuccess = status === "success";

    return (
        <div className="h-full flex items-center justify-center p-4">
            <div className="max-w-md w-full border border-border bg-card p-8 rounded-2xl shadow-xl text-center space-y-6 m-auto">

                {isSuccess ? (
                    <>
                        <div className="flex justify-center">
                            <CheckCircle2 className="w-20 h-20 text-emerald-500 animate-in zoom-in duration-500" />
                        </div>
                        <h1 className="text-2xl font-bold">Payment Received!</h1>
                        <p className="text-muted-foreground">
                            Thank you for your purchase. Your account has been upgraded successfully.
                        </p>
                        <Button asChild className="w-full h-12 font-bold" shape="pill" variant="success">
                            <Link href="/dashboard">
                                <LayoutDashboard className="mr-2 w-5 h-5" />
                                Go to Dashboard
                            </Link>
                        </Button>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center">
                            <XCircle className="w-20 h-20 text-destructive animate-in zoom-in duration-500" />
                        </div>
                        <h1 className="text-2xl font-bold">Payment Cancelled</h1>
                        <p className="text-muted-foreground">
                            No worries! Your order has not been processed, and you haven't been charged.
                        </p>
                        <Button asChild variant="outline" className="w-full h-12 font-bold" shape="pill">
                            <Link href="/pricing-plans">
                                <ArrowLeft className="mr-2 w-5 h-5" />
                                Back to Pricing
                            </Link>
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}