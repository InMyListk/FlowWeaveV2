import { Auth } from "convex/server";
import { query } from "./_generated/server";

/**
 * Checks if a user is authenticated
 * @param auth - The auth object from the query/mutation context
 * @returns true if the user is authenticated, false otherwise
 */
export async function isAuthenticated(auth: Auth): Promise<boolean> {
    const identity = await auth.getUserIdentity();
    return identity !== null;
}

/**
 * Query to check current user authentication status
 * Returns the user's identity if authenticated, null otherwise
 */
export const getCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }
        return {
            subject: identity.subject,
            email: identity.email,
            name: identity.name,
            tokenIdentifier: identity.tokenIdentifier,
        };
    },
});

/**
 * Query to verify if user is authenticated
 * Returns boolean indicating authentication status
 */
export const isUserAuthenticated = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        return identity !== null;
    },
});

/**
 * Gets the authenticated user's ID
 * @param auth - The auth object from the query/mutation context
 * @returns the user's subject ID if authenticated, null otherwise
 */
export async function getAuthUserId(auth: Auth): Promise<string | null> {
    const identity = await auth.getUserIdentity();
    return identity?.subject ?? null;
}

/**
 * Gets the authenticated user's identity
 * @param auth - The auth object from the query/mutation context
 * @returns the user's identity if authenticated, null otherwise
 */
export async function getAuthUserIdentity(auth: Auth) {
    return await auth.getUserIdentity();
}

/**
 * Requires the user to be authenticated, throws an error if not
 * @param auth - The auth object from the query/mutation context
 * @returns the user's identity
 * @throws Error if the user is not authenticated
 */
export async function requireAuth(auth: Auth) {
    const identity = await auth.getUserIdentity();
    if (!identity) {
        throw new Error("Unauthorized: User must be authenticated");
    }
    return identity;
}

/**
 * Requires the user to be authenticated and returns their user ID
 * @param auth - The auth object from the query/mutation context
 * @returns the user's subject ID
 * @throws Error if the user is not authenticated
 */
export async function requireAuthUserId(auth: Auth): Promise<string> {
    const identity = await requireAuth(auth);
    return identity.subject;
}
