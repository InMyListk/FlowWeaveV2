import { EntityContainer, EntityHeader } from "@/components/entitiy-component";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "@tanstack/react-router";


export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows();
    return (
        <div className="flex flex-1 justify-center items-center">
            {JSON.stringify(workflows, null, 2)}
        </div>
    )
}

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
    const router = useRouter()
    const createWorkflow = useCreateWorkflow();
    const { handleError, modal } = useUpgradeModal();

    const handleCreate = () => {
        createWorkflow.mutate({ name: "" }, {
            onSuccess: (data) => {
                router.navigate({ to: '/workflows/' + data.workflowId })
            },
            onError: (error) => {
                handleError(error);
            }
        })
    }

    return (
        <>
            {modal}
            <EntityHeader
                title="Workflows"
                description="Create and manage your workflows"
                onNew={handleCreate}
                newButtonLabel="New Workflow"
                disable={disabled}
                isCreating={createWorkflow.isPending} />
        </>
    )
}

export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <EntityContainer
            header={<WorkflowsHeader />}
            search={<></>}
            pagination={<> </>}
        >

            {children}
        </EntityContainer>
    )
}