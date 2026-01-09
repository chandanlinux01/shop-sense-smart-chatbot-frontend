"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Check, Copy } from 'lucide-react';

export default function GenerateScriptPage() {
    const [copied, setCopied] = useState(false);
    const scriptCode = `<script src="https://your-app.com/script.js" data-id="YOUR_UNIQUE_ID" async defer></script>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(scriptCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-primary p-2 rounded-lg">
                            <ShoppingBag className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 shop-sense-text">ShopSense AI</h1>
                    </div>
                    <p className="text-sm text-gray-500">Powered By Anticip8</p>
                </header>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Step 3 Of 3</h2>
                </div>

                <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 flex flex-col items-center text-center max-w-4xl mx-auto mt-10">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Step 3: Install the Script</h3>
                    <p className="text-gray-600 mb-8 max-w-lg">
                        Follow the instructions below for your selected method to get started.
                    </p>

                    <div className="w-full max-w-3xl bg-gray-50 rounded-xl p-8 border border-gray-200 text-left relative group">
                        <code className="text-sm font-mono text-gray-800 break-all">
                            {scriptCode}
                        </code>

                        <div className="mt-6">
                            <Button
                                onClick={handleCopy}
                                variant="black"
                                size="sm"
                                className="transition-all"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 mr-2" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        Copy
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-between w-full mt-12 max-w-4xl">
                        <Button variant="black" size="lg">
                            Back to Step 2
                        </Button>
                        <Button variant="primary" size="lg" className="bg-[#01A1A8] hover:bg-[#0eced3] text-white">
                            Verify Installation
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
