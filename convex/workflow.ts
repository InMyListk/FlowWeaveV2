import { generateText } from "ai";
import { internalAction, internalMutation } from "./_generated/server";
import { protectedMutation, protectedQuery } from "./lib/protectedContext"
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { v } from "convex/values";
import { premiumAction } from "./lib/premiumContext";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

const model = createGoogleGenerativeAI();

export const listWorkflows = protectedQuery({
    args: {},
    handler: async (ctx, arg) => {
        return await ctx.db
            .query("workflows")
            .withIndex("by_user", (q: any) => q.eq("userId", ctx.user._id))
            .collect();
    },
});

export const createWorkflow = premiumAction({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args): Promise<{ success: boolean; workflowId: Id<"workflows"> }> => {
        return await ctx.runMutation(internal.workflowInternal.createWorkflowInternal, {
            name: args.name,
        });
    },
});

export const removeWorkflow = protectedMutation({
    args: {
        workflowId: v.id("workflows")
    },
    handler: async (ctx, args) => {
        const workflow = await ctx.db.get(args.workflowId);
        if (!workflow || workflow.userId !== ctx.user._id) {
            throw new Error("Workflow not found or you don't have permission to delete it.");
        }
        await ctx.db.delete(args.workflowId);
        return { success: true, message: "Workflow removed" };
    },
});

export const updateName = protectedMutation({
    args: {
        id: v.id("workflows"),
        name: v.string(),
    },
    handler: async (ctx, arg) => {
        const workflow = await ctx.db.get(arg.id);
        if (!workflow || workflow.userId !== ctx.user._id) {
            throw new Error("Workflow not found or you don't have permission to update it.");
        }
        await ctx.db.patch(arg.id, {
            name: arg.name,
            updatedAt: Date.now(),
        });
        return { success: true, message: "Workflow name updated" };
    }
})

export const getOne = protectedQuery({
    args: {
        workflowId: v.id("workflows")
    },
    handler: async (ctx, args) => {
        const workflow = await ctx.db.get(args.workflowId);
        if (!workflow || workflow.userId !== ctx.user._id) {
            return null;
        }
        return workflow;
    }
});

export const getMany = protectedQuery({
    args: {},
    handler: async (ctx, args) => {
        return await ctx.db
            .query("workflows")
            .withIndex("by_user", (q: any) => q.eq("userId", ctx.user._id))
            .collect();
    }
});

export const generateAIContent = internalAction({
    args: {
        prompt: v.string(),
    },
    handler: async (ctx, args) => {
        const { text } = await generateText({
            model: model('gemini-pro'),
            prompt: args.prompt,
        });
        return text;
    }
});