import { AppHeader } from '@/components/app-header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/_rest')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <AppHeader />
      <main className='flex-1'>
        <Outlet />
      </main>
    </>
  )
}
