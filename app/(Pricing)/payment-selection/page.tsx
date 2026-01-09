"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Lock } from "lucide-react";

const PaymentSelectionPage = () => {
    return (
        <div className="min-h-screen bg-card-bg-highlight py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8">
                            <Image
                                src="/images/shop_sense_logo.png"
                                alt="ShopSense Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="shop-sense-text font-extrabold text-2xl">ShopSense AI</span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Start Your Subscription</h1>
                        <p className="text-gray-500 mt-2">Confirm Your Plan And Enter Payment Details Below.</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Payment Details */}
                    <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>

                        <form className="space-y-6">
                            <div className="space-y-4">
                                <Input
                                    label="Card Number"
                                    placeholder="0000 0000 0000 0000"
                                    className="bg-white"
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Expiration Date"
                                        placeholder="MM / YY"
                                        className="bg-white"
                                    />
                                    <Input
                                        label="CVV"
                                        placeholder="123"
                                        className="bg-white"
                                    />
                                </div>

                                <Input
                                    label="Cardholder Name"
                                    placeholder="John Doe"
                                    className="bg-white"
                                />
                            </div>

                            <div className="pt-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Billing Address</h3>
                                <div className="space-y-4">
                                    <Input
                                        label="Address"
                                        placeholder="123 Main St"
                                        className="bg-white"
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="City"
                                            placeholder="Anytown"
                                            className="bg-white"
                                        />
                                        <Input
                                            label="ZIP Code"
                                            placeholder="12345"
                                            className="bg-white"
                                        />
                                    </div>

                                    <Input
                                        label="Country"
                                        placeholder="United States"
                                        className="bg-white"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-[400px]">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Your Plan: <span className="text-[#01A1A8] font-semibold">Pro Plan</span></span>
                                    <span className="font-semibold text-gray-900">$29.99 / mo</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-4">
                                    <span className="text-gray-600">Taxes & Fees</span>
                                    <span className="font-semibold text-gray-900">$2.50</span>
                                </div>
                                <div className="flex justify-between items-center text-base font-bold text-gray-900 pt-2">
                                    <span>Total Due Today:</span>
                                    <span>USD $32.49</span>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-[#01A1A8] hover:bg-[#008c93] text-white font-bold py-6 rounded-lg mb-6"
                            >
                                Start Subscription
                            </Button>

                            <div className="flex items-center justify-center gap-2 text-gray-500 text-xs mb-4">
                                <Lock className="w-3 h-3" />
                                <span>Secure SSL Encrypted Payment</span>
                            </div>

                            <div className="text-center text-xs text-gray-500 leading-relaxed">
                                By confirming your subscription, you agree to our{' '}
                                <Link href="#" className="text-[#01A1A8] hover:underline">Terms of Service</Link>
                                {' '}and{' '}
                                <Link href="#" className="text-[#01A1A8] hover:underline">Privacy Policy.</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSelectionPage;
