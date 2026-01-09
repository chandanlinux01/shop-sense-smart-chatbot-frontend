"use client";

import { HexColorPicker } from "react-colorful";
import React, { useState, useRef } from 'react';
import { Switch } from '@/components/ui/Switch';
import { Button } from '@/components/ui/Button';
import { Upload, X, MessageSquare, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import Image from 'next/image';


export default function CustomizeBotPage() {
    // State for customization
    const [primaryColor, setPrimaryColor] = useState('#01A1A8'); // Default Teal
    const [headingTextColor, setHeadingTextColor] = useState<'white' | 'black'>('white');
    const [avatar, setAvatar] = useState<string | null>(null);
    const [features, setFeatures] = useState({
        orderTracking: true,
        productAvailability: false,
        returnPolicy: true,
        storeHours: true,
        discounts: true,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setAvatar(event.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    const toggleFeature = (key: keyof typeof features) => {
        setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        const settings = {
            primaryColor,
            headingTextColor,
            avatar,
            features
        };
        console.log("Saving settings to API:", settings);
        // API call would go here
        // axios.post('/api/save-settings', settings)
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">ChatBot Appearance</h2>
                    <p className="text-gray-600">Configure your AI assistant for your website.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Column 1: Chat Widget Design (Color & Avatar) */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Chat Widget Design</h3>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Color picker {primaryColor}</label>
                            {/* Color Preview Block - Replaced with Colorful */}
                            <div className="mb-4">
                                <HexColorPicker
                                    color={primaryColor}
                                    onChange={setPrimaryColor}
                                    style={{ width: '100%', height: '180px', borderRadius: '12px' }}
                                />
                            </div>

                            {/* Hex Input */}
                            <div className="flex items-center gap-2 mb-4 bg-gray-50 p-2 rounded-lg border border-gray-200">
                                <span className="text-gray-500 font-medium">Hex</span>
                                <input
                                    type="text"
                                    value={primaryColor}
                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                    className="bg-transparent border-none outline-none text-gray-800 font-mono w-full"
                                />
                                <div className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: primaryColor }} />
                                <span className="text-xs text-gray-400">100%</span>
                            </div>

                            {/* Heading Text Color Selection */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Heading Text Color</label>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => setHeadingTextColor('white')}
                                        variant={headingTextColor === 'white' ? 'black' : 'outline'}
                                        className="flex-1"
                                    >
                                        White
                                    </Button>
                                    <Button
                                        onClick={() => setHeadingTextColor('black')}
                                        variant={headingTextColor === 'black' ? 'black' : 'outline'}
                                        className="flex-1"
                                    >
                                        Black
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Upload Avatar */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <div
                                onClick={triggerFileInput}
                                className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50 transition-all group"
                            >
                                {avatar ? (
                                    <div className="relative w-16 h-16 mb-2">
                                        <Image
                                            src={avatar}
                                            alt="Avatar"
                                            layout='fill'
                                            objectFit='cover'
                                            className="rounded-full shadow-md"
                                        />
                                        <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">Change</div>
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-white text-gray-400 group-hover:text-primary transition-colors">
                                        <Upload className="w-5 h-5" />
                                    </div>
                                )}
                                <span className="text-sm font-medium text-gray-600 group-hover:text-primary">Upload Avatar</span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button onClick={handleSave} variant="black" size="sm">Next</Button>
                        </div>
                    </div>

                    {/* Column 2: Chatbot Preview */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[600px]">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 w-full text-left">Chatbot Appearance</h3>

                        {/* Phone Mockup Frame */}
                        <div className="w-[320px] h-[550px] bg-white rounded-[2rem] shadow-2xl overflow-hidden border-[8px] border-gray-100 relativeflex flex-col relative flex flex-col">
                            {/* Chat Header */}
                            <div
                                className="p-4 flex items-center justify-between"
                                style={{ backgroundColor: primaryColor, color: headingTextColor }}
                            >
                                <div className="flex items-center gap-3">
                                    {avatar ? (
                                        <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden relative border border-white/30">
                                            <Image src={avatar} alt="Bot" layout="fill" objectFit='cover' />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                                            <ShoppingBag className={`w-5 h-5 ${headingTextColor === 'white' ? 'text-white' : 'text-black'}`} />
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-bold text-sm">ShopSense AI</h4>
                                        <p className="text-[10px] opacity-80">Powered By Anticip8</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`hover:bg-transparent h-auto w-auto p-0 ${headingTextColor === 'white' ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'}`}
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Chat Body */}
                            <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4">
                                {/* Bot Message */}
                                <div className="flex gap-2">
                                    {avatar ? (
                                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative shrink-0">
                                            <Image src={avatar} alt="Bot" layout="fill" objectFit='cover' />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                            <ShoppingBag className="w-4 h-4 text-gray-500" />
                                        </div>
                                    )}
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]">
                                        <p className="text-xs font-bold text-gray-900 mb-1">Hi Nik!</p>
                                        <p className="text-sm text-gray-700">How can I help you?</p>
                                    </div>
                                </div>

                                {/* Product Carousel Mockup */}
                                <div className="flex justify-end">
                                    <a href="#" className="text-xs text-blue-500 hover:underline mb-1 block text-right">View all</a>
                                </div>
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm w-32 shrink-0">
                                            <div className="bg-gray-100 rounded-lg h-24 mb-2 flex items-center justify-center">
                                                <ShoppingBag className="w-6 h-6 text-gray-300" />
                                            </div>
                                            <p className="text-xs font-bold text-gray-800 truncate">Product {i}</p>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-xs font-bold text-red-500">$12</span>
                                                <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] text-white" style={{ backgroundColor: primaryColor }}><ArrowRight className='w-2 h-2' /></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Chat Input Area */}
                            <div className="p-3 bg-white border-t border-gray-100">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search here..."
                                        className="w-full bg-gray-50 rounded-full py-2 pl-4 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-200"
                                    />
                                    <Button
                                        variant="black"
                                        size="icon"
                                        shape="circle"
                                        className="absolute right-1 top-1 bottom-1 w-8 h-8"
                                    >
                                        <ArrowLeft className="w-4 h-4 rotate-45 transform -scale-x-100" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Floating Action Button Preview */}
                        <div className="mt-4 flex justify-end w-[320px]">
                            <div className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                                <MessageSquare className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Feature Toggles */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Chat Widget Design</h3>

                        <div className="space-y-6">
                            {Object.entries(features).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                    <label htmlFor={key} className="text-sm font-medium text-gray-900 cursor-pointer capitalize select-none">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </label>
                                    <Switch
                                        id={key}
                                        checked={value}
                                        onCheckedChange={() => toggleFeature(key as keyof typeof features)}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <Button onClick={handleSave} variant="black" size="sm">Next</Button>
                        </div>
                    </div>

                </div>

                {/* Footer Navigation */}
                <div className="flex justify-between items-center mt-12 mb-8">
                    <Button variant="black" size="lg">
                        Back to Step 1
                    </Button>
                    <Button onClick={handleSave} variant="primary" size="lg" className="bg-[#01A1A8] hover:bg-[#0eced3] text-white">
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
