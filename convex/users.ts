import { mutation } from "./_generated/server";

/**
 * Stores a new user in the database.
 * This mutation is called from the frontend after a user signs in.
 */
export const store = mutation({
    // No arguments needed, as we get the user from the session.
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we've already stored this user.
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .unique();

        // If the user already exists, we don't need to do anything.
        if (user !== null) {
            return;
        }

        // If it's a new user, create a new document.
        await ctx.db.insert("users", {
            firstName: identity.givenName ?? "",
            lastName: identity.familyName ?? "",
            imageUrl: identity.pictureUrl ?? "",
            email: identity.email!,
            clerkId: identity.subject,
        });
    },
});