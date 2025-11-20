import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    imageUrl: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  products: defineTable({
    title: v.string(),
    imageId: v.string(),
    price: v.number(),
  }),

  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
  }),

  workflows: defineTable({
    name: v.string(),
    userId: v.id("users"),
    createdAt: v.number(),   // Use number (timestamp)
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),
})
