import { cn } from "@/lib/utils";
import PricingCardList from "./pricing-card-list";
import { PricingPlanResponse } from "@/types/pricing";
import paymentService from "@/services/payment.service";
import { ErrorDisplay } from "@/components/ui/ErrorDisplay";

export default async function PricingDataFetcher() {
    const plans = await paymentService.getPricingPlans();

    if (!plans.success) {
        return (
            <ErrorDisplay
                variant="card"
                title="Couldn't Load Plans"
                description={plans.message || "We’re having trouble fetching the pricing plans. Please try again."}
                actionLabel="Try Again"
                actionHref="/pricing-plans"
                homeAction={true}
            />
        );
    }

    return (
        <div className="flex flex-wrap md:flex-nowrap justify-evenly gap-2">
            {plans.data.map((plan: PricingPlanResponse) => {
                const features = [
                    plan.text_predictions,
                    plan.conversations_limit,
                    `${plan.products_limit} products`,
                    plan.image_predictions,
                    plan.llm_token_limit,
                    `Analytics: ${plan.analytics}`,
                    `Support: ${plan.support}`,
                    `Branding: ${plan.branding}`,
                ];

                if (plan.api_access) features.push("API Access");
                if (plan.custom_training) features.push("Custom Training");
                plan.platforms.forEach((platform) => features.push(`Platform: ${platform}`));

                return (
                    <div
                        key={plan.name}
                        className={cn(
                            "relative p-8 flex flex-col flex-1 rounded-xl transition-all card-border-shadow bg-background text-foreground border border-border"
                        )}
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h3 className="capitalize mb-4 font-bold">{plan.name}</h3>
                            <div className="flex items-baseline justify-center">
                                <span className="text-sm mr-1">$</span>
                                <span className="text-5xl font-bold">{plan.price}</span>
                                <span className="text-xs ml-1 opacity-70">/month</span>
                            </div>
                            <p className="text-xs mt-2 opacity-80 capitalize">{plan.seats.replace("-1", "unlimited")}</p>
                        </div>

                        {/* Features passed to Client Component */}
                        <PricingCardList planName={plan.name} features={features} />
                    </div>
                );
            })}
        </div>
    );
}
