import { api } from "convex/_generated/api"
import { useQuery, useAction } from "convex/react"
import { useMutation as tanstackUseMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useSuspenseWorkflows = () => {
    return useQuery(api.workflow.getMany)
}

export const useCreateWorkflow = () => {
    const ConvexCreateWorkflow = useAction(api.workflow.createWorkflow)
    const createWorkflow = tanstackUseMutation({
        mutationFn: ConvexCreateWorkflow
        ,
        onSuccess: (data) => {
            toast.success(`Workflow ${data.workflowId} created successfully`)

        },
        onError: (error) => {
            toast.error(`Error creating workflow: ${error.message}`)
        }
    }
    )
    return createWorkflow
}