import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/_rest/executions/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/_rest/executions/"!</div>
}
