import { protectedMutation, protectedQuery } from "./lib/protectedContext";
import { internal } from "./_generated/api";
import { mutation } from "./_generated/server";

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

export const aiGenerateContentBackground = mutation({
    args: {},
    handler: async (ctx, arg) => {
        const result: any = await ctx.scheduler.runAfter(
            1000,
            internal.workflow.generateAIContent,
            {}
        );
        return { success: true, message: "AI generation job queued", result: result };
    }
});

