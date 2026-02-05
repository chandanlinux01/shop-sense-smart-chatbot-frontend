import { BaseResponse, DynamicResponse } from "./common";


export interface PricingPlanResponse extends BaseResponse {
    name: string;
    seats: string;
    text_predictions: string;
    conversations_limit: string;
    image_predictions: string;
    llm_token_limit: string;
    products_limit: string;
    platforms: string[];
    analytics: string;
    custom_training: boolean;
    branding: string;
    chatbot_customization: string;
    support: string;
    api_access: boolean;
    price: string;
}

export type SelectPricingPlanResponse = DynamicResponse<"checkout_url", string>
