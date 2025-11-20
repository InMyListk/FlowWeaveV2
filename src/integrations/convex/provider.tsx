import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { AutumnWrapper } from "@/components/AutumnWrapper";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;
const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

if (!CONVEX_URL) {
  console.error('missing envar CONVEX_URL')
}

export default function AppConvexProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={publishableKey} >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <AutumnWrapper>
          {children}
        </AutumnWrapper>
      </ConvexProviderWithClerk>
    </ClerkProvider >
  )
}
