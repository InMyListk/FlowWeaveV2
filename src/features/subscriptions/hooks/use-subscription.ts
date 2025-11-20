import { useQuery } from "@tanstack/react-query";
import { useCustomer } from "autumn-js/react";

export const useSubscription = () => {
    const { check } = useCustomer();

    return useQuery({
        queryKey: ["subscription"],
        queryFn: async () => {
            const { data } = check({ productId: "pro" });

            console.log("Subscription check:", data);

            return {
                allowed: data?.allowed ?? false,
                subscription: data || null,
            };
        },
    });
};

export const useHasActiveSubscription = () => {
    const {
        data: customerState,
        isLoading,
        ...rest
    } = useSubscription();

    // In Autumn → "allowed" = true if the user has an active subscription
    const hasActiveSubscription = customerState?.allowed;
    console.log("useHasActiveSubscription:", hasActiveSubscription, customerState);

    return {
        hasActiveSubscription,
        subscription: customerState?.subscription,
        isLoading,
        ...rest,
    };
};
