import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/_editor/workflows/$workflowsId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/_editor/$workflowId"!</div>
}
