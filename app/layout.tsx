import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import { FullPageLoader } from "@/components/ui/FullPageLoader";
import "./globals.css";
import { cookies } from "next/headers";
import { AuthInitializer } from "@/components/providers/auth-initializer";
import { getMeAction } from "@/actions/user.actions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Chatbot",
  description: "Next-gen AI Chatbot implementation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  let initialUser = null;

  // Agar token hai, tabhi API call karo
  if (token) {
    const result = await getMeAction();
    if (result.success) {
      initialUser = result.data;
    }
  }

  return (
    // suppressHydrationWarning is crucial for next-themes to avoid console errors
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthInitializer initialUser={initialUser}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-right" richColors closeButton />
            <FullPageLoader />
          </ThemeProvider>
        </AuthInitializer>
      </body>
    </html>
  );
}
