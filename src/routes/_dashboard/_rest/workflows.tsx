import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api';
import { useQuery } from 'convex/react';

export const Route = createFileRoute('/_dashboard/_rest/workflows')({
  component: RouteComponent,
})

function RouteComponent() {
  const isAuthenticated = useQuery(api.auth.isUserAuthenticated);

  if (isAuthenticated === undefined) {
    return <div className="p-6">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="p-6">Please log in to access workflows</div>;
  }

  return (
    <div className="p-6">
      welcome to workflows rest
    </div>
  )
}
