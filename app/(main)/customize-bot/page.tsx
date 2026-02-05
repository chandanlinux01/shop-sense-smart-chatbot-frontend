import { Suspense } from "react";
import ChatbotDataFetcher from "./chatbot-data-fetcher";

export default function Page() {
  return (
    <div className="bg-highlight-background text-highlight-foreground min-h-screen p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">ChatBot Appearance</h2>
          <p>Configure your AI assistant for your website.</p>
        </div>

        {/* Yahan hum loading state handle karenge */}
        <Suspense
          fallback={
            <div className="h-[600px] flex items-center justify-center">
              Loading Settings...
            </div>
          }
        >
          <ChatbotDataFetcher />
        </Suspense>
      </div>
    </div>
  );
}
