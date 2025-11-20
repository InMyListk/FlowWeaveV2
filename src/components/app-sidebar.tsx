import { CreditCardIcon, FolderOpenIcon, HistoryIcon, KeyIcon, LogInIcon, LogOutIcon, StarIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/clerk-react";
import { CheckoutDialog, useCustomer } from "autumn-js/react";
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription";


const menuItems = [
    {
        title: 'Main',
        items: [
            {
                title: 'Workflows',
                icon: FolderOpenIcon,
                url: '/workflows'
            },
            {
                title: 'Credentials',
                icon: KeyIcon,
                url: '/credentials'
            },
            {
                title: 'Executions',
                icon: HistoryIcon,
                url: '/executions'
            }
        ]
    }
];

export function AppSidebar() {
    const location = useLocation()
    const pathname = location.pathname
    const { checkout } = useCustomer();
    const { hasActiveSubscription, isLoading } = useHasActiveSubscription();
    console.log("Sidebar subscription status:", hasActiveSubscription, isLoading);
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
                        <Link to="/">
                            <Image width={30} height={30} src="/assets/logo.svg" alt="FlowWeave Logo" />
                            <span className="text-sm font-semibold">FlowWeave</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                {menuItems.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton tooltip={item.title} isActive={
                                            item.url === '/'
                                                ? pathname === '/'
                                                : pathname.startsWith(item.url!)
                                        } asChild className="gap-x-4 h-10 px-4">
                                            <Link to={item.url!} className="flex items-center gap-x-4">
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    {!hasActiveSubscription && !isLoading && (
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="Upgrade to Pro"
                                className="gap-x-4 h-10 px-4"
                                onClick={() => {
                                    checkout({
                                        productId: "pro",
                                        dialog: CheckoutDialog,
                                    })
                                }}
                            >
                                <StarIcon className="w-4 h-4" />
                                <span>Upgrade to Pro</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Billing Portal"
                            className="gap-x-4 h-10 px-4"
                            onClick={() => { }}
                        >
                            <CreditCardIcon className="w-4 h-4" />
                            <span>Billing Portal</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SignedIn>
                            <SidebarMenuButton
                                tooltip="Sign Out"
                                className="gap-x-4 h-10 px-4"
                            >
                                <LogOutIcon />
                                <SignOutButton />
                            </SidebarMenuButton>
                        </SignedIn>
                        <SignedOut>
                            <SidebarMenuButton
                                tooltip="Sign Out"
                                className="gap-x-4 h-10 px-4"
                            >
                                <LogInIcon />
                                <SignInButton />
                            </SidebarMenuButton>
                        </SignedOut>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}