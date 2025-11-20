import { customQuery, customMutation, customAction } from "convex-helpers/server/customFunctions";
import { query, mutation, action } from "../_generated/server";
import { autumn } from "../autumn";
import { ConvexError } from "convex/values";

async function getPremiumUserContext(ctx: any, args?: any) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        throw new Error("Unauthorized: You must be logged in.");
    }
    const { data, error } = await autumn.check(ctx, {
        productId: "pro"
    });
    const isPro = data?.allowed;
    console.log("Premium check:", isPro, data, error);
    if (!isPro) {
        throw new ConvexError({ code: "FORBIDDEN", message: "User does not have a premium subscription." });
    }

    return {
        ctx: {
            ...ctx,
            userId: identity.tokenIdentifier,
            userEmail: identity.email,
            userIdentity: identity
        },
        args: args,
    };
}

export const premiumQuery = customQuery(query, {
    args: {},
    input: getPremiumUserContext
});

export const premiumMutation = customMutation(mutation, {
    args: {},
    input: getPremiumUserContext
});

export const premiumAction = customAction(action, {
    args: {},
    input: getPremiumUserContext
});
