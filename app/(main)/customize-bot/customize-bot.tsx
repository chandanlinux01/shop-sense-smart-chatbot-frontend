"use client";

import { HexColorPicker } from "react-colorful";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Upload, X, ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { ChatbotSettingsResponse } from "@/types/chatbot";

interface CustomizeBotPageProps {
  initialData: ChatbotSettingsResponse;
  storeId: string;
}

export default function CustomizeBotPage({
  initialData,
  storeId,
}: CustomizeBotPageProps) {
  const [primaryColor, setPrimaryColor] = useState("#01A1A8"); // Default Teal
  const [headingTextColor, setHeadingTextColor] = useState<"white" | "black">(
    "white",
  );
  const [avatar, setAvatar] = useState<string | null>(null);
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

  const handleSave = () => {
    const settings = {
      primaryColor,
      headingTextColor,
      avatar,
    };
    // API call would go here
    // axios.post('/api/save-settings', settings)
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Column 1: Chat Widget Design (Color & Avatar) */}
      <div className="bg-background text-foreground text-card-foreground rounded-2xl p-6 shadow-sm border border-border h-fit">
        <h3 className="text-xl font-bold mb-4">Chat Widget Design</h3>

        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Color picker {primaryColor}
          </label>
          {/* Color Preview Block - Replaced with Colorful */}
          <div className="mb-4">
            <HexColorPicker
              color={primaryColor}
              onChange={setPrimaryColor}
              style={{ width: "100%", height: "180px", borderRadius: "12px" }}
            />
          </div>

          {/* Hex Input */}
          <div className="flex items-center gap-2 mb-4 bg-muted p-2 rounded-lg border border-border">
            <span className="text-muted-foreground font-medium">Hex</span>
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="bg-transparent border-none outline-none text-foreground font-mono w-full"
            />
            <div
              className="w-6 h-6 rounded-full border border-border"
              style={{ backgroundColor: primaryColor }}
            />
            <span className="text-xs text-muted-foreground">100%</span>
          </div>

          {/* Heading Text Color Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Heading Text Color
            </label>
            <div className="flex gap-2">
              <Button
                onClick={() => setHeadingTextColor("white")}
                variant={headingTextColor === "white" ? "black" : "outline"}
                className="flex-1"
              >
                White
              </Button>
              <Button
                onClick={() => setHeadingTextColor("black")}
                variant={headingTextColor === "black" ? "black" : "outline"}
                className="flex-1"
              >
                Black
              </Button>
            </div>
          </div>
        </div>

        {/* Upload Avatar */}
        <div className="mt-8 pt-6 border-t border-border">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div
            onClick={triggerFileInput}
            className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-accent transition-all group"
          >
            {avatar ? (
              <div className="relative w-16 h-16 mb-2">
                <Image
                  src={avatar}
                  alt="Avatar"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full shadow-md"
                />
                <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                  Change
                </div>
              </div>
            ) : (
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2 group-hover:bg-background text-foreground text-muted-foreground group-hover:text-primary transition-colors">
                <Upload className="w-5 h-5" />
              </div>
            )}
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
              Upload Avatar
            </span>
          </div>
        </div>
      </div>

      {/* Column 2: Chatbot Preview */}
      <div className="bg-background text-foreground rounded-2xl p-2 shadow-sm border border-border flex flex-col items-center justify-center min-h-[600px] p-6">
        <h3 className="text-xl font-bold text-foreground mb-6 w-full text-left">
          Chatbot Appearance
        </h3>

        {/* Phone Mockup Frame */}
        <div className="w-full max-w-[320px] h-[500px] bg-background rounded-[2rem] shadow-2xl overflow-hidden border border-border relative flex flex-col relative flex flex-col">
          {/* Chat Header */}
          <div
            className="p-4 flex items-center justify-between border-b"
            style={{
              backgroundColor: primaryColor,
              color: headingTextColor,
              borderColor: headingTextColor,
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0">
                {/* <Image src="/images/shop_sense_logo.png" alt="Logo" fill className="object-contain" />
                 */}
                <div
                  className={`w-10 h-10 rounded-full overflow-hidden relative border border-[${headingTextColor}] shrink-0 flex items-center justify-center`}
                  style={{ backgroundColor: primaryColor }} // Dynamic Background
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M16.0004 9V6C16.0004 3.79086 14.2095 2 12.0004 2C9.79123 2 8.00037 3.79086 8.00037 6V9M3.59237 10.352L2.99237 16.752C2.82178 18.5717 2.73648 19.4815 3.03842 20.1843C3.30367 20.8016 3.76849 21.3121 4.35839 21.6338C5.0299 22 5.94374 22 7.77142 22H16.2293C18.057 22 18.9708 22 19.6423 21.6338C20.2322 21.3121 20.6971 20.8016 20.9623 20.1843C21.2643 19.4815 21.179 18.5717 21.0084 16.752L20.4084 10.352C20.2643 8.81535 20.1923 8.04704 19.8467 7.46616C19.5424 6.95458 19.0927 6.54511 18.555 6.28984C17.9444 6 17.1727 6 15.6293 6L8.37142 6C6.82806 6 6.05638 6 5.44579 6.28984C4.90803 6.54511 4.45838 6.95458 4.15403 7.46616C3.80846 8.04704 3.73643 8.81534 3.59237 10.352Z"
                        stroke={headingTextColor} // Dynamic Icon Color
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-sm !mb-0">ShopSense AI</h4>
                <p className="text-[10px] opacity-80 !mb-0">
                  Powered By Anticip8
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={`hover:bg-transparent h-auto w-auto p-0 ${headingTextColor === "white" ? "text-white/80 hover:text-white" : "text-black/80 hover:text-black"}`}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 bg-muted/30 p-4 overflow-y-auto flex flex-col">
            {/* Bot Message */}
            <div className="flex gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M3 5V20.7929C3 21.2383 3.53857 21.4614 3.85355 21.1464L7.70711 17.2929C7.89464 17.1054 8.149 17 8.41421 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5Z"
                      stroke={primaryColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M15 12C14.2005 12.6224 13.1502 13 12 13C10.8498 13 9.79952 12.6224 9 12"
                      stroke={primaryColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M9 8.01953V8"
                      stroke={primaryColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M15 8.01953V8"
                      stroke={primaryColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="max-w-[80%]">
                <p className="text-sm font-semibold bg-foreground text-background p-2 shadow-sm rounded-2xl rounded-tl-none">
                  How can I help you today?
                </p>
              </div>
            </div>

            {/* Product Carousel Mockup */}
            {/* Product Section */}
            <div className="mt-auto">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-background text-foreground p-2 rounded-xl border border-border shadow-sm w-32 shrink-0"
                  >
                    <div className="bg-muted rounded-lg h-24 mb-2 flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-muted-foreground/30" />
                    </div>
                    <p className="text-xs font-bold text-foreground truncate">
                      Product {i}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-bold text-red-500">
                        $12
                      </span>
                      <div className="bg-black w-4 h-4 rounded-full flex items-center justify-center text-[8px]">
                        <ArrowRight className="w-2 h-2 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Input Area */}
          <div className="p-3 bg-background text-foreground border-t border-border">
            <div className="relative">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full bg-muted rounded-full py-2 pl-4 pr-10 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-black"
              />
              <Button
                variant="black"
                size="icon"
                shape="circle"
                className="absolute right-0 top-0 bottom-0 w-9 h-9"
              >
                <ArrowLeft className="w-4 h-4 rotate-300 transform -scale-x-100" />
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Action Button Preview */}
        <div className="mt-1 flex justify-end w-[320px]">
          <div
            className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white"
            style={{ backgroundColor: primaryColor }}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke={headingTextColor}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
