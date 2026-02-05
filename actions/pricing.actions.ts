'use server';

import { handleApiError } from '@/lib/handle-error';
import { ApiResponse } from '@/types/common';
import { PricingPlanResponse, SelectPricingPlanResponse } from '@/types/pricing';
import paymentService from '@/services/payment.service';

// Server Action for getting pricing plans
// export async function getPricingPlansAction(): Promise<ApiResponse<PricingPlanResponse[]>> {
//     try {
//         const result = await paymentService.getPricingPlans();
//         return result;
//     } catch (error: any) {
//         return {
//             success: false,
//             message: handleApiError(error),
//             data: null as any,
//         };
//     }
// }

export async function selectPricingPlanAction(planName: string): Promise<ApiResponse<SelectPricingPlanResponse>> {
    try {
        const result = await paymentService.selectPricingPlan(planName);
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: handleApiError(error),
            data: null as any,
        };
    }
}


