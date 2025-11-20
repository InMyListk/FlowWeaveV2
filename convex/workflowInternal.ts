import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const createWorkflowInternal = internalMutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user) {
            throw new Error("User not found");
        }

        // Create workflow linked to the Convex user's _id
        const workflowId = await ctx.db.insert("workflows", {
            name: args.name,
            userId: user._id,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        return { success: true, workflowId };
    },
});
