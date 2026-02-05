'use server';

import { handleApiError } from '@/lib/handle-error';
import { ApiResponse } from '@/types/common';
import { ChatbotSettingsResponse } from '@/types/chatbot';
import chatbotService from '@/services/chatbot.service';

export async function getChatbotSettingsAction(storeId: string): Promise<ApiResponse<ChatbotSettingsResponse>> {
    try {
        const result = await chatbotService.getChatbotSettings(storeId);
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: handleApiError(error),
            data: null as any,
        };
    }
}


