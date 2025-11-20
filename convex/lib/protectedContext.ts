import { customQuery, customMutation, customAction } from "convex-helpers/server/customFunctions";
import { query, mutation, action } from "../_generated/server";
import { api } from "../_generated/api";

async function getUserIdContext(ctx: any, args?: any) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        throw new Error("Unauthorized: You must be logged in.");
    }

    // Find Convex user document
    const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", identity.subject))
        .unique();

    if (!user) {
        throw new Error("User not found in Convex DB. Please call a mutation to create the user first.");
    }

    return {
        ctx: {
            ...ctx,
            clerkId: identity.subject,
            user: user,
            userId: identity.tokenIdentifier,
            userEmail: identity.email,
            userIdentity: identity
        },
        args: args,
    };
}

async function getOrCreateUser(ctx: any, args?: any) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        throw new Error("Unauthorized: You must be logged in.");
    }

    // Find Convex user document
    let user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", identity.subject))
        .unique();

    if (user === null) {
        // If it's a new user, create a new document.
        const userId = await ctx.db.insert("users", {
            firstName: identity.givenName ?? "",
            lastName: identity.familyName ?? "",
            imageUrl: identity.pictureUrl ?? "",
            email: identity.email!,
            clerkId: identity.subject,
        });
        user = await ctx.db.get(userId);
    }


    if (!user) {
        throw new Error("User not found and could not be created in Convex DB");
    }

    return {
        ctx: {
            ...ctx,
            clerkId: identity.subject,
            user: user,
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
    input: getOrCreateUser
});

export const protectedAction = customAction(action, {
    args: {},
    input: getOrCreateUser
});