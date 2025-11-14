import { generateText } from "ai";
import { internalAction, internalMutation, internalQuery } from "./_generated/server";
import { protectedMutation, protectedQuery } from "./lib/protectedContext"
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const model = createGoogleGenerativeAI();

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

export const generateAIContent = internalAction({
    args: {},
    handler: async (ctx, arg) => {
        const { text } = await generateText({
            model: model('gemini-2.0-flash'),
            prompt: 'Write a vegetarian lasagna recipe for 4 people.',
        });
        return text;
    }
});