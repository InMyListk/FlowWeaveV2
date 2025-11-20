import { protectedMutation, protectedQuery } from "./lib/protectedContext";
import { api, internal } from "./_generated/api";
import { mutation } from "./_generated/server";
import { premiumAction, premiumMutation } from "./lib/premiumContext";

export const createWorkflowsBackground = protectedMutation({
    args: {},
    handler: async (ctx, _arg) => {
        await ctx.scheduler.runAfter(
            2000,
            api.workflow.createWorkflow,
            {}
        );
        return { success: true, message: "Job queued" };
    },
});

export const aiGenerateContentBackground = premiumAction({
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

