import { customQuery, customMutation, customAction } from "convex-helpers/server/customFunctions";
import { query, mutation, action } from "../_generated/server";

async function getUserIdContext(ctx: any, args?: any) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        throw new Error("Unauthorized: You must be logged in.");
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

export const protectedQuery = customQuery(query, {
    args: {},
    input: getUserIdContext
});

export const protectedMutation = customMutation(mutation, {
    args: {},
    input: getUserIdContext
});

export const protectedAction = customAction(action, {
    args: {},
    input: getUserIdContext
});