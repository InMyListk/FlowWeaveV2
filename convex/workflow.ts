import { internalMutation, internalQuery } from "./_generated/server";
import { protectedMutation, protectedQuery } from "./lib/protectedContext"

export const listWorkflows = protectedQuery({
    args: {},
    handler: async (ctx, arg) => {
        return await ctx.db.query("workFlow").collect();
    },
});

export const createWorkflow = internalMutation({
    args: {},
    handler: async (ctx, arg) => {
        const workflowId = await ctx.db.insert("workFlow", {
            name: "awesome workflow",
        });

        return { success: true, workflowId };
    }
});