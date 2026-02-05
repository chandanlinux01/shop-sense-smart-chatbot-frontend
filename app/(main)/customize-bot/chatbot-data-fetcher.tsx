import userService from "@/services/user.service";
import chatbotService from "@/services/chatbot.service";
import CustomizeBotPage from "./customize-bot";
import { ErrorDisplay } from "@/components/ui/ErrorDisplay";

export default async function ChatbotDataFetcher() {
  // 1. Get Store ID
  const UserDetails = await userService.getMe();
  const storeId = UserDetails.data.stores[0].store_id;

  if (!UserDetails.success && UserDetails.data.stores.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <ErrorDisplay
          title="Error"
          description="Something went wrong"
          actionLabel="go to login"
          actionHref="/login"
          homeAction={false}
        />
      </div>
    );
  }

  // 2. Parallel API Call (Best for performance)
  const settings = await chatbotService.getChatbotSettings(
    storeId,
  );

  return <CustomizeBotPage initialData={settings.data} storeId={storeId} />;
}
