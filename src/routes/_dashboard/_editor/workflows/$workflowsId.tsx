import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/_editor/workflows/$workflowsId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { workflowsId } = Route.useParams();
  return <div>workflow id: {workflowsId}"!</div>
}
