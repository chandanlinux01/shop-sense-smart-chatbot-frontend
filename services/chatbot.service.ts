import axiosInstance from '@/lib/axios';
import { handleApiError } from '@/lib/handle-error';
import { ApiResponse } from '@/types/common';
import { ChatbotSettingsResponse, } from '@/types/chatbot';

class ChatbotService {
    // Get chatbot settings
    async getChatbotSettings(storeId: string): Promise<ApiResponse<ChatbotSettingsResponse>> {
        try {
            const response = await axiosInstance.get<ChatbotSettingsResponse>(`/stores/${storeId}/branding`);
            return {
                success: true,
                message: 'Chatbot settings fetched successfully',
                data: response.data,
            };
        } catch (error: any) {
            return {
                success: false,
                message: handleApiError(error),
                data: null as any,
            };
        }
    }

    // Update chatbot settings
    // async updateChatbotSettings(storeId: string, settings: ChatbotSettingsRequest): Promise<ApiResponse<ChatbotSettingsResponse>> {
    //     try {
    //         const response = await axiosInstance.patch<ChatbotSettingsResponse>(`/stores/${storeId}/branding`, settings);
    //         return {
    //             success: true,
    //             message: 'Chatbot settings updated successfully',
    //             data: response.data,
    //         };
    //     } catch (error: any) {
    //         return {
    //             success: false,
    //             message: handleApiError(error),
    //             data: null as any,
    //         };
    //     }
    // }
}

const chatbotService = new ChatbotService();
export default chatbotService;
