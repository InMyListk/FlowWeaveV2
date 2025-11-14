import { protectedMutation, protectedQuery } from "./lib/protectedContext";
import { internal } from "./_generated/api";

export const createWorkflowsBackground = protectedMutation({
    args: {},
    handler: async (ctx, _arg) => {
        await ctx.scheduler.runAfter(
            2000,
            internal.workflow.createWorkflow,
            {}
        );

        return { success: true, message: "Job queued" };
    },
});