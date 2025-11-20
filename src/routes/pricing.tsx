import { createFileRoute } from '@tanstack/react-router'
import { PricingTable } from 'autumn-js/react'

export const Route = createFileRoute('/pricing')({
    component: RouteComponent,
})

function RouteComponent() {
    return (<PricingTable />)
}
