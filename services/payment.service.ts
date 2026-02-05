import axiosInstance from '@/lib/axios';
import { handleApiError } from '@/lib/handle-error';
import { ApiResponse } from '@/types/common';
import { PricingPlanResponse, SelectPricingPlanResponse } from '@/types/pricing';

class PaymentService {
    // Get pricing plans
    async getPricingPlans(): Promise<ApiResponse<PricingPlanResponse[]>> {
        try {
            const response = await axiosInstance.get<PricingPlanResponse[]>('/stores/plans');
            return {
                success: true,
                message: 'Pricing plans fetched successfully',
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

    // Buy pricing plans
    async selectPricingPlan(planName: string): Promise<ApiResponse<SelectPricingPlanResponse>> {
        try {
            const response = await axiosInstance.post<SelectPricingPlanResponse>(`/billing/checkout-session?plan_name=${planName}`);
            return {
                success: true,
                message: 'Pricing plan checkout session created successfully',
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
}

const paymentService = new PaymentService();
export default paymentService;
