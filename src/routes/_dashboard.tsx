import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className='bg-accent/20'>
                {/* <SidebarTrigger /> */}
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}
