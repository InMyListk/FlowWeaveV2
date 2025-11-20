/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as autumn from "../autumn.js";
import type * as backgroundJobs from "../backgroundJobs.js";
import type * as lib_premiumContext from "../lib/premiumContext.js";
import type * as lib_protectedContext from "../lib/protectedContext.js";
import type * as todos from "../todos.js";
import type * as users from "../users.js";
import type * as workflow from "../workflow.js";
import type * as workflowInternal from "../workflowInternal.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  autumn: typeof autumn;
  backgroundJobs: typeof backgroundJobs;
  "lib/premiumContext": typeof lib_premiumContext;
  "lib/protectedContext": typeof lib_protectedContext;
  todos: typeof todos;
  users: typeof users;
  workflow: typeof workflow;
  workflowInternal: typeof workflowInternal;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  autumn: {};
};
