import { createFileRoute } from '@tanstack/react-router'
import { Authenticated, Unauthenticated, AuthLoading, useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from '@/components/ui/button';
import { useMutation as tanstackUseMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main>
      <Toaster />
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <Content />
      </Authenticated>
      <AuthLoading>
        <p>Still loading</p>
      </AuthLoading>
    </main>
  );
}

function Content() {
  const Workflows = useQuery(api.workflow.listWorkflows);
  const convexCreate = useMutation(api.backgroundJobs.createWorkflowsBackground);
  const create = tanstackUseMutation({
    mutationFn: async () => {
      return await convexCreate({});
    },
    onSuccess: () => {
      toast.success("Workflow creation triggered");
    },
  });
  const ConvexAIResult = useMutation(api.backgroundJobs.aiGenerateContentBackground);
  const generateAIContent = tanstackUseMutation({
    mutationFn: async () => {
      return await ConvexAIResult({});
    },
    onSuccess: (data) => {
      console.log("AI Result:", data.result);
      toast.success("AI generation triggered");
    },
  });
  return <div>Authenticated content:
    <Button disabled={create.isPending} onClick={() => create.mutate()}>Create Workflow</Button>
    WorkFlow: {JSON.stringify(Workflows)}
    <Button disabled={generateAIContent.isPending} onClick={() => generateAIContent.mutate()}>Generate AI Content</Button>
    AI Result: {generateAIContent.data?.result}
  </div>;
}
