import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { useQuery } from 'convex/react'

export const Route = createFileRoute('/_dashboard/_rest/credentials/')({
  component: RouteComponent,
})

function RouteComponent() {
  const isAuthenticated = useQuery(api.auth.isUserAuthenticated)

  if (isAuthenticated === undefined) {
    return <div className="p-6">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="p-6">
        <p className="text-red-500">You must be logged in to view this page.</p>
      </div>
    )
  }
  return <div>Hello "/_dashboard/_rest/credentials/"!</div>
}
