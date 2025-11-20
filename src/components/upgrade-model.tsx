import { AlertDialogAction, AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { useCustomer } from "autumn-js/react";
import { Button } from "./ui/button";

interface UpgradeModelProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const UpgradeModel = ({
    open,
    onOpenChange
}: UpgradeModelProps) => {
    const { checkout } = useCustomer();
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Upgrade to Pro
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        You need an active subscription to perform this
                        action. Upgrade to Pro to unlock all feature.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                            <Button variant={"ghost"}>Cancel</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Button onClick={
                                () => {
                                    checkout({
                                        productId: "pro",
                                    })
                                }
                            }>
                                Upgrade Now
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}