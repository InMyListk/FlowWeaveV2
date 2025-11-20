import { WorkflowsContainer, WorkflowsList } from '@/features/workflows/components/workflows';
import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createFileRoute('/_dashboard/_rest/workflows')({
  component: RouteComponent,
})

function RouteComponent() {
  // const isAuthenticated = useQuery(api.auth.isUserAuthenticated);

  const { isAuthenticated, isLoading } = useConvexAuth();
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    if (isAuthenticated) {
      storeUser();
    }
  }, [isAuthenticated, storeUser]);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="p-6">Please log in to access workflows</div>;
  }

  return (
    <WorkflowsContainer>
      <ErrorBoundary fallback={<div className="p-6 text-red-500">An error occurred while loading workflows.</div>}>
        <Suspense fallback={<div className="p-6">Loading workflows...</div>}>
          <WorkflowsList />
        </Suspense>
      </ErrorBoundary>
    </WorkflowsContainer>
  );
}
