import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/_rest/credentials/$credentialsId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { credentialsId } = Route.useParams();

  return <div>credentials id is : {credentialsId}</div>
}
